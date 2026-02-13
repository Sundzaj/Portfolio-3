import { Page, Locator } from "@playwright/test";

export class SignupPage {
  readonly page: Page;
  readonly passwordInput: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly addressInput: Locator;
  readonly stateInput: Locator;
  readonly cityInput: Locator;
  readonly zipcodeInput: Locator;
  readonly mobileNumberInput: Locator;
  readonly createAccountButton: Locator;
  readonly accountCreatedHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.passwordInput = page.locator('input[data-qa="password"]');
    this.firstNameInput = page.locator('input[data-qa="first_name"]');
    this.lastNameInput = page.locator('input[data-qa="last_name"]');
    this.addressInput = page.locator('input[data-qa="address"]');
    this.stateInput = page.locator('input[data-qa="state"]');
    this.cityInput = page.locator('input[data-qa="city"]');
    this.zipcodeInput = page.locator('input[data-qa="zipcode"]');
    this.mobileNumberInput = page.locator('input[data-qa="mobile_number"]');
    this.createAccountButton = page.locator('button[data-qa="create-account"]');
    this.accountCreatedHeader = page.getByRole("heading", {
      name: "Account Created!",
    });
  }

  async fillAccountDetails(password: string) {
    await this.passwordInput.fill(password);
  }

  async fillAddressDetails(
    firstName: string,
    lastName: string,
    address: string,
    state: string,
    city: string,
    zipcode: string,
    mobile: string,
  ) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.addressInput.fill(address);
    await this.stateInput.fill(state);
    await this.cityInput.fill(city);
    await this.zipcodeInput.fill(zipcode);
    await this.mobileNumberInput.fill(mobile);
  }

  async clickCreateAccount() {
    await this.createAccountButton.click();
  }
}
