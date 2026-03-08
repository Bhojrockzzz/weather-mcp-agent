# Agentic AI using Weather MCP

## Assignment – Task 2: Build an Agentic AI using MCP Tooling

## Objective

Design and implement an **Agentic AI system** where:

* An **Agent** accepts natural language queries
* The agent performs **intent detection and entity extraction**
* The agent delegates execution to **exactly one MCP Tool**
* The MCP tool retrieves **weather data from https://api.weather.gov/**
* The agent formats and returns a **clean, human-readable response**

This project demonstrates a **tool-based agent architecture using the Model Context Protocol (MCP) pattern**.

---

# System Architecture

```
User Query
   ↓
Agent Client (Intent Detection + Entity Extraction)
   ↓
MCP Server (Tool Invocation Layer)
   ↓
Tool Registry
   ↓
Weather MCP Tool
   ↓
api.weather.gov
   ↓
Structured Weather Data
   ↓
Formatted Agent Response
```
---

# Component Explanation

## 1. Agent Client (`test/client.js`)

The **Agent Client** simulates an AI agent capable of:

* Accepting natural language input
* Detecting user intent
* Extracting entities (city name)
* Selecting the appropriate tool
* Invoking the MCP server

### Agent Responsibilities

* Natural language understanding
* Intent detection
* Entity extraction
* Tool delegation
* Response formatting

Example user query:

```
What is the weather in New York?
```

Agent reasoning:

```
Intent: Weather Query
Entity: New York
Tool Selected: get_weather
```

---

# 2. MCP Server (`server.js`)

The **MCP Server** acts as the central tool execution layer.

Responsibilities:

* Receive tool invocation requests
* Validate tool input
* Route execution to the correct tool
* Return structured results to the agent

Example request:

```
POST /mcp
```

Body:

```
{
  "tool": "get_weather",
  "params": {
    "city": "New York"
  }
}
```

---

# 3. Tool Registry (`tools/toolRegistry.js`)

The **Tool Registry** manages all available MCP tools.

Responsibilities:

* Register available tools
* Provide tool lookup functionality
* Enable dynamic tool selection

Example:

```
get_weather → weatherTool.js
```

This design allows new tools to be easily added in the future.

---

# 4. Weather MCP Tool (`tools/weatherTool.js`)

The **Weather Tool** is responsible for retrieving weather data.

### Responsibilities

* Accept city input
* Perform geolocation lookup
* Call the National Weather Service API
* Parse and structure the response
* Return standardized weather data

### Weather API Source

https://api.weather.gov/

Example response returned to the agent:

```
{
  "city": "New York, United States",
  "temperature": "65°F",
  "wind": "9 to 14 mph",
  "condition": "Areas Of Fog then Mostly Cloudy"
}
```

---

# Technologies Used

* Node.js v22
* Express.js
* Native Fetch API
* National Weather Service API (api.weather.gov)

---

# Installation

## Step 1 – Clone Repository

```
git clone https://github.com/Bhojrockzzz/weather-mcp-assignment.git
cd weather-mcp-assignment
```

---

## Step 2 – Install Dependencies

```
npm install
```

---

# Running the Project

## Start MCP Server

```
node server.js
```

Expected output:

```
Weather MCP Server running on port 3000
```

---

## Run the Agent Client

Open another terminal and run:

```
node test/client.js
```

Example interaction:

```
Ask the Weather Agent: What is the weather in New York?
```

Example output:

```
Agent Reasoning Steps
--------------------------
Intent detected: weather
Selected Tool: get_weather
Extracted City: New York

Weather Report
--------------------------
City: New York, United States
Temperature: 65°F
Wind: 9 to 14 mph
Condition: Areas Of Fog then Mostly Cloudy
```

---

# API Testing (Optional)

The MCP server can also be tested using **Postman or curl**.

### Endpoint

```
POST http://localhost:3000/mcp
```

### Request Body

```
{
  "tool": "get_weather",
  "params": {
    "city": "New York"
  }
}
```

### Example Response

```
{
  "success": true,
  "tool": "get_weather",
  "result": {
    "city": "New York, United States",
    "temperature": "65°F",
    "wind": "9 to 14 mph",
    "condition": "Areas Of Fog then Mostly Cloudy"
  }
}
```

---

# Agent Workflow Summary

1. User enters a natural language query
2. Agent analyzes the query
3. Agent detects **weather intent**
4. Agent extracts **city entity**
5. Agent selects **get_weather tool**
6. MCP server invokes weather tool
7. Weather tool calls **api.weather.gov**
8. Response returned to agent
9. Agent formats response for the user

---

# Key Features

* Agent-based architecture
* Intent detection
* Tool delegation
* MCP-style tool invocation
* External API integration
* Modular tool system
* Extensible architecture

---

# Conclusion

This project demonstrates a **basic Agentic AI system built using a tool-based architecture**.
The agent performs reasoning and delegates execution to an MCP tool that retrieves real-time weather data from the National Weather Service API.

The modular design allows easy extension with additional tools, enabling the creation of more advanced **multi-tool AI agents**.
