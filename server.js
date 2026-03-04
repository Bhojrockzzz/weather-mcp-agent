const express = require("express");
const app = express();

app.use(express.json());

app.post("/mcp", async (req, res) => {
  const { tool, params } = req.body;

  if (tool !== "get_weather") {
    return res.status(400).json({ error: "Invalid tool" });
  }

  const city = params.city;

  try {
    //Convert city → lat/lon (using Open-Meteo geocoding)
    // Geocoding is required because api.weather.gov requires lat/lon.
    // Weather data itself is strictly fetched from api.weather.gov as per assignment requirement.
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
    );
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      return res.json({ error: "City not found" });
    }

    const { latitude, longitude, name, country } = geoData.results[0];

    //Call api.weather.gov
    const pointsRes = await fetch(
      `https://api.weather.gov/points/${latitude},${longitude}`
    );
    const pointsData = await pointsRes.json();

    const forecastUrl = pointsData.properties.forecast;

    //Get forecast
    const forecastRes = await fetch(forecastUrl);
    const forecastData = await forecastRes.json();

    const today = forecastData.properties.periods[0];

    return res.json({
      forecast: {
        city: `${name}, ${country}`,
        temperature: `${today.temperature}°${today.temperatureUnit}`,
        wind: `${today.windSpeed}`,
        condition: today.shortForecast
      }
    });

  } catch (err) {
    return res.status(500).json({
      error: "Weather API error",
      details: err.message
    });
  }
});

app.listen(3000, () => {
  console.log("Weather MCP Tool running on port 3000");
});