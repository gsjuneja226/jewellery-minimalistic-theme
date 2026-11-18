import * as React from "react";
import Image from "next/image";
import { Instagram } from "lucide-react";

export function InstagramGrid() {
  const posts = [
    { id: 1, image: "/products/kundan-jadau-choker-set-2.svg", handle: "@phabulousbymitthat" },
    { id: 2, image: "/products/chandbali-festive-jhumkas-2.svg", handle: "@phabulousbymitthat" },
    { id: 3, image: "/products/ad-solitaire-statement-ring-2.svg", handle: "@phabulousbymitthat" },
    { id: 4, image: "/products/temple-peacock-cuff-bangle-2.svg", handle: "@phabulousbymitthat" },
    { id: 5, image: "/products/rose-gold-tennis-bracelet-2.svg", handle: "@phabulousbymitthat" },
    { id: 6, image: "/products/sapphire-teardrop-pendant-2.svg", handle: "@phabulousbymitthat" },
  ];

  return (
    <section className="py-16 bg-soft-cream/30 border-t border-[#F1E8D8]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center space-y-2 mb-10">
          <span className="text-xs font-sans tracking-widest text-antique-gold uppercase font-semibold">
            Follow the Sparkle
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-espresso heading-wash">
            #PhabulousJewels on Instagram
          </h2>
          <p className="text-sm text-brown-text/80 max-w-md mx-auto font-sans">
            Tag @phabulousbymitthat to get featured on our brand feed & win a monthly jewellery hamper!
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {posts.map((post) => (
            <a
              key={post.id}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-[12px] overflow-hidden border border-[#E7DCC6]/60 bg-white shadow-xs"
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
