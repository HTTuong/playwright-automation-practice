import { test, expect } from '@playwright/test';

test.describe('Multi-tab / window handling', () => {
  test('Open a new tab, verify content, return to original tab ', async ({ page, context }) => {
    await page.goto('https://the-internet.herokuapp.com/windows');

    // Must setup Promise.all - wait event 'page' and click at the same time
    // Becaue a new tab can open before event is listened.
    const [newTab] = await Promise.all([
      context.waitForEvent('page'),
      page.getByRole('link', { name: 'Click Here' }).click(),
    ]);

    await newTab.waitForLoadState();
    await expect(newTab.locator('h3')).toHaveText('New Window');

    await expect(page.locator('h3')).toHaveText('Opening a new window');

    await newTab.close();
  });
});