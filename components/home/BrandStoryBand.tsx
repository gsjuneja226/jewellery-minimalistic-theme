import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { BrandDivider } from "@/components/layout/BrandDivider";
import { Sparkles, Heart } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function BrandStoryBand() {
  return (
    <section className="relative py-20 px-4 md:px-8 overflow-hidden bg-gradient-to-b from-warm-white via-light-blush/40 to-warm-white border-y border-blush/40">
      {/* Background Soft Watercolour Wash Blobs */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-blush/25 filter blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-4xl mx-auto text-center space-y-6">
        {/* Gurmukhi Script Accent */}
        <div className="space-y-1">
          <span className="font-gurmukhi text-lg md:text-xl text-antique-gold font-medium tracking-wide">
            ਮਿੱਠਤ ਵੱਲੋਂ • By Mitthat
          </span>
          <p className="font-serif italic text-sm text-brown-text/80 tracking-widest">
            A Legacy of Warmth, Sweetness & Handpicked Craft
          </p>
        </div>

        {/* Heading */}
        <h2 className="font-serif text-3xl md:text-5xl text-espresso heading-wash leading-tight">
          Where Timeless Heritage Meets Playful Luxury
        </h2>

        {/* Narrative Copy */}
        <div className="space-y-4 text-base md:text-lg text-brown-text font-serif leading-relaxed max-w-2xl mx-auto">
          <p>
            The name <em>Phabulous</em> is fun, spirited, and playful — but behind every
            single piece lies uncompromising devotion to elegance. Inspired by the Punjabi
            spirit of <em>Mitthat</em> (warmth, sweetness, and genuine hospitality), our
            studio handpicks fashion jewellery that makes every woman feel celebrated.
          </p>
          <p className="text-sm md:text-base font-sans text-brown-text/85">
            Every earring, choker, and cuff is carefully tested for skin-kind anti-tarnish comfort,
            intricate stone setting, and lasting lustre. Because luxury should never be locked in a locker;
            it should be worn, loved, and danced in.
          </p>
        </div>

        {/* Brand Flower Ornament Divider */}
        <BrandDivider withFlower={true} className="my-6 max-w-md mx-auto" />

        {/* Action Button */}
        <div>
          <Link href="/pages/about">
            <Button variant="primary" size="lg">
              Read Our Full Story
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
