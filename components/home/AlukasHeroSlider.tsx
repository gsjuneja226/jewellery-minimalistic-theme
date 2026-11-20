"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  {
    id: 1,
    title: "Handcrafted Luxury\nArtificial Jewellery",
    subtitle: "Bespoke Kundan, Polki & American Diamond statement chokers from our Mohali studio",
    buttonText: "Explore Bridal Sets",
    buttonLink: "/collections/jewellery-sets",
    image: "/hero/hero-slide-luxury.jpg",
  },
  {
    id: 2,
    title: "Royal Bridal &\nHeritage Kundan Sets",
    subtitle: "Opulent simulated pearl drops, meenakari detailing & durable anti-tarnish gold plating",
    buttonText: "Shop New Arrivals",
    buttonLink: "/collections/new-arrivals",
    image: "/hero/hero-slide-bridal.jpg",
  },
  {
    id: 3,
    title: "Everyday Glamour &\nAnti-Tarnish Solitaires",
    subtitle: "Featherlight earrings, rings, and bangles designed for effortless daily elegance",
    buttonText: "Discover Collection",
    buttonLink: "/collections",
    image: "/hero/hero-slide-editorial.jpg",
  },
];

export function AlukasHeroSlider() {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[currentSlide];

  return (
    <section className="relative w-full bg-[#1A1A1A] overflow-hidden">
      <div className="relative min-h-[380px] sm:min-h-[480px] md:min-h-[600px] lg:min-h-[660px] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={slide.image}
            alt="Handcrafted Artificial Jewellery Collection"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center transition-all duration-700 ease-in-out"
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent md:from-black/75 md:via-black/35 md:to-transparent" />
        </div>

        {/* Content Box */}
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16 w-full py-10 sm:py-14 md:py-16">
          <div className="max-w-xl space-y-3 sm:space-y-4 md:space-y-6 animate-in fade-in-50 duration-500 text-white">
            <span className="inline-block text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase text-[#F3D98A]">
              NEW SEASON • MOHALI STUDIO
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-[52px] font-serif font-normal leading-[1.18] sm:leading-[1.14] whitespace-pre-line tracking-tight text-white drop-shadow-sm">
              {slide.title}
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-white/90 font-sans font-normal leading-relaxed max-w-md line-clamp-2 sm:line-clamp-none">
              {slide.subtitle}
            </p>
            <div className="pt-1 sm:pt-2">
              <Link
                href={slide.buttonLink}
                className="inline-block py-2.5 sm:py-3 px-6 sm:px-8 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white border border-white hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-xs"
              >
                {slide.buttonText}
              </Link>
            </div>
          </div>
        </div>

        {/* Left & Right Arrow Buttons (Hidden on small mobile to avoid blocking tap targets) */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="hidden sm:flex absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 w-10 md:w-11 h-10 md:h-11 rounded-full items-center justify-center text-white bg-black/30 hover:bg-white hover:text-black transition-colors"
        >
          <ChevronLeft className="w-5 h-5 stroke-[1.8]" />
        </button>
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next Slide"
          className="hidden sm:flex absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 w-10 md:w-11 h-10 md:h-11 rounded-full items-center justify-center text-white bg-black/30 hover:bg-white hover:text-black transition-colors"
        >
          <ChevronRight className="w-5 h-5 stroke-[1.8]" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentSlide === idx ? "w-6 sm:w-8 bg-white" : "w-1.5 sm:w-2 bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
