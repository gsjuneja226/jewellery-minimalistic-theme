"use client";

import * as React from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";
import {
  Users,
  Search,
  Download,
  Filter,
  Mail,
  Phone,
  ShoppingBag,
  Sparkles,
  ArrowUpDown,
  MoreVertical,
  CheckCircle,
} from "lucide-react";

interface CustomerRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  ordersCount: number;
  totalSpent: number; // in paise
  tier: "VIP" | "GOLD" | "SILVER" | "NEW";
  lastOrderDate: string;
  verified: boolean;
}

const SAMPLE_CUSTOMERS: CustomerRecord[] = [
  {
    id: "CUST-1001",
    name: "Simran Kaur",
    email: "simran.kaur@gmail.com",
    phone: "+91 98140 12345",
    city: "Amritsar",
    state: "Punjab",
    ordersCount: 8,
    totalSpent: 4899000, // ₹48,990
    tier: "VIP",
    lastOrderDate: "Today, 2:45 PM",
    verified: true,
  },
  {
    id: "CUST-1002",
    name: "Pooja Malhotra",
    email: "pooja.malhotra@outlook.com",
    phone: "+91 98200 54321",
    city: "Mumbai",
    state: "Maharashtra",
    ordersCount: 5,
    totalSpent: 2645000, // ₹26,450
    tier: "GOLD",
    lastOrderDate: "Yesterday",
    verified: true,
  },
  {
    id: "CUST-1003",
    name: "Harpreet Gill",
    email: "harpreet.gill@yahoo.com",
    phone: "+91 98765 98765",
    city: "Chandigarh",
    state: "Punjab",
    ordersCount: 6,
    totalSpent: 3599000, // ₹35,990
    tier: "VIP",
    lastOrderDate: "3 days ago",
    verified: true,
  },
  {
    id: "CUST-1004",
    name: "Ananya Sharma",
    email: "ananya.sharma@gmail.com",
    phone: "+91 98111 22334",
    city: "New Delhi",
    state: "Delhi",
    ordersCount: 3,
    totalSpent: 1499000, // ₹14,990
    tier: "SILVER",
    lastOrderDate: "5 days ago",
    verified: true,
  },
  {
    id: "CUST-1005",
    name: "Deepika Joshi",
    email: "deepika.j@gmail.com",
    phone: "+91 94140 77889",
    city: "Jaipur",
    state: "Rajasthan",
    ordersCount: 2,
    totalSpent: 899000, // ₹8,990
    tier: "SILVER",
    lastOrderDate: "1 week ago",
    verified: false,
  },
  {
    id: "CUST-1006",
    name: "Meera Verma",
    email: "meera.v@gmail.com",
    phone: "+91 99887 66554",
    city: "Ludhiana",
    state: "Punjab",
    ordersCount: 1,
    totalSpent: 349900, // ₹3,499
    tier: "NEW",
    lastOrderDate: "2 weeks ago",
    verified: true,
  },
  {
    id: "CUST-1007",
    name: "Roshni Patel",
    email: "roshni.p@gmail.com",
    phone: "+91 97230 11223",
    city: "Ahmedabad",
    state: "Gujarat",
    ordersCount: 4,
    totalSpent: 1980000, // ₹19,800
    tier: "GOLD",
    lastOrderDate: "3 weeks ago",
    verified: true,
  },
];

