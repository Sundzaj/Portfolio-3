import { Page, Locator } from "@playwright/test";

export class AccountPage {
  readonly page: Page;
  readonly loggedInAsText: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loggedInAsText = page.locator("text=Logged in as");
    this.logoutLink = page.getByRole("link", { name: "Logout" });
  }

  async logout() {
    await this.logoutLink.click();
  }
}
