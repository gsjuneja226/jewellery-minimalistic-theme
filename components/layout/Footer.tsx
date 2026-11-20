"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Mail, Clock, Instagram, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-white text-[#222222] font-sans border-t border-[#E5E5E5] pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-[#EEEEEE]">
          {/* Column 1: Brand & Craftsmanship */}
          <div className="space-y-4">
            <Link href="/" className="inline-block group py-1">
              <div className="relative h-11 w-48 shrink-0">
                <Image
                  src="/brand/newlogo.png"
                  alt="Phabulous by Mitthat"
                  fill
                  sizes="192px"
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <p className="text-xs text-[#666666] leading-relaxed">
              Curated artisanal artificial jewellery, bespoke bridal Kundan chokers, and everyday anti-tarnish statement pieces handcrafted with timeless finesse.
            </p>
            <div className="flex items-center space-x-3 pt-2 text-[#222222]">
              <a
                href="https://www.instagram.com/phabulous_by_mitthat"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-[#E5E5E5] flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-[#E5E5E5] flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 fill-current" />
              </a>
            </div>
          </div>

          {/* Column 2: Artificial Jewellery Collections */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-[#222222] uppercase tracking-wider">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-[#666666]">
              <li><Link href="/collections/jewellery-sets" className="hover:text-black transition-colors">Bridal Kundan Sets</Link></li>
              <li><Link href="/collections/necklaces" className="hover:text-black transition-colors">Chokers & Layered Necklaces</Link></li>
              <li><Link href="/collections/earrings" className="hover:text-black transition-colors">Jhumkas, Chandbalis & Studs</Link></li>
              <li><Link href="/collections/rings" className="hover:text-black transition-colors">Cocktail & Solitaire Rings</Link></li>
              <li><Link href="/collections/bangles-bracelets" className="hover:text-black transition-colors">Temple Bangles & Kadas</Link></li>
              <li><Link href="/collections/new-arrivals" className="hover:text-black transition-colors">New Arrivals 2026</Link></li>
            </ul>
          </div>

          {/* Column 3: Customer Care & Services */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-[#222222] uppercase tracking-wider">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs text-[#666666]">
              <li><Link href="/track-order" className="hover:text-black transition-colors">Track Your Order</Link></li>
              <li><Link href="/pages/care-guide" className="hover:text-black transition-colors">Artificial Jewellery Care Guide</Link></li>
              <li><Link href="/pages/shipping" className="hover:text-black transition-colors">India-wide Express Shipping</Link></li>
              <li><Link href="/pages/returns" className="hover:text-black transition-colors">Easy Returns & Exchanges</Link></li>
              <li><Link href="/pages/faq" className="hover:text-black transition-colors">Frequently Asked Questions</Link></li>
              <li><Link href="/pages/about" className="hover:text-black transition-colors">Our Story</Link></li>
              <li><Link href="/admin" className="text-[#888888] hover:text-black transition-colors">Admin Portal</Link></li>
            </ul>
          </div>

          {/* Column 4: Flagship Boutique */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-[#222222] uppercase tracking-wider">
              Flagship Boutique
            </h4>
            <div className="space-y-2.5 text-xs text-[#666666]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#BA9048] shrink-0 mt-0.5" />
                <p>
                  Phabulous by Mitthat Boutique,<br />
                  Sector 70, SAS Nagar,<br />
                  Punjab 160071, India
                </p>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <Mail className="w-4 h-4 text-[#BA9048] shrink-0" />
                <a href="mailto:care@phabulousbymitthat.com" className="hover:text-black transition-colors">
                  care@phabulousbymitthat.com
                </a>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-[#BA9048] shrink-0" />
                <span>Mon – Sat: 11:00 AM – 8:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Secure Payment Badges & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-xs text-[#777777]">
            © {new Date().getFullYear()} Phabulous by Mitthat. Handcrafted Artificial Jewellery. All Rights Reserved.
          </p>

          {/* Payment Badges */}
          <div className="flex items-center gap-2 text-[10px] font-bold text-[#444444]">
            <span className="px-2.5 py-1 bg-[#FAFAFA] border border-[#E5E5E5] rounded-xs">
              UPI
            </span>
            <span className="px-2.5 py-1 bg-[#FAFAFA] border border-[#E5E5E5] rounded-xs">
              RuPay
            </span>
            <span className="px-2.5 py-1 bg-[#FAFAFA] border border-[#E5E5E5] rounded-xs">
              VISA
            </span>
            <span className="px-2.5 py-1 bg-[#FAFAFA] border border-[#E5E5E5] rounded-xs">
              MasterCard
            </span>
            <span className="px-2.5 py-1 bg-[#FAFAFA] border border-[#E5E5E5] rounded-xs">
              NetBanking
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
