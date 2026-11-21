"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";

const BANNERS = [
  {
    tag: "2026 TRENDS",
    title: "Sculpted Gold\nStatement Cuffs",
    buttonText: "EXPLORE BANGLES",
    href: "/collections/bangles-bracelets",
    image: "/images/categories/bangles.jpg",
  },
  {
    tag: "NEW IN",
    title: "Layered Chains &\nBody Jewels",
    buttonText: "SHOP NECKLACES",
    href: "/collections/necklaces",
    image: "/images/categories/necklaces.jpg",
  },
  {
    tag: "CURATED PICKS",
    title: "American Diamond\nCocktail Rings",
    buttonText: "SHOP RINGS",
    href: "/collections/rings",
    image: "/images/categories/rings.jpg",
  },
];

export function PromoBanners() {
  return (
    <section className="w-full bg-white py-8 sm:py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {BANNERS.map((banner, index) => (
            <div
              key={index}
              className="relative aspect-[16/9] sm:aspect-[4/3] md:aspect-[3.8/3] overflow-hidden bg-[#FAFAFA] group"
            >
              {/* Crisp Real Jewelry Image */}
              <Image
                src={banner.image}
                alt={banner.title.replace("\n", " ")}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Gradient Overlay for Crisp Legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent md:bg-gradient-to-r md:from-black/70 md:via-black/20 md:to-transparent" />

              {/* Typography Overlay */}
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end md:justify-center items-start text-left z-10 text-white">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#F3D98A] mb-1 md:mb-2">
                  {banner.tag}
                </span>
                <h3 className="text-lg sm:text-xl md:text-2xl font-serif text-white font-normal leading-snug whitespace-pre-line mb-3 md:mb-4 drop-shadow-sm">
                  {banner.title}
                </h3>
                <Link
                  href={banner.href}
                  className="text-[11px] md:text-xs font-bold uppercase tracking-wider text-white border-b-2 border-white pb-0.5 hover:text-[#F3D98A] hover:border-[#F3D98A] transition-colors"
                >
                  {banner.buttonText}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
