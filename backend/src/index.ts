import express from "express";
import { getAllPrograms, getProgramById } from "./programRepository";

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

// Käynnistetään palvelin
app.listen(PORT, () => {
  console.log(`Palvelin käynnissä: http://localhost:${PORT}`);
});