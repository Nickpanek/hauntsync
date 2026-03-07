"use client";

/**
 * SearchBar — client-side autocomplete over the hardcoded inventory.
 *
 * In production, swap the local filter with a Typesense instant-search
 * call using getPublicTypesenseConfig() from lib/typesense.ts.
 *
 * Shows:
 *  - Asset thumbnail
 *  - Name + type badge
 *  - Price
 */

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ASSETS, Asset } from "@/lib/inventory";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Asset[]>([]);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Local fuzzy filter (replace with Typesense in production)
  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) {
      setResults([]);
      setOpen(false);
      return;
    }
    const matches = ASSETS.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q))
    ).slice(0, 6);
    setResults(matches);
    setOpen(matches.length > 0);
  }, [query]);

  // Close on outside click
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative flex items-center">
        <SearchIcon className="absolute left-3 h-4 w-4 text-gray-500 pointer-events-none" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setOpen(true)}
          placeholder="Search loops, haunts, SFX…"
          className="w-full rounded-lg border border-white/15 bg-white/8 py-2 pl-9 pr-4 text-sm text-white placeholder-gray-500 outline-none focus:border-orange-500 focus:ring-0 transition-colors"
          aria-label="Search assets"
          aria-haspopup="listbox"
          aria-controls="search-listbox"
          autoComplete="off"
        />
      </div>

      {/* Dropdown */}
      {open && (
        <ul
          id="search-listbox"
          role="listbox"
          className="absolute top-full left-0 right-0 z-50 mt-1.5 max-h-80 overflow-y-auto rounded-xl border border-white/15 bg-[#1a1a1a] shadow-2xl"
        >
          {results.map((asset) => (
            <li key={asset.id} role="option" aria-selected={false}>
              <Link
                href={`/products/${asset.id}`}
                onClick={() => {
                  setOpen(false);
                  setQuery("");
                }}
                className="flex items-center gap-3 px-4 py-3 hover:bg-white/8 transition-colors"
              >
                {/* Thumbnail */}
                <div className="relative h-10 w-16 shrink-0 overflow-hidden rounded-md bg-black">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={asset.thumbnailPath}
                    alt=""
                    className="h-full w-full object-cover opacity-80"
                    loading="lazy"
                  />
                </div>

                {/* Meta */}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white">
                    {asset.name}
                  </p>
                  <p className="text-xs text-gray-400">{asset.type} · {asset.resolution}</p>
                </div>

                {/* Price */}
                <span className="shrink-0 text-sm font-semibold text-orange-400">
                  ${(asset.priceCents / 100).toFixed(2)}
                </span>
              </Link>
            </li>
          ))}

          {/* Show all results link */}
          <li className="border-t border-white/10">
            <Link
              href={`/?q=${encodeURIComponent(query)}`}
              onClick={() => setOpen(false)}
              className="flex items-center justify-center py-3 text-xs text-gray-400 hover:text-orange-400 transition-colors"
            >
              See all results for &ldquo;{query}&rdquo;
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
    </svg>
  );
}
