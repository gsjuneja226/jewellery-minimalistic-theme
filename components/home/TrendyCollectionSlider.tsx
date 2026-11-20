"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { PRODUCTS_DATA, type MockProduct } from "@/lib/data/mockData";

export function TrendyCollectionSlider() {
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Take the first 4 alukas products
  const products = PRODUCTS_DATA.slice(0, 4);

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = direction === "left" ? -320 : 320;
      containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full bg-white py-14 md:py-20 border-t border-[#F0F0F0]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-[#222222] font-normal mb-2">
            Trendy Collection
          </h2>
          <p className="text-xs md:text-sm text-[#777777] font-sans">
            Collect your loves with our newest arrivals.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          {/* Left Arrow */}
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Previous products"
            className="hidden md:flex absolute -left-4 lg:-left-6 top-1/3 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-[#E5E5E5] text-[#222222] items-center justify-center shadow-subtle hover:bg-black hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5 stroke-[1.5]" />
          </button>

          {/* Right Arrow */}
          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Next products"
            className="hidden md:flex absolute -right-4 lg:-right-6 top-1/3 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-[#E5E5E5] text-[#222222] items-center justify-center shadow-subtle hover:bg-black hover:text-white transition-colors"
          >
            <ChevronRight className="w-5 h-5 stroke-[1.5]" />
          </button>

          {/* Products Grid / Slider */}
          <div
            ref={containerRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8"
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center space-x-2 mt-8">
            <span className="w-2.5 h-2.5 rounded-full bg-black" />
            <span className="w-2 h-2 rounded-full bg-[#CCCCCC]" />
          </div>
        </div>
      </div>
    </section>
  );
}
