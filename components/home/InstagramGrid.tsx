import * as React from "react";
import Image from "next/image";
import { Instagram } from "lucide-react";
import { cn } from "@/lib/utils";

export function InstagramGrid() {
  const posts = [
    { id: 1, image: "/images/instagram/insta-1.jpg", handle: "@phabulousbymitthat" },
    { id: 2, image: "/images/instagram/insta-2.jpg", handle: "@phabulousbymitthat" },
    { id: 3, image: "/images/instagram/insta-3.jpg", handle: "@phabulousbymitthat" },
    { id: 4, image: "/images/instagram/insta-4.jpg", handle: "@phabulousbymitthat" },
    { id: 5, image: "/images/instagram/insta-5.jpg", handle: "@phabulousbymitthat" },
    { id: 6, image: "/images/instagram/insta-6.jpg", handle: "@phabulousbymitthat" },
  ];

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-[#EFE7DC] border-t border-[#D6C2A3]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 md:px-8">
        <div className="flex flex-col items-center text-center mb-6 sm:mb-8">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-espresso font-normal tracking-tight">
            #PhabulousJewels on Instagram
          </h2>
          <p className="text-xs sm:text-sm text-brown-text/80 max-w-md mt-1.5 font-sans">
            Tag @phabulousbymitthat to get featured on our brand feed!
          </p>
        </div>

        <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
          {posts.map((post, idx) => (
            <a
              key={post.id}
              href="https://www.instagram.com/phabulous_by_mitthat"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "group relative aspect-square rounded-[10px] sm:rounded-[12px] overflow-hidden border border-[#D6C2A3] bg-white shadow-xs",
                idx >= 3 ? "hidden sm:block" : ""
              )}
              aria-label="View Instagram post"
            >
              <Image
                src={post.image}
                alt="Phabulous Jewellery styling on Instagram"
                fill
                sizes="(max-width: 768px) 50vw, 16vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-espresso/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-2">
                <Instagram className="w-6 h-6 text-gold mb-1" />
                <span className="text-[10px] font-sans font-medium">{post.handle}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
