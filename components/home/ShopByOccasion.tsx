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
      image: "/products/kundan-jadau-choker-set-1.svg",
    },
    {
      title: "Festive",
      slug: "festive",
      tagline: "Diwali, Karwa Chauth & Lohri Radiance",
      desc: "Lustrous antique gold-tone finishes with vibrant meenakari and gemstone hues.",
      image: "/products/chandbali-festive-jhumkas-1.svg",
    },
    {
      title: "Daily Wear",
      slug: "daily-wear",
      tagline: "Effortless Studio & Workday Chic",
      desc: "Anti-tarnish hoops, solitaire AD bands and featherlight chains you'll never take off.",
      image: "/products/classic-gold-tone-daily-hoops-1.svg",
    },
    {
      title: "Gifting",
      slug: "gifting",
      tagline: "Tokens of Love in Velvet Keepsake Boxes",
      desc: "Curated tennis bracelets, romantic pendants and thoughtful personalized charms.",
      image: "/products/rose-gold-tennis-bracelet-1.svg",
    },
  ];

  return (
    <section className="py-16 bg-soft-cream/50 border-t border-[#F1E8D8]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center space-y-2 mb-12">
          <span className="text-xs font-sans tracking-widest text-antique-gold uppercase font-semibold">
            Every Moment Celebrated
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-espresso heading-wash">
            Shop by Occasion
          </h2>
          <p className="text-sm text-brown-text/80 max-w-lg mx-auto font-sans">
            Whether walking down the aisle, dancing at a sangeet, or adding sparkle
            to your morning coffee, we have your perfect pairing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {occasions.map((occ) => (
            <Link
              key={occ.slug}
              href={`/collections/${occ.slug}`}
              className="group relative flex flex-col rounded-[14px] overflow-hidden border border-[#E7DCC6] bg-white shadow-subtle hover:border-gold hover:shadow-card transition-all duration-300"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-warm-white">
                <Image
                  src={occ.image}
                  alt={occ.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[11px] font-sans tracking-wider uppercase text-gold font-medium">
                    {occ.tagline}
                  </span>
                  <h3 className="font-serif text-2xl font-normal text-white mt-0.5">
                    {occ.title}
                  </h3>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3 bg-white">
                <p className="text-xs text-brown-text/80 leading-relaxed font-sans">
                  {occ.desc}
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-antique-gold group-hover:text-deep-gold">
                  Explore {occ.title} Collection <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
