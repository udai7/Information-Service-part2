import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import { prisma } from "../lib/prisma";
import {
  authenticateAdmin,
  requireSuperAdmin,
  getJwtSecret,
  JWT_ACCESS_EXPIRY,
  JWT_REFRESH_EXPIRY,
  REFRESH_TOKEN_COOKIE,
  JwtPayload,
} from "../middleware/auth";
import { authLimiter, registrationLimiter } from "../middleware/rateLimiter";
import { createAuditLog, AuditActions } from "../lib/auditLog";
import "../types/express";

const router = express.Router();

// Password policy: min 8 chars, 1 upper, 1 lower, 1 number, 1 special
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes

// ─── Create Admin (SuperAdmin only) ───
router.post(
  "/register",
  authenticateAdmin,
  requireSuperAdmin,
  registrationLimiter,
  [
    body("email").isEmail().normalizeEmail(),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters")
      .matches(PASSWORD_REGEX)
      .withMessage(
        "Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character (@$!%*?&)",
      ),
    body("name").trim().isLength({ min: 2 }),
    body("role")
      .optional()
      .isIn(["super_admin", "department_admin"])
      .withMessage("Role must be super_admin or department_admin"),
    body("departmentId").optional().isInt(),
    body("phone").optional().isMobilePhone("any"),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password, name, role = "department_admin", departmentId, phone } = req.body;

      // Check if admin already exists
      const existingAdmin = await prisma.admin.findUnique({
        where: { email },
      });

      if (existingAdmin) {
        return res.status(400).json({ error: "Admin already exists with this email" });
      }

      // If department_admin, require departmentId
      if (role === "department_admin" && !departmentId) {
        return res.status(400).json({ error: "Department ID is required for department admins" });
      }

      // Verify department exists if provided
      if (departmentId) {
        const dept = await prisma.department.findUnique({ where: { id: departmentId } });
        if (!dept) {
          return res.status(400).json({ error: "Department not found" });
        }
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Create admin
      const admin = await prisma.admin.create({
        data: {
          email,
          password: hashedPassword,
          name,
          role,
          phone,
          departmentId: departmentId || null,
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          phone: true,
          departmentId: true,
          department: { select: { id: true, name: true, code: true } },
          createdAt: true,
        },
      });

      // Audit log
      await createAuditLog({
        action: AuditActions.REGISTER,
        entity: "Admin",
        entityId: admin.id,
        details: { email, name, role, departmentId },
        adminId: req.admin!.id,
        ipAddress: req.ip,
        userAgent: req.get("user-agent"),
      });

      res.status(201).json({
        message: "Admin created successfully",
        admin,
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
);

// ─── Login ───
router.post(
  "/login",
  authLimiter,
  [body("email").isEmail().normalizeEmail(), body("password").notEmpty()],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      const admin = await prisma.admin.findUnique({
        where: { email },
        include: {
          department: { select: { id: true, name: true, code: true } },
        },
      });

      if (!admin) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Check if account is locked
      if (admin.lockedUntil && admin.lockedUntil > new Date()) {
        const remainingMs = admin.lockedUntil.getTime() - Date.now();
        const remainingMin = Math.ceil(remainingMs / 60000);
        return res.status(423).json({
          error: `Account locked. Try again in ${remainingMin} minute(s).`,
        });
      }

      // Check if account is active
      if (!admin.isActive) {
        return res.status(403).json({ error: "Account is deactivated. Contact a SuperAdmin." });
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(password, admin.password);
      if (!isValidPassword) {
        // Increment login attempts
        const newAttempts = admin.loginAttempts + 1;
        const updateData: any = { loginAttempts: newAttempts };

        if (newAttempts >= MAX_LOGIN_ATTEMPTS) {
          updateData.lockedUntil = new Date(Date.now() + LOCKOUT_DURATION_MS);
        }

        await prisma.admin.update({
          where: { id: admin.id },
          data: updateData,
        });

        await createAuditLog({
          action: AuditActions.LOGIN_FAILED,
          entity: "Admin",
          entityId: admin.id,
          details: { email, attempts: newAttempts },
          ipAddress: req.ip,
          userAgent: req.get("user-agent"),
        });

        if (newAttempts >= MAX_LOGIN_ATTEMPTS) {
          return res.status(423).json({
            error: "Account locked due to too many failed attempts. Try again in 15 minutes.",
          });
        }

        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Reset login attempts on success
      await prisma.admin.update({
        where: { id: admin.id },
        data: {
          loginAttempts: 0,
          lockedUntil: null,
          lastLogin: new Date(),
        },
      });

      // Generate access token
      const payload: JwtPayload = {
        adminId: admin.id,
        email: admin.email,
        role: admin.role,
      };

      const accessToken = jwt.sign(payload, getJwtSecret(), {
        expiresIn: JWT_ACCESS_EXPIRY,
      });

      // Generate refresh token
      const refreshToken = jwt.sign(
        { ...payload, type: "refresh" },
        getJwtSecret(),
        { expiresIn: JWT_REFRESH_EXPIRY },
      );

      // Store session
      await prisma.session.create({
        data: {
          adminId: admin.id,
          token: refreshToken,
          ipAddress: req.ip || undefined,
          userAgent: req.get("user-agent") || undefined,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
      });

      // Audit log
      await createAuditLog({
        action: AuditActions.LOGIN,
        entity: "Admin",
        entityId: admin.id,
        details: { email },
        adminId: admin.id,
        ipAddress: req.ip,
        userAgent: req.get("user-agent"),
      });

      // Set refresh token as httpOnly cookie
      res.cookie(REFRESH_TOKEN_COOKIE, refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        path: "/api/auth",
      });

      res.json({
        message: "Login successful",
        admin: {
          id: admin.id,
          email: admin.email,
          name: admin.name,
          role: admin.role,
          phone: admin.phone,
          departmentId: admin.departmentId,
          department: admin.department,
        },
        token: accessToken,
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
);

// ─── Refresh Token ───
router.post("/refresh", async (req: Request, res: Response) => {
  try {
    const refreshToken =
      req.cookies?.[REFRESH_TOKEN_COOKIE] ||
      req.body?.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ error: "No refresh token provided" });
    }

    // Verify refresh token
    let decoded: any;
    try {
      decoded = jwt.verify(refreshToken, getJwtSecret());
    } catch {
      return res.status(401).json({ error: "Invalid refresh token" });
    }

    // Check session exists and is active
    const session = await prisma.session.findUnique({
      where: { token: refreshToken },
      include: {
        admin: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
            isActive: true,
            departmentId: true,
            department: { select: { id: true, name: true, code: true } },
          },
        },
      },
    });

    if (!session || !session.isActive || !session.admin.isActive) {
      return res.status(401).json({ error: "Session expired or invalid" });
    }

    // Rotate refresh token
    const newPayload: JwtPayload = {
      adminId: session.admin.id,
      email: session.admin.email,
      role: session.admin.role,
    };

    const newAccessToken = jwt.sign(newPayload, getJwtSecret(), {
      expiresIn: JWT_ACCESS_EXPIRY,
    });

    const newRefreshToken = jwt.sign(
      { ...newPayload, type: "refresh" },
      getJwtSecret(),
      { expiresIn: JWT_REFRESH_EXPIRY },
    );

    // Update session with new token
    await prisma.session.update({
      where: { id: session.id },
      data: {
        token: newRefreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    res.cookie(REFRESH_TOKEN_COOKIE, newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/api/auth",
    });

    res.json({
      token: newAccessToken,
      admin: session.admin,
    });
  } catch (error) {
    console.error("Refresh token error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ─── Logout ───
router.post("/logout", authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies?.[REFRESH_TOKEN_COOKIE];

    if (refreshToken) {
      // Deactivate the session
      await prisma.session.updateMany({
        where: { token: refreshToken },
        data: { isActive: false },
      });
    }

    await createAuditLog({
      action: AuditActions.LOGOUT,
      entity: "Admin",
      entityId: req.admin!.id,
      adminId: req.admin!.id,
      ipAddress: req.ip,
      userAgent: req.get("user-agent"),
    });

    res.clearCookie(REFRESH_TOKEN_COOKIE, { path: "/api/auth" });
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ─── Get Profile ───
router.get("/profile", authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const admin = await prisma.admin.findUnique({
      where: { id: req.admin!.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        phone: true,
        isActive: true,
        lastLogin: true,
        departmentId: true,
        department: { select: { id: true, name: true, code: true } },
        createdAt: true,
      },
    });

    res.json({ admin });
  } catch (error) {
    console.error("Profile fetch error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ─── Change Password ───
router.put(
  "/change-password",
  authenticateAdmin,
  [
    body("currentPassword").notEmpty().withMessage("Current password is required"),
    body("newPassword")
      .isLength({ min: 8 })
      .matches(PASSWORD_REGEX)
      .withMessage(
        "New password must be at least 8 chars with 1 upper, 1 lower, 1 number, 1 special char",
      ),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { currentPassword, newPassword } = req.body;

      const admin = await prisma.admin.findUnique({
        where: { id: req.admin!.id },
      });

      if (!admin) {
        return res.status(404).json({ error: "Admin not found" });
      }

      const isValid = await bcrypt.compare(currentPassword, admin.password);
      if (!isValid) {
        return res.status(400).json({ error: "Current password is incorrect" });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 12);
      await prisma.admin.update({
        where: { id: admin.id },
        data: { password: hashedPassword },
      });

      // Invalidate all sessions except current
      await prisma.session.updateMany({
        where: { adminId: admin.id },
        data: { isActive: false },
      });

      await createAuditLog({
        action: AuditActions.PASSWORD_CHANGE,
        entity: "Admin",
        entityId: admin.id,
        adminId: admin.id,
        ipAddress: req.ip,
        userAgent: req.get("user-agent"),
      });

      res.json({ message: "Password changed successfully. Please login again." });
    } catch (error) {
      console.error("Password change error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
);

// Re-export middleware for backward compatibility
export { authenticateAdmin } from "../middleware/auth";

export default router;
