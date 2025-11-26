/** @format */

// src/db/migrate.ts

/**
 *  Create Database Migrations.
 */
import "@config/env";

import { migrate } from "drizzle-orm/mysql2/migrator";
import { db } from "./connection.js";
// NOTE: Use connection.js for ESM compatibility, matching your imports in index.ts

// Define the core migration logic
async function runMigrations() {
  console.log("⏳ Starting database migrations...");

  try {
    // The migrate function reads the generated SQL files from the './drizzle' directory
    await migrate(db, { migrationsFolder: "./drizzle" });

    console.log("✅ Migrations complete!");
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  } finally {
    // Exit the process after migration is done
    process.exit(0);
  }
}

// Execute the migration function
runMigrations();
