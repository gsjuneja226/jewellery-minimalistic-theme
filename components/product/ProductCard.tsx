"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { Price } from "@/components/ui/Price";
import { Badge } from "@/components/ui/Badge";
import { Rating } from "@/components/ui/Rating";
import type { MockProduct } from "@/lib/data/mockData";
import { cn } from "@/lib/utils";

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
  const [isHovered, setIsHovered] = React.useState(false);
  const [wishlistActive, setWishlistActive] = React.useState(isWishlisted);

  const primaryImage = product.images[0] || "/products/ad-solitaire-statement-ring-1.svg";
  const hoverImage = product.images[1] || primaryImage;
  const primaryVariant = product.variants[0];

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
        "group relative flex flex-col rounded-[14px] border border-[#D6C2A3] bg-[#FCFAF5] p-3 shadow-subtle transition-all duration-300 hover:border-gold hover:shadow-card",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid="product-card"
    >
      {/* 4:5 Aspect Ratio Image Container */}
      <Link
        href={`/products/${product.slug}`}
        className="relative block w-full aspect-[4/5] overflow-hidden rounded-[10px] bg-[#EFE7DC]/60"
      >
        <Image
          src={isHovered ? hoverImage : primaryImage}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Wishlist Heart Button */}
        <button
          type="button"
          onClick={handleWishlistClick}
          aria-label={wishlistActive ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-2.5 right-2.5 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-espresso shadow-sm backdrop-blur-sm transition-transform duration-200 hover:scale-110 active:scale-95 focus:outline-none focus:ring-1 focus:ring-gold"
        >
          <Heart
            className={cn(
              "h-4 w-4 transition-colors",
              wishlistActive
                ? "fill-antique-gold text-antique-gold"
                : "text-espresso hover:text-antique-gold"
            )}
          />
        </button>

        {/* Material Badge */}
        <div className="absolute bottom-2.5 left-2.5 z-10 flex flex-wrap gap-1">
          <Badge variant="material" className="text-[10px] py-0 px-2 bg-white/90 backdrop-blur-xs">
            {product.materialFinish}
          </Badge>
          {primaryVariant && primaryVariant.stock <= 4 && (
            <Badge variant="stockLow" className="text-[10px] py-0 px-2">
              Only {primaryVariant.stock} left
            </Badge>
          )}
        </div>

        {/* Quick Add overlay button on desktop hover */}
        <div className="absolute inset-x-2.5 bottom-2.5 z-20 hidden md:block opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
          <button
            type="button"
            onClick={handleQuickAddClick}
            className="w-full h-10 rounded-full bg-espresso/95 text-white font-sans text-xs font-medium tracking-wider uppercase flex items-center justify-center gap-1.5 shadow-md hover:bg-espresso active:scale-98 transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-gold" />
            Quick Add
          </button>
        </div>
      </Link>

      {/* Product Details */}
      <div className="flex flex-col flex-1 pt-3 space-y-1.5">
        <div className="flex items-center justify-between text-xs text-brown-text/70">
          <span className="uppercase tracking-widest text-[10px] font-sans">
            {product.occasion || "Handcrafted"}
          </span>
          <Rating rating={product.rating} reviewsCount={product.reviewsCount} size="sm" />
        </div>

        <Link
          href={`/products/${product.slug}`}
          className="font-serif text-lg font-medium text-espresso line-clamp-1 hover:text-antique-gold transition-colors"
        >
          {product.title}
        </Link>

        <p className="text-xs text-brown-text/80 line-clamp-1 font-sans">
          {product.subtitle}
        </p>

        {/* Price & Strike-through */}
        <div className="pt-1 mt-auto flex items-center justify-between">
          {primaryVariant && (
            <Price
              price={primaryVariant.price}
              compareAtPrice={primaryVariant.compareAtPrice}
            />
          )}

          {/* Mobile Quick Add icon */}
          <button
            type="button"
            onClick={handleQuickAddClick}
            className="md:hidden flex h-8 w-8 items-center justify-center rounded-full bg-light-blush text-espresso active:scale-95 transition-transform"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-4 h-4 text-espresso" />
          </button>
        </div>
      </div>
    </div>
  );
}
