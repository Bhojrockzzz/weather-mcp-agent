const express = require("express");
const { toolRegistry } = require("./tools/toolRegistry");

const app = express();
app.use(express.json());

app.post("/mcp", async (req, res) => {

  const { tool, params } = req.body;

  if (!toolRegistry[tool]) {
    return res.status(400).json({
      error: `Tool '${tool}' not found`
    });
  }

  try {
    const result = await toolRegistry[tool](params);

    res.json({
      success: true,
      tool,
      result
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }

});

app.listen(3000, () => {
  console.log("MCP Tool Server running on port 3000");
});