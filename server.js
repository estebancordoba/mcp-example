const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

// Load tools from the manifest
const toolPaths = require("./mcp-tools.json");
const tools = {};

toolPaths.forEach((toolPath) => {
  const tool = require(path.resolve(__dirname, toolPath));
  tools[tool.name] = tool;
});

// Endpoint to list available tools
app.get("/tools", (req, res) => {
  const available = Object.values(tools).map((tool) => ({
    name: tool.name,
    description: tool.description,
    parameters: tool.parameters,
  }));
  res.json({ tools: available });
});

// Endpoint to execute tools
app.post("/tools/:name", async (req, res) => {
  const tool = tools[req.params.name];
  if (!tool) return res.status(404).json({ error: "Tool not found" });

  try {
    const result = await tool.run(req.body.parameters);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`MCP Server running on port ${PORT}`));
