"use client";

import * as React from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const REVIEWS = [
  {
    id: 1,
    title: "Stunning Kundan Bridal Choker",
    content:
      "Wore this for my wedding reception. Everyone genuinely thought it was pure polki heirloom gold! The finish is remarkably high-end and didn't irritate my skin even after 8 hours of wear.",
    author: "Simran Kaur, Punjab",
    rating: 5,
  },
  {
    id: 2,
    title: "Best Luxury Artificial Jewellery",
    content:
      "Ordered the reception jewellery set online. The craftsmanship on the American Diamond necklace and matching chandbalis is breathtaking. Truly luxury boutique quality.",
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
  const [mobileIndex, setMobileIndex] = React.useState(0);

  const prevReview = () => {
    setMobileIndex((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setMobileIndex((prev) => (prev === REVIEWS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="w-full bg-[#F5F1ED] py-7 sm:py-9 md:py-12 border-t border-[#EAE3DA]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative">
        <div className="text-center mb-5 sm:mb-6 md:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif text-[#222222] font-normal">
            Customer Reviews
          </h2>
          <p className="text-xs text-[#777777] font-sans mt-1">
            Loved by 20,000+ jewellery connoisseurs across India
          </p>
        </div>

        {/* Mobile View: Compact Single Card with Smooth Controls (Takes only ~190px vs 900px) */}
        <div className="block md:hidden">
          <div className="bg-white p-4 sm:p-5 rounded-none shadow-subtle border border-[#EEEEEE] relative">
            <div className="flex items-start justify-between gap-3 mb-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#222222] text-white flex items-center justify-center shrink-0">
                  <Quote className="w-3.5 h-3.5 fill-white rotate-180" />
                </div>
                <h4 className="text-xs sm:text-sm font-semibold text-[#222222] line-clamp-1">
                  {REVIEWS[mobileIndex].title}
                </h4>
              </div>
              <div className="flex items-center space-x-0.5 shrink-0">
                {[...Array(REVIEWS[mobileIndex].rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3 h-3 fill-[#FF6B6B] text-[#FF6B6B]"
                  />
                ))}
              </div>
            </div>

            <p className="text-xs text-[#555555] font-sans leading-relaxed mb-3 line-clamp-3">
              &ldquo;{REVIEWS[mobileIndex].content}&rdquo;
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-[#F5F5F5] text-[11px] text-[#222222] font-medium">
              <span>{REVIEWS[mobileIndex].author}</span>
              <div className="flex items-center gap-1.5 text-[#888888]">
                <button
                  type="button"
                  onClick={prevReview}
                  aria-label="Previous review"
                  className="w-6 h-6 rounded-full border border-[#DDD] flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <span className="text-[10px] font-sans">
                  {mobileIndex + 1}/{REVIEWS.length}
                </span>
                <button
                  type="button"
                  onClick={nextReview}
                  aria-label="Next review"
                  className="w-6 h-6 rounded-full border border-[#DDD] flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center space-x-1.5 mt-4">
            {REVIEWS.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setMobileIndex(idx)}
                aria-label={`Go to review ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  mobileIndex === idx ? "w-5 bg-black" : "w-1.5 bg-[#CCCCCC]"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Desktop View: 3-Column Luxury Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-6 lg:p-8 flex flex-col justify-between shadow-subtle text-left border border-[#EEEEEE]"
            >
              <div>
                <div className="w-9 h-9 rounded-full bg-[#222222] text-white flex items-center justify-center mb-4">
                  <Quote className="w-4 h-4 fill-white rotate-180" />
                </div>

                <h4 className="text-sm lg:text-base font-semibold text-[#222222] mb-2">
                  {rev.title}
                </h4>

                <p className="text-xs lg:text-sm text-[#666666] leading-relaxed mb-4 font-sans">
                  &ldquo;{rev.content}&rdquo;
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#F5F5F5]">
                <span className="text-xs font-medium text-[#222222]">
                  {rev.author}
                </span>
                <div className="flex items-center space-x-1">
                  {[...Array(rev.rating)].map((_, i) => (
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
      </div>
    </section>
  );
}
