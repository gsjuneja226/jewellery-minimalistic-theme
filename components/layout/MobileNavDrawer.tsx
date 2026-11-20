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

        {/* Social Links Row as in Alukas Drawer */}
        <div className="px-5 py-3 border-t border-[#EEEEEE] flex items-center gap-4 text-[#555555]">
          <a
            href="https://www.instagram.com/phabulous_by_mitthat"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#BA9048] transition-colors"
            aria-label="Instagram"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.79-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#BA9048] transition-colors"
            aria-label="Facebook"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
            </svg>
          </a>
          <a
            href="https://pinterest.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#BA9048] transition-colors"
            aria-label="Pinterest"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.334 1.373-.056.23-.186.279-.429.168-1.604-.746-2.607-3.086-2.607-4.969 0-4.048 2.94-7.766 8.482-7.766 4.455 0 7.917 3.175 7.917 7.417 0 4.428-2.791 7.991-6.664 7.991-1.301 0-2.525-.676-2.944-1.474l-.801 3.054c-.289 1.107-1.074 2.494-1.6 3.35 1.206.372 2.488.574 3.817.574 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
            </svg>
          </a>
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
