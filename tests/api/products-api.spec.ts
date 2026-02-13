import { test, expect } from "@playwright/test";

test.describe("API Tests - AutomationExercise", () => {
  test("GET products list should return valid response", async ({
    request,
  }) => {
    const response = await request.get(
      "https://automationexercise.com/api/productsList",
    );
    console.log(`Response status: ${response.status()}`);
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body).toContain("products");
    const json = JSON.parse(body);
    expect(json.products.length).toBeGreaterThan(0);
    const productNames = json.products.map((p: any) => p.name);
    expect(productNames).toContain("Blue Top");
  });
});
