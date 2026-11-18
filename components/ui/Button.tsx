import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center font-sans text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        // Primary is a pill with a gold outline that fills antique gold on hover with a soft glow
        primary:
          "rounded-full border border-gold text-antique-gold bg-white hover:bg-antique-gold hover:text-white hover:shadow-gold active:scale-[0.98]",
        // Secondary is solid espresso with white text
        secondary:
          "rounded-full bg-espresso text-white hover:bg-espresso/90 shadow-subtle active:scale-[0.98]",
        // Soft blush accent
        blush:
          "rounded-full bg-light-blush text-espresso hover:bg-blush active:scale-[0.98]",
        outline:
          "rounded-full border border-[#D8CCB6] text-brown-text hover:border-gold hover:text-espresso bg-transparent",
        ghost:
          "rounded-md text-brown-text hover:text-espresso hover:bg-soft-cream",
        destructive:
          "rounded-full bg-red-600 text-white hover:bg-red-700 active:scale-[0.98]",
      },
      size: {
        sm: "h-9 px-4 text-xs tracking-wider uppercase",
        default: "h-11 px-6 text-sm tracking-wide",
        lg: "h-13 px-8 text-base tracking-wide min-h-[48px]",
        icon: "h-10 w-10 p-0 rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
