import { describe, it, expect } from "vitest";
import { formatPrice, formatDate, generateOrderNumber, generateSlug } from "@/lib/utils";

describe("Utils", () => {
  describe("formatPrice", () => {
    it("should format price correctly", () => {
      expect(formatPrice(999.99)).toBe("$999.99");
      expect(formatPrice(1000)).toBe("$1,000.00");
      expect(formatPrice(0)).toBe("$0.00");
    });
  });

  describe("formatDate", () => {
    it("should format date correctly", () => {
      const date = new Date("2024-01-15");
      const formatted = formatDate(date);
      expect(formatted).toContain("January");
      expect(formatted).toContain("15");
      expect(formatted).toContain("2024");
    });
  });

  describe("generateOrderNumber", () => {
    it("should generate unique order numbers", () => {
      const order1 = generateOrderNumber();
      const order2 = generateOrderNumber();
      expect(order1).toMatch(/^ORD-/);
      expect(order2).toMatch(/^ORD-/);
      expect(order1).not.toBe(order2);
    });
  });

  describe("generateSlug", () => {
    it("should generate correct slugs", () => {
      expect(generateSlug("iPhone 15 Pro")).toBe("iphone-15-pro");
      expect(generateSlug("Test Product!@#")).toBe("test-product");
      expect(generateSlug("  Spaces  ")).toBe("spaces");
    });
  });
});
