import * as React from "react";
import { notFound } from "next/navigation";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CollectionBrowser } from "@/components/collections/CollectionBrowser";
import {
  CATEGORIES_DATA,
  COLLECTIONS_DATA,
  PRODUCTS_DATA,
  type MockProduct,
} from "@/lib/data/mockData";

export async function generateStaticParams() {
  const catSlugs = CATEGORIES_DATA.map((c) => ({ slug: c.slug }));
  const colSlugs = COLLECTIONS_DATA.map((c) => ({ slug: c.slug }));
  return [...catSlugs, ...colSlugs];
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const category = CATEGORIES_DATA.find((c) => c.slug === params.slug);
  const collection = COLLECTIONS_DATA.find((c) => c.slug === params.slug);
  const title = category?.name || collection?.name || "Collection";
  const desc =
    category?.description ||
    collection?.description ||
    "Handpicked artificial jewellery by Phabulous by Mitthat.";

  return {
    title: `${title} Jewellery`,
    description: desc,
  };
}

export default function CollectionPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;

  const category = CATEGORIES_DATA.find((c) => c.slug === slug);
  const collection = COLLECTIONS_DATA.find((c) => c.slug === slug);

  if (!category && !collection) {
    notFound();
  }

  const title = category ? category.name : collection!.name;
  const description = category ? category.description : collection!.description;

  // Find products matching either category or collection
  let products: MockProduct[] = [];
  if (category) {
    products = PRODUCTS_DATA.filter((p) => p.categorySlug === slug);
  } else if (collection) {
    products = PRODUCTS_DATA.filter((p) =>
      p.collectionSlugs.includes(slug)
    );
  }

  // If few items in demo, supplement with related products so the grid looks full and beautiful
  if (products.length < 4) {
    const others = PRODUCTS_DATA.filter((p) => !products.some((x) => x.id === p.id));
    products = [...products, ...others.slice(0, 8 - products.length)];
  }

  return (
    <div className="min-h-screen flex flex-col bg-warm-white">
      <AnnouncementBar />
      <Header isOverHero={false} />

      <main className="flex-1 max-w-7xl mx-auto px-4 md:px-8 py-8 w-full">
        <Breadcrumbs
          items={[
            { label: "Collections", href: "/collections" },
            { label: title },
          ]}
          className="mb-6"
        />

        <div className="text-center space-y-2 mb-10">
          <span className="text-xs font-sans tracking-widest text-antique-gold uppercase font-semibold">
            Handpicked Jewellery
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-espresso heading-wash">
            {title}
          </h1>
          <p className="text-sm text-brown-text/80 max-w-md mx-auto font-sans">
            {description}
          </p>
        </div>

        <CollectionBrowser initialProducts={products} title={title} />
      </main>

      <Footer />
    </div>
  );
}
