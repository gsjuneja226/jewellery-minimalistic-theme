"use client";

import * as React from "react";
import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import { PRODUCTS_DATA } from "@/lib/data/mockData";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "all", label: "All Bestsellers" },
  { id: "kundan", label: "Kundan & Bridal" },
  { id: "ad", label: "AD Solitaires" },
  { id: "earrings", label: "Earrings & Jhumkas" },
  { id: "necklaces", label: "Chokers & Necklaces" },
  { id: "daily", label: "Anti-Tarnish Daily" },
] as const;

export function BestsellersGrid() {
  const [activeTab, setActiveTab] = React.useState<string>("all");

  const filteredProducts = React.useMemo(() => {
    const base = PRODUCTS_DATA.filter((p) =>
      p.collectionSlugs.includes("bestsellers") || p.rating >= 4.7
    );

    switch (activeTab) {
      case "kundan":
        return base.filter(
          (p) =>
            p.categorySlug === "jewellery-sets" ||
            p.title.toLowerCase().includes("kundan") ||
            p.title.toLowerCase().includes("jadau")
        );
      case "ad":
        return base.filter(
          (p) =>
            p.stoneType.toLowerCase().includes("ad") ||
            p.title.toLowerCase().includes("solitaire") ||
            p.title.toLowerCase().includes("ring")
        );
      case "earrings":
        return base.filter((p) => p.categorySlug === "earrings");
      case "necklaces":
        return base.filter(
          (p) =>
            p.categorySlug === "necklaces" ||
            p.categorySlug === "jewellery-sets"
        );
      case "daily":
        return base.filter(
          (p) =>
            p.collectionSlugs.includes("daily-wear") ||
            p.materialFinish.toLowerCase().includes("anti-tarnish") ||
            (p.variants[0]?.price && p.variants[0].price < 150000)
        );
      case "all":
      default:
        return base.slice(0, 8);
    }
  }, [activeTab]);

  return (
    <section className="py-8 sm:py-12 md:py-16 px-3 sm:px-6 md:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col items-center text-center mb-6 sm:mb-8">
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-espresso font-normal tracking-tight">
          Most Loved & Bestselling
        </h2>
        <p className="text-xs sm:text-sm text-brown-text/80 max-w-md mt-1.5 font-sans">
          Proven showstoppers designed to turn heads, celebrated by 20,000+ patrons.
        </p>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-3 flex-wrap pt-3">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-sans font-medium transition-all duration-200 border",
                activeTab === tab.id
                  ? "bg-antique-gold border-antique-gold text-white shadow-sm"
                  : "bg-[#FCFAF5] border-[#D6C2A3] text-espresso hover:bg-[#EFE7DC] hover:border-gold"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
        {filteredProducts.slice(0, 8).map((product, idx) => (
          <div key={product.id} className={idx >= 4 ? "hidden sm:block" : ""}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <div className="mt-8 sm:mt-12 text-center">
        <Link href="/collections/bestsellers">
          <Button variant="primary" size="default">
            View All Bestsellers
          </Button>
        </Link>
      </div>
    </section>
  );
}
