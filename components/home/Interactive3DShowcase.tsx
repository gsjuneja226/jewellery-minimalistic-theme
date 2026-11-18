"use client";

import * as React from "react";
import { Sparkles, Eye, Rotate3d, ShieldCheck } from "lucide-react";
import { JewelleryBoxHero } from "@/components/hero/JewelleryBoxHero";

export function Interactive3DShowcase() {
  return (
    <section
      aria-label="3D Interactive Jewellery Box Showcase"
      className="py-16 md:py-20 px-4 md:px-8 bg-gradient-to-b from-[#F5EFE6] via-[#EFE5D7] to-[#F5EFE6] relative overflow-hidden border-y border-[#D6C2A3]/80"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-light-blush border border-blush/80 text-espresso text-xs font-sans font-semibold tracking-wider uppercase shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-antique-gold animate-pulse" />
            <span>Interactive 3D Experience</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-espresso heading-wash">
            Open The Phabulous Jewellery Box
          </h2>

          <p className="text-sm sm:text-base text-brown-text/90 max-w-2xl mx-auto font-sans leading-relaxed">
            Step into our virtual luxury atelier. Inspect handpicked gold-tone
            rings, pearl-style necklaces, and celebratory jhumkas in real-time
            3D. Designed with authentic flair and zero misleading claims.
          </p>

          {/* Quick instructions strip */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-2 text-xs font-sans text-brown-text/80">
            <span className="flex items-center gap-1.5">
              <Rotate3d className="w-4 h-4 text-antique-gold" /> Rotate & Inspect in 3D
            </span>
            <span className="text-gold">•</span>
            <span className="flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-antique-gold" /> Studio Spotlighting
            </span>
            <span className="text-gold">•</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-antique-gold" /> 100% Skin Safe Quality
            </span>
          </div>
        </div>

        {/* 3D Box Container with Elegant Luxury Border */}
        <div className="relative rounded-2xl md:rounded-3xl border border-[#D6C2A3] bg-[#FAF6EF]/95 backdrop-blur-sm shadow-card overflow-hidden">
          <JewelleryBoxHero isSection={true} />
        </div>
      </div>
    </section>
  );
}
