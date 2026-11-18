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
  isOverHero = false,
  cartCount = 0,
  wishlistCount = 0,
}: HeaderProps) {
  const [isScrolledPastHero, setIsScrolledPastHero] = React.useState(!isOverHero);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      if (isOverHero) {
        setIsScrolledPastHero(window.scrollY > 520);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOverHero]);

  // If isOverHero is true and user hasn't scrolled past hero, do not render floating bar
  if (isOverHero && !isScrolledPastHero) {
    return (
      <MobileNavDrawer
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    );
  }

  return (
    <>
      <header
        className={cn(
          "w-full z-50 transition-all duration-300 sticky top-0 bg-[#2A1218]/95 backdrop-blur-md border-b border-[#BA9048]/40 px-4 md:px-8 text-[#F5E5C9]",
          isScrolled ? "py-2 shadow-card" : "py-3 shadow-subtle"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: Mobile Menu Button & Search */}
          <div className="flex items-center space-x-2 md:space-x-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-full text-[#F5E5C9] hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#BA9048]"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5 text-[#F5E5C9]" />
            </button>
            <Link
              href="/search"
              className="flex items-center gap-2 p-2 sm:px-3 sm:py-1.5 rounded-full text-[#F5E5C9] hover:bg-white/10 transition-colors border border-transparent sm:border-[#BA9048]/40 focus:outline-none focus:ring-2 focus:ring-[#BA9048]"
              aria-label="Search catalogue"
            >
              <Search className="w-4 h-4 text-[#BA9048]" />
              <span className="hidden sm:inline text-xs font-sans text-[#E0D0BC]">
                Search &quot;kundan&quot;, &quot;jhumka&quot;, &quot;solitaire&quot;...
              </span>
            </Link>
          </div>

          {/* Center: Wordmark */}
          <div className="flex-1 flex justify-center items-center">
            <Link
              href="/"
              className="transition-all duration-300 relative block opacity-100 scale-100 h-8 sm:h-10 w-32 sm:w-44"
              aria-label="Phabulous by Mitthat Home"
            >
              <Image
                src="/brand/logo-wordmark-light.png"
                alt="Phabulous by Mitthat"
                fill
                className="object-contain"
                priority
              />
            </Link>
          </div>

          {/* Right: Account, Wishlist, Cart */}
          <div className="flex items-center space-x-1 sm:space-x-2 text-[#F5E5C9]">
            <Link
              href="/account"
              className="p-2 rounded-full text-[#F5E5C9] hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#BA9048]"
              aria-label="Account"
            >
              <User className="w-5 h-5 text-[#F5E5C9]" />
            </Link>
            <Link
              href="/account/wishlist"
              className="p-2 rounded-full text-[#F5E5C9] hover:bg-white/10 transition-colors relative focus:outline-none focus:ring-2 focus:ring-[#BA9048]"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5 text-[#F5E5C9]" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-antique-gold text-white text-[10px] font-sans font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link
              href="/cart"
              className="p-2 rounded-full text-[#F5E5C9] hover:bg-white/10 transition-colors relative focus:outline-none focus:ring-2 focus:ring-[#BA9048]"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 text-[#F5E5C9]" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#BA9048] text-[#2A1218] text-[10px] font-sans font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mega Menu underneath sticky header on desktop */}
        <MegaMenu />
      </header>

      {/* Mobile Drawer */}
      <MobileNavDrawer
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
