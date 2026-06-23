import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { Property } from './types/property';
import { propertiesData } from './data/propertiesData';

const dbPath = path.resolve(__dirname, '..', 'database.db');
const db = new Database(dbPath);

// Initialize database schema
db.exec(`
  CREATE TABLE IF NOT EXISTS properties (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    curatorComment TEXT,
    tag TEXT NOT NULL,
    type TEXT NOT NULL,
    sector TEXT NOT NULL,
    comuna TEXT NOT NULL,
    priceUF REAL NOT NULL,
    priceCLP REAL NOT NULL,
    builtArea INTEGER NOT NULL,
    terrainArea INTEGER,
    features TEXT NOT NULL, -- JSON array of strings
    images TEXT NOT NULL -- JSON array of image URLs
  );
`);

// Seed initial data if the table is empty
const count = db.prepare('SELECT COUNT(*) as count FROM properties').get() as { count: number };
if (count.count === 0) {
  const insert = db.prepare(`
    INSERT INTO properties (
      code, title, description, curatorComment, tag, type, sector, comuna, 
      priceUF, priceCLP, builtArea, terrainArea, features, images
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const transaction = db.transaction((data: Property[]) => {
    for (const item of data) {
      insert.run(
        item.code,
        item.title,
        item.description,
        item.curatorComment || null,
        item.tag,
        item.type,
        item.sector,
        item.comuna,
        item.priceUF,
        item.priceCLP,
        item.builtArea,
        item.terrainArea || null,
        JSON.stringify(item.features),
        JSON.stringify(item.images)
      );
    }
  });

  transaction(propertiesData);
  console.log('[SQLite DB] Seeded initial properties data.');
}

export default db;
