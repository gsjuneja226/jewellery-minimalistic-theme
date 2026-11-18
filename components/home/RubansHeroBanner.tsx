"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Truck,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface RubansBannerSlide {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  desc: string;
  tags: string[];
  primaryBtnText: string;
  primaryBtnHref: string;
  secondaryBtnText: string;
  secondaryBtnHref: string;
  image: string;
  bgColor: string;
  accentColor: string;
}

export const RUBANS_HERO_SLIDES: RubansBannerSlide[] = [
  {
    id: "kundan-edit",
    badge: "Grand Festive Edit 2026",
    title: "The Royal Kundan Heritage",
    subtitle: "Regal Meenakari & Uncut Stone Craftsmanship",
    desc: "Intricately set kundan-style uncut stones framed with lustrous pearl-style drops. Handpicked artificial splendour for your wedding and festive celebrations.",
    tags: ["Handpicked by Mitthat", "100% Skin-Friendly", "COD Available"],
    primaryBtnText: "Shop Kundan Sets",
    primaryBtnHref: "/collections/jewellery-sets",
    secondaryBtnText: "Explore Bridal",
    secondaryBtnHref: "/collections/wedding",
    image: "/products/kundan-jadau-choker-set-1.svg",
    bgColor: "from-[#FDFBF7] via-[#F9F3EA] to-[#F5EAD9]",
    accentColor: "border-antique-gold/40 text-antique-gold",
  },
  {
    id: "anti-tarnish",
    badge: "18K Gold-Tone Daily Luxe",
    title: "Everyday Anti-Tarnish Sparkle",
    subtitle: "Waterproof, Sweatproof & Irresistibly Chic",
    desc: "Crafted for modern workdays and effortless styling. High-durability gold-tone plating that resists dulling, water, and perfume splashes.",
    tags: ["Sweatproof & Waterproof", "Under ₹1,499", "Daily Wear Certified"],
    primaryBtnText: "Shop Daily Wear",
    primaryBtnHref: "/collections/daily-wear",
    secondaryBtnText: "View Hoops & Rings",
    secondaryBtnHref: "/collections/earrings",
    image: "/products/classic-gold-tone-daily-hoops-1.svg",
    bgColor: "from-[#FFFDF9] via-[#FAF3ED] to-[#F6EBE5]",
    accentColor: "border-gold/40 text-deep-gold",
  },
  {
    id: "ad-solitaire",
    badge: "High-Grade American Diamond",
    title: "Scintillating AD Solitaires",
    subtitle: "Diamond-Like Brilliance, Zero Compromise",
    desc: "Precision-cut American diamond stones with immaculate refraction. Set in delicate silver-tone and rose gold-tone prongs for modern cocktail glamour.",
    tags: ["Flawless Optical Facets", "Cocktail Ready", "Silver & Rose Gold-Tone"],
    primaryBtnText: "Explore Solitaires",
    primaryBtnHref: "/collections/rings",
    secondaryBtnText: "View Tennis Cuffs",
    secondaryBtnHref: "/collections/bangles-bracelets",
    image: "/products/ad-solitaire-statement-ring-1.svg",
    bgColor: "from-[#FBFBFC] via-[#F4F4F6] to-[#ECECEE]",
    accentColor: "border-espresso/30 text-espresso",
  },
  {
    id: "signature-jhumkas",
    badge: "Iconic Heritage Drops",
    title: "Festive Jhumkas & Chandbalis",
    subtitle: "Inspired by Punjabi Tradition, Made for Today",
    desc: "Echoing the iconic gold jhumka in our official Phabulous lockup. Lightweight, comfortable earrings that sway gracefully with every celebration.",
    tags: ["Signature Lockup Icon", "Lightweight Comfort", "Express Delivery"],
    primaryBtnText: "Shop Jhumkas & Drops",
    primaryBtnHref: "/collections/earrings",
    secondaryBtnText: "View Festive Collection",
    secondaryBtnHref: "/collections/festive",
    image: "/products/chandbali-festive-jhumkas-1.svg",
    bgColor: "from-[#FFFDF9] via-[#FAF4EE] to-[#F3E7DC]",
    accentColor: "border-antique-gold/40 text-antique-gold",
  },
];

