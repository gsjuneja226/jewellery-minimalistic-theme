import * as React from "react";
import { Header } from "@/components/layout/Header";
import { AlukasHeroSlider } from "@/components/home/AlukasHeroSlider";
import { PromoBanners } from "@/components/home/PromoBanners";
import { PopularCategoriesSlider } from "@/components/home/PopularCategoriesSlider";
import { TrendyCollectionSlider } from "@/components/home/TrendyCollectionSlider";
import { FindStoreBanner } from "@/components/home/FindStoreBanner";
import { SplitFeatureBanners } from "@/components/home/SplitFeatureBanners";
import { FeaturedProductsTabs } from "@/components/home/FeaturedProductsTabs";
import { AlukasCustomerReviews } from "@/components/home/AlukasCustomerReviews";
import { ReadJournalSection } from "@/components/home/ReadJournalSection";
import { AlukasInstagramGrid } from "@/components/home/AlukasInstagramGrid";
import { AlukasNewsletter } from "@/components/home/AlukasNewsletter";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { BackToTopButton } from "@/components/ui/BackToTopButton";
import { NewsletterModal } from "@/components/home/NewsletterModal";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-black font-sans pb-16 md:pb-0 overflow-x-hidden">
      {/* 1. Header with Search, Logo, Cart Drawer & Full-Width Mega Menu */}
      <Header />

      {/* 2. Hero Slider with mobile-optimized height & bold CTAs */}
      <AlukasHeroSlider />

      {/* 3. Popular Categories (Compact 3x2 Grid on Mobile, 6 Circles on Desktop) */}
      <PopularCategoriesSlider />

      {/* 4. Promotional Banners (1 concise banner on Mobile, 3 on Desktop) */}
      <PromoBanners />

      {/* 5. Trendy Collection (Desktop only to prevent duplicate product feed on Mobile) */}
      <div className="hidden md:block">
        <TrendyCollectionSlider />
      </div>

      {/* 6. Primary Curated Product Showcase (Tabbed: New Arrivals | Featured | Best Seller) */}
      <FeaturedProductsTabs />

      {/* 7. Mohali Flagship Boutique Banner */}
      <FindStoreBanner />

      {/* 8. Split Feature Banners (Desktop only) */}
      <div className="hidden md:block">
        <SplitFeatureBanners />
      </div>

      {/* 9. Customer Reviews Carousel */}
      <AlukasCustomerReviews />

      {/* 10. Read Journal (Desktop only) */}
      <div className="hidden md:block">
        <ReadJournalSection />
      </div>

      {/* 11. Instagram Gallery */}
      <AlukasInstagramGrid />

      {/* 12. Newsletter Subscribe Strip */}
      <AlukasNewsletter />

      {/* 13. Customer-Focused Footer */}
      <Footer />

      {/* 14. Mobile Sticky Bottom Navigation (Home, Search, Wishlist, Account) */}
      <MobileBottomNav />

      {/* 15. Back to Top Button */}
      <BackToTopButton />

      {/* 16. Desktop Newsletter Modal (Disabled on mobile viewports) */}
      <NewsletterModal />
    </div>
  );
}
