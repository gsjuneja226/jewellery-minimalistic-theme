"use client";

import * as React from "react";
import Image from "next/image";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";
import { formatPrice } from "@/lib/utils";
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Search,
  ExternalLink,
} from "lucide-react";

export default function TrackOrderPage() {
  const { showToast } = useToast();
  const [orderNumber, setOrderNumber] = React.useState("PH-ORD-9021");
  const [contact, setContact] = React.useState("simran.kaur@example.com");
  const [hasSearched, setHasSearched] = React.useState(true);

  const trackingTimeline = [
    {
      title: "Order Confirmed & Payment Verified",
      time: "18 Nov 2026, 02:15 PM",
      desc: "Order received and stock reserved.",
      done: true,
    },
    {
      title: "Quality Inspected & Packed",
      time: "18 Nov 2026, 05:40 PM",
      desc: "Jewellery sanitised, placed in protective anti-tarnish velvet pouch and sealed.",
      done: true,
    },
    {
      title: "Handed over to Express Courier (BlueDart)",
      time: "19 Nov 2026, 09:20 AM",
      desc: "AWB #BD-9823412 generated. Departed regional central sorting facility.",
      done: true,
    },
    {
      title: "In Transit - Out for Delivery",
      time: "Expected Today by 06:00 PM",
      desc: "Package arrived at destination hub. Courier delivery agent assigned.",
      done: true,
      current: true,
    },
    {
      title: "Delivered",
      time: "Pending",
      desc: "Recipient signature upon handover.",
      done: false,
    },
  ];

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber || !contact) {
      showToast("Please enter Order Number and Email or Phone.", "error");
      return;
    }
    setHasSearched(true);
    showToast("Loaded latest tracking status!", "success");
  };

  return (
    <div className="min-h-screen flex flex-col bg-warm-white">
      <Header isOverHero={false} />

      <main className="flex-1 max-w-4xl mx-auto px-4 md:px-8 py-8 w-full">
        <Breadcrumbs items={[{ label: "Track Your Order" }]} className="mb-6" />

        <div className="flex flex-col items-center text-center mb-8">
          <h1 className="font-serif text-3xl md:text-4xl text-espresso font-normal tracking-tight">
            Track Your Order
          </h1>
          <p className="text-xs md:text-sm text-brown-text/80 font-sans max-w-md mt-2">
            Enter your order number along with the email address or phone used during checkout.
          </p>
        </div>

        {/* Lookup Form */}
        <div className="rounded-[14px] border border-[#E7DCC6] bg-white p-6 shadow-subtle mb-10">
          <form onSubmit={handleLookup} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Input
              label="Order Number"
              placeholder="PH-ORD-9021"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              required
            />
            <Input
              label="Email or Mobile Number"
              placeholder="e.g. simran@example.com"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
            <div className="flex items-end">
              <Button type="submit" variant="primary" size="lg" className="w-full h-11">
                <Search className="w-4 h-4 mr-1.5" /> Track Status
              </Button>
            </div>
          </form>
        </div>

        {/* Tracking Results View */}
        {hasSearched && (
          <div className="rounded-[16px] border border-gold/40 bg-white p-6 sm:p-8 shadow-card space-y-8">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#F1E8D8] gap-3">
              <div>
                <span className="text-xs font-sans font-bold text-espresso">Order #{orderNumber}</span>
                <p className="text-xs text-brown-text/70 font-sans">
                  Courier: <strong>BlueDart Express Air</strong> (AWB: BD-9823412)
                </p>
              </div>
              <Badge variant="gold" className="text-xs self-start sm:self-auto">
                <Truck className="w-3.5 h-3.5 mr-1" /> Out for Delivery
              </Badge>
            </div>

            {/* Visual Timeline */}
            <div className="space-y-6">
              <h3 className="font-serif text-xl text-espresso">Shipment Progress</h3>

              <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E7DCC6]">
                {trackingTimeline.map((step, idx) => (
                  <div key={idx} className="relative flex items-start gap-4 text-xs font-sans">
                    {/* Circle Node */}
                    <div
                      className={`absolute -left-6 top-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                        step.current
                          ? "border-antique-gold bg-antique-gold text-white ring-4 ring-antique-gold/20"
                          : step.done
                          ? "border-emerald-600 bg-emerald-600 text-white"
                          : "border-[#D8CCB6] bg-white text-transparent"
                      }`}
                    >
                      {step.done && <CheckCircle2 className="w-3 h-3 stroke-[3]" />}
                    </div>

                    <div className="flex-1 space-y-0.5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <span className={`font-semibold ${step.current ? "text-antique-gold text-sm" : "text-espresso"}`}>
                          {step.title}
                        </span>
                        <span className="text-[11px] text-brown-text/60">{step.time}</span>
                      </div>
                      <p className="text-brown-text/80 text-[11px]">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Destination Info */}
            <div className="p-4 rounded-xl bg-soft-cream/60 border border-[#E7DCC6] text-xs font-sans space-y-1">
              <span className="font-semibold text-espresso flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-antique-gold" /> Destination Address
              </span>
              <p className="text-brown-text">
                Simran Kaur — Flat 402, Golden Heritage Residency, Mall Road, Amritsar, Punjab (143001)
              </p>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
