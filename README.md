# MCP Tools

This is a test project containing sample tools that can be registered with an MCP (Model Context Protocol) server.

## Overview

This directory contains individual tool implementations that can be used by the MCP server:

- `getUserPurchaseHistory.js`: A tool to fetch purchase history for a specified user

## How Tools Work

Each tool in this directory:
1. Exports a function that implements the tool's logic
2. Can be registered with the MCP server in the main project
3. Becomes available to agents that connect to the MCP server

## Adding New Tools

To add a new tool:
1. Create a new JavaScript file with your tool implementation
2. Export a function that receives parameters and returns a result
3. Register the tool in the main MCP server
