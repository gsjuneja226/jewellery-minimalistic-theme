"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Dialog } from "@/components/ui/Dialog";
import { useToast } from "@/components/ui/Toast";
import { formatPrice } from "@/lib/utils";
import { ShieldCheck, Lock, Clock, CreditCard, Banknote, Check } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { showToast } = useToast();

  // 15-minute stock reservation timer
  const [timeLeft, setTimeLeft] = React.useState(15 * 60);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Form states
  const [fullName, setFullName] = React.useState("Simran Kaur");
  const [phone, setPhone] = React.useState("9876543210");
  const [email, setEmail] = React.useState("simran.kaur@example.com");
  const [addressLine1, setAddressLine1] = React.useState("Flat 402, Golden Heritage Residency");
  const [addressLine2, setAddressLine2] = React.useState("Mall Road");
  const [pincode, setPincode] = React.useState("143001");
  const [city, setCity] = React.useState("Amritsar");
  const [state, setState] = React.useState("Punjab");
  const [paymentMethod, setPaymentMethod] = React.useState<"razorpay" | "cod">("razorpay");

  // COD OTP Modal states
  const [showCodModal, setShowCodModal] = React.useState(false);
  const [codOtp, setCodOtp] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Cart summary
  const subtotal = 479800; // paise (₹4,798)
  const discount = 47980; // 10% WELCOME10 discount
  const shippingFee = 0; // free above threshold
  const codFee = paymentMethod === "cod" ? 9900 : 0;
  const totalAmount = subtotal - discount + shippingFee + codFee;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !pincode || !addressLine1) {
      showToast("Please fill in all required shipping address fields.", "error");
      return;
    }

    if (paymentMethod === "cod") {
      setShowCodModal(true);
      return;
    }

    // Process Online Razorpay flow
    setIsSubmitting(true);
    setTimeout(() => {
      const orderId = `ORD-${Date.now().toString().slice(-6)}`;
      showToast("Payment verified successfully!", "success");
      router.push(`/order/${orderId}/confirmation`);
    }, 1200);
  };

  const handleVerifyCodOtp = () => {
    if (codOtp.trim().length !== 4 && codOtp.trim() !== "1234") {
      showToast("Please enter valid 4-digit OTP sent to your mobile (use 1234 in demo).", "error");
      return;
    }

    setShowCodModal(false);
    setIsSubmitting(true);
    setTimeout(() => {
      const orderId = `ORD-${Date.now().toString().slice(-6)}`;
      showToast("Cash on Delivery verified with OTP!", "success");
      router.push(`/order/${orderId}/confirmation`);
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col bg-warm-white">
      <Header isOverHero={false} />

      <main className="flex-1 max-w-7xl mx-auto px-4 md:px-8 py-8 w-full">
        <Breadcrumbs
          items={[{ label: "Cart", href: "/cart" }, { label: "Checkout" }]}
          className="mb-6"
        />

        {/* 15-Minute Stock Reservation Banner */}
        <div className="mb-8 rounded-[14px] border border-gold/40 bg-[#FAF1D9] p-3 text-center text-xs font-sans text-brown-text flex items-center justify-center gap-2">
          <Clock className="w-4 h-4 text-antique-gold animate-pulse" />
          <span>
            Jewellery stock is reserved for your bag for <strong>{formatTimer(timeLeft)}</strong> minutes.
          </span>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Form: Shipping & Payment (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. Contact & Shipping Address */}
            <div className="rounded-[14px] border border-[#E7DCC6] bg-white p-6 shadow-subtle space-y-4">
              <h2 className="font-serif text-2xl text-espresso border-b border-[#F1E8D8] pb-3">
                1. Delivery Address
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
                <Input
                  label="Phone Number (for SMS & OTP)"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Input
                label="House / Flat / Building / Street"
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
                required
              />

              <Input
                label="Apartment, suite, landmark (optional)"
                value={addressLine2}
                onChange={(e) => setAddressLine2(e.target.value)}
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input
                  label="Pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  required
                />
                <Input
                  label="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
                <Input
                  label="State"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* 2. Payment Method */}
            <div className="rounded-[14px] border border-[#E7DCC6] bg-white p-6 shadow-subtle space-y-4">
              <h2 className="font-serif text-2xl text-espresso border-b border-[#F1E8D8] pb-3">
                2. Payment Method
              </h2>

              <div className="space-y-3">
                {/* Razorpay Online */}
                <label
                  className={`flex items-start gap-3 p-4 rounded-[12px] border cursor-pointer transition-all ${
                    paymentMethod === "razorpay"
                      ? "border-antique-gold bg-[#FAF1D9]/40 shadow-xs"
                      : "border-[#E7DCC6] bg-white hover:border-gold"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="razorpay"
                    checked={paymentMethod === "razorpay"}
                    onChange={() => setPaymentMethod("razorpay")}
                    className="mt-1 text-antique-gold focus:ring-gold"
                  />
                  <div className="flex-1 text-xs font-sans">
                    <span className="font-semibold text-espresso flex items-center gap-1.5 text-sm">
                      <CreditCard className="w-4 h-4 text-antique-gold" /> Online Payment (UPI, Cards, NetBanking, Wallets)
                    </span>
                    <p className="text-brown-text/70 mt-1">
                      Fast, seamless payment with instant order confirmation and automated tracking updates.
                    </p>
                  </div>
                </label>

                {/* COD with OTP */}
                <label
                  className={`flex items-start gap-3 p-4 rounded-[12px] border cursor-pointer transition-all ${
                    paymentMethod === "cod"
                      ? "border-antique-gold bg-[#FAF1D9]/40 shadow-xs"
                      : "border-[#E7DCC6] bg-white hover:border-gold"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="mt-1 text-antique-gold focus:ring-gold"
                  />
                  <div className="flex-1 text-xs font-sans">
                    <span className="font-semibold text-espresso flex items-center gap-1.5 text-sm">
                      <Banknote className="w-4 h-4 text-antique-gold" /> Cash on Delivery (COD) (+₹99 handling)
                    </span>
                    <p className="text-brown-text/70 mt-1">
                      Pay cash at your doorstep. Verified via an instant 4-digit SMS OTP to prevent cancellations.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Summary & Place Order (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-[14px] border border-[#E7DCC6] bg-white p-6 shadow-subtle space-y-4">
              <h2 className="font-serif text-2xl text-espresso border-b border-[#F1E8D8] pb-3">
                Order Review
              </h2>

              <div className="space-y-3 divide-y divide-[#F1E8D8]">
                {/* Sample items */}
                <div className="pt-2 flex items-center gap-3 text-xs font-sans">
                  <div className="relative aspect-[4/5] w-12 rounded overflow-hidden border border-[#E7DCC6] flex-shrink-0">
                    <Image src="/products/kundan-jadau-choker-set-1.svg" alt="Item" fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-espresso truncate">Kundan Jadau Choker Set</p>
                    <p className="text-[11px] text-brown-text/70">Qty: 1</p>
                  </div>
                  <span className="font-semibold text-espresso">{formatPrice(349900)}</span>
                </div>

                <div className="pt-3 flex items-center gap-3 text-xs font-sans">
                  <div className="relative aspect-[4/5] w-12 rounded overflow-hidden border border-[#E7DCC6] flex-shrink-0">
                    <Image src="/products/ad-solitaire-statement-ring-1.svg" alt="Item" fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-espresso truncate">AD Solitaire Statement Ring</p>
                    <p className="text-[11px] text-brown-text/70">Qty: 1</p>
                  </div>
                  <span className="font-semibold text-espresso">{formatPrice(129900)}</span>
                </div>
              </div>

              {/* Breakdown */}
              <div className="border-t border-[#F1E8D8] pt-4 space-y-2 text-xs font-sans">
                <div className="flex justify-between text-brown-text">
                  <span>Subtotal</span>
                  <span className="font-semibold text-espresso">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-emerald-800 font-medium">
                  <span>Coupon Discount (WELCOME10)</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
                <div className="flex justify-between text-brown-text">
                  <span>Express Shipping</span>
                  <span className="font-semibold text-espresso">FREE</span>
                </div>
                {paymentMethod === "cod" && (
                  <div className="flex justify-between text-brown-text">
                    <span>COD Verification Fee</span>
                    <span className="font-semibold text-espresso">{formatPrice(codFee)}</span>
                  </div>
                )}
                <div className="border-t border-[#F1E8D8] pt-3 flex justify-between text-lg font-bold text-espresso">
                  <span>Grand Total</span>
                  <span className="text-antique-gold">{formatPrice(totalAmount)}</span>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isSubmitting}
                className="w-full h-12 shadow-gold text-base font-semibold"
              >
                {isSubmitting ? (
                  "Authorizing..."
                ) : paymentMethod === "cod" ? (
                  "Verify with OTP & Place COD Order"
                ) : (
                  `Pay ${formatPrice(totalAmount)} with Razorpay`
                )}
              </Button>

              <div className="text-center pt-2 text-[11px] text-brown-text/70 font-sans flex items-center justify-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-antique-gold" /> 256-bit Bank Grade Encrypted Checkout
              </div>
            </div>
          </div>
        </form>

        {/* COD Phone OTP Verification Dialog */}
        <Dialog
          open={showCodModal}
          onClose={() => setShowCodModal(false)}
          title="Verify Cash on Delivery"
          description={`We sent a 4-digit verification code to +91 ${phone}. Enter it below to confirm your COD order.`}
        >
          <div className="space-y-4 py-2 font-sans">
            <Input
              label="Enter 4-Digit OTP (Use 1234 for demo)"
              maxLength={4}
              value={codOtp}
              onChange={(e) => setCodOtp(e.target.value)}
              placeholder="1234"
              className="text-center text-lg tracking-widest font-mono font-bold"
            />
            <Button
              type="button"
              variant="primary"
              size="lg"
              onClick={handleVerifyCodOtp}
              className="w-full"
            >
              Verify & Confirm Order
            </Button>
          </div>
        </Dialog>
      </main>

      <Footer />
    </div>
  );
}
