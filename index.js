import express from "express";
import fetch from "node-fetch";

const app = express();

// Route racine simple pour tester le serveur
app.get("/", (req, res) => {
  res.send("Serveur météo en ligne !");
});

// Route météo
app.get("/meteo", async (req, res) => {
  const apiKey = process.env.OPENWEATHER_API_KEY; // Clé à mettre dans Render -> Environment
  const ville = "Saguenay,ca";

  if (!apiKey) {
    return res.json({ error: "Clé API non configurée" });
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${ville}&units=metric&appid=${apiKey}`
    );
    const data = await response.json();

    if (data.cod !== 200) {
      return res.json({ error: "Impossible de récupérer la météo", message: data.message });
    }

    res.json({
      temperature: data.main.temp,
      description: data.weather[0].description,
      ville: data.name
    });
  } catch (err) {
    res.json({ error: "Impossible de récupérer la météo", details: err.message });
  }
});

// Démarrage du serveur
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serveur lancé sur le port ${port}`);
});
