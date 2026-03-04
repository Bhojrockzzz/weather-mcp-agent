async function getWeather(city) {

    const geoResponse = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${city}&format=json&limit=1`,
        {
            headers: {
                "User-Agent": "agentic-ai-assignment"
            }
        }
    );

    const geoData = await geoResponse.json();

    if (!geoData.length) {
        throw new Error("City not found");
    }

    const { lat, lon } = geoData[0];

    const pointResponse = await fetch(
        `https://api.weather.gov/points/${lat},${lon}`
    );

    const pointData = await pointResponse.json();
    const forecastUrl = pointData.properties.forecast;

    const forecastResponse = await fetch(forecastUrl);
    const forecastData = await forecastResponse.json();

    const today = forecastData.properties.periods[0];

    return {
        city,
        temperature: today.temperature,
        wind: today.windSpeed,
        forecast: today.shortForecast
    };
}

module.exports = { getWeather };