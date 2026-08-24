import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import { users } from '../test-data/users';

test.describe('Login flow', () => {
  test('login thành công với standard_user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);

    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator('.inventory_list')).toBeVisible();
  });

  test('login thất bại với sai password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.standard.username, 'sai_password');

    await loginPage.expectErrorContains('do not match');
  });

  test('login với locked_out_user báo lỗi bị khóa', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.lockedOut.username, users.lockedOut.password);

    await loginPage.expectErrorContains('locked out');
  });

  test('không điền gì mà bấm Login báo lỗi username required', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('', '');

    await loginPage.expectErrorContains('Username is required');
  });
});