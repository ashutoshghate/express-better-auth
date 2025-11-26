/** @format */

// src/db/schema/connection.ts

/**
 *  Establish Database Connection Here and export the connection instance.
 * You can use this connection instance throughout your application to interact with the database.
 */
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { databaseConfig } from "@config/database";
import * as schema from "@db/schema/index";

/**
 * @Create a MySQL connection @pool
 * and then initialize Drizzle ORM with it.
 */
const pool = mysql.createPool({
  host: databaseConfig.host,
  port: databaseConfig.port,
  user: databaseConfig.user,
  password: databaseConfig.password,
  database: databaseConfig.name,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

/**
 * @Export the Drizzle ORM database instance
 * to be used in the application.
 */

export const db = drizzle(pool, { schema: schema, mode: "default" });

/**
 *  Test Database Connection status
 */
export async function testDbConnection(): Promise<void> {
  let connection;
  try {
    connection = await pool.getConnection();
    console.log(
      `[DB] Successfully connected to MySQL at ${databaseConfig.host}:${databaseConfig.port}`
    );
  } catch (error: any) {
    console.error(`[DB ERROR] Failed to connect to MySQL: ${error.message}`);
    throw new Error(
      "Database connection failed. Check environment variables and service status."
    );
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
