import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const db = await open({
  filename: './adoptme.db',
  driver: sqlite3.Database
});

await db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    password TEXT
  )
`);

await db.exec(`
  CREATE TABLE IF NOT EXISTS refuges (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    city TEXT,
    address TEXT,
    phone TEXT
  )
`);

await db.exec(`
  CREATE TABLE IF NOT EXISTS animals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    type TEXT,
    age INTEGER,
    sex TEXT,
    size TEXT,
    description TEXT,
    image TEXT,
    refuge_id INTEGER,
    FOREIGN KEY(refuge_id) REFERENCES refuges(id)
  )
`);

console.log("Tables SQLite créées ✅");