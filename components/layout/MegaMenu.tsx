"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";

export function MegaMenu() {
  return (
    <div className="absolute top-full left-0 right-0 w-full bg-white border-y border-[#EEEEEE] shadow-2xl py-10 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-4 gap-10 text-left">
        {/* Column 1: By Category */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#222222] pb-1 border-b border-[#EEEEEE]">
            SHOP BY CATEGORY
          </h4>
          <ul className="space-y-2 text-[13px] text-[#666666]">
            <li><Link href="/collections/necklaces" className="hover:text-black hover:translate-x-1 inline-block transition-transform">Chokers & Multi-Layer Chains</Link></li>
            <li><Link href="/collections/rings" className="hover:text-black hover:translate-x-1 inline-block transition-transform">Cocktail & Solitaire Rings</Link></li>
            <li><Link href="/collections/earrings" className="hover:text-black hover:translate-x-1 inline-block transition-transform">Kundan Jhumkas & Chandbalis</Link></li>
            <li><Link href="/collections/bangles-bracelets" className="hover:text-black hover:translate-x-1 inline-block transition-transform">Temple Bangles & Kadas</Link></li>
            <li><Link href="/collections/bangles-bracelets" className="hover:text-black hover:translate-x-1 inline-block transition-transform">Tennis & Charm Bracelets</Link></li>
            <li><Link href="/collections/pendants" className="hover:text-black hover:translate-x-1 inline-block transition-transform">Gemstone Solitaire Pendants</Link></li>
            <li><Link href="/collections/jewellery-sets" className="hover:text-black hover:translate-x-1 inline-block transition-transform">Complete Matching Sets</Link></li>
          </ul>
        </div>

        {/* Column 2: By Occasion & Style */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#222222] pb-1 border-b border-[#EEEEEE]">
            SHOP BY OCCASION
          </h4>
          <ul className="space-y-2 text-[13px] text-[#666666]">
            <li><Link href="/collections/wedding" className="hover:text-black hover:translate-x-1 inline-block transition-transform">Bridal & Wedding Troussseau</Link></li>
            <li><Link href="/collections/festive" className="hover:text-black hover:translate-x-1 inline-block transition-transform">Festive Celebrations</Link></li>
            <li><Link href="/collections/daily-wear" className="hover:text-black hover:translate-x-1 inline-block transition-transform">Anti-Tarnish Daily Wear</Link></li>
            <li><Link href="/collections/gifting" className="hover:text-black hover:translate-x-1 inline-block transition-transform">Curated Keepsake Gifting</Link></li>
            <li><Link href="/collections/bestsellers" className="hover:text-black hover:translate-x-1 inline-block transition-transform">All-Time Bestsellers</Link></li>
            <li><Link href="/collections/new-arrivals" className="hover:text-black hover:translate-x-1 inline-block transition-transform">The Latest 2026 Drops</Link></li>
          </ul>
        </div>

        {/* Column 3: Customer Care & Services */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#222222] pb-1 border-b border-[#EEEEEE]">
            SERVICES & CARE
          </h4>
          <ul className="space-y-2 text-[13px] text-[#666666]">
            <li><Link href="/account" className="hover:text-black hover:translate-x-1 inline-block transition-transform">My Account & Orders</Link></li>
            <li><Link href="/account/wishlist" className="hover:text-black hover:translate-x-1 inline-block transition-transform">Saved Wishlist</Link></li>
            <li><Link href="/track-order" className="hover:text-black hover:translate-x-1 inline-block transition-transform">Track Delivery Status</Link></li>
            <li><Link href="/pages/care-guide" className="hover:text-black hover:translate-x-1 inline-block transition-transform">Anti-Tarnish Care Guide</Link></li>
            <li><Link href="/pages/shipping" className="hover:text-black hover:translate-x-1 inline-block transition-transform">Complimentary Shipping</Link></li>
            <li><Link href="/pages/contact" className="hover:text-black hover:translate-x-1 inline-block transition-transform">Mohali Flagship Boutique</Link></li>
          </ul>
        </div>

        {/* Column 4: High-Res Editorial Promo Tile */}
        <div className="relative rounded-none overflow-hidden bg-[#FAFAFA] flex flex-col justify-end p-6 border border-[#EEEEEE] group/tile">
          <div className="absolute inset-0 z-0">
            <Image
              src="/hero/hero-slide-modern.jpg"
              alt="New Season Arrivals"
              fill
              className="object-cover object-center group-hover/tile:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          </div>
          <div className="relative z-10 text-white space-y-1.5">
            <span className="text-[10px] font-bold tracking-widest uppercase text-[#BA9048]">
              2026 CURATION
            </span>
            <h5 className="text-base font-serif font-normal text-white leading-tight">
              Modern Gold Elegance
            </h5>
            <p className="text-xs text-white/80">
              Complimentary gift wrapping on all orders.
            </p>
            <Link
              href="/collections"
              className="inline-block pt-1 text-xs font-bold uppercase tracking-wider text-white border-b border-white pb-0.5 hover:text-[#BA9048] hover:border-[#BA9048] transition-colors"
            >
              Explore Collection
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
