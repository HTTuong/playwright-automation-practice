import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

test.describe('File Upload', () => {
  test('Upload a file successfully', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/upload');

    await page.locator('#file-upload').setInputFiles('test-data/fixtures/sample.txt');
    await page.locator('#file-submit').click();

    await expect(page.locator('#uploaded-files')).toHaveText('sample.txt');
    await expect(page.locator('h3')).toHaveText('File Uploaded!');
  });

  test('Upload a file generated in memory (Buffer)', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/upload');

    await page.locator('#file-upload').setInputFiles({
      name: 'generated.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from('Content generated at test runtime, no real file on disk'),
    });
    await page.locator('#file-submit').click();

    await expect(page.locator('#uploaded-files')).toHaveText('generated.txt');
  });

  test('Click submit without choosing any file', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/upload');

    await page.locator('#file-submit').click();

    await expect(page.locator('body')).not.toContainText('File Uploaded!');
  });
});

test.describe('File Download', () => {
  test('Download file and verify file name', async ({ page }) => {
    const fixturePath = path.join(__dirname, '../test-fixtures/download-page.html');
    await page.goto(`file://${fixturePath}`);

    const downloadPromise = page.waitForEvent('download');
    await page.locator('#download-link').click();
    const download = await downloadPromise;

    expect(download.suggestedFilename()).toBe('sample-download.txt');
  });

  test('Verify downloaded file has expected content', async ({ page }) => {
    const fixturePath = path.join(__dirname, '../test-fixtures/download-page.html');
    await page.goto(`file://${fixturePath}`);

    const downloadPromise = page.waitForEvent('download');
    await page.locator('#download-link').click();
    const download = await downloadPromise;

    const filePath = await download.path();
    const content = fs.readFileSync(filePath!, 'utf-8');

    expect(content).toContain('Hello from Playwright');
  });
});