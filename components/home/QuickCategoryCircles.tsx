"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";

export interface CategoryCircleItem {
  name: string;
  badge?: string;
  href: string;
  image: string;
}

export const CATEGORY_CIRCLES: CategoryCircleItem[] = [
  {
    name: "Earrings",
    badge: "Trending",
    href: "/collections/earrings",
    image: "/products/chandbali-festive-jhumkas-1.svg",
  },
  {
    name: "Kundan Sets",
    badge: "Festive",
    href: "/collections/jewellery-sets",
    image: "/products/kundan-jadau-choker-set-1.svg",
  },
  {
    name: "Necklaces",
    href: "/collections/necklaces",
    image: "/products/emerald-stone-layered-necklace-1.svg",
  },
  {
    name: "Bangles & Cuffs",
    href: "/collections/bangles-bracelets",
    image: "/products/temple-peacock-cuff-bangle-1.svg",
  },
  {
    name: "AD Rings",
    badge: "Hot",
    href: "/collections/rings",
    image: "/products/ad-solitaire-statement-ring-1.svg",
  },
  {
    name: "Pendants",
    href: "/collections/pendants",
    image: "/products/sapphire-teardrop-pendant-1.svg",
  },
  {
    name: "Anti-Tarnish",
    badge: "Daily",
    href: "/collections/daily-wear",
    image: "/products/classic-gold-tone-daily-hoops-1.svg",
  },
  {
    name: "Bridal Edit",
    href: "/collections/wedding",
    image: "/products/ruby-drop-maang-tikka-1.svg",
  },
];

export function QuickCategoryCircles() {
  return (
    <section
      aria-label="Quick Category Stories"
      className="w-full bg-soft-cream/60 py-6 border-b border-[#E7DCC6]/60 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between mb-3 md:hidden">
          <span className="text-xs font-sans font-semibold uppercase tracking-wider text-brown-text">
            Explore By Category
          </span>
          <Link
            href="/collections"
            className="text-xs font-sans font-medium text-antique-gold hover:text-deep-gold"
          >
            All Categories →
          </Link>
        </div>

        {/* Horizontal scroll on mobile, flex wrap on tablet/desktop */}
        <div className="flex items-center gap-4 sm:gap-6 md:gap-8 overflow-x-auto pb-2 scrollbar-none sm:justify-center">
          {CATEGORY_CIRCLES.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="group flex flex-col items-center flex-shrink-0 text-center focus:outline-none"
            >
              <div className="relative">
                {/* Outer Ring */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full p-[2.5px] bg-gradient-to-tr from-gold via-antique-gold to-blush transition-transform duration-300 group-hover:scale-105 shadow-sm">
                  <div className="w-full h-full rounded-full bg-white p-1 overflow-hidden relative border border-[#FAF5EC]">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-cover p-1 group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>

                {/* Badge if present */}
                {cat.badge && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-antique-gold text-white text-[9px] font-sans font-semibold px-2 py-0.5 rounded-full shadow-subtle tracking-tight uppercase whitespace-nowrap">
                    {cat.badge}
                  </span>
                )}
              </div>

              {/* Name */}
              <span className="mt-2.5 text-xs sm:text-sm font-sans font-medium text-espresso group-hover:text-antique-gold transition-colors tracking-tight whitespace-nowrap">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
