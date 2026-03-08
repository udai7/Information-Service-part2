import express, { Request, Response } from "express";
import { body, param, validationResult } from "express-validator";
import { prisma } from "../lib/prisma";
import { queryCache } from "../lib/prisma";
import { authenticateAdmin } from "../middleware/auth";
import { readLimiter } from "../middleware/rateLimiter";
import { pdfUpload, uploadPDFToOCI } from "../lib/fileUpload";
import "../types/express";

const router = express.Router();

// GET /api/certificate-services - Get all certificate services
router.get("/", authenticateAdmin, async (req: Request, res: Response) => {
  try {

    const certificateServices = await prisma.certificateService.findMany({
      include: {
        contacts: true,
        documents: true,
        processSteps: true,
        eligibilityItems: true,
        admin: {
          select: { id: true, name: true, email: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });


    res.json({
      success: true,
      certificateServices,
    });
  } catch (error) {
    console.error("Error fetching certificate services:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch certificate services",
      error: "An internal error occurred",
    });
  }
});

// GET /api/certificate-services/:id - Get specific certificate service
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

      const certificateService = await prisma.certificateService.findUnique({
        where: { id },
        include: {
          contacts: true,
          documents: true,
          admin: {
            select: { id: true, name: true, email: true },
          },
        },
      });

      if (!certificateService) {
        return res.status(404).json({
          success: false,
          message: "Certificate service not found",
        });
      }


      res.json({
        success: true,
        certificateService,
      });
    } catch (error) {
      console.error("Error fetching certificate service:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch certificate service",
        error: "An internal error occurred",
      });
    }
  },
);

// POST /api/certificate-services - Create new certificate service
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

      const certificateService = await prisma.certificateService.create({
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
          certificateDetails: [],
          processDetails: [],
        },
        include: {
          contacts: true,
          documents: true,
          admin: {
            select: { id: true, name: true, email: true },
          },
        },
      });

      res.status(201).json({
        success: true,
        certificateService,
        message: "Certificate service created successfully",
      });
    } catch (error) {
      console.error("Error creating certificate service:", error);
      res.status(500).json({
        success: false,
        message: "Failed to create certificate service",
        error: "An internal error occurred",
      });
    }
  },
);

// PATCH /api/certificate-services/:id - Update certificate service
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

      // Check if certificate service exists
      const existingService = await prisma.certificateService.findUnique({
        where: { id },
      });

      if (!existingService) {
        return res.status(404).json({
          success: false,
          message: "Certificate service not found",
        });
      }

      // Extract only whitelisted scalar fields to prevent mass assignment
      const allowedFields = [
        "name", "summary", "applicationMode", "type",
        "onlineUrl", "offlineAddress", "isActive",
        "applicationFee", "processingTime", "validityPeriod",
      ] as const;
      const updateData: Record<string, any> = {};
      for (const field of allowedFields) {
        if (req.body[field] !== undefined) {
          updateData[field] = req.body[field];
        }
      }

      const { contacts, documents, processSteps, eligibilityItems } = req.body;

      let prismaUpdateData: any = updateData;

      // If contacts are provided, handle them with Prisma's nested operations
      if (contacts && Array.isArray(contacts)) {
        prismaUpdateData.contacts = {
          deleteMany: {}, // Clear existing contacts
          create: contacts.map((contact: any) => ({
            serviceName: contact.serviceName || updateData.name,
            name: contact.name,
            designation: contact.designation,
            contact: contact.contact,
            email: contact.email || "",
            district: contact.district,
            subDistrict: contact.subDistrict || "",
            block: contact.block || "",
            applicationType: contact.applicationType || "New Application",
          })),
        };
      }

      // Handle documents if provided
      if (documents && Array.isArray(documents)) {
        prismaUpdateData.documents = {
          deleteMany: {}, // Clear existing documents
          create: documents.map((doc: any) => ({
            slNo: doc.slNo || 1,
            documentType: doc.documentType,
            validProof: doc.validProof,
            applicationType: doc.applicationType || "New Application",
          })),
        };
      }

      // Handle process steps if provided
      if (processSteps && Array.isArray(processSteps)) {
        prismaUpdateData.processSteps = {
          deleteMany: {}, // Clear existing process steps
          create: processSteps.map((step: any) => ({
            slNo: step.slNo || 1,
            stepDetails: step.stepDetails,
            applicationType: step.applicationType || "New Application",
          })),
        };
      }

      // Handle eligibility items if provided
      if (eligibilityItems && Array.isArray(eligibilityItems)) {
        prismaUpdateData.eligibilityItems = {
          deleteMany: {}, // Clear existing eligibility items
          create: eligibilityItems.map((item: any) => ({
            eligibilityDetail: item.eligibilityDetail,
            applicationType: item.applicationType || "New Application",
          })),
        };
      }

      const updatedService = await prisma.certificateService.update({
        where: { id },
        data: prismaUpdateData,
        include: {
          contacts: true,
          documents: true,
          processSteps: true,
          eligibilityItems: true,
          admin: {
            select: { id: true, name: true, email: true },
          },
        },
      });


      res.json({
        success: true,
        certificateService: updatedService,
        message: "Certificate service updated successfully",
      });
    } catch (error) {
      console.error("Error updating certificate service:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update certificate service",
        error: "An internal error occurred",
      });
    }
  },
);

