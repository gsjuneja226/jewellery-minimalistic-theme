"use client";

import * as React from "react";
import Link from "next/link";
import { Store, MapPin } from "lucide-react";

export function FindStoreBanner() {
  return (
    <section className="w-full bg-[#FAF0F8] py-5 md:py-6 my-2 border-y border-[#F3E5EE]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8 text-center md:text-left">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#222222] shadow-2xs shrink-0">
            <Store className="w-5 h-5 stroke-[1.5]" />
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-serif text-[#222222] font-normal tracking-wide">
              Visit Our Exclusive Flagship Boutique
            </h3>
            <p className="text-xs text-[#777777] font-sans mt-0.5">
              Experience handcrafted bridal Kundan sets, anti-tarnish hoops & statement chokers in Sector 70, Punjab.
            </p>
          </div>
        </div>

        <Link
          href="/pages/contact"
          className="py-2.5 px-7 text-xs font-bold uppercase tracking-wider text-[#222222] bg-white border border-[#222222] hover:bg-black hover:text-white transition-colors duration-300 shadow-xs shrink-0 flex items-center gap-2"
        >
          <MapPin className="w-3.5 h-3.5" />
          <span>Flagship Boutique</span>
        </Link>
      </div>
    </section>
  );
}
