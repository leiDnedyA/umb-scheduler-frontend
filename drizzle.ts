import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from './schemas';

export const sqlite = Database(process.env.DATABASE_URL!);
export const db = drizzle(sqlite, {schema});

// Create tables
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    hashed_password TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (strftime('%s', 'now')),
    email_verified TEXT
  )
`);

