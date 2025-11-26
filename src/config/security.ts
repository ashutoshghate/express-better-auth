/** @format */

// src/config/security.ts

/**
 * Configuration for Security settings.
 */

export const securityConfig = {
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS as string, 10),
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS as string, 10),
  },

  cookieSecret: process.env.COOKIE_SECRET as string,
  passwordSaltRounds: parseInt(process.env.PASSWORD_SALT_ROUNDS as string, 10),
};

// Warn if default cookie secret is used in production
if (
  securityConfig.cookieSecret ===
  "your_cookie_secret_here_change_this_in_production"
) {
  console.warn("SECURITY WARNING: Change COOKIE_SECRET in production!");
}
