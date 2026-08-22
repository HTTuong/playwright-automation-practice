import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(__dirname, 'reference.db');
const db = new Database(dbPath);

db.exec(`
  DROP TABLE IF EXISTS products;
  CREATE TABLE products (
    name TEXT PRIMARY KEY,
    price REAL NOT NULL
  );
`);

const insert = db.prepare('INSERT INTO products (name, price) VALUES (?, ?)');

const referenceProducts = [
  { name: 'Sauce Labs Backpack', price: 29.99 },
  { name: 'Sauce Labs Bike Light', price: 9.99 },
  { name: 'Sauce Labs Bolt T-Shirt', price: 15.99 },
  { name: 'Sauce Labs Fleece Jacket', price: 49.99 },
  { name: 'Sauce Labs Onesie', price: 7.99 },
  { name: 'Test.allTheThings() T-Shirt (Red)', price: 15.99 },
];

for (const p of referenceProducts) {
  insert.run(p.name, p.price);
}

db.close();
console.log('Reference DB seeded.');