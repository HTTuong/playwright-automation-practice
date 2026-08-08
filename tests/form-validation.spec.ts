import { test, expect } from '@playwright/test';

test.describe('Checkout form validation', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com');
        await page.getByPlaceholder('Username').fill('standard_user');
        await page.getByPlaceholder('Password').fill('secret_sauce');
        await page.getByRole('button', { name: 'Login' }).click();
        await page.locator('.inventory_item').first().getByRole('button', { name: 'Add to cart' }).click();
        await page.locator('.shopping_cart_link').click();
        await page.getByRole('button', { name: 'Checkout' }).click();
    });

    test('No First Name yells error', async ({ page }) => {
        await page.locator('[data-test="lastName"]').fill('Hoang');
        await page.locator('[data-test="postalCode"]').fill('00100');
        await page.getByRole('button', { name: 'Continue' }).click();
        await expect(page.locator('[data-test="error"]')).toContainText('First Name is required');
    });

    test('No Last Name yells error', async ({ page }) => {
        await page.locator('[data-test="firstName"]').fill('Hoang');
        await page.locator('[data-test="postalCode"]').fill('00100');
        await page.getByRole('button', { name: 'Continue' }).click();
        await expect(page.locator('[data-test="error"]')).toContainText('Last Name is required');
    });

    test('No Zip Code yells error', async ({ page }) => {
        await page.locator('[data-test="firstName"]').fill('Tuong');
        await page.locator('[data-test="lastName"]').fill('Hoang');
        await page.getByRole('button', { name: 'Continue' }).click();
        await expect(page.locator('[data-test="error"]')).toContainText('Postal Code is required');
    });

    test('Fill nothing, First Name error should yell fisrt', async ({ page }) => {
        await page.getByRole('button', { name: 'Continue' }).click();
        await expect(page.locator('[data-test="error"]')).toBeVisible();
    });
})

