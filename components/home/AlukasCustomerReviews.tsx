"use client";

import * as React from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const REVIEWS = [
  {
    id: 1,
    title: "Stunning Kundan Bridal Choker",
    content:
      "Wore this for my cousin's wedding in Mohali. Everyone genuinely thought it was pure polki heirloom gold! The finish is remarkably high-end and didn't irritate my skin even after 8 hours of wear.",
    author: "Simran Kaur, Mohali",
    rating: 5,
  },
  {
    id: 2,
    title: "Best Artificial Jewellery in Tricity",
    content:
      "Visited their Mohali boutique to pick my reception jewellery set. The craftsmanship on the American Diamond necklace and matching chandbalis is breathtaking. Truly luxury quality.",
    author: "Harpreet Gill, Chandigarh",
    rating: 5,
  },
  {
    id: 3,
    title: "Anti-Tarnish Everyday Hoops",
    content:
      "I wear their daily gold-tone hoops and bangles every day to work. Featherlight, hypoallergenic, and hasn't lost its lustrous warm shine. Outstanding craftsmanship from the Mitthat team!",
    author: "Meera Sharma, Delhi",
    rating: 5,
  },
];

export function AlukasCustomerReviews() {
  const [currentPage, setCurrentPage] = React.useState(0);

  return (
    <section className="w-full bg-[#F5F1ED] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-[#222222] font-normal text-center mb-12">
          Customer Reviews
        </h2>

        {/* Carousel Container */}
        <div className="relative group">
          {/* Arrow buttons */}
          <button
            type="button"
            onClick={() => setCurrentPage((prev) => (prev === 0 ? 1 : 0))}
            aria-label="Previous review"
            className="hidden lg:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-transparent text-[#666666] hover:text-black items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-6 h-6 stroke-[1.5]" />
          </button>
          <button
            type="button"
            onClick={() => setCurrentPage((prev) => (prev === 1 ? 0 : 1))}
            aria-label="Next review"
            className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-transparent text-[#666666] hover:text-black items-center justify-center transition-colors"
          >
            <ChevronRight className="w-6 h-6 stroke-[1.5]" />
          </button>

          {/* Review Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="bg-white p-8 md:p-10 flex flex-col justify-between shadow-subtle text-left border border-[#EEEEEE]"
              >
                <div>
                  {/* Black Circular Quote Icon */}
                  <div className="w-10 h-10 rounded-full bg-[#222222] text-white flex items-center justify-center mb-6">
                    <Quote className="w-5 h-5 fill-white rotate-180" />
                  </div>

                  {/* Review Title */}
                  <h4 className="text-base font-semibold text-[#222222] mb-3">
                    {rev.title}
                  </h4>

                  {/* Review Content */}
                  <p className="text-xs md:text-sm text-[#666666] leading-relaxed mb-6 font-sans">
                    &ldquo;{rev.content}&rdquo;
                  </p>
                </div>

                {/* Author and Rating Stars */}
                <div className="flex items-center justify-between pt-4 border-t border-[#F5F5F5]">
                  <span className="text-xs md:text-sm font-medium text-[#222222]">
                    {rev.author}
                  </span>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 fill-[#FF6B6B] text-[#FF6B6B]"
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center space-x-2 mt-10">
            <span className="w-2.5 h-2.5 rounded-full bg-black" />
            <span className="w-2 h-2 rounded-full bg-[#CCCCCC]" />
          </div>
        </div>
      </div>
    </section>
  );
}
