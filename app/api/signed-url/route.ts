/**
 * GET /api/signed-url?assetId=<id>&email=<email>&orderId=<orderId>
 *
 * Security model (P2):
 *  - Requires all three params: assetId, email, orderId
 *  - Verifies the LS order ID belongs to that email (binding check)
 *  - Verifies the order grants access to assetId (season pass OR a-la-carte)
 *  - Rate limited: 10 requests per 10 min per (email + assetId) via Upstash (P3)
 *
 * On success returns { url, expiresAt, filename } — browser downloads from R2 edge.
 * No server-side proxying: Vercel never touches the file bytes.
 */

import { NextRequest, NextResponse } from "next/server";
import { generateSignedUrl, assetIdToR2Key } from "@/lib/cloudflare";
import { verifyOrderOwnership } from "@/lib/lemon-squeezy";
import { checkRateLimit } from "@/lib/upstash";
import { getAssetById } from "@/lib/inventory";

export const runtime = "nodejs"; // needs crypto + AWS SDK — not edge runtime

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const assetId = searchParams.get("assetId");
  const email = searchParams.get("email");
  const orderId = searchParams.get("orderId");

  // -------------------------------------------------------------------------
  // 1. Input validation
  // -------------------------------------------------------------------------
  if (!assetId || !email || !orderId) {
    return NextResponse.json(
      { error: "Missing required params: assetId, email, orderId" },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  // orderId must be non-empty and look like a LS numeric ID or string
  if (!/^[\w-]{1,64}$/.test(orderId)) {
    return NextResponse.json({ error: "Invalid order ID format" }, { status: 400 });
  }

  const asset = getAssetById(assetId);
  if (!asset) {
    return NextResponse.json({ error: "Asset not found" }, { status: 404 });
  }

  // -------------------------------------------------------------------------
  // 2. Rate limiting (P3) — keyed on email + assetId, not orderId
  //    (orderId is verified next; we rate limit before hitting LS API)
  // -------------------------------------------------------------------------
  try {
    const rl = await checkRateLimit(`${email}:${assetId}`);
    if (!rl.success) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a few minutes and try again." },
        {
          status: 429,
          headers: {
            "Retry-After": String(Math.ceil((rl.reset - Date.now()) / 1000)),
          },
        }
      );
    }
  } catch (err) {
    // Rate limiter failure must not block legitimate downloads — log and continue
    console.error("[signed-url] rate limit check failed:", err);
  }

  // -------------------------------------------------------------------------
  // 3. Ownership verification (P1 season pass fix + P2 order binding)
  //    Fetches the order from LS, checks email matches, checks asset access
  // -------------------------------------------------------------------------
  let owns: boolean;
  try {
    owns = await verifyOrderOwnership(email, orderId, assetId);
  } catch (err) {
    console.error("[signed-url] ownership check failed:", err);
    return NextResponse.json(
      {
        error:
          "Payment verification temporarily unavailable. Please try again in a moment.",
      },
      { status: 503 }
    );
  }

  if (!owns) {
    return NextResponse.json(
      {
        error:
          "Access denied. This order does not grant access to the requested asset.",
      },
      { status: 403 }
    );
  }

  // -------------------------------------------------------------------------
  // 4. Generate signed R2 URL (P4 — storage errors return 503 not 500)
  // -------------------------------------------------------------------------
  const fileType = asset.type === "audio" ? "audio" : "video";
  const key = assetIdToR2Key(assetId, fileType);
  const ext = fileType === "audio" ? "wav" : "mp4";
  const downloadFilename = `${asset.name} - HauntSync 1080p Master.${ext}`;

  let url: string;
  let expiresAt: string;

  try {
    ({ url, expiresAt } = await generateSignedUrl({
      key,
      expiresInSeconds: 14_400, // 4 hours
      downloadFilename,
    }));
  } catch (err) {
    console.error("[signed-url] R2 signing failed:", err);
    return NextResponse.json(
      { error: "Storage temporarily unavailable. Please try again in a moment." },
      { status: 503 }
    );
  }

  return NextResponse.json({ url, expiresAt, assetId, filename: downloadFilename });
}
