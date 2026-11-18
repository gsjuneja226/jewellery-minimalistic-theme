"use client";

import * as React from "react";
import Image from "next/image";
import { CATEGORIES_DATA, type MockCategory } from "@/lib/data/mockData";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";
import { Plus, Edit, Trash2 } from "lucide-react";

export default function AdminCategoriesPage() {
  const { showToast } = useToast();
  const [categories, setCategories] = React.useState<MockCategory[]>(CATEGORIES_DATA);
  const [newCatName, setNewCatName] = React.useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName) return;

    const slug = newCatName.toLowerCase().replace(/\s+/g, "-");
    const item: MockCategory = {
      id: `cat-${Date.now()}`,
      name: newCatName,
      slug,
      description: `Handcrafted ${newCatName.toLowerCase()} collection.`,
      imageUrl: "/products/ad-solitaire-statement-ring-1.svg",
      displayOrder: categories.length + 1,
    };
    setCategories([...categories, item]);
    setNewCatName("");
    showToast(`Added category "${newCatName}"!`, "success");
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E7DCC6]">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl text-espresso">
            Categories Architecture
          </h1>
          <p className="text-xs text-brown-text/80 font-sans mt-0.5">
            Organize main storefront jewellery categories and navigation hierarchy.
          </p>
        </div>
      </div>

      {/* Add Category Card */}
      <Card className="p-4 bg-soft-cream/40">
        <form onSubmit={handleAdd} className="flex gap-3">
          <Input
            placeholder="New Category Name (e.g. Brooches, Hair Accessories)"
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
            className="h-10 text-xs bg-white"
          />
          <Button type="submit" variant="primary" size="sm" className="h-10 px-5 flex-shrink-0">
            <Plus className="w-3.5 h-3.5 mr-1" /> Add
          </Button>
        </form>
      </Card>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="flex items-center gap-3 p-4 rounded-[14px] border border-[#E7DCC6] bg-white shadow-subtle hover:border-gold transition-colors"
          >
            <div className="relative aspect-square w-12 rounded-lg overflow-hidden border border-[#E7DCC6] bg-soft-cream/40 flex-shrink-0">
              <Image src={cat.imageUrl} alt={cat.name} fill className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-serif text-lg font-medium text-espresso truncate">
                {cat.name}
              </h3>
              <p className="text-[11px] text-brown-text/70 truncate">
                /{cat.slug}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
