"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CATEGORIES = [
  {
    name: "NECKLACES",
    subtitle: "Chokers & Layers",
    slug: "necklaces",
    image: "/images/categories/necklaces.jpg",
  },
  {
    name: "EARRINGS",
    subtitle: "Jhumkas & Studs",
    slug: "earrings",
    image: "/images/categories/earrings.jpg",
  },
  {
    name: "RINGS",
    subtitle: "Solitaire & Cocktail",
    slug: "rings",
    image: "/images/categories/rings.jpg",
  },
  {
    name: "BANGLES",
    subtitle: "Kadas & Bracelets",
    slug: "bangles-bracelets",
    image: "/images/categories/bangles.jpg",
  },
  {
    name: "BRIDAL KUNDAN",
    subtitle: "Heirloom Sets",
    slug: "jewellery-sets",
    image: "/images/categories/kundan-choker.jpg",
  },
  {
    name: "PENDANTS",
    subtitle: "Lockets & Chains",
    slug: "pendants",
    image: "/images/categories/pendants.jpg",
  },
  {
    name: "BRACELETS",
    subtitle: "Tennis & Charms",
    slug: "bangles-bracelets",
    image: "/images/categories/bangles.jpg",
  },
  {
    name: "NEW ARRIVALS",
    subtitle: "2026 Collection",
    slug: "new-arrivals",
    image: "/images/categories/earrings.jpg",
  },
];

export function PopularCategoriesSlider() {
  const scrollerRef = React.useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollerRef.current) {
      // Scroll by 3-4 items (around 70-75% of visible container width)
      scrollerRef.current.scrollBy({
        left: -scrollerRef.current.clientWidth * 0.75,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollBy({
        left: scrollerRef.current.clientWidth * 0.75,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full bg-white py-8 sm:py-12 border-t border-[#F0F0F0]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative">
        {/* Section Header with Left/Right Buttons */}
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-[#222222] font-normal tracking-wide">
              Popular Categories
            </h2>
            <p className="text-xs text-[#777777] font-sans mt-0.5">
              Explore by silhouette • 3 to 4 categories per scroll
            </p>
          </div>

          {/* Left / Right Scroller Chevrons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={scrollLeft}
              aria-label="Scroll categories left"
              className="w-8 sm:w-9 h-8 sm:h-9 rounded-full border border-[#D5D5D5] bg-white flex items-center justify-center text-[#222222] hover:bg-black hover:text-white hover:border-black transition-colors shadow-2xs"
            >
              <ChevronLeft className="w-4 h-4 stroke-[2]" />
            </button>
            <button
              type="button"
              onClick={scrollRight}
              aria-label="Scroll categories right"
              className="w-8 sm:w-9 h-8 sm:h-9 rounded-full border border-[#D5D5D5] bg-white flex items-center justify-center text-[#222222] hover:bg-black hover:text-white hover:border-black transition-colors shadow-2xs"
            >
              <ChevronRight className="w-4 h-4 stroke-[2]" />
            </button>
          </div>
        </div>

        {/* Horizontal Left-Right Category Scroller */}
        <div
          ref={scrollerRef}
          className="flex items-center gap-4 sm:gap-6 md:gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory py-2 scrollbar-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {CATEGORIES.map((cat, idx) => (
            <Link
              key={idx}
              href={`/collections/${cat.slug}`}
              className="w-[28%] sm:w-[22%] md:w-[15%] shrink-0 snap-start flex flex-col items-center group/cat text-center select-none"
            >
              {/* Circular Container with high-res jewelry image */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden bg-[#FAFAFA] border-2 border-[#EEEEEE] group-hover/cat:border-[#BA9048] transition-all duration-300 group-hover/cat:scale-105 group-hover/cat:shadow-md">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 80px, 112px"
                  className="object-cover object-center group-hover/cat:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Title & Subtitle */}
              <h3 className="mt-2 text-[11px] font-bold tracking-wider text-[#222222] uppercase group-hover/cat:text-[#BA9048] transition-colors leading-tight truncate w-full">
                {cat.name}
              </h3>
              <span className="hidden sm:block text-[10px] text-[#888888] font-sans mt-0.5 truncate w-full">
                {cat.subtitle}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
