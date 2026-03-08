// Weather MCP Agent Client

const readline = require("readline");

// CLI Interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Tool Registry (Agent capabilities)
const tools = {
  weather: {
    name: "get_weather",
    description: "Retrieve current weather for a city",
    endpoint: "http://localhost:3000/mcp",
  },
};

// Intent Analyzer
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

// Entity Extraction (City)
function extractCity(userInput) {
  const match = userInput.match(/in ([a-zA-Z\s]+)/i);
  return match ? match[1].trim() : null;
}

// Agent Decision Engine
async function handleQuery(userInput) {

  console.log("\nAgent Reasoning Steps");
  console.log("--------------------------");

  const analysis = analyzeIntent(userInput);

  console.log("Intent detected:", analysis.intent);

  if (analysis.intent === "weather") {

    const city = extractCity(userInput);

    if (!city) {
      console.log("Agent: Please specify a city (example: 'Weather in Seattle')");
      return;
    }

    const selectedTool = tools.weather;

    console.log("Selected Tool:", selectedTool.name);
    console.log("Extracted City:", city);
    console.log("Calling MCP Server...\n");

    try {

      const response = await fetch(selectedTool.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tool: selectedTool.name,
          params: { city }
        }),
      });

      const data = await response.json();

      if (!data.success) {
        console.log("Tool Error:", data.error);
        return;
      }

      const forecast = data.result;

      console.log("Weather Report");
      console.log("--------------------------");
      console.log(`City: ${forecast.city}`);
      console.log(`Temperature: ${forecast.temperature}`);
      console.log(`Wind: ${forecast.wind}`);
      console.log(`Condition: ${forecast.condition}`);
      console.log("--------------------------");

    } catch (err) {
      console.log("Agent Error:", err.message);
    }

  } else {
    console.log("Agent: I currently support weather queries only.");
  }
}

// Start Agent
rl.question("Ask the Weather Agent: ", async (input) => {
  await handleQuery(input);
  rl.close();
});