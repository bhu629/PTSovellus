// Tämä tiedosto hoitaa kaikki pyynnöt backendille.
// Token tallennetaan puhelimen salattuun muistiin (expo-secure-store).
// Token lisätään jokaiseen pyyntöön automaattisesti.
import * as SecureStore from "expo-secure-store";

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const TOKEN_KEY = "authToken";

export function loadToken(): Promise<string | null> {
  return SecureStore.getItemAsync(TOKEN_KEY);
}

export function saveToken(token: string): Promise<void> {
  return SecureStore.setItemAsync(TOKEN_KEY, token);
}

export function removeToken(): Promise<void> {
  return SecureStore.deleteItemAsync(TOKEN_KEY);
}

// AuthContext antaa tämän funktion. Sitä kutsutaan, jos backend vastaa 401 (token ei enää toimi).
let onUnauthorized: () => void = () => {};
export function setOnUnauthorized(callback: () => void) {
  onUnauthorized = callback;
}

// Sama kuin fetch, mutta lisää itse backendin osoitteen, JSON-otsakkeen ja tokenin.
// Käyttö: apiFetch("/api/logs?date=2026-11-18") tai apiFetch("/api/logs", { method: "POST", body: ... })
export async function apiFetch(path: string, options: RequestInit = {}): Promise<Response> {
  const token = await loadToken();

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  // token lisätään vain, jos käyttäjä on kirjautunut
  if (token) {
    headers.Authorization = "Bearer " + token;
  }

  const response = await fetch(API_URL + path, { ...options, headers });

  if (response.status === 401 && token) {
    onUnauthorized(); // palataan kirjautumissivulle
  }

  return response;
}

// Hakee tietoa (GET). Jos haku ei onnistu, funktio heittää virheen.
export async function getJson<T>(path: string): Promise<T> {
  const response = await apiFetch(path);
  if (!response.ok) {
    throw new Error(`Haku epäonnistui (${response.status})`);
  }
  return response.json();
}

// Lähettää muutoksen (POST, PUT tai DELETE).
// Palauttaa virheviestin. Jos kaikki onnistui, palauttaa null.
export async function sendData(path: string, method: "POST" | "PUT" | "DELETE", body?: object): Promise<string | null> {
  try {
    const response = await apiFetch(path, { method, body: body ? JSON.stringify(body) : undefined });
    if (!response.ok) {
      const data = await response.json().catch(() => ({})); 
      return data.error ?? "Jokin meni pieleen";
    }
    return null;
  } catch {
    return "Palvelimeen ei saatu yhteyttä";
  }
}
