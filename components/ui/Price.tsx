import * as React from "react";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

export interface PriceProps {
  price: number; // in paise
  compareAtPrice?: number | null; // in paise
  className?: string;
  size?: "sm" | "default" | "lg";
}

export function Price({
  price,
  compareAtPrice,
  className,
  size = "default",
}: PriceProps) {
  const hasDiscount = compareAtPrice && compareAtPrice > price;
  const discountPercent = hasDiscount
    ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
    : 0;

  return (
    <div
      className={cn(
        "flex items-baseline gap-2 font-sans",
        size === "sm" && "text-sm",
        size === "default" && "text-base",
        size === "lg" && "text-xl",
        className
      )}
    >
      <span className="font-semibold text-espresso">
        {formatPrice(price)}
      </span>
      {hasDiscount && (
        <>
          <span className="text-xs text-[#9D9484] line-through">
            {formatPrice(compareAtPrice)}
          </span>
          <span className="text-xs font-medium text-antique-gold bg-[#FAF1D9] px-1.5 py-0.5 rounded">
            {discountPercent}% OFF
          </span>
        </>
      )}
    </div>
  );
}
