import Link from "next/link";
import SearchBar from "./SearchBar";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#121212]/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4 sm:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="shrink-0 text-lg font-bold tracking-tight text-orange-400 hover:text-orange-300 transition-colors"
        >
          HauntSync
        </Link>

        {/* Search — grows to fill remaining space */}
        <div className="flex-1 max-w-lg">
          <SearchBar />
        </div>

        {/* Nav */}
        <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-gray-300">
          <Link href="/" className="hover:text-white transition-colors">
            Store
          </Link>
          <Link
            href="/#season-pass"
            className="hover:text-white transition-colors"
          >
            Season Pass
          </Link>
          <Link
            href="/dashboard"
            className="rounded-lg border border-orange-600 px-3 py-1.5 text-orange-400 hover:bg-orange-600 hover:text-white transition-colors"
          >
            My Library
          </Link>
        </nav>
      </div>
    </header>
  );
}
