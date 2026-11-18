import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
  label?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, label, id, children, ...props }, ref) => {
    const generatedId = React.useId();
    const selectId = id || generatedId;

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-xs font-medium text-brown-text uppercase tracking-wider font-sans"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            id={selectId}
            ref={ref}
            className={cn(
              "flex h-11 w-full appearance-none rounded-[14px] border border-[#E7DCC6] bg-white px-4 py-2 pr-10 text-sm font-sans text-espresso focus-visible:border-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
              error && "border-red-500 focus-visible:ring-red-500",
              className
            )}
            {...props}
          >
            {children}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3.5 top-3.5 h-4 w-4 text-[#9D9484]" />
        </div>
        {error && (
          <p className="text-xs text-red-600 font-sans tracking-wide">{error}</p>
        )}
      </div>
    );
  }
);
Select.displayName = "Select";
