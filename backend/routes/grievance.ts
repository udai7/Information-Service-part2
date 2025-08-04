import express, { Request, Response } from "express";
import { body, validationResult, query } from "express-validator";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// Generate unique tracking ID
function generateTrackingId(): string {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `GRV-${timestamp}-${randomStr}`.toUpperCase();
}

// Create grievance (public endpoint - no auth required)
router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("phone").notEmpty().withMessage("Phone number is required"),
    body("address").notEmpty().withMessage("Address is required"),
    body("subject").notEmpty().withMessage("Subject is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("category").optional().isString(),
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
        name,
        email,
        phone,
        address,
        subject,
        description,
        category,
        priority = "medium",
        attachments = [],
      } = req.body;

      const trackingId = generateTrackingId();

      const grievance = await prisma.grievance.create({
        data: {
          name,
          email,
          phone,
          address,
          subject,
          description,
          category,
          priority,
          attachments,
          trackingId,
        },
      });

      res.status(201).json({
        message: "Grievance submitted successfully",
        grievance,
        trackingId,
      });
    } catch (error) {
      console.error("Error creating grievance:", error);
      res.status(500).json({
        message: "Failed to submit grievance",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },
);

// Get all grievances (admin only)
router.get(
  "/",
  [
    query("status")
      .optional()
      .isIn(["new", "pending", "solved"])
      .withMessage("Invalid status"),
    query("priority")
      .optional()
      .isIn(["low", "medium", "high", "urgent"])
      .withMessage("Invalid priority"),
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

      const { status, priority, page = 1, limit = 10 } = req.query;
      const skip = (Number(page) - 1) * Number(limit);

      const where: any = {};
      if (status) {
        where.status = status;
      }
      if (priority) {
        where.priority = priority;
      }

      const [grievances, total] = await Promise.all([
        prisma.grievance.findMany({
          where,
          skip,
          take: Number(limit),
          orderBy: {
            createdAt: "desc",
          },
        }),
        prisma.grievance.count({ where }),
      ]);

      res.json({
        message: "Grievances retrieved successfully",
        grievances,
        total,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / Number(limit)),
        },
      });
    } catch (error) {
      console.error("Error fetching grievances:", error);
      res.status(500).json({
        message: "Failed to fetch grievances",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },
);

// Get grievance by ID (admin only)
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const grievance = await prisma.grievance.findUnique({
      where: { id: parseInt(id) },
    });

    if (!grievance) {
      return res.status(404).json({
        message: "Grievance not found",
      });
    }

    res.json({
      message: "Grievance retrieved successfully",
      grievance,
    });
  } catch (error) {
    console.error("Error fetching grievance:", error);
    res.status(500).json({
      message: "Failed to fetch grievance",
      error: error instanceof Error ? error.message : "Unknown error",
    });
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
        // Don't expose sensitive admin data
      },
    });

    if (!grievance) {
      return res.status(404).json({
        message: "Grievance not found with this tracking ID",
      });
    }

    res.json({
      message: "Grievance status retrieved successfully",
      grievance,
    });
  } catch (error) {
    console.error("Error fetching grievance by tracking ID:", error);
    res.status(500).json({
      message: "Failed to fetch grievance status",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Update grievance (admin only)
router.put(
  "/:id",
  [
    body("status")
      .optional()
      .isIn(["new", "pending", "solved"])
      .withMessage("Invalid status"),
    body("priority")
      .optional()
      .isIn(["low", "medium", "high", "urgent"])
      .withMessage("Invalid priority"),
    body("assignedTo").optional().isString(),
    body("adminNotes").optional().isString(),
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
      const { status, priority, assignedTo, adminNotes } = req.body;

      const updateData: any = {};
      if (status !== undefined) updateData.status = status;
      if (priority !== undefined) updateData.priority = priority;
      if (assignedTo !== undefined) updateData.assignedTo = assignedTo;
      if (adminNotes !== undefined) updateData.adminNotes = adminNotes;
      if (status === "solved") updateData.resolvedAt = new Date();

      const grievance = await prisma.grievance.update({
        where: { id: parseInt(id) },
        data: updateData,
      });

      res.json({
        message: "Grievance updated successfully",
        grievance,
      });
    } catch (error: any) {
      console.error("Error updating grievance:", error);
      if (error.code === "P2025") {
        return res.status(404).json({
          message: "Grievance not found",
        });
      }
      res.status(500).json({
        message: "Failed to update grievance",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },
);

// Mark grievance as solved (admin only)
router.patch(
  "/:id/solve",
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
      const assignedTo = "Admin";

      const grievance = await prisma.grievance.update({
        where: { id: parseInt(id) },
        data: {
          status: "solved",
          resolvedAt: new Date(),
          assignedTo,
          adminNotes: adminNotes || undefined,
        },
      });

      res.json({
        message: "Grievance marked as solved successfully",
        grievance,
      });
    } catch (error: any) {
      console.error("Error solving grievance:", error);
      if (error.code === "P2025") {
        return res.status(404).json({
          message: "Grievance not found",
        });
      }
      res.status(500).json({
        message: "Failed to solve grievance",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },
);

// Mark grievance as pending (admin only)
router.patch(
  "/:id/pending",
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
      const assignedTo = "Admin";

      const grievance = await prisma.grievance.update({
        where: { id: parseInt(id) },
        data: {
          status: "pending",
          assignedTo,
          adminNotes: adminNotes || undefined,
        },
      });

      res.json({
        message: "Grievance marked as pending successfully",
        grievance,
      });
    } catch (error: any) {
      console.error("Error marking grievance as pending:", error);
      if (error.code === "P2025") {
        return res.status(404).json({
          message: "Grievance not found",
        });
      }
      res.status(500).json({
        message: "Failed to mark grievance as pending",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },
);

// Assign grievance to admin (admin only)
router.patch(
  "/:id/assign",
  [body("assignedTo").notEmpty().withMessage("Assigned to is required")],
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
      const { assignedTo } = req.body;

      const grievance = await prisma.grievance.update({
        where: { id: parseInt(id) },
        data: {
          assignedTo,
        },
      });

      res.json({
        message: "Grievance assigned successfully",
        grievance,
      });
    } catch (error: any) {
      console.error("Error assigning grievance:", error);
      if (error.code === "P2025") {
        return res.status(404).json({
          message: "Grievance not found",
        });
      }
      res.status(500).json({
        message: "Failed to assign grievance",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },
);

// Delete grievance (admin only)
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.grievance.delete({
      where: { id: parseInt(id) },
    });

    res.json({
      message: "Grievance deleted successfully",
    });
  } catch (error: any) {
    console.error("Error deleting grievance:", error);
    if (error.code === "P2025") {
      return res.status(404).json({
        message: "Grievance not found",
      });
    }
    res.status(500).json({
      message: "Failed to delete grievance",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

export default router;
