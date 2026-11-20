import * as React from "react";
import { Header } from "@/components/layout/Header";
import { AlukasHeroSlider } from "@/components/home/AlukasHeroSlider";
import { PopularCategoriesSlider } from "@/components/home/PopularCategoriesSlider";
import { HandpickedSection } from "@/components/home/HandpickedSection";
import { TrendyCollectionSlider } from "@/components/home/TrendyCollectionSlider";
import { FeaturedProductsTabs } from "@/components/home/FeaturedProductsTabs";
import { FindStoreBanner } from "@/components/home/FindStoreBanner";
import { AlukasCustomerReviews } from "@/components/home/AlukasCustomerReviews";
import { AlukasInstagramGrid } from "@/components/home/AlukasInstagramGrid";
import { AlukasNewsletter } from "@/components/home/AlukasNewsletter";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { BackToTopButton } from "@/components/ui/BackToTopButton";
import { NewsletterModal } from "@/components/home/NewsletterModal";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-black font-sans pb-16 md:pb-0 overflow-x-hidden">
      {/* 1. Header with Search, Centered Logo & Cart Bag */}
      <Header />

      {/* 2. Hero Section: Exact dimension from photo, text in image, boxed button below */}
      <AlukasHeroSlider />

      {/* 3. Popular Categories Scroller (Left-Right scroll with 3 to 4 categories per scroll) */}
      <PopularCategoriesSlider />

      {/* 4. Handpicked Curated Banners: Bestsellers, New Arrivals, Clearance Sale (as shown in photo) */}
      <HandpickedSection />

      {/* 5. Trendy Collection Product Slider */}
      <TrendyCollectionSlider />

      {/* 6. Primary Curated Product Showcase (Tabbed: New Arrivals | Featured | Best Seller) */}
      <FeaturedProductsTabs />

      {/* 7. Flagship Boutique Banner */}
      <FindStoreBanner />

      {/* 8. Customer Reviews Carousel */}
      <AlukasCustomerReviews />

      {/* 9. Instagram Gallery */}
      <AlukasInstagramGrid />

      {/* 10. Newsletter Subscribe Strip */}
      <AlukasNewsletter />

      {/* 11. Customer-Focused Footer */}
      <Footer />

      {/* 12. Mobile Sticky Bottom Navigation (Home, Filters, Search, Wishlist, Account) */}
      <MobileBottomNav />

      {/* 13. Back to Top Button */}
      <BackToTopButton />

      {/* 14. Desktop Newsletter Modal */}
      <NewsletterModal />
    </div>
  );
}
