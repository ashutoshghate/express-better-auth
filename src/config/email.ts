/** @format */

// src/config/email.ts

/**
 *  Email Configuration
 */

export const emailConfig = {
  provider: process.env.EMAIL_SERVICE_PROVIDER || "SMTP",
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: parseInt(process.env.EMAIL_PORT || "587", 10),
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS,
  from: process.env.EMAIL_FROM,
};

// Check for development email host in production
if (
  emailConfig.host === "smtp.mailtrap.io" &&
  process.env.NODE_ENV === "production"
) {
  console.warn(
    "EMAIL WARNING: Mailtrap host detected in production environment."
  );
}