export default function AdminCustomersPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedTier, setSelectedTier] = React.useState<string>("ALL");

  const filteredCustomers = SAMPLE_CUSTOMERS.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery) ||
      c.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTier = selectedTier === "ALL" || c.tier === selectedTier;
    return matchesSearch && matchesTier;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E7DCC6]">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl text-espresso">
            Customer Directory
          </h1>
          <p className="text-xs text-brown-text/80 font-sans mt-1">
            Manage patrons, VIP bridal clients, lifetime spend, and purchase history.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => alert("Customer report exported as CSV")}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-[#D6C2A3] bg-white text-xs font-sans font-medium text-espresso hover:bg-soft-cream transition-colors shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-antique-gold" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider font-sans text-brown-text/80">
              Total Patrons
            </span>
            <div className="h-8 w-8 rounded-full bg-soft-cream text-espresso flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold font-sans text-espresso">
              21,450
            </div>
            <p className="text-xs text-emerald-700 font-sans mt-0.5 font-medium">
              +142 this week
            </p>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider font-sans text-brown-text/80">
              VIP Members
            </span>
            <div className="h-8 w-8 rounded-full bg-[#FAF1D9] text-antique-gold flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold font-sans text-espresso">
              1,840
            </div>
            <p className="text-xs text-brown-text/70 font-sans mt-0.5">
              Lifetime spend &gt; ₹30,000
            </p>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider font-sans text-brown-text/80">
              Repeat Rate
            </span>
            <div className="h-8 w-8 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold font-sans text-espresso">
              34.8%
            </div>
            <p className="text-xs text-emerald-700 font-sans mt-0.5 font-medium">
              Industry benchmark: 22%
            </p>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider font-sans text-brown-text/80">
              Avg Lifetime Value
            </span>
            <div className="h-8 w-8 rounded-full bg-light-blush text-espresso flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold font-sans text-espresso">
              {formatPrice(684000)}
            </div>
            <p className="text-xs text-brown-text/70 font-sans mt-0.5">
              Per registered account
            </p>
          </div>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-[12px] border border-[#E7DCC6]">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-brown-text/60" />
          <input
            type="text"
            placeholder="Search by name, email, phone, city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 pl-9 pr-4 text-xs font-sans rounded-full border border-[#E7DCC6] bg-soft-cream/30 focus:outline-none focus:border-espresso focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-sans text-brown-text/70">Tier:</span>
          {["ALL", "VIP", "GOLD", "SILVER", "NEW"].map((tier) => (
            <button
              key={tier}
              type="button"
              onClick={() => setSelectedTier(tier)}
              className={`px-3 py-1 rounded-full text-[11px] font-sans font-medium transition-colors ${
                selectedTier === tier
                  ? "bg-espresso text-white"
                  : "bg-soft-cream/60 text-brown-text hover:bg-soft-cream"
              }`}
            >
              {tier}
            </button>
          ))}
        </div>
      </div>

      {/* Customer Directory Table */}
      <div className="bg-white rounded-[14px] border border-[#E7DCC6] overflow-hidden shadow-subtle">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-xs">
            <thead className="bg-[#FAF7F2] border-b border-[#E7DCC6] text-brown-text uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4 font-semibold">Customer</th>
                <th className="py-3 px-4 font-semibold">Contact Info</th>
                <th className="py-3 px-4 font-semibold">Location</th>
                <th className="py-3 px-4 font-semibold">Tier</th>
                <th className="py-3 px-4 font-semibold">Orders</th>
                <th className="py-3 px-4 font-semibold">Total Spent</th>
                <th className="py-3 px-4 font-semibold">Last Active</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1E8D8]">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-brown-text/70">
                    No customers match your search criteria.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((cust) => (
                  <tr
                    key={cust.id}
                    className="hover:bg-soft-cream/30 transition-colors"
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-soft-cream border border-[#D6C2A3] flex items-center justify-center font-bold text-xs text-espresso">
                          {cust.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <div className="flex items-center gap-1 font-semibold text-espresso">
                            <span>{cust.name}</span>
                            {cust.verified && (
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-600 inline" />
                            )}
                          </div>
                          <span className="text-[10px] text-brown-text/60">
                            {cust.id}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-brown-text">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <Mail className="w-3 h-3 text-brown-text/50" />
                          <span>{cust.email}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] text-brown-text/70">
                          <Phone className="w-3 h-3 text-brown-text/50" />
                          <span>{cust.phone}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-brown-text">
                      <span className="font-medium text-espresso">{cust.city}</span>,{" "}
                      <span className="text-[11px] text-brown-text/70">{cust.state}</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <Badge
                        variant={
                          cust.tier === "VIP"
                            ? "gold"
                            : cust.tier === "GOLD"
                            ? "outline"
                            : "default"
                        }
                        className="text-[10px] py-0 px-2 font-bold"
                      >
                        {cust.tier}
                      </Badge>
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-espresso">
                      {cust.ordersCount} orders
                    </td>

                    <td className="py-3.5 px-4 font-bold text-espresso">
                      {formatPrice(cust.totalSpent)}
                    </td>

                    <td className="py-3.5 px-4 text-brown-text/80 text-[11px]">
                      {cust.lastOrderDate}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => alert(`Details for ${cust.name}`)}
                        className="px-2.5 py-1 rounded-full border border-[#D6C2A3] text-[11px] font-medium text-espresso hover:bg-espresso hover:text-white transition-colors"
                      >
                        Profile
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
