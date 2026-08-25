import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('Iframe handling', () => {
  test('Fill text into editable area inside iframe', async ({ page }) => {
    const fixturePath = path.join(__dirname, '../test-fixtures/iframe-editor.html');
    await page.goto(`file://${fixturePath}`);

    const editableArea = page.frameLocator('#editor-frame').locator('#editable-area');
    await editableArea.click();
    await editableArea.fill('Content written into the iframe');

    await expect(editableArea).toHaveText('Content written into the iframe');
  });

  test('Delete default text and type a new text', async ({ page }) => {
    const fixturePath = path.join(__dirname, '../test-fixtures/iframe-editor.html');
    await page.goto(`file://${fixturePath}`);

    const editableArea = page.frameLocator('#editor-frame').locator('#editable-area');
    await expect(editableArea).toContainText('Default content');
    
    await editableArea.fill('A New Text');

    await expect(editableArea).toHaveText('A New Text');
  });
});