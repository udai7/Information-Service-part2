import express, { Request, Response } from "express";
import { body, param, validationResult } from "express-validator";
import { prisma, queryCache } from "../lib/prisma";
import { authenticateAdmin, requireSuperAdmin } from "../middleware/auth";
import { createAuditLog, AuditActions } from "../lib/auditLog";
import "../types/express";

const router = express.Router();

// ─── Create Department (SuperAdmin only) ───
router.post(
  "/",
  authenticateAdmin,
  requireSuperAdmin,
  [
    body("name").trim().isLength({ min: 2 }).withMessage("Name must be at least 2 characters"),
    body("code")
      .trim()
      .isLength({ min: 2, max: 5 })
      .isAlpha()
      .toUpperCase()
      .withMessage("Code must be 2-5 alphabetic characters"),
    body("description").optional().trim(),
    body("contactEmail").optional().isEmail(),
    body("contactPhone").optional().trim(),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, code, description, contactEmail, contactPhone } = req.body;

      // Check for duplicates
      const existing = await prisma.department.findFirst({
        where: { OR: [{ name }, { code: code.toUpperCase() }] },
      });
      if (existing) {
        return res.status(400).json({ error: "Department with this name or code already exists" });
      }

      const department = await prisma.department.create({
        data: {
          name,
          code: code.toUpperCase(),
          description,
          contactEmail,
          contactPhone,
        },
      });

      // Invalidate department caches
      await queryCache.invalidate("departments");

      await createAuditLog({
        action: AuditActions.CREATE,
        entity: "Department",
        entityId: department.id,
        details: { name, code: code.toUpperCase() },
        adminId: req.admin!.id,
        ipAddress: req.ip,
        userAgent: req.get("user-agent"),
      });

      res.status(201).json({
        message: "Department created successfully",
        department,
      });
    } catch (error) {
      console.error("Error creating department:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
);

// ─── List All Departments (cached) ───
router.get("/", authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const cacheKey = "departments:list:all";
    const cached = await queryCache.get<any>(cacheKey);
    if (cached) {
      res.set("X-Cache", "HIT");
      return res.json(cached);
    }

    const departments = await prisma.department.findMany({
      include: {
        _count: {
          select: {
            admins: true,
            schemeServices: true,
            certificateServices: true,
            contactServices: true,
            grievances: true,
            feedbacks: true,
          },
        },
      },
      orderBy: { name: "asc" },
    });

    const result = { departments };
    await queryCache.set(cacheKey, result, 60_000); // Cache 1 min
    res.set("X-Cache", "MISS");
    res.json(result);
  } catch (error) {
    console.error("Error fetching departments:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ─── Get Department by ID (cached) ───
router.get(
  "/:id",
  authenticateAdmin,
  param("id").isInt(),
  async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const cacheKey = `departments:${id}`;
      const cached = await queryCache.get<any>(cacheKey);
      if (cached) {
        res.set("X-Cache", "HIT");
        return res.json(cached);
      }

      const department = await prisma.department.findUnique({
        where: { id },
        include: {
          admins: {
            select: { id: true, name: true, email: true, role: true, isActive: true },
          },
          _count: {
            select: {
              schemeServices: true,
              certificateServices: true,
              contactServices: true,
              grievances: true,
              feedbacks: true,
            },
          },
        },
      });

      if (!department) {
        return res.status(404).json({ error: "Department not found" });
      }

      const result = { department };
      await queryCache.set(cacheKey, result, 60_000); // Cache 1 min
      res.set("X-Cache", "MISS");
      res.json(result);
    } catch (error) {
      console.error("Error fetching department:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
);

// ─── Get Department Stats (cached briefly) ───
router.get(
  "/:id/stats",
  authenticateAdmin,
  param("id").isInt(),
  async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const cacheKey = `departments:${id}:stats`;
      const cached = await queryCache.get<any>(cacheKey);
      if (cached) {
        res.set("X-Cache", "HIT");
        return res.json(cached);
      }

      const [
        totalGrievances,
        newGrievances,
        pendingGrievances,
        solvedGrievances,
        totalFeedbacks,
        newFeedbacks,
        totalServices,
        publishedServices,
      ] = await Promise.all([
        prisma.grievance.count({ where: { departmentId: id } }),
        prisma.grievance.count({ where: { departmentId: id, status: "new" } }),
        prisma.grievance.count({ where: { departmentId: id, status: "pending" } }),
        prisma.grievance.count({ where: { departmentId: id, status: "solved" } }),
        prisma.feedback.count({ where: { departmentId: id } }),
        prisma.feedback.count({ where: { departmentId: id, status: "new" } }),
        prisma.schemeService.count({ where: { departmentId: id } }),
        prisma.schemeService.count({ where: { departmentId: id, status: "published" } }),
      ]);

      const result = {
        stats: {
          grievances: { total: totalGrievances, new: newGrievances, pending: pendingGrievances, solved: solvedGrievances },
          feedbacks: { total: totalFeedbacks, new: newFeedbacks },
          services: { total: totalServices, published: publishedServices },
        },
      };

      await queryCache.set(cacheKey, result, 30_000); // Cache 30 sec
      res.set("X-Cache", "MISS");
      res.json(result);
    } catch (error) {
      console.error("Error fetching department stats:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
);

// ─── Update Department (SuperAdmin only) ───
router.put(
  "/:id",
  authenticateAdmin,
  requireSuperAdmin,
  param("id").isInt(),
  [
    body("name").optional().trim().isLength({ min: 2 }),
    body("description").optional().trim(),
    body("contactEmail").optional().isEmail(),
    body("contactPhone").optional().trim(),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const id = parseInt(req.params.id);
      const { name, description, contactEmail, contactPhone } = req.body;

      const department = await prisma.department.update({
        where: { id },
        data: {
          ...(name && { name }),
          ...(description !== undefined && { description }),
          ...(contactEmail !== undefined && { contactEmail }),
          ...(contactPhone !== undefined && { contactPhone }),
        },
      });

      // Invalidate department caches
      await queryCache.invalidate("departments");

      await createAuditLog({
        action: AuditActions.UPDATE,
        entity: "Department",
        entityId: department.id,
        details: req.body,
        adminId: req.admin!.id,
        ipAddress: req.ip,
        userAgent: req.get("user-agent"),
      });

      res.json({ message: "Department updated successfully", department });
    } catch (error: any) {
      if (error.code === "P2025") {
        return res.status(404).json({ error: "Department not found" });
      }
      console.error("Error updating department:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
);

// ─── Toggle Department Active/Inactive (SuperAdmin only) ───
router.patch(
  "/:id/toggle",
  authenticateAdmin,
  requireSuperAdmin,
  param("id").isInt(),
  async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);

      const department = await prisma.department.findUnique({ where: { id } });
      if (!department) {
        return res.status(404).json({ error: "Department not found" });
      }

      const updated = await prisma.department.update({
        where: { id },
        data: { isActive: !department.isActive },
      });

      // Invalidate department caches
      await queryCache.invalidate("departments");

      await createAuditLog({
        action: AuditActions.TOGGLE_ACTIVE,
        entity: "Department",
        entityId: id,
        details: { isActive: updated.isActive },
        adminId: req.admin!.id,
        ipAddress: req.ip,
        userAgent: req.get("user-agent"),
      });

      res.json({ message: `Department ${updated.isActive ? "activated" : "deactivated"}`, department: updated });
    } catch (error) {
      console.error("Error toggling department:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
);

// ─── Delete Department (SuperAdmin only) ───
router.delete(
  "/:id",
  authenticateAdmin,
  requireSuperAdmin,
  param("id").isInt(),
  async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);

      const department = await prisma.department.findUnique({
        where: { id },
        include: {
          _count: {
            select: {
              admins: true,
              schemeServices: true,
              certificateServices: true,
              contactServices: true,
              grievances: true,
              feedbacks: true,
            },
          },
        },
      });

      if (!department) {
        return res.status(404).json({ error: "Department not found" });
      }

      // Cascade delete everything in a transaction (extended timeout for many queries)
      await prisma.$transaction(async (tx) => {
        // First, collect all admin IDs in this department
        const deptAdmins = await tx.admin.findMany({
          where: { departmentId: id },
          select: { id: true },
        });
        const adminIds = deptAdmins.map((a) => a.id);

        // Build OR condition: by departmentId OR by adminId (covers all cases)
        const byDeptOrAdmin = adminIds.length > 0
          ? { OR: [{ departmentId: id }, { adminId: { in: adminIds } }] }
          : { departmentId: id };

        // Delete grievance activities for department grievances
        await tx.grievanceActivity.deleteMany({
          where: { grievance: { departmentId: id } },
        });
        // Delete grievances & feedbacks
        await tx.grievance.deleteMany({ where: { departmentId: id } });
        await tx.feedback.deleteMany({ where: { departmentId: id } });

        // Delete scheme service sub-relations then scheme services
        await tx.contactPerson.deleteMany({ where: { schemeService: byDeptOrAdmin } });
        await tx.supportiveDocument.deleteMany({ where: { schemeService: byDeptOrAdmin } });
        await tx.schemeService.deleteMany({ where: byDeptOrAdmin });

        // Delete certificate service sub-relations then certificate services
        await tx.certificateContact.deleteMany({ where: { certificateService: byDeptOrAdmin } });
        await tx.certificateDocument.deleteMany({ where: { certificateService: byDeptOrAdmin } });
        await tx.certificateProcessStep.deleteMany({ where: { certificateService: byDeptOrAdmin } });
        await tx.certificateEligibility.deleteMany({ where: { certificateService: byDeptOrAdmin } });
        await tx.certificateService.deleteMany({ where: byDeptOrAdmin });

        // Delete contact service sub-relations (offices -> posts -> employees)
        await tx.employee.deleteMany({
          where: { post: { office: { contactService: byDeptOrAdmin } } },
        });
        await tx.post.deleteMany({
          where: { office: { contactService: byDeptOrAdmin } },
        });
        await tx.contactServiceContact.deleteMany({ where: { contactService: byDeptOrAdmin } });
        await tx.contactServiceDocument.deleteMany({ where: { contactService: byDeptOrAdmin } });
        await tx.contactService.deleteMany({ where: byDeptOrAdmin });

        // Clean up admin-related records
        if (adminIds.length > 0) {
          await tx.auditLog.updateMany({
            where: { adminId: { in: adminIds } },
            data: { adminId: null },
          });
          await tx.grievanceActivity.updateMany({
            where: { adminId: { in: adminIds } },
            data: { adminId: null },
          });
          await tx.session.deleteMany({ where: { adminId: { in: adminIds } } });
          await tx.notification.deleteMany({ where: { adminId: { in: adminIds } } });
        }

        // Delete all admins in this department
        await tx.admin.deleteMany({ where: { departmentId: id } });

        // Finally delete the department
        await tx.department.delete({ where: { id } });
      }, { timeout: 30000 });

      // Invalidate department caches
      await queryCache.invalidate("departments");

      await createAuditLog({
        action: AuditActions.DELETE,
        entity: "Department",
        entityId: id,
        details: { name: department.name, code: department.code },
        adminId: req.admin!.id,
        ipAddress: req.ip,
        userAgent: req.get("user-agent"),
      });

      res.json({ message: "Department deleted successfully" });
    } catch (error: any) {
      if (error.code === "P2025") {
        return res.status(404).json({ error: "Department not found" });
      }
      console.error("Error deleting department:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
);

// ─── Public: List Active Departments (cached longer) ───
router.get("/public/list", async (_req: Request, res: Response) => {
  try {
    const cacheKey = "departments:public:list";
    const cached = await queryCache.get<any>(cacheKey);
    if (cached) {
      res.set("X-Cache", "HIT");
      res.set("Cache-Control", "public, max-age=300"); // Browser cache 5 min
      return res.json(cached);
    }

    const departments = await prisma.department.findMany({
      where: { isActive: true },
      select: { id: true, name: true, code: true, description: true, contactEmail: true, contactPhone: true },
      orderBy: { name: "asc" },
    });

    const result = { departments };
    await queryCache.set(cacheKey, result, 5 * 60_000); // Cache 5 min
    res.set("X-Cache", "MISS");
    res.set("Cache-Control", "public, max-age=300");
    res.json(result);
  } catch (error) {
    console.error("Error fetching public departments:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
