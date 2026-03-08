<<<<<<< HEAD
# Agentic AI using Weather MCP

## Assignment: Task 2 – Build an Agentic AI using Weather MCP

## Objective

Design and implement an Agentic AI solution where:

- One MCP Tool provides weather information using **https://api.weather.gov/**
- One Agent accepts natural language queries
- The Agent detects intent and delegates execution to exactly one tool
- The Agent returns a clean, formatted response

---

# System Architecture

User Query  
↓  
Agent (Intent Detection + Tool Selection)  
↓  
MCP Tool (Weather Tool)  
↓  
api.weather.gov  
↓  
Formatted Response  

---

# Components

## MCP Tool – Weather Information Tool

### Responsibilities:
- Accept city name as input
- Convert city → latitude & longitude (geocoding step)
- Call **api.weather.gov**
- Parse weather response
- Return structured JSON output

### Weather Data Source (Mandatory):
https://api.weather.gov/

---

## Agent

### Responsibilities:
- Accept natural language input
- Perform intent detection
- Extract city entity
- Select appropriate tool
- Invoke exactly ONE tool
- Format response for user

---

# Technologies Used

- Node.js v22
- Express.js
- Native Fetch API
- National Weather Service API (api.weather.gov)

---

# How to Run the Project

## Step 1: Install Dependencies

```bash
npm install
=======
# weather-mcp-agent
Build an Agentic AI using Weather MCP
>>>>>>> da64714afc42f86f2ae184d661ca79a0f801e4de
