/** @format */
// src/config/cors.ts

/**
 * Configuration for CORS (Cross-Origin Resource Sharing).
 */
export const corsConfig = {
  methods: process.env.CORS_METHODS as string,
  headers: process.env.CORS_HEADERS as string,
  origin: process.env.CORS_ORIGIN as string,
  // Splits multiple origins from the environment variable into a clean array
  allowedOrigins: process.env.CORS_ALLOWED_ORIGINS?.split(",").map((s) =>
    s.trim()
  ) || [process.env.CORS_ORIGIN as string],
};
