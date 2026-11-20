"use client";

import * as React from "react";
import Image from "next/image";
import { MapPin, Calendar, X, ZoomIn, ArrowRight } from "lucide-react";

interface ExhibitionItem {
  id: number;
  title: string;
  category: string;
  city: string;
  date: string;
  image: string;
  description: string;
  highlights: string[];
}

const EXHIBITIONS: ExhibitionItem[] = [
  {
    id: 1,
    title: "Bridal Asia Luxury Pavilion",
    category: "BRIDAL TRUNK SHOW",
    city: "New Delhi",
    date: "Autumn / Festive 2025",
    image: "/images/exhibitions/exhibit-1.jpg",
    description: "Exclusive showcase of handcrafted bridal kundan chokers, layered rani haars, and bespoke simulated gemstone suites for destination weddings.",
    highlights: ["Bespoke Kundan Chokers", "Celebrity Bridal Styling", "Hand-Strung Pearls"],
  },
  {
    id: 2,
    title: "Royal Heritage Temple Vitrine",
    category: "HERITAGE EXHIBIT",
    city: "Chandigarh",
    date: "Winter Gala 2025",
    image: "/images/exhibitions/exhibit-2.jpg",
    description: "Our antique 22K gold-plated temple bangles, openable kadas, and floral filigree cuffs presented on royal velvet display trays.",
    highlights: ["Nagas & Temple Carvings", "Openable Kada Fits", "Anti-Tarnish Plating"],
  },
  {
    id: 3,
    title: "The Haute Solitaire Lounge",
    category: "COUTURE POP-UP",
    city: "Ludhiana",
    date: "Spring Preview 2026",
    image: "/images/exhibitions/exhibit-3.jpg",
    description: "A private viewing lounge exhibiting master-cut American Diamond solitaires, halo engagement bands, and cocktail statement rings.",
    highlights: ["Hearts & Arrows AD Cuts", "Cocktail Cluster Rings", "Rhodium Platinum Finish"],
  },
  {
    id: 4,
    title: "Festive Couture Gala Showcase",
    category: "FESTIVE EXHIBITION",
    city: "Jaipur",
    date: "Diwali & Wedding Season",
    image: "/images/exhibitions/exhibit-4.jpg",
    description: "An opulent palace exhibition featuring traditional meenakari jhumkas, chandbalis, and layered festive jewellery drapes.",
    highlights: ["Royal Meenakari Enamel", "Multicolor Gemstone Drops", "Lightweight Festive Comfort"],
  },
  {
    id: 5,
    title: "Artisanal Atelier Showcase",
    category: "DESIGN EXHIBIT",
    city: "Mumbai",
    date: "Pre-Summer 2026",
    image: "/images/exhibitions/exhibit-5.jpg",
    description: "Contemporary haute couture artificial earrings, emerald drop solitaires, and sculptural accessories designed for modern celebrations.",
    highlights: ["Contemporary Silhouette", "Hypoallergenic Metals", "Prismatic Crystal Facets"],
  },
  {
    id: 6,
    title: "Master Artisan Live Studio Counter",
    category: "BOUTIQUE SHOWCASE",
    city: "Sector 70, Punjab",
    date: "Ongoing Flagship Showcase",
    image: "/images/exhibitions/exhibit-6.jpg",
    description: "Live demonstrations of intricate kundan setting, pearl restringing, and complimentary personalized bridal trousseau consultations.",
    highlights: ["Custom Trousseau Matching", "Live Artisan Sizing", "Velvet Gift Packaging"],
  },
];

export function ExhibitionsGallery() {
  const [selectedItem, setSelectedItem] = React.useState<ExhibitionItem | null>(null);

  return (
    <section className="w-full bg-[#FAF9F7] py-14 sm:py-20 border-t border-[#EEEEEE]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase text-[#BA9048] block mb-2">
            TRUNK SHOWS & EXHIBITIONS
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#222222] font-normal mb-3">
            Our Exhibition Gallery
          </h2>
          <p className="text-xs sm:text-sm text-[#666666] font-sans leading-relaxed">
            Glimpses of Phabulous by Mitthat at premier bridal expos, luxury jewellery trunk shows, and curated pop-up showcases across India.
          </p>
        </div>

        {/* Gallery Grid (2 cols on Mobile, 3 cols on Desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {EXHIBITIONS.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group cursor-pointer bg-white border border-[#E8E6E1] rounded-none overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-[#BA9048]/40 flex flex-col"
            >
              {/* Photo Container */}
              <div className="relative aspect-[4/3] w-full bg-[#FAFAFA] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* City & Category Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                  <span className="px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider bg-black/80 backdrop-blur-xs text-white">
                    {item.category}
                  </span>
                </div>

                {/* Hover overlay with zoom icon */}
                <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-md transform scale-90 group-hover:scale-100 transition-transform">
                    <ZoomIn className="w-4 h-4 stroke-[2]" />
                  </div>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-5 flex-1 flex flex-col justify-between text-left">
                <div>
                  <div className="flex items-center gap-3 text-[11px] text-[#777777] mb-2 font-sans">
                    <span className="flex items-center gap-1 text-[#BA9048] font-semibold">
                      <MapPin className="w-3.5 h-3.5" />
                      {item.city}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#999999]" />
                      {item.date}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl text-[#222222] font-normal group-hover:text-[#BA9048] transition-colors leading-snug mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#666666] line-clamp-2 leading-relaxed font-sans mb-3">
                    {item.description}
                  </p>
                </div>

                {/* Highlights tags */}
                <div className="pt-3 border-t border-[#F2F0EB] flex flex-wrap gap-1.5">
                  {item.highlights.map((hl, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-medium text-[#555555] bg-[#F7F6F3] px-2 py-0.5"
                    >
                      {hl}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox / Modal for Expanded View */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/70 text-white hover:bg-black flex items-center justify-center transition-colors focus:outline-none"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Image */}
            <div className="relative aspect-[16/10] w-full bg-[#111111]">
              <Image
                src={selectedItem.image}
                alt={selectedItem.title}
                fill
                className="object-cover object-center"
              />
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-4 text-left">
              <div className="flex items-center gap-3 text-xs text-[#777777]">
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[#BA9048] text-white">
                  {selectedItem.category}
                </span>
                <span className="flex items-center gap-1 font-semibold text-[#222222]">
                  <MapPin className="w-3.5 h-3.5 text-[#BA9048]" />
                  {selectedItem.city}
                </span>
                <span>•</span>
                <span>{selectedItem.date}</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-[#222222]">
                {selectedItem.title}
              </h3>

              <p className="text-sm text-[#555555] leading-relaxed font-sans">
                {selectedItem.description}
              </p>

              <div className="pt-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#888888] block mb-2">
                  Key Exhibition Highlights
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedItem.highlights.map((hl, i) => (
                    <span
                      key={i}
                      className="text-xs font-medium text-[#333333] bg-[#F5F4F0] px-3 py-1"
                    >
                      ✓ {hl}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
