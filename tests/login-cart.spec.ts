import { test, expect } from '../fixtures/pages.fixture';
import * as allure from 'allure-js-commons';

test.describe('Test Login cart', () => {
    test('Sucessfully login', async ({ loginPage, page }) => {
        await allure.severity('critical');
        await allure.description('Check login with correct account');
        await allure.tags('smoke', 'login');

        await loginPage.goto()
        await loginPage.login('standard_user', 'secret_sauce')

        await expect(page).toHaveURL(/inventory/)
        await expect(page.locator('.inventory_list')).toBeVisible()
    })

    test('Login fail with wrong password', async ({ loginPage, page }) => {
        await allure.severity('critical');
        await allure.tags('login');

        await loginPage.goto()
        await loginPage.login('standard_user', 'sai_password')
        await expect(page.locator('[data-test="error"]')).toBeVisible();
        await loginPage.expectErrorContains('do not match');
    });

    test('Login wwith locked_out_user', async ({ loginPage, page }) => {
        await allure.tags('login');

        await loginPage.goto()
        await loginPage.login('locked_out_user', 'secret_sauce')
        await loginPage.expectErrorContains('locked out');
    });

    test('Report username required', async ({ loginPage, page }) => {
        await allure.tags('login', 'validation');

        await loginPage.goto()
        await loginPage.login('', '')
        await loginPage.expectErrorContains('Username is required')
    });
})