/**
 * Cart page — lightweight redirect to Lemon Squeezy checkout.
 *
 * Since Lemon Squeezy handles the entire checkout experience as an overlay
 * or hosted page, this page primarily exists for bookmarkable cart URLs
 * and SEO. In practice, users click "Buy" on product pages and are sent
 * directly to LS checkout.
 */

import Link from "next/link";
import { SEASON_PASS_PRICE_CENTS, SEASON_PASS_ASSETS } from "@/lib/inventory";

export const metadata = {
  title: "Cart — HauntSync",
};

export default function CartPage() {
  return (
    <main className="flex min-h-[calc(100vh-56px)] items-center justify-center bg-[#121212] text-white px-4">
      <div className="w-full max-w-lg text-center">
        <p className="text-5xl">🛒</p>
        <h1 className="mt-4 text-2xl font-bold">Ready to Checkout?</h1>
        <p className="mt-3 text-gray-400">
          Checkout is handled securely by Lemon Squeezy — no account required.
          Apple Pay and Google Pay accepted.
        </p>

        <div className="mt-8 flex flex-col gap-3">
          {/* Season pass — best value */}
          <a
            href="https://hauntsync.lemonsqueezy.com/checkout/season-pass"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between rounded-xl bg-orange-600 px-6 py-4 font-semibold text-white hover:bg-orange-500 transition-colors"
          >
            <div className="text-left">
              <p className="font-bold">2024 Season Pass</p>
              <p className="text-sm text-orange-200">
                All {SEASON_PASS_ASSETS.length} assets included
              </p>
            </div>
            <span className="text-xl font-extrabold">
              ${(SEASON_PASS_PRICE_CENTS / 100).toFixed(2)}
            </span>
          </a>

          <Link
            href="/"
            className="rounded-xl border border-white/20 px-6 py-3 text-sm text-gray-300 hover:bg-white/8 transition-colors"
          >
            Browse individual assets →
          </Link>
        </div>

        <p className="mt-6 text-xs text-gray-600">
          Tax / VAT handled by Lemon Squeezy as Merchant of Record.
          Purchases appear in your{" "}
          <Link href="/dashboard" className="text-orange-400 underline">
            dashboard
          </Link>{" "}
          within seconds.
        </p>
      </div>
    </main>
  );
}
