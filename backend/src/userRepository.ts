// Käyttäjien ja kirjautumisten (sessioiden) käsittely tietokannassa
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { db } from "./db";
import { User } from "./types";

type UserRow = {
  id: number;
  name: string;
  email: string;
  password_hash: string;
};

// Mobiiliin lähetetään vain nimi ja sähköposti, ei salasanatiivistettä
function rowToUser(row: UserRow): User {
  return { id: row.id, name: row.name, email: row.email };
}

function findUserByEmail(email: string): UserRow | undefined {
  return db.prepare("SELECT * FROM users WHERE email = ?").get(email) as UserRow | undefined;
}

// Palauttaa undefined, jos sähköposti on jo käytössä
export function createUser(name: string, email: string, password: string): User | undefined {
  if (findUserByEmail(email)) {
    return undefined;
  }

  // bcrypt lisää salasanaan satunnaisen suolan ja tekee siitä tiivisteen.
  // 10 = kuinka monta kierrosta lasketaan (isompi = hitaampi murtaa, mutta myös hitaampi kirjautua)
  const passwordHash = bcrypt.hashSync(password, 10);
  const result = db
    .prepare("INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)")
    .run(name, email, passwordHash);

  return { id: Number(result.lastInsertRowid), name, email };
}

// Palauttaa undefined, jos sähköposti tai salasana on väärin
export function checkLogin(email: string, password: string): User | undefined {
  const row = findUserByEmail(email);
  if (!row || !bcrypt.compareSync(password, row.password_hash)) {
    return undefined;
  }
  return rowToUser(row);
}

// Luo uuden kirjautumisen ja palauttaa sen tokenin.
// Token on 32 satunnaista tavua heksana, joten sitä ei voi arvata.
export function createSession(userId: number): string {
  const token = crypto.randomBytes(32).toString("hex");
  db.prepare("INSERT INTO sessions (token, user_id) VALUES (?, ?)").run(token, userId);
  return token;
}

// Kenen token tämä on? undefined = tokenia ei ole (väärä tai kirjauduttu ulos)
export function getUserIdByToken(token: string): number | undefined {
  const row = db.prepare("SELECT user_id FROM sessions WHERE token = ?").get(token) as { user_id: number } | undefined;
  return row?.user_id;
}

export function deleteSession(token: string): void {
  db.prepare("DELETE FROM sessions WHERE token = ?").run(token);
}
