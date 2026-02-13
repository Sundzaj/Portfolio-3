import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { LoginPage } from "../../pages/LoginPage";
import { SignupPage } from "../../pages/SignupPage";
import { AccountPage } from "../../pages/AccountPage";
import { generateRandomEmail } from "../../utils/randomData";

test.describe("Login / Logout Flow - AutomationExercise", () => {
  test("User can signup, logout and login again", async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const signupPage = new SignupPage(page);
    const accountPage = new AccountPage(page);
    const randomEmail = generateRandomEmail();
    const password = process.env.TEST_USER_PASSWORD || "Test1234!";
    const username = process.env.TEST_USER_NAME || "Dawid Tester";

    // GO TO HOME
    await homePage.goToHomePage();
    await homePage.acceptConsentIfVisible();
    await homePage.goToSignupLogin();

    // SIGNUP
    await loginPage.fillSignupForm(username, randomEmail);
    await loginPage.clickSignup();
    await signupPage.fillAccountDetails(password);
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

    // CONTINUE BUTTON AFTER ACCOUNT CREATED
    await page.getByRole("link", { name: "Continue" }).click();

    // ASSERT USER LOGGED IN
    await expect(accountPage.loggedInAsText).toBeVisible();

    // LOGOUT
    await accountPage.logout();
    await expect(page).toHaveURL(/login/);

    // LOGIN AGAIN
    await loginPage.login(randomEmail, password);

    // ASSERT LOGGED IN AGAIN
    await expect(accountPage.loggedInAsText).toBeVisible();
  });
});
