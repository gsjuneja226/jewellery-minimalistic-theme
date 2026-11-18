import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export function ShopByCategory() {
  const categories = [
    {
      title: "Rings",
      slug: "rings",
      subtitle: "Solitaire AD & Cocktail Bands",
      image: "/images/categories/rings.jpg",
    },
    {
      title: "Necklaces",
      slug: "necklaces",
      subtitle: "Chains, Chokers & Layered Drops",
      image: "/images/categories/kundan-choker.jpg",
    },
    {
      title: "Earrings",
      slug: "earrings",
      subtitle: "Jhumkas, Chandbalis & Studs",
      image: "/images/categories/earrings.jpg",
    },
    {
      title: "Pendants",
      slug: "pendants",
      subtitle: "Gemstone Drops & Lockets",
      image: "/images/categories/pendants.jpg",
    },
    {
      title: "Bangles & Bracelets",
      slug: "bangles-bracelets",
      subtitle: "Kada Cuffs & Tennis Chains",
      image: "/images/categories/bangles.jpg",
    },
  ];

  return (
    <section className="hidden md:block py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center space-y-2 mb-10">
        <span className="text-xs font-sans tracking-widest text-antique-gold uppercase font-semibold">
          Curated Essentials
        </span>
        <h2 className="font-serif text-3xl md:text-4xl text-espresso heading-wash">
          Shop by Category
        </h2>
        <p className="text-sm text-brown-text/80 max-w-lg mx-auto font-sans">
          Discover handpicked artificial jewellery tailored for every style,
          from traditional celebrations to modern everyday luxury.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
        {categories.map((cat, idx) => (
          <Link
            key={cat.slug}
            href={`/collections/${cat.slug}`}
            className="group relative flex flex-col rounded-[14px] overflow-hidden border border-[#D6C2A3] bg-[#FCFAF5] shadow-subtle hover:border-gold hover:shadow-card transition-all duration-300"
          >
            {/* 4:5 image container */}
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#EFE7DC]">
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                sizes="(max-width: 768px) 50vw, 20vw"
                className="object-cover transition-transform duration-500 group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              <div className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/95 text-espresso shadow-xs backdrop-blur-xs opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                <ArrowUpRight className="h-4 w-4 text-antique-gold" />
              </div>
            </div>

            {/* Title & subtitle */}
            <div className="p-3 text-center bg-[#FCFAF5] flex flex-col justify-center">
              <h3 className="font-serif text-lg font-medium text-espresso group-hover:text-antique-gold transition-colors">
                {cat.title}
              </h3>
              <p className="text-[11px] text-brown-text/70 line-clamp-1 font-sans">
                {cat.subtitle}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
