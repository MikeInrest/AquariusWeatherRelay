const express = require("express");
const fetch = require("node-fetch");
const app = express();
const PORT = process.env.PORT || 3000;

// Ta clé API OpenWeather
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const LAT = 48.417;
const LON = -71.067;

app.get("/weather", async (req, res) => {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=metric&appid=${OPENWEATHER_API_KEY}&lang=fr`
        );
        const data = await response.json();
        if(data.main && data.main.temp != null){
            res.json({ temp: data.main.temp });
        } else {
            res.status(500).json({ error: "Impossible de récupérer la météo" });
        }
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur" });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
