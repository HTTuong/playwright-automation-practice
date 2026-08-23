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

  test('Open many tabs, verify each tab independently', async ({ page, context }) => {
        await page.goto('https://the-internet.herokuapp.com/windows');

        const [tab1] = await Promise.all([
            context.waitForEvent('page'),
            page.getByRole('link', { name: 'Click Here' }).click(),
        ]);
        await tab1.waitForLoadState();

        // All Pages is opening in this context
        const allPages = context.pages();
        expect(allPages.length).toBe(2); // orginal tab + new tab

        await expect(tab1.locator('h3')).toHaveText('New Window');

        await tab1.close();

        // After closing, context only has 1 page/tab
        expect(context.pages().length).toBe(1);
    });
});