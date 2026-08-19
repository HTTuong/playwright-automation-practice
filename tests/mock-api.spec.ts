import { test, expect } from '@playwright/test';

test('Mock error 500 to test error process', async ({ page }) => {
  await page.route('**/jsonplaceholder.typicode.com/posts/1', async (route) => {
    await route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ error: 'Internal Server Error' }),
    });
  });

  
  await page.goto('https://jsonplaceholder.typicode.com');
  const status = await page.evaluate(async () => {
    const res = await fetch('/posts/1');
    return res.status;
  });

  expect(status).toBe(500);
});

test('Mock not found 404', async ({ page }) => {
  await page.route('**/jsonplaceholder.typicode.com/posts/1', async (route) => {
    await route.fulfill({
      status: 404,
      contentType: 'application/json',
      body: JSON.stringify({ data: [] }),
    });
  });

  await page.goto('https://jsonplaceholder.typicode.com');
  const status = await page.evaluate(async () => {
    const res = await fetch('/posts/1');
    return res.status;
  });

  expect(status).toBe(404);
});

test('Mock timeout - request is delayed', async ({ page }) => {
  await page.route('**/jsonplaceholder.typicode.com/posts', async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await route.continue();
  });

  await page.goto('https://jsonplaceholder.typicode.com');
  const start = Date.now();
  await page.evaluate(async () => {
    await fetch('/posts');
  });
  const duration = Date.now() - start;
  expect(duration).toBeGreaterThanOrEqual(2000);
});