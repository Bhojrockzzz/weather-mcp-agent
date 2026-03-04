const readline = require("readline");

//Create CLI Interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//Tool Registry (Agent Capabilities)
const tools = {
  weather: {
    name: "get_weather",
    description: "Retrieves current weather for a US city using api.weather.gov",
    endpoint: "http://localhost:3000/mcp",
  },
};

//Intent Analyzer
function analyzeIntent(userInput) {
  const input = userInput.toLowerCase();

  const weatherKeywords = [
    "weather",
    "temperature",
    "forecast",
    "rain",
    "wind",
    "climate",
  ];

  const isWeatherIntent = weatherKeywords.some((word) =>
    input.includes(word)
  );

  if (isWeatherIntent) {
    return { intent: "weather" };
  }

  return { intent: "unknown" };
}

//Entity Extraction (City)
function extractCity(userInput) {
  const match = userInput.match(/in ([a-zA-Z\s]+)/i);
  return match ? match[1].trim() : null;
}

//Agent Decision Engine
async function handleQuery(userInput) {
  console.log("\nAgent analyzing intent...");

  const analysis = analyzeIntent(userInput);

  if (analysis.intent === "weather") {
    const city = extractCity(userInput);

    if (!city) {
      console.log("Please specify a city (e.g., 'Weather in Seattle').");
      return;
    }

    const selectedTool = tools.weather;

    console.log(`Delegating to tool: ${selectedTool.name}`);
    console.log(`Extracted City: ${city}`);

    try {
      const response = await fetch(selectedTool.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tool: selectedTool.name,
          params: { city },
        }),
      });

      const data = await response.json();

      if (data.error) {
        console.log("Tool Error:", data.error);
        return;
      }

      const forecast = data.forecast;

      console.log("\n Weather Report");
      console.log("----------------------");
      console.log(`City: ${forecast.city}`);
      console.log(`Temperature: ${forecast.temperature}`);
      console.log(`Wind: ${forecast.wind}`);
      console.log(`Condition: ${forecast.condition}`);
      console.log("----------------------");

    } catch (err) {
      console.log("Failed to invoke tool:", err.message);
    }

  } else {
    console.log("Agent: I can currently assist only with weather-related queries.");
  }
}

//Start Agent
rl.question("Ask something: ", async (input) => {
  await handleQuery(input);
  rl.close();
});