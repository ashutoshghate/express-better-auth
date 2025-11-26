/** @format */

//src/db/schema/verifications.ts

import {
  mysqlTable,
  varchar,
  datetime,
  uniqueIndex,
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

// Verification Table Definition
export const verifications = mysqlTable(
  "verifications",
  {
    // Better Auth required fields
    id: varchar("id", { length: 255 })
      .$defaultFn(() => crypto.randomUUID())
      .primaryKey(),
    identifier: varchar("identifier", { length: 255 }).notNull(), // e.g., email address
    value: varchar("value", { length: 255 }).notNull(), // e.g., verification token
    expiresAt: datetime("expiresAt", { mode: "date", fsp: 3 }).notNull(),
    createdAt: datetime("createdAt", { mode: "date", fsp: 3 })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: datetime("updatedAt", { mode: "date", fsp: 3 })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull()
      .$onUpdateFn(() => new Date()),
  },
  (table) => {
    return {
      // BETTERAUTH REQUIREMENT: Unique constraint on (identifier, value)
      identifierValueIdx: uniqueIndex("identifier_value_idx").on(
        table.identifier,
        table.value
      ),
    };
  }
);

/**
 * Verification Schema Definition
 * This schema defines the structure of the 'verifications' table in the database.
 */
export const insertVerificationSchema = createInsertSchema(verifications);
export const selectVerificationSchema = createSelectSchema(verifications);
