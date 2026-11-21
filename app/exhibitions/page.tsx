import * as React from "react";
import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { ExhibitionsGallery } from "@/components/home/ExhibitionsGallery";
import Link from "next/link";
import { Sparkles, Calendar, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Exhibitions & Trunk Shows | Phabulous by Mitthat",
  description:
    "Explore our exclusive bridal expos, heritage trunk shows, and curated pop-up showcases in New Delhi, Chandigarh, Ludhiana, Jaipur, and Amritsar.",
};

export default function ExhibitionsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-black font-sans pb-16 md:pb-0">
      <Header />

      {/* Hero Header */}
      <div className="bg-[#FAF9F7] border-b border-[#EEEEEE] py-10 sm:py-14 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-[#BA9048] block mb-2">
            PREMIER POP-UPS & BRIDAL EXPOS
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#222222] font-normal mb-3">
            Our Exhibitions
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-[#666666] max-w-2xl mx-auto font-sans leading-relaxed">
            Experience our handcrafted Kundan jadau sets, anti-tarnish solitaires, and heirloom temple jewellery live in person. Discover where we are showcasing next across India.
          </p>
        </div>
      </div>

      {/* Full Exhibitions Gallery */}
      <main className="flex-1">
        <ExhibitionsGallery />

        {/* Private Trunk Show / Collaboration Banner */}
        <section className="bg-white py-12 md:py-16 border-t border-[#EEEEEE]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-[#BA9048]">
              <Sparkles className="w-4 h-4" />
              <span>BESPOKE BRIDAL APPOINTMENTS</span>
            </span>
            <h2 className="text-2xl md:text-3xl font-serif text-[#222222] font-normal">
              Want a Private Trunk Show or Exhibition Collaboration?
            </h2>
            <p className="text-xs sm:text-sm text-[#666666] max-w-xl mx-auto leading-relaxed">
              We bring bespoke bridal styling, customised Kundan suites, and private jewellery viewings for destination weddings and luxury fashion exhibitions.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/pages/contact"
                className="px-6 py-3 bg-[#222222] text-white text-xs font-bold uppercase tracking-wider hover:bg-black transition-colors"
              >
                Inquire For Exhibitions
              </Link>
              <a
                href="https://www.instagram.com/phabulous_by_mitthat"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-[#222222] text-[#222222] text-xs font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
              >
                Follow On Instagram
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
