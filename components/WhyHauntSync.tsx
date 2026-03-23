const features = [
  {
    icon: "⚡",
    headline: "Instant MP4 Download",
    copy: "No ZIP files. No waiting. Click purchase, get your file. Works in any media player, any projector, any TV.",
  },
  {
    icon: "♾️",
    headline: "No Download Limits. Ever.",
    copy: "Your purchase is permanent. Re-download any time, any device, any season. No link expiration. No annual re-purchase.",
  },
  {
    icon: "🎨",
    headline: "Original Art, Not Stock",
    copy: "Every loop is hand-crafted original seamless art — not licensed stock footage you've seen on every other haunt.",
  },
];

export default function WhyHauntSync() {
  return (
    <section className="bg-[#121212] px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mb-12 text-center">
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-[#00FF88]">
            The Difference
          </p>
          <h2 className="font-cinzel text-3xl font-bold text-white sm:text-4xl">
            Why HauntSync
          </h2>
        </div>

        {/* Three-column cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.headline}
              className="group rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#1E1E1E] p-8 transition-all duration-300 hover:border-[rgba(0,255,136,0.25)] hover:bg-[#232323]"
            >
              <div className="mb-5 text-4xl">{f.icon}</div>
              <h3 className="font-cinzel text-lg font-semibold text-[#00FF88] group-hover:text-[#00FF88]">
                {f.headline}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[rgba(255,255,255,0.60)]">
                {f.copy}
              </p>
            </div>
          ))}
        </div>

        {/* Competitive callout strip */}
        <div className="mt-10 rounded-xl border border-[rgba(255,107,53,0.25)] bg-[rgba(255,107,53,0.06)] px-6 py-5">
          <p className="text-center text-sm text-[rgba(255,255,255,0.60)]">
            <span className="font-semibold text-[#FF6B35]">vs. AtmosFX:</span>
            {" "}AtmosFX ships ZIP archives with expiring download links.
            HauntSync ships direct MP4 files with permanent access.
            Same Halloween effects. Dramatically better experience.
          </p>
        </div>
      </div>
    </section>
  );
}
