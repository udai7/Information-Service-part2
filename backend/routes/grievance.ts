import express, { Request, Response } from "express";
import { body, validationResult, query } from "express-validator";
import crypto from "crypto";
import { prisma } from "../lib/prisma";
import { authenticateAdmin, getDepartmentScope } from "../middleware/auth";
import { submissionLimiter } from "../middleware/rateLimiter";
import { createAuditLog, AuditActions } from "../lib/auditLog";
import "../types/express";

const router = express.Router();

// Generate cryptographically secure tracking ID
function generateTrackingId(): string {
  const timestamp = Date.now().toString(36);
  const randomStr = crypto.randomBytes(4).toString("hex");
  return `GRV-${timestamp}-${randomStr}`.toUpperCase();
}

// Calculate SLA deadline based on priority
function calculateSlaDeadline(priority: string): Date {
  const now = new Date();
  const hours: Record<string, number> = {
    urgent: 24,
    high: 72,
    medium: 168, // 7 days
    low: 336, // 14 days
  };
  return new Date(now.getTime() + (hours[priority] || 168) * 60 * 60 * 1000);
}

// Create grievance (public endpoint - rate limited)
router.post(
  "/",
  submissionLimiter,
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().normalizeEmail().withMessage("Valid email is required"),
    body("phone").trim().notEmpty().withMessage("Phone number is required"),
    body("address").trim().notEmpty().withMessage("Address is required"),
    body("subject").trim().notEmpty().withMessage("Subject is required"),
    body("description").trim().notEmpty().withMessage("Description is required"),
    body("category").optional().isString(),
    body("departmentId").optional().isInt(),
    body("priority")
      .optional()
      .isIn(["low", "medium", "high", "urgent"])
      .withMessage("Invalid priority"),
    body("attachments").optional().isArray(),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "Validation failed",
          errors: errors.array(),
        });
      }

      const {
        name, email, phone, address, subject, description,
        category, departmentId, priority = "medium", attachments = [],
      } = req.body;

      const trackingId = generateTrackingId();
      const slaDeadline = calculateSlaDeadline(priority);

      const grievance = await prisma.grievance.create({
        data: {
          name, email, phone, address, subject, description,
          category, priority, attachments, trackingId,
          departmentId: departmentId || null,
          slaDeadline,
        },
      });

      // Create activity log
      await prisma.grievanceActivity.create({
        data: {
          grievanceId: grievance.id,
          action: "created",
          toValue: "new",
          note: "Grievance submitted",
        },
      });

      // Notify department admins if department is specified
      if (departmentId) {
        const deptAdmins = await prisma.admin.findMany({
          where: { departmentId, isActive: true },
          select: { id: true },
        });

        if (deptAdmins.length > 0) {
          await prisma.notification.createMany({
            data: deptAdmins.map((admin) => ({
              adminId: admin.id,
              title: "New Grievance",
              message: `New grievance submitted: ${subject}`,
              type: "grievance_new",
              link: `/admin/grievances`,
            })),
          });
        }
      }

      res.status(201).json({
        message: "Grievance submitted successfully",
        grievance: {
          id: grievance.id,
          trackingId,
          status: grievance.status,
          slaDeadline,
        },
        trackingId,
      });
    } catch (error) {
      console.error("Error creating grievance:", error);
      res.status(500).json({ message: "Failed to submit grievance" });
    }
  },
);

// Get all grievances (admin only, department-scoped)
router.get(
  "/",
  authenticateAdmin,
  [
    query("status").optional().isIn(["new", "pending", "solved"]),
    query("priority").optional().isIn(["low", "medium", "high", "urgent"]),
    query("page").optional().isInt({ min: 1 }),
    query("limit").optional().isInt({ min: 1, max: 100 }),
    query("departmentId").optional().isInt(),
    query("search").optional().isString(),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Validation failed", errors: errors.array() });
      }

      const { status, priority, page = 1, limit = 10, departmentId, search } = req.query;
      const skip = (Number(page) - 1) * Number(limit);
      const take = Math.min(Number(limit), 100);

      // Apply department scope
      const deptScope = getDepartmentScope(req.admin);
      const where: any = { ...deptScope };

      if (status) where.status = status;
      if (priority) where.priority = priority;
      if (departmentId && req.admin!.role === "super_admin") {
        where.departmentId = parseInt(departmentId as string);
      }
      if (search) {
        where.OR = [
          { name: { contains: search as string, mode: "insensitive" } },
          { subject: { contains: search as string, mode: "insensitive" } },
          { trackingId: { contains: search as string, mode: "insensitive" } },
          { email: { contains: search as string, mode: "insensitive" } },
        ];
      }

      const [grievances, total] = await Promise.all([
        prisma.grievance.findMany({
          where,
          skip,
          take,
          include: {
            department: { select: { id: true, name: true, code: true } },
          },
          orderBy: { createdAt: "desc" },
        }),
        prisma.grievance.count({ where }),
      ]);

      res.json({
        message: "Grievances retrieved successfully",
        grievances,
        total,
        pagination: {
          page: Number(page),
          limit: take,
          total,
          pages: Math.ceil(total / take),
        },
      });
    } catch (error) {
      console.error("Error fetching grievances:", error);
      res.status(500).json({ message: "Failed to fetch grievances" });
    }
  },
);

