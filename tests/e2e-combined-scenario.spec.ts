import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('Combined scenario — upload, multi-tab, iframe', () => {
  test('user uploads a file, opens a new tab, and edits content in an iframe', async ({ page, context }) => {
    // Upload file successfull in the original tab
    await page.goto('https://the-internet.herokuapp.com/upload');
    await page.locator('#file-upload').setInputFiles('test-data/fixtures/sample.txt');
    await page.locator('#file-submit').click();
    await expect(page.locator('#uploaded-files')).toHaveText('sample.txt');

    // Open a new tab completely 
    const newTab = await context.newPage();
    const fixturePath = path.join(__dirname, '../test-fixtures/iframe-editor.html');
    await newTab.goto(`file://${fixturePath}`);

    // Interact iframe in the new tab 
    const editableArea = newTab.frameLocator('#editor-frame').locator('#editable-area');
    await editableArea.fill('Edited from the second tab');
    await expect(editableArea).toHaveText('Edited from the second tab');

    // Close the new tab, verify original tab
    await newTab.close();
    await expect(page.locator('#uploaded-files')).toHaveText('sample.txt');
    expect(context.pages().length).toBe(1);
  });
});