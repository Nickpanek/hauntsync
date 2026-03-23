import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "HauntSync — AI-Restored Halloween Projection Loops",
  description:
    "Professional 1080p Halloween video loops, ChromaDepth wallpaper, and haunted audio — no ZIPs, persistent signed downloads, AI-restored masters.",
  openGraph: {
    title: "HauntSync — Halloween Digital Assets Done Right",
    description:
      "1080p projection loops, spooky audio, and ChromaDepth wallpaper. No ZIPs. Persistent download links. AI-restored from original masters.",
    siteName: "HauntSync",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Creepster&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-[#121212] text-white">
        <Header />
        {children}
      </body>
    </html>
  );
}
