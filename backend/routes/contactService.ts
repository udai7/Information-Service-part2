import express, { Request, Response } from "express";
import { body, param, validationResult } from "express-validator";
import { prisma } from "../lib/prisma";
import { queryCache } from "../lib/prisma";
import { authenticateAdmin } from "../middleware/auth";
import { readLimiter } from "../middleware/rateLimiter";
import { pdfUpload, uploadPDFToOCI, deleteFromOCI } from "../lib/fileUpload";
import "../types/express";

const router = express.Router();

// Deep include for full contact service with offices, posts, employees
const fullInclude = {
  contacts: {
    include: {
      posts: {
        include: {
          employees: true,
        },
        orderBy: { createdAt: "asc" as const },
      },
    },
  },
  documents: true,
  admin: {
    select: { id: true, name: true, email: true, role: true },
  },
};

// GET /api/contact-services - Get all contact services
router.get("/", authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const contactServices = await prisma.contactService.findMany({
      include: fullInclude,
      orderBy: { createdAt: "desc" },
    });

    res.json({
      success: true,
      contactServices,
    });
  } catch (error) {
    console.error("Error fetching contact services:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch contact services",
      error: "An internal error occurred",
    });
  }
});

// GET /api/contact-services/:id - Get specific contact service
router.get(
  "/:id",
  authenticateAdmin,
  param("id").isInt().withMessage("ID must be a valid integer"),
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: errors.array(),
        });
      }

      const id = parseInt(req.params.id);

      const contactService = await prisma.contactService.findUnique({
        where: { id },
        include: fullInclude,
      });

      if (!contactService) {
        return res.status(404).json({
          success: false,
          message: "Contact service not found",
        });
      }

      res.json({
        success: true,
        contactService,
      });
    } catch (error) {
      console.error("Error fetching contact service:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch contact service",
        error: "An internal error occurred",
      });
    }
  },
);

// POST /api/contact-services - Create new contact service
router.post(
  "/",
  authenticateAdmin,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("summary").notEmpty().withMessage("Summary is required"),
    body("applicationMode")
      .notEmpty()
      .withMessage("Application mode is required"),
    body("targetAudience")
      .isArray()
      .withMessage("Target audience must be an array"),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: errors.array(),
        });
      }

      const adminId = req.admin!.id;

      const {
        name,
        summary,
        type,
        targetAudience,
        applicationMode,
        onlineUrl,
        offlineAddress,
      } = req.body;

      const contactService = await prisma.contactService.create({
        data: {
          name,
          summary,
          type,
          targetAudience,
          applicationMode,
          onlineUrl,
          offlineAddress,
          status: "draft",
          adminId,
          eligibilityDetails: [],
          contactDetails: [],
          processDetails: [],
        },
        include: fullInclude,
      });

      res.status(201).json({
        success: true,
        contactService,
        message: "Contact service created successfully",
      });
    } catch (error) {
      console.error("Error creating contact service:", error);
      res.status(500).json({
        success: false,
        message: "Failed to create contact service",
        error: "An internal error occurred",
      });
    }
  },
);

// PATCH /api/contact-services/:id - Update contact service
// IMPORTANT: Does NOT replace contacts (offices). Offices are managed via separate endpoints.
router.patch(
  "/:id",
  authenticateAdmin,
  param("id").isInt().withMessage("ID must be a valid integer"),
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: errors.array(),
        });
      }

      const id = parseInt(req.params.id);

      const existingService = await prisma.contactService.findUnique({
        where: { id },
      });

      if (!existingService) {
        return res.status(404).json({
          success: false,
          message: "Contact service not found",
        });
      }

      // Only update whitelisted scalar fields to prevent mass assignment
      const allowedFields = ["name", "summary", "type", "applicationMode", "isActive"] as const;
      const updateData: Record<string, any> = {};
      for (const field of allowedFields) {
        if (req.body[field] !== undefined) {
          updateData[field] = req.body[field];
        }
      }

      const updatedService = await prisma.contactService.update({
        where: { id },
        data: updateData,
        include: fullInclude,
      });

      res.json({
        success: true,
        contactService: updatedService,
        message: "Contact service updated successfully",
      });
    } catch (error) {
      console.error("Error updating contact service:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update contact service",
        error: "An internal error occurred",
      });
    }
  },
);