export function RubansHeroBanner() {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const totalSlides = RUBANS_HERO_SLIDES.length;

  const nextSlide = React.useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = React.useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Autoplay timer
  React.useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  const slide = RUBANS_HERO_SLIDES[currentSlide];

  return (
    <section
      aria-label="Editorial Jewellery Carousel"
      className="relative w-full overflow-hidden border-b border-[#E7DCC6]/60 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className={cn(
          "w-full transition-all duration-700 ease-in-out bg-gradient-to-r min-h-[460px] md:min-h-[520px] lg:min-h-[580px] flex items-center",
          slide.bgColor
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12 w-full">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="md:col-span-7 space-y-4 md:space-y-6 text-left z-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#E7DCC6] backdrop-blur-sm shadow-subtle">
                <Sparkles className="w-3.5 h-3.5 text-antique-gold animate-pulse" />
                <span className="text-xs font-sans font-semibold tracking-wider text-brown-text uppercase">
                  {slide.badge}
                </span>
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-2">
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-espresso leading-[1.1] font-normal">
                  {slide.title}
                </h1>
                <p className="font-serif italic text-lg sm:text-xl text-antique-gold font-medium">
                  {slide.subtitle}
                </p>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-brown-text/90 font-sans max-w-xl leading-relaxed">
                {slide.desc}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-1">
                {slide.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center text-xs font-sans text-espresso/80 bg-white/60 px-2.5 py-1 rounded-md border border-[#E7DCC6]/60 shadow-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                <Link
                  href={slide.primaryBtnHref}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-antique-gold text-white font-sans font-medium text-sm hover:bg-deep-gold shadow-md hover:shadow-lg transition-all duration-200 gap-2 group"
                >
                  <span>{slide.primaryBtnText}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
                <Link
                  href={slide.secondaryBtnHref}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white/90 border border-gold text-espresso font-sans font-medium text-sm hover:bg-soft-cream hover:border-antique-gold shadow-sm transition-all duration-200"
                >
                  {slide.secondaryBtnText}
                </Link>
              </div>
            </div>

            {/* Right Visual Column */}
            <div className="md:col-span-5 flex justify-center items-center relative">
              {/* Decorative Glow */}
              <div className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-blush/30 blur-2xl -z-0 pointer-events-none" />

              {/* Visual Card */}
              <div className="relative w-56 h-72 sm:w-68 sm:h-88 md:w-80 md:h-[400px] rounded-2xl p-4 bg-white/85 backdrop-blur-md border border-[#E7DCC6] shadow-card flex flex-col items-center justify-center group overflow-hidden transition-transform duration-500 hover:scale-[1.02]">
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-contain p-4 drop-shadow-md transition-transform duration-500 group-hover:scale-105"
                    priority
                  />
                </div>

                {/* Floating Micro Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm border border-[#E7DCC6] rounded-xl p-2.5 shadow-sm text-center">
                  <span className="text-[11px] font-sans font-semibold text-espresso flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-antique-gold" />
                    Handpicked Artificial Jewellery • Certified Quality
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Prev / Next Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 border border-[#E7DCC6] text-espresso shadow-md flex items-center justify-center hover:bg-white hover:text-antique-gold transition-colors focus:outline-none focus:ring-2 focus:ring-gold z-20"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 border border-[#E7DCC6] text-espresso shadow-md flex items-center justify-center hover:bg-white hover:text-antique-gold transition-colors focus:outline-none focus:ring-2 focus:ring-gold z-20"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        {RUBANS_HERO_SLIDES.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setCurrentSlide(idx)}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              idx === currentSlide
                ? "w-8 bg-antique-gold"
                : "w-2 bg-espresso/30 hover:bg-espresso/50"
            )}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
