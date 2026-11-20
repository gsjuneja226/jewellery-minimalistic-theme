"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Heart, User } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MobileBottomNavProps {
  wishlistCount?: number;
}

export function MobileBottomNav({ wishlistCount = 0 }: MobileBottomNavProps) {
  const pathname = usePathname();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E5E5E5] px-4 py-2 flex items-center justify-around shadow-subtle">
      {/* Home */}
      <Link
        href="/"
        className={cn(
          "flex flex-col items-center gap-1 text-[10px] font-bold uppercase tracking-wider transition-colors",
          pathname === "/" ? "text-[#222222]" : "text-[#777777] hover:text-[#222222]"
        )}
      >
        <Home className="w-5 h-5 stroke-[1.5]" />
        <span>HOME</span>
      </Link>

      {/* Search */}
      <Link
        href="/search"
        className={cn(
          "flex flex-col items-center gap-1 text-[10px] font-bold uppercase tracking-wider transition-colors",
          pathname === "/search" ? "text-[#222222]" : "text-[#777777] hover:text-[#222222]"
        )}
      >
        <Search className="w-5 h-5 stroke-[1.5]" />
        <span>SEARCH</span>
      </Link>

      {/* Wishlist */}
      <Link
        href="/account/wishlist"
        className={cn(
          "flex flex-col items-center gap-1 text-[10px] font-bold uppercase tracking-wider transition-colors relative",
          pathname === "/account/wishlist" ? "text-[#222222]" : "text-[#777777] hover:text-[#222222]"
        )}
      >
        <div className="relative">
          <Heart className="w-5 h-5 stroke-[1.5]" />
          <span className="absolute -top-1 -right-2 bg-black text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
            {wishlistCount}
          </span>
        </div>
        <span>WISHLIST</span>
      </Link>

      {/* Account */}
      <Link
        href="/account"
        className={cn(
          "flex flex-col items-center gap-1 text-[10px] font-bold uppercase tracking-wider transition-colors",
          pathname.startsWith("/account") && pathname !== "/account/wishlist"
            ? "text-[#222222]"
            : "text-[#777777] hover:text-[#222222]"
        )}
      >
        <User className="w-5 h-5 stroke-[1.5]" />
        <span>ACCOUNT</span>
      </Link>
    </div>
  );
}
