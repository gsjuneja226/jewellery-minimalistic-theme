"use client";

import * as React from "react";
import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import { PRODUCTS_DATA, type MockProduct } from "@/lib/data/mockData";
import { ArrowRight } from "lucide-react";

export function NewArrivalsSection() {
  const newArrivals = PRODUCTS_DATA.slice(0, 4);

  return (
    <section className="py-16 bg-[#EFE7DC] border-y border-[#D6C2A3]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col sm:flex-row items-baseline justify-between mb-8">
          <div>
            <span className="text-xs font-sans tracking-widest text-antique-gold uppercase font-semibold">
              Fresh Off the Bench
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-espresso heading-wash mt-1">
              New Arrivals
            </h2>
          </div>
          <Link
            href="/collections/new-arrivals"
            className="mt-2 sm:mt-0 text-sm font-sans font-medium text-antique-gold hover:text-deep-gold flex items-center gap-1.5 transition-colors"
          >
            Explore all new designs <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
