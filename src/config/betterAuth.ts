/** @format */

// src/config/betterAuth.ts

/**
 * Configuration for BetterAuth.
 */
export const betterAuthConfig = {
  betterAuthUrl: process.env.BETTER_AUTH_URL as string,
  betterAuthSecret: process.env.BETTER_AUTH_SECRET as string,
};
