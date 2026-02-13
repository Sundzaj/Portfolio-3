import { Page, Locator } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly signupLoginLink: Locator;
  readonly consentButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signupLoginLink = page.getByRole("link", { name: "Signup / Login" });
    this.consentButton = page.getByRole("button", { name: "Consent" });
  }

  async goToHomePage() {
    await this.page.goto("/");
  }

  async acceptConsentIfVisible() {
    if (
      await this.consentButton.isVisible({ timeout: 3000 }).catch(() => false)
    ) {
      await this.consentButton.click();
    }
  }

  async goToSignupLogin() {
    await this.signupLoginLink.click();
  }
  async closeAdIfVisible() {
    const adFrame = this.page.frameLocator('iframe[id^="aswift"]');
    const closeButton = adFrame.locator("#dismiss-button");
    if (await closeButton.isVisible({ timeout: 3000 }).catch(() => false)) {
      await closeButton.click();
    }
  }
}
