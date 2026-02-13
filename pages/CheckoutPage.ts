import { Page, Locator } from "@playwright/test";

export class CheckoutPage {
  readonly page: Page;
  readonly placeOrderButton: Locator;

  readonly nameOnCardInput: Locator;
  readonly cardNumberInput: Locator;
  readonly cvcInput: Locator;
  readonly expiryMonthInput: Locator;
  readonly expiryYearInput: Locator;

  readonly confirmOrderButton: Locator;
  readonly orderPlacedHeader: Locator;

  constructor(page: Page) {
    this.page = page;

    this.placeOrderButton = page.getByRole("link", { name: "Place Order" });

    this.nameOnCardInput = page.locator('input[data-qa="name-on-card"]');
    this.cardNumberInput = page.locator('input[data-qa="card-number"]');
    this.cvcInput = page.locator('input[data-qa="cvc"]');
    this.expiryMonthInput = page.locator('input[data-qa="expiry-month"]');
    this.expiryYearInput = page.locator('input[data-qa="expiry-year"]');

    this.confirmOrderButton = page.locator('button[data-qa="pay-button"]');

    this.orderPlacedHeader = page.getByRole("heading", {
      name: "Order Placed!",
    });
  }

  async clickPlaceOrder() {
    await this.placeOrderButton.click();
  }

  async fillPaymentDetails() {
    await this.nameOnCardInput.fill("Dawid Tester");
    await this.cardNumberInput.fill("4111111111111111");
    await this.cvcInput.fill("123");
    await this.expiryMonthInput.fill("12");
    await this.expiryYearInput.fill("2030");
  }

  async confirmOrder() {
    await this.confirmOrderButton.click();
  }
}
