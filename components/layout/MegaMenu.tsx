import * as React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export const CATEGORIES_NAV = [
  { name: "Rings", slug: "rings", desc: "Statement rings, bands & AD solitaires" },
  { name: "Necklaces", slug: "necklaces", desc: "Chains, pearls & layered drops" },
  { name: "Earrings", slug: "earrings", desc: "Studs, drops, hoops & jhumkas" },
  { name: "Pendants", slug: "pendants", desc: "Stone pendants & delicate lockets" },
  { name: "Bangles & Bracelets", slug: "bangles-bracelets", desc: "Gold-tone bangles & stone cuffs" },
  { name: "Anklets", slug: "anklets", desc: "Delicate payals & modern charm chains" },
  { name: "Jewellery Sets", slug: "jewellery-sets", desc: "Bridal, choker & festive matching sets" },
];

export const OCCASIONS_NAV = [
  { name: "Wedding", slug: "wedding", desc: "Bridal choker sets, kundan & statement pieces" },
  { name: "Festive", slug: "festive", desc: "Lustrous jhumkas, temple designs & gold-tone sets" },
  { name: "Daily Wear", slug: "daily-wear", desc: "Lightweight studs, chains & anti-tarnish bands" },
  { name: "Gifting", slug: "gifting", desc: "Delicate pendants, boxed charms & gift wrapped tokens" },
];

export function MegaMenu() {
  return (
    <nav className="hidden lg:flex items-center justify-center space-x-8 py-2.5 text-xs font-sans font-semibold tracking-wider border-t border-[#BA9048]/25 bg-[#230E14] text-[#F5E5C9]">
      <Link
        href="/collections/new-arrivals"
        className="text-[#F5E5C9] hover:text-[#BA9048] transition-colors flex items-center gap-1.5"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#BA9048]" />
        NEW ARRIVALS
      </Link>
      <Link
        href="/collections/bestsellers"
        className="text-[#F5E5C9] hover:text-[#BA9048] transition-colors"
      >
        BESTSELLERS
      </Link>

      {/* Categories Dropdown */}
      <div className="relative group">
        <Link
          href="/collections"
          className="text-[#F5E5C9] hover:text-[#BA9048] transition-colors py-2"
        >
          CATEGORIES
        </Link>
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[480px] bg-[#FCFAF5] border border-[#D6C2A3] rounded-[14px] shadow-card p-6 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
          <div className="grid grid-cols-2 gap-4">
            {CATEGORIES_NAV.map((cat) => (
              <Link
                key={cat.slug}
                href={`/collections/${cat.slug}`}
                className="group/item p-2 rounded-lg hover:bg-[#F2EAE0] transition-colors block"
              >
                <div className="text-sm font-medium text-espresso group-hover/item:text-antique-gold">
                  {cat.name}
                </div>
                <div className="text-xs text-brown-text/70 line-clamp-1">
                  {cat.desc}
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-[#EAE0D0] flex justify-between items-center text-xs">
            <span className="text-brown-text">Browse all handcrafted categories</span>
            <Link
              href="/collections"
              className="text-antique-gold hover:text-deep-gold font-medium flex items-center gap-1"
            >
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Occasions Dropdown */}
      <div className="relative group">
        <span className="text-[#F5E5C9] hover:text-[#BA9048] transition-colors py-2 cursor-pointer">
          SHOP BY OCCASION
        </span>
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[400px] bg-[#FCFAF5] border border-[#D6C2A3] rounded-[14px] shadow-card p-5 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
          <div className="space-y-3">
            {OCCASIONS_NAV.map((occ) => (
              <Link
                key={occ.slug}
                href={`/collections/${occ.slug}`}
                className="group/item flex items-center justify-between p-2 rounded-lg hover:bg-[#F2EAE0] transition-colors"
              >
                <div>
                  <div className="text-sm font-medium text-espresso group-hover/item:text-antique-gold">
                    {occ.name}
                  </div>
                  <div className="text-xs text-brown-text/70">{occ.desc}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-gold opacity-0 group-hover/item:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Link
        href="/pages/about"
        className="text-brown-text hover:text-espresso transition-colors"
      >
        Our Story
      </Link>
      <Link
        href="/pages/care-guide"
        className="text-brown-text hover:text-espresso transition-colors"
      >
        Care Guide
      </Link>
      <Link
        href="/track-order"
        className="text-brown-text hover:text-espresso transition-colors"
      >
        Track Order
      </Link>
    </nav>
  );
}
