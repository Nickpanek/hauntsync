import type { Metadata } from "next";
import Hero from "@/components/Hero";
import FeatureStrip from "@/components/FeatureStrip";
import CategoryGrid from "@/components/CategoryGrid";
import CompetitorCallout from "@/components/CompetitorCallout";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "HauntSync — AI-Restored Halloween Projection Loops",
  description:
    "Professional 1080p Halloween video loops, ChromaDepth wallpaper, and haunted audio — no ZIPs, persistent signed downloads, AI-restored masters.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#121212] text-white">
      <Hero />
      <FeatureStrip />
      <CategoryGrid />
      <CompetitorCallout />
      <Footer />
    </main>
  );
}
