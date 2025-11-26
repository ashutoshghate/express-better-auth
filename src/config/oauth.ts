/** @format */

// src/config/oauth.ts

/**
 * Configuration for OAuth2.
 */

export const oauthConfig = {
  facebook: {
    appId: process.env.FACEBOOK_APP_ID as string,
    appSecret: process.env.FACEBOOK_APP_SECRET as string,
    callbackUrl: process.env.FACEBOOK_CALLBACK_URL as string,
  },

  // Google OAuth
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    callbackUrl: process.env.GOOGLE_CALLBACK_URL as string,
  },
};
