import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium font-sans tracking-wide transition-colors select-none",
  {
    variants: {
      variant: {
        // Material tag or announcement: Light blush with espresso or deep gold
        default: "bg-light-blush text-espresso border border-blush/60",
        gold: "bg-[#FAF1D9] text-deep-gold border border-gold/40 font-semibold",
        material: "bg-soft-cream text-brown-text border border-[#E7DCC6]",
        outline: "border border-gold/60 text-antique-gold bg-transparent",
        stockLow: "bg-red-50 text-red-700 border border-red-200 animate-pulse",
        success: "bg-emerald-50 text-emerald-800 border border-emerald-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
