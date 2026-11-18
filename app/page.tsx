import * as React from "react";
import { Header } from "@/components/layout/Header";
import { BibaStyleHero } from "@/components/home/BibaStyleHero";
import { Interactive3DShowcase } from "@/components/home/Interactive3DShowcase";
import { QuickCategoryCircles } from "@/components/home/QuickCategoryCircles";
import { TrustStrip } from "@/components/home/TrustStrip";
import { ShopByCategory } from "@/components/home/ShopByCategory";
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
      {/* 1. Sticky floating header when scrolled past hero */}
      <Header isOverHero={true} />

      {/* 2. Hero Area: Clean Luxury Maroonish Navbar + Clean Editorial Hero (NO PHOTOS) */}
      <BibaStyleHero />

      {/* 3. Directly below hero: final3 Interactive 3D Jewellery Box component */}
      <Interactive3DShowcase />

      {/* 4. Quick Category Story Circles (Compact horizontal swipe on mobile) */}
      <QuickCategoryCircles />

      {/* 5. Trust Strip (Anti-tarnish, COD, free shipping, easy returns) */}
      <TrustStrip />

      {/* 6. Shop by Category (5 large curated visual tiles, visible on tablet/desktop) */}
      <ShopByCategory />

      {/* 7. Bestsellers with Dynamic Category Filter Tabs (Compact 4 on phone, 8 on desktop) */}
      <BestsellersGrid />

      {/* 8. Shop by Occasion (Wedding, Festive, Daily Wear, Gifting) */}
      <ShopByOccasion />

      {/* 9. Brand Story Band about Mitthat */}
      <BrandStoryBand />

      {/* 10. Customer Reviews with Verified Buyer Badges (Compact 2 on phone, 6 on desktop) */}
      <CustomerReviews />

      {/* 11. Instagram Community Grid (Compact 3 on phone, 6 on desktop) */}
      <InstagramGrid />

      {/* 12. VIP Club & Newsletter Signup with WhatsApp Opt-in */}
      <NewsletterSection />

      {/* 13. Soft Cream Luxury Footer with full logo & policies */}
      <Footer />
    </div>
  );
}
