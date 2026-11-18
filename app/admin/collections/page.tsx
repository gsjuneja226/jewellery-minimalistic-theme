"use client";

import * as React from "react";
import Image from "next/image";
import { COLLECTIONS_DATA, type MockCollection } from "@/lib/data/mockData";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";
import { Plus, Sparkles } from "lucide-react";

export default function AdminCollectionsPage() {
  const { showToast } = useToast();
  const [collections, setCollections] = React.useState<MockCollection[]>(COLLECTIONS_DATA);
  const [newColName, setNewColName] = React.useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newColName) return;

    const slug = newColName.toLowerCase().replace(/\s+/g, "-");
    const item: MockCollection = {
      id: `col-${Date.now()}`,
      name: newColName,
      slug,
      description: `Curated collection for ${newColName.toLowerCase()}.`,
      imageUrl: "/products/kundan-jadau-choker-set-1.svg",
      isFeatured: true,
    };
    setCollections([...collections, item]);
    setNewColName("");
    showToast(`Added collection "${newColName}"!`, "success");
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E7DCC6]">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl text-espresso">
            Collections & Themes
          </h1>
          <p className="text-xs text-brown-text/80 font-sans mt-0.5">
            Manage occasion-based and curated marketing collections.
          </p>
        </div>
      </div>

      <Card className="p-4 bg-soft-cream/40">
        <form onSubmit={handleAdd} className="flex gap-3">
          <Input
            placeholder="New Collection Name (e.g. Cocktail Nights, Resort Wear)"
            value={newColName}
            onChange={(e) => setNewColName(e.target.value)}
            className="h-10 text-xs bg-white"
          />
          <Button type="submit" variant="primary" size="sm" className="h-10 px-5 flex-shrink-0">
            <Plus className="w-3.5 h-3.5 mr-1" /> Add
          </Button>
        </form>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {collections.map((col) => (
          <div
            key={col.id}
            className="flex items-center gap-3 p-4 rounded-[14px] border border-[#E7DCC6] bg-white shadow-subtle hover:border-gold transition-colors"
          >
            <div className="relative aspect-square w-14 rounded-lg overflow-hidden border border-[#E7DCC6] bg-soft-cream/40 flex-shrink-0">
              <Image src={col.imageUrl} alt={col.name} fill className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-serif text-lg font-medium text-espresso truncate">
                {col.name}
              </h3>
              <p className="text-[11px] text-brown-text/70 line-clamp-1">
                {col.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
