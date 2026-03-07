import express, { Request, Response } from "express";
import { query, param, validationResult } from "express-validator";
import { prisma } from "../lib/prisma";
import { authenticateAdmin, requireSuperAdmin } from "../middleware/auth";
import "../types/express";

const router = express.Router();

// ─── Get Audit Logs (SuperAdmin only) ───
router.get(
  "/",
  authenticateAdmin,
  requireSuperAdmin,
  [
    query("page").optional().isInt({ min: 1 }),
    query("limit").optional().isInt({ min: 1, max: 100 }),
    query("action").optional().isString(),
    query("entity").optional().isString(),
    query("adminId").optional().isInt(),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const page = parseInt(req.query.page as string) || 1;
      const limit = Math.min(parseInt(req.query.limit as string) || 50, 100);
      const skip = (page - 1) * limit;

      const where: any = {};
      if (req.query.action) where.action = req.query.action;
      if (req.query.entity) where.entity = req.query.entity;
      if (req.query.adminId) where.adminId = parseInt(req.query.adminId as string);

      const [logs, total] = await Promise.all([
        prisma.auditLog.findMany({
          where,
          include: {
            admin: { select: { id: true, name: true, email: true } },
          },
          skip,
          take: limit,
          orderBy: { createdAt: "desc" },
        }),
        prisma.auditLog.count({ where }),
      ]);

      res.json({
        logs,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      console.error("Error fetching audit logs:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
);

// ─── Get Audit Logs for specific entity ───
router.get(
  "/:entity/:entityId",
  authenticateAdmin,
  requireSuperAdmin,
  [param("entity").isString(), param("entityId").isInt()],
  async (req: Request, res: Response) => {
    try {
      const { entity, entityId } = req.params;

      const logs = await prisma.auditLog.findMany({
        where: { entity, entityId: parseInt(entityId) },
        include: {
          admin: { select: { id: true, name: true, email: true } },
        },
        orderBy: { createdAt: "desc" },
        take: 100,
      });

      res.json({ logs });
    } catch (error) {
      console.error("Error fetching entity audit logs:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
);

export default router;
