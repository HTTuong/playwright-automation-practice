import { test, expect } from '../fixtures/pages.fixture';
import allure from 'allure-js-commons';

test.describe('Test Login cart', async () => {
    await allure.severity('critical');
    await allure.description('Check login with correct account');
    await allure.tags('smoke', 'login');

    test('Sucessfully login', async ({ loginPage, page }) => {
        await loginPage.goto()
        await loginPage.login('standard_user', 'secret_sauce')

        await expect(page).toHaveURL(/inventory/)
        await expect(page.locator('.inventory_list')).toBeVisible()
    })

    test('Login fail with wrong password', async ({ loginPage, page }) => {
        await loginPage.goto()
        await loginPage.login('standard_user', 'sai_password')
        await expect(page.locator('[data-test="error"]')).toBeVisible();
        await loginPage.expectErrorContains('do not match');
    });

    test('Login wwith locked_out_user', async ({ loginPage, page }) => {
        await loginPage.goto()
        await loginPage.login('locked_out_user', 'secret_sauce')

        await page.getByRole('button', { name: 'Login' }).click();
        await loginPage.expectErrorContains('locked out');
    });

    test('Report username required', async ({ loginPage, page }) => {
        await loginPage.goto()
        await loginPage.login('', '')
        await loginPage.expectErrorContains('Username is required')
  });
})