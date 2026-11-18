"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Price } from "@/components/ui/Price";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { useToast } from "@/components/ui/Toast";
import { formatPrice } from "@/lib/utils";
import { PRODUCTS_DATA, COUPONS_DATA } from "@/lib/data/mockData";
import { ShoppingBag, ArrowRight, Trash2, Tag, Truck, ShieldCheck } from "lucide-react";

interface CartLineItem {
  id: string;
  productSlug: string;
  title: string;
  variantTitle: string;
  sku: string;
  price: number; // paise
  compareAtPrice?: number;
  image: string;
  quantity: number;
}

export default function CartPage() {
  const { showToast } = useToast();

  const [cartItems, setCartItems] = React.useState<CartLineItem[]>([
    {
      id: "item-1",
      productSlug: "kundan-jadau-choker-set",
      title: "Kundan Jadau Choker Set",
      variantTitle: "Antique Gold / Pearl White",
      sku: "PH-KND-001",
      price: 349900,
      compareAtPrice: 499900,
      image: "/products/kundan-jadau-choker-set-1.svg",
      quantity: 1,
    },
    {
      id: "item-2",
      productSlug: "ad-solitaire-statement-ring",
      title: "AD Solitaire Statement Ring",
      variantTitle: "Size 7 (17.3 mm)",
      sku: "PH-RNG-001-S7",
      price: 129900,
      compareAtPrice: 199900,
      image: "/products/ad-solitaire-statement-ring-1.svg",
      quantity: 1,
    },
  ]);

  const [couponCode, setCouponCode] = React.useState("");
  const [appliedCoupon, setAppliedCoupon] = React.useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = React.useState(0);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Free shipping threshold = ₹1,499 (149900 paise)
  const freeShippingThreshold = 149900;
  const isFreeShipping = subtotal >= freeShippingThreshold || appliedCoupon === "FREESHIP";
  const shippingFee = isFreeShipping || cartItems.length === 0 ? 0 : 9900;

  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const total = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleUpdateQuantity = (itemId: string, qty: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: qty } : item))
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
    showToast("Item removed from your bag.", "info");
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = couponCode.trim().toUpperCase();
    const found = COUPONS_DATA.find((c) => c.code === clean);

    if (!found) {
      showToast("Invalid coupon code. Try WELCOME10 or FESTIVE500.", "error");
      return;
    }

    if (subtotal < found.minOrderValue) {
      showToast(`Coupon requires minimum cart value of ${formatPrice(found.minOrderValue)}.`, "error");
      return;
    }

    let discount = 0;
    if (found.discountType === "percent") {
      discount = Math.round((subtotal * found.discountValue) / 100);
      if (found.maxDiscount) discount = Math.min(discount, found.maxDiscount);
    } else if (found.discountType === "flat") {
      discount = found.discountValue;
    }

    setDiscountAmount(discount);
    setAppliedCoupon(found.code);
    showToast(`Coupon ${found.code} applied successfully!`, "success");
  };

  return (
    <div className="min-h-screen flex flex-col bg-warm-white">
      <Header isOverHero={false} cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)} />

      <main className="flex-1 max-w-7xl mx-auto px-3 sm:px-6 md:px-8 py-4 sm:py-8 w-full">
        <Breadcrumbs items={[{ label: "Shopping Bag" }]} className="mb-6" />

        <div className="pb-4 border-b border-[#E7DCC6] mb-8">
          <h1 className="font-serif text-3xl md:text-4xl text-espresso">
            Your Shopping Bag ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
          </h1>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Items Column (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Free Shipping Progress Meter */}
              <div className="rounded-[14px] border border-gold/40 bg-soft-cream/60 p-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-sans">
                  <span className="font-medium text-espresso flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-antique-gold" />
                    {isFreeShipping ? (
                      <span className="text-emerald-800 font-semibold">You have unlocked Free Express Shipping!</span>
                    ) : (
                      <span>Add <strong>{formatPrice(amountToFreeShipping)}</strong> more to unlock Free India-wide Shipping</span>
                    )}
                  </span>
                  <span className="font-semibold text-antique-gold">{progressPercent}%</span>
                </div>
                <div className="w-full bg-[#E7DCC6] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-antique-gold h-full transition-all duration-500 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="rounded-[14px] border border-[#E7DCC6] bg-white divide-y divide-[#F1E8D8] shadow-subtle overflow-hidden">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-4 sm:p-6 flex gap-4 sm:gap-6 items-center">
                    {/* Thumbnail */}
                    <div className="relative aspect-[4/5] w-20 sm:w-24 rounded-lg overflow-hidden border border-[#E7DCC6] bg-soft-cream/40 flex-shrink-0">
                      <Image src={item.image} alt={item.title} fill className="object-cover" />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <Link
                        href={`/products/${item.productSlug}`}
                        className="font-serif text-base sm:text-lg font-medium text-espresso hover:text-antique-gold transition-colors block truncate"
                      >
                        {item.title}
                      </Link>
                      <p className="text-xs text-brown-text/70 font-sans">{item.variantTitle}</p>
                      <Price price={item.price} compareAtPrice={item.compareAtPrice} size="sm" />
                    </div>

                    {/* Stepper & Total */}
                    <div className="flex flex-col sm:flex-row items-end sm:items-center gap-3">
                      <QuantityStepper
                        value={item.quantity}
                        onChange={(qty) => handleUpdateQuantity(item.id, qty)}
                      />
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-1.5 text-brown-text/60 hover:text-red-600 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Summary Column (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Order Summary Card */}
              <div className="rounded-[14px] border border-[#E7DCC6] bg-white p-6 shadow-subtle space-y-4">
                <h2 className="font-serif text-2xl text-espresso border-b border-[#F1E8D8] pb-3">
                  Order Summary
                </h2>

                <div className="space-y-2.5 text-xs font-sans">
                  <div className="flex justify-between text-brown-text">
                    <span>Subtotal</span>
                    <span className="font-semibold text-espresso">{formatPrice(subtotal)}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-800 font-medium">
                      <span>Coupon Discount ({appliedCoupon})</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-brown-text">
                    <span>Shipping</span>
                    <span className="font-semibold text-espresso">
                      {shippingFee === 0 ? "FREE" : formatPrice(shippingFee)}
                    </span>
                  </div>

                  <div className="flex justify-between text-brown-text/70 pt-1">
                    <span>Estimated GST (3% included)</span>
                    <span>{formatPrice(Math.round((subtotal * 3) / 103))}</span>
                  </div>

                  <div className="border-t border-[#F1E8D8] pt-3 flex justify-between text-base font-bold text-espresso">
                    <span>Total Amount</span>
                    <span className="text-antique-gold">{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Coupon Input */}
                <form onSubmit={handleApplyCoupon} className="pt-2 flex gap-2">
                  <Input
                    placeholder="Coupon code (e.g. WELCOME10)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="h-10 text-xs uppercase"
                  />
                  <Button type="submit" variant="outline" size="sm" className="h-10 px-4">
                    Apply
                  </Button>
                </form>

                {/* Proceed to Checkout Button */}
                <Link href="/checkout" className="block pt-2">
                  <Button variant="primary" size="lg" className="w-full h-12 shadow-gold text-base font-semibold">
                    Proceed to Checkout <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </Link>

                {/* Trust Badges */}
                <div className="pt-4 border-t border-[#F1E8D8] flex items-center justify-around text-[10px] text-brown-text/70 font-sans">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-antique-gold" /> Anti-Tarnish
                  </span>
                  <span>•</span>
                  <span>7-Day Returns</span>
                  <span>•</span>
                  <span>COD Available</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 bg-soft-cream/30 rounded-[14px] border border-[#E7DCC6]/60 p-8 space-y-4 max-w-md mx-auto">
            <ShoppingBag className="w-12 h-12 text-gold/40 mx-auto" />
            <h2 className="font-serif text-2xl text-espresso">Your bag is empty</h2>
            <p className="text-xs text-brown-text/80 font-sans">
              Add statement rings, bridal chokers, or everyday hoops to get started.
            </p>
            <Link href="/collections">
              <Button variant="primary" size="default">
                Discover Jewellery
              </Button>
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
