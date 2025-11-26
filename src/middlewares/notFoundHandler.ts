/** @format */

// src/middlewares/notFoundHandler.ts
import type { Request, Response, NextFunction } from "express";
import { AppError } from "@errors/AppError";

export function notFoundHandler(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const message = `Route ${req.originalUrl} not found`;
  next(AppError.notFound(message));
}
