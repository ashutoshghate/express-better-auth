/** @format */

// src/config/logging.ts

/**
 * Logging configuration settings
 */

export const loggingConfig = {
  level: process.env.LOG_LEVEL || "info", // Log level: error, warn, info, verbose, debug, silly
  logToFile: process.env.LOG_TO_FILE === "true" || false, // Enable logging to file
  filePath: process.env.LOG_FILE_PATH || "logs/app", // Log file path
  format: process.env.LOG_FORMAT || "combined", // Log format: combined, common, dev, short, tiny
  sentryDSN: process.env.SENTRY_DSN as string, // Sentry DSN for error tracking
  httpLogsEnabled: process.env.ENABLE_HTTP_LOGS === "true" || false, // Enable or disable logging
};
