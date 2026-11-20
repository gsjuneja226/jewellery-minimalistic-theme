"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState("admin@phabulous.com");
  const [password, setPassword] = React.useState("••••••••••••");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push("/admin");
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-[16px] border border-[#E7DCC6] p-8 shadow-subtle space-y-6">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="relative h-12 w-48 mb-2">
            <Image
              src="/brand/newlogo.png"
              alt="Phabulous by Mitthat"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="text-[10px] font-sans uppercase tracking-widest text-brown-text font-bold bg-soft-cream px-2.5 py-1 rounded-full">
            Operations & Admin Portal
          </span>
          <p className="text-xs text-brown-text/80 font-sans mt-1">
            Sign in with authorized staff credentials to access orders, catalogue, and GST reports.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 font-sans">
          <div className="space-y-1">
            <label className="text-xs font-medium text-espresso block">
              Staff Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-brown-text/60 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-10 pl-9 pr-3 rounded-lg border border-[#E7DCC6] text-xs text-espresso focus:outline-none focus:border-espresso bg-soft-cream/30"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-espresso block">
              Security Key / Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-brown-text/60 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-10 pl-9 pr-3 rounded-lg border border-[#E7DCC6] text-xs text-espresso focus:outline-none focus:border-espresso bg-soft-cream/30"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-full bg-espresso text-white text-xs font-semibold hover:bg-espresso/95 transition-colors flex items-center justify-center gap-2 shadow-xs"
          >
            <span>{loading ? "Verifying..." : "Sign In to Admin Dashboard"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 border-t border-[#F1E8D8] text-center">
          <Link
            href="/"
            className="text-xs text-brown-text/80 hover:text-espresso font-sans"
          >
            ← Return to Storefront
          </Link>
        </div>
      </div>
    </div>
  );
}
