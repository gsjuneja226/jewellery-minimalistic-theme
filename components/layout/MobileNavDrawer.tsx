"use client";

import * as React from "react";
import Link from "next/link";
import { Sheet } from "@/components/ui/Sheet";
import { CATEGORIES_NAV, OCCASIONS_NAV } from "./MegaMenu";
import { Sparkles, Heart, ShoppingBag, User, Package, HelpCircle, MessageCircle } from "lucide-react";
import Image from "next/image";

export interface MobileNavDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNavDrawer({ open, onClose }: MobileNavDrawerProps) {
  return (
    <Sheet open={open} onClose={onClose} side="left">
      <div className="flex flex-col space-y-6">
        {/* Brand Header */}
        <div className="flex flex-col items-center justify-center pb-4 border-b border-[#F1E8D8]">
          <div className="relative w-36 h-12">
            <Image
              src="/brand/logo-wordmark.png"
              alt="Phabulous by Mitthat"
              fill
              className="object-contain"
              priority
            />
          </div>
          <p className="text-xs font-serif italic text-gold mt-1 text-center">
            Handpicked jewellery, simply irresistible
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-2 text-xs font-sans">
          <Link
            href="/collections/new-arrivals"
            onClick={onClose}
            className="flex items-center gap-2 p-2.5 rounded-lg bg-light-blush text-espresso font-medium"
          >
            <Sparkles className="w-4 h-4 text-antique-gold" />
            New Arrivals
          </Link>
          <Link
            href="/collections/bestsellers"
            onClick={onClose}
            className="flex items-center gap-2 p-2.5 rounded-lg bg-[#FAF1D9] text-espresso font-medium"
          >
            <Sparkles className="w-4 h-4 text-gold" />
            Bestsellers
          </Link>
        </div>

        {/* Categories Section */}
        <div className="space-y-2">
          <h3 className="text-xs uppercase font-sans tracking-widest text-brown-text font-semibold">
            Categories
          </h3>
          <div className="space-y-1">
            {CATEGORIES_NAV.map((cat) => (
              <Link
                key={cat.slug}
                href={`/collections/${cat.slug}`}
                onClick={onClose}
                className="flex items-center justify-between py-2 px-3 rounded-lg text-sm text-espresso hover:bg-soft-cream transition-colors"
              >
                <span>{cat.name}</span>
                <span className="text-xs text-brown-text/60">→</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Occasions Section */}
        <div className="space-y-2 pt-2 border-t border-[#F1E8D8]">
          <h3 className="text-xs uppercase font-sans tracking-widest text-brown-text font-semibold">
            Shop by Occasion
          </h3>
          <div className="grid grid-cols-2 gap-1.5">
            {OCCASIONS_NAV.map((occ) => (
              <Link
                key={occ.slug}
                href={`/collections/${occ.slug}`}
                onClick={onClose}
                className="p-2 rounded-lg text-xs font-medium text-espresso bg-soft-cream/70 hover:bg-soft-cream transition-colors text-center"
              >
                {occ.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Account & Support */}
        <div className="space-y-2 pt-4 border-t border-[#F1E8D8]">
          <Link
            href="/account"
            onClick={onClose}
            className="flex items-center gap-3 py-2 text-sm text-espresso hover:text-antique-gold transition-colors"
          >
            <User className="w-4 h-4 text-gold" />
            My Account & Orders
          </Link>
          <Link
            href="/account/wishlist"
            onClick={onClose}
            className="flex items-center gap-3 py-2 text-sm text-espresso hover:text-antique-gold transition-colors"
          >
            <Heart className="w-4 h-4 text-gold" />
            Saved Wishlist
          </Link>
          <Link
            href="/track-order"
            onClick={onClose}
            className="flex items-center gap-3 py-2 text-sm text-espresso hover:text-antique-gold transition-colors"
          >
            <Package className="w-4 h-4 text-gold" />
            Track Your Order
          </Link>
          <Link
            href="/pages/care-guide"
            onClick={onClose}
            className="flex items-center gap-3 py-2 text-sm text-espresso hover:text-antique-gold transition-colors"
          >
            <HelpCircle className="w-4 h-4 text-gold" />
            Jewellery Care Guide
          </Link>
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 py-2 text-sm text-emerald-800 hover:text-emerald-900 transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            WhatsApp Concierge
          </a>
        </div>
      </div>
    </Sheet>
  );
}
