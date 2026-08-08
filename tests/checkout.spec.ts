import { test, expect } from '@playwright/test';


test.describe('Checkout flow', () => {
    test.beforeEach( async ({page}) => {
        await page.goto('https://www.saucedemo.com')
        await page.getByPlaceholder('Username').fill('standard_user')
        await page.getByPlaceholder('Password').fill('secret_sauce');
        await page.getByRole('button', { name: 'Login' }).click();
    
        await page.locator('.inventory_item').first().getByRole('button', { name: 'Add to cart' }).click();
        await page.locator('.shopping_cart_link').click();
    })

    test('Checkout successfully with full information', async ({ page }) => {
        await page.getByRole('button', { name: 'Checkout' }).click();
        await page.locator('[data-test="firstName"]').fill('Tuong');
        await page.locator('[data-test="lastName"]').fill('Hoang');
        await page.locator('[data-test="postalCode"]').fill('00760');
        await page.getByRole('button', { name: 'Continue' }).click();

        await expect(page.locator('.summary_info')).toBeVisible();
        await page.getByRole('button', { name: 'Finish' }).click();

        await expect(page.getByText('Thank you for your order!')).toBeVisible();
    });


     test('Money in total overview displayed correctly', async ({ page }) => {
        await page.getByRole('button', { name: 'Checkout' }).click();
        await page.locator('[data-test="firstName"]').fill('Tuong');
        await page.locator('[data-test="lastName"]').fill('Hoang');
        await page.locator('[data-test="postalCode"]').fill('00760');
        await page.getByRole('button', { name: 'Continue' }).click();

        await expect(page.locator('.summary_total_label')).toContainText('Total: $');
    });

})