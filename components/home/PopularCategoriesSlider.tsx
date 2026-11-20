"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";

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
];

export function PopularCategoriesSlider() {
  return (
    <section className="w-full bg-white py-12 md:py-16 border-t border-[#F0F0F0]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-serif text-[#222222] font-normal mb-2">
            Popular Categories
          </h2>
          <p className="text-xs md:text-sm text-[#777777] font-sans">
            Handcrafted artificial jewellery designed for celebrations and everyday elegance.
          </p>
        </div>

        {/* Clean Responsive Grid (No weird horizontal scroll) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 justify-items-center">
          {CATEGORIES.map((cat, idx) => (
            <Link
              key={idx}
              href={`/collections/${cat.slug}`}
              className="flex flex-col items-center group/cat text-center w-full max-w-[170px]"
            >
              {/* Circular Container with high-res jewelry image */}
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full overflow-hidden bg-[#FAFAFA] border border-[#EEEEEE] transition-all duration-300 group-hover/cat:scale-105 group-hover/cat:shadow-md">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 112px, (max-width: 1024px) 128px, 144px"
                  className="object-cover object-center group-hover/cat:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Title & Subtitle */}
              <h3 className="mt-3.5 text-xs font-bold tracking-wider text-[#222222] uppercase group-hover/cat:text-[#BA9048] transition-colors">
                {cat.name}
              </h3>
              <span className="text-[11px] text-[#888888] font-sans mt-0.5">
                {cat.subtitle}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
