"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const SLIDES = [
  {
    id: 1,
    link: "/collections/jewellery-sets",
    image: "/hero/hero-slide-luxury.jpg",
    alt: "Handcrafted Luxury Artificial Jewellery & Bridal Chokers",
  },
  {
    id: 2,
    link: "/collections/new-arrivals",
    image: "/hero/hero-slide-bridal.jpg",
    alt: "Royal Bridal & Heritage Kundan Sets Collection",
  },
  {
    id: 3,
    link: "/collections",
    image: "/hero/hero-slide-editorial.jpg",
    alt: "Everyday Glamour & Anti-Tarnish Solitaires Collection",
  },
  {
    id: 4,
    link: "/collections/necklaces",
    image: "/hero/hero-slide-kundan.jpg",
    alt: "Traditional Kundan & Polki Choker Necklaces",
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

    // Reset touch state after brief delay so tap navigation works smoothly
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
      className="relative w-full bg-[#1A1A1A] overflow-hidden select-none"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Full Tap/Click Link to Connected Image Collection */}
      <Link
        href={slide.link}
        onClick={handleLinkClick}
        className="block relative w-full h-[65vh] min-h-[460px] sm:h-[72vh] sm:min-h-[560px] md:h-[78vh] md:min-h-[660px] lg:h-[84vh] lg:min-h-[740px] max-h-[860px] cursor-pointer group"
        aria-label={slide.alt}
      >
        <Image
          src={slide.image}
          alt={slide.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.01]"
        />
      </Link>

      {/* Left & Right Arrow Buttons */}
      <button
        type="button"
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="flex absolute left-3 sm:left-5 md:left-7 top-1/2 -translate-y-1/2 z-20 w-9 sm:w-11 md:w-12 h-9 sm:h-11 md:h-12 rounded-full items-center justify-center text-white bg-black/40 hover:bg-white hover:text-black transition-all shadow-md focus:outline-none"
      >
        <ChevronLeft className="w-5 sm:w-6 h-5 sm:h-6 stroke-[2]" />
      </button>
      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next Slide"
        className="flex absolute right-3 sm:right-5 md:right-7 top-1/2 -translate-y-1/2 z-20 w-9 sm:w-11 md:w-12 h-9 sm:h-11 md:h-12 rounded-full items-center justify-center text-white bg-black/40 hover:bg-white hover:text-black transition-all shadow-md focus:outline-none"
      >
        <ChevronRight className="w-5 sm:w-6 h-5 sm:h-6 stroke-[2]" />
      </button>

      {/* Slide Indicators with Generous Tap Targets */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
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
            className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 focus:outline-none ${
              currentSlide === idx
                ? "w-7 sm:w-9 bg-white shadow-sm"
                : "w-2 sm:w-2.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
