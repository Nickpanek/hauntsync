const comparison = [
  {
    feature: "Download method",
    hauntsync: "Direct file — click and save",
    atmosfx: "ZIP archive — unzip required",
    hauntWins: true,
  },
  {
    feature: "Download window",
    hauntsync: "Permanent — regenerate any time",
    atmosfx: "Time-limited links expire",
    hauntWins: true,
  },
  {
    feature: "Video quality",
    hauntsync: "1080p AI-restored masters",
    atmosfx: "1080p (original SD-sourced)",
    hauntWins: true,
  },
  {
    feature: "Audio quality",
    hauntsync: "24-bit WAV, individually downloaded",
    atmosfx: "MP3 in ZIP bundle",
    hauntWins: true,
  },
  {
    feature: "Pricing model",
    hauntsync: "One-time purchase, no renewal",
    atmosfx: "Annual license on some titles",
    hauntWins: true,
  },
  {
    feature: "Library management",
    hauntsync: "Persistent download dashboard",
    atmosfx: "Re-purchase or re-login required",
    hauntWins: true,
  },
];

export default function CompetitorCallout() {
  return (
    <section className="border-y border-white/10 bg-[#1a1a1a] px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <span className="inline-block rounded-full border border-[#FFFF00]/30 bg-[#FFFF00]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#FFFF00]">
            The Honest Comparison
          </span>
          <h2 className="font-creepster mt-4 text-3xl sm:text-4xl text-white">
            HauntSync vs. AtmosFX
          </h2>
          <p className="mt-3 text-gray-400 max-w-xl mx-auto text-sm">
            AtmosFX pioneered Halloween projection. We built the storefront they
            should have shipped — because haunters deserve better delivery UX.
          </p>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-white/10">
          {/* Header row */}
          <div className="grid grid-cols-3 bg-[#121212] border-b border-white/10">
            <div className="px-5 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">
              Feature
            </div>
            <div className="px-5 py-4 text-xs font-bold uppercase tracking-widest text-[#00FF00] border-l border-white/10">
              HauntSync
            </div>
            <div className="px-5 py-4 text-xs font-bold uppercase tracking-widest text-gray-500 border-l border-white/10">
              AtmosFX
            </div>
          </div>

          {comparison.map((row, i) => (
            <div
              key={row.feature}
              className={`grid grid-cols-3 border-b border-white/10 last:border-b-0 ${
                i % 2 === 0 ? "bg-[#121212]" : "bg-[#161616]"
              }`}
            >
              <div className="px-5 py-4 text-sm text-gray-300 flex items-center">
                {row.feature}
              </div>
              <div className="px-5 py-4 border-l border-white/10 flex items-center gap-2">
                <span className="text-[#00FF00] shrink-0" aria-hidden="true">✓</span>
                <span className="text-sm text-white">{row.hauntsync}</span>
              </div>
              <div className="px-5 py-4 border-l border-white/10 flex items-center gap-2">
                <span className="text-gray-600 shrink-0" aria-hidden="true">✗</span>
                <span className="text-sm text-gray-400">{row.atmosfx}</span>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-gray-600">
          Comparison based on publicly available information as of 2024. AtmosFX
          is a registered trademark of its respective owner.
        </p>
      </div>
    </section>
  );
}
