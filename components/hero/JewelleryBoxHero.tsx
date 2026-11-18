"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import styles from "./JewelleryBoxHero.module.css";
import type { JewellerySceneHandle } from "@/lib/three/jewelleryScene";

export interface HeroSlide {
  name: string;
  desc: string;
  slug: string;
  href: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    name: "Rings",
    desc: "Statement rings, bands and AD solitaire-style rings",
    slug: "rings",
    href: "/collections/rings",
  },
  {
    name: "Necklaces",
    desc: "Chains, pearls and layered drops",
    slug: "necklaces",
    href: "/collections/necklaces",
  },
  {
    name: "Earrings",
    desc: "Studs, drops and jhumkas",
    slug: "earrings",
    href: "/collections/earrings",
  },
  {
    name: "Pendants",
    desc: "Stone pendants and lockets",
    slug: "pendants",
    href: "/collections/pendants",
  },
  {
    name: "Bangles & Bracelets",
    desc: "Gold-tone bangles and stone-set cuffs",
    slug: "bangles-bracelets",
    href: "/collections/bangles-bracelets",
  },
];

export function JewelleryBoxHero() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isReady, setIsReady] = React.useState(false);
  const [isInView, setIsInView] = React.useState(true);

  const heroRef = React.useRef<HTMLElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const areaRef = React.useRef<HTMLDivElement>(null);
  const sceneHandleRef = React.useRef<JewellerySceneHandle | null>(null);

  // Position torch light highlight variables based on bounding box
  const updateLightPosition = React.useCallback(() => {
    if (!heroRef.current || !areaRef.current) return;
    const heroRect = heroRef.current.getBoundingClientRect();
    const areaRect = areaRef.current.getBoundingClientRect();
    const tx = areaRect.left - heroRect.left + areaRect.width / 2;
    const ty = areaRect.top - heroRect.top + areaRect.height * 0.3;
    heroRef.current.style.setProperty("--tx", `${tx}px`);
    heroRef.current.style.setProperty("--ty", `${ty}px`);
  }, []);

  const goToSlide = React.useCallback(
    (nextIdx: number, direction: number) => {
      const total = HERO_SLIDES.length;
      const target = (nextIdx + total) % total;
      setCurrentIndex(target);
      if (sceneHandleRef.current) {
        sceneHandleRef.current.goTo(target, direction);
      }
    },
    []
  );

  const nextSlide = React.useCallback(() => {
    goToSlide(currentIndex + 1, 1);
  }, [currentIndex, goToSlide]);

  const prevSlide = React.useCallback(() => {
    goToSlide(currentIndex - 1, -1);
  }, [currentIndex, goToSlide]);

  // Load Three.js scene dynamically after hydration via requestIdleCallback
  React.useEffect(() => {
    let disposed = false;
    const canvas = canvasRef.current;
    if (!canvas) return;

    updateLightPosition();
    window.addEventListener("resize", updateLightPosition);

    const initScene = async () => {
      try {
        const prefersReducedMotion =
          window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const { createJewelleryScene } = await import(
          "@/lib/three/jewelleryScene"
        );

        if (disposed || !canvasRef.current) return;

        const handle = createJewelleryScene(
          canvasRef.current,
          currentIndex,
          prefersReducedMotion
        );
        sceneHandleRef.current = handle;
        setIsReady(true);
      } catch (err) {
        console.warn("WebGL initialization note:", err);
      }
    };

    if ("requestIdleCallback" in window) {
      const idleId = (window as unknown as { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(initScene);
      return () => {
        disposed = true;
        window.removeEventListener("resize", updateLightPosition);
        if ("cancelIdleCallback" in window) {
          (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(idleId);
        }
        if (sceneHandleRef.current) {
          sceneHandleRef.current.dispose();
          sceneHandleRef.current = null;
        }
      };
    } else {
      const timeoutId = setTimeout(initScene, 100);
      return () => {
        disposed = true;
        window.removeEventListener("resize", updateLightPosition);
        clearTimeout(timeoutId);
        if (sceneHandleRef.current) {
          sceneHandleRef.current.dispose();
          sceneHandleRef.current = null;
        }
      };
    }
  }, [updateLightPosition, currentIndex]);

  // Pause render loop with IntersectionObserver when off screen
  React.useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;
        setIsInView(inView);
        if (sceneHandleRef.current) {
          if (inView) {
            sceneHandleRef.current.resume();
          } else {
            sceneHandleRef.current.pause();
          }
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        sceneHandleRef.current?.pause();
      } else if (isInView) {
        sceneHandleRef.current?.resume();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isInView]);

  // Scope arrow keys to when the hero is in view or focused
  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLElement>) => {
      if (!isInView) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevSlide();
      }
    },
    [isInView, nextSlide, prevSlide]
  );

  const currentSlide = HERO_SLIDES[currentIndex];

  return (
    <section
      ref={heroRef}
      className={styles.heroSection}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label="Jewellery box spotlight showcase"
      data-testid="jewellery-box-hero"
    >
      {/* Brand Header inside Hero */}
      <div className={styles.brand}>
        <div className="relative h-14 md:h-20 w-52 md:w-80">
          <Image
            src="/brand/logo-wordmark.png"
            alt="Phabulous by Mitthat"
            fill
            className="object-contain"
            priority
          />
        </div>
        <p className={styles.tagline}>
          Handpicked jewellery, simply irresistible
        </p>
      </div>

      {/* Jewellery Box */}
      <div className={styles.boxContainer}>
        {/* Lid (open, standing up) */}
        <div className={styles.lid}>
          <div className={styles.lidInner} />
        </div>

        {/* Base */}
        <div className={styles.base}>
          <div className={styles.tray} />
          <div className={styles.rim} />
          <div className={styles.clasp} />
        </div>

        {/* Light Cone and Lamp */}
        <div className={styles.cone} />
        <div className={styles.lamp} aria-hidden="true" />

        {/* Area for WebGL 3D Canvas / Sparkles */}
        <div ref={areaRef} className={styles.area} id="hero-jewellery-area">
          <canvas
            ref={canvasRef}
            className={`${styles.canvas} ${isReady ? styles.canvasReady : ""}`}
            aria-hidden="true"
          />

          {/* Sparkles */}
          <i className={`${styles.spark} ${styles.s1}`} aria-hidden="true" />
          <i className={`${styles.spark} ${styles.s2}`} aria-hidden="true" />
          <i className={`${styles.spark} ${styles.s3}`} aria-hidden="true" />
          <i className={`${styles.spark} ${styles.s4}`} aria-hidden="true" />
        </div>
      </div>

      {/* Radial shade */}
      <div className={styles.shade} aria-hidden="true" />

      {/* Navigation and Captions */}
      <div className={styles.nav}>
        <button
          type="button"
          onClick={prevSlide}
          className={styles.arrow}
          aria-label="Previous jewellery piece"
          data-testid="hero-prev-btn"
        >
          <ChevronLeft className="w-6 h-6 stroke-[1.8]" />
        </button>

        <div className={styles.cap} aria-live="polite">
          <h2 className={styles.capTitle} data-testid="hero-slide-title">
            {currentSlide.name}
          </h2>
          <p className={styles.capDesc} data-testid="hero-slide-desc">
            {currentSlide.desc}
          </p>

          <div className={styles.dots} role="tablist" aria-label="Slides">
            {HERO_SLIDES.map((slide, idx) => (
              <button
                key={slide.slug}
                type="button"
                role="tab"
                aria-selected={idx === currentIndex}
                aria-label={`Go to ${slide.name}`}
                onClick={() => goToSlide(idx, idx > currentIndex ? 1 : -1)}
                className={`${styles.dot} ${
                  idx === currentIndex ? styles.dotActive : ""
                }`}
              />
            ))}
          </div>

          <Link
            href={currentSlide.href}
            className={styles.explore}
            data-testid="hero-explore-btn"
          >
            Explore {currentSlide.name.toLowerCase()}
          </Link>
        </div>

        <button
          type="button"
          onClick={nextSlide}
          className={styles.arrow}
          aria-label="Next jewellery piece"
          data-testid="hero-next-btn"
        >
          <ChevronRight className="w-6 h-6 stroke-[1.8]" />
        </button>
      </div>

      {/* Gentle Scroll Cue */}
      <div className={styles.scrollCue} aria-hidden="true">
        <span>Discover More</span>
        <ChevronDown className="w-4 h-4 text-antique-gold animate-bounce" />
      </div>
    </section>
  );
}
