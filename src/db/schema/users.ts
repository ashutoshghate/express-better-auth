/** @format */

// src/db/schema/users.ts

import {
  varchar,
  mysqlTable,
  datetime,
  boolean,
  index,
} from "drizzle-orm/mysql-core";

import { relations, sql } from "drizzle-orm";
import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { accounts } from "./accounts";
import { UserRoleEnum, UserRoleZodEnumSchema } from "./enums";
import { sessions } from "./sessions";

/**
 * User Schema Definition
 * This schema defines the structure of the 'users' table in the database.
 */
// User Table Definition
export const users = mysqlTable(
  "users",
  {
    //Better Auth required fields
    id: varchar("id", { length: 255 })
      .$defaultFn(() => crypto.randomUUID())
      .primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    emailVerified: boolean("emailVerified").notNull().default(false),
    image: varchar("image", { length: 512 }),
    createdAt: datetime("createdAt", { mode: "date", fsp: 3 })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: datetime("updatedAt", { mode: "date", fsp: 3 })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull()
      .$onUpdateFn(() => new Date()),
    // Additional fields
    //   dob: datetime("dob", { mode: "date" }), // Date of Birth
    //   gender: mysqlEnum("gender", ["male", "female", "other"]), // Gender
    role: UserRoleEnum.notNull().default("USER"), // User Role
    //   isActive: boolean("isActive").notNull().default(true), // Active Status
    //   lastLogin: datetime("lastLogin", { mode: "date", fsp: 3 }), // Last Login Timestamp
  },
  (table) => {
    return {
      roleIdx: index("roleIdx").on(table.role),
    };
  }
);

// User Relations
export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
}));

/**
 * User Schema Validation with Zod
 * This section defines Zod schemas for validating user data during insertion and selection.
 */
export const insertUserSchema = createInsertSchema(users, {
  // Override 'role' validation to use the dedicated Zod enum
  role: UserRoleZodEnumSchema,
  // Example: Require name on insert
  name: z.string().min(2),
});
export const selectUserSchema = createSelectSchema(users, {
  role: UserRoleZodEnumSchema,
});
