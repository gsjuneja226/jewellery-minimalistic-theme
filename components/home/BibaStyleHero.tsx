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
  Sparkles,
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
    desktopImage: "/images/occasions/wedding.jpg",
    mobileImage: "/images/occasions/wedding.jpg",
  },
  {
    id: "anti-tarnish",
    badge: "18K Gold-Tone Plated",
    italicPre: "Waterproof & Sweatproof",
    title: "Daily Radiance",
    slogan: "Everyday Artificial Luxury That Never Dullers.",
    btnText: "SHOP DAILY WEAR >",
    btnHref: "/collections/daily-wear",
    desktopImage: "/images/occasions/daily-wear.jpg",
    mobileImage: "/images/occasions/daily-wear.jpg",
  },
  {
    id: "festive-jhumkas",
    badge: "Punjabi Heritage",
    italicPre: "Signature Drops",
    title: "Festive Jhumkas",
    slogan: "Iconic Chandbalis Crafted to Dance with You.",
    btnText: "SHOP EARRINGS >",
    btnHref: "/collections/earrings",
    desktopImage: "/images/occasions/festive.jpg",
    mobileImage: "/images/occasions/festive.jpg",
  },
];

export const NAV_LINKS = [
  { name: "AW'26", href: "/collections/new-arrivals", isBadge: true, badgeBg: "bg-[#7A1D2E] text-[#F9E8B6]" },
  { name: "KUNDAN SETS", href: "/collections/jewellery-sets" },
  { name: "EARRINGS & JHUMKAS", href: "/collections/earrings" },
  { name: "CHOKERS & NECKLACES", href: "/collections/necklaces" },
  { name: "BANGLES & BRACELETS", href: "/collections/bangles-bracelets" },
  { name: "AD SOLITAIRES", href: "/collections/rings" },
  { name: "ANTI-TARNISH", href: "/collections/daily-wear" },
  { name: "BRIDAL EDIT", href: "/collections/wedding" },
  { name: "GIFTS", href: "/collections/gifting" },
  { name: "COLLECTIONS", href: "/collections" },
  { name: "SALE", href: "/collections/sale", isBadge: true, badgeBg: "bg-[#8E1C28] text-white" },
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
      {/* 1. Rich Maroonish-Espresso Navbar at Top (No strip above it) */}
      <nav className="w-full z-40 bg-[#2A1218] border-b border-[#BA9048]/40 shadow-card">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-2.5 sm:py-3">
          {/* Top Bar Row */}
          <div className="flex items-center justify-between gap-3 md:gap-6">
            {/* Mobile Left: Menu Toggle */}
            <div className="flex items-center gap-1 md:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-1.5 rounded-full text-[#F5E5C9] hover:bg-white/10 transition-colors focus:outline-none"
                aria-label="Open mobile menu"
              >
                <Menu className="w-5 h-5 text-[#F5E5C9]" />
              </button>
            </div>

            {/* Logo: Clean Transparent Light Wordmark + Country Selector */}
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 group focus:outline-none"
                aria-label="Phabulous by Mitthat Home"
              >
                <div className="relative h-8 sm:h-9 md:h-11 w-32 sm:w-36 md:w-44">
                  <Image
                    src="/brand/logo-wordmark-light.png"
                    alt="Phabulous by Mitthat"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </Link>

              <div className="hidden lg:flex items-center gap-1 text-[#E6D4B8] text-xs font-sans font-medium pl-3 border-l border-[#BA9048]/30 cursor-pointer hover:text-white">
                <span>Ship to 🇮🇳 India (₹)</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#BA9048]" />
              </div>
            </div>

            {/* Center: Search Bar Pill (Desktop) */}
            <div className="hidden md:flex flex-1 max-w-md lg:max-w-lg mx-auto">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#BA9048]">
                  <Search className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search kundan, jhumkas, chokers and gifts..."
                  className="w-full pl-10 pr-10 py-1.5 md:py-2 rounded-full bg-black/35 border border-[#BA9048]/40 text-[#F5EDE1] placeholder-[#E0D0BC]/70 text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#BA9048] focus:border-[#BA9048] focus:bg-black/50 transition-all shadow-inner"
                />
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-[#BA9048]">
                  <Mic className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Right: Wishlist, Account, Cart in Warm Gold/Cream */}
            <div className="flex items-center space-x-1 sm:space-x-3 text-[#F5E5C9]">
              <Link
                href="/account/wishlist"
                className="p-1.5 sm:p-2 rounded-full hover:bg-white/10 transition-colors relative"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5 text-[#F5E5C9] hover:text-[#BA9048]" />
              </Link>

              <Link
                href="/account"
                className="p-1.5 sm:p-2 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Account"
              >
                <User className="w-5 h-5 text-[#F5E5C9] hover:text-[#BA9048]" />
              </Link>

              <Link
                href="/cart"
                className="p-1.5 sm:p-2 rounded-full hover:bg-white/10 transition-colors relative"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5 text-[#F5E5C9] hover:text-[#BA9048]" />
                <span className="absolute top-1 right-1 bg-[#BA9048] text-[#2A1218] text-[9px] font-sans font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  0
                </span>
              </Link>
            </div>
          </div>

          {/* Mobile Search Bar Row (Directly inside Navbar) */}
          <div className="mt-2 md:hidden">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#BA9048]">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search kundan, jhumkas and sets..."
                className="w-full pl-10 pr-10 py-1.5 rounded-full bg-black/35 border border-[#BA9048]/40 text-[#F5EDE1] placeholder-[#E0D0BC]/70 text-xs font-sans focus:outline-none focus:ring-1 focus:ring-[#BA9048]"
              />
              <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-[#BA9048]">
                <Mic className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links Row */}
          <div className="hidden md:flex items-center justify-center space-x-6 lg:space-x-8 pt-2.5 text-[11px] lg:text-xs font-sans font-semibold tracking-wider text-[#EAE0D0]">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "transition-colors hover:text-[#BA9048] whitespace-nowrap",
                  link.isBadge
                    ? cn("px-2.5 py-0.5 rounded-sm font-bold shadow-xs", link.badgeBg)
                    : "py-1"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* 2. Hero Stage with REAL VISIBLE PHOTOGRAPHY (z-0 / z-10 stacking so photos never hide!) */}
      <div className="relative w-full h-[460px] sm:h-[520px] md:h-[600px] lg:h-[660px] flex items-center justify-center md:justify-start overflow-hidden">
        {/* Real Photo Layer (z-0: Always visible and never placed behind parent background) */}
        <div className="absolute inset-0 z-0">
          {/* Desktop Photo */}
          <div className="hidden md:block relative w-full h-full">
            <Image
              src={slide.desktopImage}
              alt={slide.title}
              fill
              priority
              className="object-cover object-center transition-all duration-700 ease-in-out"
            />
          </div>

          {/* Mobile Photo */}
          <div className="block md:hidden relative w-full h-full">
            <Image
              src={slide.mobileImage}
              alt={slide.title}
              fill
              priority
              className="object-cover object-center transition-all duration-700 ease-in-out"
            />
          </div>

          {/* Delicate Vignette Overlay (z-1: Protects text readability while keeping photos vibrant) */}
          <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/80 via-black/30 to-black/40 md:bg-gradient-to-r md:from-black/80 md:via-black/35 md:to-transparent" />
        </div>

        {/* 3. Hero Content Overlay (z-10: On top of photo) */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-5 sm:px-8 md:px-12 py-8 sm:py-12">
          <div className="w-full md:max-w-xl text-center md:text-left space-y-3 sm:space-y-4">
            {/* Pill Badge */}
            <div className="inline-block">
              <span className="px-3 py-1 rounded-sm bg-[#2A1218]/90 border border-[#BA9048]/60 text-[#F5E5C9] text-[10px] sm:text-xs font-sans uppercase tracking-widest font-semibold backdrop-blur-sm shadow-sm">
                {slide.badge}
              </span>
            </div>

            {/* Pre-Heading (Italic Cormorant Garamond) */}
            <p className="font-serif italic text-xl sm:text-2xl md:text-3xl text-[#F9EBD3] font-normal drop-shadow-md">
              {slide.italicPre}
            </p>

            {/* Main Headline (Bold Cormorant Garamond Display) */}
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-medium tracking-tight drop-shadow-lg leading-tight">
              {slide.title}
            </h1>

            {/* Delicate Floral / Lotus Divider */}
            <div className="flex items-center justify-center md:justify-start gap-3 py-0.5">
              <div className="w-10 sm:w-14 h-[1px] bg-gradient-to-r from-transparent to-[#BA9048]" />
              <span className="text-[#BA9048] text-sm sm:text-base select-none">🪷</span>
              <div className="w-10 sm:w-14 h-[1px] bg-gradient-to-l from-transparent to-[#BA9048]" />
            </div>

            {/* Slogan */}
            <p className="font-serif text-base sm:text-lg md:text-xl text-[#F5EDE1] font-normal tracking-wide drop-shadow-sm max-w-md mx-auto md:mx-0">
              {slide.slogan}
            </p>

            {/* CTA Button (Outlined Rectangular Box) */}
            <div className="pt-2 sm:pt-3">
              <Link
                href={slide.btnHref}
                className="inline-block px-7 sm:px-9 py-2.5 sm:py-3 border border-[#BA9048] bg-[#2A1218]/60 text-white font-sans text-xs sm:text-sm font-semibold tracking-widest uppercase hover:bg-[#BA9048] hover:text-[#2A1218] transition-all duration-300 shadow-md backdrop-blur-xs"
              >
                {slide.btnText}
              </Link>
            </div>
          </div>
        </div>

        {/* 4. Carousel Edge Arrows (< and >) */}
        <button
          onClick={prevSlide}
          className="absolute left-1 sm:left-3 top-1/2 -translate-y-1/2 w-8 sm:w-10 h-12 sm:h-14 bg-[#2A1218]/70 hover:bg-[#2A1218] text-[#F5E5C9] hover:text-[#BA9048] flex items-center justify-center transition-colors z-20 backdrop-blur-xs border border-[#BA9048]/40 rounded-r-md shadow-md"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 sm:w-6 h-5 sm:h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-1 sm:right-3 top-1/2 -translate-y-1/2 w-8 sm:w-10 h-12 sm:h-14 bg-[#2A1218]/70 hover:bg-[#2A1218] text-[#F5E5C9] hover:text-[#BA9048] flex items-center justify-center transition-colors z-20 backdrop-blur-xs border border-[#BA9048]/40 rounded-l-md shadow-md"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 sm:w-6 h-5 sm:h-6" />
        </button>

        {/* 5. Slide Indicators (Bottom Dots) */}
        <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          {BIBA_HERO_SLIDES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentSlide(idx)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                idx === currentSlide
                  ? "w-6 bg-[#BA9048]"
                  : "w-2 bg-white/40 hover:bg-white/70"
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
