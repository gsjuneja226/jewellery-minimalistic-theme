import * as React from "react";
import Link from "next/link";
import { Sparkles, Truck, ShieldCheck } from "lucide-react";

export function AnnouncementBar() {
  return (
    <aside
      aria-label="Promotions and shipping notice"
      className="bg-light-blush border-b border-blush/60 text-espresso text-xs font-sans tracking-wide py-2 px-4 select-none relative z-40 transition-colors"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between sm:justify-center gap-4 text-center">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <Sparkles className="h-3.5 w-3.5 text-antique-gold flex-shrink-0 animate-pulse" />
          <p className="font-medium">
            <span>✨ Festive Sparkle: Free India-wide shipping on orders above ₹1,499</span>
            <span className="hidden md:inline mx-2 text-gold">•</span>
            <span className="hidden md:inline text-brown-text">Cash on Delivery available</span>
          </p>
        </div>
        <div className="hidden lg:flex items-center gap-4 text-brown-text text-[11px]">
          <span className="flex items-center gap-1">
            <Truck className="h-3 w-3 text-antique-gold" /> Fast Express Shipping
          </span>
          <span className="text-gold">•</span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="h-3 w-3 text-antique-gold" /> Anti-Tarnish Assurance
          </span>
        </div>
      </div>
    </aside>
  );
}
