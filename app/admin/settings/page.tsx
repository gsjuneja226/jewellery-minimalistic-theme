"use client";

import * as React from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";
import { Settings, ShieldCheck, Check } from "lucide-react";

export default function AdminSettingsPage() {
  const { showToast } = useToast();

  const [storeName, setStoreName] = React.useState("Phabulous by Mitthat");
  const [tagline, setTagline] = React.useState("Handpicked jewellery, simply irresistible");
  const [gstin, setGstin] = React.useState("03AABCP1234F1Z5");
  const [defaultHsn, setDefaultHsn] = React.useState("7117");
  const [defaultGstRate, setDefaultGstRate] = React.useState("3");
  const [freeShippingThreshold, setFreeShippingThreshold] = React.useState("1499");
  const [standardShippingFee, setStandardShippingFee] = React.useState("99");
  const [codFee, setCodFee] = React.useState("99");
  const [returnWindowDays, setReturnWindowDays] = React.useState("7");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Store settings saved successfully!", "success");
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="pb-4 border-b border-[#E7DCC6]">
        <h1 className="font-serif text-3xl md:text-4xl text-espresso">
          Store Settings & Tax Rules
        </h1>
        <p className="text-xs text-brown-text/80 font-sans mt-0.5">
          Configure GST compliance, HSN defaults, shipping thresholds, and COD verification.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Brand Details */}
        <Card className="p-6 space-y-4">
          <h2 className="font-serif text-xl text-espresso">Brand Identity</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Store Name"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
            />
            <Input
              label="Official Tagline"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
            />
          </div>
        </Card>

        {/* GST & Tax Compliance */}
        <Card className="p-6 space-y-4">
          <h2 className="font-serif text-xl text-espresso">GST Compliance</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="GSTIN Number"
              value={gstin}
              onChange={(e) => setGstin(e.target.value)}
            />
            <Input
              label="Default HSN (7117 - Imitation Jewellery)"
              value={defaultHsn}
              onChange={(e) => setDefaultHsn(e.target.value)}
            />
            <Input
              label="GST Rate (%)"
              value={defaultGstRate}
              onChange={(e) => setDefaultGstRate(e.target.value)}
            />
          </div>
        </Card>

        {/* Shipping & COD */}
        <Card className="p-6 space-y-4">
          <h2 className="font-serif text-xl text-espresso">Shipping & Cash on Delivery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="Free Shipping Above (₹)"
              value={freeShippingThreshold}
              onChange={(e) => setFreeShippingThreshold(e.target.value)}
            />
            <Input
              label="Standard Delivery Fee (₹)"
              value={standardShippingFee}
              onChange={(e) => setStandardShippingFee(e.target.value)}
            />
            <Input
              label="COD Handling Fee (₹)"
              value={codFee}
              onChange={(e) => setCodFee(e.target.value)}
            />
          </div>

          <div className="pt-2">
            <Input
              label="Return Window (Days)"
              value={returnWindowDays}
              onChange={(e) => setReturnWindowDays(e.target.value)}
            />
          </div>
        </Card>

        <div className="flex justify-end pt-2">
          <Button type="submit" variant="primary" size="lg">
            Save Settings
          </Button>
        </div>
      </form>
    </div>
  );
}
