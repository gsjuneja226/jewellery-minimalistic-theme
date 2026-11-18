import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function ShopByOccasion() {
  const occasions = [
    {
      title: "Wedding",
      slug: "wedding",
      tagline: "Bridal Opulence & Heritage Kundan",
      desc: "Choker sets, heavy jhumkas & mathapattis designed for vows & royal celebrations.",
      image: "/images/occasions/wedding.jpg",
    },
    {
      title: "Festive",
      slug: "festive",
      tagline: "Diwali, Karwa Chauth & Lohri Radiance",
      desc: "Lustrous antique gold-tone finishes with vibrant meenakari and gemstone hues.",
      image: "/images/occasions/festive.jpg",
    },
    {
      title: "Daily Wear",
      slug: "daily-wear",
      tagline: "Effortless Studio & Workday Chic",
      desc: "Anti-tarnish hoops, solitaire AD bands and featherlight chains you'll never take off.",
      image: "/images/occasions/daily-wear.jpg",
    },
    {
      title: "Gifting",
      slug: "gifting",
      tagline: "Tokens of Love in Velvet Keepsake Boxes",
      desc: "Curated tennis bracelets, romantic pendants and thoughtful personalized charms.",
      image: "/images/occasions/gifting.jpg",
    },
  ];

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-[#EFE7DC] border-t border-[#D6C2A3]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 md:px-8">
        <div className="text-center space-y-1.5 sm:space-y-2 mb-6 sm:mb-10">
          <span className="text-[10px] sm:text-xs font-sans tracking-widest text-antique-gold uppercase font-semibold">
            Every Moment Celebrated
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-espresso heading-wash">
            Shop by Occasion
          </h2>
          <p className="text-xs sm:text-sm text-brown-text/80 max-w-lg mx-auto font-sans">
            Curated pairings for bridal vows, festive celebrations, and everyday sparkle.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {occasions.map((occ) => (
            <Link
              key={occ.slug}
              href={`/collections/${occ.slug}`}
              className="group relative flex flex-col rounded-xl sm:rounded-[14px] overflow-hidden border border-[#D6C2A3] bg-[#FCFAF5] shadow-subtle hover:border-gold hover:shadow-card transition-all duration-300"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-warm-white">
                <Image
                  src={occ.image}
                  alt={occ.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/85 via-espresso/25 to-transparent" />
                <div className="absolute bottom-2.5 sm:bottom-4 left-2.5 sm:left-4 right-2.5 sm:right-4 text-white">
                  <span className="hidden sm:block text-[11px] font-sans tracking-wider uppercase text-gold font-medium">
                    {occ.tagline}
                  </span>
                  <h3 className="font-serif text-base sm:text-2xl font-normal text-white mt-0.5">
                    {occ.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
