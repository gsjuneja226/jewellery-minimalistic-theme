import * as React from "react";
import Image from "next/image";
import { Rating } from "@/components/ui/Rating";
import { REVIEWS_DATA } from "@/lib/data/mockData";
import { CheckCircle2, Quote } from "lucide-react";

const REVIEW_PHOTOS = [
  "/images/reviews/review-1.jpg",
  "/images/reviews/review-2.jpg",
  "/images/reviews/review-3.jpg",
  "/images/reviews/review-4.jpg",
  "/images/reviews/review-1.jpg",
  "/images/reviews/review-2.jpg",
];

export function CustomerReviews() {
  const reviews = REVIEWS_DATA.slice(0, 6);

  return (
    <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center space-y-2 mb-12">
        <span className="text-xs font-sans tracking-widest text-antique-gold uppercase font-semibold">
          Real Smiles & Stories
        </span>
        <h2 className="font-serif text-3xl md:text-4xl text-espresso heading-wash">
          Loved by Over 20,000+ Patrons
        </h2>
        <p className="text-sm text-brown-text/80 max-w-lg mx-auto font-sans">
          Hear from women across India who celebrated their most cherished days
          with Phabulous by Mitthat.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((rev, idx) => (
          <div
            key={rev.id}
            className="flex flex-col justify-between rounded-[14px] border border-[#D6C2A3] bg-[#FCFAF5] p-6 shadow-subtle hover:border-gold hover:shadow-card transition-all duration-300"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Rating rating={rev.rating} size="sm" />
                <span className="text-[11px] text-brown-text/60 font-sans">
                  {rev.date}
                </span>
              </div>

              <h4 className="font-serif text-lg font-medium text-espresso">
                &ldquo;{rev.title}&rdquo;
              </h4>

              <p className="text-xs text-brown-text/80 leading-relaxed font-sans italic">
                {rev.comment}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-[#EAE0D0] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#D6C2A3] flex-shrink-0">
                  <Image
                    src={REVIEW_PHOTOS[idx % REVIEW_PHOTOS.length]}
                    alt={rev.authorName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-sans text-xs font-semibold text-espresso">
                    {rev.authorName}
                  </p>
                  <p className="text-[11px] text-brown-text/60 font-sans">
                    {rev.city}, India
                  </p>
                </div>
              </div>

              {rev.isVerifiedPurchase && (
                <span className="inline-flex items-center gap-1 text-[11px] font-sans text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Verified Buyer
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
