import { test, expect } from '../fixtures/pages.fixture';
import initSqlJs, { Database } from 'sql.js';
import fs from 'fs';
import path from 'path';

let db: Database;

test.beforeAll(async () => {
  const SQL = await initSqlJs();
  const fileBuffer = fs.readFileSync(path.join(__dirname, '../test-data/reference.db'));
  db = new SQL.Database(fileBuffer);
});

test.afterAll(() => {
  db.close();
});

test.describe('Product data reconciliation — UI vs reference DB', () => {
  test('Every products prices on UI match ones in reference DB', async ({ loggedInPage, page }) => {
    const items = page.locator('.inventory_item');
    const count = await items.count();

    for (let i = 0; i < count; i++) {
      const name = await items.nth(i).locator('.inventory_item_name').textContent();
      const priceText = await items.nth(i).locator('.inventory_item_price').textContent();
      const uiPrice = parseFloat(priceText!.replace('$', ''));

      const stmt = db.prepare('SELECT price FROM products WHERE name = ?');
      stmt.bind([name]);
      const found = stmt.step();
      const row = found ? stmt.getAsObject() : null;
      stmt.free();

      expect(row, `Product "${name}" is not in reference DB`).not.toBeNull();
      expect(uiPrice).toBe(row!.price as number);
    }
  });

  test('The number of products on UI matchs to reference DB', async ({ loggedInPage, page }) => {
    const uiCount = await page.locator('.inventory_item').count();

    const stmt = db.prepare('SELECT COUNT(*) as count FROM products');
    stmt.step();
    const result = stmt.getAsObject();
    stmt.free();

    expect(uiCount).toBe(result.count as number);
  });
});