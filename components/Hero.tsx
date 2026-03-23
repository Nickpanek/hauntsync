"use client";

import { GUMROAD_URL } from "@/lib/config";

/** Fog particle blob — pure CSS, zero JS overhead */
function FogBlob({
  style,
  animClass,
}: {
  style: React.CSSProperties;
  animClass: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full blur-3xl ${animClass}`}
      style={style}
    />
  );
}

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-24 text-center sm:py-32">
      {/* ── Video background ──────────────────────────────────────────── */}
      {/* TODO: Replace /videos/hero-reel.mp4 with your actual reel */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        poster="/images/hero-poster.jpg"
        aria-hidden="true"
        className="absolute inset-0 -z-30 h-full w-full object-cover opacity-25"
      >
        <source src="/videos/hero-reel.mp4" type="video/mp4" />
      </video>

      {/* ── Dark overlay ──────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-gradient-to-b from-[#121212]/70 via-[#121212]/50 to-[#121212]"
      />

      {/* ── Fog particle blobs (15 total, CSS-only) ───────────────────── */}
      {/* Each blob uses a different animation class and delay for organic look */}
      <FogBlob animClass="animate-fog-1" style={{ width: 700, height: 700, top: "5%",  left: "10%",  background: "rgba(0,255,136,1)",  animationDelay: "0s" }} />
      <FogBlob animClass="animate-fog-2" style={{ width: 500, height: 500, top: "20%", left: "60%",  background: "rgba(0,180,100,1)",   animationDelay: "-6s" }} />
      <FogBlob animClass="animate-fog-3" style={{ width: 600, height: 600, top: "50%", left: "30%",  background: "rgba(0,255,136,1)",   animationDelay: "-12s" }} />
      <FogBlob animClass="animate-fog-1" style={{ width: 400, height: 400, top: "70%", left: "70%",  background: "rgba(255,107,53,1)",   animationDelay: "-4s" }} />
      <FogBlob animClass="animate-fog-2" style={{ width: 800, height: 800, top: "-10%",left: "40%",  background: "rgba(0,100,60,1)",    animationDelay: "-9s" }} />
      <FogBlob animClass="animate-fog-3" style={{ width: 350, height: 350, top: "80%", left: "5%",   background: "rgba(0,255,136,1)",   animationDelay: "-16s" }} />
      <FogBlob animClass="animate-fog-1" style={{ width: 450, height: 450, top: "35%", left: "85%",  background: "rgba(255,107,53,1)",   animationDelay: "-20s" }} />
      <FogBlob animClass="animate-fog-2" style={{ width: 550, height: 550, top: "60%", left: "50%",  background: "rgba(0,80,50,1)",     animationDelay: "-3s" }} />
      <FogBlob animClass="animate-fog-3" style={{ width: 300, height: 300, top: "15%", left: "20%",  background: "rgba(255,107,53,1)",   animationDelay: "-8s" }} />
      <FogBlob animClass="animate-fog-1" style={{ width: 650, height: 650, top: "45%", left: "0%",   background: "rgba(0,255,136,1)",   animationDelay: "-14s" }} />
      <FogBlob animClass="animate-fog-2" style={{ width: 480, height: 480, top: "90%", left: "80%",  background: "rgba(0,200,120,1)",   animationDelay: "-2s" }} />
      <FogBlob animClass="animate-fog-3" style={{ width: 380, height: 380, top: "25%", left: "75%",  background: "rgba(255,107,53,1)",   animationDelay: "-18s" }} />
      <FogBlob animClass="animate-fog-1" style={{ width: 520, height: 520, top: "75%", left: "25%",  background: "rgba(0,255,136,1)",   animationDelay: "-7s" }} />
      <FogBlob animClass="animate-fog-2" style={{ width: 420, height: 420, top: "5%",  left: "85%",  background: "rgba(0,150,80,1)",    animationDelay: "-22s" }} />
      <FogBlob animClass="animate-fog-3" style={{ width: 600, height: 600, top: "55%", left: "15%",  background: "rgba(0,255,136,1)",   animationDelay: "-11s" }} />

      {/* ── Content ───────────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-4xl">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-[#00FF88]">
          175 Original Loops · Instant MP4 · No Limits
        </p>

        <h1 className="font-cinzel text-4xl font-black leading-tight tracking-tight text-white text-balance sm:text-6xl lg:text-7xl">
          Haunted House Video Loops
          <br />
          <span className="text-[#00FF88]">That Actually Work</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[rgba(255,255,255,0.60)] sm:text-xl">
          175 original seamless 1080p loops. Instant MP4 download.
          No&nbsp;ZIPs. No&nbsp;limits. No&nbsp;expiration.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href={GUMROAD_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-[#00FF88] px-8 py-4 text-base font-bold text-[#121212] transition-all hover:opacity-90 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#00FF88]"
          >
            Browse All Loops
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
          <a
            href="#loops"
            className="inline-flex items-center gap-2 rounded-xl border border-[rgba(255,255,255,0.20)] bg-[rgba(255,255,255,0.05)] px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-[rgba(255,255,255,0.40)] hover:bg-[rgba(255,255,255,0.10)]"
          >
            See What&rsquo;s Inside
          </a>
        </div>

        {/* Trust line */}
        <p className="mt-8 text-sm text-[rgba(255,255,255,0.38)]">
          Used by commercial haunts and home decorators
          &nbsp;·&nbsp; Instant delivery
          &nbsp;·&nbsp; Original art
        </p>
      </div>

      {/* ── Scroll cue ────────────────────────────────────────────────── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[rgba(255,255,255,0.30)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
