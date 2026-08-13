import { test, expect } from '../fixtures/pages.fixture';

test.describe('Test Login cart', () => {
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