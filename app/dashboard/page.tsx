/**
 * Dashboard — placeholder for static export
 *
 * The full download dashboard requires a server (Gumroad webhook + signed URLs).
 * This static stub redirects visitors to Gumroad's built-in download portal.
 * Replace with a server-rendered page when deploying to a Node.js host.
 */
export const metadata = {
  title: "My Library — HauntSync",
  robots: { index: false, follow: false },
};

export default function DashboardPage() {
  return (
    <main className="flex min-h-[calc(100vh-56px)] items-center justify-center bg-[#121212] text-white px-4">
      <div className="text-center max-w-md">
        <h1 className="font-cinzel text-3xl font-bold mb-4">Your Library</h1>
        <p className="text-[rgba(255,255,255,0.6)] mb-8">
          Access your purchased loops any time through your Gumroad account.
          All downloads are permanent — no expiration.
        </p>
        <a
          href="https://gumroad.com/library"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-[#00FF88] px-8 py-4 font-bold text-[#121212] hover:opacity-90 transition-opacity"
        >
          Open Gumroad Library →
        </a>
      </div>
    </main>
  );
}
