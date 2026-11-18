"use client";

import * as React from "react";
import { COUPONS_DATA, type MockCoupon } from "@/lib/data/mockData";
import { formatPrice } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";
import { Plus, Tag, Megaphone, Trash2 } from "lucide-react";

export default function AdminMarketingPage() {
  const { showToast } = useToast();
  const [coupons, setCoupons] = React.useState<MockCoupon[]>(COUPONS_DATA);
  const [code, setCode] = React.useState("");
  const [discountType, setDiscountType] = React.useState<"percent" | "flat">("percent");
  const [discountValue, setDiscountValue] = React.useState("15");
  const [minOrder, setMinOrder] = React.useState("1499");

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) return;

    const newCoupon: MockCoupon = {
      code: code.trim().toUpperCase(),
      discountType,
      discountValue: discountType === "percent" ? Number(discountValue) : Number(discountValue) * 100,
      minOrderValue: Number(minOrder) * 100,
    };

    setCoupons([...coupons, newCoupon]);
    setCode("");
    showToast(`Coupon ${newCoupon.code} created successfully!`, "success");
  };

  const handleDelete = (cCode: string) => {
    setCoupons(coupons.filter((c) => c.code !== cCode));
    showToast(`Removed coupon ${cCode}.`, "info");
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="pb-4 border-b border-[#E7DCC6]">
        <h1 className="font-serif text-3xl md:text-4xl text-espresso">
          Marketing, Coupons & Banners
        </h1>
        <p className="text-xs text-brown-text/80 font-sans mt-0.5">
          Create promotional discount codes and manage festive campaigns.
        </p>
      </div>

      {/* Create Coupon Form */}
      <Card className="p-6 space-y-4">
        <h2 className="font-serif text-xl text-espresso flex items-center gap-1.5">
          <Tag className="w-4 h-4 text-antique-gold" /> Create Promotional Coupon
        </h2>

        <form onSubmit={handleCreateCoupon} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <Input
            placeholder="Code (e.g. DIWALI20)"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="uppercase"
            required
          />
          <Select
            value={discountType}
            onChange={(e) => setDiscountType(e.target.value as "percent" | "flat")}
          >
            <option value="percent">Percentage Discount (%)</option>
            <option value="flat">Flat Cash Discount (₹)</option>
          </Select>
          <Input
            placeholder="Value (e.g. 15 or 500)"
            type="number"
            value={discountValue}
            onChange={(e) => setDiscountValue(e.target.value)}
            required
          />
          <Button type="submit" variant="primary" size="default" className="h-11">
            <Plus className="w-4 h-4 mr-1" /> Add Coupon
          </Button>
        </form>
      </Card>

      {/* Active Coupons List */}
      <div className="rounded-[14px] border border-[#E7DCC6] bg-white overflow-hidden shadow-subtle">
        <div className="p-4 bg-soft-cream/60 border-b border-[#E7DCC6] text-xs font-semibold text-espresso uppercase tracking-wider">
          Active Promotional Coupons
        </div>
        <div className="divide-y divide-[#F1E8D8]">
          {coupons.map((c) => (
            <div key={c.code} className="p-4 flex items-center justify-between gap-4 text-xs font-sans">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-sm text-espresso bg-[#FAF1D9] px-2 py-0.5 rounded border border-gold/40">
                    {c.code}
                  </span>
                  <Badge variant="gold">
                    {c.discountType === "percent"
                      ? `${c.discountValue}% OFF`
                      : c.discountType === "flat"
                      ? `${formatPrice(c.discountValue)} OFF`
                      : "FREE SHIPPING"}
                  </Badge>
                </div>
                <p className="text-[11px] text-brown-text/70">
                  Min Cart Value: {formatPrice(c.minOrderValue)}
                  {c.maxDiscount ? ` • Max Discount: ${formatPrice(c.maxDiscount)}` : ""}
                </p>
              </div>

              <button
                onClick={() => handleDelete(c.code)}
                className="p-1.5 text-brown-text/60 hover:text-red-600 rounded"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
