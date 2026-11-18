"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  Mic,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { MobileNavDrawer } from "@/components/layout/MobileNavDrawer";
import { cn } from "@/lib/utils";

export const NAV_LINKS = [
  { name: "AW'26", href: "/collections/new-arrivals", isBadge: true, badgeBg: "bg-[#7A1D2E] text-[#F9E8B6]" },
  { name: "KUNDAN SETS", href: "/collections/jewellery-sets" },
  { name: "EARRINGS & JHUMKAS", href: "/collections/earrings" },
  { name: "CHOKERS & NECKLACES", href: "/collections/necklaces" },
  { name: "BANGLES & BRACELETS", href: "/collections/bangles-bracelets" },
  { name: "AD SOLITAIRES", href: "/collections/rings" },
  { name: "ANTI-TARNISH", href: "/collections/daily-wear" },
  { name: "BRIDAL EDIT", href: "/collections/wedding" },
  { name: "GIFTS", href: "/collections/gifting" },
  { name: "COLLECTIONS", href: "/collections" },
  { name: "SALE", href: "/collections/sale", isBadge: true, badgeBg: "bg-[#8E1C28] text-white" },
  { name: "PHABULOUS LUXE", href: "/collections/luxe" },
];

export function BibaStyleHero() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <section
      aria-label="Festive Fashion Hero Banner"
      className="relative w-full overflow-hidden select-none"
    >
      {/* 1. Rich Brownish/Maroonish Navbar at the Top (No strip above it) */}
      <nav className="w-full z-40 bg-[#2A1218] border-b border-[#BA9048]/40 shadow-card">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-2.5 sm:py-3">
          {/* Top Bar Row */}
          <div className="flex items-center justify-between gap-3 md:gap-6">
            {/* Mobile Left: Menu Toggle */}
            <div className="flex items-center gap-1 md:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-1.5 rounded-full text-[#F5E5C9] hover:bg-white/10 transition-colors focus:outline-none"
                aria-label="Open mobile menu"
              >
                <Menu className="w-5 h-5 text-[#F5E5C9]" />
              </button>
            </div>

            {/* Logo: Clean Transparent Light Wordmark + Country Selector */}
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 group focus:outline-none"
                aria-label="Phabulous by Mitthat Home"
              >
                <div className="relative h-8 sm:h-9 md:h-11 w-32 sm:w-36 md:w-44">
                  <Image
                    src="/brand/logo-wordmark-light.png"
                    alt="Phabulous by Mitthat"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </Link>

              <div className="hidden lg:flex items-center gap-1 text-[#E6D4B8] text-xs font-sans font-medium pl-3 border-l border-[#BA9048]/30 cursor-pointer hover:text-white">
                <span>Ship to 🇮🇳 India (₹)</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#BA9048]" />
              </div>
            </div>

            {/* Center: Search Bar Pill (Desktop) */}
            <div className="hidden md:flex flex-1 max-w-md lg:max-w-lg mx-auto">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#BA9048]">
                  <Search className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search kundan, jhumkas, chokers and gifts..."
                  className="w-full pl-10 pr-10 py-1.5 md:py-2 rounded-full bg-black/35 border border-[#BA9048]/40 text-[#F5EDE1] placeholder-[#E0D0BC]/70 text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#BA9048] focus:border-[#BA9048] focus:bg-black/50 transition-all shadow-inner"
                />
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-[#BA9048]">
                  <Mic className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Right: Wishlist, Account, Cart in Warm Gold/Cream */}
            <div className="flex items-center space-x-1 sm:space-x-3 text-[#F5E5C9]">
              <Link
                href="/account/wishlist"
                className="p-1.5 sm:p-2 rounded-full hover:bg-white/10 transition-colors relative"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5 text-[#F5E5C9] hover:text-[#BA9048]" />
              </Link>

              <Link
                href="/account"
                className="p-1.5 sm:p-2 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Account"
              >
                <User className="w-5 h-5 text-[#F5E5C9] hover:text-[#BA9048]" />
              </Link>

              <Link
                href="/cart"
                className="p-1.5 sm:p-2 rounded-full hover:bg-white/10 transition-colors relative"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5 text-[#F5E5C9] hover:text-[#BA9048]" />
                <span className="absolute top-1 right-1 bg-[#BA9048] text-[#2A1218] text-[9px] font-sans font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  0
                </span>
              </Link>
            </div>
          </div>

          {/* Mobile Search Bar Row (Clean Pill directly below logo) */}
          <div className="mt-2 md:hidden">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#BA9048]">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search kundan, jhumkas and sets..."
                className="w-full pl-10 pr-10 py-1.5 rounded-full bg-black/35 border border-[#BA9048]/40 text-[#F5EDE1] placeholder-[#E0D0BC]/70 text-xs font-sans focus:outline-none focus:ring-1 focus:ring-[#BA9048]"
              />
              <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-[#BA9048]">
                <Mic className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links Row */}
          <div className="hidden md:flex items-center justify-center space-x-6 lg:space-x-8 pt-2.5 text-[11px] lg:text-xs font-sans font-semibold tracking-wider text-[#EAE0D0]">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "transition-colors hover:text-[#BA9048] whitespace-nowrap",
                  link.isBadge
                    ? cn("px-2.5 py-0.5 rounded-sm font-bold shadow-xs", link.badgeBg)
                    : "py-1"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* 2. Clean Luxury Editorial Hero Banner (NO PHOTOS — Pure Warm Luxury Velvet & Gold Ambience) */}
      <div className="relative py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-b from-[#2A1218] via-[#38141F] to-[#240F15] text-center border-b border-[#BA9048]/30">
        {/* Subtle Decorative Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[500px] md:w-[700px] h-[160px] sm:h-[220px] rounded-full bg-[#BA9048]/15 blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 space-y-3 sm:space-y-4">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 sm:py-1 rounded-full bg-black/40 border border-[#BA9048]/50 text-[#F5E5C9] text-[10px] sm:text-xs font-sans uppercase tracking-widest font-semibold backdrop-blur-xs shadow-sm">
            <Sparkles className="w-3 h-3 text-[#BA9048]" />
            <span>AW&apos;26 • Grand Festive Edit</span>
          </div>

          {/* Pre-Heading (Italic Cormorant Garamond) */}
          <p className="font-serif italic text-lg sm:text-2xl md:text-3xl text-[#F7E7CD] font-normal">
            Make Room For
          </p>

          {/* Main Headline (Bold Cormorant Garamond Display) */}
          <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-white font-medium tracking-tight leading-tight">
            What&apos;s New
          </h1>

          {/* Delicate Floral / Lotus Divider */}
          <div className="flex items-center justify-center gap-3 py-0.5">
            <div className="w-12 sm:w-16 h-[1px] bg-gradient-to-r from-transparent to-[#BA9048]" />
            <span className="text-[#BA9048] text-sm sm:text-base select-none">🪷</span>
            <div className="w-12 sm:w-16 h-[1px] bg-gradient-to-l from-transparent to-[#BA9048]" />
          </div>

          {/* Slogan */}
          <p className="font-serif text-base sm:text-lg md:text-2xl text-[#F5EDE1]/95 font-normal tracking-wide max-w-lg mx-auto">
            Too Phabulous To Blend In.
          </p>

          {/* CTA Button (Outlined Rectangular Box) */}
          <div className="pt-2 sm:pt-3">
            <Link
              href="/collections/new-arrivals"
              className="inline-block px-7 sm:px-9 py-2 sm:py-2.5 border border-[#BA9048] bg-black/30 text-white font-sans text-xs sm:text-sm font-semibold tracking-widest uppercase hover:bg-[#BA9048] hover:text-[#2A1218] transition-all duration-300 shadow-md backdrop-blur-xs"
            >
              SHOP NOW &gt;
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <MobileNavDrawer
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </section>
  );
}
