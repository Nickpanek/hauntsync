/**
 * Homepage — product gallery
 *
 * Server component: renders the initial grid.
 * Product cards are client components for hover/touch autoplay.
 */

import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { ASSETS, SEASON_PASS_ASSETS, SEASON_PASS_PRICE_CENTS } from "@/lib/inventory";

export const metadata = {
  title: "HauntSync — AI-Restored Halloween Projection Loops",
  description:
    "Professional 1080p Halloween projection loops, AI-restored with Real-ESRGAN. Instant download, no ZIP friction. Perfect for commercial haunted houses and homeowners.",
};

export default function HomePage({
  searchParams,
}: {
  searchParams?: { q?: string };
}) {
  const query = searchParams?.q?.toLowerCase() ?? "";

  const filtered = query
    ? ASSETS.filter(
        (a) =>
          a.name.toLowerCase().includes(query) ||
          a.description.toLowerCase().includes(query) ||
          a.tags.some((t) => t.toLowerCase().includes(query))
      )
    : ASSETS;

  const videoAssets = filtered.filter((a) => a.type === "video");
  const audioAssets = filtered.filter((a) => a.type === "audio");

  return (
    <main className="min-h-screen bg-[#121212] text-white">
      {/* ------------------------------------------------------------------ */}
      {/* Hero */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative overflow-hidden px-4 py-20 text-center sm:py-28">
        {/* Background glow */}
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          aria-hidden="true"
        >
          <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-orange-600/10 blur-3xl" />
        </div>

        <div className="mx-auto max-w-3xl">
          <span className="inline-block rounded-full border border-orange-600/40 bg-orange-600/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-orange-400">
            AI-Restored 1080p Masters
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
            Halloween Projection Loops{" "}
            <span className="text-orange-400">That Actually Hold Up</span>
          </h1>
          <p className="mt-5 text-lg text-gray-400 sm:text-xl">
            Real-ESRGAN upscaled from the original SD masters. Persistent downloads.
            No subscriptions, no ZIPs, no annual license.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="#gallery"
              className="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-8 py-3.5 font-semibold text-white hover:bg-orange-500 transition-colors"
            >
              Browse {ASSETS.length} Assets
            </a>
            <a
              href="#season-pass"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-8 py-3.5 font-semibold text-white hover:bg-white/8 transition-colors"
            >
              ${(SEASON_PASS_PRICE_CENTS / 100).toFixed(2)} Season Pass →
            </a>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Why HauntSync vs AtmosFX */}
      {/* ------------------------------------------------------------------ */}
      <section className="border-y border-white/10 bg-white/4 px-4 py-10">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 sm:grid-cols-4">
          {[
            { stat: "1080p", label: "True HD masters" },
            { stat: "4hr", label: "Signed URL expiry" },
            { stat: "0 ZIPs", label: "Individual file downloads" },
            { stat: "∞", label: "Regenerate links anytime" },
          ].map(({ stat, label }) => (
            <div key={label} className="text-center">
              <p className="text-3xl font-extrabold text-orange-400">{stat}</p>
              <p className="mt-1 text-sm text-gray-400">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Season Pass CTA */}
      {/* ------------------------------------------------------------------ */}
      <section id="season-pass" className="px-4 py-16">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-orange-600/30 bg-gradient-to-br from-orange-950/50 to-[#121212]">
          <div className="flex flex-col gap-6 p-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-2 inline-block rounded-full bg-orange-600 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">
                Best Value
              </div>
              <h2 className="text-2xl font-bold">2024 Season Pass</h2>
              <p className="mt-2 max-w-md text-gray-400">
                Every video loop + every audio track — {SEASON_PASS_ASSETS.length} assets total.
                One payment, persistent access. Download files individually as you need them.
              </p>
              <ul className="mt-4 grid grid-cols-2 gap-x-8 gap-y-1.5 text-sm text-gray-300">
                {[
                  `${SEASON_PASS_ASSETS.filter((a) => a.type === "video").length} video loops`,
                  `${SEASON_PASS_ASSETS.filter((a) => a.type === "audio").length} audio tracks`,
                  "1080p MP4 masters",
                  "24-bit WAV audio",
                  "No annual renewal",
                  "Individual downloads",
                  "Commercial license",
                  "4hr signed URLs",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="text-orange-400">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="shrink-0 text-center">
              <p className="text-4xl font-extrabold text-white">
                ${(SEASON_PASS_PRICE_CENTS / 100).toFixed(2)}
              </p>
              <p className="text-sm text-gray-400">
                vs ${((ASSETS.length * 1499) / 100).toFixed(2)} à la carte
              </p>
              <a
                href="https://hauntsync.lemonsqueezy.com/checkout/season-pass"
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-block rounded-xl bg-orange-600 px-8 py-3.5 font-bold text-white hover:bg-orange-500 transition-colors"
              >
                Get Season Pass
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Gallery */}
      {/* ------------------------------------------------------------------ */}
      <section id="gallery" className="px-4 pb-24">
        <div className="mx-auto max-w-7xl">
          {query && (
            <p className="mb-6 text-gray-400">
              {filtered.length} result{filtered.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
              &nbsp;·&nbsp;
              <Link href="/" className="text-orange-400 underline">
                Clear
              </Link>
            </p>
          )}

          {/* Video loops */}
          {videoAssets.length > 0 && (
            <>
              <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-gray-500">
                Video Loops ({videoAssets.length})
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {videoAssets.map((asset) => (
                  <ProductCard key={asset.id} asset={asset} />
                ))}
              </div>
            </>
          )}

          {/* Audio */}
          {audioAssets.length > 0 && (
            <>
              <h2 className="mb-6 mt-14 text-sm font-semibold uppercase tracking-widest text-gray-500">
                Audio ({audioAssets.length})
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {audioAssets.map((asset) => (
                  <ProductCard key={asset.id} asset={asset} />
                ))}
              </div>
            </>
          )}

          {filtered.length === 0 && (
            <div className="py-24 text-center text-gray-500">
              No assets found for &ldquo;{query}&rdquo;.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
