"use client";

import * as React from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { MessageSquare, Sparkles, Check } from "lucide-react";

export function NewsletterSection() {
  const { showToast } = useToast();
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [whatsappConsent, setWhatsappConsent] = React.useState(true);
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setSubmitted(true);
    showToast("🎉 Welcome to Phabulous! Use coupon code WELCOME10 for 10% off.", "success");
  };

  return (
    <section className="py-20 px-4 md:px-8 bg-warm-white">
      <div className="max-w-3xl mx-auto rounded-[18px] border border-[#D6C2A3] bg-gradient-to-br from-[#FCFAF5] via-[#F3ECE1] to-[#EFE4DA] p-8 md:p-12 shadow-card text-center relative overflow-hidden">
        {/* Subtle decorative gold sparkle */}
        <div className="absolute top-4 right-6 text-gold/30">
          <Sparkles className="w-8 h-8" />
        </div>

        <span className="text-xs font-sans tracking-widest text-antique-gold uppercase font-semibold">
          The VIP Sparkle Club
        </span>

        <h2 className="font-serif text-3xl md:text-4xl text-espresso heading-wash mt-2">
          Enjoy 10% Off Your First Order
        </h2>

        <p className="text-sm text-brown-text/80 max-w-md mx-auto mt-2 font-sans">
          Subscribe for early access to festive launches, exclusive flash discounts,
          and curated jewellery styling guides.
        </p>

        {submitted ? (
          <div className="mt-8 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-sans text-sm inline-flex items-center gap-2">
            <Check className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span>You&apos;re in! Use coupon code <strong className="font-bold">WELCOME10</strong> at checkout for 10% off.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-4 max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 bg-white"
              />
              <Button type="submit" variant="primary" size="lg" className="h-12 sm:w-36 flex-shrink-0">
                Join Now
              </Button>
            </div>

            {/* Optional WhatsApp Opt-in */}
            <div className="pt-2 text-left space-y-2">
              <div className="flex items-center gap-2">
                <Input
                  type="tel"
                  placeholder="WhatsApp number (optional for early VIP drops)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-10 text-xs bg-white/90"
                />
              </div>

              <label className="flex items-start gap-2 text-xs text-brown-text/80 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={whatsappConsent}
                  onChange={(e) => setWhatsappConsent(e.target.checked)}
                  className="mt-0.5 rounded border-[#D8CCB6] text-antique-gold focus:ring-gold"
                />
                <span className="flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600 inline" />
                  Send me exclusive flash sale alerts and order updates on WhatsApp.
                </span>
              </label>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
