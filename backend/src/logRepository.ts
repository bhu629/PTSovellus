// Kirjausten haku ja tallennus tietokantaan
// Yksi kirjaus = liike, sarjat, toistot, paino ja kommentti
import { db } from "./db";
import { LogEntry, LogInput } from "./types";

// Tietokannan rivi (sarakkeiden nimet kuten taulussa)
type LogRow = {
  id: number;
  exercise_id: number;
  exercise_name: string;
  sets: number;
  weight: number | null;
  reps: number;
  comment: string | null;
  created_at: string;
};

// Muutetaan tietokannan rivi samaan muotoon kuin mobiilissa
function rowToLog(row: LogRow): LogEntry {
  return {
    id: row.id,
    exerciseId: row.exercise_id,
    exerciseName: row.exercise_name,
    sets: row.sets,
    weight: row.weight,
    reps: row.reps,
    comment: row.comment,
    createdAt: row.created_at,
  };
}

// Kirjausten hakukysely, jota käytetään sekä listan että yksittäisen kirjauksen haussa.
// Liikkeen nimi haetaan JOINilla exercises-taulusta.
const SELECT_LOGS = `
  SELECT logs.id, logs.exercise_id, exercises.name AS exercise_name, logs.sets, logs.weight, logs.reps, logs.comment, logs.created_at
  FROM logs
  JOIN exercises ON exercises.id = logs.exercise_id`;

// Haetaan kirjaukset, päivämäärän tai kuukauden mukaan.
// esim."2026-11%" löytää koko kuukauden.
export function getLogs(userId: number, search: string): LogEntry[] {
  const rows = db
    .prepare(`${SELECT_LOGS} WHERE logs.user_id = ? AND logs.created_at LIKE ? ORDER BY logs.created_at`)
    .all(userId, search + "%") as LogRow[];

  return rows.map(rowToLog);
}

function getLogById(userId: number, logId: number): LogEntry | undefined {
  const row = db
    .prepare(`${SELECT_LOGS} WHERE logs.user_id = ? AND logs.id = ?`)
    .get(userId, logId) as LogRow | undefined;

  if (!row) return undefined;
  return rowToLog(row);
}

// Lisää nollan eteen, jos numero on alle 10, esim. 5 -> "05"
function twoDigits(number: number): string {
  return String(number).padStart(2, "0");
}

// Tekee kirjauksen ajan, esim. "2026-11-10 18:30:00".
// date on päivä, jolle kirjaus tehdään. Jos sitä ei ole, käytetään tätä päivää.
// Kellonaika on aina nykyinen aika.
function makeCreatedAt(date: string | null): string {
  const now = new Date();
  const today = now.getFullYear() + "-" + twoDigits(now.getMonth() + 1) + "-" + twoDigits(now.getDate());
  const time = twoDigits(now.getHours()) + ":" + twoDigits(now.getMinutes()) + ":" + twoDigits(now.getSeconds());

  if (date === null) {
    return today + " " + time;
  }
  return date + " " + time;
}

export function addLog(userId: number, exerciseId: number, input: LogInput, date: string | null): LogEntry {
  const createdAt = makeCreatedAt(date);

  const result = db
    .prepare(
      `INSERT INTO logs (user_id, exercise_id, sets, weight, reps, comment, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    )
    .run(userId, exerciseId, input.sets, input.weight, input.reps, input.comment, createdAt);

  // haetaan juuri tallennettu kirjaus, jotta se voidaan palauttaa mobiiliin
  return getLogById(userId, Number(result.lastInsertRowid)) as LogEntry;
}

// Palauttaa false, jos kirjausta ei löytynyt
export function updateLog(userId: number, logId: number, input: LogInput): boolean {
  const result = db
    .prepare("UPDATE logs SET sets = ?, weight = ?, reps = ?, comment = ? WHERE id = ? AND user_id = ?")
    .run(input.sets, input.weight, input.reps, input.comment, logId, userId);

  return result.changes > 0;
}

// Palauttaa false, jos kirjausta ei löytynyt
export function deleteLog(userId: number, logId: number): boolean {
  const result = db.prepare("DELETE FROM logs WHERE id = ? AND user_id = ?").run(logId, userId);
  return result.changes > 0;
}
