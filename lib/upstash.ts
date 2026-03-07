/**
 * Upstash Redis rate limiter
 *
 * Limits download link generation to 10 requests per 10 minutes per
 * (email + assetId) pair. This prevents:
 *  - Brute-force order ID guessing
 *  - Accidental/bot-driven hammering of the LS API + R2 signing
 *
 * Environment variables:
 *   UPSTASH_REDIS_REST_URL   – from Upstash console (e.g. https://...upstash.io)
 *   UPSTASH_REDIS_REST_TOKEN – from Upstash console
 *
 * If the env vars are missing (local dev without Redis), rate limiting is
 * bypassed with a warning rather than crashing the app.
 */

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

let _ratelimit: Ratelimit | null = null;

function getRatelimiter(): Ratelimit | null {
  if (_ratelimit) return _ratelimit;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    // Dev-mode bypass: log once and skip rate limiting
    console.warn(
      "[upstash] UPSTASH_REDIS_REST_URL / TOKEN not set — rate limiting disabled"
    );
    return null;
  }

  _ratelimit = new Ratelimit({
    redis: new Redis({ url, token }),
    // Sliding window: 10 requests per 10 minutes per identifier
    limiter: Ratelimit.slidingWindow(10, "10 m"),
    analytics: false,
    prefix: "hauntsync:rl",
  });

  return _ratelimit;
}

export interface RateLimitResult {
  success: boolean;
  /** Remaining requests allowed in current window */
  remaining: number;
  /** When the window resets (Unix ms) */
  reset: number;
}

/**
 * Check rate limit for a given identifier (e.g. `${email}:${assetId}`).
 * Returns `{ success: true }` when Upstash is not configured (dev bypass).
 */
export async function checkRateLimit(
  identifier: string
): Promise<RateLimitResult> {
  const limiter = getRatelimiter();

  if (!limiter) {
    return { success: true, remaining: 999, reset: 0 };
  }

  const result = await limiter.limit(identifier);
  return {
    success: result.success,
    remaining: result.remaining,
    reset: result.reset,
  };
}
