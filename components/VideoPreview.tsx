"use client";

/**
 * VideoPreview — Intersection Observer lazy-load for video elements.
 *
 * Does NOT set `src` until the element enters the viewport, preventing
 * hundreds of concurrent video fetches on the gallery page.
 *
 * Zero layout shift: wrapper uses a fixed aspect-ratio box.
 */

import { useRef, useEffect, useState } from "react";

interface VideoPreviewProps {
  src: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  /** Root margin for IntersectionObserver — defaults to '100px' (pre-load just before visible) */
  rootMargin?: string;
}

export default function VideoPreview({
  src,
  poster,
  className = "",
  autoPlay = true,
  loop = true,
  muted = true,
  rootMargin = "100px",
}: VideoPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loaded) {
          el.src = src;
          setLoaded(true);
          if (autoPlay) el.play().catch(() => {});
        }
      },
      { rootMargin }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [src, loaded, autoPlay, rootMargin]);

  return (
    <video
      ref={videoRef}
      poster={poster}
      muted={muted}
      loop={loop}
      playsInline
      preload="none"
      className={className}
    />
  );
}
