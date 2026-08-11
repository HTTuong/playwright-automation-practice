import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';

test.describe('Test Login cart', () => {
    test.beforeEach(async ({page}) => {
        page.goto('https://www.saucedemo.com')
    })

    test('Sucessfully login', async ({ page }) => {
        const loginPage = new LoginPage(page)
        await loginPage.goto()
        await loginPage.login('standard_user', 'secret_sauce')

        await expect(page).toHaveURL(/inventory/)
        await expect(page.locator('.inventory_list')).toBeVisible()
    })

    test('Login fail with wrong password', async ({ page }) => {
        await page.getByPlaceholder('Username').fill('standard_user');
        await page.getByPlaceholder('Password').fill('sai_password');
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.locator('[data-test="error"]')).toBeVisible();
        await expect(page.locator('[data-test="error"]')).toContainText('do not match');
    });

    test('Login wwith locked_out_user', async ({ page }) => {
        await page.getByPlaceholder('Username').fill('locked_out_user');
        await page.getByPlaceholder('Password').fill('secret_sauce');
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.locator('[data-test="error"]')).toContainText('locked out');
    });

    test('Report username required', async ({ page }) => {
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.locator('[data-test="error"]')).toContainText('Username is required');
  });
})