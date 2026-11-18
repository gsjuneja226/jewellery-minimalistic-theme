"use client";

import * as React from "react";
import { JewelleryBoxHero } from "@/components/hero/JewelleryBoxHero";

/**
 * 3D Jewellery Box component directly below hero
 * Heading removed per user request: "remove heading from that component"
 * Sized compactly: "that jeweleery box seem too big"
 */
export function Interactive3DShowcase() {
  return (
    <section
      aria-label="Interactive 3D Jewellery Box"
      className="py-4 sm:py-6 px-3 sm:px-6 md:px-8 bg-gradient-to-b from-[#F7EFE3] via-[#EFE5D7] to-[#F7EFE3] relative overflow-hidden border-b border-[#D6C2A3]/80"
    >
      <div className="max-w-5xl mx-auto">
        {/* Compact 3D Box Container */}
        <div className="relative rounded-xl md:rounded-2xl border border-[#D6C2A3] bg-[#FAF6EF]/95 backdrop-blur-sm shadow-subtle overflow-hidden">
          <JewelleryBoxHero isSection={true} />
        </div>
      </div>
    </section>
  );
}
