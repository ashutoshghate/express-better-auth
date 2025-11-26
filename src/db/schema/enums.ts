/** @format */

// src/db/schema/enums.ts

/**
 * This file defines and exports all enum types used in the database schema.
 * Add your enum definitions and exports here.
 */
import { mysqlEnum } from "drizzle-orm/mysql-core";
import { z } from "zod";

/**
 * Drizzle Enum Definition
 * Defines user roles for the application.
 * Used in database schema definitions.
 */

// Declare Enum Values below this
export const Roles = ["ADMIN", "EDITOR", "AUTHOR", "USER", "GUEST"] as const;

// Export Drizzle Enum for use in schema definitions
export const UserRoleEnum = mysqlEnum("role", Roles).default("USER");

/**
 * Zod Schema Definitions
 * Used for validation and type safety in the application.
 */
export const UserRoleZodEnumSchema = z.enum(Roles);
