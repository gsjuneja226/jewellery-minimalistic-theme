"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { useToast } from "@/components/ui/Toast";
import { slugify } from "@/lib/utils";
import { ArrowLeft, Upload, Sparkles, Check } from "lucide-react";

export default function NewProductPage() {
  const router = useRouter();
  const { showToast } = useToast();

  const [title, setTitle] = React.useState("");
  const [slug, setSlug] = React.useState("");
  const [subtitle, setSubtitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [category, setCategory] = React.useState("rings");
  const [occasion, setOccasion] = React.useState("Festive");
  const [materialFinish, setMaterialFinish] = React.useState("gold-tone");
  const [stoneType, setStoneType] = React.useState("American diamond (AD)");
  const [priceRupees, setPriceRupees] = React.useState("1499");
  const [comparePriceRupees, setComparePriceRupees] = React.useState("2199");
  const [sku, setSku] = React.useState("");
  const [stock, setStock] = React.useState("15");
  const [hsnCode, setHsnCode] = React.useState("7117");
  const [gstRate, setGstRate] = React.useState("3");
  const [careInstructions, setCareInstructions] = React.useState(
    "Keep dry and away from direct moisture, perfumes, and hairsprays. Store safely inside provided velvet keepsake pouch."
  );

  // Auto-slugify on title change
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    setSlug(slugify(val));
    if (!sku) {
      setSku(`PH-${slugify(val).slice(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !priceRupees || !sku) {
      showToast("Please fill in title, price, and SKU.", "error");
      return;
    }

    showToast(`Successfully created "${title}"!`, "success");
    router.push("/admin/products");
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-[#E7DCC6]">
        <Link
          href="/admin/products"
          className="p-2 rounded-full border border-[#E7DCC6] bg-white text-espresso hover:bg-soft-cream"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="font-serif text-3xl text-espresso">Add New Jewellery Product</h1>
          <p className="text-xs text-brown-text/80 font-sans">
            Remember: Artificial jewellery terminology is strictly enforced (gold-tone, AD stone, etc.).
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <Card className="p-6 space-y-4">
          <h2 className="font-serif text-xl text-espresso">General Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Product Title"
              placeholder="e.g. Kundan Jadau Choker Set"
              value={title}
              onChange={handleTitleChange}
              required
            />
            <Input
              label="URL Slug"
              placeholder="kundan-jadau-choker-set"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
            />
          </div>

          <Input
            label="Subtitle / Headline"
            placeholder="e.g. Gold-tone Kundan & Pearl Drops"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
          />

          <div className="space-y-1.5 text-left">
            <label className="block text-xs font-medium text-brown-text uppercase tracking-wider font-sans">
              Product Description
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detailed description of craftsmanship, styling pairing, and dimensions..."
              className="w-full rounded-[14px] border border-[#E7DCC6] p-3 text-sm font-sans text-espresso focus:outline-none focus:border-gold"
            />
          </div>
        </Card>

        {/* Classification & Materials */}
        <Card className="p-6 space-y-4">
          <h2 className="font-serif text-xl text-espresso">Classification & Materials</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="rings">Rings</option>
              <option value="necklaces">Necklaces</option>
              <option value="earrings">Earrings</option>
              <option value="pendants">Pendants</option>
              <option value="bangles-bracelets">Bangles & Bracelets</option>
              <option value="anklets">Anklets</option>
              <option value="jewellery-sets">Jewellery Sets</option>
            </Select>

            <Select
              label="Occasion"
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
            >
              <option value="Wedding">Wedding</option>
              <option value="Festive">Festive</option>
              <option value="Daily wear">Daily wear</option>
              <option value="Gifting">Gifting</option>
            </Select>

            <Select
              label="Material Finish (Artificial Jewellery Only)"
              value={materialFinish}
              onChange={(e) => setMaterialFinish(e.target.value)}
            >
              <option value="gold-tone">Gold-tone</option>
              <option value="rose gold-tone">Rose gold-tone</option>
              <option value="silver-tone">Silver-tone</option>
              <option value="oxidised">Oxidised</option>
              <option value="kundan-style">Kundan-style</option>
            </Select>

            <Input
              label="Stone / Embellishment Type"
              placeholder="e.g. American diamond (AD), simulated pearls"
              value={stoneType}
              onChange={(e) => setStoneType(e.target.value)}
            />
          </div>
        </Card>

        {/* Pricing, Tax & Inventory */}
        <Card className="p-6 space-y-4">
          <h2 className="font-serif text-xl text-espresso">Pricing & Inventory</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Price (₹ Rupees)"
              type="number"
              placeholder="1499"
              value={priceRupees}
              onChange={(e) => setPriceRupees(e.target.value)}
              required
            />
            <Input
              label="Compare-at Price (₹ Rupees)"
              type="number"
              placeholder="2199"
              value={comparePriceRupees}
              onChange={(e) => setComparePriceRupees(e.target.value)}
            />
            <Input
              label="Initial Stock Quantity"
              type="number"
              placeholder="15"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="SKU Code"
              placeholder="PH-RNG-009"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              required
            />
            <Input
              label="HSN Code (Default 7117)"
              value={hsnCode}
              onChange={(e) => setHsnCode(e.target.value)}
              required
            />
            <Input
              label="GST Rate (%)"
              value={gstRate}
              onChange={(e) => setGstRate(e.target.value)}
              required
            />
          </div>
        </Card>

        {/* Anti-Tarnish Care */}
        <Card className="p-6 space-y-4">
          <h2 className="font-serif text-xl text-espresso">Anti-Tarnish Care Instructions</h2>
          <textarea
            rows={2}
            value={careInstructions}
            onChange={(e) => setCareInstructions(e.target.value)}
            className="w-full rounded-[14px] border border-[#E7DCC6] p-3 text-sm font-sans text-espresso focus:outline-none focus:border-gold"
          />
        </Card>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E7DCC6]">
          <Link href="/admin/products">
            <Button variant="ghost" size="default">
              Cancel
            </Button>
          </Link>
          <Button type="submit" variant="primary" size="lg">
            Save and Publish Product
          </Button>
        </div>
      </form>
    </div>
  );
}
