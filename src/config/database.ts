/** @format */

// src/config/database.ts

/**
 * Configuration for the Database connection.
 */
export const databaseConfig = {
  // Full connection URL is often preferred for ORMs (like TypeORM or Prisma)
  url: process.env.DATABASE_URL as string,

  // Individual components for granular control or manual connection
  host: process.env.DATABASE_HOST as string,
  port: parseInt(process.env.DATABASE_PORT || "3306", 10),
  user: process.env.DATABASE_USER as string,
  password: process.env.DATABASE_PASSWORD as string,
  name: process.env.DATABASE_NAME as string,
};
// Simple check to ensure core DB config is present
if (!databaseConfig.url || !databaseConfig.user) {
  // In a real app, you might want to log an error and exit gracefully
  console.error(
    "CRITICAL: DATABASE_URL or DATABASE_USER is missing in environment variables."
  );
}
