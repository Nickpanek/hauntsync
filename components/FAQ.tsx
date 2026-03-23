const FAQS = [
  {
    q: "What format are the video loops?",
    a: "All loops are delivered as standard H.264 MP4 files. They play on any device, any projector, any media player — no codec installation, no VLC required, no special hardware.",
  },
  {
    q: "Do download links expire?",
    a: "Never. Your purchase is permanent. Re-download any time through your Gumroad account. No seasonal limits, no link expiration.",
  },
  {
    q: "What's the difference between HauntSync and AtmosFX?",
    a: "AtmosFX delivers ZIP files with download limits and link expiration. HauntSync delivers direct MP4 files with no limits, no expiration, and no ZIP extraction required. HauntSync loops are also original art — not licensed stock effects.",
  },
  {
    q: "Can I use these in a commercial haunted attraction?",
    a: "Yes. Standard purchase covers personal and small commercial use. Contact nick@patternripple.com for venue licensing if you operate a large commercial haunt.",
  },
  {
    q: "What is the ChromaDepth room package?",
    a: "HauntSync designs are color-calibrated for ChromaDepth™ 3D glasses — a system where red appears to float forward and colors recede by rainbow position. Matching fabric, wallpaper, and video loops are designed as a unified room environment. When guests put on ChromaDepth glasses, the entire room appears three-dimensional.",
  },
  {
    q: "What resolution are the loops?",
    a: "All loops are native 1080p (1920×1080). 4K versions are in development.",
  },
  {
    q: "How long are the loops?",
    a: "Most loops are 10–30 seconds, seamlessly looped. They are designed to play indefinitely without a visible seam or stutter.",
  },
];

export default function FAQ() {
  return (
    <section className="bg-[#1A1A1A] px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        {/* Heading */}
        <div className="mb-12 text-center">
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-[#00FF88]">
            Common Questions
          </p>
          <h2 className="font-cinzel text-3xl font-bold text-white sm:text-4xl">
            FAQ
          </h2>
        </div>

        {/* Accordion — <details>/<summary>, zero JS */}
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <details
              key={i}
              className="group rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#1E1E1E] transition-colors open:border-[rgba(0,255,136,0.20)]"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left">
                <span className="font-cinzel text-sm font-semibold text-white group-open:text-[#00FF88] sm:text-base">
                  {faq.q}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="faq-chevron h-5 w-5 shrink-0 text-[rgba(255,255,255,0.40)] group-open:text-[#00FF88]"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </summary>

              <div className="faq-body px-6 pb-5">
                <p className="text-sm leading-relaxed text-[rgba(255,255,255,0.60)]">
                  {faq.a}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
