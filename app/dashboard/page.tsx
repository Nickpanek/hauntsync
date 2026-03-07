/**
 * Dashboard — post-purchase asset library
 *
 * URL: /dashboard?email=buyer@example.com
 *
 * Server component: fetches the buyer's owned assets (with order IDs) server-side,
 * then renders the asset list with client-side DownloadButton components.
 *
 * Each DownloadButton receives both `email` and `orderId` so the signed-url
 * API can verify ownership by binding the order to the email at Lemon Squeezy —
 * preventing pure email-enumeration attacks (P2 security model).
 */

import { Suspense } from "react";
import Link from "next/link";
import { getOwnedAssets, OwnedAsset } from "@/lib/lemon-squeezy";
import { SEASON_PASS_ASSETS, getAssetById, Asset } from "@/lib/inventory";
import DownloadButton from "@/components/DownloadButton";
import AssetTypeIcon from "@/components/AssetTypeIcon";

interface DashboardPageProps {
  searchParams: { email?: string };
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const email = searchParams.email ?? "";

  if (!email) {
    return <EmailGate />;
  }

  let ownedAssets: OwnedAsset[] = [];
  let fetchError: string | null = null;

  try {
    ownedAssets = await getOwnedAssets(email);
  } catch (err) {
    fetchError =
      err instanceof Error ? err.message : "Could not load your library.";
  }

  const isSeasonPass = ownedAssets.length === SEASON_PASS_ASSETS.length;

  const resolvedAssets = ownedAssets
    .map((owned) => {
      const asset = getAssetById(owned.assetId);
      return asset ? { asset, orderId: owned.orderId } : null;
    })
    .filter(Boolean) as Array<{ asset: Asset; orderId: string }>;

  const videoAssets = resolvedAssets.filter((r) => r.asset.type === "video");
  const audioAssets = resolvedAssets.filter((r) => r.asset.type === "audio");

