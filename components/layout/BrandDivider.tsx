import * as React from "react";
import { cn } from "@/lib/utils";

export interface BrandDividerProps {
  className?: string;
  withFlower?: boolean;
}

export function BrandDivider({
  className,
  withFlower = true,
}: BrandDividerProps) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center my-8 w-full",
        className
      )}
      role="separator"
    >
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      {withFlower && (
        <div className="absolute px-3 bg-transparent">
          {/* Official 4-petal flower ornament from brand mark */}
          <svg
            className="w-4 h-4 text-gold fill-current drop-shadow-sm"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12 2C13.5 6 18 10.5 22 12C18 13.5 13.5 18 12 22C10.5 18 6 13.5 2 12C6 10.5 10.5 6 12 2Z" />
            <circle cx="12" cy="12" r="2.5" fill="#FFFDF9" />
          </svg>
        </div>
      )}
    </div>
  );
}
