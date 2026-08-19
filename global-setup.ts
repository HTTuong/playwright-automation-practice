import { chromium, FullConfig } from '@playwright/test';
import { users } from './test-data/users';

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(config.projects[0].use.baseURL + '/');
  await page.getByPlaceholder('Username').fill(users.standard.username);
  await page.getByPlaceholder('Password').fill(users.standard.password);
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForURL(/inventory/);

  // Save session into file - cookies, localStorage
  await page.context().storageState({ path: 'storageState.json' });

  await browser.close();
}

export default globalSetup;