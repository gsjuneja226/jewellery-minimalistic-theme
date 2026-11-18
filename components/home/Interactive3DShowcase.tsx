"use client";

import * as React from "react";
import { Sparkles, Eye, Rotate3d, ShieldCheck } from "lucide-react";
import { JewelleryBoxHero } from "@/components/hero/JewelleryBoxHero";

export function Interactive3DShowcase() {
  return (
    <section
      aria-label="3D Interactive Jewellery Box Showcase"
      className="py-8 sm:py-12 md:py-16 px-3 sm:px-6 md:px-8 bg-gradient-to-b from-[#F5EFE6] via-[#EFE5D7] to-[#F5EFE6] relative overflow-hidden border-y border-[#D6C2A3]/80"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center space-y-2 mb-5 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-light-blush border border-blush/80 text-espresso text-[10px] sm:text-xs font-sans font-semibold tracking-wider uppercase shadow-xs">
            <Sparkles className="w-3 h-3 text-antique-gold animate-pulse" />
            <span>Interactive 3D Experience</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl text-espresso heading-wash">
            Open The Phabulous Jewellery Box
          </h2>

          <p className="text-xs sm:text-sm text-brown-text/90 max-w-xl mx-auto font-sans leading-relaxed">
            Inspect handpicked gold-tone rings, necklaces, and jhumkas in real-time 3D.
          </p>

          {/* Quick instructions strip (hidden on smallest screens to save space) */}
          <div className="hidden sm:flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-1 text-xs font-sans text-brown-text/80">
            <span className="flex items-center gap-1.5">
              <Rotate3d className="w-3.5 h-3.5 text-antique-gold" /> Rotate & Inspect in 3D
            </span>
            <span className="text-gold">•</span>
            <span className="flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-antique-gold" /> Studio Spotlighting
            </span>
            <span className="text-gold">•</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-antique-gold" /> 100% Skin Safe Quality
            </span>
          </div>
        </div>

        {/* 3D Box Container */}
        <div className="relative rounded-xl md:rounded-3xl border border-[#D6C2A3] bg-[#FAF6EF]/95 backdrop-blur-sm shadow-card overflow-hidden">
          <JewelleryBoxHero isSection={true} />
        </div>
      </div>
    </section>
  );
}
