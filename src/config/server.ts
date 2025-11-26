/** @format */
// src/config/server.ts

/**
 * Configuration for the Server settings.
 */

// Resolve host and port first so they can be reused below
const host = process.env.SERVER_HOST || "localhost";
const port = parseInt(process.env.SERVER_PORT || "3000", 10);

export const serverConfig = {
  host,
  port,
  baseUrl: `http://${host}:${port}`,
  nodeEnv: process.env.NODE_ENV || "development",
  apiPrefix: process.env.API_PREFIX || "/api",
};
// Simple check to ensure core server config is present
if (!serverConfig.port) {
  // In a real app, you might want to log an error and exit gracefully
  console.error("CRITICAL: SERVER_PORT is missing in environment variables.");
}
