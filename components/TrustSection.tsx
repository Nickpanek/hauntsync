const stats = [
  {
    value: "175",
    label: "Original Loops Ready",
    detail: "Hand-crafted, not stock",
  },
  {
    value: "1080p",
    label: "Native Resolution",
    detail: "True HD, not upscaled",
  },
  {
    value: "<2 min",
    label: "From Purchase to Playing",
    detail: "Instant MP4 delivery",
  },
];

export default function TrustSection() {
  return (
    <section className="bg-[#121212] px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        {/* Heading */}
        <div className="mb-12 text-center">
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-[#00FF88]">
            Track Record
          </p>
          <h2 className="font-cinzel text-3xl font-bold text-white sm:text-4xl">
            Built for the Haunt Industry
          </h2>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-cinzel text-5xl font-black text-[#00FF88] sm:text-6xl">
                {s.value}
              </div>
              <div className="mt-2 text-base font-semibold text-white">{s.label}</div>
              <div className="mt-1 text-sm text-[rgba(255,255,255,0.40)]">{s.detail}</div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="my-12 h-px bg-[rgba(255,255,255,0.08)]" />

        {/* TODO: Add testimonial once first customers respond */}

        {/* Commercial licensing note */}
        <p className="mt-12 text-center text-sm text-[rgba(255,255,255,0.40)]">
          Commercial licensing available for haunted attractions.
          {" "}
          <a
            href="mailto:nick@patternripple.com"
            className="text-[#00FF88] underline underline-offset-2 hover:text-[#00cc6a]"
          >
            Contact nick@patternripple.com
          </a>
        </p>
      </div>
    </section>
  );
}
