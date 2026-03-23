"use client";

import Link from "next/link";
import { useRef, useEffect } from "react";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay blocked — fine, poster image shows
      });
    }
  }, []);

  return (
    <section className="relative isolate overflow-hidden min-h-[90vh] flex items-center justify-center px-4 py-20 sm:py-32">
      {/* Video background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-40"
      >
        {/* Source populated at deploy time via env or CMS */}
        <source src="/preview-loop.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-[#121212]/60 via-[#121212]/40 to-[#121212]"
      />

      {/* Neon red radial glow behind headline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF0000]/10 blur-3xl"
      />

      <div className="mx-auto max-w-4xl text-center">
        <span className="inline-block rounded-full border border-[#00FF00]/30 bg-[#00FF00]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#00FF00]">
          AI-Restored 1080p Masters
        </span>

        <h1 className="font-creepster mt-6 text-5xl leading-tight sm:text-7xl lg:text-8xl">
          <span className="text-white">Halloween FX</span>
          <br />
          <span className="text-[#FF0000] neon-red-glow">That Hit Different</span>
        </h1>

        <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-300 sm:text-xl leading-relaxed">
          Cinematic 1080p projection loops, ChromaDepth wallpaper, and
          bone-chilling audio — individually downloaded, persistently yours.
          No ZIPs. No subscriptions. No annual shakedowns.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="#gallery"
            className="inline-flex items-center gap-2 rounded-xl bg-[#FF0000] px-8 py-4 text-base font-bold text-white transition-all hover:bg-[#cc0000] hover:scale-105 box-neon-red"
          >
            Browse Loops
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
          <Link
            href="#season-pass"
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
          >
            Season Pass Bundle
          </Link>
        </div>

        {/* Social proof strip */}
        <p className="mt-10 text-sm text-gray-500">
          Trusted by haunted attractions &amp; serious home haunters nationwide
        </p>
      </div>
    </section>
  );
}
