import Database from "better-sqlite3";
import path from "path";

// Tietokantatiedosto backend-kansion juuressa (luodaan automaattisesti, jos ei ole olemassa)
const dbPath = path.join(__dirname, "..", "ptapp.db");

export const db = new Database(dbPath);

// SQLite ei oletuksena tarkista viiteavaimia, joten kytketään se päälle
db.pragma("foreign_keys = ON");

// Luodaan taulut, jos niitä ei vielä ole
db.exec(`
  -- Salasanasta tallennetaan vain bcrypt-tiiviste, ei koskaan itse salasanaa
  CREATE TABLE IF NOT EXISTS users (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    name          TEXT NOT NULL,
    email         TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at    TEXT NOT NULL DEFAULT (datetime('now'))
  );

  -- Kirjautumiset: jokainen kirjautuminen saa oman satunnaisen tokenin.
  -- Uloskirjautuessa rivi poistetaan, jolloin token ei enää kelpaa.
  CREATE TABLE IF NOT EXISTS sessions (
    token      TEXT PRIMARY KEY,
    user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS programs (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    name          TEXT NOT NULL,
    description   TEXT NOT NULL,
    level         TEXT NOT NULL CHECK (level IN ('aloittelija', 'keskitaso', 'edistynyt')),
    days_per_week INTEGER NOT NULL
  );

  -- Treenipäivä tallennetaan liikkeen yhteyteen (day_id + day_name),
  -- jotta treenipäiville ei tarvita omaa taulua.
  CREATE TABLE IF NOT EXISTS exercises (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    program_id INTEGER NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
    day_id     INTEGER NOT NULL,
    day_name   TEXT NOT NULL,
    name       TEXT NOT NULL,
    sets       INTEGER NOT NULL,
    reps       TEXT NOT NULL
  );

  -- Kirjaukset: user_id kertoo kenen kirjaus on. Käyttäjä näkee vain omansa.
  CREATE TABLE IF NOT EXISTS logs (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    exercise_id INTEGER NOT NULL REFERENCES exercises(id) ON DELETE CASCADE,
    sets        INTEGER NOT NULL DEFAULT 1,
    weight      REAL,
    reps        INTEGER NOT NULL,
    comment     TEXT,
    created_at  TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);
