// TODO: Replace YOUR_GUMROAD_URL with the actual Gumroad store URL
const GUMROAD_URL = "YOUR_GUMROAD_URL";

const navLinks = [
  { label: "Browse Loops",    href: GUMROAD_URL, external: true },
  { label: "About",           href: "/about",    external: false },
  { label: "Contact",         href: "mailto:nick@patternripple.com", external: true },
  { label: "Spoonflower Shop", href: "https://www.spoonflower.com/profiles/nickpanek", external: true },
];

function InstagramIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-[rgba(255,255,255,0.08)] bg-[#121212] px-4 py-14">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="font-cinzel text-2xl font-black text-white">
              HauntSync
            </div>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-[rgba(255,255,255,0.40)]">
              Original haunted house video loops.
              Instant download. No limits.
            </p>
            {/* Social icons */}
            <div className="mt-5 flex items-center gap-4">
              {/* TODO: Replace # with real Instagram and TikTok URLs */}
              <a
                href="#"
                aria-label="HauntSync on Instagram"
                className="text-[rgba(255,255,255,0.40)] transition-colors hover:text-[#00FF88]"
              >
                <InstagramIcon />
              </a>
              <a
                href="#"
                aria-label="HauntSync on TikTok"
                className="text-[rgba(255,255,255,0.40)] transition-colors hover:text-[#00FF88]"
              >
                <TikTokIcon />
              </a>
            </div>
          </div>

          {/* Nav */}
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-[rgba(255,255,255,0.30)]">
              Links
            </p>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noreferrer" : undefined}
                      className="text-sm text-[rgba(255,255,255,0.50)] transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-[rgba(255,255,255,0.30)]">
              Contact
            </p>
            <a
              href="mailto:nick@patternripple.com"
              className="text-sm text-[rgba(255,255,255,0.50)] transition-colors hover:text-[#00FF88]"
            >
              nick@patternripple.com
            </a>
            <p className="mt-2 text-sm text-[rgba(255,255,255,0.30)]">
              Commercial licensing inquiries welcome.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-[rgba(255,255,255,0.06)] pt-8 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-[rgba(255,255,255,0.25)]">
            HauntSync is a Pattern Ripple project. All designs original.
            &copy; {new Date().getFullYear()}.
          </p>
          <p className="text-xs text-[rgba(255,255,255,0.25)]">
            hauntsync.com
          </p>
        </div>
      </div>
    </footer>
  );
}
