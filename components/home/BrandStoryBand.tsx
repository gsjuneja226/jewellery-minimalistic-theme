import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { BrandDivider } from "@/components/layout/BrandDivider";
import { Sparkles, Heart } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function BrandStoryBand() {
  return (
    <section className="relative py-8 sm:py-14 md:py-20 px-3 sm:px-6 md:px-8 overflow-hidden bg-[#F5ECE1] border-y border-[#D6C2A3]">
      {/* Background Soft Watercolour Wash Blobs */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-blush/20 filter blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center">
        {/* Left Column: Photo of Artisan & Workshop (hidden on mobile to keep phone page compact) */}
        <div className="hidden md:flex md:col-span-5 justify-center">
          <div className="relative w-full max-w-md aspect-[4/5] rounded-2xl overflow-hidden border-2 border-[#D6C2A3] shadow-card bg-[#FCFAF5]">
            <Image
              src="/images/story/artisan.jpg"
              alt="Handcrafting jewellery at Mitthat's studio"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white text-center">
              <span className="text-xs font-serif italic text-[#F3E3B5] tracking-widest block">
                Atelier Mitthat • 2026
              </span>
              <span className="text-sm font-sans font-medium">
                Every Stone Hand-Inspected & Setting Secured
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Narrative Copy */}
        <div className="md:col-span-7 space-y-4 sm:space-y-6 text-center md:text-left">
          {/* Gurmukhi Script Accent */}
          <div className="space-y-0.5 sm:space-y-1">
            <span className="font-gurmukhi text-base sm:text-lg md:text-xl text-antique-gold font-medium tracking-wide">
              ਮਿੱਠਤ ਵੱਲੋਂ • By Mitthat
            </span>
            <p className="font-serif italic text-xs sm:text-sm text-brown-text/80 tracking-widest">
              A Legacy of Warmth, Sweetness & Handpicked Craft
            </p>
          </div>

          {/* Heading */}
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-espresso font-normal tracking-tight leading-tight">
            Where Timeless Heritage Meets Playful Luxury
          </h2>

          {/* Narrative Copy */}
          <div className="space-y-3 text-sm sm:text-base md:text-lg text-brown-text font-serif leading-relaxed">
            <p>
              The name <em>Phabulous</em> is fun and playful — but behind every single piece lies uncompromising devotion to elegance. Inspired by the Punjabi spirit of <em>Mitthat</em> (warmth, sweetness, and genuine hospitality), our studio handpicks fashion jewellery that makes every woman feel celebrated.
            </p>
            <p className="hidden sm:block text-xs sm:text-sm md:text-base font-sans text-brown-text/85">
              Every earring, choker, and cuff is carefully tested for skin-kind anti-tarnish comfort, intricate stone setting, and lasting lustre.
            </p>
          </div>

          {/* Brand Flower Ornament Divider */}
          <BrandDivider withFlower={true} className="my-3 sm:my-6 max-w-md mx-auto md:mx-0" />

          {/* Action Button */}
          <div>
            <Link href="/pages/about">
              <Button variant="primary" size="default">
                Read Our Story
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
