/**
 * POST /api/lemon-squeezy/webhook
 *
 * Handles Lemon Squeezy order events.
 *
 * Configure in LS dashboard:
 *   URL:    https://yourdomain.com/api/lemon-squeezy/webhook
 *   Events: order_created, order_refunded
 *
 * The handler currently just verifies the signature and logs events.
 * Extend the switch block to write to your DB, send welcome emails, etc.
 */

import { NextRequest, NextResponse } from "next/server";
import { verifyWebhookSignature, LsWebhookPayload } from "@/lib/lemon-squeezy";

export const runtime = "nodejs";

// Next.js App Router: disable body parsing so we can read raw bytes for HMAC
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-signature");

  // -------------------------------------------------------------------------
  // 1. Signature verification — reject anything that doesn't match
  // -------------------------------------------------------------------------
  let valid: boolean;
  try {
    valid = await verifyWebhookSignature(rawBody, signature);
  } catch (err) {
    console.error("[webhook] signature check failed:", err);
    return NextResponse.json({ error: "Configuration error" }, { status: 500 });
  }

  if (!valid) {
    console.warn("[webhook] invalid signature, rejecting request");
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  // -------------------------------------------------------------------------
  // 2. Parse payload
  // -------------------------------------------------------------------------
  let payload: LsWebhookPayload;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { event_name } = payload.meta;
  const order = payload.data;

  console.log(`[webhook] event=${event_name} orderId=${order.id}`);

  // -------------------------------------------------------------------------
  // 3. Event handlers
  // -------------------------------------------------------------------------
  switch (event_name) {
    case "order_created": {
      // Order is paid — grant access
      // TODO: persist to your DB:
      //   await db.order.upsert({ where: { lsOrderId: order.id }, ... })
      console.log(
        `[webhook] order_created for ${order.attributes.user_email}`,
        order.attributes.first_order_item
      );
      break;
    }

    case "order_refunded": {
      // Access revoked
      // TODO: remove from DB / mark as refunded
      console.log(
        `[webhook] order_refunded for ${order.attributes.user_email}`
      );
      break;
    }

    default:
      console.log(`[webhook] unhandled event: ${event_name}`);
  }

  // LS expects a 200 within 5 s — always return quickly
  return NextResponse.json({ received: true });
}
