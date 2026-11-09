// Seed-skripti: lisää testikäyttäjän sekä ohjelmat ja liikkeet data.ts:stä tietokantaan.
// Ajo: npm run seed
import { db, TEST_USER_ID } from "./db";
import { programs } from "./data";

const insertProgram = db.prepare(
  "INSERT INTO programs (id, name, description, level, days_per_week) VALUES (?, ?, ?, ?, ?)"
);
const insertExercise = db.prepare(
  "INSERT INTO exercises (id, program_id, day_id, day_name, name, sets, reps) VALUES (?, ?, ?, ?, ?, ?, ?)"
);

function deleteOldPrograms() {
  // Poistaa myös ohjelmien liikkeet (ON DELETE CASCADE)
  db.prepare("DELETE FROM programs").run();
}

function insertTestUser() {
  db.prepare("INSERT OR IGNORE INTO users (id, username) VALUES (?, ?)").run(TEST_USER_ID, "testikayttaja");
}

function insertPrograms() {
  for (const program of programs) {
    insertProgram.run(program.id, program.name, program.description, program.level, program.daysPerWeek);

    for (const day of program.days) {
      for (const exercise of day.exercises) {
        insertExercise.run(exercise.id, program.id, day.id, day.name, exercise.name, exercise.sets, exercise.reps);
      }
    }
  }
}

// Transaktio: joko kaikki onnistuu tai mitään ei muuteta
const seedDatabase = db.transaction(() => {
  deleteOldPrograms();
  insertTestUser();
  insertPrograms();
});

seedDatabase();
console.log("Seed valmis");
