"use client";

/**
 * BeforeAfter — drag slider comparing 480p raw vs 1080p restored.
 *
 * Uses CSS clip-path for zero-layout-shift reveal.
 * Accessible: keyboard left/right arrow navigation.
 */

import { useRef, useState, useCallback } from "react";

interface BeforeAfterProps {
  beforeSrc: string; // 480p watermarked / raw
  afterSrc: string;  // 1080p restored
  beforeLabel?: string;
  afterLabel?: string;
  /** Thumbnail poster for both sides (prevents layout shift) */
  poster?: string;
}

export default function BeforeAfter({
  beforeSrc,
  afterSrc,
  beforeLabel = "480p Original",
  afterLabel = "1080p Restored",
  poster,
}: BeforeAfterProps) {
  const [position, setPosition] = useState(50); // percent
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setPosition(pct);
  }, []);

  // Mouse events
  function onMouseDown(e: React.MouseEvent) {
    dragging.current = true;
    updatePosition(e.clientX);
  }
  function onMouseMove(e: React.MouseEvent) {
    if (!dragging.current) return;
    updatePosition(e.clientX);
  }
  function onMouseUp() {
    dragging.current = false;
  }

  // Touch events
  function onTouchMove(e: React.TouchEvent) {
    updatePosition(e.touches[0].clientX);
  }

  // Keyboard navigation
  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowLeft") setPosition((p) => Math.max(0, p - 2));
    if (e.key === "ArrowRight") setPosition((p) => Math.min(100, p + 2));
  }

  return (
    <div
      ref={containerRef}
      className="relative select-none overflow-hidden rounded-xl"
      style={{ aspectRatio: "16/9", cursor: "ew-resize" }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchMove={onTouchMove}
    >
      {/* After (right / restored) — full width, behind */}
      <video
        src={afterSrc}
        poster={poster}
        muted
        loop
        autoPlay
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Before (left / raw) — clipped to left portion */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <video
          src={beforeSrc}
          poster={poster}
          muted
          loop
          autoPlay
          playsInline
          className="h-full object-cover"
          style={{ width: containerRef.current?.clientWidth ?? "100%" }}
        />
        {/* Before label */}
        <div className="absolute bottom-3 left-3 rounded bg-black/70 px-2 py-1 text-xs font-semibold text-red-300 backdrop-blur-sm">
          {beforeLabel}
        </div>
      </div>

      {/* After label */}
      <div className="absolute bottom-3 right-3 rounded bg-black/70 px-2 py-1 text-xs font-semibold text-green-300 backdrop-blur-sm">
        {afterLabel}
      </div>

      {/* Divider handle */}
      <div
        role="slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        aria-label="Before/after comparison slider"
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="absolute inset-y-0 z-10 flex flex-col items-center justify-center focus:outline-none"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      >
        {/* Vertical line */}
        <div className="h-full w-0.5 bg-white/80" />
        {/* Drag handle circle */}
        <div className="absolute flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-black/60 shadow-lg backdrop-blur-sm">
          <svg
            className="h-4 w-4 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M7 4l-3 6 3 6M13 4l3 6-3 6" />
          </svg>
        </div>
      </div>
    </div>
  );
}
