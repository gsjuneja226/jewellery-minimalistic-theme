import * as React from "react";
import { notFound } from "next/navigation";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProductDetailClient } from "@/components/product/ProductDetailClient";
import {
  PRODUCTS_DATA,
  CATEGORIES_DATA,
  REVIEWS_DATA,
} from "@/lib/data/mockData";

export async function generateStaticParams() {
  return PRODUCTS_DATA.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const product = PRODUCTS_DATA.find((p) => p.slug === params.slug);
  if (!product) return {};

  return {
    title: `${product.title} - ${product.subtitle}`,
    description: product.description.slice(0, 160),
    openGraph: {
      title: product.title,
      description: product.subtitle,
      images: [
        {
          url: product.images[0] || "/brand/og-image.png",
          width: 800,
          height: 1000,
          alt: product.title,
        },
      ],
    },
  };
}

export default function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = PRODUCTS_DATA.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  const category = CATEGORIES_DATA.find((c) => c.slug === product.categorySlug);

  // Related products from same category or collection
  const relatedProducts = PRODUCTS_DATA.filter(
    (p) => p.id !== product.id && p.categorySlug === product.categorySlug
  ).slice(0, 4);

  // Reviews for this product (or sample reviews)
  const productReviews = REVIEWS_DATA.filter((r) => r.productSlug === product.slug);
  const reviewsToShow =
    productReviews.length > 0 ? productReviews : REVIEWS_DATA.slice(0, 3);

  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: product.images,
    description: product.description,
    sku: product.variants[0]?.sku,
    brand: {
      "@type": "Brand",
      name: "Phabulous by Mitthat",
    },
    offers: {
      "@type": "Offer",
      url: `https://phabulousbymitthat.com/products/${product.slug}`,
      priceCurrency: "INR",
      price: (product.variants[0]?.price / 100).toFixed(2),
      availability:
        product.variants[0]?.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewsCount,
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-warm-white">
      {/* JSON-LD for Search Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <AnnouncementBar />
      <Header isOverHero={false} />

      <main className="flex-1 max-w-7xl mx-auto px-4 md:px-8 py-6 w-full">
        <Breadcrumbs
          items={[
            { label: "Collections", href: "/collections" },
            {
              label: category ? category.name : "Jewellery",
              href: category ? `/collections/${category.slug}` : "/collections",
            },
            { label: product.title },
          ]}
          className="mb-6"
        />

        <ProductDetailClient
          product={product}
          relatedProducts={relatedProducts}
          reviews={reviewsToShow}
        />
      </main>

      <Footer />
    </div>
  );
}
