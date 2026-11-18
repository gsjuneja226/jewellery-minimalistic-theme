"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, Search, Heart, ShoppingBag, User } from "lucide-react";
import { MobileNavDrawer } from "./MobileNavDrawer";
import { MegaMenu } from "./MegaMenu";
import { cn } from "@/lib/utils";

export interface HeaderProps {
  /** If true, starts as an icons-only slim floating header that converts to a sticky bar with wordmark past hero */
  isOverHero?: boolean;
  cartCount?: number;
  wishlistCount?: number;
}

export function Header({
  isOverHero = true,
  cartCount = 0,
  wishlistCount = 0,
}: HeaderProps) {
  const [isScrolledPastHero, setIsScrolledPastHero] = React.useState(!isOverHero);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);

  React.useEffect(() => {
    if (!isOverHero) {
      setIsScrolledPastHero(true);
      return;
    }

    const handleScroll = () => {
      // Past hero threshold (around 650px)
      if (window.scrollY > 480) {
        setIsScrolledPastHero(true);
      } else {
        setIsScrolledPastHero(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOverHero]);

  return (
    <>
      <header
        className={cn(
          "w-full z-40 transition-all duration-300",
          isScrolledPastHero
            ? "sticky top-0 bg-white/95 backdrop-blur-md border-b border-[#E7DCC6]/70 shadow-subtle py-2.5 px-4 md:px-8"
            : "absolute top-0 left-0 right-0 py-3 px-4 md:px-8 pointer-events-auto"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: Mobile Menu Button & Search */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-full text-espresso hover:bg-soft-cream/80 transition-colors focus:outline-none focus:ring-2 focus:ring-gold"
              aria-label="Open mobile menu"
            >
              <Menu className="w-5 h-5 text-espresso" />
            </button>
            <Link
              href="/search"
              className="p-2 rounded-full text-espresso hover:bg-soft-cream/80 transition-colors focus:outline-none focus:ring-2 focus:ring-gold"
              aria-label="Search catalogue"
            >
              <Search className="w-5 h-5 text-espresso" />
            </Link>
          </div>

          {/* Center: Wordmark (Visible when scrolled past hero or on non-hero pages) */}
          <div className="flex-1 flex justify-center items-center">
            <Link
              href="/"
              className={cn(
                "transition-all duration-300 relative block",
                isScrolledPastHero
                  ? "opacity-100 scale-100 h-10 w-36 md:w-44"
                  : "opacity-0 scale-95 pointer-events-none h-8 w-28"
              )}
              aria-label="Phabulous by Mitthat Home"
            >
              <Image
                src="/brand/logo-wordmark.png"
                alt="Phabulous by Mitthat"
                fill
                className="object-contain"
                priority
              />
            </Link>
          </div>

          {/* Right: Account, Wishlist, Cart */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            <Link
              href="/account"
              className="p-2 rounded-full text-espresso hover:bg-soft-cream/80 transition-colors focus:outline-none focus:ring-2 focus:ring-gold"
              aria-label="Account"
            >
              <User className="w-5 h-5 text-espresso" />
            </Link>
            <Link
              href="/account/wishlist"
              className="p-2 rounded-full text-espresso hover:bg-soft-cream/80 transition-colors relative focus:outline-none focus:ring-2 focus:ring-gold"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5 text-espresso" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-antique-gold text-white text-[10px] font-sans font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link
              href="/cart"
              className="p-2 rounded-full text-espresso hover:bg-soft-cream/80 transition-colors relative focus:outline-none focus:ring-2 focus:ring-gold"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 text-espresso" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-espresso text-white text-[10px] font-sans font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mega Menu underneath sticky header on desktop when scrolled */}
        {isScrolledPastHero && <MegaMenu />}
      </header>

      {/* Mobile Drawer */}
      <MobileNavDrawer
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
