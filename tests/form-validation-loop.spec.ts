import { test, expect } from '@playwright/test';

const invalidCases = [
  { firstName: '', lastName: 'Hoang', zip: '00100', expectedError: 'First Name is required' },
  { firstName: 'Tuong', lastName: '', zip: '00100', expectedError: 'Last Name is required' },
  { firstName: 'Tuong', lastName: 'Hoang', zip: '', expectedError: 'Postal Code is required' },
];

for (const data of invalidCases) {
  test(`Missing information: ${data.expectedError}`, async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.locator('.inventory_item').first().getByRole('button', { name: 'Add to cart' }).click();
    await page.locator('.shopping_cart_link').click();
    await page.getByRole('button', { name: 'Checkout' }).click();

    await page.locator('[data-test="firstName"]').fill(data.firstName);
    await page.locator('[data-test="lastName"]').fill(data.lastName);
    await page.locator('[data-test="postalCode"]').fill(data.zip);
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.locator('[data-test="error"]')).toContainText(data.expectedError);
  });
}