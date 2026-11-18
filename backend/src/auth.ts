// requireAuth-middleware: päästää pyynnön eteenpäin vain, jos mukana on voimassa oleva token.
// Mobiili lähettää tokenin otsakkeessa: Authorization: Bearer <token>
import { NextFunction, Request, Response } from "express";
import { getUserIdByToken } from "./userRepository";

// Poimii tokenin otsakkeesta, esim. "Bearer abc123" -> "abc123"
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
    // 401 Unauthorized = ei kirjautunut
    response.status(401).json({ error: "Kirjaudu sisään" });
    return;
  }

  // Tallennetaan tiedot, jotta reitit tietävät kenen tietoja käsitellään
  response.locals.userId = userId;
  response.locals.token = token;
  next();
}

// Apufunktiot reiteille. response.locals on tyypiltään any, joten nämä antavat oikeat tyypit.
// Toimivat vain reiteissä, joissa requireAuth on ajettu ensin.
export function getUserId(response: Response): number {
  return response.locals.userId;
}

export function getSessionToken(response: Response): string {
  return response.locals.token;
}
