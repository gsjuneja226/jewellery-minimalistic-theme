"use client";

import * as React from "react";
import { X } from "lucide-react";

export function NewsletterModal() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [doNotShow, setDoNotShow] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [subscribed, setSubscribed] = React.useState(false);

  React.useEffect(() => {
    // Disable popup modal on mobile screens (< 768px)
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      return;
    }
    const hidden = localStorage.getItem("alukas_newsletter_hidden");
    if (!hidden) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    if (doNotShow) {
      localStorage.setItem("alukas_newsletter_hidden", "true");
    }
    setIsOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        handleClose();
      }, 1500);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={handleClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-white p-8 md:p-10 shadow-2xl z-10 text-center animate-in zoom-in-95 duration-200">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-[#888888] hover:text-black transition-colors"
          aria-label="Close newsletter popup"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-2xl md:text-3xl font-serif text-[#222222] font-normal mb-3">
          Join our family
        </h3>
        <p className="text-xs md:text-sm text-[#666666] leading-relaxed mb-6 max-w-xs mx-auto">
          Sign up to get all the latest fashion news, website updates, offers and promos.
        </p>

        {subscribed ? (
          <div className="p-4 bg-[#F5F5F5] text-xs font-semibold text-black">
            Thank you for subscribing!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 text-xs border border-[#E5E5E5] rounded-none focus:outline-none focus:border-black placeholder-[#999999]"
            />
            <button
              type="submit"
              className="w-full py-3.5 bg-[#222222] text-white text-xs uppercase font-bold tracking-wider hover:bg-black transition-colors"
            >
              Subscribe
            </button>
          </form>
        )}

        <div className="mt-5 flex items-center justify-center gap-2 text-xs text-[#777777]">
          <input
            type="checkbox"
            id="dont-show"
            checked={doNotShow}
            onChange={(e) => setDoNotShow(e.target.checked)}
            className="rounded-none border-[#CCCCCC] text-black focus:ring-black"
          />
          <label htmlFor="dont-show" className="cursor-pointer select-none">
            Do not show this window
          </label>
        </div>
      </div>
    </div>
  );
}
