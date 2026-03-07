/**
 * Product detail page
 *
 * /products/[slug]
 *
 * Features:
 *  - 1080p watermarked preview (autoplay muted)
 *  - Specs table
 *  - Before/After restoration slider
 *  - Collapsible authorship log
 *  - Lemon Squeezy checkout link
 */

import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ASSETS, getAssetById } from "@/lib/inventory";
import BeforeAfter from "@/components/BeforeAfter";
import ProductCard from "@/components/ProductCard";

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return ASSETS.map((a) => ({ slug: a.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const asset = getAssetById(params.slug);
  if (!asset) return { title: "Not Found" };
  return {
    title: `${asset.name} — HauntSync`,
    description: asset.description,
  };
}

export default function ProductPage({ params }: PageProps) {
  const asset = getAssetById(params.slug);
  if (!asset) notFound();

  // Related assets (same type, exclude self)
  const related = ASSETS.filter(
    (a) => a.id !== asset.id && a.type === asset.type
  ).slice(0, 4);

  const isAudio = asset.type === "audio";
  // Variant ID lives in variant-mapping.ts — product pages link to the store root
  // for now; replace with a direct LS checkout link once variant IDs are known.
  const checkoutUrl = `https://hauntsync.lemonsqueezy.com/checkout?product=${asset.id}`;

  return (
    <main className="min-h-screen bg-[#121212] text-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-white transition-colors">
            Store
          </Link>
          <span>/</span>
          <span className="capitalize">{asset.type}</span>
          <span>/</span>
          <span className="text-gray-300">{asset.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          {/* ---------------------------------------------------------------- */}
          {/* Left — media + slider */}
          {/* ---------------------------------------------------------------- */}
          <div className="flex flex-col gap-6">
            {/* Main preview */}
            {isAudio ? (
              <div className="flex aspect-video w-full items-center justify-center rounded-2xl bg-[#1a1a1a]">
                <div className="text-center">
                  <span className="text-6xl">🎵</span>
                  <p className="mt-3 text-sm text-gray-400">Audio preview</p>
                  <audio
                    src={asset.previewPath}
                    controls
                    className="mt-4 w-full max-w-xs"
                  />
                </div>
              </div>
            ) : (
              <div className="relative overflow-hidden rounded-2xl bg-black">
                <video
                  src={asset.previewPath}
                  poster={asset.thumbnailPath}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="aspect-video w-full object-cover"
                />
                <div className="absolute bottom-3 right-3 rounded bg-black/70 px-2 py-1 text-xs text-gray-300 backdrop-blur-sm">
                  480p watermarked preview
                </div>
              </div>
            )}

            {/* Before / After slider */}
            {!isAudio && (
              <div>
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
                  Restoration Comparison — Drag to Compare
                </h2>
                <BeforeAfter
                  beforeSrc={asset.previewPath}
                  afterSrc={asset.previewPath} // prod: point at 1080p watermarked preview
                  poster={asset.thumbnailPath}
                />
              </div>
            )}

            {/* Authorship log — collapsible */}
            <details className="rounded-xl border border-white/10 bg-white/5 px-5 py-4">
              <summary className="cursor-pointer list-none text-sm font-medium text-gray-300 hover:text-white select-none">
                <span className="flex items-center justify-between">
                  Restoration Log
                  <ChevronIcon />
                </span>
              </summary>
              <div className="mt-4 space-y-3 text-sm text-gray-400">
                <LogEntry
                  step="Source"
                  detail="Original SD master (480p, VHS-sourced)"
                />
                <LogEntry
                  step="Upscale"
                  detail="Real-ESRGAN 4× with face / texture enhancement model"
                />
                <LogEntry
                  step="Color"
                  detail="Black crush correction (+12 lift on shadows), hue normalization"
                />
                <LogEntry
                  step="Noise"
                  detail="Temporal noise reduction, grain synthesis for film character"
                />
                <LogEntry
                  step="Loop"
                  detail={`${asset.loopType} — frame-accurate edit point`}
                />
                <LogEntry
                  step="Encode"
                  detail="H.264 High Profile, CRF 16, yuv420p, 48 kHz stereo audio"
                />
              </div>
            </details>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* Right — buy panel */}
          {/* ---------------------------------------------------------------- */}
          <div className="flex flex-col gap-6">
            {/* Title + price */}
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-orange-400">
                {asset.type}
              </span>
              <h1 className="mt-1 text-3xl font-bold leading-tight">{asset.name}</h1>
              <p className="mt-3 text-gray-400">{asset.description}</p>
            </div>

            {/* Specs */}
            <div className="rounded-xl border border-white/10 bg-white/5 divide-y divide-white/8">
              {[
                ["Resolution", asset.resolution],
                ["File size", asset.fileSize],
                ["Duration", formatDuration(asset.durationSeconds)],
                ["Loop type", asset.loopType],
                ["Technique", asset.technique],
                ["License", "Commercial use included"],
                ["Format", asset.type === "audio" ? "WAV 24-bit / 48 kHz" : "MP4 H.264"],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between px-4 py-2.5 text-sm">
                  <span className="text-gray-500">{label}</span>
                  <span className="text-right text-gray-200">{value}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col gap-3">
              <a
                href={checkoutUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-xl bg-orange-600 px-6 py-4 font-bold text-white hover:bg-orange-500 transition-colors"
              >
                <span>Buy This Asset</span>
                <span className="text-xl">
                  ${(asset.priceCents / 100).toFixed(2)}
                </span>
              </a>
              <a
                href="https://hauntsync.lemonsqueezy.com/checkout/season-pass"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-xl border border-orange-600/40 bg-orange-950/30 px-6 py-4 font-medium text-orange-300 hover:bg-orange-900/40 transition-colors"
              >
                <span>Season Pass — All {ASSETS.length} assets</span>
                <span>$199.99</span>
              </a>
            </div>

            {/* Trust signals */}
            <ul className="space-y-1.5 text-sm text-gray-500">
              {[
                "Instant access after checkout",
                "Individual file downloads — no ZIPs",
                "Re-download anytime via dashboard",
                "4-hour signed URLs from Cloudflare edge",
                "Apple Pay / Google Pay supported",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* Related assets */}
        {/* ------------------------------------------------------------------ */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-gray-500">
              More {asset.type === "audio" ? "Audio" : "Video Loops"}
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((a) => (
                <ProductCard key={a.id} asset={a} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

function LogEntry({ step, detail }: { step: string; detail: string }) {
  return (
    <div className="flex gap-3">
      <span className="shrink-0 font-mono text-xs text-orange-400 pt-0.5 w-14">{step}</span>
      <span>{detail}</span>
    </div>
  );
}

function ChevronIcon() {
  return (
    <svg
      className="h-4 w-4 transition-transform details-open:rotate-180"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return s === 0 ? `${m} min` : `${m}m ${s}s`;
}
