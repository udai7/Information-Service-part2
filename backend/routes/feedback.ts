import express, { Request, Response } from "express";
import { body, validationResult, query } from "express-validator";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// Create feedback (public endpoint - no auth required)
router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("subject").notEmpty().withMessage("Subject is required"),
    body("message").notEmpty().withMessage("Message is required"),
    body("phone")
      .optional()
      .isMobilePhone("any")
      .withMessage("Valid phone number required"),
    body("rating")
      .optional()
      .isInt({ min: 1, max: 5 })
      .withMessage("Rating must be between 1 and 5"),
    body("category").optional().isString(),
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

      const { name, email, phone, subject, message, rating, category } =
        req.body;

      const feedback = await prisma.feedback.create({
        data: {
          name,
          email,
          phone,
          subject,
          message,
          rating,
          category,
        },
      });

      res.status(201).json({
        message: "Feedback submitted successfully",
        feedback,
      });
    } catch (error) {
      console.error("Error creating feedback:", error);
      res.status(500).json({
        message: "Failed to submit feedback",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },
);

// Get all feedbacks (admin only)
router.get(
  "/",
  [
    query("status")
      .optional()
      .isIn(["new", "resolved"])
      .withMessage("Status must be new or resolved"),
    query("page")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Page must be a positive integer"),
    query("limit")
      .optional()
      .isInt({ min: 1, max: 100 })
      .withMessage("Limit must be between 1 and 100"),
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

      const { status, page = 1, limit = 10 } = req.query;
      const skip = (Number(page) - 1) * Number(limit);

      const where: any = {};
      if (status) {
        where.status = status;
      }

      const [feedbacks, total] = await Promise.all([
        prisma.feedback.findMany({
          where,
          skip,
          take: Number(limit),
          orderBy: {
            createdAt: "desc",
          },
        }),
        prisma.feedback.count({ where }),
      ]);

      res.json({
        message: "Feedbacks retrieved successfully",
        feedbacks,
        total,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / Number(limit)),
        },
      });
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
      res.status(500).json({
        message: "Failed to fetch feedbacks",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },
);

// Get feedback by ID (admin only)
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const feedback = await prisma.feedback.findUnique({
      where: { id: parseInt(id) },
    });

    if (!feedback) {
      return res.status(404).json({
        message: "Feedback not found",
      });
    }

    res.json({
      message: "Feedback retrieved successfully",
      feedback,
    });
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({
      message: "Failed to fetch feedback",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Update feedback (admin only)
router.put(
  "/:id",
  [
    body("status")
      .optional()
      .isIn(["new", "resolved"])
      .withMessage("Status must be new or resolved"),
    body("adminNotes").optional().isString(),
    body("resolvedBy").optional().isString(),
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

      const { id } = req.params;
      const { status, adminNotes, resolvedBy } = req.body;

      const updateData: any = {};
      if (status !== undefined) updateData.status = status;
      if (adminNotes !== undefined) updateData.adminNotes = adminNotes;
      if (resolvedBy !== undefined) updateData.resolvedBy = resolvedBy;
      if (status === "resolved") updateData.resolvedAt = new Date();

      const feedback = await prisma.feedback.update({
        where: { id: parseInt(id) },
        data: updateData,
      });

      res.json({
        message: "Feedback updated successfully",
        feedback,
      });
    } catch (error: any) {
      console.error("Error updating feedback:", error);
      if (error.code === "P2025") {
        return res.status(404).json({
          message: "Feedback not found",
        });
      }
      res.status(500).json({
        message: "Failed to update feedback",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },
);

// Resolve feedback (admin only)
router.patch(
  "/:id/resolve",
  [body("adminNotes").optional().isString()],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "Validation failed",
          errors: errors.array(),
        });
      }

      const { id } = req.params;
      const { adminNotes } = req.body;

      // Get admin info from token (assuming you have auth middleware)
      const resolvedBy = "Admin";

      const feedback = await prisma.feedback.update({
        where: { id: parseInt(id) },
        data: {
          status: "resolved",
          resolvedAt: new Date(),
          resolvedBy,
          adminNotes: adminNotes || undefined,
        },
      });

      res.json({
        message: "Feedback resolved successfully",
        feedback,
      });
    } catch (error: any) {
      console.error("Error resolving feedback:", error);
      if (error.code === "P2025") {
        return res.status(404).json({
          message: "Feedback not found",
        });
      }
      res.status(500).json({
        message: "Failed to resolve feedback",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },
);

// Delete feedback (admin only)
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.feedback.delete({
      where: { id: parseInt(id) },
    });

    res.json({
      message: "Feedback deleted successfully",
    });
  } catch (error: any) {
    console.error("Error deleting feedback:", error);
    if (error.code === "P2025") {
      return res.status(404).json({
        message: "Feedback not found",
      });
    }
    res.status(500).json({
      message: "Failed to delete feedback",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

export default router;
