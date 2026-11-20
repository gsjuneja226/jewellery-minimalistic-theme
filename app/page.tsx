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
    <div className="min-h-screen flex flex-col bg-white text-black font-sans pb-16 md:pb-0">
      {/* 1. Header with Announcement Bar, Search, Logo, Cart Drawer & Mega Menu */}
      <Header />

      {/* 2. Full-width Hero Slider with exact typography, slides and model images */}
      <AlukasHeroSlider />

      {/* 3. Three Promotional Banners (2021 Fashion, Flat Discount, New Collection) */}
      <PromoBanners />

      {/* 4. Popular Categories circular carousel with left/right navigation */}
      <PopularCategoriesSlider />

      {/* 5. Trendy Collection (Autumn Collection) with 4-card slider & hover quick add */}
      <TrendyCollectionSlider />

      {/* 6. Soft Lilac "Find Jewelry Shops Near You" Store Locator Banner */}
      <FindStoreBanner />

      {/* 7. Split Promotional Feature Banners (Bangles & Ring Design) */}
      <SplitFeatureBanners />

      {/* 8. Tabbed Featured Products (New Arrivals | Featured | Best Seller) */}
      <FeaturedProductsTabs />

      {/* 9. Customer Review Testimonial Cards Carousel on Soft Warm Oatmeal Background */}
      <AlukasCustomerReviews />

      {/* 10. Read Journal Fashion Blog Section */}
      <ReadJournalSection />

      {/* 11. Follow Us on Instagram 6-photo Edge-to-Edge Grid with hover overlays */}
      <AlukasInstagramGrid />

      {/* 12. Subscribe Newsletter Box */}
      <AlukasNewsletter />

      {/* 13. Clean Multi-Column Footer with Payment Badges and Phabulous Logo */}
      <Footer />

      {/* 14. Mobile Sticky Bottom Navigation (Home, Search, Wishlist, Account) */}
      <MobileBottomNav />

      {/* 15. Floating Back-to-Top Button */}
      <BackToTopButton />

      {/* 16. Newsletter Modal Popup */}
      <NewsletterModal />
    </div>
  );
}
