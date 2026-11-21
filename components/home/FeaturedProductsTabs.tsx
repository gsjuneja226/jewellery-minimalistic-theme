"use client";

import * as React from "react";
import { ProductCard } from "@/components/product/ProductCard";
import { PRODUCTS_DATA, type MockProduct } from "@/lib/data/mockData";

export function FeaturedProductsTabs() {
  const [activeTab, setActiveTab] = React.useState<"new" | "featured" | "best">("best");

  const getFilteredProducts = (): MockProduct[] => {
    if (activeTab === "new") {
      return PRODUCTS_DATA.slice(0, 4);
    }
    if (activeTab === "featured") {
      return PRODUCTS_DATA.slice(2, 6);
    }
    // "best" (default from frame 14 which shows the hats/shoes or best sellers)
    return PRODUCTS_DATA.slice(4, 8);
  };

  const products = getFilteredProducts();

  return (
    <section className="w-full bg-white py-7 sm:py-9 md:py-12 border-t border-[#F0F0F0]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-9">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-[#222222] font-normal mb-3 sm:mb-4">
            Featured Products
          </h2>

          {/* Filter Tabs */}
          <div className="flex items-center justify-center space-x-6 md:space-x-10 text-sm md:text-base font-normal">
            <button
              onClick={() => setActiveTab("new")}
              className={`pb-1 transition-all ${
                activeTab === "new"
                  ? "text-[#222222] font-medium border-b-2 border-black"
                  : "text-[#777777] hover:text-black border-b-2 border-transparent"
              }`}
            >
              New Arrivals
            </button>
            <button
              onClick={() => setActiveTab("featured")}
              className={`pb-1 transition-all ${
                activeTab === "featured"
                  ? "text-[#222222] font-medium border-b-2 border-black"
                  : "text-[#777777] hover:text-black border-b-2 border-transparent"
              }`}
            >
              Featured
            </button>
            <button
              onClick={() => setActiveTab("best")}
              className={`pb-1 transition-all ${
                activeTab === "best"
                  ? "text-[#222222] font-medium border-b-2 border-black"
                  : "text-[#777777] hover:text-black border-b-2 border-transparent"
              }`}
            >
              Best Seller
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
