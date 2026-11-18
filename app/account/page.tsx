"use client";

import * as React from "react";
import Link from "next/link";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { useToast } from "@/components/ui/Toast";
import { formatPrice } from "@/lib/utils";
import {
  Package,
  RotateCcw,
  MapPin,
  Heart,
  User,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Check,
} from "lucide-react";

export default function AccountPage() {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = React.useState<"orders" | "addresses" | "returns">("orders");
  const [returnModalOpen, setReturnModalOpen] = React.useState(false);
  const [returnReason, setReturnReason] = React.useState("size_issue");
  const [returnNotes, setReturnNotes] = React.useState("");

  const orders = [
    {
      id: "PH-ORD-9021",
      date: "18 Nov 2026",
      status: "SHIPPED",
      total: 431820,
      item: "Kundan Jadau Choker Set + 1 other",
      canReturn: true,
    },
    {
      id: "PH-ORD-8812",
      date: "04 Oct 2026",
      status: "DELIVERED",
      total: 189900,
      item: "Chandbali Festive Jhumkas",
      canReturn: false,
    },
  ];

  const handleRequestReturn = (e: React.FormEvent) => {
    e.preventDefault();
    setReturnModalOpen(false);
    showToast("Return request submitted! Our courier team will schedule pickup.", "success");
  };

  return (
    <div className="min-h-screen flex flex-col bg-warm-white">
      <Header isOverHero={false} />

      <main className="flex-1 max-w-7xl mx-auto px-3 sm:px-6 md:px-8 py-4 sm:py-8 w-full">
        <Breadcrumbs items={[{ label: "My Account" }]} className="mb-6" />

        {/* Profile Welcome Banner */}
        <div className="rounded-[16px] border border-[#E7DCC6] bg-white p-6 shadow-subtle mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-light-blush text-espresso flex items-center justify-center font-serif text-2xl font-semibold border border-blush/60">
              S
            </div>
            <div>
              <h1 className="font-serif text-2xl md:text-3xl text-espresso">
                Welcome, Simran Kaur
              </h1>
              <p className="text-xs text-brown-text/80 font-sans mt-0.5">
                simran.kaur@example.com • +91 98765 43210
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/account/wishlist">
              <Button variant="outline" size="sm">
                <Heart className="w-3.5 h-3.5 mr-1.5 text-antique-gold" /> Wishlist
              </Button>
            </Link>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-[#F1E8D8] pb-3 mb-6 text-xs font-sans">
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-4 py-2 rounded-full font-medium transition-colors ${
              activeTab === "orders"
                ? "bg-espresso text-white shadow-xs"
                : "text-brown-text hover:bg-soft-cream"
            }`}
          >
            My Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab("addresses")}
            className={`px-4 py-2 rounded-full font-medium transition-colors ${
              activeTab === "addresses"
                ? "bg-espresso text-white shadow-xs"
                : "text-brown-text hover:bg-soft-cream"
            }`}
          >
            Saved Addresses
          </button>
          <button
            onClick={() => setActiveTab("returns")}
            className={`px-4 py-2 rounded-full font-medium transition-colors ${
              activeTab === "returns"
                ? "bg-espresso text-white shadow-xs"
                : "text-brown-text hover:bg-soft-cream"
            }`}
          >
            Returns & Exchanges
          </button>
        </div>

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="space-y-4">
            {orders.map((ord) => (
              <div
                key={ord.id}
                className="rounded-[14px] border border-[#E7DCC6] bg-white p-5 shadow-subtle space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#F1E8D8] gap-2">
                  <div className="flex items-center gap-3">
                    <span className="font-sans font-bold text-sm text-espresso">
                      Order #{ord.id}
                    </span>
                    <span className="text-xs text-brown-text/60 font-sans">• Placed on {ord.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={ord.status === "DELIVERED" ? "success" : "gold"}>
                      {ord.status}
                    </Badge>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-sans">
                  <div>
                    <p className="font-medium text-espresso">{ord.item}</p>
                    <p className="text-brown-text/70 mt-0.5">Total Amount: {formatPrice(ord.total)}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link href="/track-order">
                      <Button variant="outline" size="sm">
                        Live Tracking <ChevronRight className="w-3.5 h-3.5 ml-1" />
                      </Button>
                    </Link>
                    {ord.canReturn && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setReturnModalOpen(true)}
                        className="text-antique-gold hover:text-deep-gold"
                      >
                        <RotateCcw className="w-3.5 h-3.5 mr-1" /> Return Item
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Addresses Tab */}
        {activeTab === "addresses" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-[14px] border border-gold/40 bg-white p-5 space-y-2 shadow-subtle relative">
              <span className="text-[10px] uppercase font-bold text-antique-gold bg-[#FAF1D9] px-2 py-0.5 rounded-full font-sans">
                Default Shipping Address
              </span>
              <p className="font-serif text-lg font-medium text-espresso pt-1">Simran Kaur</p>
              <p className="text-xs text-brown-text/80 font-sans leading-relaxed">
                Flat 402, Golden Heritage Residency, Mall Road<br />
                Amritsar, Punjab - 143001<br />
                Phone: +91 98765 43210
              </p>
            </div>
          </div>
        )}

        {/* Returns Tab */}
        {activeTab === "returns" && (
          <div className="rounded-[14px] border border-[#E7DCC6] bg-white p-6 shadow-subtle space-y-4">
            <h3 className="font-serif text-xl text-espresso">7-Day Hassle-Free Returns</h3>
            <p className="text-xs text-brown-text/80 font-sans leading-relaxed max-w-xl">
              We gladly accept returns and exchanges on unused artificial jewellery in its original
              anti-tarnish packaging with tags attached within 7 days of delivery.
            </p>
            <Button variant="primary" size="sm" onClick={() => setReturnModalOpen(true)}>
              <RotateCcw className="w-3.5 h-3.5 mr-1.5" /> Submit Return Request
            </Button>
          </div>
        )}

        {/* Return Request Modal */}
        <Dialog
          open={returnModalOpen}
          onClose={() => setReturnModalOpen(false)}
          title="Request Return or Exchange"
          description="Select your reason for return. Our reverse courier will pick up from your address."
        >
          <form onSubmit={handleRequestReturn} className="space-y-4 py-2 font-sans text-xs">
            <Select
              label="Reason for Return"
              value={returnReason}
              onChange={(e) => setReturnReason(e.target.value)}
            >
              <option value="size_issue">Ring / Bangle Size Doesn&apos;t Fit</option>
              <option value="color_preference">Preferred Different Finish / Color</option>
              <option value="changed_mind">No Longer Needed</option>
              <option value="transit_damage">Damaged in Transit</option>
            </Select>

            <Input
              label="Additional Notes"
              placeholder="Tell us what you'd like to exchange for or any comments..."
              value={returnNotes}
              onChange={(e) => setReturnNotes(e.target.value)}
            />

            <Button type="submit" variant="primary" size="lg" className="w-full">
              Confirm Return Request
            </Button>
          </form>
        </Dialog>
      </main>

      <Footer />
    </div>
  );
}
