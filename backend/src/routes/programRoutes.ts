// Treeniohjelmat. Osoitteet alkavat /api/programs. Ohjelmat ovat kaikille samat, joten kirjautumista ei vaadita.
import { Router } from "express";
import { getAllPrograms, getProgramById } from "../programRepository";

const router = Router();

// GET /api/programs
router.get("/", (request, response) => {
  response.json(getAllPrograms());
});

// GET /api/programs/2
router.get("/:id", (request, response) => {
  const id = Number(request.params.id); // URL:n id on tekstiä, muutetaan numeroksi
  const program = getProgramById(id);

  if (!program) {
    // 404 Not Found
    response.status(404).json({ error: "Ohjelmaa ei löytynyt" });
    return;
  }

  response.json(program);
});

export default router;
