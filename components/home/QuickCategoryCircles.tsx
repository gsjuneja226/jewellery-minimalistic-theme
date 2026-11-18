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
    image: "/images/categories/earrings.jpg",
  },
  {
    name: "Kundan Sets",
    badge: "Festive",
    href: "/collections/jewellery-sets",
    image: "/images/categories/kundan-choker.jpg",
  },
  {
    name: "Necklaces",
    href: "/collections/necklaces",
    image: "/images/categories/necklaces.jpg",
  },
  {
    name: "Bangles & Cuffs",
    href: "/collections/bangles-bracelets",
    image: "/images/categories/bangles.jpg",
  },
  {
    name: "AD Rings",
    badge: "Hot",
    href: "/collections/rings",
    image: "/images/categories/rings.jpg",
  },
  {
    name: "Pendants",
    href: "/collections/pendants",
    image: "/images/categories/pendants.jpg",
  },
  {
    name: "Anti-Tarnish",
    badge: "Daily",
    href: "/collections/daily-wear",
    image: "/images/occasions/daily-wear.jpg",
  },
  {
    name: "Bridal Edit",
    href: "/collections/wedding",
    image: "/images/occasions/wedding.jpg",
  },
];

export function QuickCategoryCircles() {
  return (
    <section
      aria-label="Quick Category Stories"
      className="w-full bg-[#F3ECE1] py-3.5 sm:py-5 border-b border-[#D6C2A3] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 md:px-8">
        {/* Horizontal scroll on mobile, flex wrap on tablet/desktop */}
        <div className="flex items-center gap-3 sm:gap-6 md:gap-8 overflow-x-auto pb-1 scrollbar-none sm:justify-center">
          {CATEGORY_CIRCLES.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="group flex flex-col items-center flex-shrink-0 text-center focus:outline-none"
            >
              <div className="relative">
                {/* Outer Ring */}
                <div className="w-14 h-14 sm:w-18 sm:h-18 md:w-22 md:h-22 rounded-full p-[2px] bg-gradient-to-tr from-gold via-antique-gold to-blush transition-transform duration-300 group-hover:scale-105 shadow-xs">
                  <div className="w-full h-full rounded-full bg-white p-0.5 overflow-hidden relative border border-[#FAF5EC]">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-cover p-0.5 group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>

                {/* Badge if present */}
                {cat.badge && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-antique-gold text-white text-[8px] sm:text-[9px] font-sans font-semibold px-1.5 py-0.2 rounded-full shadow-subtle uppercase whitespace-nowrap">
                    {cat.badge}
                  </span>
                )}
              </div>

              {/* Name */}
              <span className="mt-1.5 text-[11px] sm:text-xs font-sans font-medium text-espresso group-hover:text-antique-gold transition-colors whitespace-nowrap">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
