import { test, expect } from '@playwright/test';

test.describe('Cart flow', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com');
        await page.getByPlaceholder('Username').fill('standard_user');
        await page.getByPlaceholder('Password').fill('secret_sauce');
        await page.getByRole('button', { name: 'Login' }).click();
    });

    test('Add 1 product to cart', async ({page}) => {
        await page.locator('.inventory_item').first().getByRole('button', {name: 'Add to cart'}).click()
        await expect(page.locator('.shopping_cart_badge')).toHaveText('1')
    })

    test('Add 3 product to cart', async ({page}) => {
        const buttons = page.getByRole('button', { name: 'Add to cart' });
        await buttons.nth(0).click();
        await buttons.nth(1).click();
        await buttons.nth(2).click();
        await expect(page.locator('.shopping_cart_badge')).toHaveText('3');
    })

    test('Remove product in cart', async ({ page }) => {
        await page.locator('.inventory_item').first().getByRole('button', { name: 'Add to cart' }).click();
        await page.locator('.shopping_cart_link').click();
        await page.getByRole('button', { name: 'Remove' }).click();
        await expect(page.locator('.shopping_cart_badge')).toBeHidden();
    });

    test('Check added product in cart', async ({ page }) => {
        const productName = await page.locator('.inventory_item_name').first().textContent();
        await page.locator('.inventory_item').first().getByRole('button', { name: 'Add to cart' }).click();
        await page.locator('.shopping_cart_link').click();
        await expect(page.locator('.inventory_item_name')).toHaveText(productName!);
    });
})
