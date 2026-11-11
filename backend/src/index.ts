import express from "express";
import { getAllPrograms, getProgramById } from "./programRepository";
import { addLog, deleteLog, getLogs, updateLog } from "./logRepository";
import { TEST_USER_ID } from "./db";

const app = express();
const PORT = 3000; // sillä se on node.js:n ja expressin oletusportti

app.use(express.json());

// Terveystarkistus: kertoo, että palvelin on käynnissä
app.get("/api/health", (request, response) => {
  response.json({ status: "ok" });
});

app.get("/api/programs", (request, response) => {
    response.json(getAllPrograms());
});

// Yksi ohjelma id:n perusteella, esim. /api/programs/2
app.get("/api/programs/:id", (request, response) => {
  const id = Number(request.params.id); // URL:n id on tekstiä, muutetaan numeroksi
  const program = getProgramById(id); // haetaan ohjelma tietokannasta

  if (!program) {
    // Ohjelmaa ei löytynyt → 404 Not Found
    response.status(404).json({ error: "Ohjelmaa ei löytynyt" });
    return;
  }

  response.json(program);
});

// Kirjaukset. Esim. /api/logs?month=2026-11 tai /api/logs?date=2026-11-11
app.get("/api/logs", (request, response) => {
  const month = request.query.month;
  const date = request.query.date;

  let search = ""; // tyhjä = kaikki kirjaukset
  if (typeof date === "string") {
    search = date;
  } else if (typeof month === "string") {
    search = month;
  }

  response.json(getLogs(TEST_USER_ID, search));
});

// Uusi kirjaus eli yksi sarja, esim. { "exerciseId": 1, "weight": 80, "reps": 8, "date": "2026-11-10" }
app.post("/api/logs", (request, response) => {
  const exerciseId = Number(request.body.exerciseId);
  const reps = Number(request.body.reps);
  // paino saa puuttua (kehonpainoliikkeet)
  const weight = request.body.weight == null ? null : Number(request.body.weight);
  // päivä saa puuttua, silloin käytetään tätä päivää
  const date = request.body.date == null ? null : String(request.body.date);

  if (!reps || reps < 1) {
    response.status(400).json({ error: "Toistot puuttuu" });
    return;
  }

  // päivän pitää olla muotoa "2026-11-10"
  if (date !== null && !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    response.status(400).json({ error: "Päivämäärä pitää olla muotoa YYYY-MM-DD" });
    return;
  }

  try {
    const log = addLog(TEST_USER_ID, exerciseId, weight, reps, date);
    response.status(201).json(log); // 201 Created
  } catch (error) {
    // esim. liikettä ei ole olemassa (viiteavain ei täsmää)
    response.status(400).json({ error: "Kirjauksen tallennus epäonnistui" });
  }
});

// Kirjauksen muokkaus, esim. { "weight": 82.5, "reps": 6 }
app.put("/api/logs/:id", (request, response) => {
  const id = Number(request.params.id);
  const reps = Number(request.body.reps);
  const weight = request.body.weight == null ? null : Number(request.body.weight);

  if (!reps || reps < 1) {
    response.status(400).json({ error: "Toistot puuttuu" });
    return;
  }

  const updated = updateLog(TEST_USER_ID, id, weight, reps);
  if (!updated) {
    response.status(404).json({ error: "Kirjausta ei löytynyt" });
    return;
  }

  response.json({ message: "Kirjaus päivitetty" });
});

app.delete("/api/logs/:id", (request, response) => {
  const id = Number(request.params.id);
  const deleted = deleteLog(TEST_USER_ID, id);

  if (!deleted) {
    response.status(404).json({ error: "Kirjausta ei löytynyt" });
    return;
  }

  response.json({ message: "Kirjaus poistettu" });
});

// Käynnistetään palvelin
app.listen(PORT, () => {
  console.log(`Palvelin käynnissä: http://localhost:${PORT}`);
});
