"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";

const HANDPICKED_ITEMS = [
  {
    id: "bestsellers",
    title: "EVERYDAY ELEGANCE Redefined",
    image: "/images/handpicked/bestsellers-banner.svg",
    buttonText: "BESTSELLERS",
    buttonLink: "/collections/bestsellers",
  },
  {
    id: "new-arrivals",
    title: "FRESH FROM THE ATELIER New Arrivals",
    image: "/images/handpicked/new-arrivals-banner.svg",
    buttonText: "NEW ARRIVALS",
    buttonLink: "/collections/new-arrivals",
  },
  {
    id: "clearance-sale",
    title: "LIMITED QUANTITY EDIT Clearance Sale",
    image: "/images/handpicked/clearance-sale-banner.svg",
    buttonText: "CLEARANCE SALE",
    buttonLink: "/collections",
  },
];

export function HandpickedSection() {
  return (
    <section className="w-full bg-white py-10 sm:py-14 border-t border-[#F0F0F0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Heading matching screenshot */}
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-[#222222] font-normal tracking-[0.16em] uppercase">
            HANDPICKED FOR YOU
          </h2>
        </div>

        {/* Vertical Stack of Curated Banners matching the photo layout */}
        <div className="space-y-10 sm:space-y-12">
          {HANDPICKED_ITEMS.map((item) => (
            <div key={item.id} className="flex flex-col items-center">
              {/* Photo Banner with exact proportions matching screenshot */}
              <Link
                href={item.buttonLink}
                className="relative w-full aspect-[16/9] sm:aspect-[2.1/1] md:aspect-[2.2/1] rounded-lg sm:rounded-xl overflow-hidden shadow-2xs group block bg-[#280B12]"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 1150px"
                  className="object-cover object-center group-hover:scale-102 transition-transform duration-700 ease-out"
                />
              </Link>

              {/* Boxed Button below the photo matching screenshot */}
              <div className="mt-4 flex justify-center">
                <Link
                  href={item.buttonLink}
                  className="px-8 sm:px-10 py-2.5 bg-white border border-black text-xs font-sans font-medium tracking-[0.25em] uppercase text-black hover:bg-black hover:text-white transition-all duration-300 shadow-2xs"
                >
                  {item.buttonText}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
