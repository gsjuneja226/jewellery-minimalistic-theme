"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const SLIDES = [
  {
    id: 1,
    link: "/collections",
    image: "/hero/user-hero-1.png",
    alt: "Holiday Season Sale - Buy 1 Get 1 Free - Code: GIFT",
  },
  {
    id: 2,
    link: "/collections/new-arrivals",
    image: "/hero/user-hero-2.png",
    alt: "Spring Festival Sale - Get 30% Off Your First Order - Code: BLOOM30",
  },
  {
    id: 3,
    link: "/collections/jewellery-sets",
    image: "/hero/hero-slide-luxury.jpg",
    alt: "Handcrafted Luxury Artificial Jewellery & Bridal Sets",
  },
  {
    id: 4,
    link: "/collections/necklaces",
    image: "/hero/hero-slide-bridal.jpg",
    alt: "Royal Bridal Kundan Chokers & Necklaces",
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
      {/* Full Tap/Click Link to Connected Collection - Enlarged Aspect Ratio */}
      <Link
        href={slide.link}
        onClick={handleLinkClick}
        className="block relative w-full aspect-[2.2/1] sm:aspect-[2.7/1] md:aspect-[3.22/1] min-h-[180px] sm:min-h-[260px] md:min-h-[360px] lg:min-h-[420px] max-h-[580px] cursor-pointer group"
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
            className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 focus:outline-none ${
              currentSlide === idx
                ? "w-6 sm:w-8 bg-white shadow-sm"
                : "w-1.5 sm:w-2 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
