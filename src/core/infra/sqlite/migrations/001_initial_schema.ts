export const migration_001 = `
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    latitude REAL NOT NULL,
    longitude REAL NOT NULL,
    sync_status TEXT NOT NULL DEFAULT 'synced'
  );

  CREATE TABLE IF NOT EXISTS travels (
    id TEXT PRIMARY KEY NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    date TEXT NOT NULL,
    user_id TEXT NOT NULL,
    latitude REAL,
    longitude REAL,
    photo_url TEXT,
    sync_status TEXT NOT NULL DEFAULT 'synced',
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS sync_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    entity_type TEXT NOT NULL,
    entity_id TEXT NOT NULL,
    action TEXT NOT NULL,
    payload TEXT,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`;
