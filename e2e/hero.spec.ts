import { test, expect } from "@playwright/test";

test.describe("Jewellery Box Hero", () => {
  test("renders correctly on mobile (390px)", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    const hero = page.getByTestId("jewellery-box-hero");
    await expect(hero).toBeVisible();

    // Check title and tagline
    await expect(page.getByTestId("hero-slide-title")).toHaveText("Rings");
    await expect(page.getByText("Handpicked jewellery, simply irresistible")).toBeVisible();

    // Verify slide change
    await page.getByTestId("hero-next-btn").click();
    await expect(page.getByTestId("hero-slide-title")).toHaveText("Necklaces");
  });

  test("renders correctly on desktop (1440px)", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");

    const hero = page.getByTestId("jewellery-box-hero");
    await expect(hero).toBeVisible();
    await expect(page.getByTestId("hero-slide-title")).toHaveText("Rings");

    // Click next slide
    await page.getByTestId("hero-next-btn").click();
    await expect(page.getByTestId("hero-slide-title")).toHaveText("Necklaces");
  });
});
