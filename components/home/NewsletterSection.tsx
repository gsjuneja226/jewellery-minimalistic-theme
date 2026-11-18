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
    showToast("Welcome to Phabulous! Use coupon code WELCOME10 for 10% off.", "success");
  };

  return (
    <section className="py-8 sm:py-14 md:py-20 px-3 sm:px-6 md:px-8 bg-warm-white">
      <div className="max-w-3xl mx-auto rounded-xl sm:rounded-[18px] border border-[#D6C2A3] bg-gradient-to-br from-[#FCFAF5] via-[#F3ECE1] to-[#EFE4DA] p-5 sm:p-8 md:p-12 shadow-card text-center relative overflow-hidden">
        {/* Subtle decorative gold sparkle */}
        <div className="absolute top-3 right-4 sm:top-4 sm:right-6 text-gold/30">
          <Sparkles className="w-6 h-6 sm:w-8 sm:h-8" />
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-espresso font-normal tracking-tight">
          Enjoy 10% Off Your First Order
        </h2>

        <p className="text-xs sm:text-sm text-brown-text/80 max-w-md mx-auto mt-2 font-sans">
          Early access to festive launches & exclusive flash discounts.
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
