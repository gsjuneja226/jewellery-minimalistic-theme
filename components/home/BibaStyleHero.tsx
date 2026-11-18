"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  Mic,
  ChevronDown,
} from "lucide-react";
import { MobileNavDrawer } from "@/components/layout/MobileNavDrawer";
import { cn } from "@/lib/utils";

export interface BibaHeroSlide {
  id: string;
  badge: string;
  italicPre: string;
  title: string;
  slogan: string;
  btnText: string;
  btnHref: string;
  desktopImage: string;
  mobileImage: string;
}

export const BIBA_HERO_SLIDES: BibaHeroSlide[] = [
  {
    id: "whats-new",
    badge: "New Arrival",
    italicPre: "Make Room For",
    title: "What's New",
    slogan: "Too Phabulous To Blend In.",
    btnText: "SHOP NOW >",
    btnHref: "/collections/new-arrivals",
    desktopImage: "/hero/biba-hero-desktop.jpg",
    mobileImage: "/hero/biba-hero-mobile.jpg",
  },
  {
    id: "kundan-edit",
    badge: "Festive Grandeur",
    italicPre: "The Royal Heritage",
    title: "Kundan Edit",
    slogan: "Handcrafted Splendour for the Modern Celebration.",
    btnText: "EXPLORE BRIDAL >",
    btnHref: "/collections/wedding",
    desktopImage: "/hero/biba-hero-desktop.jpg",
    mobileImage: "/hero/biba-hero-mobile.jpg",
  },
  {
    id: "anti-tarnish",
    badge: "18K Gold-Tone Plated",
    italicPre: "Waterproof & Sweatproof",
    title: "Daily Radiance",
    slogan: "Everyday Artificial Luxury That Never Dullers.",
    btnText: "SHOP DAILY WEAR >",
    btnHref: "/collections/daily-wear",
    desktopImage: "/hero/biba-hero-desktop.jpg",
    mobileImage: "/hero/biba-hero-mobile.jpg",
  },
];

export const NAV_LINKS = [
  { name: "AW'26", href: "/collections/new-arrivals", isBadge: true, badgeBg: "bg-[#8E1B34] text-white" },
  { name: "KUNDAN SETS", href: "/collections/jewellery-sets" },
  { name: "EARRINGS & JHUMKAS", href: "/collections/earrings" },
  { name: "CHOKERS & NECKLACES", href: "/collections/necklaces" },
  { name: "BANGLES & BRACELETS", href: "/collections/bangles-bracelets" },
  { name: "AD SOLITAIRES", href: "/collections/rings" },
  { name: "ANTI-TARNISH", href: "/collections/daily-wear" },
  { name: "BRIDAL EDIT", href: "/collections/wedding" },
  { name: "GIFTS", href: "/collections/gifting" },
  { name: "COLLECTIONS", href: "/collections" },
  { name: "SALE", href: "/collections/sale", isBadge: true, badgeBg: "bg-[#9A1F2D] text-white" },
  { name: "PHABULOUS LUXE", href: "/collections/luxe" },
];

