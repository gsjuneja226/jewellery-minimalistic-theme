"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  Search,
  Heart,
  ShoppingBag,
  User,
  ChevronDown,
  MapPin,
  X,
} from "lucide-react";
import { MegaMenu } from "./MegaMenu";
import { MobileNavDrawer } from "./MobileNavDrawer";
import { CartDrawer } from "@/components/cart/CartDrawer";

export interface HeaderProps {
  isOverHero?: boolean;
  cartCount?: number;
  wishlistCount?: number;
}

export function Header({
  cartCount = 0,
  wishlistCount = 0,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <>
      <header className="w-full z-40 bg-white font-sans border-b border-[#EEEEEE] sticky top-0 shadow-2xs">
        {/* Main Brand & Action Row */}
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-2.5 sm:py-3 md:py-3.5">
          <div className="grid grid-cols-3 items-center">
            {/* Left Column:
                - On mobile: Hamburger Button (with 44px tap target)
                - On desktop: Luxury Search Input */}
            <div className="flex items-center justify-start">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="flex md:hidden w-11 h-11 -ml-2 items-center justify-center text-[#222222] hover:text-black transition-colors focus:outline-none"
                aria-label="Open navigation menu"
              >
                <Menu className="w-6 h-6 stroke-[1.6]" />
              </button>

              <div className="hidden md:block w-full max-w-[260px] lg:max-w-[320px]">
                <form onSubmit={handleSearchSubmit} className="relative w-full">
                  <input
                    type="text"
                    placeholder="Search artificial jewellery, chokers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-10 pl-4 pr-10 text-xs text-[#222222] placeholder-[#888888] bg-[#F7F7F7] border border-[#E5E5E5] rounded-full focus:outline-none focus:border-black focus:bg-white transition-all shadow-2xs"
                  />
                  {searchQuery ? (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      aria-label="Clear search"
                      className="absolute right-8 top-1/2 -translate-y-1/2 text-[#999999] hover:text-black transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  ) : null}
                  <button
                    type="submit"
                    aria-label="Search"
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#666666] hover:text-black transition-colors"
                  >
                    <Search className="w-4 h-4 stroke-[1.8]" />
                  </button>
                </form>
              </div>
            </div>

            {/* Center Column: Perfectly Centered Brand Logo */}
            <div className="flex items-center justify-center">
              <Link
                href="/"
                className="flex items-center justify-center group focus:outline-none py-0.5"
                aria-label="Phabulous by Mitthat"
              >
                <div className="relative h-9 sm:h-11 md:h-12 w-36 sm:w-48 md:w-56 shrink-0 transition-opacity group-hover:opacity-90">
                  <Image
                    src="/brand/newlogo.png"
                    alt="Phabulous by Mitthat"
                    fill
                    sizes="(max-width: 640px) 150px, 240px"
                    className="object-contain object-center"
                    priority
                  />
                </div>
              </Link>
            </div>

            {/* Right Column: User, Search Icon, Wishlist, Cart Bag */}
            <div className="flex items-center justify-end space-x-1 sm:space-x-3 text-[#222222]">
              {/* User Account (Desktop) */}
              <Link
                href="/account"
                className="hidden md:flex items-center text-[#222222] hover:text-[#BA9048] transition-colors p-1.5"
                aria-label="My Account"
              >
                <User className="w-5 h-5 stroke-[1.5]" />
              </Link>

              {/* Search Icon (Mobile quick search & Desktop drawer toggle) */}
              <button
                type="button"
                onClick={() => setSearchOpen(!searchOpen)}
                className="w-9 h-9 flex items-center justify-center text-[#222222] hover:text-[#BA9048] transition-colors focus:outline-none"
                aria-label="Toggle Search"
              >
                <Search className="w-5 h-5 stroke-[1.6]" />
              </button>

              {/* Wishlist with Gold Badge */}
              <Link
                href="/account/wishlist"
                className="w-9 h-9 flex items-center justify-center text-[#222222] hover:text-[#BA9048] relative transition-colors"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5 stroke-[1.5]" />
                <span className="absolute top-0.5 right-0.5 bg-[#BA9048] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              </Link>

              {/* Shopping Bag with Black Badge */}
              <button
                type="button"
                onClick={() => setCartDrawerOpen(true)}
                className="w-9 h-9 flex items-center justify-center text-[#222222] hover:text-[#BA9048] relative transition-colors focus:outline-none"
                aria-label="Open Shopping Bag"
              >
                <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
                <span className="absolute top-0.5 right-0.5 bg-[#222222] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Expandable Instant Search Bar (Toggled by Search Icon) */}
        {searchOpen && (
          <div className="w-full bg-[#FAF9F7] border-t border-b border-[#E5E5E5] px-4 py-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="max-w-3xl mx-auto flex items-center gap-3">
              <form onSubmit={handleSearchSubmit} className="relative flex-1">
                <input
                  type="text"
                  autoFocus
                  placeholder="Search artificial jewellery, jhumkas, chokers, bangles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 pl-4 pr-10 text-xs text-[#222222] placeholder-[#888888] bg-white border border-[#E0E0E0] rounded-full focus:outline-none focus:border-black transition-all shadow-2xs"
                />
                <button
                  type="submit"
                  aria-label="Search"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#444444] hover:text-black"
                >
                  <Search className="w-4 h-4 stroke-[1.8]" />
                </button>
              </form>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="p-1.5 text-[#666666] hover:text-black transition-colors"
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Lower Desktop Navigation Bar - Clean, Centered, Single-Line */}
        <div className="hidden lg:block border-t border-[#EEEEEE] bg-white relative">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <nav className="flex items-center justify-center space-x-9 text-xs font-semibold uppercase tracking-[0.16em] text-[#222222]">
              <Link
                href="/"
                className="py-3.5 hover:text-[#BA9048] relative transition-colors border-b-2 border-black whitespace-nowrap"
              >
                HOME
              </Link>

              {/* Collections with Mega Menu */}
              <div className="group static">
                <Link
                  href="/collections"
                  className="py-3.5 hover:text-[#BA9048] flex items-center gap-1 transition-colors whitespace-nowrap"
                >
                  <span>COLLECTIONS</span>
                  <ChevronDown className="w-3 h-3 text-[#777777] group-hover:text-black" />
                </Link>
                <MegaMenu />
              </div>

              <Link
                href="/collections/rings"
                className="py-3.5 hover:text-[#BA9048] transition-colors whitespace-nowrap"
              >
                RINGS
              </Link>

              <Link
                href="/collections/necklaces"
                className="py-3.5 hover:text-[#BA9048] transition-colors whitespace-nowrap"
              >
                NECKLACES
              </Link>

              <Link
                href="/collections/earrings"
                className="py-3.5 hover:text-[#BA9048] transition-colors whitespace-nowrap"
              >
                EARRINGS
              </Link>

              <Link
                href="/collections/bangles-bracelets"
                className="py-3.5 hover:text-[#BA9048] transition-colors whitespace-nowrap"
              >
                BANGLES
              </Link>

              <Link
                href="/collections/jewellery-sets"
                className="py-3.5 hover:text-[#BA9048] transition-colors whitespace-nowrap"
              >
                BRIDAL KUNDAN
              </Link>

              {/* NEW ARRIVALS with small badge */}
              <Link
                href="/collections/new-arrivals"
                className="py-3.5 text-[#222222] hover:text-[#BA9048] flex items-center gap-1.5 transition-colors whitespace-nowrap"
              >
                <span>NEW ARRIVALS</span>
                <span className="px-1.5 py-0.2 bg-[#BA9048] text-white text-[9px] font-bold rounded-full">
                  NEW
                </span>
              </Link>

              <Link
                href="/pages/about"
                className="py-3.5 hover:text-[#BA9048] transition-colors whitespace-nowrap"
              >
                OUR STORY
              </Link>
            </nav>
          </div>
        </div>

        {/* Mobile Category Strip - Displays All Laptop Navigation Links on Mobile */}
        <div className="lg:hidden border-t border-[#EEEEEE] bg-[#FAF9F7] overflow-x-auto no-scrollbar px-3 py-2 flex items-center gap-4 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#333333] whitespace-nowrap">
          <Link href="/" className="hover:text-[#BA9048] text-black transition-colors">HOME</Link>
          <Link href="/collections" className="hover:text-[#BA9048] transition-colors">COLLECTIONS</Link>
          <Link href="/collections/rings" className="hover:text-[#BA9048] transition-colors">RINGS</Link>
          <Link href="/collections/necklaces" className="hover:text-[#BA9048] transition-colors">NECKLACES</Link>
          <Link href="/collections/earrings" className="hover:text-[#BA9048] transition-colors">EARRINGS</Link>
          <Link href="/collections/bangles-bracelets" className="hover:text-[#BA9048] transition-colors">BANGLES</Link>
          <Link href="/collections/jewellery-sets" className="hover:text-[#BA9048] transition-colors">BRIDAL KUNDAN</Link>
          <Link href="/collections/new-arrivals" className="text-[#BA9048] font-bold">NEW ARRIVALS</Link>
          <Link href="/pages/about" className="hover:text-[#BA9048] transition-colors">OUR STORY</Link>
        </div>
      </header>

      {/* Cart Drawer */}
      <CartDrawer
        open={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        cartCount={cartCount}
      />

      {/* Mobile Drawer */}
      <MobileNavDrawer
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
