import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";

test.describe("Navigation - Home to Login", () => {
  test("User can navigate to Signup/Login page", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goToHomePage();
    await homePage.acceptConsentIfVisible();
    await homePage.goToSignupLogin();
    await expect(page).toHaveURL(/login/);
    await expect(
      page.getByRole("heading", { name: "Login to your account" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "New User Signup!" }),
    ).toBeVisible();
  });
});
