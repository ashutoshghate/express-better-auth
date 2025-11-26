/** @format */

import type { Request, Response, NextFunction } from "express";
import { AppError } from "@errors/AppError";
import { logger } from "@utils/logger";
import { ZodError } from "zod";
import { serverConfig } from "@config/server";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  let error: AppError;

  // Handle Zod validation errors gracefully
  if (err instanceof ZodError) {
    const details = err.issues.map((e) => ({
      path: e.path.join("."),
      message: e.message,
    }));
    error = AppError.badRequest("Validation error", details);
  } else if (err instanceof AppError) {
    error = err;
  } else {
    error = AppError.internal(
      (err as any)?.message || "Internal Server Error",
      err
    );
  }

  logger.error(error.message, {
    method: req.method,
    path: req.originalUrl,
    status: error.statusCode,
    details: error.details,
  });

  res.status(error.statusCode).json({
    success: false,
    message: error.message,
    statusCode: error.statusCode,
    context: error.context,
    ...(serverConfig.nodeEnv !== "production" && { stack: error.stack }),
    ...(error.details && { details: error.details }),
  });
}
