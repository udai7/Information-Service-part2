import express, { Request, Response } from "express";
import { param, validationResult } from "express-validator";
import { prisma } from "../lib/prisma";
import { authenticateAdmin } from "../middleware/auth";
import "../types/express";

const router = express.Router();

// ─── Get My Notifications ───
router.get("/", authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = Math.min(parseInt(req.query.limit as string) || 20, 50);
    const skip = (page - 1) * limit;

    const [notifications, total, unreadCount] = await Promise.all([
      prisma.notification.findMany({
        where: { adminId: req.admin!.id },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.notification.count({ where: { adminId: req.admin!.id } }),
      prisma.notification.count({
        where: { adminId: req.admin!.id, isRead: false },
      }),
    ]);

    res.json({
      notifications,
      unreadCount,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ─── Mark Notification as Read ───
router.patch(
  "/:id/read",
  authenticateAdmin,
  param("id").isInt(),
  async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);

      await prisma.notification.updateMany({
        where: { id, adminId: req.admin!.id },
        data: { isRead: true },
      });

      res.json({ message: "Notification marked as read" });
    } catch (error) {
      console.error("Error marking notification:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
);

// ─── Mark All as Read ───
router.patch("/read-all", authenticateAdmin, async (req: Request, res: Response) => {
  try {
    await prisma.notification.updateMany({
      where: { adminId: req.admin!.id, isRead: false },
      data: { isRead: true },
    });

    res.json({ message: "All notifications marked as read" });
  } catch (error) {
    console.error("Error marking all notifications:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
