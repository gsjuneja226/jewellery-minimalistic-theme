"use client";

import * as React from "react";
import { ChevronUp } from "lucide-react";

export function BackToTopButton() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const toggleVisible = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", toggleVisible, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="fixed bottom-16 md:bottom-8 right-4 md:right-8 z-40 w-10 h-10 md:w-11 md:h-11 bg-[#222222] text-white flex items-center justify-center shadow-lg hover:bg-black transition-all active:scale-95 duration-200"
    >
      <ChevronUp className="w-5 h-5" />
    </button>
  );
}
