/** @format */

// src/config/storage.ts

/**
 * Configuration for File Storage (Local or Cloud like AWS S3).
 */
export const storageConfig = {
  provider: process.env.FILE_STORAGE_PROVIDER || "LOCAL",

  // AWS S3 Configuration (relevant if provider is 'AWS_S3')
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    region: process.env.AWS_REGION as string,
    bucketName: process.env.AWS_S3_BUCKET_NAME as string,
  },
};
