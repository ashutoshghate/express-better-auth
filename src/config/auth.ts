/** @format */

// src/config/auth.ts

/**
 * Configuration for Authentication Sessions and JWT.
 */

export const authConfig = {
  sessionSecret: process.env.SESSION_SECRET as string,
  jwtSecret: process.env.JWT_SECRET as string,
  jwtExpiresInMinutes: process.env.JWT_EXPIRES_IN_MINUTES as string,
  jwtRefreshExpiresInDays: process.env.JWT_REFRESH_EXPIRES_IN_DAYS as string,
  jwtRefreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET as string,
};
