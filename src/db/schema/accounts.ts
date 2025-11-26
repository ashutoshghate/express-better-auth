/** @format */

// src/db/schema/accounts.ts

/**
 * Account Schema Definition
 * This schema defines the structure of the 'accounts' table in the database.
 */
import {
  mysqlTable,
  varchar,
  text,
  datetime,
  uniqueIndex,
} from "drizzle-orm/mysql-core";
import { relations, sql } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { users } from "./users";

// Account Table Definition
export const accounts = mysqlTable(
  "accounts",
  {
    //Better Auth required fields
    id: varchar("id", { length: 255 })
      .$defaultFn(() => crypto.randomUUID())
      .primaryKey(),
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    accountId: varchar("accountId", { length: 255 }).notNull(),
    providerId: varchar("providerId", { length: 255 }).notNull(),
    accessToken: text("accessToken"),
    refreshToken: text("refreshToken"),
    accessTokenExpiresAt: datetime("accessTokenExpiresAt", {
      mode: "date",
      fsp: 3,
    }),
    refreshTokenExpiresAt: datetime("refreshTokenExpiresAt", {
      mode: "date",
      fsp: 3,
    }),
    scope: varchar("scope", { length: 512 }),
    idToken: text("idToken"),
    password: text("password"),
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
      // BETTERAUTH REQUIREMENT: Unique constraint on (providerId, accountId)
      providerAccountIdIdx: uniqueIndex("provider_account_id_idx").on(
        table.providerId,
        table.accountId
      ),
    };
  }
);
// Account Relations
export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

/**
 * Account Schema Validation with Zod
 * This section defines Zod schemas for validating user data during insertion and selection.
 */

export const insertAccountSchema = createInsertSchema(accounts);
export const selectAccountSchema = createSelectSchema(accounts);
