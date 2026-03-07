/**
 * Lemon Squeezy helpers
 *
 * Responsibilities:
 *  1. Verify webhook signatures (HMAC-SHA256)
 *  2. Verify ownership by order ID + email (P2 security model)
 *  3. Enumerate owned assets for the dashboard
 *
 * Environment variables:
 *   LEMONSQUEEZY_API_KEY        – server-side order lookups
 *   LEMONSQUEEZY_WEBHOOK_SECRET – webhook payload verification
 *   LEMONSQUEEZY_STORE_ID       – your LS store ID
 */

import crypto from "crypto";
import {
  SEASON_PASS_VARIANT_ID,
  getAssetIdForVariant,
  getVariantIdForAsset,
} from "./variant-mapping";

const LS_API_BASE = "https://api.lemonsqueezy.com/v1";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface LsOrderItem {
  variant_id: number;
  product_id: number;
  product_name?: string;
}

export interface LsOrder {
  id: string;
  attributes: {
    status: string; // "paid" | "refunded" | "void" | ...
    user_email: string;
    first_order_item: LsOrderItem;
    order_items?: LsOrderItem[];
  };
}

export interface LsWebhookPayload {
  meta: {
    event_name: string;
    custom_data?: Record<string, string>;
  };
  data: LsOrder;
}

/** Returned by getOwnedAssets — one entry per downloadable asset */
export interface OwnedAsset {
  assetId: string;
  /** The LS order ID that grants access to this asset */
  orderId: string;
}

// ---------------------------------------------------------------------------
// Fetch helpers with retry + exponential backoff (P4)
// ---------------------------------------------------------------------------

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Fetch with up to `maxAttempts` retries on network errors or 5xx responses.
 * Backoff: 500ms → 1000ms → 2000ms (doubles each attempt).
 */
async function fetchWithRetry(
  url: string,
  init: RequestInit,
  maxAttempts = 3
): Promise<Response> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const res = await fetch(url, init);

      // Retry on server errors only; 4xx are definitive failures
      if (res.status >= 500 && attempt < maxAttempts) {
        await sleep(500 * 2 ** (attempt - 1));
        continue;
      }

      return res;
    } catch (err) {
      lastError = err;
      if (attempt < maxAttempts) {
        await sleep(500 * 2 ** (attempt - 1));
      }
    }
  }

  throw lastError ?? new Error("Fetch failed after retries");
}

function lsHeaders(): HeadersInit {
  const apiKey = process.env.LEMONSQUEEZY_API_KEY;
  if (!apiKey) throw new Error("LEMONSQUEEZY_API_KEY is not set.");
  return {
    Authorization: `Bearer ${apiKey}`,
    Accept: "application/vnd.api+json",
  };
}

// ---------------------------------------------------------------------------
// Webhook signature verification
// ---------------------------------------------------------------------------

/**
 * Verify that a webhook request genuinely came from Lemon Squeezy.
 * Uses constant-time comparison to prevent timing attacks.
 */
export async function verifyWebhookSignature(
  rawBody: string,
  signatureHeader: string | null
): Promise<boolean> {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
  if (!secret) throw new Error("LEMONSQUEEZY_WEBHOOK_SECRET is not set.");
  if (!signatureHeader) return false;

  const expected = crypto
    .createHmac("sha256", secret)
    .update(rawBody, "utf8")
    .digest("hex");

  try {
    return crypto.timingSafeEqual(
      Buffer.from(signatureHeader, "hex"),
      Buffer.from(expected, "hex")
    );
  } catch {
    // Buffer length mismatch — definitely invalid
    return false;
  }
}

// ---------------------------------------------------------------------------
// Order fetching
// ---------------------------------------------------------------------------

/**
 * Fetch a single order by ID from the LS API.
 * Throws a typed error so callers can return the right HTTP status.
 */
export async function fetchOrderById(orderId: string): Promise<LsOrder> {
  const res = await fetchWithRetry(`${LS_API_BASE}/orders/${orderId}`, {
    headers: lsHeaders(),
  });

  if (res.status === 404) {
    throw Object.assign(new Error("Order not found"), { code: "NOT_FOUND" });
  }

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw Object.assign(
      new Error(`Lemon Squeezy API error ${res.status}: ${body}`),
      { code: "LS_API_ERROR", status: res.status }
    );
  }

  const json = await res.json();
  return json.data as LsOrder;
}

/**
 * Fetch all paid orders for an email address via the LS API.
 * Used by getOwnedAssets() for the dashboard asset list.
 */
