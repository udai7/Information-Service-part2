import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { body, param, validationResult } from "express-validator";
import { prisma } from "../lib/prisma";
import { authenticateAdmin, requireSuperAdmin } from "../middleware/auth";
import { createAuditLog, AuditActions } from "../lib/auditLog";
import "../types/express";

const router = express.Router();

// ─── List All Admins (SuperAdmin only) ───
router.get(
  "/",
  authenticateAdmin,
  requireSuperAdmin,
  async (req: Request, res: Response) => {
    try {
      const admins = await prisma.admin.findMany({
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
          _count: {
            select: {
              schemeServices: true,
              certificateServices: true,
              contactServices: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      });

      res.json({ admins });
    } catch (error) {
      console.error("Error fetching admins:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
);

// ─── Get Admin by ID (SuperAdmin only) ───
router.get(
  "/:id",
  authenticateAdmin,
  requireSuperAdmin,
  param("id").isInt(),
  async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);

      const admin = await prisma.admin.findUnique({
        where: { id },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          phone: true,
          isActive: true,
          lastLogin: true,
          loginAttempts: true,
          lockedUntil: true,
          departmentId: true,
          department: { select: { id: true, name: true, code: true } },
          createdAt: true,
          updatedAt: true,
          _count: {
            select: {
              schemeServices: true,
              certificateServices: true,
              contactServices: true,
              sessions: { where: { isActive: true } },
            },
          },
        },
      });

      if (!admin) {
        return res.status(404).json({ error: "Admin not found" });
      }

      res.json({ admin });
    } catch (error) {
      console.error("Error fetching admin:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
);

// ─── Update Admin (SuperAdmin only) ───
router.put(
  "/:id",
  authenticateAdmin,
  requireSuperAdmin,
  param("id").isInt(),
  [
    body("name").optional().trim().isLength({ min: 2 }),
    body("email").optional().isEmail().normalizeEmail(),
    body("role").optional().isIn(["super_admin", "department_admin"]),
    body("departmentId").optional().isInt(),
    body("phone").optional().isMobilePhone("any"),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const id = parseInt(req.params.id);
      const { name, email, role, departmentId, phone } = req.body;

      // Don't allow removing your own super_admin role
      if (id === req.admin!.id && role && role !== "super_admin") {
        return res.status(400).json({ error: "Cannot change your own role" });
      }

      const updateData: any = {};
      if (name) updateData.name = name;
      if (email) updateData.email = email;
      if (role) updateData.role = role;
      if (phone !== undefined) updateData.phone = phone;
      if (departmentId !== undefined) updateData.departmentId = departmentId;

      const admin = await prisma.admin.update({
        where: { id },
        data: updateData,
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          phone: true,
          isActive: true,
          departmentId: true,
          department: { select: { id: true, name: true, code: true } },
        },
      });

      await createAuditLog({
        action: AuditActions.UPDATE,
        entity: "Admin",
        entityId: id,
        details: updateData,
        adminId: req.admin!.id,
        ipAddress: req.ip,
        userAgent: req.get("user-agent"),
      });

      res.json({ message: "Admin updated successfully", admin });
    } catch (error: any) {
      if (error.code === "P2025") {
        return res.status(404).json({ error: "Admin not found" });
      }
      console.error("Error updating admin:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
);

// ─── Toggle Admin Active/Inactive (SuperAdmin only) ───
router.patch(
  "/:id/toggle",
  authenticateAdmin,
  requireSuperAdmin,
  param("id").isInt(),
  async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);

      // Don't allow deactivating yourself
      if (id === req.admin!.id) {
        return res.status(400).json({ error: "Cannot deactivate your own account" });
      }

      const admin = await prisma.admin.findUnique({ where: { id } });
      if (!admin) {
        return res.status(404).json({ error: "Admin not found" });
      }

      const updated = await prisma.admin.update({
        where: { id },
        data: { isActive: !admin.isActive },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          isActive: true,
        },
      });

      // If deactivating, invalidate all sessions
      if (!updated.isActive) {
        await prisma.session.updateMany({
          where: { adminId: id },
          data: { isActive: false },
        });
      }

      await createAuditLog({
        action: AuditActions.TOGGLE_ACTIVE,
        entity: "Admin",
        entityId: id,
        details: { isActive: updated.isActive },
        adminId: req.admin!.id,
        ipAddress: req.ip,
        userAgent: req.get("user-agent"),
      });

      res.json({
        message: `Admin ${updated.isActive ? "activated" : "deactivated"} successfully`,
        admin: updated,
      });
    } catch (error) {
      console.error("Error toggling admin:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
);

// ─── Delete Admin (SuperAdmin only) ───
router.delete(
  "/:id",
  authenticateAdmin,
  requireSuperAdmin,
  param("id").isInt(),
  async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);

      if (id === req.admin!.id) {
        return res.status(400).json({ error: "Cannot delete your own account" });
      }

      await prisma.session.deleteMany({ where: { adminId: id } });
      await prisma.notification.deleteMany({ where: { adminId: id } });
      await prisma.admin.delete({ where: { id } });

      await createAuditLog({
        action: AuditActions.DELETE,
        entity: "Admin",
        entityId: id,
        adminId: req.admin!.id,
        ipAddress: req.ip,
        userAgent: req.get("user-agent"),
      });

      res.json({ message: "Admin deleted successfully" });
    } catch (error: any) {
      if (error.code === "P2025") {
        return res.status(404).json({ error: "Admin not found" });
      }
      console.error("Error deleting admin:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
);

// ─── Unlock Admin Account (SuperAdmin only) ───
router.patch(
  "/:id/unlock",
  authenticateAdmin,
  requireSuperAdmin,
  param("id").isInt(),
  async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);

      const admin = await prisma.admin.update({
        where: { id },
        data: { loginAttempts: 0, lockedUntil: null },
        select: { id: true, email: true, name: true },
      });

      res.json({ message: "Admin account unlocked", admin });
    } catch (error: any) {
      if (error.code === "P2025") {
        return res.status(404).json({ error: "Admin not found" });
      }
      console.error("Error unlocking admin:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
);

// ─── Reset Admin Password (SuperAdmin only) ───
router.patch(
  "/:id/reset-password",
  authenticateAdmin,
  requireSuperAdmin,
  param("id").isInt(),
  [
    body("newPassword")
      .isLength({ min: 8 })
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)
      .withMessage("Password must meet complexity requirements"),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const id = parseInt(req.params.id);
      const { newPassword } = req.body;

      const hashedPassword = await bcrypt.hash(newPassword, 12);
      await prisma.admin.update({
        where: { id },
        data: { password: hashedPassword, loginAttempts: 0, lockedUntil: null },
      });

      // Invalidate all sessions
      await prisma.session.updateMany({
        where: { adminId: id },
        data: { isActive: false },
      });

      await createAuditLog({
        action: AuditActions.PASSWORD_CHANGE,
        entity: "Admin",
        entityId: id,
        details: { resetBy: req.admin!.id },
        adminId: req.admin!.id,
        ipAddress: req.ip,
        userAgent: req.get("user-agent"),
      });

      res.json({ message: "Password reset successfully" });
    } catch (error: any) {
      if (error.code === "P2025") {
        return res.status(404).json({ error: "Admin not found" });
      }
      console.error("Error resetting password:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
);

export default router;
