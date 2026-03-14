import { Request, Response, NextFunction } from "express";

export interface ApiError extends Error {
  statusCode?: number;
  status?: number;
}

// Sanitize error responses — never leak internal details to clients
export const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  // Log the full error server-side
  if (process.env.NODE_ENV === "development") {
    console.error("Error:", err);
  } else {
    console.error("Error:", err.message || "Unknown error");
  }

  const statusCode = err.statusCode || err.status || 500;

  res.status(statusCode).json({
    error:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Internal server error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

// 404 handler for unknown API routes
export const notFoundHandler = (req: Request, res: Response) => {
  if (req.path.startsWith("/api/")) {
    return res.status(404).json({ error: "API route not found" });
  }
  // For non-API routes, let the SPA catch-all handle it
};

// Input sanitization — strip HTML tags from string inputs
export const sanitizeInput = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  if (req.body && typeof req.body === "object") {
    sanitizeObject(req.body);
  }
  if (req.query && typeof req.query === "object") {
    sanitizeObject(req.query);
  }
  next();
};

function sanitizeObject(obj: any): void {
  for (const key of Object.keys(obj)) {
    if (typeof obj[key] === "string") {
      // Strip dangerous HTML tags but keep safe content
      obj[key] = obj[key]
        .replace(/<script\b[\s\S]*?<\/script>/gi, "")
        .replace(/<iframe\b[\s\S]*?<\/iframe>/gi, "")
        .replace(/on\w+\s*=\s*["'][^"']*["']/gi, "")
        .replace(/<object\b[\s\S]*?<\/object>/gi, "")
        .replace(/<embed\b[^>]*>/gi, "")
        .replace(/<link\b[^>]*>/gi, "");
    } else if (Array.isArray(obj[key])) {
      obj[key].forEach((item: any, index: number) => {
        if (typeof item === "string") {
          obj[key][index] = item
            .replace(/<script\b[\s\S]*?<\/script>/gi, "")
            .replace(/<iframe\b[\s\S]*?<\/iframe>/gi, "")
            .replace(/on\w+\s*=\s*["'][^"']*["']/gi, "");
        } else if (typeof item === "object" && item !== null) {
          sanitizeObject(item);
        }
      });
    } else if (typeof obj[key] === "object" && obj[key] !== null) {
      sanitizeObject(obj[key]);
    }
  }
}
