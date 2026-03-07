/**
 * Lemon Squeezy helpers
 *
 * Responsibilities:
 *  1. Verify webhook signatures (HMAC-SHA256)
 *  2. Check whether a given email owns a specific asset / season pass
 *  3. Parse incoming order/subscription events
 *
 * Environment variables:
 *   LEMONSQUEEZY_API_KEY        – used for server-side order lookups
 *   LEMONSQUEEZY_WEBHOOK_SECRET – used to verify incoming webhook payloads
 *   LEMONSQUEEZY_STORE_ID       – your LS store ID
 */

import crypto from "crypto";
import { SEASON_PASS_LS_PRODUCT_ID, getAssetById } from "./inventory";

const LS_API_BASE = "https://api.lemonsqueezy.com/v1";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface LsOrder {
  id: string;
  attributes: {
    status: string; // "paid" | "refunded" | "void" | ...
    user_email: string;
    first_order_item: {
      variant_id: number;
      product_id: number;
      product_name: string;
    };
    order_items?: Array<{
      variant_id: number;
      product_id: number;
    }>;
  };
}

export interface LsWebhookPayload {
  meta: {
    event_name: string; // "order_created" | "order_refunded" | ...
    custom_data?: Record<string, string>;
  };
  data: LsOrder;
}

// ---------------------------------------------------------------------------
// Webhook signature verification
// ---------------------------------------------------------------------------

/**
 * Verify that a webhook request genuinely came from Lemon Squeezy.
 * Call this before processing any webhook payload.
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

  // Constant-time comparison to prevent timing attacks
  return crypto.timingSafeEqual(
    Buffer.from(signatureHeader, "hex"),
    Buffer.from(expected, "hex")
  );
}

// ---------------------------------------------------------------------------
// Ownership verification
// ---------------------------------------------------------------------------

/**
 * Look up all paid orders for an email address via the LS API.
 * Returns the raw order list — callers decide what to do with it.
 *
 * NOTE: In production you'd cache this or store it in your own DB after
 * the webhook arrives. This direct API call approach works fine for
 * low-volume dashboards.
 */
async function fetchOrdersForEmail(email: string): Promise<LsOrder[]> {
  const apiKey = process.env.LEMONSQUEEZY_API_KEY;
  const storeId = process.env.LEMONSQUEEZY_STORE_ID;
  if (!apiKey) throw new Error("LEMONSQUEEZY_API_KEY is not set.");

  const params = new URLSearchParams({
    "filter[user_email]": email,
    "filter[store_id]": storeId ?? "",
    "filter[status]": "paid",
  });

  const res = await fetch(`${LS_API_BASE}/orders?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      Accept: "application/vnd.api+json",
    },
    // Short cache: re-validates every 60 s without re-fetching on every click
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`LS API error ${res.status}: ${await res.text()}`);
  }

  const json = await res.json();
  return json.data as LsOrder[];
}

/**
 * Returns true if the email holder owns the season pass OR the individual
 * asset identified by `assetId`.
 */
export async function verifyAssetOwnership(
  email: string,
  assetId: string
): Promise<boolean> {
  const asset = getAssetById(assetId);
  if (!asset) return false;

  const orders = await fetchOrdersForEmail(email);

  for (const order of orders) {
    const items = order.attributes.order_items ?? [
      order.attributes.first_order_item,
    ];

    for (const item of items) {
      // Season pass covers all assets
      if (String(item.product_id) === SEASON_PASS_LS_PRODUCT_ID) return true;
      // A-la-carte: variant must match
      if (String(item.variant_id) === asset.lsVariantId) return true;
    }
  }

  return false;
}

/**
 * Returns the full list of asset IDs the email holder may download.
 * Used to build the dashboard asset list.
 */
export async function getOwnedAssetIds(email: string): Promise<string[]> {
  const { ASSETS, SEASON_PASS_ASSETS } = await import("./inventory");
  const orders = await fetchOrdersForEmail(email);

  const ownedVariantIds = new Set<string>();
  let hasSeasonPass = false;

  for (const order of orders) {
    const items = order.attributes.order_items ?? [
      order.attributes.first_order_item,
    ];

    for (const item of items) {
      if (String(item.product_id) === SEASON_PASS_LS_PRODUCT_ID) {
        hasSeasonPass = true;
      } else {
        ownedVariantIds.add(String(item.variant_id));
      }
    }
  }

  if (hasSeasonPass) return SEASON_PASS_ASSETS.map((a) => a.id);

  return ASSETS.filter((a) => ownedVariantIds.has(a.lsVariantId)).map(
    (a) => a.id
  );
}
