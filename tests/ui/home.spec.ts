import { test, expect } from "@playwright/test";

test.describe("Home Page - Smoke Test", () => {
  test("Homepage should load successfully", async ({ page }) => {
    await page.goto("/");
    const consentButton = page.getByRole("button", { name: "Consent" });
    if (await consentButton.isVisible()) {
      await consentButton.click();
    }
    await expect(page).toHaveTitle(/Automation Exercise/);
    await expect(page.getByRole("link", { name: "Home" })).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Signup / Login" }),
    ).toBeVisible();
  });
});
