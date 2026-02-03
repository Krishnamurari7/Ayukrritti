import { test, expect } from "@playwright/test";

test.describe("E-commerce Flow", () => {
  test("should display homepage", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toContainText("Welcome to TechStore");
  });

  test("should navigate to products page", async ({ page }) => {
    await page.goto("/");
    await page.click('text="Shop Now"');
    await expect(page).toHaveURL(/.*products/);
  });

  test("should display product details", async ({ page }) => {
    await page.goto("/products");
    await page.click(".product-card:first-child");
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator('button:has-text("Add to Cart")')).toBeVisible();
  });

  test("should require login for checkout", async ({ page }) => {
    await page.goto("/checkout");
    await expect(page).toHaveURL(/.*login/);
  });
});
