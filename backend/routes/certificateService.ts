import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { body, param, validationResult } from "express-validator";
import { authenticateAdmin } from "./adminAuth";
import "../types/express";

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/certificate-services - Get all certificate services
router.get("/", authenticateAdmin, async (req: Request, res: Response) => {
  try {
    console.log("Fetching certificate services for admin:", req.admin?.id);

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

    console.log(`Found ${certificateServices.length} certificate services`);

    res.json({
      success: true,
      certificateServices,
    });
  } catch (error) {
    console.error("Error fetching certificate services:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch certificate services",
      error: error instanceof Error ? error.message : "Unknown error",
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
      console.log(`Fetching certificate service with ID: ${id}`);

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
        console.log(`Certificate service with ID ${id} not found`);
        return res.status(404).json({
          success: false,
          message: "Certificate service not found",
        });
      }

      console.log(`Found certificate service: ${certificateService.name}`);

      res.json({
        success: true,
        certificateService,
      });
    } catch (error) {
      console.error("Error fetching certificate service:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch certificate service",
        error: error instanceof Error ? error.message : "Unknown error",
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
      console.log("Creating certificate service for admin:", adminId);
      console.log("Request body:", req.body);

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

      console.log(
        "Certificate service created successfully:",
        certificateService.id,
      );

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
        error: error instanceof Error ? error.message : "Unknown error",
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
      console.log(`Updating certificate service with ID: ${id}`);
      console.log("Update data:", req.body);

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

      // Extract relationship fields and nested data that shouldn't be directly updated
      const {
        contacts,
        documents,
        processSteps,
        eligibilityItems,
        admin,
        createdAt,
        updatedAt,
        id: bodyId,
        ...updateData
      } = req.body;

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

      console.log("Certificate service updated successfully");

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
        error: error instanceof Error ? error.message : "Unknown error",
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
      console.log(`Publishing certificate service with ID: ${id}`);

      const existingService = await prisma.certificateService.findUnique({
        where: { id },
      });

      if (!existingService) {
        return res.status(404).json({
          success: false,
          message: "Certificate service not found",
        });
      }

      const publishedService = await prisma.certificateService.update({
        where: { id },
        data: { status: "published" },
        include: {
          contacts: true,
          documents: true,
          admin: {
            select: { id: true, name: true, email: true },
          },
        },
      });

      console.log("Certificate service published successfully");

      res.json({
        success: true,
        certificateService: publishedService,
        message: "Certificate service published successfully",
      });
    } catch (error) {
      console.error("Error publishing certificate service:", error);
      res.status(500).json({
        success: false,
        message: "Failed to publish certificate service",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },
);

// PATCH /api/certificate-services/:id - Toggle certificate service active status
router.patch(
  "/:id",
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
        error: error instanceof Error ? error.message : "Unknown error",
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
      console.log(`Deleting certificate service with ID: ${id}`);

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

      console.log("Certificate service deleted successfully");

      res.json({
        success: true,
        message: "Certificate service deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting certificate service:", error);
      res.status(500).json({
        success: false,
        message: "Failed to delete certificate service",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },
);

// PUBLIC ROUTES (no authentication required)

// GET /api/certificate-services/public/list - Get all published certificate services (public)
router.get("/public/list", async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const offset = (pageNum - 1) * limitNum;

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

    res.json({
      success: true,
      certificateServices,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: totalPages,
      },
    });
  } catch (error) {
    console.error("Error fetching public certificate services:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch certificate services",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// GET /api/certificate-services/public/:id - Get specific published certificate service (public)
router.get("/public/:id", async (req: Request, res: Response) => {
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
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

export default router;
