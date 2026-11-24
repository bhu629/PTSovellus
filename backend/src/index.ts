import express from "express";
import { requireAuth } from "./auth";
import authRoutes from "./routes/authRoutes";
import logRoutes from "./routes/logRoutes";
import programRoutes from "./routes/programRoutes";

const app = express();
const PORT = 3000; 

app.use(express.json());

// Terveystarkistus: kertoo, että palvelin on käynnissä
app.get("/api/health", (request, response) => {
  response.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/programs", programRoutes);
// Kaikki kirjausreitit vaativat kirjautumisen
app.use("/api/logs", requireAuth, logRoutes);

// Käynnistetään palvelin
app.listen(PORT, () => {
  console.log(`Palvelin käynnissä: http://localhost:${PORT}`);
});
