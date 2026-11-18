import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { BrandDivider } from "./BrandDivider";
import { ShieldCheck, Sparkles, Heart, HelpCircle, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-soft-cream border-t border-gold/40 text-brown-text font-sans relative pt-12 pb-8 px-4 md:px-8 mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 pb-12">
          {/* Col 1 & 2: Brand Lockup & Story */}
          <div className="lg:col-span-2 space-y-4">
            <div className="relative w-48 h-16">
              <Image
                src="/brand/logo-full.png"
                alt="Phabulous by Mitthat"
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="font-serif italic text-espresso text-base tracking-wide">
              Handpicked jewellery, simply irresistible.
            </p>
            <p className="text-sm text-brown-text/80 leading-relaxed max-w-sm">
              Curated artificial jewellery crafted for life&apos;s celebrated moments
              and daily elegance. From radiant gold-tone temple jhumkas to scintillating
              American Diamond (AD) party pieces, wear your sparkle with pride.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-antique-gold font-medium">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Handpicked Quality
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Anti-Tarnish Coating
              </span>
            </div>
          </div>

          {/* Col 3: Collections */}
          <div className="space-y-3">
            <h4 className="font-serif text-lg font-medium text-espresso tracking-wide">
              Collections
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/collections/wedding" className="hover:text-espresso transition-colors">
                  Wedding & Bridal
                </Link>
              </li>
              <li>
                <Link href="/collections/festive" className="hover:text-espresso transition-colors">
                  Festive & Celebrations
                </Link>
              </li>
              <li>
                <Link href="/collections/daily-wear" className="hover:text-espresso transition-colors">
                  Daily Wear Chic
                </Link>
              </li>
              <li>
                <Link href="/collections/gifting" className="hover:text-espresso transition-colors">
                  Curated Gifting
                </Link>
              </li>
              <li>
                <Link href="/collections/new-arrivals" className="hover:text-espresso transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/collections/bestsellers" className="hover:text-espresso transition-colors">
                  Bestsellers
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Customer Care & Policies */}
          <div className="space-y-3">
            <h4 className="font-serif text-lg font-medium text-espresso tracking-wide">
              Customer Care
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/track-order" className="hover:text-espresso transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="/pages/care-guide" className="hover:text-espresso transition-colors">
                  Jewellery Care Guide
                </Link>
              </li>
              <li>
                <Link href="/pages/shipping" className="hover:text-espresso transition-colors">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link href="/pages/returns" className="hover:text-espresso transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/pages/faq" className="hover:text-espresso transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/pages/contact" className="hover:text-espresso transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Legal & Trust */}
          <div className="space-y-3">
            <h4 className="font-serif text-lg font-medium text-espresso tracking-wide">
              Brand & Legal
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/pages/about" className="hover:text-espresso transition-colors">
                  About Mitthat
                </Link>
              </li>
              <li>
                <Link href="/pages/privacy" className="hover:text-espresso transition-colors">
                  Privacy Policy (DPDP Act)
                </Link>
              </li>
              <li>
                <Link href="/pages/terms" className="hover:text-espresso transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="text-brown-text/50 hover:text-espresso transition-colors">
                  Admin Portal
                </Link>
              </li>
            </ul>
            <div className="pt-2 text-xs text-brown-text/70 space-y-1">
              <p className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-gold" /> care@phabulousbymitthat.com
              </p>
              <p className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-gold" /> +91 (0) 98765 43210
              </p>
            </div>
          </div>
        </div>

        {/* Brand Divider with flower ornament */}
        <BrandDivider withFlower={true} />

        {/* Bottom bar: Copyright, Disclaimer & Payment Methods */}
        <div className="pt-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-brown-text/70">
          <div className="text-center md:text-left space-y-1">
            <p>© {new Date().getFullYear()} Phabulous by Mitthat. All rights reserved.</p>
            <p className="text-[11px] text-brown-text/60">
              Note: All our products are fashion artificial jewellery crafted with premium gold-tone, silver-tone, brass, and American Diamond (AD) stone embellishments.
            </p>
          </div>

          {/* Payment Icons */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <span className="px-2 py-1 bg-white border border-[#E7DCC6] rounded text-[10px] font-semibold text-espresso">
              UPI / QR
            </span>
            <span className="px-2 py-1 bg-white border border-[#E7DCC6] rounded text-[10px] font-semibold text-espresso">
              Visa / Mastercard
            </span>
            <span className="px-2 py-1 bg-white border border-[#E7DCC6] rounded text-[10px] font-semibold text-espresso">
              RuPay
            </span>
            <span className="px-2 py-1 bg-white border border-[#E7DCC6] rounded text-[10px] font-semibold text-espresso">
              NetBanking
            </span>
            <span className="px-2 py-1 bg-white border border-[#E7DCC6] rounded text-[10px] font-semibold text-espresso">
              Cash on Delivery (COD)
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
