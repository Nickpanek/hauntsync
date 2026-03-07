import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "HauntSync — AI-Restored Halloween Projection Loops",
  description:
    "Professional 1080p Halloween projection loops, AI-restored with Real-ESRGAN. Individual file downloads, no ZIPs, no subscriptions.",
  openGraph: {
    title: "HauntSync",
    description: "AI-Restored Halloween Projection Loops",
    siteName: "HauntSync",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#121212] text-white`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