// PATCH /api/certificate-services/:id/publish - Publish certificate service
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

      const existingService = await prisma.certificateService.findUnique({
        where: { id },
      });

      if (!existingService) {
        return res.status(404).json({
          success: false,
          message: "Certificate service not found",
        });
      }

      const admin = req.admin!;
      const publisherName =
        admin.role === "super_admin" ? "Admin" : admin.name;

      const publishedService = await prisma.certificateService.update({
        where: { id },
        data: {
          status: "published",
          publishedBy: admin.id,
          publishedByName: publisherName,
        },
        include: {
          contacts: true,
          documents: true,
          admin: {
            select: { id: true, name: true, email: true },
          },
        },
      });


      res.json({
        success: true,
        certificateService: publishedService,
        message: "Certificate service published successfully",
      });

      // Invalidate public cache
      queryCache.invalidate("certs:public");
    } catch (error) {
      console.error("Error publishing certificate service:", error);
      res.status(500).json({
        success: false,
        message: "Failed to publish certificate service",
        error: "An internal error occurred",
      });
    }
  },
);

// POST /api/certificate-services/:id/upload-pdf - Upload PDF for certificate service
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

      const existingService = await prisma.certificateService.findUnique({
        where: { id },
      });

      if (!existingService) {
        return res.status(404).json({
          success: false,
          message: "Certificate service not found",
        });
      }

      const pdfUrl = await uploadPDFToOCI(req.file);

      const updatedService = await prisma.certificateService.update({
        where: { id },
        data: { pdfUrl },
        include: {
          contacts: true,
          documents: true,
          admin: {
            select: { id: true, name: true, email: true },
          },
        },
      });

      res.json({
        success: true,
        certificateService: updatedService,
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

// PATCH /api/certificate-services/:id/toggle - Toggle certificate service active status
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

      // Ensure admin is authenticated
      if (!req.admin) {
        return res.status(401).json({
          success: false,
          message: "Authentication required",
        });
      }

      // Verify ownership
      const existingService = await prisma.certificateService.findFirst({
        where: {
          id: serviceId,
          adminId: req.admin.id,
        },
      });

      if (!existingService) {
        return res.status(404).json({
          success: false,
          message: "Certificate service not found",
        });
      }

      // Update isActive status
      const updatedService = await prisma.certificateService.update({
        where: { id: serviceId },
        data: {
          isActive: isActive,
          updatedAt: new Date(),
        },
        include: {
          admin: {
            select: { id: true, name: true, email: true },
          },
          contacts: true,
          documents: true,
          processSteps: true,
        },
      });

      res.json({
        success: true,
        message: `Certificate service ${
          isActive ? "activated" : "deactivated"
        } successfully`,
        certificateService: updatedService,
      });
    } catch (error) {
      console.error("Toggle certificate service active status error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to toggle certificate service status",
        error: "An internal error occurred",
      });
    }
  },
);

// DELETE /api/certificate-services/:id - Delete certificate service
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

      const existingService = await prisma.certificateService.findUnique({
        where: { id },
      });

      if (!existingService) {
        return res.status(404).json({
          success: false,
          message: "Certificate service not found",
        });
      }

      await prisma.certificateService.delete({
        where: { id },
      });


      res.json({
        success: true,
        message: "Certificate service deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting certificate service:", error);
      res.status(500).json({
        success: false,
        message: "Failed to delete certificate service",
        error: "An internal error occurred",
      });
    }
  },
);

// PUBLIC ROUTES (no authentication required)

// GET /api/certificate-services/public/list - Get all published certificate services (public)
router.get("/public/list", readLimiter, async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const pageNum = parseInt(page as string);
    const limitNum = Math.min(parseInt(limit as string) || 10, 100);
    const offset = (pageNum - 1) * limitNum;

    // Use cache for non-search queries
    const cacheKey = search ? null : `certs:public:${page}:${limitNum}`;
    if (cacheKey) {
      const cached = queryCache.get<any>(cacheKey);
      if (cached) {
        res.set("Cache-Control", "public, max-age=60, s-maxage=120");
        return res.json(cached);
      }
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

    const [certificateServices, total] = await Promise.all([
      prisma.certificateService.findMany({
        where: whereClause,
        include: {
          contacts: true,
          documents: true,
          processSteps: true,
          eligibilityItems: true,
        },
        orderBy: { createdAt: "desc" },
        skip: offset,
        take: limitNum,
      }),
      prisma.certificateService.count({
        where: whereClause,
      }),
    ]);

    const totalPages = Math.ceil(total / limitNum);

    const result = {
      success: true,
      certificateServices,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: totalPages,
      },
    };

    // Cache non-search results for 2 minutes
    if (cacheKey) {
      queryCache.set(cacheKey, result, 120_000);
    }

    res.set("Cache-Control", "public, max-age=60, s-maxage=120");
    res.json(result);
  } catch (error) {
    console.error("Error fetching public certificate services:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch certificate services",
      error: "An internal error occurred",
    });
  }
});

// GET /api/certificate-services/public/:id - Get specific published certificate service (public)
router.get("/public/:id", readLimiter, async (req: Request, res: Response) => {
  try {
    const serviceId = parseInt(req.params.id);

    if (isNaN(serviceId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid service ID",
      });
    }

    const certificateService = await prisma.certificateService.findFirst({
      where: {
        id: serviceId,
        status: "published",
        isActive: true,
      },
      include: {
        contacts: true,
        documents: true,
        processSteps: true,
        eligibilityItems: true,
      },
    });

    if (!certificateService) {
      return res.status(404).json({
        success: false,
        message: "Certificate service not found",
      });
    }

    res.json({
      success: true,
      certificateService,
    });
  } catch (error) {
    console.error("Error fetching public certificate service:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch certificate service",
      error: "An internal error occurred",
    });
  }
});

export default router;
