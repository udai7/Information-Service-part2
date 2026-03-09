import express, { Request, Response } from "express";
import { body, validationResult, query } from "express-validator";
import { prisma, queryCache } from "../lib/prisma";
import { authenticateAdmin, getDepartmentScope } from "../middleware/auth";
import {
  submissionLimiter,
  readLimiter,
} from "../middleware/rateLimiter";
import { createAuditLog, AuditActions } from "../lib/auditLog";
import { sendOTP } from "../lib/mailer";
import "../types/express";

const router = express.Router();

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY || "1x0000000000000000000000000000000AA";
  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${secret}&response=${token}&remoteip=${ip}`,
    });
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error("Turnstile verification failed:", error);
    return false;
  }
}

// Send OTP and verify Turnstile + daily limit
router.post(
  "/public/send-otp",
  submissionLimiter,
  [
    body("email").isEmail().normalizeEmail().withMessage("Valid email is required"),
    body("turnstileToken").notEmpty().withMessage("Turnstile verification required"),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Validation failed", errors: errors.array() });
      }

      const { email, turnstileToken } = req.body;

      // 1. Verify Turnstile
      const isHuman = await verifyTurnstile(turnstileToken, req.ip || "");
      if (!isHuman) {
        return res.status(403).json({ message: "Turnstile verification failed" });
      }

      // 2. Check daily limit (3 feedbacks per day)
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);

      const countToday = await prisma.feedback.count({
        where: { email, createdAt: { gte: todayStart } },
      });

      if (countToday >= 3) {
        return res.status(429).json({ message: "Daily limit of 3 feedbacks reached for this email." });
      }

      // 3. Generate and send OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

      await prisma.verificationOTP.upsert({
        where: { email },
        update: { otp, expiresAt },
        create: { email, otp, expiresAt },
      });

      await sendOTP(email, otp);

      res.json({ message: "OTP sent successfully" });
    } catch (error) {
      console.error("Error sending OTP:", error);
      res.status(500).json({ message: "Failed to send OTP" });
    }
  }
);

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
    body("website").optional().isString(),
    body("otp").trim().notEmpty().withMessage("OTP is required"),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Validation failed", errors: errors.array() });
      }

      const { name, email, phone, subject, message, rating, category, departmentId, website, otp } = req.body;

      if (website && website.trim() !== "") {
        console.warn(`Spam bot detected via honeypot (IP: ${req.ip}). Discarding feedback silently.`);
        return res.status(201).json({ message: "Feedback submitted successfully", feedback: { id: 0 } });
      }

      // 1. Check daily limit again
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);
      const emailToCheck = email || "anonymous";
      if (emailToCheck !== "anonymous") {
        const countToday = await prisma.feedback.count({
          where: { email: emailToCheck, createdAt: { gte: todayStart } },
        });
        if (countToday >= 3) {
          return res.status(429).json({ message: "Daily limit of 3 feedbacks reached for this email." });
        }
      }

      // 2. Verify OTP
      if (emailToCheck !== "anonymous") {
        const storedOtp = await prisma.verificationOTP.findUnique({
          where: { email: emailToCheck },
        });

        if (!storedOtp || storedOtp.otp !== otp || storedOtp.expiresAt < new Date()) {
          return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        // Burn OTP
        await prisma.verificationOTP.delete({ where: { email: emailToCheck } });
      }

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

      // Invalidate public recent cache in background
      queryCache.invalidate("feedbacks:public").catch(() => {});
    } catch (error) {
      console.error("Error creating feedback:", error);
      res.status(500).json({ message: "Failed to submit feedback" });
    }
  }
);

// Get recent community feedbacks (public endpoint, cached)
router.get("/public/recent", readLimiter, async (req: Request, res: Response) => {
  try {
    const cacheKey = "feedbacks:public:recent";
    const cached = await queryCache.get<any>(cacheKey);
    if (cached) {
      res.set("X-Cache", "HIT");
      res.set("Cache-Control", "public, max-age=30");
      return res.json(cached);
    }

    const feedbacks = await prisma.feedback.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        subject: true,
        message: true,
        rating: true,
        category: true,
        status: true,
        createdAt: true,
      },
    });

    const result = { message: "Recent feedbacks retrieved successfully", feedbacks };
    await queryCache.set(cacheKey, result, 30_000); // Cache 30 sec
    res.set("X-Cache", "MISS");
    res.set("Cache-Control", "public, max-age=30");
    res.json(result);
  } catch (error) {
    console.error("Error fetching recent feedbacks:", error);
    res.status(500).json({ message: "Failed to fetch recent feedbacks" });
  }
});

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

      // Invalidate public recent cache in background
      queryCache.invalidate("feedbacks:public").catch(() => {});
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

    // Invalidate public recent cache in background
    queryCache.invalidate("feedbacks:public").catch(() => {});
  } catch (error) {
    console.error("Error deleting feedback:", error);
    res.status(500).json({ message: "Failed to delete feedback" });
  }
});

export default router;