// POST /api/contact-services/:id/offices - Add office to contact service
router.post(
  "/:id/offices",
  authenticateAdmin,
  [
    param("id").isInt().withMessage("ID must be a valid integer"),
    body("officeName").notEmpty().withMessage("Office name is required"),
    body("level").notEmpty().withMessage("Level is required"),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: errors.array(),
        });
      }

      const serviceId = parseInt(req.params.id);

      const existingService = await prisma.contactService.findUnique({
        where: { id: serviceId },
      });

      if (!existingService) {
        return res.status(404).json({
          success: false,
          message: "Contact service not found",
        });
      }

      const { officeName, level, pincode, district, block, subdivision } =
        req.body;

      const newContact = await prisma.contactServiceContact.create({
        data: {
          serviceName: existingService.name,
          name: officeName,
          designation: level,
          contact: pincode || "",
          email: "",
          district: level === "State" ? "All Districts" : district || "",
          subDistrict: subdivision || "",
          block: block || "",
          contactServiceId: serviceId,
        },
        include: {
          posts: {
            include: {
              employees: true,
            },
          },
        },
      });

      res.status(201).json({
        success: true,
        office: newContact,
        message: "Office added successfully",
      });
    } catch (error) {
      console.error("Error adding office:", error);
      res.status(500).json({
        success: false,
        message: "Failed to add office",
        error: "An internal error occurred",
      });
    }
  },
);

// PATCH /api/contact-services/:id/publish - Publish contact service
router.patch(
  "/:id/publish",
  authenticateAdmin,
  param("id").isInt().withMessage("ID must be a valid integer"),
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: errors.array(),
        });
      }

      const id = parseInt(req.params.id);
      const admin = req.admin!;

      const existingService = await prisma.contactService.findUnique({
        where: { id },
      });

      if (!existingService) {
        return res.status(404).json({
          success: false,
          message: "Contact service not found",
        });
      }

      // Determine publisher name for accountability
      const publisherName =
        admin.role === "super_admin" ? "Admin" : admin.name;

      const publishedService = await prisma.contactService.update({
        where: { id },
        data: {
          status: "published",
          publishedBy: admin.id,
          publishedByName: publisherName,
        },
        include: fullInclude,
      });

      res.json({
        success: true,
        contactService: publishedService,
        message: "Contact service published successfully",
      });

      // Invalidate public cache
      await queryCache.invalidate("contacts:public");
    } catch (error) {
      console.error("Error publishing contact service:", error);
      res.status(500).json({
        success: false,
        message: "Failed to publish contact service",
        error: "An internal error occurred",
      });
    }
  },
);

// POST /api/contact-services/:id/upload-pdf - Upload PDF for contact service
router.post(
  "/:id/upload-pdf",
  authenticateAdmin,
  param("id").isInt().withMessage("ID must be a valid integer"),
  pdfUpload.single("pdf"),
  async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No PDF file uploaded",
        });
      }

      const existingService = await prisma.contactService.findUnique({
        where: { id },
      });

      if (!existingService) {
        return res.status(404).json({
          success: false,
          message: "Contact service not found",
        });
      }

      // Delete old PDF from OCI if it exists
      if (existingService.pdfUrl?.startsWith("https://")) {
        await deleteFromOCI(existingService.pdfUrl);
      }

      const pdfUrl = await uploadPDFToOCI(req.file);

      const updatedService = await prisma.contactService.update({
        where: { id },
        data: { pdfUrl },
        include: fullInclude,
      });

      res.json({
        success: true,
        contactService: updatedService,
        pdfUrl,
        message: "PDF uploaded successfully",
      });
    } catch (error) {
      console.error("Error uploading PDF:", error);
      res.status(500).json({
        success: false,
        message: "Failed to upload PDF",
        error: "An internal error occurred",
      });
    }
  },
);

// PATCH /api/contact-services/:id/toggle - Toggle contact service active status
router.patch(
  "/:id/toggle",
  authenticateAdmin,
  [
    param("id").isInt().withMessage("Invalid service ID"),
    body("isActive").isBoolean().withMessage("isActive must be a boolean"),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: errors.array(),
        });
      }

      const serviceId = parseInt(req.params.id);
      const { isActive } = req.body;

      if (!req.admin) {
        return res.status(401).json({
          success: false,
          message: "Authentication required",
        });
      }

      const existingService = await prisma.contactService.findUnique({
        where: { id: serviceId },
      });

      if (!existingService) {
        return res.status(404).json({
          success: false,
          message: "Contact service not found",
        });
      }

      const updatedService = await prisma.contactService.update({
        where: { id: serviceId },
        data: {
          isActive: isActive,
          updatedAt: new Date(),
        },
        include: fullInclude,
      });

      res.json({
        success: true,
        message: `Contact service ${isActive ? "activated" : "deactivated"
          } successfully`,
        contactService: updatedService,
      });
    } catch (error) {
      console.error("Toggle contact service active status error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to toggle contact service status",
        error: "An internal error occurred",
      });
    }
  },
);

