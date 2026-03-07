"use client";

/**
 * DownloadButton
 *
 * Renders a single "Download 1080p Master" button for one asset.
 *
 * Click flow:
 *  1. Button enters loading state
 *  2. Calls GET /api/signed-url?assetId=X&email=Y
 *  3. On success: opens the signed URL in a new tab (browser handles download)
 *  4. Shows expiry countdown so the user knows the link is time-limited
 *  5. Shows error message on failure (asset not owned, server error, etc.)
 *
 * Props:
 *  assetId   – matches inventory asset id
 *  email     – buyer email from session / URL param
 *  label     – optional button label override
 *  fileSize  – shown as hint text (e.g. "1.8 GB")
 */

import { useState } from "react";

interface DownloadButtonProps {
  assetId: string;
  email: string;
  label?: string;
  fileSize?: string;
  className?: string;
}

type DownloadState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "ready"; url: string; expiresAt: string; filename: string }
  | { status: "error"; message: string };

export default function DownloadButton({
  assetId,
  email,
  label = "Download 1080p Master",
  fileSize,
  className = "",
}: DownloadButtonProps) {
  const [state, setState] = useState<DownloadState>({ status: "idle" });

  async function handleClick() {
    if (state.status === "loading") return;

    // If we already have a valid signed URL, just re-open it
    if (state.status === "ready") {
      window.open(state.url, "_blank", "noreferrer");
      return;
    }

    setState({ status: "loading" });

    try {
      const params = new URLSearchParams({ assetId, email });
      const res = await fetch(`/api/signed-url?${params.toString()}`);
      const data = await res.json();

      if (!res.ok) {
        setState({ status: "error", message: data.error ?? "Unknown error" });
        return;
      }

      setState({
        status: "ready",
        url: data.url,
        expiresAt: data.expiresAt,
        filename: data.filename,
      });

      // Open the signed URL immediately — browser treats it as a file download
      window.open(data.url, "_blank", "noreferrer");
    } catch {
      setState({
        status: "error",
        message: "Network error. Please check your connection and try again.",
      });
    }
  }

  function handleReset() {
    setState({ status: "idle" });
  }

  const isLoading = state.status === "loading";

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <button
        onClick={handleClick}
        disabled={isLoading}
        aria-label={`${label}${fileSize ? ` (${fileSize})` : ""}`}
        className={[
          "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5",
          "text-sm font-semibold transition-all duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#121212]",
          isLoading
            ? "cursor-not-allowed bg-orange-700/60 text-orange-200"
            : state.status === "ready"
            ? "bg-green-700 text-white hover:bg-green-600 active:scale-[0.98]"
            : state.status === "error"
            ? "bg-red-700/80 text-white hover:bg-red-600 active:scale-[0.98]"
            : "bg-orange-600 text-white hover:bg-orange-500 active:scale-[0.98]",
        ].join(" ")}
      >
        {isLoading ? (
          <>
            <Spinner />
            Generating link…
          </>
        ) : state.status === "ready" ? (
          <>
            <CheckIcon />
            Re-download
          </>
        ) : state.status === "error" ? (
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
      {fileSize && state.status === "idle" && (
        <p className="text-xs text-gray-500">{fileSize} · MP4 / WAV master</p>
      )}

      {/* Expiry notice */}
      {state.status === "ready" && (
        <p className="text-xs text-green-400">
          Link valid until{" "}
          {new Date(state.expiresAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}{" "}
          —{" "}
          <button
            onClick={handleReset}
            className="underline hover:text-green-300"
          >
            generate fresh link
          </button>
        </p>
      )}

      {/* Error detail */}
      {state.status === "error" && (
        <p className="text-xs text-red-400">
          {state.message}{" "}
          <button
            onClick={handleReset}
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
// Inline SVG icons — no extra icon package needed
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

function CheckIcon() {
  return (
    <svg
      className="h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
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
