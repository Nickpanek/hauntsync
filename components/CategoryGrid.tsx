import Link from "next/link";

const categories = [
  {
    id: "projections",
    title: "Projection Loops",
    description:
      "1080p window, wall, and screen-projection loops. Ghosts, skeletons, jump scares — all AI-restored to crisp HD.",
    href: "/?q=projection",
    accentColor: "#FF0000",
    tag: "Video",
    bgGradient: "from-[#FF0000]/20 via-transparent",
    // Placeholder image — replace with actual product screenshot
    image: null,
    emoji: "🎃",
  },
  {
    id: "audio",
    title: "Haunted Audio",
    description:
      "24-bit WAV soundscapes, ambiences, and stings engineered for outdoor speakers and whole-house audio systems.",
    href: "/?q=audio",
    accentColor: "#00FF00",
    tag: "Audio",
    bgGradient: "from-[#00FF00]/20 via-transparent",
    image: null,
    emoji: "👻",
  },
  {
    id: "season-pass",
    title: "Season Pass",
    description:
      "Every video loop + every audio track in one bundle. The complete HauntSync library — one payment, permanent access.",
    href: "#season-pass",
    accentColor: "#FFFF00",
    tag: "Best Value",
    bgGradient: "from-[#FFFF00]/20 via-transparent",
    image: null,
    emoji: "🕷️",
  },
];

export default function CategoryGrid() {
  return (
    <section id="gallery" className="px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="font-creepster text-3xl sm:text-4xl text-white">
            Browse the Collection
          </h2>
          <p className="mt-3 text-gray-400 max-w-xl mx-auto">
            Individually priced or all-in with the Season Pass. Every purchase
            lands in your permanent library.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              className="group relative isolate overflow-hidden rounded-2xl border border-white/10 bg-[#1a1a1a] p-8 flex flex-col gap-4 transition-all duration-300 hover:border-white/30 hover:scale-[1.02] hover:-translate-y-1"
            >
              {/* Gradient glow */}
              <div
                aria-hidden="true"
                className={`absolute inset-0 -z-10 bg-gradient-to-br ${cat.bgGradient} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />

              <div
                className="flex h-16 w-16 items-center justify-center rounded-2xl text-3xl"
                style={{ background: `${cat.accentColor}18`, border: `1px solid ${cat.accentColor}40` }}
              >
                {cat.emoji}
              </div>

              <div>
                <span
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: cat.accentColor }}
                >
                  {cat.tag}
                </span>
                <h3 className="font-creepster mt-1 text-2xl text-white">{cat.title}</h3>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">{cat.description}</p>
              </div>

              <div
                className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold"
                style={{ color: cat.accentColor }}
              >
                Shop now
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
