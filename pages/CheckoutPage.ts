import { Page, Locator, expect } from '@playwright/test';

export default class CheckoutPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly cancelButton: Locator;
  readonly errorMessage: Locator;
  readonly summaryInfo: Locator;
  readonly summaryTotal: Locator;
  readonly completeMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.finishButton = page.getByRole('button', { name: 'Finish' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    this.errorMessage = page.locator('[data-test="error"]');
    this.summaryInfo = page.locator('.summary_info');
    this.summaryTotal = page.locator('.summary_total_label');
    this.completeMessage = page.getByText('Thank you for your order!');
  }

  async fillInformation(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continueCheckout() {
    await this.continueButton.click();
  }

  async finishCheckout() {
    await this.finishButton.click();
  }

  async expectErrorContains(text: string) {
    await expect(this.errorMessage).toContainText(text);
  }

  async expectOrderComplete() {
    await expect(this.completeMessage).toBeVisible();
  }
}