// DELETE /api/contact-services/:id - Delete contact service
router.delete(
  "/:id",
  authenticateAdmin,
  param("id").isInt().withMessage("ID must be a valid integer"),
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: errors.array(),
        });
      }

      const id = parseInt(req.params.id);

      const existingService = await prisma.contactService.findUnique({
        where: { id },
      });

      if (!existingService) {
        return res.status(404).json({
          success: false,
          message: "Contact service not found",
        });
      }

      await prisma.contactService.delete({
        where: { id },
      });

      res.json({
        success: true,
        message: "Contact service deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting contact service:", error);
      res.status(500).json({
        success: false,
        message: "Failed to delete contact service",
        error: "An internal error occurred",
      });
    }
  },
);

// PUBLIC ROUTES (no authentication required)

// GET /api/contact-services/public/list - Get all published contact services (public)
router.get("/public/list", readLimiter, async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const pageNum = parseInt(page as string);
    const limitNum = Math.min(parseInt(limit as string) || 10, 100);
    const offset = (pageNum - 1) * limitNum;

    // Use cache for non-search queries (deep include is expensive)
    const cacheKey = "contacts:public:list";
    const cached = await queryCache.get<any>(cacheKey);
    if (cached) {
      res.set("Cache-Control", "public, max-age=60, s-maxage=120");
      return res.json(cached);
    }

    let whereClause: any = {
      status: "published",
      isActive: true,
    };

    if (search) {
      whereClause.OR = [
        { name: { contains: search as string, mode: "insensitive" } },
        { summary: { contains: search as string, mode: "insensitive" } },
      ];
    }

    const [contactServices, total] = await Promise.all([
      prisma.contactService.findMany({
        where: whereClause,
        include: {
          contacts: {
            include: {
              posts: {
                include: {
                  employees: true,
                },
              },
            },
          },
          documents: true,
        },
        orderBy: { createdAt: "desc" },
        skip: offset,
        take: limitNum,
      }),
      prisma.contactService.count({
        where: whereClause,
      }),
    ]);

    const totalPages = Math.ceil(total / limitNum);

    const result = {
      success: true,
      contactServices,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: totalPages,
      },
    };

    // Cache non-search results for 2 minutes
    await queryCache.set(cacheKey, result, 120_000); // Cache 2 min
    res.set("X-Cache", "MISS");
    res.set("Cache-Control", "public, max-age=60, s-maxage=120");
    res.json(result);
  } catch (error) {
    console.error("Error fetching public contact services:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch contact services",
      error: "An internal error occurred",
    });
  }
});

// DELETE /api/contact-services/:serviceId/contacts/:contactId - Delete individual office
router.delete(
  "/:serviceId/contacts/:contactId",
  authenticateAdmin,
  param("serviceId").isInt().withMessage("Service ID must be a valid integer"),
  param("contactId").isInt().withMessage("Contact ID must be a valid integer"),
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: errors.array(),
        });
      }

      const serviceId = parseInt(req.params.serviceId);
      const contactId = parseInt(req.params.contactId);

      const existingService = await prisma.contactService.findUnique({
        where: { id: serviceId },
      });

      if (!existingService) {
        return res.status(404).json({
          success: false,
          message: "Contact service not found",
        });
      }

      const existingContact = await prisma.contactServiceContact.findFirst({
        where: {
          id: contactId,
          contactServiceId: serviceId,
        },
      });

      if (!existingContact) {
        return res.status(404).json({
          success: false,
          message: "Contact not found in this service",
        });
      }

      await prisma.contactServiceContact.delete({
        where: { id: contactId },
      });

      res.json({
        success: true,
        message: "Office deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting contact:", error);
      res.status(500).json({
        success: false,
        message: "Failed to delete contact",
        error: "An internal error occurred",
      });
    }
  },
);

export default router;
