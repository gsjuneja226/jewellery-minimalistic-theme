"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Sheet } from "@/components/ui/Sheet";
import { X, Search, Phone, MapPin, ChevronRight, MessageCircle } from "lucide-react";

export interface MobileNavDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNavDrawer({ open, onClose }: MobileNavDrawerProps) {
  const [activeTab, setActiveTab] = React.useState<"menu" | "categories">("menu");

  return (
    <Sheet open={open} onClose={onClose} side="left">
      <div className="flex flex-col h-full font-sans text-black bg-white">
        {/* Brand Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#EEEEEE]">
          <Link href="/" onClick={onClose} className="flex items-center py-1">
            <div className="relative h-9 w-40 shrink-0">
              <Image
                src="/brand/newlogo.png"
                alt="Phabulous by Mitthat"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>
          <button
            onClick={onClose}
            className="p-1 text-[#222222] hover:text-black transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search input */}
        <div className="py-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const input = form.elements.namedItem("search") as HTMLInputElement;
              if (input && input.value) {
                onClose();
                window.location.href = `/search?q=${encodeURIComponent(input.value)}`;
              }
            }}
            className="relative"
          >
            <input
              name="search"
              type="text"
              placeholder="Search jhumkas, chokers, rings..."
              className="w-full py-2 pl-4 pr-9 text-xs border border-[#E5E5E5] rounded-full focus:outline-none focus:border-black bg-[#FAFAFA]"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#777777]"
              aria-label="Search"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Tabs: MENU | CATEGORIES */}
        <div className="grid grid-cols-2 border-b border-[#EEEEEE] mb-3 text-center">
          <button
            onClick={() => setActiveTab("menu")}
            className={`py-2.5 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
              activeTab === "menu"
                ? "border-black text-black"
                : "border-transparent text-[#888888] hover:text-black"
            }`}
          >
            MENU
          </button>
          <button
            onClick={() => setActiveTab("categories")}
            className={`py-2.5 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
              activeTab === "categories"
                ? "border-black text-black"
                : "border-transparent text-[#888888] hover:text-black"
            }`}
          >
            CATEGORIES
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto space-y-1 text-sm font-medium">
          {activeTab === "menu" ? (
            <>
              <Link
                href="/"
                onClick={onClose}
                className="flex items-center justify-between py-2.5 border-b border-[#F5F5F5] text-[#222222]"
              >
                <span>Home</span>
              </Link>
              <Link
                href="/collections"
                onClick={onClose}
                className="flex items-center justify-between py-2.5 border-b border-[#F5F5F5] text-[#222222]"
              >
                <span>Collections</span>
                <ChevronRight className="w-4 h-4 text-[#999999]" />
              </Link>
              <Link
                href="/collections/rings"
                onClick={onClose}
                className="flex items-center justify-between py-2.5 border-b border-[#F5F5F5] text-[#222222]"
              >
                <span>Rings</span>
                <ChevronRight className="w-4 h-4 text-[#999999]" />
              </Link>
              <Link
                href="/collections/necklaces"
                onClick={onClose}
                className="flex items-center justify-between py-2.5 border-b border-[#F5F5F5] text-[#222222]"
              >
                <span>Necklaces & Chokers</span>
                <ChevronRight className="w-4 h-4 text-[#999999]" />
              </Link>
              <Link
                href="/collections/earrings"
                onClick={onClose}
                className="flex items-center justify-between py-2.5 border-b border-[#F5F5F5] text-[#222222]"
              >
                <span>Earrings & Jhumkas</span>
                <ChevronRight className="w-4 h-4 text-[#999999]" />
              </Link>
              <Link
                href="/collections/wedding"
                onClick={onClose}
                className="flex items-center justify-between py-2.5 border-b border-[#F5F5F5] text-[#222222]"
              >
                <span>Bridal Heritage Sets</span>
                <ChevronRight className="w-4 h-4 text-[#999999]" />
              </Link>
              <Link
                href="/collections/new-arrivals"
                onClick={onClose}
                className="flex items-center justify-between py-2.5 border-b border-[#F5F5F5] text-[#BA9048]"
              >
                <span>New Arrivals</span>
                <span className="px-1.5 py-0.5 bg-[#BA9048] text-white text-[9px] font-bold rounded-full">
                  NEW
                </span>
              </Link>
              <Link
                href="/pages/about"
                onClick={onClose}
                className="flex items-center justify-between py-2.5 border-b border-[#F5F5F5] text-[#222222]"
              >
                <span>Our Story</span>
              </Link>
              <Link
                href="/pages/contact"
                onClick={onClose}
                className="flex items-center justify-between py-2.5 border-b border-[#F5F5F5] text-[#222222]"
              >
                <span>Contact Us</span>
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/collections/necklaces"
                onClick={onClose}
                className="flex items-center justify-between py-2.5 border-b border-[#F5F5F5] text-[#222222]"
              >
                <span>Necklaces & Chokers</span>
                <ChevronRight className="w-4 h-4 text-[#999999]" />
              </Link>
              <Link
                href="/collections/rings"
                onClick={onClose}
                className="flex items-center justify-between py-2.5 border-b border-[#F5F5F5] text-[#222222]"
              >
                <span>Cocktail & Solitaire Rings</span>
                <ChevronRight className="w-4 h-4 text-[#999999]" />
              </Link>
              <Link
                href="/collections/earrings"
                onClick={onClose}
                className="flex items-center justify-between py-2.5 border-b border-[#F5F5F5] text-[#222222]"
              >
                <span>Earrings & Jhumkas</span>
                <ChevronRight className="w-4 h-4 text-[#999999]" />
              </Link>
              <Link
                href="/collections/bangles-bracelets"
                onClick={onClose}
                className="flex items-center justify-between py-2.5 border-b border-[#F5F5F5] text-[#222222]"
              >
                <span>Bangles & Bracelets</span>
                <ChevronRight className="w-4 h-4 text-[#999999]" />
              </Link>
              <Link
                href="/collections/pendants"
                onClick={onClose}
                className="flex items-center justify-between py-2.5 border-b border-[#F5F5F5] text-[#222222]"
              >
                <span>Pendants & Lockets</span>
                <ChevronRight className="w-4 h-4 text-[#999999]" />
              </Link>
              <Link
                href="/collections/gifting"
                onClick={onClose}
                className="flex items-center justify-between py-2.5 border-b border-[#F5F5F5] text-[#222222]"
              >
                <span>Curated Keepsake Gifting</span>
                <ChevronRight className="w-4 h-4 text-[#999999]" />
              </Link>
            </>
          )}
        </div>

        {/* Footer Support */}
        <div className="pt-4 mt-auto border-t border-[#EEEEEE] space-y-2.5 text-xs text-[#555555]">
          <Link href="/pages/contact" onClick={onClose} className="flex items-center gap-2 text-[#222222] font-medium">
            <MapPin className="w-3.5 h-3.5 text-[#BA9048]" />
            <span>Mohali Flagship Boutique • Sector 70, Punjab</span>
          </Link>
        </div>
      </div>
    </Sheet>
  );
}
