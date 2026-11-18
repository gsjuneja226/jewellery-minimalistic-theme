"use client";

import * as React from "react";
import { Badge } from "@/components/ui/Badge";
import { ShieldAlert, UserCheck } from "lucide-react";

export default function AdminAuditLogPage() {
  const auditEntries = [
    {
      id: "aud-1",
      user: "admin@phabulousbymitthat.com",
      role: "super_admin",
      action: "order.transition_status",
      entity: "Order #PH-ORD-9021 (CONFIRMED -> PACKED)",
      ip: "103.21.244.2 (Amritsar, IN)",
      time: "18 Nov 2026, 05:40 PM",
    },
    {
      id: "aud-2",
      user: "admin@phabulousbymitthat.com",
      role: "super_admin",
      action: "inventory.stock_adjustment",
      entity: "Variant PH-RNG-001-S7 (+10 units)",
      ip: "103.21.244.2 (Amritsar, IN)",
      time: "18 Nov 2026, 03:15 PM",
    },
    {
      id: "aud-3",
      user: "marketing@phabulousbymitthat.com",
      role: "marketing",
      action: "coupon.create",
      entity: "Coupon 'FESTIVE500' (₹500 flat off)",
      ip: "157.34.120.89 (Delhi, IN)",
      time: "17 Nov 2026, 11:30 AM",
    },
    {
      id: "aud-4",
      user: "admin@phabulousbymitthat.com",
      role: "super_admin",
      action: "product.update",
      entity: "Product 'Kundan Jadau Choker Set' price updated",
      ip: "103.21.244.2 (Amritsar, IN)",
      time: "16 Nov 2026, 02:45 PM",
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="pb-4 border-b border-[#E7DCC6]">
        <h1 className="font-serif text-3xl md:text-4xl text-espresso flex items-center gap-2">
          <ShieldAlert className="w-8 h-8 text-antique-gold" /> Immutable Audit Trail
        </h1>
        <p className="text-xs text-brown-text/80 font-sans mt-0.5">
          Tamper-proof log of administrative actions, price modifications, stock changes, and logins.
        </p>
      </div>

      <div className="rounded-[14px] border border-[#E7DCC6] bg-white overflow-hidden shadow-subtle">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-soft-cream/60 border-b border-[#E7DCC6] text-espresso uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-3.5">Admin User</th>
                <th className="p-3.5">Action & Entity</th>
                <th className="p-3.5">IP Address</th>
                <th className="p-3.5 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1E8D8]">
              {auditEntries.map((entry) => (
                <tr key={entry.id} className="hover:bg-soft-cream/30 transition-colors">
                  <td className="p-3.5">
                    <span className="font-semibold text-espresso block">{entry.user}</span>
                    <Badge variant="gold" className="text-[10px] py-0 mt-0.5">
                      {entry.role}
                    </Badge>
                  </td>
                  <td className="p-3.5">
                    <span className="font-mono text-antique-gold font-bold block">{entry.action}</span>
                    <span className="text-[11px] text-brown-text">{entry.entity}</span>
                  </td>
                  <td className="p-3.5 font-mono text-brown-text/70">{entry.ip}</td>
                  <td className="p-3.5 text-right text-brown-text/70">{entry.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
