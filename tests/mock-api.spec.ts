import { test, expect } from '@playwright/test';

test('Mock error 500 to test error process', async ({ page }) => {
  await page.route('**/jsonplaceholder.typicode.com/posts/1', async (route) => {
    await route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ error: 'Internal Server Error' }),
    });
  });

  const response = await page.request.get('https://jsonplaceholder.typicode.com/posts/1');
  expect(response.status()).toBe(500);
});