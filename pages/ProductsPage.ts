import { Page, Locator, expect } from "@playwright/test";

export class ProductsPage {
  readonly page: Page;
  readonly productsLink: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productsLink = page.getByRole("link", { name: "Products" });
    this.searchInput = page.locator("#search_product");
    this.searchButton = page.locator("#submit_search");
  }

  async goToProducts() {
    await this.productsLink.click();
  }

  async searchForProduct(productName: string) {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
  }

  async addProductToCart(productName: string) {
    const productCard = this.page
      .locator(".productinfo")
      .filter({ hasText: productName });
    const addToCartButton = productCard.locator("a.add-to-cart");
    await productCard.scrollIntoViewIfNeeded();
    await productCard.hover();
    await addToCartButton.waitFor({ state: "visible", timeout: 5000 });
    await addToCartButton.click({ force: true });
  }

  async clickViewCartFromPopup() {
    await this.page.getByRole("link", { name: "View Cart" }).click();
  }
}
