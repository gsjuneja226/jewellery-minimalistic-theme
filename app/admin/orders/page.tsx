"use client";

import * as React from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { transitionOrder, type OrderStatus } from "@/lib/commerce/stateMachine";
import {
  Search,
  ExternalLink,
  Truck,
  CheckCircle2,
  Package,
  RotateCcw,
  FileText,
} from "lucide-react";

interface AdminOrder {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  status: OrderStatus;
  amount: number;
  paymentMethod: string;
  createdAt: string;
  awb?: string;
}

export default function AdminOrdersPage() {
  const { showToast } = useToast();
  const [filterStatus, setFilterStatus] = React.useState<string>("all");
  const [search, setSearch] = React.useState("");

  const [orders, setOrders] = React.useState<AdminOrder[]>([
    {
      id: "PH-ORD-9021",
      customerName: "Simran Kaur",
      email: "simran.kaur@example.com",
      phone: "+91 98765 43210",
      city: "Amritsar",
      state: "Punjab",
      status: "CONFIRMED",
      amount: 431820,
      paymentMethod: "Razorpay / UPI",
      createdAt: "18 Nov 2026, 02:15 PM",
    },
    {
      id: "PH-ORD-9020",
      customerName: "Pooja Malhotra",
      email: "pooja.m@example.com",
      phone: "+91 98234 11223",
      city: "Mumbai",
      state: "Maharashtra",
      status: "PACKED",
      amount: 179900,
      paymentMethod: "Razorpay / Card",
      createdAt: "18 Nov 2026, 03:40 PM",
    },
    {
      id: "PH-ORD-9019",
      customerName: "Ananya Sharma",
      email: "ananya.s@example.com",
      phone: "+91 98111 22334",
      city: "Delhi",
      state: "Delhi",
      status: "SHIPPED",
      amount: 259800,
      paymentMethod: "Cash on Delivery",
      createdAt: "18 Nov 2026, 11:20 AM",
      awb: "BD-9823412",
    },
    {
      id: "PH-ORD-9018",
      customerName: "Harpreet Gill",
      email: "harpreet.g@example.com",
      phone: "+91 98450 77889",
      city: "Chandigarh",
      state: "Punjab",
      status: "DELIVERED",
      amount: 189900,
      paymentMethod: "Razorpay / UPI",
      createdAt: "17 Nov 2026, 10:15 AM",
      awb: "BD-9823101",
    },
    {
      id: "PH-ORD-9017",
      customerName: "Deepika Joshi",
      email: "deepika.j@example.com",
      phone: "+91 97123 44556",
      city: "Jaipur",
      state: "Rajasthan",
      status: "PENDING_PAYMENT",
      amount: 89900,
      paymentMethod: "Razorpay",
      createdAt: "19 Nov 2026, 01:00 AM",
    },
  ]);

  const handleStatusChange = (orderId: string, nextStatus: OrderStatus) => {
    try {
      setOrders((prev) =>
        prev.map((o) => {
          if (o.id === orderId) {
            const valid = transitionOrder(o.status, nextStatus);
            showToast(`Order ${orderId} transitioned to ${nextStatus}`, "success");
            return {
              ...o,
              status: valid,
              awb: nextStatus === "SHIPPED" && !o.awb ? `BD-${Math.floor(1000000 + Math.random() * 9000000)}` : o.awb,
            };
          }
          return o;
        })
      );
    } catch (err: any) {
      showToast(err.message, "error");
    }
  };

  const filtered = orders.filter((o) => {
    const matchesFilter = filterStatus === "all" || o.status === filterStatus;
    const matchesSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.city.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E7DCC6]">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl text-espresso">
            Orders & Fulfilment Workflow
          </h1>
          <p className="text-xs text-brown-text/80 font-sans mt-0.5">
            Process incoming orders, generate courier AWBs, and issue refunds.
          </p>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 flex-wrap">
          {["all", "CONFIRMED", "PACKED", "SHIPPED", "DELIVERED", "PENDING_PAYMENT"].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-full text-xs font-sans capitalize transition-colors ${
                filterStatus === st
                  ? "bg-espresso text-white font-semibold shadow-xs"
                  : "bg-white text-brown-text border border-[#E7DCC6] hover:border-gold"
              }`}
            >
              {st.toLowerCase().replace("_", " ")}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-antique-gold pointer-events-none" />
          <input
            type="text"
            placeholder="Search order ID or customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 rounded-full border border-[#E7DCC6] bg-white pl-9 pr-3 text-xs font-sans text-espresso focus:outline-none focus:border-gold"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="rounded-[14px] border border-[#E7DCC6] bg-white overflow-hidden shadow-subtle">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-soft-cream/60 border-b border-[#E7DCC6] text-espresso uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-3.5">Order ID & Date</th>
                <th className="p-3.5">Customer & City</th>
                <th className="p-3.5">Total & Payment</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Courier / AWB</th>
                <th className="p-3.5 text-right">Workflow Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1E8D8]">
              {filtered.map((ord) => (
                <tr key={ord.id} className="hover:bg-soft-cream/30 transition-colors">
                  <td className="p-3.5">
                    <span className="font-mono font-bold text-espresso block">{ord.id}</span>
                    <span className="text-[11px] text-brown-text/60">{ord.createdAt}</span>
                  </td>

                  <td className="p-3.5">
                    <p className="font-medium text-espresso">{ord.customerName}</p>
                    <p className="text-[11px] text-brown-text/70">{ord.city}, {ord.state}</p>
                  </td>

                  <td className="p-3.5">
                    <span className="font-bold text-espresso block">{formatPrice(ord.amount)}</span>
                    <span className="text-[11px] text-brown-text/70">{ord.paymentMethod}</span>
                  </td>

                  <td className="p-3.5">
                    <Badge
                      variant={
                        ord.status === "DELIVERED"
                          ? "success"
                          : ord.status === "SHIPPED"
                          ? "gold"
                          : ord.status === "PACKED"
                          ? "material"
                          : "default"
                      }
                      className="text-[10px]"
                    >
                      {ord.status}
                    </Badge>
                  </td>

                  <td className="p-3.5 font-mono text-[11px] text-brown-text">
                    {ord.awb ? (
                      <span className="text-antique-gold font-semibold">{ord.awb}</span>
                    ) : (
                      <span className="text-brown-text/40">—</span>
                    )}
                  </td>

                  <td className="p-3.5 text-right">
                    <div className="flex items-center justify-end gap-1.5 flex-wrap">
                      {ord.status === "CONFIRMED" && (
                        <Button
                          variant="primary"
                          size="sm"
                          className="h-7 text-[11px] px-2.5"
                          onClick={() => handleStatusChange(ord.id, "PACKED")}
                        >
                          <Package className="w-3 h-3 mr-1" /> Mark Packed
                        </Button>
                      )}

                      {ord.status === "PACKED" && (
                        <Button
                          variant="primary"
                          size="sm"
                          className="h-7 text-[11px] px-2.5"
                          onClick={() => handleStatusChange(ord.id, "SHIPPED")}
                        >
                          <Truck className="w-3 h-3 mr-1" /> Ship (Generate AWB)
                        </Button>
                      )}

                      {ord.status === "SHIPPED" && (
                        <Button
                          variant="primary"
                          size="sm"
                          className="h-7 text-[11px] px-2.5"
                          onClick={() => handleStatusChange(ord.id, "DELIVERED")}
                        >
                          <CheckCircle2 className="w-3 h-3 mr-1" /> Mark Delivered
                        </Button>
                      )}

                      <Link
                        href={`/order/${ord.id}/confirmation`}
                        target="_blank"
                        className="p-1.5 rounded text-brown-text hover:text-espresso hover:bg-soft-cream"
                        title="View Receipt & PDF Invoice"
                      >
                        <FileText className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
