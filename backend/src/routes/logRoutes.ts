// Treenikirjaukset. Osoitteet alkavat /api/logs
// index.ts ajaa requireAuthin ennen näitä reittejä, joten getUserId kertoo aina kirjautuneen käyttäjän.
// Käyttäjä käsittelee siis vain omia kirjauksiaan.
import { Router } from "express";
import { addLog, deleteLog, getLogs, updateLog } from "../logRepository";
import { getUserId } from "../auth";
import { LogInput } from "../types";

const router = Router();

// Lukee kirjauksen kentät pyynnön rungosta ja muuttaa ne oikeisiin tyyppeihin.
// Paino saa puuttua (kehonpainoliikkeet), ja tyhjä kommentti tallennetaan null-arvona.
function readLogInput(body: Record<string, unknown>): LogInput {
  return {
    sets: Number(body.sets),
    reps: Number(body.reps),
    weight: body.weight == null ? null : Number(body.weight),
    comment: body.comment ? String(body.comment) : null,
  };
}

// Palauttaa virheilmoituksen tai null, jos kentät ovat kunnossa
function validateLogInput(input: LogInput): string | null {
  if (!input.sets || input.sets < 1) return "Sarjat puuttuu";
  if (!input.reps || input.reps < 1) return "Toistot puuttuu";
  if (input.weight !== null && Number.isNaN(input.weight)) return "Paino ei kelpaa";
  return null;
}

// GET /api/logs?month=2026-11 tai /api/logs?date=2026-11-11
router.get("/", (request, response) => {
  const month = request.query.month;
  const date = request.query.date;

  let search = ""; // tyhjä = kaikki kirjaukset
  if (typeof date === "string") {
    search = date;
  } else if (typeof month === "string") {
    search = month;
  }

  response.json(getLogs(getUserId(response), search));
});

// POST /api/logs, esim. { "exerciseId": 1, "sets": 3, "reps": 8, "weight": 80, "comment": "kevyt päivä", "date": "2026-11-10" }
router.post("/", (request, response) => {
  const exerciseId = Number(request.body.exerciseId);
  const input = readLogInput(request.body);
  // päivä saa puuttua, silloin käytetään tätä päivää
  const date = request.body.date == null ? null : String(request.body.date);

  const error = validateLogInput(input);
  if (error) {
    response.status(400).json({ error });
    return;
  }

  // päivän pitää olla muotoa "2026-11-10"
  if (date !== null && !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    response.status(400).json({ error: "Päivämäärä pitää olla muotoa YYYY-MM-DD" });
    return;
  }

  try {
    const log = addLog(getUserId(response), exerciseId, input, date);
    response.status(201).json(log); // 201 Created
  } catch {
    // esim. liikettä ei ole olemassa (viiteavain ei täsmää)
    response.status(400).json({ error: "Kirjauksen tallennus epäonnistui" });
  }
});

// PUT /api/logs/5, esim. { "sets": 4, "reps": 6, "weight": 82.5, "comment": "raskas" }
router.put("/:id", (request, response) => {
  const id = Number(request.params.id);
  const input = readLogInput(request.body);

  const error = validateLogInput(input);
  if (error) {
    response.status(400).json({ error });
    return;
  }

  // Toisen käyttäjän kirjausta ei löydy, koska haku tehdään myös user_id:llä
  const updated = updateLog(getUserId(response), id, input);
  if (!updated) {
    response.status(404).json({ error: "Kirjausta ei löytynyt" });
    return;
  }

  response.json({ message: "Kirjaus päivitetty" });
});

// DELETE /api/logs/5
router.delete("/:id", (request, response) => {
  const id = Number(request.params.id);
  const deleted = deleteLog(getUserId(response), id);

  if (!deleted) {
    response.status(404).json({ error: "Kirjausta ei löytynyt" });
    return;
  }

  response.json({ message: "Kirjaus poistettu" });
});

export default router;
