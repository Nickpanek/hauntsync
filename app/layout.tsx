import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

// TODO: Update canonical URL if deploying to a custom domain other than hauntsync.com
export const metadata: Metadata = {
  metadataBase: new URL("https://hauntsync.com"),
  title: "HauntSync — Halloween Video Loops for Haunted Houses | Instant MP4 Download",
  description:
    "Original seamless 1080p Halloween video loops for haunted houses and home haunters. Instant MP4 download, no ZIP files, no expiration. 175 loops available. AtmosFX alternative.",
  keywords: [
    "haunted house video loops",
    "halloween projection loops",
    "atmosfx alternative",
    "haunted house projector effects",
    "halloween video loops download",
    "seamless halloween loops",
    "chromadepth haunted house",
  ],
  openGraph: {
    title: "HauntSync — Halloween Video Loops",
    description:
      "175 original seamless 1080p loops. Instant MP4. No ZIP. No limits.",
    url: "https://hauntsync.com",
    siteName: "HauntSync",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HauntSync — Halloween Video Loops",
    description:
      "175 original seamless 1080p loops. Instant MP4. No ZIP. No limits.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://hauntsync.com" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/*
         * Google Fonts — runtime load (next/font/google requires network at
         * build time, which isn't available in all CI environments).
         * Switch to next/font/google when deploying from a network-connected
         * build pipeline for the performance benefits of build-time subsetting.
         */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-background text-[rgba(255,255,255,0.87)] font-dm-sans">
        <Header />
        {children}
      </body>
    </html>
  );
}
