import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('Combined scenario — upload, multi-tab, iframe', () => {
  test('user uploads a file, opens a new tab, and edits content in an iframe', async ({ page, context }) => {
    // Upload file successfully
    await page.goto('https://the-internet.herokuapp.com/upload');
    await page.locator('#file-upload').setInputFiles('test-data/fixtures/sample.txt');
    await page.locator('#file-submit').click();
    await expect(page.locator('#uploaded-files')).toHaveText('sample.txt');

    // Open a new tab from another page, verify independently with tab upload
    await page.goto('https://the-internet.herokuapp.com/windows');
    const [newTab] = await Promise.all([
      context.waitForEvent('page'),
      page.getByRole('link', { name: 'Click Here' }).click(),
    ]);
    await newTab.waitForLoadState();
    await expect(newTab.locator('h3')).toHaveText('New Window');

    // In he new tab, navigate to fixture iframe, fill editable area
    const fixturePath = path.join(__dirname, '../test-fixtures/iframe-editor.html');
    await newTab.goto(`file://${fixturePath}`);
    const editableArea = newTab.frameLocator('#editor-frame').locator('#editable-area');
    await editableArea.fill('Edited from the second tab');
    await expect(editableArea).toHaveText('Edited from the second tab');

    // Close the new tab, verify the original tab
    await newTab.close();
    await expect(page.locator('#uploaded-files')).toHaveText('sample.txt');
    expect(context.pages().length).toBe(1);
  });
});