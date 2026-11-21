"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";

const POSTS = [
  {
    id: 1,
    tag: "ACCESSORIES",
    date: "FEBRUARY 17, 2026",
    author: "PHABULOUS",
    title: "How to Style Bold Rings & Delicate Layered Chains",
    excerpt: "Discover the secret to effortless everyday luxury with our contemporary ring styling guide.",
    image: "/images/story/artisan.jpg",
  },
  {
    id: 2,
    tag: "FASHION TRENDS",
    date: "FEBRUARY 14, 2026",
    author: "PHABULOUS",
    title: "The Return of Statement Sculptural Bangles in 2026",
    excerpt: "From polished gold cuffs to sleek organic forms, here is what high fashion is wearing this season.",
    image: "/images/categories/bangles.jpg",
  },
  {
    id: 3,
    tag: "EDITORIAL",
    date: "JANUARY 28, 2026",
    author: "PHABULOUS",
    title: "Curating Your Personal Fine Jewellery Capsule Collection",
    excerpt: "Timeless designs that transition seamlessly from daytime meetings to elegant evenings.",
    image: "/images/categories/necklaces.jpg",
  },
];

export function ReadJournalSection() {
  return (
    <section className="w-full bg-white py-16 md:py-20 border-t border-[#F0F0F0]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-[#222222] font-normal mb-2">
            Read Journal
          </h2>
          <p className="text-xs md:text-sm text-[#777777] font-sans">
            Latest trends and inspirations in fashion design.
          </p>
        </div>

        {/* Grid of Journal Posts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {POSTS.map((post) => (
            <article key={post.id} className="flex flex-col group">
              {/* Image Container with Tag Badge */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#FAFAFA] mb-4">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <span className="absolute top-4 left-4 z-10 px-3 py-1 bg-[#222222] text-white text-[10px] font-bold tracking-widest uppercase">
                  {post.tag}
                </span>
              </div>

              {/* Meta */}
              <div className="text-[11px] font-medium uppercase tracking-wider text-[#888888] mb-2">
                <span>{post.author}</span> - <span>{post.date}</span>
              </div>

              {/* Title */}
              <h3 className="text-lg md:text-xl font-serif text-[#222222] font-normal group-hover:text-[#888888] transition-colors leading-snug mb-2">
                <Link href="/pages/about">
                  {post.title}
                </Link>
              </h3>

              {/* Excerpt */}
              <p className="text-xs md:text-sm text-[#666666] leading-relaxed line-clamp-2">
                {post.excerpt}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
