"use client";

import * as React from "react";
import Link from "next/link";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/Button";
import { PRODUCTS_DATA, type MockProduct } from "@/lib/data/mockData";
import { Heart, Sparkles } from "lucide-react";

export default function WishlistPage() {
  const [wishlistProducts, setWishlistProducts] = React.useState<MockProduct[]>(
    PRODUCTS_DATA.slice(0, 4)
  );

  const handleToggleWishlist = (product: MockProduct) => {
    setWishlistProducts((prev) => prev.filter((p) => p.id !== product.id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-warm-white">
      <Header isOverHero={false} />

      <main className="flex-1 max-w-7xl mx-auto px-4 md:px-8 py-8 w-full">
        <Breadcrumbs
          items={[{ label: "My Account", href: "/account" }, { label: "Saved Wishlist" }]}
          className="mb-6"
        />

        <div className="flex flex-col items-center text-center mb-8">
          <h1 className="font-serif text-3xl md:text-4xl text-espresso font-normal tracking-tight">
            My Wishlist ({wishlistProducts.length})
          </h1>
          <p className="text-xs md:text-sm text-brown-text/80 font-sans max-w-md mt-2">
            Your personal curation of cherished pieces. Ready to sparkle when you are.
          </p>
        </div>

        {wishlistProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {wishlistProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={true}
                onToggleWishlist={handleToggleWishlist}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-soft-cream/30 rounded-[14px] border border-[#E7DCC6]/60 p-8 space-y-4 max-w-md mx-auto">
            <Heart className="w-12 h-12 text-gold/40 mx-auto" />
            <p className="font-serif text-2xl text-espresso">Your wishlist is empty</p>
            <p className="text-xs text-brown-text/80 font-sans">
              Explore our collections and tap the heart icon on any design you adore.
            </p>
            <Link href="/collections">
              <Button variant="primary" size="default">
                Explore Collections
              </Button>
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
