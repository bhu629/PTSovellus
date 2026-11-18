// Rekisteröinti, kirjautuminen ja uloskirjautuminen. Osoitteet alkavat /api/auth
import { Router } from "express";
import { checkLogin, createSession, createUser, deleteSession } from "../userRepository";
import { getSessionToken, requireAuth } from "../auth";

const router = Router();

// sähköposti pienillä kirjaimilla, jotta "Matti@..." ja "matti@..." ovat sama käyttäjä
function normalizeEmail(email: unknown): string {
  return String(email ?? "").trim().toLowerCase();
}

// POST /api/auth/register, esim. { "name": "Matti", "email": "matti@esimerkki.fi", "password": "salasana123" }
router.post("/register", (request, response) => {
  const name = String(request.body.name ?? "").trim();
  const email = normalizeEmail(request.body.email);
  const password = String(request.body.password ?? "");

  if (!name) {
    response.status(400).json({ error: "Nimi puuttuu" });
    return;
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    response.status(400).json({ error: "Sähköposti ei kelpaa" });
    return;
  }

  if (password.length < 6) {
    response.status(400).json({ error: "Salasanan pitää olla vähintään 6 merkkiä" });
    return;
  }

  const user = createUser(name, email, password);
  if (!user) {
    // 409 Conflict = sähköposti on jo käytössä
    response.status(409).json({ error: "Sähköposti on jo käytössä" });
    return;
  }

  // Rekisteröinnin jälkeen käyttäjä on suoraan kirjautunut
  const token = createSession(user.id);
  response.status(201).json({ token, user });
});

// POST /api/auth/login, esim. { "email": "matti@esimerkki.fi", "password": "salasana123" }
router.post("/login", (request, response) => {
  const email = normalizeEmail(request.body.email);
  const password = String(request.body.password ?? "");

  const user = checkLogin(email, password);
  if (!user) {
    // Ei kerrota kumpi oli väärin, ettei voi selvittää mitkä sähköpostit on rekisteröity
    response.status(401).json({ error: "Väärä sähköposti tai salasana" });
    return;
  }

  const token = createSession(user.id);
  response.json({ token, user });
});

// POST /api/auth/logout: token poistetaan, eikä sillä pääse enää sisään
router.post("/logout", requireAuth, (request, response) => {
  deleteSession(getSessionToken(response));
  response.json({ message: "Kirjauduttu ulos" });
});

export default router;
