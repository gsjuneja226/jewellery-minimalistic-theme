"use client";

import * as React from "react";
import { ProductCard } from "@/components/product/ProductCard";
import { Select } from "@/components/ui/Select";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { MockProduct } from "@/lib/data/mockData";
import { SlidersHorizontal, X } from "lucide-react";

export interface CollectionBrowserProps {
  initialProducts: MockProduct[];
  title: string;
}

export function CollectionBrowser({
  initialProducts,
  title,
}: CollectionBrowserProps) {
  const [products, setProducts] = React.useState<MockProduct[]>(initialProducts);
  const [sortBy, setSortBy] = React.useState("featured");
  const [selectedFinish, setSelectedFinish] = React.useState<string>("all");
  const [selectedOccasion, setSelectedOccasion] = React.useState<string>("all");
  const [filterDrawerOpen, setFilterDrawerOpen] = React.useState(false);

  // Available unique finishes and occasions
  const finishes = ["all", "gold-tone", "silver-tone", "rose gold-tone", "oxidised"];
  const occasions = ["all", "Wedding", "Festive", "Daily wear", "Gifting"];

  // Filter and sort products
  const filteredProducts = React.useMemo(() => {
    let result = [...initialProducts];

    if (selectedFinish !== "all") {
      result = result.filter(
        (p) => p.materialFinish.toLowerCase() === selectedFinish.toLowerCase()
      );
    }

    if (selectedOccasion !== "all") {
      result = result.filter(
        (p) => p.occasion.toLowerCase() === selectedOccasion.toLowerCase()
      );
    }

    if (sortBy === "price-low") {
      result.sort((a, b) => a.variants[0].price - b.variants[0].price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.variants[0].price - a.variants[0].price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [initialProducts, selectedFinish, selectedOccasion, sortBy]);

  return (
    <div className="space-y-6">
      {/* Top Filter Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#F1E8D8]">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-espresso uppercase tracking-wider font-sans">
            Filters:
          </span>
          {/* Finish Filter Pills */}
          {finishes.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setSelectedFinish(f)}
              className={`text-xs font-sans px-3 py-1 rounded-full border transition-colors capitalize ${
                selectedFinish === f
                  ? "bg-antique-gold text-white border-antique-gold font-medium shadow-xs"
                  : "bg-white text-brown-text border-[#E7DCC6] hover:border-gold"
              }`}
            >
              {f === "all" ? "All Finishes" : f}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <span className="text-xs font-sans text-brown-text/80 whitespace-nowrap">
            {filteredProducts.length} {filteredProducts.length === 1 ? "design" : "designs"}
          </span>
          <div className="w-44">
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-9 text-xs rounded-full bg-white"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
            </Select>
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      {(selectedFinish !== "all" || selectedOccasion !== "all") && (
        <div className="flex items-center gap-2 text-xs">
          <span className="text-brown-text">Active filters:</span>
          {selectedFinish !== "all" && (
            <Badge variant="gold" className="flex items-center gap-1">
              <span>{selectedFinish}</span>
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => setSelectedFinish("all")}
              />
            </Badge>
          )}
          {selectedOccasion !== "all" && (
            <Badge variant="gold" className="flex items-center gap-1">
              <span>{selectedOccasion}</span>
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => setSelectedOccasion("all")}
              />
            </Badge>
          )}
          <button
            onClick={() => {
              setSelectedFinish("all");
              setSelectedOccasion("all");
            }}
            className="text-xs text-antique-gold underline ml-2"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-soft-cream/30 rounded-[14px] border border-[#E7DCC6]/60 p-8 space-y-3">
          <p className="font-serif text-2xl text-espresso">No designs match your filter</p>
          <p className="text-xs text-brown-text/80 max-w-sm mx-auto font-sans">
            Try resetting your filters or browsing another category to find your perfect piece.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedFinish("all");
              setSelectedOccasion("all");
            }}
          >
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
}
