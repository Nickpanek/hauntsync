"use client";

/**
 * ProductCard
 *
 * Desktop: hover → muted 480p preview autoplays
 * Mobile:  Intersection Observer triggers play when card enters viewport
 *
 * Zero layout shift: fixed aspect-ratio container reserves space before video loads.
 */

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { Asset } from "@/lib/inventory";

interface ProductCardProps {
  asset: Asset;
}

export default function ProductCard({ asset }: ProductCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // Intersection Observer for mobile autoplay
  useEffect(() => {
    const el = cardRef.current;
    const video = videoRef.current;
    if (!el || !video) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        // Only auto-trigger on touch devices (no hover support)
        const isTouch = window.matchMedia("(hover: none)").matches;
        if (!isTouch) return;
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
          video.currentTime = 0;
        }
      },
      { threshold: 0.6 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  function handleMouseEnter() {
    setHovered(true);
    videoRef.current?.play().catch(() => {});
  }

  function handleMouseLeave() {
    setHovered(false);
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  }

  const isAudio = asset.type === "audio";

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#1a1a1a] transition-transform duration-200 hover:scale-[1.02]"
    >
      {/* ------------------------------------------------------------------ */}
      {/* Preview media */}
      {/* ------------------------------------------------------------------ */}
      <div className="relative aspect-video w-full overflow-hidden bg-black">
        {isAudio ? (
          <div className="flex h-full items-center justify-center">
            <span className="text-4xl">🎵</span>
          </div>
        ) : (
          <>
            {/* Poster image — zero layout shift */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset.thumbnailPath}
              alt={asset.name}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                hovered ? "opacity-0" : "opacity-100"
              }`}
              loading="lazy"
            />
            <video
              ref={videoRef}
              src={asset.previewPath}
              muted
              loop
              playsInline
              preload="none"
              className={`h-full w-full object-cover transition-opacity duration-300 ${
                hovered ? "opacity-100" : "opacity-0"
              }`}
            />
          </>
        )}

        {/* Watermark badge */}
        <div className="absolute bottom-2 right-2 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-mono text-gray-400 backdrop-blur-sm">
          480p watermark
        </div>

        {/* Type badge */}
        <div className="absolute left-2 top-2 rounded-full bg-black/70 px-2 py-0.5 text-xs font-semibold capitalize text-white backdrop-blur-sm">
          {asset.type}
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Info */}
      {/* ------------------------------------------------------------------ */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-semibold leading-snug text-white">{asset.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-gray-400">
          {asset.description}
        </p>
        <div className="mt-2 flex flex-wrap gap-1">
          {asset.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 px-2 py-0.5 text-xs text-gray-500"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-lg font-bold text-white">
            ${(asset.priceCents / 100).toFixed(2)}
          </span>
          <Link
            href={`/products/${asset.id}`}
            className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-500 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
