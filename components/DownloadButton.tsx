"use client";

/**
 * DownloadButton (P2 + P6)
 *
 * Props:
 *  assetId   – inventory asset ID
 *  email     – buyer email
 *  orderId   – the LS order ID that grants access (passed from dashboard server component)
 *  label     – optional button label override
 *  fileSize  – shown as hint text (e.g. "1.8 GB")
 *
 * Click flow (P6 silent refresh):
 *  1. Check localStorage for a cached signed URL for this (assetId, orderId)
 *  2. If cached URL is still valid (>60s remaining) → open it immediately, no spinner
 *  3. If expired / missing → show spinner, fetch new URL, cache it, open it
 *  4. On error → show user-friendly message (not raw API response)
 *
 * Security (P2):
 *  - Passes orderId to the API alongside email and assetId
 *  - The API verifies the order belongs to this email via Lemon Squeezy
 */

import { useState, useCallback } from "react";

interface DownloadButtonProps {
  assetId: string;
  email: string;
  orderId: string;
  label?: string;
  fileSize?: string;
  className?: string;
}

type ButtonState = "idle" | "loading" | "error";

interface CachedUrl {
  url: string;
  expiresAt: string; // ISO timestamp
}

const CACHE_GRACE_SECONDS = 60; // treat URL as expired if it has <60s left

function getCacheKey(assetId: string, orderId: string): string {
  return `hauntsync:dl:${assetId}:${orderId}`;
}

function readCache(assetId: string, orderId: string): string | null {
  try {
    const raw = localStorage.getItem(getCacheKey(assetId, orderId));
    if (!raw) return null;
    const cached: CachedUrl = JSON.parse(raw);
    const remainingMs = new Date(cached.expiresAt).getTime() - Date.now();
    if (remainingMs > CACHE_GRACE_SECONDS * 1000) {
      return cached.url;
    }
  } catch {
    // Corrupt entry or SSR — ignore
  }
  return null;
}

function writeCache(assetId: string, orderId: string, url: string, expiresAt: string) {
  try {
    const entry: CachedUrl = { url, expiresAt };
    localStorage.setItem(getCacheKey(assetId, orderId), JSON.stringify(entry));
  } catch {
    // localStorage full or unavailable — non-fatal
  }
}

export default function DownloadButton({
  assetId,
  email,
  orderId,
  label = "Download 1080p Master",
  fileSize,
  className = "",
}: DownloadButtonProps) {
  const [state, setState] = useState<ButtonState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleClick = useCallback(async () => {
    if (state === "loading") return;
    setErrorMsg("");

    // P6: Check localStorage for a still-valid signed URL
    const cached = readCache(assetId, orderId);
    if (cached) {
      window.open(cached, "_blank", "noreferrer");
      return;
    }

    // Fetch a fresh signed URL
    setState("loading");

    try {
      const params = new URLSearchParams({ assetId, email, orderId });
      const res = await fetch(`/api/signed-url?${params.toString()}`);
      const data = await res.json();

      if (!res.ok) {
        // Show the server's user-friendly message, never a raw stack trace
        setState("error");
        setErrorMsg(
          data.error ?? "Something went wrong. Please try again."
        );
        return;
      }

      // Cache the URL so subsequent clicks in the same session are instant
      writeCache(assetId, orderId, data.url, data.expiresAt);

      setState("idle");
      window.open(data.url, "_blank", "noreferrer");
    } catch {
      setState("error");
      setErrorMsg("Network error. Please check your connection and try again.");
    }
  }, [assetId, email, orderId, state]);

  function handleDismiss() {
    setState("idle");
    setErrorMsg("");
  }

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <button
        onClick={handleClick}
        disabled={state === "loading"}
        aria-label={`${label}${fileSize ? ` (${fileSize})` : ""}`}
        className={[
          "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5",
          "text-sm font-semibold transition-all duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500",
          "focus-visible:ring-offset-2 focus-visible:ring-offset-[#121212]",
          state === "loading"
            ? "cursor-not-allowed bg-orange-700/60 text-orange-200"
            : state === "error"
            ? "bg-red-700/80 text-white hover:bg-red-600 active:scale-[0.98]"
            : "bg-orange-600 text-white hover:bg-orange-500 active:scale-[0.98]",
        ].join(" ")}
      >
        {state === "loading" ? (
          <>
            <Spinner />
            Generating link…
          </>
        ) : state === "error" ? (
          <>
            <ErrorIcon />
            Retry download
          </>
        ) : (
          <>
            <DownloadIcon />
            {label}
          </>
        )}
      </button>

      {/* File size hint */}
      {fileSize && state === "idle" && (
        <p className="text-xs text-gray-500">{fileSize} · MP4 / WAV master</p>
      )}

      {/* Error message */}
      {state === "error" && errorMsg && (
        <p className="text-xs text-red-400">
          {errorMsg}{" "}
          <button
            onClick={handleDismiss}
            className="underline hover:text-red-300"
          >
            Dismiss
          </button>
        </p>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Inline SVG icons
// ---------------------------------------------------------------------------

function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      className="h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 4v11"
      />
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg
      className="h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
      />
    </svg>
  );
}
