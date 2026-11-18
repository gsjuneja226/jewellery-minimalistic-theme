import * as React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export interface RatingProps {
  rating: number; // 0 to 5
  reviewsCount?: number;
  size?: "sm" | "default";
  className?: string;
}

export function Rating({
  rating,
  reviewsCount,
  size = "default",
  className,
}: RatingProps) {
  return (
    <div className={cn("inline-flex items-center gap-1.5", className)}>
      <div className="flex items-center text-gold">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              "fill-current",
              size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4",
              star <= Math.round(rating)
                ? "text-gold fill-gold"
                : "text-[#E7DCC6] fill-transparent"
            )}
          />
        ))}
      </div>
      {reviewsCount !== undefined && (
        <span className="text-xs font-sans text-brown-text/80">
          ({reviewsCount})
        </span>
      )}
    </div>
  );
}
