import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { body, param, validationResult } from "express-validator";
import { prisma } from "../lib/prisma";
import { authenticateAdmin, requireSuperAdmin, requireDeptAdmin } from "../middleware/auth";
import { createAuditLog, AuditActions } from "../lib/auditLog";
import "../types/express";

const router = express.Router();

// Helper: Check if the requesting admin can manage the target admin
const canManageAdmin = (requester: any, targetAdmin: any): boolean => {
  if (requester.role === "super_admin") return true;
  if (requester.role === "department_admin") {
    // Dept admins can only manage individual_admins in their department
    return (
      targetAdmin.role === "individual_admin" &&
      targetAdmin.departmentId === requester.departmentId
    );
  }
  return false;
};

// ─── List Admins (SuperAdmin: all, DeptAdmin: own department) ───
router.get(
  "/",
  authenticateAdmin,
  requireDeptAdmin,
  async (req: Request, res: Response) => {
    try {
      const where: any = {};

      if (req.admin!.role === "department_admin") {
        // Dept admin only sees individual admins in their department
        where.departmentId = req.admin!.departmentId;
        where.role = "individual_admin";
      }

      const page = parseInt(req.query.page as string) || 1;
      const parsedLimit = parseInt(req.query.limit as string);
      const limit = Math.max(1, Math.min(isNaN(parsedLimit) ? 10 : parsedLimit, 100));
      const skip = (page - 1) * limit;

      const [admins, total] = await Promise.all([
        prisma.admin.findMany({
          where,
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
            phone: true,
            isActive: true,
            lastLogin: true,
            departmentId: true,
            assignedServices: true,
            createdById: true,
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
          skip,
          take: limit,
        }),
        prisma.admin.count({ where }),
      ]);

      res.json({
        admins,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      console.error("Error fetching admins:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
);

// ─── Get Admin by ID (SuperAdmin or DeptAdmin for own dept) ───
router.get(
  "/:id",
  authenticateAdmin,
  requireDeptAdmin,
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
          assignedServices: true,
          createdById: true,
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

      // Dept admin can only see individual admins in their department
      if (req.admin!.role === "department_admin") {
        if (admin.role !== "individual_admin" || admin.departmentId !== req.admin!.departmentId) {
          return res.status(403).json({ error: "Access denied" });
        }
      }

      res.json({ admin });
    } catch (error) {
      console.error("Error fetching admin:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
);

// ─── Update Admin (SuperAdmin or DeptAdmin for own dept individual admins) ───
router.put(
  "/:id",
  authenticateAdmin,
  requireDeptAdmin,
  param("id").isInt(),
  [
    body("name").optional().trim().isLength({ min: 2 }),
    body("email").optional().isEmail().normalizeEmail(),
    body("role").optional().isIn(["super_admin", "department_admin", "individual_admin"]),
    body("departmentId").optional().isInt(),
    body("phone").optional().isMobilePhone("any"),
    body("assignedServices").optional().isArray(),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const id = parseInt(req.params.id);
      const { name, email, role, departmentId, phone, assignedServices } = req.body;

      // Fetch target admin
      const targetAdmin = await prisma.admin.findUnique({ where: { id } });
      if (!targetAdmin) {
        return res.status(404).json({ error: "Admin not found" });
      }

      // Check permissions
      if (!canManageAdmin(req.admin!, targetAdmin)) {
        return res.status(403).json({ error: "Access denied. Cannot manage this admin." });
      }

      // Don't allow removing your own super_admin role
      if (id === req.admin!.id && role && role !== "super_admin") {
        return res.status(400).json({ error: "Cannot change your own role" });
      }

      // Dept admin cannot change role to anything other than individual_admin
      if (req.admin!.role === "department_admin" && role && role !== "individual_admin") {
        return res.status(403).json({ error: "You can only assign the individual_admin role" });
      }

      const updateData: any = {};
      if (name) updateData.name = name;
      if (email) updateData.email = email;
      if (role) updateData.role = role;
      if (phone !== undefined) updateData.phone = phone;
      if (departmentId !== undefined) updateData.departmentId = departmentId;
      if (assignedServices !== undefined) updateData.assignedServices = assignedServices;

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
          assignedServices: true,
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

// ─── Toggle Admin Active/Inactive (SuperAdmin or DeptAdmin for own dept) ───
router.patch(
  "/:id/toggle",
  authenticateAdmin,
  requireDeptAdmin,
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

      // Check permissions
      if (!canManageAdmin(req.admin!, admin)) {
        return res.status(403).json({ error: "Access denied. Cannot manage this admin." });
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

// ─── Delete Admin (SuperAdmin or DeptAdmin for own dept individual admins) ───
router.delete(
  "/:id",
  authenticateAdmin,
  requireDeptAdmin,
  param("id").isInt(),
  async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);

      if (id === req.admin!.id) {
        return res.status(400).json({ error: "Cannot delete your own account" });
      }

      const targetAdmin = await prisma.admin.findUnique({ where: { id } });
      if (!targetAdmin) {
        return res.status(404).json({ error: "Admin not found" });
      }

      // Check permissions
      if (!canManageAdmin(req.admin!, targetAdmin)) {
        return res.status(403).json({ error: "Access denied. Cannot manage this admin." });
      }

      // Cascade delete all related records in a transaction
      await prisma.$transaction(async (tx) => {
        // Clean up services created by this admin
        // SchemeService sub-relations
        await tx.contactPerson.deleteMany({ where: { schemeService: { adminId: id } } });
        await tx.supportiveDocument.deleteMany({ where: { schemeService: { adminId: id } } });
        await tx.schemeService.deleteMany({ where: { adminId: id } });

        // CertificateService sub-relations
        await tx.certificateContact.deleteMany({ where: { certificateService: { adminId: id } } });
        await tx.certificateDocument.deleteMany({ where: { certificateService: { adminId: id } } });
        await tx.certificateProcessStep.deleteMany({ where: { certificateService: { adminId: id } } });
        await tx.certificateEligibility.deleteMany({ where: { certificateService: { adminId: id } } });
        await tx.certificateService.deleteMany({ where: { adminId: id } });

        // ContactService sub-relations (offices -> posts -> employees)
        await tx.employee.deleteMany({
          where: { post: { office: { contactService: { adminId: id } } } },
        });
        await tx.post.deleteMany({
          where: { office: { contactService: { adminId: id } } },
        });
        await tx.contactServiceContact.deleteMany({ where: { contactService: { adminId: id } } });
        await tx.contactServiceDocument.deleteMany({ where: { contactService: { adminId: id } } });
        await tx.contactService.deleteMany({ where: { adminId: id } });

        // Nullify audit log references
        await tx.auditLog.updateMany({
          where: { adminId: id },
          data: { adminId: null },
        });

        // Nullify grievance activity references
        await tx.grievanceActivity.updateMany({
          where: { adminId: id },
          data: { adminId: null },
        });

        // Delete sessions and notifications
        await tx.session.deleteMany({ where: { adminId: id } });
        await tx.notification.deleteMany({ where: { adminId: id } });

        // Finally delete the admin
        await tx.admin.delete({ where: { id } });
      });

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

// ─── Unlock Admin Account (SuperAdmin or DeptAdmin for own dept) ───
router.patch(
  "/:id/unlock",
  authenticateAdmin,
  requireDeptAdmin,
  param("id").isInt(),
  async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);

      const targetAdmin = await prisma.admin.findUnique({ where: { id } });
      if (!targetAdmin) {
        return res.status(404).json({ error: "Admin not found" });
      }

      // Check permissions
      if (!canManageAdmin(req.admin!, targetAdmin)) {
        return res.status(403).json({ error: "Access denied" });
      }

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

// ─── Reset Admin Password (SuperAdmin or DeptAdmin for own dept) ───
router.patch(
  "/:id/reset-password",
  authenticateAdmin,
  requireDeptAdmin,
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

      const targetAdmin = await prisma.admin.findUnique({ where: { id } });
      if (!targetAdmin) {
        return res.status(404).json({ error: "Admin not found" });
      }

      // Check permissions
      if (!canManageAdmin(req.admin!, targetAdmin)) {
        return res.status(403).json({ error: "Access denied" });
      }

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
