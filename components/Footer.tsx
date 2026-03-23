import Link from "next/link";

const links = [
  { label: "Shop", href: "/" },
  { label: "Support", href: "/support" },
  { label: "About", href: "/about" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#121212] px-4 py-10">
      <div className="mx-auto max-w-6xl flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
        {/* Brand */}
        <div className="flex flex-col items-center sm:items-start gap-1">
          <span className="font-creepster text-2xl text-[#FF0000] neon-red-glow">
            HauntSync
          </span>
          <span className="text-xs text-gray-600">hauntsync.com</span>
        </div>

        {/* Nav links */}
        <nav className="flex items-center gap-6" aria-label="Footer navigation">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-gray-400 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Copyright */}
        <p className="text-xs text-gray-600 text-center sm:text-right">
          &copy; {new Date().getFullYear()} HauntSync. All rights reserved.
          <br />
          <span className="text-gray-700">
            Halloween digital assets for serious haunters.
          </span>
        </p>
      </div>
    </footer>
  );
}
