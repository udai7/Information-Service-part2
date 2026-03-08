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
      queryCache.invalidate("departments");

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
    const cached = queryCache.get<any>(cacheKey);
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
    queryCache.set(cacheKey, result, 60_000); // Cache 1 min
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
      const cached = queryCache.get<any>(cacheKey);
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
      queryCache.set(cacheKey, result, 60_000); // Cache 1 min
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
      const cached = queryCache.get<any>(cacheKey);
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

      queryCache.set(cacheKey, result, 30_000); // Cache 30 sec
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
      queryCache.invalidate("departments");

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
      queryCache.invalidate("departments");

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

      // Check if department has any associated data
      const totalRelated =
        department._count.admins +
        department._count.schemeServices +
        department._count.certificateServices +
        department._count.contactServices +
        department._count.grievances +
        department._count.feedbacks;

      if (totalRelated > 0) {
        return res.status(400).json({
          error: `Cannot delete department. It has ${department._count.admins} admin(s), ${department._count.schemeServices + department._count.certificateServices + department._count.contactServices} service(s), ${department._count.grievances} grievance(s), and ${department._count.feedbacks} feedback(s). Please reassign or remove them first.`,
        });
      }

      await prisma.department.delete({ where: { id } });

      // Invalidate department caches
      queryCache.invalidate("departments");

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
    const cached = queryCache.get<any>(cacheKey);
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
    queryCache.set(cacheKey, result, 5 * 60_000); // Cache 5 min
    res.set("X-Cache", "MISS");
    res.set("Cache-Control", "public, max-age=300");
    res.json(result);
  } catch (error) {
    console.error("Error fetching public departments:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
