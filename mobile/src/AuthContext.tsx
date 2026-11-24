// AuthContext tietää, onko käyttäjä kirjautunut. Kaikki sivut voivat käyttää sitä.
// Täällä ovat myös kirjautuminen, rekisteröinti ja uloskirjautuminen.
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { apiFetch, loadToken, removeToken, saveToken, setOnUnauthorized } from "@/api";

type AuthContextValue = {
  isLoading: boolean; // true, kunnes tallennettu token on luettu muistista
  isLoggedIn: boolean;
  // palauttavat virheviestin, tai null jos kaikki onnistui
  login: (email: string, password: string) => Promise<string | null>;
  register: (name: string, email: string, password: string) => Promise<string | null>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Kun sovellus käynnistyy: jos muistissa on token, käyttäjä on vielä kirjautunut
    loadToken().then((token) => {
      setIsLoggedIn(token !== null);
      setIsLoading(false);
    });

    // Jos backend ei hyväksy tokenia, token poistetaan ja käyttäjä menee kirjautumissivulle
    setOnUnauthorized(async () => {
      await removeToken();
      setIsLoggedIn(false);
    });
  }, []);

  // Tätä käyttävät sekä kirjautuminen että rekisteröinti. Lähettää tiedot ja tallentaa tokenin.
  async function sendCredentials(path: string, body: object): Promise<string | null> {
    try {
      const response = await apiFetch(path, { method: "POST", body: JSON.stringify(body) });
      const data = await response.json();
      if (!response.ok) {
        return data.error ?? "Jokin meni pieleen";
      }
      await saveToken(data.token);
      setIsLoggedIn(true);
      return null;
    } catch {
      return "Palvelimeen ei saatu yhteyttä";
    }
  }

  function login(email: string, password: string) {
    return sendCredentials("/api/auth/login", { email, password });
  }

  function register(name: string, email: string, password: string) {
    return sendCredentials("/api/auth/register", { name, email, password });
  }

  async function logout() {
    try {
      await apiFetch("/api/auth/logout", { method: "POST" }); // token poistetaan myös backendista
    } catch {
      // jos palvelin ei vastaa, käyttäjä kirjataan silti ulos puhelimessa
    }
    await removeToken();
    setIsLoggedIn(false);
  }

  return (
    <AuthContext.Provider value={{ isLoading, isLoggedIn, login, register, logout }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth pitää olla AuthProviderin sisällä");
  return value;
}
