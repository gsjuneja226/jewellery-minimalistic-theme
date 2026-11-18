"use client";

import * as React from "react";
import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import { PRODUCTS_DATA } from "@/lib/data/mockData";
import { Button } from "@/components/ui/Button";

export function BestsellersGrid() {
  const bestsellers = PRODUCTS_DATA.filter((p) =>
    p.collectionSlugs.includes("bestsellers")
  ).slice(0, 8);

  return (
    <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center space-y-2 mb-10">
        <span className="text-xs font-sans tracking-widest text-antique-gold uppercase font-semibold">
          Customer Favourites
        </span>
        <h2 className="font-serif text-3xl md:text-4xl text-espresso heading-wash">
          Most Loved & Bestselling
        </h2>
        <p className="text-sm text-brown-text/80 max-w-md mx-auto font-sans">
          Proven showstoppers designed to turn heads, celebrated by over 20,000+
          delighted patrons across India.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {bestsellers.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link href="/collections/bestsellers">
          <Button variant="primary" size="lg">
            View All Bestsellers
          </Button>
        </Link>
      </div>
    </section>
  );
}
