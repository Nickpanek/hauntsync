/**
 * GET /api/signed-url?assetId=<id>&email=<email>
 *
 * 1. Validates that `email` owns `assetId` (via Lemon Squeezy order lookup)
 * 2. Generates a 4-hour Cloudflare R2 signed URL for the master file
 * 3. Returns { url, expiresAt } — browser initiates a direct edge download
 *
 * No server-side proxying: Vercel never touches the file bytes.
 */

import { NextRequest, NextResponse } from "next/server";
import { generateSignedUrl, assetIdToR2Key } from "@/lib/cloudflare";
import { verifyAssetOwnership } from "@/lib/lemon-squeezy";
import { getAssetById } from "@/lib/inventory";

export const runtime = "nodejs"; // needs crypto + AWS SDK — not edge runtime

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const assetId = searchParams.get("assetId");
    const email = searchParams.get("email");

    // -----------------------------------------------------------------------
    // Input validation
    // -----------------------------------------------------------------------
    if (!assetId || !email) {
      return NextResponse.json(
        { error: "Missing required query params: assetId, email" },
        { status: 400 }
      );
    }

    // Basic email sanity check (not a full RFC 5322 parser — just prevents
    // garbage from hitting the LS API)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const asset = getAssetById(assetId);
    if (!asset) {
      return NextResponse.json({ error: "Asset not found" }, { status: 404 });
    }

    // -----------------------------------------------------------------------
    // Ownership check
    // -----------------------------------------------------------------------
    const owns = await verifyAssetOwnership(email, assetId);
    if (!owns) {
      return NextResponse.json(
        { error: "You do not own this asset. Purchase it first." },
        { status: 403 }
      );
    }

    // -----------------------------------------------------------------------
    // Generate signed URL
    // -----------------------------------------------------------------------
    const fileType = asset.type === "audio" ? "audio" : "video";
    const key = assetIdToR2Key(assetId, fileType);

    // Friendly filename: "Haunted Hallway - HauntSync 1080p Master.mp4"
    const ext = fileType === "audio" ? "wav" : "mp4";
    const downloadFilename = `${asset.name} - HauntSync 1080p Master.${ext}`;

    const { url, expiresAt } = await generateSignedUrl({
      key,
      expiresInSeconds: 14_400, // 4 hours
      downloadFilename,
    });

    return NextResponse.json({ url, expiresAt, assetId, filename: downloadFilename });
  } catch (err) {
    console.error("[signed-url]", err);
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}
