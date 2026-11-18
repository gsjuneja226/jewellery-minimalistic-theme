import * as React from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface QuantityStepperProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  className?: string;
  disabled?: boolean;
}

export function QuantityStepper({
  value,
  min = 1,
  max = 99,
  onChange,
  className,
  disabled = false,
}: QuantityStepperProps) {
  const handleDecrease = () => {
    if (value > min && !disabled) {
      onChange(value - 1);
    }
  };

  const handleIncrease = () => {
    if (value < max && !disabled) {
      onChange(value + 1);
    }
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-[#E7DCC6] bg-white p-1 shadow-sm select-none",
        disabled && "opacity-50 pointer-events-none",
        className
      )}
    >
      <button
        type="button"
        onClick={handleDecrease}
        disabled={value <= min || disabled}
        className="flex h-8 w-8 items-center justify-center rounded-full text-brown-text hover:bg-soft-cream hover:text-espresso disabled:opacity-40 transition-colors focus:outline-none focus:ring-1 focus:ring-gold"
        aria-label="Decrease quantity"
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span className="w-10 text-center font-sans text-sm font-medium text-espresso">
        {value}
      </span>
      <button
        type="button"
        onClick={handleIncrease}
        disabled={value >= max || disabled}
        className="flex h-8 w-8 items-center justify-center rounded-full text-brown-text hover:bg-soft-cream hover:text-espresso disabled:opacity-40 transition-colors focus:outline-none focus:ring-1 focus:ring-gold"
        aria-label="Increase quantity"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
