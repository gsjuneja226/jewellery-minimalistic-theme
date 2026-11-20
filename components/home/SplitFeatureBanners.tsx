"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";

export function SplitFeatureBanners() {
  return (
    <section className="w-full bg-white py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Card 1: Royal Temple Bangles */}
          <div className="relative aspect-[16/10] overflow-hidden bg-[#FAFAFA] group">
            <Image
              src="/hero/hero-slide-bangles.jpg"
              alt="Royal Temple Artificial Bangles Collection"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Elegant dark gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent md:bg-gradient-to-r md:from-black/75 md:via-black/30 md:to-transparent" />
            <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end md:justify-center items-start text-left z-10 text-white">
              <span className="text-[11px] font-bold tracking-widest uppercase text-[#F3D98A] mb-1.5">
                ARTISANAL HERITAGE • MOHALI
              </span>
              <h3 className="text-2xl md:text-3xl font-serif text-white font-normal leading-tight whitespace-pre-line mb-4 drop-shadow-sm">
                Royal Temple{"\n"}Bangles Collection
              </h3>
              <Link
                href="/collections/bangles-bracelets"
                className="text-xs font-bold uppercase tracking-wider text-white border-b-2 border-white pb-0.5 hover:text-[#F3D98A] hover:border-[#F3D98A] transition-colors"
              >
                SHOP BANGLES
              </Link>
            </div>
          </div>

          {/* Card 2: The Art of Ring Craftsmanship */}
          <div className="relative aspect-[16/10] overflow-hidden bg-[#FAFAFA] group">
            <Image
              src="/hero/hero-slide-rings.jpg"
              alt="The Art of Artificial Solitaire & Cocktail Rings"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent md:bg-gradient-to-r md:from-black/75 md:via-black/30 md:to-transparent" />
            <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end md:justify-center items-start text-left z-10 text-white">
              <span className="text-[11px] font-bold tracking-widest uppercase text-[#F3D98A] mb-1.5">
                AMERICAN DIAMOND BRILLIANCE
              </span>
              <h3 className="text-2xl md:text-3xl font-serif text-white font-normal leading-tight whitespace-pre-line mb-4 drop-shadow-sm">
                The Art of{"\n"}Ring Craftsmanship
              </h3>
              <Link
                href="/collections/rings"
                className="text-xs font-bold uppercase tracking-wider text-white border-b-2 border-white pb-0.5 hover:text-[#F3D98A] hover:border-[#F3D98A] transition-colors"
              >
                SHOP RINGS
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
