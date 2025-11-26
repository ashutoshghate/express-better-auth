/** @format */

// src/middlewares/requestLogger.ts

import { logger } from "@utils/logger";
import type { Request, Response, NextFunction } from "express";

export function requestLogger(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  logger.http(`[${req.method}] ${req.originalUrl}`);
  next();
}
