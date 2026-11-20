"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Eye, ShoppingBag } from "lucide-react";
import type { MockProduct } from "@/lib/data/mockData";
import { cn, formatPrice } from "@/lib/utils";

export interface ProductCardProps {
  product: MockProduct;
  className?: string;
  onQuickAdd?: (product: MockProduct) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (product: MockProduct) => void;
}

export function ProductCard({
  product,
  className,
  onQuickAdd,
  isWishlisted = false,
  onToggleWishlist,
}: ProductCardProps) {
  const [wishlistActive, setWishlistActive] = React.useState(isWishlisted);

  const primaryImage = product.images[0] || "/images/categories/earrings.jpg";
  const primaryVariant = product.variants[0];

  const priceFormatted = primaryVariant
    ? formatPrice(primaryVariant.price)
    : "₹0";
  const compareAtPriceFormatted =
    primaryVariant && primaryVariant.compareAtPrice
      ? formatPrice(primaryVariant.compareAtPrice)
      : null;

  // Calculate discount percent
  const discountPercent =
    primaryVariant && primaryVariant.compareAtPrice && primaryVariant.compareAtPrice > primaryVariant.price
      ? Math.round(
          ((primaryVariant.compareAtPrice - primaryVariant.price) /
            primaryVariant.compareAtPrice) *
            100
        )
      : null;

  const isHot =
    product.slug.includes("stone-earrings") ||
    product.slug.includes("plain-hat") ||
    product.slug.includes("beanie") ||
    product.reviewsCount >= 8;

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const nextState = !wishlistActive;
    setWishlistActive(nextState);
    if (onToggleWishlist) {
      onToggleWishlist(product);
    }
  };

  const handleQuickAddClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickAdd) {
      onQuickAdd(product);
    }
  };

  return (
    <div
      className={cn(
        "group relative flex flex-col bg-white text-black transition-all duration-300",
        className
      )}
      data-testid="product-card"
    >
      {/* 1:1 Image Container */}
      <div className="relative w-full aspect-square overflow-hidden bg-[#FAFAFA] flex items-center justify-center">
        <Link href={`/products/${product.slug}`} className="relative block w-full h-full">
          <Image
            src={primaryImage}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Badges Top-Left */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
          {discountPercent ? (
            <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase text-white bg-[#FF782C]">
              {discountPercent}% OFF
            </span>
          ) : isHot ? (
            <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase text-white bg-[#F03333]">
              HOT
            </span>
          ) : null}
        </div>

        {/* Hover Action Buttons Top-Right */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-20 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
          <button
            type="button"
            onClick={handleWishlistClick}
            aria-label={wishlistActive ? "Remove from wishlist" : "Add to wishlist"}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black shadow-subtle hover:bg-black hover:text-white transition-colors"
          >
            <Heart
              className={cn(
                "h-4 w-4",
                wishlistActive ? "fill-[#F03333] text-[#F03333]" : "text-black"
              )}
            />
          </button>
          <Link
            href={`/products/${product.slug}`}
            aria-label="Quick view product"
            className="hidden sm:flex h-8 w-8 items-center justify-center rounded-full bg-white text-black shadow-subtle hover:bg-black hover:text-white transition-colors"
          >
            <Eye className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Product Information */}
      <div className="flex flex-col flex-1 pt-3 text-center items-center">
        {/* Category uppercase */}
        <span className="text-[11px] font-medium tracking-widest text-[#888888] uppercase mb-1">
          {product.categorySlug.replace("-", " ")}
        </span>

        {/* Title */}
        <Link
          href={`/products/${product.slug}`}
          className="text-sm md:text-[15px] font-normal text-[#222222] line-clamp-1 hover:text-[#888888] transition-colors"
        >
          {product.title}
        </Link>

        {/* Price & Strikethrough */}
        <div className="mt-1 flex items-center justify-center gap-2">
          <span className="text-sm md:text-[15px] font-semibold text-[#222222]">
            {priceFormatted}
          </span>
          {compareAtPriceFormatted && (
            <span className="text-xs md:text-sm text-[#999999] line-through font-normal">
              {compareAtPriceFormatted}
            </span>
          )}
        </div>

        {/* ADD TO CART Link button on hover / active */}
        <div className="mt-2 pt-0.5">
          <button
            type="button"
            onClick={handleQuickAddClick}
            className="text-xs font-bold uppercase tracking-wider text-[#222222] hover:text-[#000000] border-b border-black pb-0.5 transition-colors"
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
}
