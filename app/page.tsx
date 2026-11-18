import * as React from "react";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { JewelleryBoxHero } from "@/components/hero/JewelleryBoxHero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { ShopByCategory } from "@/components/home/ShopByCategory";
import { NewArrivalsSection } from "@/components/home/NewArrivalsSection";
import { BestsellersGrid } from "@/components/home/BestsellersGrid";
import { ShopByOccasion } from "@/components/home/ShopByOccasion";
import { BrandStoryBand } from "@/components/home/BrandStoryBand";
import { CustomerReviews } from "@/components/home/CustomerReviews";
import { InstagramGrid } from "@/components/home/InstagramGrid";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-warm-white">
      {/* 1. Announcement bar */}
      <AnnouncementBar />

      {/* 2 & 3. Slim Header over Hero & 3D Jewellery Box Hero */}
      <div className="relative">
        <Header isOverHero={true} />
        <JewelleryBoxHero />
      </div>

      {/* 4. Trust Strip */}
      <TrustStrip />

      {/* 5. Shop by Category */}
      <ShopByCategory />

      {/* 6. New Arrivals */}
      <NewArrivalsSection />

      {/* 7. Bestsellers Grid */}
      <BestsellersGrid />

      {/* 8. Shop by Occasion */}
      <ShopByOccasion />

      {/* 9. Brand Story Band about Mitthat */}
      <BrandStoryBand />

      {/* 10. Customer Reviews with Photos */}
      <CustomerReviews />

      {/* 11. Instagram Grid */}
      <InstagramGrid />

      {/* 12. Newsletter Signup with WhatsApp Opt-in */}
      <NewsletterSection />

      {/* 13. Soft Cream Footer with full logo */}
      <Footer />
    </div>
  );
}
