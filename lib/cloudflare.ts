/**
 * Cloudflare R2 Signed URL Generation
 *
 * Uses AWS SDK v3 with the S3-compatible R2 endpoint.
 * R2 signed URLs are structurally identical to S3 presigned URLs —
 * the only difference is the endpoint domain.
 *
 * Environment variables required:
 *   R2_ACCOUNT_ID       – Cloudflare account ID
 *   R2_ACCESS_KEY_ID    – R2 API token access key ID
 *   R2_SECRET_ACCESS_KEY – R2 API token secret access key
 *   R2_BUCKET_NAME      – Bucket containing the 1080p masters
 *   R2_PUBLIC_DOMAIN    – (optional) custom domain on bucket, falls back to r2.dev URL
 */

import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Singleton client — created once per cold-start, reused across requests
let _client: S3Client | null = null;

function getR2Client(): S3Client {
  if (_client) return _client;

  const accountId = process.env.R2_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;

  if (!accountId || !accessKeyId || !secretAccessKey) {
    throw new Error(
      "Missing R2 credentials. Set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, and R2_SECRET_ACCESS_KEY."
    );
  }

  _client = new S3Client({
    region: "auto", // R2 requires "auto"
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId, secretAccessKey },
  });

  return _client;
}

export interface SignedUrlOptions {
  /** Object key inside the R2 bucket, e.g. "masters/haunted-hallway-1080p.mp4" */
  key: string;
  /** Expiry in seconds. Default: 4 hours (14 400 s). Max R2 allows: 7 days. */
  expiresInSeconds?: number;
  /**
   * Suggested filename sent to the browser via Content-Disposition.
   * If omitted, the browser uses the last path segment of the key.
   */
  downloadFilename?: string;
}

export interface SignedUrlResult {
  url: string;
  /** UTC timestamp when the URL will stop working */
  expiresAt: string;
}

/**
 * Generate a time-limited signed URL for a single R2 object.
 *
 * The returned URL allows the bearer to GET the object directly from
 * Cloudflare's edge without any server involvement — ideal for large
 * video/audio files where you don't want to proxy bandwidth through Vercel.
 */
export async function generateSignedUrl(
  options: SignedUrlOptions
): Promise<SignedUrlResult> {
  const { key, expiresInSeconds = 14_400, downloadFilename } = options;

  const bucket = process.env.R2_BUCKET_NAME;
  if (!bucket) throw new Error("R2_BUCKET_NAME is not set.");

  const client = getR2Client();

  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
    // Force browser to download rather than stream in-tab
    ResponseContentDisposition: downloadFilename
      ? `attachment; filename="${encodeURIComponent(downloadFilename)}"`
      : "attachment",
  });

  const url = await getSignedUrl(client, command, {
    expiresIn: expiresInSeconds,
  });

  const expiresAt = new Date(
    Date.now() + expiresInSeconds * 1000
  ).toISOString();

  return { url, expiresAt };
}

/**
 * Build the R2 object key for a given asset ID.
 *
 * Convention:
 *   Video masters → masters/<assetId>.mp4
 *   Audio masters → masters/<assetId>.wav
 *
 * Adjust the prefix / extension map if your bucket layout differs.
 */
export function assetIdToR2Key(
  assetId: string,
  fileType: "video" | "audio"
): string {
  const ext = fileType === "audio" ? "wav" : "mp4";
  return `masters/${assetId}.${ext}`;
}
