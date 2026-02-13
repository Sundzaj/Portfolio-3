import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { LoginPage } from "../../pages/LoginPage";
import { SignupPage } from "../../pages/SignupPage";
import { generateRandomEmail } from "../../utils/randomData";

test.describe("Signup - AutomationExercise", () => {
  test("User can register a new account successfully", async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const signupPage = new SignupPage(page);
    const randomEmail = generateRandomEmail();

    await homePage.goToHomePage();
    await homePage.acceptConsentIfVisible();
    await homePage.goToSignupLogin();
    await expect(
      page.getByRole("heading", { name: "New User Signup!" }),
    ).toBeVisible();
    await loginPage.fillSignupForm(
      process.env.TEST_USER_NAME || "Dawid Tester",
      randomEmail,
    );
    await loginPage.clickSignup();
    await expect(page).toHaveURL(/signup/);
    await signupPage.fillAccountDetails(
      process.env.TEST_USER_PASSWORD || "Test1234!",
    );
    await signupPage.fillAddressDetails(
      process.env.TEST_USER_FIRST_NAME || "Dawid",
      process.env.TEST_USER_LAST_NAME || "Tester",
      process.env.TEST_USER_ADDRESS || "Test Street 1",
      process.env.TEST_USER_STATE || "State",
      process.env.TEST_USER_CITY || "City",
      process.env.TEST_USER_ZIPCODE || "00-001",
      process.env.TEST_USER_MOBILE || "123456789",
    );

    await signupPage.clickCreateAccount();
    await expect(signupPage.accountCreatedHeader).toBeVisible();
  });
});
