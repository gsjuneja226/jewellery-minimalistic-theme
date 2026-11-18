"use client";

import * as React from "react";
import { PRODUCTS_DATA, type MockProduct } from "@/lib/data/mockData";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";
import { Search, Plus, Minus, History, Check } from "lucide-react";

interface InventoryRow {
  variantId: string;
  productTitle: string;
  variantTitle: string;
  sku: string;
  price: number;
  stock: number;
  lowStockThreshold: number;
}

export default function AdminInventoryPage() {
  const { showToast } = useToast();
  const [search, setSearch] = React.useState("");

  const initialRows: InventoryRow[] = React.useMemo(() => {
    return PRODUCTS_DATA.flatMap((p) =>
      p.variants.map((v) => ({
        variantId: v.id,
        productTitle: p.title,
        variantTitle: v.title,
        sku: v.sku,
        price: v.price,
        stock: v.stock,
        lowStockThreshold: 4,
      }))
    );
  }, []);

  const [rows, setRows] = React.useState<InventoryRow[]>(initialRows);

  const handleAdjustStock = (variantId: string, delta: number) => {
    setRows((prev) =>
      prev.map((r) => {
        if (r.variantId === variantId) {
          const newStock = Math.max(0, r.stock + delta);
          showToast(`Adjusted ${r.sku} stock to ${newStock} units.`, "success");
          return { ...r, stock: newStock };
        }
        return r;
      })
    );
  };

  const filtered = rows.filter(
    (r) =>
      r.productTitle.toLowerCase().includes(search.toLowerCase()) ||
      r.sku.toLowerCase().includes(search.toLowerCase()) ||
      r.variantTitle.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E7DCC6]">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl text-espresso">
            Inventory & Stock Control
          </h1>
          <p className="text-xs text-brown-text/80 font-sans mt-0.5">
            Monitor real-time warehouse inventory, adjustments, and low-stock alerts.
          </p>
        </div>
      </div>

      {/* Search Filter Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-antique-gold pointer-events-none" />
          <input
            type="text"
            placeholder="Search by SKU, product, or variant..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 rounded-full border border-[#E7DCC6] bg-white pl-10 pr-4 text-xs font-sans text-espresso focus:outline-none focus:border-gold"
          />
        </div>
        <span className="text-xs font-sans text-brown-text/80">
          Tracking {rows.length} total SKUs
        </span>
      </div>

      {/* Inventory Table */}
      <div className="rounded-[14px] border border-[#E7DCC6] bg-white overflow-hidden shadow-subtle">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-soft-cream/60 border-b border-[#E7DCC6] text-espresso uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-3.5">SKU</th>
                <th className="p-3.5">Product & Variant</th>
                <th className="p-3.5">Unit Price</th>
                <th className="p-3.5">Stock Status</th>
                <th className="p-3.5 text-center">Adjust Quantity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1E8D8]">
              {filtered.map((r) => (
                <tr key={r.variantId} className="hover:bg-soft-cream/30 transition-colors">
                  <td className="p-3.5 font-mono font-bold text-espresso">{r.sku}</td>
                  <td className="p-3.5">
                    <p className="font-serif text-sm font-medium text-espresso">{r.productTitle}</p>
                    <p className="text-[11px] text-brown-text/70">{r.variantTitle}</p>
                  </td>
                  <td className="p-3.5 font-semibold text-espresso">{formatPrice(r.price)}</td>
                  <td className="p-3.5">
                    {r.stock <= r.lowStockThreshold ? (
                      <Badge variant="stockLow" className="text-xs">
                        Low Stock: {r.stock} remaining
                      </Badge>
                    ) : (
                      <Badge variant="success" className="text-xs">
                        Healthy: {r.stock} in stock
                      </Badge>
                    )}
                  </td>
                  <td className="p-3.5">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleAdjustStock(r.variantId, -1)}
                        disabled={r.stock <= 0}
                        className="p-1 rounded-full border border-[#E7DCC6] bg-white hover:bg-soft-cream disabled:opacity-30"
                        title="Reduce 1"
                      >
                        <Minus className="w-3.5 h-3.5 text-brown-text" />
                      </button>
                      <span className="w-10 text-center font-bold text-sm text-espresso">
                        {r.stock}
                      </span>
                      <button
                        onClick={() => handleAdjustStock(r.variantId, 1)}
                        className="p-1 rounded-full border border-[#E7DCC6] bg-white hover:bg-soft-cream"
                        title="Add 1"
                      >
                        <Plus className="w-3.5 h-3.5 text-brown-text" />
                      </button>
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
