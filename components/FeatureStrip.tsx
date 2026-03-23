const features = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.069A1 1 0 0121 8.82V15.18a1 1 0 01-1.447.894L15 14M4 6h8a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V7a1 1 0 011-1z" />
      </svg>
    ),
    title: "1080p Masters",
    accent: "text-[#FF0000]",
    borderAccent: "border-[#FF0000]/30",
    bgAccent: "bg-[#FF0000]/10",
    description:
      "Every loop is AI-restored and upscaled with Real-ESRGAN from original SD source footage. Crisp on a 75\" screen, flicker-free at 60 fps.",
    badge: "Real-ESRGAN Upscaled",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
    ),
    title: "No ZIP Files",
    accent: "text-[#00FF00]",
    borderAccent: "border-[#00FF00]/30",
    bgAccent: "bg-[#00FF00]/10",
    description:
      "Files download directly — no archive to unzip, no folder to sort through, no corrupt download to retry. Click and it's on your device.",
    badge: "Direct File Delivery",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: "Persistent Downloads",
    accent: "text-[#FFFF00]",
    borderAccent: "border-[#FFFF00]/30",
    bgAccent: "bg-[#FFFF00]/10",
    description:
      "Your purchase lives in your library forever. Lost a file? Regenerate a fresh signed link any time — October 31st or July 4th, doesn't matter.",
    badge: "Never Expires",
  },
];

export default function FeatureStrip() {
  return (
    <section className="border-y border-white/10 bg-[#1a1a1a] px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-creepster text-center text-3xl sm:text-4xl text-white mb-12">
          Why HauntSync
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className={`rounded-2xl border ${f.borderAccent} bg-[#121212] p-8 flex flex-col gap-4`}
            >
              <div className={`w-14 h-14 rounded-xl ${f.bgAccent} flex items-center justify-center ${f.accent}`}>
                {f.icon}
              </div>
              <div>
                <span className={`text-xs font-semibold uppercase tracking-widest ${f.accent}`}>
                  {f.badge}
                </span>
                <h3 className={`font-creepster mt-1 text-2xl ${f.accent}`}>{f.title}</h3>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
