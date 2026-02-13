import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { LoginPage } from "../../pages/LoginPage";
import { SignupPage } from "../../pages/SignupPage";
import { AccountPage } from "../../pages/AccountPage";
import { ProductsPage } from "../../pages/ProductsPage";
import { CartPage } from "../../pages/CartPage";
import { CheckoutPage } from "../../pages/CheckoutPage";
import { generateRandomEmail } from "../../utils/randomData";

test.describe("E-commerce Checkout Flow - AutomationExercise", () => {
  test("User can search product, add to cart and place an order", async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const signupPage = new SignupPage(page);
    const accountPage = new AccountPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const randomEmail = generateRandomEmail();
    const password = process.env.TEST_USER_PASSWORD || "Test1234!";
    const username = process.env.TEST_USER_NAME || "Dawid Tester";

    // HOME
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

    await page.getByRole("link", { name: "Continue" }).click();
    await homePage.closeAdIfVisible();
    await expect(accountPage.loggedInAsText).toBeVisible();

    // PRODUCTS
    await productsPage.goToProducts();
    await expect(page).toHaveURL(/products/);

    // SEARCH
    const productName = "Blue Top";
    await productsPage.searchForProduct(productName);

    // ADD TO CART
    await productsPage.addProductToCart(productName);

    // VIEW CART (popup)
    await productsPage.clickViewCartFromPopup();
    await expect(page).toHaveURL(/view_cart/);

    // CHECKOUT
    await cartPage.proceedToCheckout();

    // PLACE ORDER
    await checkoutPage.clickPlaceOrder();

    // PAYMENT
    await checkoutPage.fillPaymentDetails();
    await checkoutPage.confirmOrder();

    // ASSERT ORDER PLACED
    await expect(checkoutPage.orderPlacedHeader).toBeVisible();
  });
});
