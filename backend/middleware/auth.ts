import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prisma, queryCache } from "../lib/prisma";

// Ensure JWT_SECRET is set - crash if missing in production
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET && process.env.NODE_ENV === "production") {
  console.error("FATAL: JWT_SECRET environment variable is not set. Exiting.");
  process.exit(1);
}

export const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("JWT_SECRET is required in production");
    }
    // Only allow fallback in development
    return "dev-only-secret-change-in-production";
  }
  return secret;
};

export const JWT_ACCESS_EXPIRY = "15m";
export const JWT_REFRESH_EXPIRY = "7d";
export const REFRESH_TOKEN_COOKIE = "refresh_token";

export interface JwtPayload {
  adminId: number;
  email: string;
  role: string;
  sessionId?: string;
}

// Authenticate admin via Bearer token — with cache for DB lookup
export const authenticateAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json({ error: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, getJwtSecret()) as JwtPayload;

    // Reject refresh tokens being used as access tokens
    if ((decoded as any).type === "refresh") {
      return res.status(401).json({ error: "Invalid token type." });
    }

    // Check cache first — avoids DB hit on every authenticated request
    const cacheKey = `admin:${decoded.adminId}`;
    let admin = await queryCache.get<any>(cacheKey);

    if (!admin) {
      // Cache miss — fetch from DB
      admin = await prisma.admin.findUnique({
        where: { id: decoded.adminId },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          isActive: true,
          departmentId: true,
          assignedServices: true,
          createdById: true,
          department: {
            select: { id: true, name: true, code: true },
          },
        },
      });

      if (admin && admin.isActive) {
        // Cache for 2 minutes — short enough to catch deactivations quickly
        await queryCache.set(cacheKey, admin, 2 * 60 * 1000);
      }
    }

    if (!admin || !admin.isActive) {
      return res.status(401).json({ error: "Invalid or inactive account" });
    }

    req.admin = admin as any;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: "Token expired", code: "TOKEN_EXPIRED" });
    }
    res.status(401).json({ error: "Invalid token" });
  }
};

// Require SuperAdmin role
export const requireSuperAdmin = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.admin || req.admin.role !== "super_admin") {
    return res
      .status(403)
      .json({ error: "Access denied. SuperAdmin privileges required." });
  }
  next();
};

// Require Department Admin (or SuperAdmin)
export const requireDeptAdmin = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.admin) {
    return res.status(401).json({ error: "Authentication required" });
  }
  if (
    req.admin.role !== "super_admin" &&
    req.admin.role !== "department_admin"
  ) {
    return res
      .status(403)
      .json({ error: "Access denied. Admin privileges required." });
  }
  next();
};

// Require any admin role (super_admin, department_admin, or individual_admin)
export const requireAnyAdmin = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.admin) {
    return res.status(401).json({ error: "Authentication required" });
  }
  if (
    req.admin.role !== "super_admin" &&
    req.admin.role !== "department_admin" &&
    req.admin.role !== "individual_admin"
  ) {
    return res
      .status(403)
      .json({ error: "Access denied. Admin privileges required." });
  }
  next();
};

// Check if individual admin has access to a specific service
export const requireServiceAccess = (service: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.admin) {
      return res.status(401).json({ error: "Authentication required" });
    }
    // Super admin and department admin have full access
    if (req.admin.role === "super_admin" || req.admin.role === "department_admin") {
      return next();
    }
    // Individual admin — check assignedServices
    if (req.admin.role === "individual_admin") {
      const assignedServices = (req.admin as any).assignedServices || [];
      if (assignedServices.includes(service)) {
        return next();
      }
    }
    return res
      .status(403)
      .json({ error: `Access denied. You don't have permission for ${service}.` });
  };
};

// Scope queries to the admin's department (unless SuperAdmin)
export const getDepartmentScope = (admin: any): { departmentId?: number } => {
  if (admin.role === "super_admin") {
    return {}; // SuperAdmin sees everything
  }
  return { departmentId: admin.departmentId || undefined };
};
