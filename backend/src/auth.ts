// requireAuth tarkistaa tokenin. Jos token on oikea, pyyntö menee eteenpäin.
// Mobiili lähettää tokenin näin: Authorization: Bearer <token>
import { NextFunction, Request, Response } from "express";
import { getUserIdByToken } from "./userRepository";

// Ottaa tokenin pyynnön otsakkeesta (header).
// Esimerkki: "Bearer abc123" -> "abc123"
function readToken(request: Request): string | undefined {
  const header = request.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return undefined;
  }
  return header.slice("Bearer ".length);
}

export function requireAuth(request: Request, response: Response, next: NextFunction) {
  const token = readToken(request);
  const userId = token ? getUserIdByToken(token) : undefined;

  if (!token || !userId) {
    // 401 = käyttäjä ei ole kirjautunut
    response.status(401).json({ error: "Kirjaudu sisään" });
    return;
  }

  // Tallennetaan käyttäjän id ja token. Näin reitit tietävät, kuka käyttäjä on.
  response.locals.userId = userId;
  response.locals.token = token;
  next();
}

// Apufunktiot reiteille. response.locals on tyyppiä any. Nämä funktiot antavat oikean tyypin.
// Ne toimivat vain, jos requireAuth on ajettu ensin.
export function getUserId(response: Response): number {
  return response.locals.userId;
}

export function getSessionToken(response: Response): string {
  return response.locals.token;
}
