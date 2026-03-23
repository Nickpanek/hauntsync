import { GUMROAD_URL } from "@/lib/config";

const panels = [
  {
    step: "01",
    icon: "🎬",
    title: "Video Loops",
    description: "Projection loops calibrated to the room — colors tuned specifically for ChromaDepth depth perception.",
    detail: "1080p MP4 · Seamless · Any projector",
  },
  {
    step: "02",
    icon: "🪡",
    title: "Fabric & Wallpaper",
    description: "Blacklight-optimized fabric with matching art. Order through Spoonflower — same design as the loops.",
    detail: "Spoonflower print-on-demand · Custom yardage",
  },
  {
    step: "03",
    icon: "👓",
    title: "ChromaDepth 3D Glasses",
    description: "Guests put on the glasses. The room comes alive in 3D. Red floats forward. Void recedes. Nothing like it.",
    detail: "Rainbow diffraction · Compatible with all loops",
  },
];

export default function RoomPackage() {
  return (
    <section id="room-package" className="bg-[#1A1A1A] px-4 py-16 sm:py-28">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mb-16 text-center">
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-[#FF6B35]">
            The Industry Moat
          </p>
          <h2 className="font-cinzel text-3xl font-bold text-white text-balance sm:text-4xl lg:text-5xl">
            The Complete Haunted Room.
            <br />
            <span className="text-[#00FF88]">Nothing Like It Exists.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[rgba(255,255,255,0.60)]">
            HauntSync designs are ChromaDepth™ calibrated — red foreground,
            green background, black void. Put on the glasses and the walls
            reach out. No competitor offers matching fabric, projection, and
            3D glasses from a single artist.
          </p>
        </div>

        {/* Three-panel flow */}
        <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-3">
          {panels.map((panel, i) => (
            <div key={panel.step} className="relative">
              {/* Connector arrow (desktop only) */}
              {i < panels.length - 1 && (
                <div
                  aria-hidden="true"
                  className="absolute -right-3 top-1/3 z-10 hidden text-[rgba(255,255,255,0.20)] sm:block"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              )}

              <div className="h-full rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#1E1E1E] p-8">
                <div className="mb-2 font-mono text-xs text-[rgba(255,255,255,0.30)]">
                  Step {panel.step}
                </div>
                <div className="mb-4 text-4xl">{panel.icon}</div>
                <h3 className="font-cinzel text-xl font-semibold text-[#00FF88]">
                  {panel.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[rgba(255,255,255,0.60)]">
                  {panel.description}
                </p>
                <p className="mt-4 font-mono text-xs text-[rgba(255,255,255,0.30)]">
                  {panel.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Body copy */}
        <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-[rgba(0,255,136,0.15)] bg-[rgba(0,255,136,0.04)] p-8">
          <p className="text-center text-sm leading-relaxed text-[rgba(255,255,255,0.70)]">
            This is the room package the industry doesn&rsquo;t have yet.
            HauntSync is the only source for ChromaDepth-calibrated video loops
            with matching print-on-demand fabric from the same artist.
            Your haunted room becomes a cohesive, 3D-activated environment
            — not a collection of mismatched effects.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <a
            href={GUMROAD_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-[rgba(255,255,255,0.20)] bg-[rgba(255,255,255,0.05)] px-8 py-4 font-semibold text-white transition-all hover:border-[rgba(0,255,136,0.40)] hover:text-[#00FF88]"
          >
            Browse the Collection →
          </a>
        </div>
      </div>
    </section>
  );
}
