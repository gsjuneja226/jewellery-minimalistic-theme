import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { JewelleryBoxHero, HERO_SLIDES } from "@/components/hero/JewelleryBoxHero";

describe("JewelleryBoxHero Component", () => {
  it("mounts properly with the initial slide and official logo wordmark", () => {
    const { unmount } = render(<JewelleryBoxHero />);

    // Initial slide is Rings
    const title = screen.getByTestId("hero-slide-title");
    expect(title).toHaveTextContent("Rings");

    const desc = screen.getByTestId("hero-slide-desc");
    expect(desc).toHaveTextContent("Statement rings, bands and AD solitaire-style rings");

    const exploreBtn = screen.getByTestId("hero-explore-btn");
    expect(exploreBtn).toHaveTextContent("Explore rings");
    expect(exploreBtn).toHaveAttribute("href", "/collections/rings");

    // Tagline exists
    expect(screen.getByText("Handpicked jewellery, simply irresistible")).toBeInTheDocument();

    unmount();
  });

  it("switches slides forward and backward correctly", () => {
    render(<JewelleryBoxHero />);

    const nextBtn = screen.getByTestId("hero-next-btn");
    const prevBtn = screen.getByTestId("hero-prev-btn");
    const title = screen.getByTestId("hero-slide-title");

    // Click next -> Necklaces
    fireEvent.click(nextBtn);
    expect(title).toHaveTextContent("Necklaces");
    expect(screen.getByTestId("hero-explore-btn")).toHaveAttribute("href", "/collections/necklaces");

    // Click next again -> Earrings
    fireEvent.click(nextBtn);
    expect(title).toHaveTextContent("Earrings");

    // Click prev -> back to Necklaces
    fireEvent.click(prevBtn);
    expect(title).toHaveTextContent("Necklaces");
  });

  it("navigates via keyboard arrow keys when hero section has focus", () => {
    render(<JewelleryBoxHero />);

    const heroSection = screen.getByTestId("jewellery-box-hero");
    const title = screen.getByTestId("hero-slide-title");

    // Press ArrowRight
    fireEvent.keyDown(heroSection, { key: "ArrowRight" });
    expect(title).toHaveTextContent("Necklaces");

    // Press ArrowLeft
    fireEvent.keyDown(heroSection, { key: "ArrowLeft" });
    expect(title).toHaveTextContent("Rings");
  });
});