export function BibaStyleHero() {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const totalSlides = BIBA_HERO_SLIDES.length;

  const nextSlide = React.useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = React.useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Autoplay timer (6 seconds)
  React.useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  const slide = BIBA_HERO_SLIDES[currentSlide];

  return (
    <section
      aria-label="Festive Fashion Hero Banner"
      className="relative w-full overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 1. Festive Announcement Ticker (Rich Warm Royal Espresso & Gold) */}
      <div className="bg-[#241308] text-[#F3E3B5] text-[11px] sm:text-xs font-sans font-bold tracking-wider py-2 px-4 text-center border-b border-[#8C621E]/60">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <span className="text-[#BA9048]">✨</span>
          <span>AW&apos;26 IS HERE: DISCOVER THE NEW SEASON OF ELEGANCE</span>
          <span className="text-[#8C621E]">•</span>
          <span>PAN-INDIA CASH ON DELIVERY</span>
          <span className="hidden md:inline text-[#8C621E]">•</span>
          <span className="hidden md:inline">FREE EXPRESS SHIPPING ON ORDERS ABOVE ₹1,499</span>
        </div>
      </div>

      {/* 2. Main Hero Stage with Background Photo & Overlaid Header */}
      <div className="relative min-h-[580px] sm:min-h-[640px] md:min-h-[680px] lg:min-h-[760px] w-full flex flex-col justify-between">
        {/* Background Images: Desktop & Mobile Responsive */}
        <div className="absolute inset-0 -z-10 overflow-hidden bg-[#242C1B]">
          {/* Desktop Photo */}
          <div className="hidden md:block relative w-full h-full">
            <Image
              src={slide.desktopImage}
              alt={slide.title}
              fill
              priority
              className="object-cover object-center transition-all duration-700 ease-in-out scale-100"
            />
          </div>
          {/* Mobile Photo */}
          <div className="block md:hidden relative w-full h-full">
            <Image
              src={slide.mobileImage}
              alt={slide.title}
              fill
              priority
              className="object-cover object-bottom transition-all duration-700 ease-in-out"
            />
          </div>

          {/* Vignette Gradients for Rich Warm Contrast & Text Legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-black/65 md:bg-gradient-to-r md:from-black/75 md:via-black/35 md:to-transparent" />
        </div>

        {/* 3. Integrated Translucent Header (Desktop & Mobile) */}
        <header className="w-full z-30 pt-3 pb-2 px-4 md:px-8 border-b border-white/15 bg-black/20 backdrop-blur-xs">
          <div className="max-w-7xl mx-auto">
            {/* Top Bar Row */}
            <div className="flex items-center justify-between gap-3 md:gap-6">
              {/* Mobile Left: Menu Toggle */}
              <div className="flex items-center md:hidden">
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className="p-1.5 text-white hover:text-[#FED24C] transition-colors"
                  aria-label="Open mobile menu"
                >
                  <Menu className="w-6 h-6" />
                </button>
              </div>

              {/* Desktop Left: Logo + Country Selector */}
              <div className="flex items-center gap-4">
                <Link
                  href="/"
                  className="flex items-center gap-2 group focus:outline-none"
                  aria-label="Phabulous by Mitthat Home"
                >
                  <div className="relative h-9 md:h-11 w-32 md:w-44 brightness-0 invert">
                    <Image
                      src="/brand/logo-wordmark.png"
                      alt="Phabulous by Mitthat"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </Link>

                <div className="hidden lg:flex items-center gap-1 text-white/90 text-xs font-sans font-medium pl-3 border-l border-white/20 cursor-pointer hover:text-white">
                  <span>Ship to 🇮🇳 India (₹)</span>
                  <ChevronDown className="w-3.5 h-3.5 text-white/70" />
                </div>
              </div>

              {/* Center: Search Bar Pill (Desktop) */}
              <div className="hidden md:flex flex-1 max-w-lg mx-auto">
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/70">
                    <Search className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search kundan, jhumkas, chokers and gifts..."
                    className="w-full pl-10 pr-10 py-2 rounded-full bg-black/30 border border-white/30 text-white placeholder-white/70 text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#FED24C] focus:bg-black/50 transition-all backdrop-blur-sm"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-white/70">
                    <Mic className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Right: Wishlist, Account, Cart */}
              <div className="flex items-center space-x-2 sm:space-x-3 text-white">
                <Link
                  href="/account/wishlist"
                  className="p-2 rounded-full hover:bg-white/10 transition-colors relative"
                  aria-label="Wishlist"
                >
                  <Heart className="w-5 h-5" />
                </Link>

                <Link
                  href="/account"
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  aria-label="Account"
                >
                  <User className="w-5 h-5" />
                </Link>

                <Link
                  href="/cart"
                  className="p-2 rounded-full hover:bg-white/10 transition-colors relative"
                  aria-label="Shopping Cart"
                >
                  <ShoppingBag className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Mobile Search Bar Row (Under Logo) */}
            <div className="mt-2.5 md:hidden">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/70">
                  <Search className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search kundan, jhumkas and sets..."
                  className="w-full pl-10 pr-10 py-1.5 rounded-full bg-black/40 border border-white/35 text-white placeholder-white/75 text-xs font-sans focus:outline-none focus:ring-1 focus:ring-[#FED24C]"
                />
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-white/70">
                  <Mic className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Desktop Navigation Links (AW'26, Kundan Sets, Jhumkas, etc.) */}
            <nav className="hidden md:flex items-center justify-center space-x-6 lg:space-x-8 pt-3 text-[11px] lg:text-xs font-sans font-semibold tracking-wider text-white">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "transition-colors hover:text-[#FED24C] whitespace-nowrap",
                    link.isBadge
                      ? cn("px-2.5 py-0.5 rounded-sm font-bold", link.badgeBg)
                      : "py-1"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        {/* 4. Hero Content Overlay */}
        <div className="flex-1 flex items-center max-w-7xl mx-auto w-full px-6 sm:px-10 md:px-12 py-10 z-20">
          <div className="w-full md:max-w-xl text-center md:text-left space-y-4 sm:space-y-5">
            {/* Pill Badge */}
            <div className="inline-block">
              <span className="px-3.5 py-1 rounded-sm bg-black/70 border border-white/30 text-white text-[11px] sm:text-xs font-sans uppercase tracking-widest font-semibold backdrop-blur-xs shadow-sm">
                {slide.badge}
              </span>
            </div>

            {/* Pre-Heading (Italic Cormorant Garamond) */}
            <p className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-white font-normal drop-shadow-md">
              {slide.italicPre}
            </p>

            {/* Main Headline (Bold Cormorant Garamond Display) */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-medium tracking-tight drop-shadow-lg leading-none">
              {slide.title}
            </h1>

            {/* Delicate Floral / Lotus Divider (as in BIBA reference) */}
            <div className="flex items-center justify-center md:justify-start gap-3 py-1">
              <div className="w-12 sm:w-16 h-[1px] bg-gradient-to-r from-transparent to-white/70" />
              <span className="text-white text-base sm:text-lg select-none">🪷</span>
              <div className="w-12 sm:w-16 h-[1px] bg-gradient-to-l from-transparent to-white/70" />
            </div>

            {/* Slogan */}
            <p className="font-serif text-lg sm:text-xl md:text-2xl text-white/95 font-normal tracking-wide drop-shadow-sm">
              {slide.slogan}
            </p>

            {/* CTA Button (Outlined Rectangular Box from BIBA reference) */}
            <div className="pt-2 sm:pt-4">
              <Link
                href={slide.btnHref}
                className="inline-block px-7 sm:px-9 py-2.5 sm:py-3 border border-white text-white font-sans text-xs sm:text-sm font-semibold tracking-widest uppercase hover:bg-white hover:text-[#2A1408] transition-all duration-300 shadow-md backdrop-blur-xs"
              >
                {slide.btnText}
              </Link>
            </div>
          </div>
        </div>

        {/* 5. Carousel Edge Arrows (< and > from BIBA reference) */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 w-8 sm:w-10 h-14 sm:h-16 bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-colors z-20 backdrop-blur-xs border-r border-white/20"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 sm:w-6 h-5 sm:h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-8 sm:w-10 h-14 sm:h-16 bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-colors z-20 backdrop-blur-xs border-l border-white/20"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 sm:w-6 h-5 sm:h-6" />
        </button>

        {/* 6. Slide Indicators (Bottom Dots) */}
        <div className="w-full flex justify-center items-center gap-2 pb-4 z-20">
          {BIBA_HERO_SLIDES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentSlide(idx)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                idx === currentSlide
                  ? "w-6 bg-[#FED24C]"
                  : "w-2 bg-white/50 hover:bg-white/80"
              )}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
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