// Get grievance by ID (admin only)
router.get("/:id", authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deptScope = getDepartmentScope(req.admin);
    const grievance = await prisma.grievance.findFirst({
      where: { id: parseInt(id), ...deptScope },
      include: {
        department: { select: { id: true, name: true, code: true } },
        activities: { orderBy: { createdAt: "desc" } },
      },
    });

    if (!grievance) {
      return res.status(404).json({ message: "Grievance not found" });
    }

    res.json({ message: "Grievance retrieved successfully", grievance });
  } catch (error) {
    console.error("Error fetching grievance:", error);
    res.status(500).json({ message: "Failed to fetch grievance" });
  }
});

// Get grievance by tracking ID (public endpoint)
router.get("/track/:trackingId", async (req: Request, res: Response) => {
  try {
    const { trackingId } = req.params;

    const grievance = await prisma.grievance.findUnique({
      where: { trackingId },
      select: {
        id: true,
        trackingId: true,
        subject: true,
        status: true,
        priority: true,
        createdAt: true,
        updatedAt: true,
        resolvedAt: true,
        slaDeadline: true,
        department: { select: { name: true } },
        activities: {
          select: { action: true, toValue: true, createdAt: true, note: true },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!grievance) {
      return res.status(404).json({ message: "Grievance not found with this tracking ID" });
    }

    res.json({ message: "Grievance status retrieved successfully", grievance });
  } catch (error) {
    console.error("Error fetching grievance by tracking ID:", error);
    res.status(500).json({ message: "Failed to fetch grievance status" });
  }
});

// Update grievance (admin only)
router.put(
  "/:id",
  authenticateAdmin,
  [
    body("status").optional().isIn(["new", "pending", "solved"]),
    body("priority").optional().isIn(["low", "medium", "high", "urgent"]),
    body("assignedTo").optional().isString(),
    body("adminNotes").optional().isString(),
    body("departmentId").optional().isInt(),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Validation failed", errors: errors.array() });
      }

      const { id } = req.params;
      const { status, priority, assignedTo, adminNotes, departmentId } = req.body;

      const deptScope = getDepartmentScope(req.admin);
      const existing = await prisma.grievance.findFirst({
        where: { id: parseInt(id), ...deptScope },
      });

      if (!existing) {
        return res.status(404).json({ message: "Grievance not found" });
      }

      const updateData: any = {};
      if (status !== undefined) updateData.status = status;
      if (priority !== undefined) updateData.priority = priority;
      if (assignedTo !== undefined) updateData.assignedTo = assignedTo;
      if (adminNotes !== undefined) updateData.adminNotes = adminNotes;
      if (departmentId !== undefined && req.admin!.role === "super_admin") {
        updateData.departmentId = departmentId;
      }
      if (status === "solved") updateData.resolvedAt = new Date();

      const grievance = await prisma.grievance.update({
        where: { id: parseInt(id) },
        data: updateData,
      });

      // Log activity
      if (status && status !== existing.status) {
        await prisma.grievanceActivity.create({
          data: {
            grievanceId: grievance.id,
            action: "status_change",
            fromValue: existing.status,
            toValue: status,
            performedBy: req.admin!.name,
            adminId: req.admin!.id,
          },
        });
      }
      if (assignedTo && assignedTo !== existing.assignedTo) {
        await prisma.grievanceActivity.create({
          data: {
            grievanceId: grievance.id,
            action: "assigned",
            fromValue: existing.assignedTo || "Unassigned",
            toValue: assignedTo,
            performedBy: req.admin!.name,
            adminId: req.admin!.id,
          },
        });
      }

      await createAuditLog({
        action: AuditActions.UPDATE,
        entity: "Grievance",
        entityId: grievance.id,
        details: updateData,
        adminId: req.admin!.id,
        ipAddress: req.ip,
        userAgent: req.get("user-agent"),
      });

      res.json({ message: "Grievance updated successfully", grievance });
    } catch (error) {
      console.error("Error updating grievance:", error);
      res.status(500).json({ message: "Failed to update grievance" });
    }
  },
);

// Mark grievance as solved (admin only)
router.patch(
  "/:id/solve",
  authenticateAdmin,
  [body("adminNotes").optional().isString()],
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { adminNotes } = req.body;

      const deptScope = getDepartmentScope(req.admin);
      const existing = await prisma.grievance.findFirst({
        where: { id: parseInt(id), ...deptScope },
      });

      if (!existing) {
        return res.status(404).json({ message: "Grievance not found" });
      }

      const grievance = await prisma.grievance.update({
        where: { id: parseInt(id) },
        data: {
          status: "solved",
          resolvedAt: new Date(),
          assignedTo: req.admin!.name,
          adminNotes: adminNotes || undefined,
        },
      });

      await prisma.grievanceActivity.create({
        data: {
          grievanceId: grievance.id,
          action: "status_change",
          fromValue: existing.status,
          toValue: "solved",
          performedBy: req.admin!.name,
          adminId: req.admin!.id,
          note: adminNotes,
        },
      });

      res.json({ message: "Grievance marked as solved successfully", grievance });
    } catch (error) {
      console.error("Error solving grievance:", error);
      res.status(500).json({ message: "Failed to solve grievance" });
    }
  },
);

