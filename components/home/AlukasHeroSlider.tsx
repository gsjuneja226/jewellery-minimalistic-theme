"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HERO_SLIDES = [
  {
    id: 1,
    image: "/hero/banner-demi-fine.svg",
    alt: "Everyday Elegance Redefined - Demi Fine Artificial Jewellery",
    buttonText: "DEMI FINE",
    buttonLink: "/collections/bangles-bracelets",
  },
  {
    id: 2,
    image: "/hero/banner-bridal-kundan.svg",
    alt: "Royal Heritage Bridal Kundan Sets",
    buttonText: "BRIDAL KUNDAN",
    buttonLink: "/collections/jewellery-sets",
  },
  {
    id: 3,
    image: "/hero/banner-solitaires.svg",
    alt: "Timeless Brilliance Solitaires & American Diamond Rings",
    buttonText: "SOLITAIRES & AD",
    buttonLink: "/collections/rings",
  },
];

export function AlukasHeroSlider() {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [touchStart, setTouchStart] = React.useState<number | null>(null);
  const [touchEnd, setTouchEnd] = React.useState<number | null>(null);

  const minSwipeDistance = 45;

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section className="w-full bg-white pt-3 pb-6 md:pt-4 md:pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Banner Frame with exact dimensions matching reference photo */}
        <div
          className="relative w-full aspect-[16/9] sm:aspect-[2.1/1] md:aspect-[2.2/1] rounded-lg sm:rounded-xl overflow-hidden shadow-2xs select-none group bg-[#280B12]"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Banner Graphic with text rendered INSIDE the image (no HTML text overlay) */}
          <Link href={slide.buttonLink} className="relative block w-full h-full">
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1150px"
              className="object-cover object-center transition-all duration-700 ease-in-out"
            />
          </Link>

          {/* Navigation Chevron Arrows */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="flex absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 sm:w-10 h-8 sm:h-10 rounded-full items-center justify-center text-white bg-black/40 hover:bg-white hover:text-black border border-white/20 hover:border-white transition-colors"
          >
            <ChevronLeft className="w-4 sm:w-5 h-4 sm:h-5 stroke-[2]" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next Slide"
            className="flex absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 sm:w-10 h-8 sm:h-10 rounded-full items-center justify-center text-white bg-black/40 hover:bg-white hover:text-black border border-white/20 hover:border-white transition-colors"
          >
            <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5 stroke-[2]" />
          </button>

          {/* Slide Indicator Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 bg-black/30 px-2.5 py-1 rounded-full backdrop-blur-xs">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentSlide === idx ? "w-5 bg-white" : "w-1.5 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Clean Boxed Button below the image (Exactly as shown in reference photo) */}
        <div className="mt-3.5 sm:mt-4 flex justify-center">
          <Link
            href={slide.buttonLink}
            className="px-8 sm:px-10 py-2.5 bg-white border border-black text-xs font-sans font-medium tracking-[0.25em] uppercase text-black hover:bg-black hover:text-white transition-all duration-300 shadow-2xs"
          >
            {slide.buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
}
