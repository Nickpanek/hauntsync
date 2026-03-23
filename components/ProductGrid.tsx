import Image from "next/image";

// TODO: Replace YOUR_GUMROAD_URL with actual product links
const GUMROAD_URL = "YOUR_GUMROAD_URL";

type Badge = "NEW" | "BESTSELLER" | "LOOP";

interface ProductCard {
  id: number;
  name: string;
  price: string;
  badge: Badge;
  // TODO: Replace with actual product images in /public/images/
  image: string;
}

const PRODUCTS: ProductCard[] = [
  { id: 1, name: "Graveyard Spirits",    price: "$14.99", badge: "BESTSELLER", image: "/images/product-1.jpg" },
  { id: 2, name: "Hellfire Rising",      price: "$14.99", badge: "NEW",        image: "/images/product-2.jpg" },
  { id: 3, name: "Demon Possession",     price: "$14.99", badge: "LOOP",       image: "/images/product-3.jpg" },
  { id: 4, name: "Gothic Apparitions",   price: "$14.99", badge: "BESTSELLER", image: "/images/product-4.jpg" },
  { id: 5, name: "Spectral Fog Walk",    price: "$14.99", badge: "NEW",        image: "/images/product-5.jpg" },
  { id: 6, name: "Undead Uprising",      price: "$14.99", badge: "LOOP",       image: "/images/product-6.jpg" },
  { id: 7, name: "Cursed Mirror",        price: "$14.99", badge: "BESTSELLER", image: "/images/product-7.jpg" },
  { id: 8, name: "Shadowland Portal",    price: "$14.99", badge: "NEW",        image: "/images/product-8.jpg" },
  { id: 9, name: "Bone Cathedral",       price: "$14.99", badge: "LOOP",       image: "/images/product-9.jpg" },
];

const BADGE_COLORS: Record<Badge, string> = {
  NEW:        "bg-[#00FF88] text-[#121212]",
  BESTSELLER: "bg-[#FF6B35] text-white",
  LOOP:       "bg-[rgba(255,255,255,0.15)] text-white",
};

export default function ProductGrid() {
  return (
    <section id="loops" className="bg-[#1A1A1A] px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mb-12 text-center">
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-[#00FF88]">
            The Collection
          </p>
          <h2 className="font-cinzel text-3xl font-bold text-white sm:text-4xl">
            175 Loops. Pick Your Haunt.
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-[rgba(255,255,255,0.60)]">
            Gothic graveyards, demonic infernos, supernatural apparitions.
            All original art. All 1080p. All seamless.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {PRODUCTS.map((product) => (
            <a
              key={product.id}
              href={GUMROAD_URL}
              target="_blank"
              rel="noreferrer"
              className="group relative block overflow-hidden rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#1E1E1E] transition-all duration-300 hover:border-[rgba(0,255,136,0.40)] hover:[box-shadow:0_0_20px_rgba(0,255,136,0.3)]"
            >
              {/* Badge */}
              <div className="absolute right-3 top-3 z-10">
                <span className={`rounded-md px-2 py-0.5 text-xs font-bold uppercase tracking-wider ${BADGE_COLORS[product.badge]}`}>
                  {product.badge}
                </span>
              </div>

              {/* Thumbnail — 16:9 shimmer placeholder until real images are added */}
              <div className="relative aspect-video w-full overflow-hidden bg-[#2A2A2A]">
                {/* Shimmer visible behind image while it loads */}
                <div className="shimmer absolute inset-0" aria-hidden="true" />
                {/* TODO: Replace placeholder with real product image */}
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Meta */}
              <div className="p-4">
                <h3 className="font-cinzel text-sm font-semibold text-white">
                  {product.name}
                </h3>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-mono text-sm font-medium text-[#00FF88]">
                    {product.price}
                  </span>
                  <span className="rounded-md border border-[rgba(0,255,136,0.30)] px-2 py-0.5 text-xs text-[rgba(255,255,255,0.50)]">
                    Instant Download
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Browse all CTA */}
        <div className="mt-12 text-center">
          <a
            href={GUMROAD_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-[#00FF88] px-10 py-4 font-bold text-[#121212] transition-all hover:opacity-90 hover:scale-105"
          >
            Browse All 175 Loops
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