// Mark grievance as pending (admin only)
router.patch(
  "/:id/pending",
  authenticateAdmin,
  [body("adminNotes").optional().isString()],
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { adminNotes } = req.body;

      const deptScope = getDepartmentScope(req.admin);
      const existing = await prisma.grievance.findFirst({
        where: { id: parseInt(id), ...deptScope },
      });

      if (!existing) {
        return res.status(404).json({ message: "Grievance not found" });
      }

      const grievance = await prisma.grievance.update({
        where: { id: parseInt(id) },
        data: {
          status: "pending",
          assignedTo: req.admin!.name,
          adminNotes: adminNotes || undefined,
        },
      });

      await prisma.grievanceActivity.create({
        data: {
          grievanceId: grievance.id,
          action: "status_change",
          fromValue: existing.status,
          toValue: "pending",
          performedBy: req.admin!.name,
          adminId: req.admin!.id,
        },
      });

      res.json({ message: "Grievance marked as pending successfully", grievance });
    } catch (error) {
      console.error("Error marking grievance as pending:", error);
      res.status(500).json({ message: "Failed to mark grievance as pending" });
    }
  },
);

// Assign grievance (admin only)
router.patch(
  "/:id/assign",
  authenticateAdmin,
  [body("assignedTo").notEmpty().withMessage("Assigned to is required")],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Validation failed", errors: errors.array() });
      }

      const { id } = req.params;
      const { assignedTo } = req.body;

      const deptScope = getDepartmentScope(req.admin);
      const existing = await prisma.grievance.findFirst({
        where: { id: parseInt(id), ...deptScope },
      });

      if (!existing) {
        return res.status(404).json({ message: "Grievance not found" });
      }

      const grievance = await prisma.grievance.update({
        where: { id: parseInt(id) },
        data: { assignedTo },
      });

      await prisma.grievanceActivity.create({
        data: {
          grievanceId: grievance.id,
          action: "assigned",
          fromValue: existing.assignedTo || "Unassigned",
          toValue: assignedTo,
          performedBy: req.admin!.name,
          adminId: req.admin!.id,
        },
      });

      res.json({ message: "Grievance assigned successfully", grievance });
    } catch (error) {
      console.error("Error assigning grievance:", error);
      res.status(500).json({ message: "Failed to assign grievance" });
    }
  },
);

// Delete grievance (admin only)
router.delete("/:id", authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deptScope = getDepartmentScope(req.admin);
    const existing = await prisma.grievance.findFirst({
      where: { id: parseInt(id), ...deptScope },
    });

    if (!existing) {
      return res.status(404).json({ message: "Grievance not found" });
    }

    await prisma.grievance.delete({ where: { id: parseInt(id) } });

    await createAuditLog({
      action: AuditActions.DELETE,
      entity: "Grievance",
      entityId: parseInt(id),
      adminId: req.admin!.id,
      ipAddress: req.ip,
      userAgent: req.get("user-agent"),
    });

    res.json({ message: "Grievance deleted successfully" });
  } catch (error) {
    console.error("Error deleting grievance:", error);
    res.status(500).json({ message: "Failed to delete grievance" });
  }
});

export default router;
