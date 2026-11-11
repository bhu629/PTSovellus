// Kirjausten haku ja tallennus tietokantaan
// Yksi kirjaus = yksi sarja (liike, paino ja toistot)
import { db } from "./db";
import { LogEntry } from "./types";

// liikkeen nimi haetaan tietokannasta JOINilla exercises-taulusta.
type LogRow = {
  id: number;
  exercise_id: number;
  exercise_name: string;
  weight: number | null;
  reps: number;
  created_at: string;
};

// Muutetaan tietokannan rivi samaan muotoon kuin mobiilissa
function rowToLog(row: LogRow): LogEntry {
  return {
    id: row.id,
    exerciseId: row.exercise_id,
    exerciseName: row.exercise_name,
    weight: row.weight,
    reps: row.reps,
    createdAt: row.created_at,
  };
}

// Haetaan kirjaukset, päivämäärän tai kuukauden mukaan.
// esim."2026-11%" löytää koko kuukauden.
export function getLogs(userId: number, search: string): LogEntry[] {
  const rows = db
    .prepare(
      `SELECT logs.id, logs.exercise_id, exercises.name AS exercise_name, logs.weight, logs.reps, logs.created_at
       FROM logs
       JOIN exercises ON exercises.id = logs.exercise_id
       WHERE logs.user_id = ? AND logs.created_at LIKE ?
       ORDER BY logs.created_at`
    )
    .all(userId, search + "%") as LogRow[];

  return rows.map(rowToLog);
}

export function getLogById(userId: number, logId: number): LogEntry | undefined {
  const row = db
    .prepare(
      `SELECT logs.id, logs.exercise_id, exercises.name AS exercise_name, logs.weight, logs.reps, logs.created_at
       FROM logs
       JOIN exercises ON exercises.id = logs.exercise_id
       WHERE logs.user_id = ? AND logs.id = ?`
    )
    .get(userId, logId) as LogRow | undefined;

  if (!row) return undefined;
  return rowToLog(row);
}

// date on päivä, jolle sarja kirjataan, esim. "2026-11-10". Jos sitä ei ole, käytetään tätä päivää.
export function addLog(userId: number, exerciseId: number, weight: number | null, reps: number, date: string | null): LogEntry {
  // created_at = päivä + nykyinen kellonaika, esim. "2026-11-10 18:30:00"
  // COALESCE valitsee ensimmäisen arvon, joka ei ole null
  // localtime, jotta myöhään illalla tehty treeni ei mene seuraavalle päivälle
  const result = db
    .prepare(
      `INSERT INTO logs (user_id, exercise_id, weight, reps, created_at)
       VALUES (?, ?, ?, ?, COALESCE(?, date('now', 'localtime')) || ' ' || time('now', 'localtime'))`
    )
    .run(userId, exerciseId, weight, reps, date);

  return getLogById(userId, Number(result.lastInsertRowid))!;
}

// Palauttaa false, jos kirjausta ei löytynyt
export function updateLog(userId: number, logId: number, weight: number | null, reps: number): boolean {
  const result = db
    .prepare("UPDATE logs SET weight = ?, reps = ? WHERE id = ? AND user_id = ?")
    .run(weight, reps, logId, userId);

  return result.changes > 0;
}

// Palauttaa false, jos kirjausta ei löytynyt
export function deleteLog(userId: number, logId: number): boolean {
  const result = db.prepare("DELETE FROM logs WHERE id = ? AND user_id = ?").run(logId, userId);
  return result.changes > 0;
}
