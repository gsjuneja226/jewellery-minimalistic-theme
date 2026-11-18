import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, label, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-medium text-brown-text uppercase tracking-wider font-sans"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          type={type}
          ref={ref}
          className={cn(
            "flex h-11 w-full rounded-[14px] border border-[#E7DCC6] bg-white px-4 py-2 text-sm font-sans text-espresso placeholder:text-[#9D9484] focus-visible:border-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
            error && "border-red-500 focus-visible:ring-red-500",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-xs text-red-600 font-sans tracking-wide">{error}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";
