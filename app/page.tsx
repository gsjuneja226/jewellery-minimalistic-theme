import * as React from "react";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { JewelleryBoxHero } from "@/components/hero/JewelleryBoxHero";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-warm-white">
      <AnnouncementBar />
      <div className="relative">
        <Header isOverHero={true} />
        <JewelleryBoxHero />
      </div>
      <Footer />
    </div>
  );
}
