"use client";

import * as React from "react";
import Image from "next/image";
import { Instagram } from "lucide-react";

const INSTA_IMAGES = [
  "/images/instagram/insta-1.jpg",
  "/images/instagram/insta-2.jpg",
  "/images/instagram/insta-3.jpg",
  "/images/instagram/insta-4.jpg",
  "/images/instagram/insta-5.jpg",
  "/images/instagram/insta-6.jpg",
];

export function AlukasInstagramGrid() {
  return (
    <section className="w-full bg-white pt-16 md:pt-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 text-center mb-8 md:mb-12">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-[#222222] font-normal mb-1">
          Follow Us on Instagram
        </h2>
        <a
          href="https://www.instagram.com/phabulous_by_mitthat"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs md:text-sm text-[#777777] font-sans hover:text-black transition-colors"
        >
          @phabulous_by_mitthat
        </a>
      </div>

      {/* 6 Grid items edge-to-edge */}
      <div className="w-full grid grid-cols-3 md:grid-cols-6 gap-0">
        {INSTA_IMAGES.map((src, index) => (
          <a
            key={index}
            href="https://www.instagram.com/phabulous_by_mitthat"
            target="_blank"
            rel="noopener noreferrer"
            className="relative aspect-square overflow-hidden bg-[#FAFAFA] group block"
          >
            <Image
              src={src}
              alt={`Instagram post ${index + 1}`}
              fill
              sizes="(max-width: 768px) 33vw, 16vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            {/* Dark overlay with Instagram icon on hover */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
              <Instagram className="w-6 h-6 text-white stroke-[1.5]" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
