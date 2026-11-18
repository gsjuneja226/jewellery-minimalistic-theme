import * as React from "react";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { RubansHeroBanner } from "@/components/home/RubansHeroBanner";
import { QuickCategoryCircles } from "@/components/home/QuickCategoryCircles";
import { TrustStrip } from "@/components/home/TrustStrip";
import { ShopByCategory } from "@/components/home/ShopByCategory";
import { NewArrivalsSection } from "@/components/home/NewArrivalsSection";
import { BestsellersGrid } from "@/components/home/BestsellersGrid";
import { ShopByOccasion } from "@/components/home/ShopByOccasion";
import { Interactive3DShowcase } from "@/components/home/Interactive3DShowcase";
import { BrandStoryBand } from "@/components/home/BrandStoryBand";
import { CustomerReviews } from "@/components/home/CustomerReviews";
import { InstagramGrid } from "@/components/home/InstagramGrid";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-warm-white">
      {/* 1. Announcement bar with promo & shipping info */}
      <AnnouncementBar />

      {/* 2. Sticky Header with logo, search, account, wishlist & cart */}
      <Header isOverHero={false} />

      {/* 3. Rubans-style Lifestyle & Editorial Hero Banner Carousel */}
      <RubansHeroBanner />

      {/* 4. Quick Category Story Circles (Rubans signature navigation) */}
      <QuickCategoryCircles />

      {/* 5. Trust Strip (Anti-tarnish, COD, free shipping, easy returns) */}
      <TrustStrip />

      {/* 6. Shop by Category (5 Large Curated Visual Tiles) */}
      <ShopByCategory />

      {/* 7. New Arrivals Carousel / Grid */}
      <NewArrivalsSection />

      {/* 8. Trending Bestsellers with Interactive Category Filter Tabs */}
      <BestsellersGrid />

      {/* 9. Shop by Occasion (Wedding, Festive, Daily Wear, Gifting) */}
      <ShopByOccasion />

      {/* 10. Interactive 3D Craftsmanship Showcase (Relocated Jewellery Box) */}
      <Interactive3DShowcase />

      {/* 11. Brand Story Band about Mitthat */}
      <BrandStoryBand />

      {/* 12. Customer Reviews with Photos & Verified Badges */}
      <CustomerReviews />

      {/* 13. Instagram Community Grid */}
      <InstagramGrid />

      {/* 14. VIP Club & Newsletter Signup with WhatsApp Opt-in */}
      <NewsletterSection />

      {/* 15. Soft Cream Luxury Footer with full logo & policies */}
      <Footer />
    </div>
  );
}
