"use client";

import * as React from "react";

export function AlukasNewsletter() {
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
      setEmail("");
    }
  };

  return (
    <section id="newsletter" className="w-full bg-white py-16 md:py-24 border-t border-[#F0F0F0]">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-[#222222] font-normal mb-3">
          Subscribe Newsletter
        </h2>
        <p className="text-xs md:text-sm text-[#777777] font-sans mb-8">
          Sign up to our Newsletter and get the discount code.
        </p>

        {submitted ? (
          <div className="p-4 bg-[#F5F5F5] text-xs font-semibold text-black max-w-md mx-auto">
            Thank you! You have successfully subscribed.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center justify-center max-w-xl mx-auto gap-3 sm:gap-0"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              required
              className="w-full sm:flex-1 py-3.5 px-5 text-xs text-[#222222] placeholder-[#999999] border border-[#222222] rounded-none focus:outline-none"
            />
            <button
              type="submit"
              className="w-full sm:w-auto py-3.5 px-8 bg-[#222222] text-white text-xs font-bold uppercase tracking-wider hover:bg-black transition-colors rounded-none whitespace-nowrap"
            >
              SUBSCRIBE
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
