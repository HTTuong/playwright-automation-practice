import { test, expect } from '@playwright/test';

test.describe('File Upload', () => {
  test('upload 1 file successfully', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/upload');

    await page.locator('#file-upload').setInputFiles('test-data/fixtures/sample.txt');
    await page.locator('#file-submit').click();

    await expect(page.locator('#uploaded-files')).toHaveText('sample.txt');
    await expect(page.locator('h3')).toHaveText('File Uploaded!');
  });


  test('Upload file created in memory (Buffer), not real file ', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/upload');

    await page.locator('#file-upload').setInputFiles({
        name: 'generated.txt',
        mimeType: 'text/plain',
        buffer: Buffer.from('Content is created in running, not available on disk'),
    });
    await page.locator('#file-submit').click();

    await expect(page.locator('#uploaded-files')).toHaveText('generated.txt');
    });

    test('Click on submit without choosing any file', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/upload');
        await page.locator('#file-submit').click();

        await expect(page.locator('#uploaded-files')).toHaveText('');
    });

    test('Download file và verify file name', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/download');

        const downloadPromise = page.waitForEvent('download');
        await page.locator('a.example').first().click();
        const download = await downloadPromise;

        expect(download.suggestedFilename()).toBeTruthy();
        console.log('Downloaded:', download.suggestedFilename());
    });
});

