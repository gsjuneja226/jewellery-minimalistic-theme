import { test, expect } from "@playwright/test";

test.describe("Storefront & Checkout Flows", () => {
  test("browses home, views collections, searches, and inspects product detail", async ({
    page,
  }) => {
    // 1. Visit homepage
    await page.goto("/");
    await expect(page.getByText("PHABULOUS")).toBeVisible();
    await expect(page.getByText("Handpicked jewellery, simply irresistible")).toBeVisible();

    // 2. Visit collections page
    await page.goto("/collections/rings");
    await expect(page.getByRole("heading", { name: "Rings", level: 1 })).toBeVisible();

    // 3. Search catalog
    await page.goto("/search");
    const searchInput = page.getByPlaceholder("Search rings, necklaces, jhumkas, bridal sets...");
    await searchInput.fill("Choker");
    await expect(page.getByText("Kundan Jadau Choker Set")).toBeVisible();

    // 4. View product page
    await page.goto("/products/kundan-jadau-choker-set");
    await expect(page.getByRole("heading", { name: "Kundan Jadau Choker Set" })).toBeVisible();
    await expect(page.getByText("Anti-Tarnish Care Guide")).toBeVisible();
  });

  test("completes shopping cart, checkout, and guest tracking flow", async ({
    page,
  }) => {
    // 1. View cart
    await page.goto("/cart");
    await expect(page.getByRole("heading", { name: /Your Shopping Bag/ })).toBeVisible();

    // 2. Proceed to checkout
    await page.goto("/checkout");
    await expect(page.getByRole("heading", { name: "1. Delivery Address" })).toBeVisible();

    // 3. Verify order confirmation & invoice
    await page.goto("/order/ORD-9021/confirmation");
    await expect(page.getByText("Order #ORD-9021 Confirmed")).toBeVisible();
    await expect(page.getByText("Download Tax Invoice (PDF)")).toBeVisible();

    // 4. Guest order tracking
    await page.goto("/track-order");
    await expect(page.getByRole("heading", { name: "Track Your Order" })).toBeVisible();
    await expect(page.getByText("Out for Delivery")).toBeVisible();
  });

  test("admin dashboard and product catalog are accessible", async ({
    page,
  }) => {
    await page.goto("/admin");
    await expect(page.getByRole("heading", { name: "Operational Dashboard" })).toBeVisible();

    await page.goto("/admin/products");
    await expect(page.getByRole("heading", { name: "Products Catalog" })).toBeVisible();

    await page.goto("/admin/inventory");
    await expect(page.getByRole("heading", { name: "Inventory & Stock Control" })).toBeVisible();
  });
});
