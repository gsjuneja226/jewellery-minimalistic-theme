"use client";

import * as React from "react";
import { formatPrice } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { Download, BarChart3, FileSpreadsheet, CheckCircle2 } from "lucide-react";

export default function AdminReportsPage() {
  const { showToast } = useToast();

  const handleExportGstReport = () => {
    const headers = ["Invoice No", "Date", "HSN Code", "Taxable Value (₹)", "CGST 1.5%", "SGST 1.5%", "IGST 3%", "Total Invoice (₹)"];
    const rows = [
      ["INV-PH-ORD-9021", "18-11-2026", "7117", "4192.43", "0.00", "0.00", "125.77", "4318.20"],
      ["INV-PH-ORD-9020", "18-11-2026", "7117", "1746.60", "26.20", "26.20", "0.00", "1799.00"],
      ["INV-PH-ORD-9019", "18-11-2026", "7117", "2522.33", "0.00", "0.00", "75.67", "2598.00"],
    ];

    const csv = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = `GST-GSTR1-Report-7117-${new Date().toISOString().slice(0, 7)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("GST reconciliation CSV exported!", "success");
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E7DCC6]">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl text-espresso">
            Reports & GST Reconciliation
          </h1>
          <p className="text-xs text-brown-text/80 font-sans mt-0.5">
            Download monthly sales ledgers, HSN 7117 tax split reports, and inventory valuation.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={handleExportGstReport}>
          <Download className="w-3.5 h-3.5 mr-1.5" /> Export GSTR-1 CSV
        </Button>
      </div>

      {/* GST Summary Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-5">
          <span className="text-xs uppercase tracking-wider text-brown-text font-sans">
            Taxable Value (This Month)
          </span>
          <div className="text-2xl font-bold font-sans text-espresso mt-1">
            {formatPrice(47145600)}
          </div>
          <p className="text-[11px] text-brown-text/70 mt-1">HSN 7117 (Imitation Jewellery)</p>
        </Card>

        <Card className="p-5">
          <span className="text-xs uppercase tracking-wider text-brown-text font-sans">
            Total GST Collected (3%)
          </span>
          <div className="text-2xl font-bold font-sans text-antique-gold mt-1">
            {formatPrice(1414400)}
          </div>
          <p className="text-[11px] text-brown-text/70 mt-1">Split into CGST / SGST / IGST</p>
        </Card>

        <Card className="p-5">
          <span className="text-xs uppercase tracking-wider text-brown-text font-sans">
            Inventory Valuation (Cost)
          </span>
          <div className="text-2xl font-bold font-sans text-espresso mt-1">
            {formatPrice(18920000)}
          </div>
          <p className="text-[11px] text-brown-text/70 mt-1">Current warehouse stock on hand</p>
        </Card>
      </div>

      {/* Recent Ledger Entries */}
      <div className="rounded-[14px] border border-[#E7DCC6] bg-white overflow-hidden shadow-subtle">
        <div className="p-4 bg-soft-cream/60 border-b border-[#E7DCC6] text-xs font-semibold text-espresso uppercase tracking-wider flex items-center justify-between">
          <span>Monthly Tax Ledger (Sample Breakdown)</span>
          <span className="text-[11px] text-brown-text font-normal">HSN Code 7117</span>
        </div>
        <div className="p-4 overflow-x-auto text-xs font-sans">
          <table className="w-full text-left">
            <thead className="text-[11px] text-brown-text/80 border-b border-[#F1E8D8] pb-2">
              <tr>
                <th className="pb-2">Invoice</th>
                <th className="pb-2">State</th>
                <th className="pb-2">Taxable</th>
                <th className="pb-2">CGST (1.5%)</th>
                <th className="pb-2">SGST (1.5%)</th>
                <th className="pb-2">IGST (3%)</th>
                <th className="pb-2 text-right">Invoice Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1E8D8]">
              <tr>
                <td className="py-2.5 font-mono font-bold text-espresso">INV-PH-ORD-9021</td>
                <td>Punjab</td>
                <td>₹4,192.43</td>
                <td>₹62.88</td>
                <td>₹62.88</td>
                <td>₹0.00</td>
                <td className="text-right font-semibold">₹4,318.20</td>
              </tr>
              <tr>
                <td className="py-2.5 font-mono font-bold text-espresso">INV-PH-ORD-9020</td>
                <td>Maharashtra</td>
                <td>₹1,746.60</td>
                <td>₹0.00</td>
                <td>₹0.00</td>
                <td>₹52.40</td>
                <td className="text-right font-semibold">₹1,799.00</td>
              </tr>
              <tr>
                <td className="py-2.5 font-mono font-bold text-espresso">INV-PH-ORD-9019</td>
                <td>Delhi</td>
                <td>₹2,522.33</td>
                <td>₹0.00</td>
                <td>₹0.00</td>
                <td>₹75.67</td>
                <td className="text-right font-semibold">₹2,598.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
