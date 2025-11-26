/** @format */

// src/errors/AppError.ts
export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;
  public context?: string | undefined;
  public details?: any;

  constructor(
    message: string,
    statusCode = 500,
    context?: string,
    details?: any
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    this.context = context;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message: string, details?: any) {
    return new AppError(message, 400, "Bad Request", details);
  }

  static unauthorized(message: string) {
    return new AppError(message, 401, "Unauthorized");
  }

  static forbidden(message: string) {
    return new AppError(message, 403, "Forbidden");
  }

  static notFound(message: string) {
    return new AppError(message, 404, "Not Found");
  }

  static conflict(message: string) {
    return new AppError(message, 409, "Conflict");
  }

  static internal(message: string, details?: any) {
    return new AppError(message, 500, "Internal Server Error", details);
  }
}
