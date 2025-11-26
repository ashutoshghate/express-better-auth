/** @format */

// src/utils/logger.ts
import winston from "winston";
import path from "path";

const logDir = path.join(process.cwd(), "logs");

const { combine, timestamp, printf, colorize, errors, json } = winston.format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

export const logger = winston.createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  format: combine(errors({ stack: true }), timestamp(), logFormat),
  transports: [
    // Console output (colorized in dev)
    new winston.transports.Console({
      format: combine(colorize(), timestamp(), logFormat),
    }),
    // File logs (structured JSON for production)
    new winston.transports.File({
      filename: path.join(logDir, "error.log"),
      level: "error",
      format: combine(timestamp(), json()),
    }),
    new winston.transports.File({
      filename: path.join(logDir, "combined.log"),
      format: combine(timestamp(), json()),
    }),
  ],
});
