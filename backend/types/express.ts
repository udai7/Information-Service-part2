import { Request, Response } from "express";

// Extend Express Request interface to include admin property
declare global {
  namespace Express {
    interface Request {
      admin?: {
        id: number;
        email: string;
        name: string;
        role?: string;
      };
    }
  }
}

// Type aliases for convenience
export type RequestHandler = (
  req: Request,
  res: Response,
) => Promise<void> | void;
export type AdminRequest = Request & {
  admin: { id: number; email: string; name: string; role?: string };
};
