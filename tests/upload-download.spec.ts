import { test, expect } from '@playwright/test';

test.describe('File Upload', () => {
  test('upload 1 file successfully', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/upload');

    await page.locator('#file-upload').setInputFiles('test-data/fixtures/sample.txt');
    await page.locator('#file-submit').click();

    await expect(page.locator('#uploaded-files')).toHaveText('sample.txt');
    await expect(page.locator('h3')).toHaveText('File Uploaded!');
  });
});