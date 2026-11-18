import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CATEGORIES_DATA, COLLECTIONS_DATA } from "@/lib/data/mockData";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "All Collections & Categories",
  description: "Browse curated artificial jewellery collections by Phabulous by Mitthat. Bridal sets, festive jhumkas, daily wear anti-tarnish pieces and gifting.",
};

export default function CollectionsIndexPage() {
  return (
    <div className="min-h-screen flex flex-col bg-warm-white">
      <AnnouncementBar />
      <Header isOverHero={false} />

      <main className="flex-1 max-w-7xl mx-auto px-4 md:px-8 py-8 w-full">
        <Breadcrumbs items={[{ label: "Collections" }]} className="mb-6" />

        <div className="text-center space-y-2 mb-12">
          <span className="text-xs font-sans tracking-widest text-antique-gold uppercase font-semibold">
            Handpicked Catalog
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-espresso heading-wash">
            Our Collections & Categories
          </h1>
          <p className="text-sm text-brown-text/80 max-w-md mx-auto font-sans">
            Explore handcrafted fashion jewellery created for your most cherished moments.
          </p>
        </div>

        {/* Featured Occasion Collections */}
        <div className="mb-14">
          <h2 className="font-serif text-2xl text-espresso mb-6 border-b border-[#F1E8D8] pb-3">
            Shop by Occasion
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {COLLECTIONS_DATA.map((col) => (
              <Link
                key={col.slug}
                href={`/collections/${col.slug}`}
                className="group rounded-[14px] overflow-hidden border border-[#E7DCC6] bg-white shadow-subtle hover:border-gold hover:shadow-card transition-all"
              >
                <div className="relative aspect-[4/5] bg-soft-cream/30">
                  <Image
                    src={col.imageUrl}
                    alt={col.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-serif text-2xl">{col.name}</h3>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs text-brown-text/80 line-clamp-2">
                    {col.description}
                  </p>
                  <span className="mt-3 text-xs font-semibold text-antique-gold inline-flex items-center gap-1 group-hover:text-deep-gold">
                    View Collection <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div>
          <h2 className="font-serif text-2xl text-espresso mb-6 border-b border-[#F1E8D8] pb-3">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {CATEGORIES_DATA.map((cat) => (
              <Link
                key={cat.slug}
                href={`/collections/${cat.slug}`}
                className="group p-4 rounded-[14px] border border-[#E7DCC6] bg-white hover:border-gold hover:shadow-card transition-all flex flex-col items-center text-center space-y-3"
              >
                <div className="relative aspect-square w-32 rounded-full overflow-hidden border border-gold/40 bg-soft-cream/40">
                  <Image
                    src={cat.imageUrl}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-serif text-xl font-medium text-espresso group-hover:text-antique-gold transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-brown-text/70 line-clamp-2">
                  {cat.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
