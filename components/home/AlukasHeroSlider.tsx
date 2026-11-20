"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const SLIDES = [
  {
    id: 1,
    tag: "SIGNATURE ATELIER 2026",
    title: "Royal Bridal Kundan\n& Emerald Chokers",
    subtitle: "Handcrafted meenakari & simulated pearl drops",
    cta: "EXPLORE BRIDAL",
    link: "/collections/jewellery-sets",
    image: "/hero/hero-slide-kundan.jpg",
    alt: "Royal Bridal Kundan & Emerald Choker Sets",
  },
  {
    id: 2,
    tag: "EVERYDAY GLAMOUR",
    title: "Modern Layered Gold\nChains & Hoops",
    subtitle: "Anti-tarnish featherlight daily luxury",
    cta: "DISCOVER NOW",
    link: "/collections/necklaces",
    image: "/hero/hero-slide-modern.jpg",
    alt: "Modern Anti-Tarnish Gold Layered Necklaces & Hoops",
  },
  {
    id: 3,
    tag: "FESTIVE REVERIE",
    title: "Heritage Jhumkas &\nAntique Bangles",
    subtitle: "Heirloom craftsmanship for cherished celebrations",
    cta: "SHOP FESTIVE",
    link: "/collections/festive",
    image: "/hero/hero-slide-festive.jpg",
    alt: "Handcrafted Festive Jhumkas & Bangles Collection",
  },
  {
    id: 4,
    tag: "NEW SEASON DROP",
    title: "Opulent Polki &\nSimulated Pearl Sets",
    subtitle: "Timeless royal craftsmanship redefined",
    cta: "VIEW ARRIVALS",
    link: "/collections/new-arrivals",
    image: "/hero/hero-slide-bridal.jpg",
    alt: "New Season Handcrafted Bridal Jewellery",
  },
];

export function AlukasHeroSlider() {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const touchStartRef = React.useRef<{ x: number; y: number } | null>(null);
  const isSwipingRef = React.useRef(false);

  const prevSlide = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setCurrentSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  const nextSlide = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setCurrentSlide((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
  };

  const onTouchStart = (e: React.TouchEvent) => {
    isSwipingRef.current = false;
    touchStartRef.current = {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    };
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const deltaX = Math.abs(e.targetTouches[0].clientX - touchStartRef.current.x);
    const deltaY = Math.abs(e.targetTouches[0].clientY - touchStartRef.current.y);
    if (deltaX > 10 || deltaY > 10) {
      isSwipingRef.current = true;
    }
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const touchEndX = e.changedTouches[0].clientX;
    const distance = touchStartRef.current.x - touchEndX;
    const minSwipeDistance = 45;

    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }

    setTimeout(() => {
      isSwipingRef.current = false;
      touchStartRef.current = null;
    }, 120);
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    if (isSwipingRef.current) {
      e.preventDefault();
    }
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[currentSlide];

  return (
    <section
      className="relative w-full bg-white overflow-hidden select-none"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Full Tap/Click Link to Connected Collection - Immersive Full-Length Proportions */}
      <Link
        href={slide.link}
        onClick={handleLinkClick}
        className="block relative w-full h-[75vh] min-h-[500px] sm:h-[80vh] sm:min-h-[580px] md:h-[85vh] md:min-h-[680px] lg:h-[90vh] lg:min-h-[760px] max-h-[920px] cursor-pointer group bg-[#111111]"
        aria-label={slide.alt}
      >
        <Image
          src={slide.image}
          alt={slide.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[72%_center] sm:object-center transition-transform duration-700 ease-out group-hover:scale-[1.01]"
        />

        {/* Minimal Luxury Text Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent md:from-black/70 md:via-black/20 md:to-transparent flex items-end sm:items-center">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-14 lg:px-16 w-full pb-14 sm:pb-0 text-left">
            <div className="max-w-md sm:max-w-lg space-y-2 sm:space-y-3.5 text-white">
              <span className="inline-block text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase text-[#F3D98A]">
                {slide.tag}
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-[52px] font-serif font-normal leading-[1.14] whitespace-pre-line tracking-tight text-white drop-shadow-sm">
                {slide.title}
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-white/85 font-sans font-normal leading-relaxed max-w-sm hidden sm:block">
                {slide.subtitle}
              </p>
              <div className="pt-1.5 sm:pt-2.5">
                <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-white border-b-2 border-white pb-0.5 group-hover:text-[#F3D98A] group-hover:border-[#F3D98A] transition-colors">
                  {slide.cta} →
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* Left & Right Arrow Navigation */}
      <button
        type="button"
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="flex absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 w-8 sm:w-10 md:w-11 h-8 sm:h-10 md:h-11 rounded-full items-center justify-center text-white bg-black/45 hover:bg-white hover:text-black transition-all shadow-md focus:outline-none"
      >
        <ChevronLeft className="w-4 sm:w-5 h-4 sm:h-5 stroke-[2]" />
      </button>
      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next Slide"
        className="flex absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 w-8 sm:w-10 md:w-11 h-8 sm:h-10 md:h-11 rounded-full items-center justify-center text-white bg-black/45 hover:bg-white hover:text-black transition-all shadow-md focus:outline-none"
      >
        <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5 stroke-[2]" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-3 sm:bottom-4 md:bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setCurrentSlide(idx);
            }}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 focus:outline-none ${currentSlide === idx
              ? "w-6 sm:w-8 bg-white shadow-sm"
              : "w-1.5 sm:w-2 bg-white/50 hover:bg-white/80"
              }`}
          />
        ))}
      </div>
    </section>
  );
}
