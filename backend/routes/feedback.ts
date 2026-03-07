import express, { Request, Response } from "express";
import { body, validationResult, query } from "express-validator";
import { prisma } from "../lib/prisma";
import { authenticateAdmin, getDepartmentScope } from "../middleware/auth";
import { submissionLimiter } from "../middleware/rateLimiter";
import { createAuditLog, AuditActions } from "../lib/auditLog";
import "../types/express";

const router = express.Router();

// Create feedback (public endpoint - rate limited)
router.post(
  "/",
  submissionLimiter,
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().normalizeEmail().withMessage("Valid email is required"),
    body("subject").trim().notEmpty().withMessage("Subject is required"),
    body("message").trim().notEmpty().withMessage("Message is required"),
    body("phone").optional().isMobilePhone("any").withMessage("Valid phone number required"),
    body("rating").optional().isInt({ min: 1, max: 5 }).withMessage("Rating must be between 1 and 5"),
    body("category").optional().isString(),
    body("departmentId").optional().isInt(),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Validation failed", errors: errors.array() });
      }

      const { name, email, phone, subject, message, rating, category, departmentId } = req.body;

      const feedback = await prisma.feedback.create({
        data: {
          name, email, phone, subject, message, rating, category,
          departmentId: departmentId || null,
        },
      });

      // Notify department admins
      if (departmentId) {
        const deptAdmins = await prisma.admin.findMany({
          where: { departmentId, isActive: true },
          select: { id: true },
        });

        if (deptAdmins.length > 0) {
          await prisma.notification.createMany({
            data: deptAdmins.map((admin) => ({
              adminId: admin.id,
              title: "New Feedback",
              message: `New feedback received: ${subject}`,
              type: "feedback_new",
              link: `/admin/feedbacks`,
            })),
          });
        }
      }

      res.status(201).json({ message: "Feedback submitted successfully", feedback });
    } catch (error) {
      console.error("Error creating feedback:", error);
      res.status(500).json({ message: "Failed to submit feedback" });
    }
  },
);

// Get all feedbacks (admin only, department-scoped)
router.get(
  "/",
  authenticateAdmin,
  [
    query("status").optional().isIn(["new", "resolved"]),
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

      const { status, page = 1, limit = 10, departmentId, search } = req.query;
      const skip = (Number(page) - 1) * Number(limit);
      const take = Math.min(Number(limit), 100);

      const deptScope = getDepartmentScope(req.admin);
      const where: any = { ...deptScope };

      if (status) where.status = status;
      if (departmentId && req.admin!.role === "super_admin") {
        where.departmentId = parseInt(departmentId as string);
      }
      if (search) {
        where.OR = [
          { name: { contains: search as string, mode: "insensitive" } },
          { subject: { contains: search as string, mode: "insensitive" } },
          { email: { contains: search as string, mode: "insensitive" } },
        ];
      }

      const [feedbacks, total] = await Promise.all([
        prisma.feedback.findMany({
          where,
          skip,
          take,
          include: {
            department: { select: { id: true, name: true, code: true } },
          },
          orderBy: { createdAt: "desc" },
        }),
        prisma.feedback.count({ where }),
      ]);

      res.json({
        message: "Feedbacks retrieved successfully",
        feedbacks,
        total,
        pagination: {
          page: Number(page),
          limit: take,
          total,
          pages: Math.ceil(total / take),
        },
      });
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
      res.status(500).json({ message: "Failed to fetch feedbacks" });
    }
  },
);

// Get feedback by ID (admin only)
router.get("/:id", authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deptScope = getDepartmentScope(req.admin);

    const feedback = await prisma.feedback.findFirst({
      where: { id: parseInt(id), ...deptScope },
      include: {
        department: { select: { id: true, name: true, code: true } },
      },
    });

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    res.json({ message: "Feedback retrieved successfully", feedback });
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ message: "Failed to fetch feedback" });
  }
});

// Update feedback (admin only)
router.put(
  "/:id",
  authenticateAdmin,
  [
    body("status").optional().isIn(["new", "resolved"]),
    body("adminNotes").optional().isString(),
    body("resolvedBy").optional().isString(),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Validation failed", errors: errors.array() });
      }

      const { id } = req.params;
      const { status, adminNotes, resolvedBy } = req.body;

      const deptScope = getDepartmentScope(req.admin);
      const existing = await prisma.feedback.findFirst({
        where: { id: parseInt(id), ...deptScope },
      });

      if (!existing) {
        return res.status(404).json({ message: "Feedback not found" });
      }

      const updateData: any = {};
      if (status !== undefined) updateData.status = status;
      if (adminNotes !== undefined) updateData.adminNotes = adminNotes;
      if (resolvedBy !== undefined) updateData.resolvedBy = resolvedBy;
      if (status === "resolved") updateData.resolvedAt = new Date();

      const feedback = await prisma.feedback.update({
        where: { id: parseInt(id) },
        data: updateData,
      });

      await createAuditLog({
        action: AuditActions.UPDATE,
        entity: "Feedback",
        entityId: feedback.id,
        details: updateData,
        adminId: req.admin!.id,
        ipAddress: req.ip,
        userAgent: req.get("user-agent"),
      });

      res.json({ message: "Feedback updated successfully", feedback });
    } catch (error) {
      console.error("Error updating feedback:", error);
      res.status(500).json({ message: "Failed to update feedback" });
    }
  },
);

// Resolve feedback (admin only)
router.patch(
  "/:id/resolve",
  authenticateAdmin,
  [body("adminNotes").optional().isString()],
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { adminNotes } = req.body;

      const deptScope = getDepartmentScope(req.admin);
      const existing = await prisma.feedback.findFirst({
        where: { id: parseInt(id), ...deptScope },
      });

      if (!existing) {
        return res.status(404).json({ message: "Feedback not found" });
      }

      const feedback = await prisma.feedback.update({
        where: { id: parseInt(id) },
        data: {
          status: "resolved",
          resolvedAt: new Date(),
          resolvedBy: req.admin!.name,
          adminNotes: adminNotes || undefined,
        },
      });

      res.json({ message: "Feedback resolved successfully", feedback });
    } catch (error) {
      console.error("Error resolving feedback:", error);
      res.status(500).json({ message: "Failed to resolve feedback" });
    }
  },
);

// Delete feedback (admin only)
router.delete("/:id", authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deptScope = getDepartmentScope(req.admin);
    const existing = await prisma.feedback.findFirst({
      where: { id: parseInt(id), ...deptScope },
    });

    if (!existing) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    await prisma.feedback.delete({ where: { id: parseInt(id) } });

    await createAuditLog({
      action: AuditActions.DELETE,
      entity: "Feedback",
      entityId: parseInt(id),
      adminId: req.admin!.id,
      ipAddress: req.ip,
      userAgent: req.get("user-agent"),
    });

    res.json({ message: "Feedback deleted successfully" });
  } catch (error) {
    console.error("Error deleting feedback:", error);
    res.status(500).json({ message: "Failed to delete feedback" });
  }
});

export default router;
