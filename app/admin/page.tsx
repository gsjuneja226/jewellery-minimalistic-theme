"use client";

import * as React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";
import { PRODUCTS_DATA } from "@/lib/data/mockData";
import {
  TrendingUp,
  ShoppingBag,
  Users,
  AlertTriangle,
  ArrowRight,
  Package,
  CheckCircle2,
} from "lucide-react";

export default function AdminDashboardPage() {
  const lowStockItems = PRODUCTS_DATA.flatMap((p) =>
    p.variants
      .filter((v) => v.stock <= 8)
      .map((v) => ({ ...v, productTitle: p.title, productSlug: p.slug }))
  ).slice(0, 5);

  const sampleOrders = [
    { id: "PH-ORD-9021", customer: "Simran Kaur", city: "Amritsar", amount: 349900, status: "CONFIRMED", time: "12 mins ago" },
    { id: "PH-ORD-9020", customer: "Pooja Malhotra", city: "Mumbai", amount: 179900, status: "PACKED", time: "45 mins ago" },
    { id: "PH-ORD-9019", customer: "Ananya Sharma", city: "Delhi", amount: 259800, status: "SHIPPED", time: "2 hrs ago" },
    { id: "PH-ORD-9018", customer: "Harpreet Gill", city: "Chandigarh", amount: 189900, status: "DELIVERED", time: "5 hrs ago" },
    { id: "PH-ORD-9017", customer: "Deepika Joshi", city: "Jaipur", amount: 89900, status: "PENDING_PAYMENT", time: "6 hrs ago" },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E7DCC6]">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl text-espresso">
            Operational Dashboard
          </h1>
          <p className="text-xs text-brown-text/80 font-sans mt-1">
            Real-time store performance, fulfillment queues, and inventory health.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/products/new"
            className="px-4 py-2 rounded-full bg-espresso text-white text-xs font-sans font-medium hover:bg-espresso/90 transition-colors shadow-xs"
          >
            + Add New Product
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider font-sans text-brown-text/80">
              Total Revenue
            </span>
            <div className="h-8 w-8 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold font-sans text-espresso">
              {formatPrice(48560000)}
            </div>
            <p className="text-xs text-emerald-700 font-sans mt-0.5 font-medium">
              +18.4% vs last 30 days
            </p>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider font-sans text-brown-text/80">
              Orders Placed
            </span>
            <div className="h-8 w-8 rounded-full bg-[#FAF1D9] text-antique-gold flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold font-sans text-espresso">
              184 Orders
            </div>
            <p className="text-xs text-brown-text/70 font-sans mt-0.5">
              Avg Order Value: {formatPrice(263900)}
            </p>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider font-sans text-brown-text/80">
              Active Customers
            </span>
            <div className="h-8 w-8 rounded-full bg-light-blush text-espresso flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold font-sans text-espresso">
              21,450+
            </div>
            <p className="text-xs text-brown-text/70 font-sans mt-0.5">
              34% repeat purchase rate
            </p>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider font-sans text-brown-text/80">
              Low Stock Alerts
            </span>
            <div className="h-8 w-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold font-sans text-red-600">
              {lowStockItems.length} Variants
            </div>
            <p className="text-xs text-red-600/80 font-sans mt-0.5">
              Requires warehouse restocking
            </p>
          </div>
        </Card>
      </div>

      {/* Main Dashboard Rows */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Recent Orders (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl text-espresso">
              Recent Customer Orders
            </h2>
            <Link
              href="/admin/orders"
              className="text-xs text-antique-gold hover:text-deep-gold font-medium flex items-center gap-1 font-sans"
            >
              View all orders <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="rounded-[14px] border border-[#E7DCC6] bg-white overflow-hidden shadow-subtle">
            <div className="divide-y divide-[#F1E8D8]">
              {sampleOrders.map((ord) => (
                <div key={ord.id} className="p-4 flex items-center justify-between gap-4 hover:bg-soft-cream/30 transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-sans font-bold text-xs text-espresso">
                        {ord.id}
                      </span>
                      <span className="text-xs text-brown-text">
                        • {ord.customer} ({ord.city})
                      </span>
                    </div>
                    <p className="text-[11px] text-brown-text/60 font-sans">
                      {ord.time}
                    </p>
                  </div>

                  <div className="text-right space-y-1">
                    <p className="font-sans font-semibold text-sm text-espresso">
                      {formatPrice(ord.amount)}
                    </p>
                    <Badge
                      variant={
                        ord.status === "DELIVERED"
                          ? "success"
                          : ord.status === "SHIPPED"
                          ? "gold"
                          : "default"
                      }
                      className="text-[10px] py-0"
                    >
                      {ord.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Inventory Restock & Category Health (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl text-espresso">
              Low Stock Warnings
            </h2>
            <Link
              href="/admin/inventory"
              className="text-xs text-antique-gold hover:text-deep-gold font-medium flex items-center gap-1 font-sans"
            >
              Manage stock <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="rounded-[14px] border border-[#E7DCC6] bg-white p-4 space-y-3 shadow-subtle">
            {lowStockItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-2 rounded-lg bg-red-50/50 border border-red-100 text-xs font-sans"
              >
                <div>
                  <p className="font-medium text-espresso">{item.productTitle}</p>
                  <p className="text-[11px] text-brown-text/70">{item.title} ({item.sku})</p>
                </div>
                <Badge variant="stockLow" className="text-xs">
                  {item.stock} left
                </Badge>
              </div>
            ))}
          </div>

          {/* Quick Stats Note */}
          <div className="rounded-[14px] border border-gold/40 bg-soft-cream/60 p-4 space-y-2">
            <h3 className="font-serif text-lg text-espresso flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" /> System Status
            </h3>
            <p className="text-xs text-brown-text font-sans leading-relaxed">
              Cloudflare Workers runtime active. Razorpay orders, Shiprocket dispatch,
              and background outbox runners are fully configured with local mock fallbacks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