async function fetchOrdersForEmail(email: string): Promise<LsOrder[]> {
  const storeId = process.env.LEMONSQUEEZY_STORE_ID ?? "";

  const params = new URLSearchParams({
    "filter[user_email]": email,
    "filter[store_id]": storeId,
    "filter[status]": "paid",
  });

  const res = await fetchWithRetry(
    `${LS_API_BASE}/orders?${params.toString()}`,
    {
      headers: lsHeaders(),
      // Short cache so the dashboard doesn't hammer LS on every page load
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw Object.assign(
      new Error(`Lemon Squeezy API error ${res.status}: ${body}`),
      { code: "LS_API_ERROR", status: res.status }
    );
  }

  const json = await res.json();
  return json.data as LsOrder[];
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Normalize order items into a flat array.
 * LS returns `order_items` for multi-line orders, `first_order_item` otherwise.
 */
function orderItems(order: LsOrder): LsOrderItem[] {
  return order.attributes.order_items ?? [order.attributes.first_order_item];
}

/** True if the order contains the season pass variant */
function orderHasSeasonPass(order: LsOrder): boolean {
  return orderItems(order).some(
    (item) => String(item.variant_id) === SEASON_PASS_VARIANT_ID
  );
}

/** True if the order contains the a-la-carte variant for assetId */
function orderHasAlaCarteAsset(order: LsOrder, assetId: string): boolean {
  const variantId = getVariantIdForAsset(assetId);
  if (!variantId) return false;
  return orderItems(order).some(
    (item) => String(item.variant_id) === variantId
  );
}

// ---------------------------------------------------------------------------
// Ownership verification — PRIMARY AUTH FUNCTION (P1 fix + P2 security)
// ---------------------------------------------------------------------------

/**
 * Verifies that:
 *  1. The order `orderId` exists in LS and has status "paid"
 *  2. The order's `user_email` matches `email` — prevents using another
 *     person's order ID even if guessed
 *  3. The order grants access to `assetId` via:
 *     a. Season pass variant (P1 fix: checked by variant_id, not product_id)
 *     b. Specific a-la-carte variant for the asset
 *
 * Called on every download request. By requiring email + orderId together:
 *  - Email-only attacks fail (no orderId → no download)
 *  - Order ID guessing fails (email must match LS record)
 */
export async function verifyOrderOwnership(
  email: string,
  orderId: string,
  assetId: string
): Promise<boolean> {
  let order: LsOrder;

  try {
    order = await fetchOrderById(orderId);
  } catch (err) {
    const e = err as { code?: string };
    if (e.code === "NOT_FOUND") return false;
    throw err; // re-throw → caller returns 503
  }

  // Binding check: the order must belong to this exact email
  if (order.attributes.user_email.toLowerCase() !== email.toLowerCase()) {
    return false;
  }

  // Refunded / voided orders lose access
  if (order.attributes.status !== "paid") {
    return false;
  }

  // Season pass grants access to every asset (P1 fix: variant_id comparison)
  if (orderHasSeasonPass(order)) return true;

  // A-la-carte: specific variant must be in this order
  return orderHasAlaCarteAsset(order, assetId);
}

// ---------------------------------------------------------------------------
// Dashboard: enumerate owned assets
// ---------------------------------------------------------------------------

/**
 * Returns the full list of assets the email holder may download, each paired
 * with the orderId that grants access. The dashboard passes orderId down to
 * each DownloadButton so the signed-url route can verify without an extra
 * email-based LS query.
 *
 * Season pass logic (P1 fix):
 *  - Compares item.variant_id against SEASON_PASS_VARIANT_ID
 *  - A single season pass order grants ALL season pass assets
 */
export async function getOwnedAssets(email: string): Promise<OwnedAsset[]> {
  const { SEASON_PASS_ASSETS } = await import("./inventory");

  const orders = await fetchOrdersForEmail(email);
  const result: OwnedAsset[] = [];

  for (const order of orders) {
    if (order.attributes.status !== "paid") continue;

    if (orderHasSeasonPass(order)) {
      // Season pass: return all season-pass assets tied to this one order
      return SEASON_PASS_ASSETS.map((a) => ({
        assetId: a.id,
        orderId: order.id,
      }));
    }

    // A-la-carte: map each recognized variant to its asset
    for (const item of orderItems(order)) {
      const assetId = getAssetIdForVariant(item.variant_id);
      if (assetId) {
        result.push({ assetId, orderId: order.id });
      }
    }
  }

  // Deduplicate by assetId (same asset purchased twice, or returned then re-bought)
  const seen = new Set<string>();
  return result.filter(({ assetId }) => {
    if (seen.has(assetId)) return false;
    seen.add(assetId);
    return true;
  });
}
