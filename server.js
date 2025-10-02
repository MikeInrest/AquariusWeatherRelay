import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

// Autoriser les requêtes depuis Aquarius
app.use(cors());

const API_KEY = process.env.d25647bbe0a44f633bd0ba5682691725; // clé OpenWeatherMap
const LAT = "48.417"; // latitude du Quai des Croisières
const LON = "-71.067"; // longitude

app.get("/meteo", async (req, res) => {
  if (!API_KEY) {
    return res.json({ error: "Clé API non configurée" });
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=metric&lang=fr`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.main && data.weather) {
      res.json({
        temperature: data.main.temp,
        description: data.weather[0].description,
        humidity: data.main.humidity,
        wind_speed: data.wind.speed
      });
    } else {
      res.json({ error: "Impossible de récupérer la météo" });
    }
  } catch (err) {
    res.json({ error: "Erreur serveur", details: err.message });
  }
});

// Route de test rapide
app.get("/", (req, res) => {
  res.send("Serveur météo en ligne !");
});

app.listen(PORT, () => {
  console.log(`Serveur météo en ligne sur le port ${PORT}`);
});
