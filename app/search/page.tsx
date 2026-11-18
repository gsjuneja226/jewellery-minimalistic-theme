"use client";

import * as React from "react";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProductCard } from "@/components/product/ProductCard";
import { PRODUCTS_DATA, type MockProduct } from "@/lib/data/mockData";
import { Search, X, Sparkles } from "lucide-react";

const SUGGESTED_QUERIES = [
  "Choker",
  "Jhumkas",
  "AD Solitaire",
  "Temple Kada",
  "Tennis Bracelet",
  "Anti-tarnish",
  "Emerald",
  "Meenakari",
];

export default function SearchPage() {
  const [query, setQuery] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const results = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PRODUCTS_DATA;

    return PRODUCTS_DATA.filter((p) => {
      return (
        p.title.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.materialFinish.toLowerCase().includes(q) ||
        p.stoneType.toLowerCase().includes(q) ||
        p.occasion.toLowerCase().includes(q)
      );
    });
  }, [query]);

  return (
    <div className="min-h-screen flex flex-col bg-warm-white">
      <AnnouncementBar />
      <Header isOverHero={false} />

      <main className="flex-1 max-w-7xl mx-auto px-4 md:px-8 py-8 w-full">
        <Breadcrumbs items={[{ label: "Search" }]} className="mb-6" />

        <div className="max-w-2xl mx-auto text-center space-y-4 mb-10">
          <h1 className="font-serif text-3xl md:text-4xl text-espresso heading-wash">
            Search Our Collection
          </h1>
          <p className="text-xs md:text-sm text-brown-text/80 font-sans">
            Search by jewellery type, stone, finish or occasion.
          </p>

          {/* Search Input Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-antique-gold pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search rings, necklaces, jhumkas, bridal sets..."
              className="w-full h-12 rounded-full border border-[#E7DCC6] bg-white pl-12 pr-10 text-sm font-sans text-espresso placeholder:text-[#9D9484] shadow-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-3.5 top-3.5 p-0.5 rounded-full text-brown-text/60 hover:text-espresso"
                aria-label="Clear query"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Quick Keyword Suggestions */}
          <div className="flex items-center justify-center gap-1.5 flex-wrap pt-2">
            <span className="text-xs text-brown-text/70 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-gold" /> Popular:
            </span>
            {SUGGESTED_QUERIES.map((keyword) => (
              <button
                key={keyword}
                type="button"
                onClick={() => setQuery(keyword)}
                className="text-xs px-2.5 py-1 rounded-full bg-soft-cream/80 text-brown-text border border-[#E7DCC6]/60 hover:border-gold hover:text-espresso transition-colors"
              >
                {keyword}
              </button>
            ))}
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#F1E8D8] mb-6 text-xs text-brown-text">
          <span>
            {query
              ? `Showing ${results.length} results for "${query}"`
              : `Showing all ${results.length} designs`}
          </span>
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-antique-gold hover:underline font-medium"
            >
              Reset search
            </button>
          )}
        </div>

        {/* Results Grid */}
        {results.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-soft-cream/30 rounded-[14px] border border-[#E7DCC6]/60 p-8 space-y-3 max-w-lg mx-auto">
            <p className="font-serif text-2xl text-espresso">No matching jewels found</p>
            <p className="text-xs text-brown-text/80 font-sans">
              We couldn&apos;t find anything matching &quot;{query}&quot;. Try exploring our popular categories or searching for a different keyword.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