  return (
    <main className="min-h-screen bg-[#121212] text-white">
      <header className="border-b border-white/10 px-4 py-4 sm:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight text-orange-400">
            HauntSync
          </Link>
          <span className="text-sm text-gray-400">{email}</span>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-8">
        {/* Hero strip */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">My Library</h1>
            {isSeasonPass && (
              <span className="rounded-full bg-orange-600 px-3 py-1 text-xs font-bold uppercase tracking-wider">
                Season Pass
              </span>
            )}
          </div>
          {isSeasonPass ? (
            <p className="mt-2 text-gray-400">
              You own the full season pass —{" "}
              <strong className="text-white">{resolvedAssets.length} assets</strong>{" "}
              available. Click any button to generate a 4-hour download link from
              Cloudflare&apos;s edge. No ZIPs, no waiting.
            </p>
          ) : (
            <p className="mt-2 text-gray-400">
              {resolvedAssets.length} asset
              {resolvedAssets.length !== 1 ? "s" : ""} in your library.{" "}
              <Link href="/" className="text-orange-400 underline hover:text-orange-300">
                Browse more assets →
              </Link>
            </p>
          )}
        </div>

        {/* Error state */}
        {fetchError && (
          <div className="mb-8 rounded-xl border border-red-700/50 bg-red-900/20 p-5">
            <p className="font-semibold text-red-300">Could not load your library</p>
            <p className="mt-1 text-sm text-red-400">{fetchError}</p>
            <p className="mt-2 text-sm text-gray-400">
              Try refreshing the page. If the issue persists,{" "}
              <a href="mailto:support@hauntsync.com" className="text-orange-400 underline">
                contact support
              </a>
              .
            </p>
          </div>
        )}

        {/* Empty state */}
        {!fetchError && resolvedAssets.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-white/5 px-8 py-16 text-center">
            <p className="text-4xl">👻</p>
            <h2 className="mt-4 text-xl font-semibold">Nothing here yet</h2>
            <p className="mt-2 text-gray-400">
              Your purchase will appear here within a few seconds of checkout.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-orange-600 px-6 py-3 font-semibold text-white hover:bg-orange-500 transition-colors"
            >
              Browse Assets
            </Link>
          </div>
        )}

        {/* Asset grid */}
        {resolvedAssets.length > 0 && (
          <>
            <AssetSection title="Video Loops" items={videoAssets} email={email} />
            <AssetSection
              title="Audio"
              items={audioAssets}
              email={email}
              className="mt-12"
            />
          </>
        )}

        {/* Season pass upsell */}
        {!isSeasonPass && !fetchError && resolvedAssets.length > 0 && (
          <div className="mt-14 rounded-2xl border border-orange-600/30 bg-orange-950/30 p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-bold text-orange-300">
                  Upgrade to the Season Pass
                </h3>
                <p className="mt-1 text-sm text-gray-400">
                  Get all {SEASON_PASS_ASSETS.length} assets (video + audio) for one
                  flat price. Instant access, persistent links, no annual renewal.
                </p>
              </div>
              <a
                href="https://hauntsync.lemonsqueezy.com/checkout/season-pass"
                target="_blank"
                rel="noreferrer"
                className="shrink-0 rounded-lg bg-orange-600 px-6 py-3 text-center font-semibold text-white hover:bg-orange-500 transition-colors"
              >
                $199.99 — Get All Assets
              </a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function AssetSection({
  title,
  items,
  email,
  className = "",
}: {
  title: string;
  items: Array<{ asset: Asset; orderId: string }>;
  email: string;
  className?: string;
}) {
  if (items.length === 0) return null;

  return (
    <section className={className}>
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gray-500">
        {title} ({items.length})
      </h2>

      <ul className="divide-y divide-white/8 rounded-2xl border border-white/10 overflow-hidden">
        {items.map(({ asset, orderId }) => (
          <li
            key={asset.id}
            className="group flex flex-col gap-4 bg-white/5 px-5 py-5 transition-colors hover:bg-white/8 sm:flex-row sm:items-start sm:gap-6"
          >
            {/* Thumbnail */}
            <div className="relative h-16 w-28 shrink-0 overflow-hidden rounded-lg bg-black">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset.thumbnailPath}
                alt={asset.name}
                className="h-full w-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <AssetTypeIcon type={asset.type} className="h-6 w-6 text-white/70" />
              </div>
            </div>

            {/* Metadata */}
            <div className="flex-1 min-w-0">
              <p className="font-semibold leading-snug">{asset.name}</p>
              <p className="mt-0.5 text-sm text-gray-400 line-clamp-2">
                {asset.description}
              </p>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                <span>{asset.resolution}</span>
                <span>{asset.loopType}</span>
                <span>{asset.fileSize}</span>
                <span>{formatDuration(asset.durationSeconds)}</span>
              </div>
              <p className="mt-1 text-xs text-gray-600 italic">{asset.technique}</p>
            </div>

            {/* Download button — client component receives orderId (P2) */}
            <div className="shrink-0 sm:pt-0.5">
              <Suspense fallback={<DownloadButtonSkeleton />}>
                <DownloadButton
                  assetId={asset.id}
                  email={email}
                  orderId={orderId}
                  fileSize={asset.fileSize}
                />
              </Suspense>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function EmailGate() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#121212] text-white px-4">
      <div className="max-w-md text-center">
        <p className="text-5xl">🔒</p>
        <h1 className="mt-4 text-2xl font-bold">Access Your Library</h1>
        <p className="mt-3 text-gray-400">
          Enter the email address you used at checkout to view your assets.
        </p>
        <form
          action="/dashboard"
          method="get"
          className="mt-6 flex flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            name="email"
            required
            placeholder="you@example.com"
            className="flex-1 rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-sm placeholder-gray-500 focus:border-orange-500 focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-lg bg-orange-600 px-6 py-2.5 font-semibold text-sm text-white hover:bg-orange-500 transition-colors"
          >
            View Library
          </button>
        </form>
        <p className="mt-4 text-xs text-gray-600">
          Purchases appear within seconds of checkout completion.
        </p>
      </div>
    </main>
  );
}

function DownloadButtonSkeleton() {
  return <div className="h-10 w-44 animate-pulse rounded-lg bg-white/10" />;
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return s === 0 ? `${m} min` : `${m}m ${s}s`;
}
