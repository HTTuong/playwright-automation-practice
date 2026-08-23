import { test, expect } from '@playwright/test';

test.describe('Iframe handling', () => {
  test('Fill text into rich text editor in iframe', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/iframe');

    const editorBody = page.frameLocator('#mce_0_ifr').locator('#tinymce');

    await editorBody.click();
    await editorBody.fill('Content test in written into iframe');

    await expect(editorBody).toHaveText('Content test in written into iframe');
  });

  test('Delete default text and type a new text ', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/iframe');
    const editorBody = page.frameLocator('#mce_0_ifr').locator('#tinymce');

    await expect(editorBody).toContainText('Your content goes here');

    await editorBody.click();
    await editorBody.press('Control+A');
    await editorBody.press('Delete');
    await editorBody.type('A New Text');

    await expect(editorBody).toHaveText('A New Text');
  });
});