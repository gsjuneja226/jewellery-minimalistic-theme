"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Search, MapPin, ChevronRight } from "lucide-react";

export interface MobileNavDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNavDrawer({ open, onClose }: MobileNavDrawerProps) {
  const [activeTab, setActiveTab] = React.useState<"menu" | "categories">("menu");

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out Drawer Panel */}
      <div
        className="relative w-[85vw] max-w-[340px] bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-300"
        role="dialog"
        aria-modal="true"
      >
        {/* Clean Single Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#EEEEEE]">
          <Link href="/" onClick={onClose} className="flex items-center py-0.5">
            <div className="relative h-9 w-36 shrink-0">
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
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#222222] hover:bg-[#F5F5F5] transition-colors focus:outline-none"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Search */}
        <div className="px-5 py-3 border-b border-[#F7F7F7]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const input = form.elements.namedItem("search") as HTMLInputElement;
              if (input && input.value.trim()) {
                onClose();
                window.location.href = `/search?q=${encodeURIComponent(input.value.trim())}`;
              }
            }}
            className="relative"
          >
            <input
              name="search"
              type="text"
              placeholder="Search jhumkas, chokers, rings..."
              className="w-full h-9 pl-3.5 pr-8 text-xs border border-[#E5E5E5] rounded-full focus:outline-none focus:border-black bg-[#FAFAFA]"
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

        {/* Clean Tabs: MENU | CATEGORIES */}
        <div className="grid grid-cols-2 border-b border-[#EEEEEE] text-center">
          <button
            type="button"
            onClick={() => setActiveTab("menu")}
            className={`py-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
              activeTab === "menu"
                ? "border-black text-black"
                : "border-transparent text-[#888888] hover:text-black"
            }`}
          >
            MENU
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("categories")}
            className={`py-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
              activeTab === "categories"
                ? "border-black text-black"
                : "border-transparent text-[#888888] hover:text-black"
            }`}
          >
            CATEGORIES
          </button>
        </div>

        {/* Navigation Link List */}
        <div className="flex-1 overflow-y-auto px-5 py-3 space-y-1 text-xs font-semibold uppercase tracking-wider">
          {activeTab === "menu" ? (
            <>
              <Link
                href="/"
                onClick={onClose}
                className="flex items-center justify-between py-3 border-b border-[#F5F5F5] text-[#222222] hover:text-[#BA9048]"
              >
                <span>Home</span>
              </Link>
              <Link
                href="/collections/new-arrivals"
                onClick={onClose}
                className="flex items-center justify-between py-3 border-b border-[#F5F5F5] text-[#BA9048]"
              >
                <span>New Arrivals</span>
                <span className="px-1.5 py-0.5 bg-[#BA9048] text-white text-[9px] font-bold rounded-full">
                  NEW
                </span>
              </Link>
              <Link
                href="/collections/jewellery-sets"
                onClick={onClose}
                className="flex items-center justify-between py-3 border-b border-[#F5F5F5] text-[#222222] hover:text-[#BA9048]"
              >
                <span>Bridal Kundan Sets</span>
                <ChevronRight className="w-4 h-4 text-[#CCCCCC]" />
              </Link>
              <Link
                href="/collections/rings"
                onClick={onClose}
                className="flex items-center justify-between py-3 border-b border-[#F5F5F5] text-[#222222] hover:text-[#BA9048]"
              >
                <span>Solitaire & Cocktail Rings</span>
                <ChevronRight className="w-4 h-4 text-[#CCCCCC]" />
              </Link>
              <Link
                href="/collections/necklaces"
                onClick={onClose}
                className="flex items-center justify-between py-3 border-b border-[#F5F5F5] text-[#222222] hover:text-[#BA9048]"
              >
                <span>Necklaces & Chokers</span>
                <ChevronRight className="w-4 h-4 text-[#CCCCCC]" />
              </Link>
              <Link
                href="/collections/earrings"
                onClick={onClose}
                className="flex items-center justify-between py-3 border-b border-[#F5F5F5] text-[#222222] hover:text-[#BA9048]"
              >
                <span>Earrings & Jhumkas</span>
                <ChevronRight className="w-4 h-4 text-[#CCCCCC]" />
              </Link>
              <Link
                href="/collections/bangles-bracelets"
                onClick={onClose}
                className="flex items-center justify-between py-3 border-b border-[#F5F5F5] text-[#222222] hover:text-[#BA9048]"
              >
                <span>Bangles & Kadas</span>
                <ChevronRight className="w-4 h-4 text-[#CCCCCC]" />
              </Link>
              <Link
                href="/pages/about"
                onClick={onClose}
                className="flex items-center justify-between py-3 border-b border-[#F5F5F5] text-[#222222] hover:text-[#BA9048]"
              >
                <span>Our Story</span>
              </Link>
              <Link
                href="/track-order"
                onClick={onClose}
                className="flex items-center justify-between py-3 border-b border-[#F5F5F5] text-[#222222] hover:text-[#BA9048]"
              >
                <span>Track Delivery</span>
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/collections/necklaces"
                onClick={onClose}
                className="flex items-center justify-between py-3 border-b border-[#F5F5F5] text-[#222222]"
              >
                <span>Necklaces & Chokers</span>
                <ChevronRight className="w-4 h-4 text-[#CCCCCC]" />
              </Link>
              <Link
                href="/collections/rings"
                onClick={onClose}
                className="flex items-center justify-between py-3 border-b border-[#F5F5F5] text-[#222222]"
              >
                <span>Rings & Solitaires</span>
                <ChevronRight className="w-4 h-4 text-[#CCCCCC]" />
              </Link>
              <Link
                href="/collections/earrings"
                onClick={onClose}
                className="flex items-center justify-between py-3 border-b border-[#F5F5F5] text-[#222222]"
              >
                <span>Earrings & Jhumkas</span>
                <ChevronRight className="w-4 h-4 text-[#CCCCCC]" />
              </Link>
              <Link
                href="/collections/bangles-bracelets"
                onClick={onClose}
                className="flex items-center justify-between py-3 border-b border-[#F5F5F5] text-[#222222]"
              >
                <span>Bangles & Bracelets</span>
                <ChevronRight className="w-4 h-4 text-[#CCCCCC]" />
              </Link>
              <Link
                href="/collections/jewellery-sets"
                onClick={onClose}
                className="flex items-center justify-between py-3 border-b border-[#F5F5F5] text-[#222222]"
              >
                <span>Bridal Kundan Sets</span>
                <ChevronRight className="w-4 h-4 text-[#CCCCCC]" />
              </Link>
              <Link
                href="/collections/pendants"
                onClick={onClose}
                className="flex items-center justify-between py-3 border-b border-[#F5F5F5] text-[#222222]"
              >
                <span>Pendants & Lockets</span>
                <ChevronRight className="w-4 h-4 text-[#CCCCCC]" />
              </Link>
              <Link
                href="/collections"
                onClick={onClose}
                className="flex items-center justify-between py-3 text-black font-bold pt-2"
              >
                <span>View All Collections →</span>
              </Link>
            </>
          )}
        </div>

        {/* Footer Support Pin */}
        <div className="p-5 border-t border-[#EEEEEE] bg-[#FAF9F7] space-y-2 text-xs">
          <Link
            href="/pages/contact"
            onClick={onClose}
            className="flex items-center gap-2 text-[#222222] font-semibold hover:text-[#BA9048]"
          >
            <MapPin className="w-4 h-4 text-[#BA9048] shrink-0" />
            <span>Flagship Boutique • Sector 70, Punjab</span>
          </Link>
          <p className="text-[11px] text-[#777777]">
            Handcrafted Artificial Jewellery Boutique
          </p>
        </div>
      </div>
    </div>
  );
}
