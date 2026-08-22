import initSqlJs from 'sql.js';
import fs from 'fs';
import path from 'path';

async function seed() {
  const SQL = await initSqlJs();
  const db = new SQL.Database();

  db.run(`
    CREATE TABLE products (
      name TEXT PRIMARY KEY,
      price REAL NOT NULL
    );
  `);

  const referenceProducts = [
    { name: 'Sauce Labs Backpack', price: 29.99 },
    { name: 'Sauce Labs Bike Light', price: 9.99 },
    { name: 'Sauce Labs Bolt T-Shirt', price: 15.99 },
    { name: 'Sauce Labs Fleece Jacket', price: 49.99 },
    { name: 'Sauce Labs Onesie', price: 7.99 },
    { name: 'Test.allTheThings() T-Shirt (Red)', price: 15.99 },
  ];

  const insert = db.prepare('INSERT INTO products (name, price) VALUES (?, ?)');
  for (const p of referenceProducts) {
    insert.run([p.name, p.price]);
  }
  insert.free();

  // sql.js làm việc trong memory, cần tự export ra file binary
  const data = db.export();
  const dbPath = path.join(__dirname, 'reference.db');
  fs.writeFileSync(dbPath, Buffer.from(data));

  db.close();
  console.log('Reference DB seeded at', dbPath);
}

seed();