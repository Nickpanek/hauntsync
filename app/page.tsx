import type { Metadata } from "next";
import Hero from "@/components/Hero";
import WhyHauntSync from "@/components/WhyHauntSync";
import ProductGrid from "@/components/ProductGrid";
import RoomPackage from "@/components/RoomPackage";
import TrustSection from "@/components/TrustSection";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title:
    "HauntSync — Halloween Video Loops for Haunted Houses | Instant MP4 Download",
  description:
    "Original seamless 1080p Halloween video loops for haunted houses and home haunters. Instant MP4 download, no ZIP files, no expiration. 175 loops available. AtmosFX alternative.",
};

// ── JSON-LD structured data ────────────────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "HauntSync",
      url: "https://hauntsync.com",
      description:
        "Original seamless 1080p Halloween video loops for haunted houses and home haunters.",
      contactPoint: {
        "@type": "ContactPoint",
        email: "nick@patternripple.com",
        contactType: "customer support",
        areaServed: "US",
        availableLanguage: "English",
      },
    },
    {
      "@type": "WebSite",
      name: "HauntSync",
      url: "https://hauntsync.com",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          // TODO: Update when a search page is implemented
          urlTemplate: "https://hauntsync.com/?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "ItemList",
      name: "Halloween Video Loops",
      description: "Original seamless 1080p Halloween video loops",
      numberOfItems: 175,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@type": "Product",
            name: "Graveyard Spirits",
            description:
              "Seamless 1080p graveyard apparition loop — floating spirits, fog, and moonlight. Instant MP4 download.",
            offers: {
              "@type": "Offer",
              price: "14.99",
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
            },
          },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@type": "Product",
            name: "Hellfire Rising",
            description:
              "Seamless 1080p hellscape loop — rising demonic flames with ChromaDepth calibration. Instant MP4 download.",
            offers: {
              "@type": "Offer",
              price: "14.99",
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
            },
          },
        },
        {
          "@type": "ListItem",
          position: 3,
          item: {
            "@type": "Product",
            name: "Gothic Apparitions",
            description:
              "Seamless 1080p gothic haunting loop — shadowy figures, candlelight, period horror. Instant MP4 download.",
            offers: {
              "@type": "Offer",
              price: "14.99",
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
            },
          },
        },
      ],
    },
  ],
};

export default function HomePage() {
  return (
    <>
      {/* JSON-LD structured data for SEO / AEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-[#121212] text-[rgba(255,255,255,0.87)]">
        {/* 1. Hero — full viewport, fog particles, video bg */}
        <Hero />

        {/* 2. Why HauntSync — 3-col feature cards + AtmosFX callout */}
        <WhyHauntSync />

        {/* 3. Product preview grid — 9 placeholder cards */}
        <ProductGrid />

        {/* 4. ChromaDepth room package — the moat */}
        <RoomPackage />

        {/* 5. Social proof — stats + pull quote */}
        <TrustSection />

        {/* 6. FAQ — CSS-only accordion, SEO + AEO optimized */}
        <FAQ />

        {/* 7. Footer */}
        <Footer />
      </main>
    </>
  );
}
