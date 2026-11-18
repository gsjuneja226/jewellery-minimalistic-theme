"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Price } from "@/components/ui/Price";
import { Rating } from "@/components/ui/Rating";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { useToast } from "@/components/ui/Toast";
import { ProductCard } from "@/components/product/ProductCard";
import type { MockProduct, MockReview } from "@/lib/data/mockData";
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Gift,
  Heart,
  Share2,
  ChevronDown,
  ChevronUp,
  MapPin,
  Sparkles,
  ShoppingBag,
} from "lucide-react";

export interface ProductDetailClientProps {
  product: MockProduct;
  relatedProducts: MockProduct[];
  reviews: MockReview[];
}

export function ProductDetailClient({
  product,
  relatedProducts,
  reviews,
}: ProductDetailClientProps) {
  const { showToast } = useToast();

  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);
  const [selectedVariantIndex, setSelectedVariantIndex] = React.useState(0);
  const [quantity, setQuantity] = React.useState(1);
  const [giftWrap, setGiftWrap] = React.useState(false);
  const [giftMessage, setGiftMessage] = React.useState("");
  const [pincode, setPincode] = React.useState("");
  const [pincodeStatus, setPincodeStatus] = React.useState<string | null>(null);
  const [isWishlisted, setIsWishlisted] = React.useState(false);

  // Accordion states
  const [openAccordion, setOpenAccordion] = React.useState<string | null>("details");

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const selectedVariant = product.variants[selectedVariantIndex] || product.variants[0];

  // Save to recently viewed in localStorage
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem("phabulous_recently_viewed");
      const list: string[] = stored ? JSON.parse(stored) : [];
      const updated = [product.slug, ...list.filter((s) => s !== product.slug)].slice(0, 8);
      localStorage.setItem("phabulous_recently_viewed", JSON.stringify(updated));
    } catch (e) {
      // ignore in tests
    }
  }, [product.slug]);

  // Pincode delivery estimator
  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      setPincodeStatus("Eligible for Fast Express Delivery (Estimated 2-4 business days)");
    } else {
      setPincodeStatus("Please enter a valid 6-digit Indian pincode.");
    }
  };

  const handleAddToCart = () => {
    // Add to cart toast
    showToast(`Added ${quantity} × ${product.title} to your bag!`, "success");
  };

  const handleToggleWishlist = () => {
    const next = !isWishlisted;
    setIsWishlisted(next);
    showToast(next ? "Added to your wishlist!" : "Removed from your wishlist.", "info");
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: product.subtitle,
          url: window.location.href,
        });
      } catch (e) {
        // user cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast("Product link copied to clipboard!", "info");
    }
  };

  return (
    <div className="space-y-16">
      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Gallery Column (7 cols on lg) */}
        <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto sm:w-24 flex-shrink-0">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedImageIndex(idx)}
                className={`relative aspect-[4/5] w-20 sm:w-full rounded-[10px] overflow-hidden border transition-all ${
                  selectedImageIndex === idx
                    ? "border-antique-gold ring-2 ring-antique-gold/30 shadow-sm"
                    : "border-[#E7DCC6] opacity-70 hover:opacity-100"
                }`}
              >
                <Image src={img} alt={`${product.title} thumb ${idx + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>

          {/* Main Large Image */}
          <div className="relative flex-1 aspect-[4/5] rounded-[16px] overflow-hidden border border-[#E7DCC6] bg-soft-cream/30 shadow-subtle group">
            <Image
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Top action icons */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
              <button
                type="button"
                onClick={handleToggleWishlist}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-espresso shadow-sm backdrop-blur-xs hover:scale-105 transition-transform"
                aria-label="Wishlist"
              >
                <Heart
                  className={`w-5 h-5 ${
                    isWishlisted ? "fill-antique-gold text-antique-gold" : "text-espresso"
                  }`}
                />
              </button>
              <button
                type="button"
                onClick={handleShare}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-espresso shadow-sm backdrop-blur-xs hover:scale-105 transition-transform"
                aria-label="Share"
              >
                <Share2 className="w-5 h-5 text-espresso" />
              </button>
            </div>
          </div>
        </div>

        {/* Product Details & Purchase Controls (5 cols on lg) */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-start">
          {/* Title & Ratings */}
          <div className="space-y-2 border-b border-[#F1E8D8] pb-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-sans tracking-widest text-antique-gold uppercase font-semibold">
                {product.occasion} • {product.materialFinish}
              </span>
              <span className="text-xs font-sans text-brown-text/60">SKU: {selectedVariant.sku}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl text-espresso font-normal">
              {product.title}
            </h1>

            <p className="text-sm font-sans text-brown-text/80">{product.subtitle}</p>

            <div className="pt-1 flex items-center gap-3">
              <Rating rating={product.rating} reviewsCount={product.reviewsCount} />
              <span className="text-xs text-brown-text/60 font-sans">• Highly Rated</span>
            </div>
          </div>

          {/* Pricing & Stock */}
          <div className="space-y-2">
            <Price
              price={selectedVariant.price}
              compareAtPrice={selectedVariant.compareAtPrice}
              size="lg"
            />
            <p className="text-xs font-sans text-brown-text/70">
              Inclusive of all taxes (GST 3% included). Free express shipping on orders over ₹1,499.
            </p>

            {selectedVariant.stock <= 4 && (
              <div className="pt-1">
                <Badge variant="stockLow" className="text-xs">
                  Only {selectedVariant.stock} left in stock - order soon
                </Badge>
              </div>
            )}
          </div>

          {/* Variants Selector */}
          {product.variants.length > 1 && (
            <div className="space-y-2.5 pt-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-espresso font-sans">
                Select Option: <span className="font-normal text-brown-text">{selectedVariant.title}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v, idx) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setSelectedVariantIndex(idx)}
                    className={`px-4 py-2 rounded-full text-xs font-sans font-medium border transition-all ${
                      selectedVariantIndex === idx
                        ? "border-antique-gold bg-antique-gold text-white shadow-xs"
                        : "border-[#E7DCC6] bg-white text-espresso hover:border-gold"
                    }`}
                  >
                    {v.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Add to Cart Controls */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              <QuantityStepper value={quantity} onChange={setQuantity} min={1} max={selectedVariant.stock} />
              <Button
                variant="primary"
                size="lg"
                onClick={handleAddToCart}
                className="flex-1 h-12 text-base font-semibold shadow-gold"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Add to Bag
              </Button>
            </div>
          </div>

          {/* Gift Wrap Option */}
          <div className="rounded-[14px] border border-gold/40 bg-soft-cream/40 p-4 space-y-3">
            <label className="flex items-start gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={giftWrap}
                onChange={(e) => setGiftWrap(e.target.checked)}
                className="mt-0.5 rounded border-[#D8CCB6] text-antique-gold focus:ring-gold"
              />
              <div className="text-xs">
                <span className="font-semibold text-espresso flex items-center gap-1.5">
                  <Gift className="w-4 h-4 text-antique-gold" /> Add Luxury Keepsake Gift Box (+₹99)
                </span>
                <p className="text-brown-text/70 mt-0.5">
                  Includes blush satin ribbon wrap, luxury velvet pouch, and personalized handwritten card.
                </p>
              </div>
            </label>

            {giftWrap && (
              <textarea
                placeholder="Write your personal gift message here..."
                value={giftMessage}
                onChange={(e) => setGiftMessage(e.target.value)}
                rows={2}
                className="w-full text-xs rounded-lg border border-[#E7DCC6] p-2.5 font-sans bg-white focus:outline-none focus:ring-1 focus:ring-gold"
              />
            )}
          </div>

          {/* Pincode Serviceability Check */}
          <div className="space-y-2 pt-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-espresso font-sans flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-antique-gold" /> Check Delivery to Pincode
            </span>
            <form onSubmit={handlePincodeCheck} className="flex gap-2">
              <input
                type="text"
                placeholder="Enter 6-digit Pincode"
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="h-10 w-44 rounded-[10px] border border-[#E7DCC6] px-3 text-xs font-sans bg-white focus:outline-none focus:border-gold"
              />
              <Button type="submit" variant="outline" size="sm" className="h-10 px-4">
                Verify
              </Button>
            </form>
            {pincodeStatus && (
              <p className="text-xs text-antique-gold font-sans font-medium">{pincodeStatus}</p>
            )}
          </div>

          {/* Information Accordions */}
          <div className="border-t border-[#F1E8D8] pt-4 space-y-3">
            {/* 1. Details & Specs */}
            <div className="border border-[#E7DCC6]/70 rounded-[12px] overflow-hidden bg-white">
              <button
                type="button"
                onClick={() => toggleAccordion("details")}
                className="w-full flex items-center justify-between p-3.5 text-left font-serif text-lg text-espresso"
              >
                <span>Product Details & Specifications</span>
                {openAccordion === "details" ? <ChevronUp className="w-4 h-4 text-gold" /> : <ChevronDown className="w-4 h-4 text-gold" />}
              </button>
              {openAccordion === "details" && (
                <div className="p-3.5 pt-0 text-xs font-sans text-brown-text/80 space-y-2 border-t border-[#F1E8D8]">
                  <p>{product.description}</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li><strong>Material Finish:</strong> {product.materialFinish}</li>
                    <li><strong>Stone Type:</strong> {product.stoneType}</li>
                    <li><strong>HSN Code:</strong> {product.hsnCode} (Imitation Jewellery)</li>
                    <li><strong>GST:</strong> Included ({product.gstRate / 100}%)</li>
                  </ul>
                </div>
              )}
            </div>

            {/* 2. Care Guide */}
            <div className="border border-[#E7DCC6]/70 rounded-[12px] overflow-hidden bg-white">
              <button
                type="button"
                onClick={() => toggleAccordion("care")}
                className="w-full flex items-center justify-between p-3.5 text-left font-serif text-lg text-espresso"
              >
                <span>Anti-Tarnish Care Guide</span>
                {openAccordion === "care" ? <ChevronUp className="w-4 h-4 text-gold" /> : <ChevronDown className="w-4 h-4 text-gold" />}
              </button>
              {openAccordion === "care" && (
                <div className="p-3.5 pt-0 text-xs font-sans text-brown-text/80 space-y-1.5 border-t border-[#F1E8D8]">
                  <p>{product.careInstructions}</p>
                  <p className="text-antique-gold font-medium">Keep dry • Avoid perfume directly on metal • Store in velvet pouch</p>
                </div>
              )}
            </div>

            {/* 3. Shipping & Returns */}
            <div className="border border-[#E7DCC6]/70 rounded-[12px] overflow-hidden bg-white">
              <button
                type="button"
                onClick={() => toggleAccordion("shipping")}
                className="w-full flex items-center justify-between p-3.5 text-left font-serif text-lg text-espresso"
              >
                <span>Shipping & 7-Day Easy Returns</span>
                {openAccordion === "shipping" ? <ChevronUp className="w-4 h-4 text-gold" /> : <ChevronDown className="w-4 h-4 text-gold" />}
              </button>
              {openAccordion === "shipping" && (
                <div className="p-3.5 pt-0 text-xs font-sans text-brown-text/80 space-y-1.5 border-t border-[#F1E8D8]">
                  <p>• Free shipping on prepaid and COD orders above ₹1,499.</p>
                  <p>• Dispatch within 24 hours via premium express couriers (Bluedart, Delhivery, DTDC).</p>
                  <p>• 7-day hassle-free returns & exchange policy on unworn pieces with tags intact.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="border-t border-[#F1E8D8] pt-12 space-y-8">
        <div className="flex flex-col sm:flex-row items-baseline justify-between">
          <div>
            <h3 className="font-serif text-2xl md:text-3xl text-espresso">
              Customer Reviews ({reviews.length})
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <Rating rating={product.rating} />
              <span className="text-xs font-sans text-brown-text">
                {product.rating} out of 5 based on {product.reviewsCount} verified purchases
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div key={rev.id} className="rounded-[14px] border border-[#E7DCC6] bg-white p-5 space-y-3 shadow-subtle">
              <div className="flex items-center justify-between">
                <Rating rating={rev.rating} size="sm" />
                <span className="text-[11px] font-sans text-brown-text/60">{rev.date}</span>
              </div>
              <h4 className="font-serif text-base font-medium text-espresso">&ldquo;{rev.title}&rdquo;</h4>
              <p className="text-xs font-sans text-brown-text/80 italic">{rev.comment}</p>
              <div className="pt-2 text-[11px] font-sans text-brown-text/70 flex justify-between">
                <span>{rev.authorName} ({rev.city})</span>
                {rev.isVerifiedPurchase && <span className="text-emerald-700 font-medium">Verified Buyer</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Complete the Look / Related Products */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-[#F1E8D8] pt-12 space-y-6">
          <div className="flex flex-col items-center text-center">
            <h3 className="font-serif text-3xl text-espresso font-normal tracking-tight">
              Complete the Look
            </h3>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* Sticky Mobile Add-to-Cart Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E7DCC6] p-3 shadow-2xl flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-serif text-espresso font-medium line-clamp-1">{product.title}</p>
          <Price price={selectedVariant.price} size="sm" />
        </div>
        <Button variant="primary" size="default" onClick={handleAddToCart} className="flex-shrink-0">
          <ShoppingBag className="w-4 h-4 mr-1.5" />
          Add to Bag
        </Button>
      </div>
    </div>
  );
}
