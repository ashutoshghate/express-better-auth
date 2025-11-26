/** @format */

// src/db/schema/sessions.ts

import { mysqlTable, varchar, text, datetime } from "drizzle-orm/mysql-core";
import { relations, sql } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { users } from "./users";

/**
 * Session Schema Definition
 * This schema defines the structure of the 'sessions' table in the database.
 */

// Session Table Definition
export const sessions = mysqlTable("sessions", {
  // Better Auth required fields
  id: varchar("id", { length: 255 })
    .$defaultFn(() => crypto.randomUUID())
    .primaryKey(),
  userId: varchar("userId", { length: 255 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }), // FK to users
  token: varchar("token", { length: 255 }).notNull().unique(), // MUST BE UNIQUE
  expiresAt: datetime("expiresAt", { mode: "date", fsp: 3 }).notNull(),
  ipAddress: varchar("ipAddress", { length: 45 }), // Optional
  userAgent: text("userAgent"), // Optional
  createdAt: datetime("createdAt", { mode: "date", fsp: 3 })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: datetime("updatedAt", { mode: "date", fsp: 3 })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull()
    .$onUpdateFn(() => new Date()),
});

// Session Relations
export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

// Session Zod Schemas
export const insertSessionSchema = createInsertSchema(sessions);
export const selectSessionSchema = createSelectSchema(sessions);
