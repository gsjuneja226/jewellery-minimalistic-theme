import * as React from "react";
import { ShieldCheck, RefreshCw, Lock, Truck } from "lucide-react";

export function TrustStrip() {
  const features = [
    {
      icon: ShieldCheck,
      title: "Anti-Tarnish Assurance",
      desc: "Protective nano-coating designed for Indian weather & longevity",
    },
    {
      icon: RefreshCw,
      title: "Hassle-Free Returns",
      desc: "7-day return & exchange policy for peace of mind",
    },
    {
      icon: Lock,
      title: "100% Secure Payments",
      desc: "UPI, Cards, NetBanking & Cash on Delivery (COD)",
    },
    {
      icon: Truck,
      title: "India-Wide Delivery",
      desc: "Free express shipping above ₹1,499 to 25,000+ pincodes",
    },
  ];

  return (
    <section
      aria-label="Brand guarantees and service assurances"
      className="py-10 bg-soft-cream/60 border-y border-[#E7DCC6]/60"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3.5"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white border border-gold/40 text-antique-gold shadow-sm">
                  <Icon className="h-6 w-6 stroke-[1.6]" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-medium text-espresso">
                    {item.title}
                  </h4>
                  <p className="mt-0.5 text-xs text-brown-text/80 leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
