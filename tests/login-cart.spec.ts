import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';

test.describe('Test Login cart', () => {
    test('Sucessfully login', async ({ page }) => {
        const loginPage = new LoginPage(page)
        await loginPage.goto()
        await loginPage.login('standard_user', 'secret_sauce')

        await expect(page).toHaveURL(/inventory/)
        await expect(page.locator('.inventory_list')).toBeVisible()
    })

    test('Login fail with wrong password', async ({ page }) => {
        const loginPage = new LoginPage(page)
        await loginPage.goto()
        await loginPage.login('standard_user', 'sai_password')
        await expect(page.locator('[data-test="error"]')).toBeVisible();
        await expect(page.locator('[data-test="error"]')).toContainText('do not match');
    });

    test('Login wwith locked_out_user', async ({ page }) => {
        const loginPage = new LoginPage(page)
        await loginPage.goto()
        await loginPage.login('locked_out_user', 'secret_sauce')

        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.locator('[data-test="error"]')).toContainText('locked out');
    });

    test('Report username required', async ({ page }) => {
        const loginPage = new LoginPage(page)
        await loginPage.goto()
        await loginPage.login('', '')
        await loginPage.expectErrorContains('Username is required')
  });
})