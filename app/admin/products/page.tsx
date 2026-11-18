"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { PRODUCTS_DATA, type MockProduct } from "@/lib/data/mockData";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";
import {
  Plus,
  Download,
  Upload,
  Search,
  Edit,
  Copy,
  Trash2,
  ExternalLink,
} from "lucide-react";

export default function AdminProductsPage() {
  const { showToast } = useToast();
  const [products, setProducts] = React.useState<MockProduct[]>(PRODUCTS_DATA);
  const [search, setSearch] = React.useState("");

  const filtered = products.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase()) ||
      p.variants.some((v) => v.sku.toLowerCase().includes(search.toLowerCase()))
  );

  const handleExportCsv = () => {
    const headers = ["Title", "Slug", "Category", "Material", "SKU", "Price (Rupees)", "Stock"];
    const rows = products.flatMap((p) =>
      p.variants.map((v) => [
        `"${p.title}"`,
        p.slug,
        p.categorySlug,
        p.materialFinish,
        v.sku,
        (v.price / 100).toFixed(2),
        v.stock,
      ])
    );
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `phabulous-products-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Product CSV exported successfully!", "success");
  };

  const handleDuplicate = (prod: MockProduct) => {
    const dup: MockProduct = {
      ...prod,
      id: `prod-${Date.now()}`,
      title: `${prod.title} (Copy)`,
      slug: `${prod.slug}-copy-${Math.floor(Math.random() * 1000)}`,
    };
    setProducts([dup, ...products]);
    showToast(`Duplicated "${prod.title}"!`, "success");
  };

  const handleDelete = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
    showToast("Product soft-deleted.", "info");
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Title & Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E7DCC6]">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl text-espresso">
            Products Catalog
          </h1>
          <p className="text-xs text-brown-text/80 font-sans mt-0.5">
            Manage your artificial jewellery listings, variants, pricing and images.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Button variant="outline" size="sm" onClick={handleExportCsv}>
            <Download className="w-3.5 h-3.5 mr-1 text-antique-gold" /> Export CSV
          </Button>
          <Link href="/admin/products/new">
            <Button variant="primary" size="sm">
              <Plus className="w-3.5 h-3.5 mr-1" /> Add Product
            </Button>
          </Link>
        </div>
      </div>

      {/* Search Filter Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-antique-gold pointer-events-none" />
          <input
            type="text"
            placeholder="Search by title, slug, or SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 rounded-full border border-[#E7DCC6] bg-white pl-10 pr-4 text-xs font-sans text-espresso focus:outline-none focus:border-gold"
          />
        </div>
        <span className="text-xs font-sans text-brown-text/80">
          Showing {filtered.length} products
        </span>
      </div>

      {/* Products Table */}
      <div className="rounded-[14px] border border-[#E7DCC6] bg-white overflow-hidden shadow-subtle">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-soft-cream/60 border-b border-[#E7DCC6] text-espresso uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-3.5">Product</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Material</th>
                <th className="p-3.5">SKU & Variants</th>
                <th className="p-3.5">Price</th>
                <th className="p-3.5">Stock</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1E8D8]">
              {filtered.map((prod) => (
                <tr key={prod.id} className="hover:bg-soft-cream/30 transition-colors">
                  {/* Thumbnail & Title */}
                  <td className="p-3.5">
                    <div className="flex items-center gap-3">
                      <div className="relative aspect-square w-12 rounded-lg overflow-hidden border border-[#E7DCC6] bg-soft-cream/40 flex-shrink-0">
                        <Image
                          src={prod.images[0] || "/products/ad-solitaire-statement-ring-1.svg"}
                          alt={prod.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <Link
                          href={`/products/${prod.slug}`}
                          target="_blank"
                          className="font-serif text-sm font-medium text-espresso hover:text-antique-gold flex items-center gap-1"
                        >
                          {prod.title}
                          <ExternalLink className="w-3 h-3 text-brown-text/50" />
                        </Link>
                        <p className="text-[11px] text-brown-text/70">{prod.subtitle}</p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="p-3.5 capitalize text-brown-text">
                    {prod.categorySlug.replace("-", " ")}
                  </td>

                  {/* Material */}
                  <td className="p-3.5">
                    <Badge variant="material" className="text-[10px]">
                      {prod.materialFinish}
                    </Badge>
                  </td>

                  {/* SKU & Variants */}
                  <td className="p-3.5">
                    <span className="font-mono text-[11px] text-espresso font-semibold block">
                      {prod.variants[0]?.sku}
                    </span>
                    <span className="text-[10px] text-brown-text/70">
                      {prod.variants.length} variant{prod.variants.length > 1 ? "s" : ""}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="p-3.5 font-semibold text-espresso">
                    {formatPrice(prod.variants[0]?.price || 0)}
                  </td>

                  {/* Stock */}
                  <td className="p-3.5">
                    {prod.variants[0]?.stock <= 4 ? (
                      <Badge variant="stockLow" className="text-[10px]">
                        Low: {prod.variants[0]?.stock} left
                      </Badge>
                    ) : (
                      <span className="text-emerald-800 font-medium">
                        {prod.variants.reduce((acc, v) => acc + v.stock, 0)} units
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="p-3.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleDuplicate(prod)}
                        title="Duplicate"
                        className="p-1.5 rounded-md text-brown-text/70 hover:text-espresso hover:bg-soft-cream"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(prod.id)}
                        title="Delete"
                        className="p-1.5 rounded-md text-brown-text/70 hover:text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
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
