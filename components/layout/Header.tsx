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
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3.5 md:py-4">
          <div className="flex items-center justify-between gap-4 md:gap-8">
            {/* Mobile: Hamburger Button */}
            <div className="flex md:hidden items-center">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-1.5 text-[#222222] hover:text-black transition-colors focus:outline-none"
                aria-label="Open navigation menu"
              >
                <Menu className="w-6 h-6 stroke-[1.6]" />
              </button>
            </div>

            {/* Desktop Left / Mobile Center: Brand Logo */}
            <div className="flex items-center justify-start">
              <Link
                href="/"
                className="flex items-center group focus:outline-none"
                aria-label="Phabulous by Mitthat"
              >
                <div className="relative h-9 sm:h-11 md:h-12 w-44 sm:w-52 md:w-60 shrink-0 transition-opacity group-hover:opacity-90">
                  <Image
                    src="/brand/newlogo.png"
                    alt="Phabulous by Mitthat"
                    fill
                    sizes="(max-width: 640px) 176px, 240px"
                    className="object-contain object-left"
                    priority
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Center: Luxury Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-auto">
              <form onSubmit={handleSearchSubmit} className="relative w-full">
                <input
                  type="text"
                  placeholder="Search artificial jewellery, jhumkas, chokers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10.5 pl-4 pr-11 text-xs text-[#222222] placeholder-[#888888] bg-[#F7F7F7] border border-[#E5E5E5] rounded-full focus:outline-none focus:border-black focus:bg-white transition-all shadow-2xs"
                />
                {searchQuery ? (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear search"
                    className="absolute right-9 top-1/2 -translate-y-1/2 text-[#999999] hover:text-black transition-colors"
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

            {/* Desktop & Mobile Right: Actions (Mohali Store, Account, Wishlist, Cart) */}
            <div className="flex items-center justify-end space-x-3 sm:space-x-5 text-[#222222]">
              {/* Mohali Store Pill */}
              <Link
                href="/pages/contact"
                className="hidden lg:flex items-center gap-1.5 py-1 px-3 rounded-full bg-[#FAF9F5] border border-[#EBE6DC] text-xs text-[#444444] hover:text-[#BA9048] hover:border-[#BA9048] transition-colors"
                title="Mohali Flagship Boutique, Sector 70, Punjab"
              >
                <MapPin className="w-3.5 h-3.5 text-[#BA9048]" />
                <span className="font-medium tracking-wide">Mohali Boutique</span>
              </Link>

              {/* User Account */}
              <Link
                href="/account"
                className="hidden sm:flex items-center text-[#222222] hover:text-[#BA9048] transition-colors p-1"
                aria-label="My Account"
              >
                <User className="w-5 h-5 stroke-[1.5]" />
              </Link>

              {/* Wishlist with Gold Badge */}
              <Link
                href="/account/wishlist"
                className="flex items-center text-[#222222] hover:text-[#BA9048] relative transition-colors p-1"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5 stroke-[1.5]" />
                <span className="absolute -top-1 -right-1.5 bg-[#BA9048] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              </Link>

              {/* Shopping Bag with Black Badge */}
              <button
                type="button"
                onClick={() => setCartDrawerOpen(true)}
                className="flex items-center text-[#222222] hover:text-[#BA9048] relative transition-colors focus:outline-none p-1"
                aria-label="Open Shopping Bag"
              >
                <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
                <span className="absolute -top-1 -right-1.5 bg-[#222222] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              </button>
            </div>
          </div>
        </div>

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

              {/* Collections with Mega Menu - Static so MegaMenu spans full header width */}
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
