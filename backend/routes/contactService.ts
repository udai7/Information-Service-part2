import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { body, param, validationResult } from "express-validator";
import { authenticateAdmin } from "./adminAuth";
import "../types/express";

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/contact-services - Get all contact services
router.get("/", authenticateAdmin, async (req: Request, res: Response) => {
  try {
    console.log("Fetching contact services for admin:", req.admin?.id);

    const contactServices = await prisma.contactService.findMany({
      include: {
        contacts: true,
        documents: true,
        admin: {
          select: { id: true, name: true, email: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    console.log(`Found ${contactServices.length} contact services`);

    res.json({
      success: true,
      contactServices,
    });
  } catch (error) {
    console.error("Error fetching contact services:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch contact services",
      error: error instanceof Error ? error.message : "Unknown error",
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
      console.log(`Fetching contact service with ID: ${id}`);

      const contactService = await prisma.contactService.findUnique({
        where: { id },
        include: {
          contacts: true,
          documents: true,
          admin: {
            select: { id: true, name: true, email: true },
          },
        },
      });

      if (!contactService) {
        console.log(`Contact service with ID ${id} not found`);
        return res.status(404).json({
          success: false,
          message: "Contact service not found",
        });
      }

      console.log(`Found contact service: ${contactService.name}`);

      res.json({
        success: true,
        contactService,
      });
    } catch (error) {
      console.error("Error fetching contact service:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch contact service",
        error: error instanceof Error ? error.message : "Unknown error",
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
      console.log("Creating contact service for admin:", adminId);
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
        include: {
          contacts: true,
          documents: true,
          admin: {
            select: { id: true, name: true, email: true },
          },
        },
      });

      console.log("Contact service created successfully:", contactService.id);

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
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },
);

// PATCH /api/contact-services/:id - Update contact service
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
      console.log(`Updating contact service with ID: ${id}`);
      console.log("Update data:", req.body);

      // Check if contact service exists
      const existingService = await prisma.contactService.findUnique({
        where: { id },
      });

      if (!existingService) {
        return res.status(404).json({
          success: false,
          message: "Contact service not found",
        });
      }

      // Extract relationship fields and nested data that shouldn't be directly updated
      const {
        contacts,
        documents,
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
            serviceName: contact.serviceName,
            name: contact.name,
            designation: contact.designation,
            contact: contact.contact,
            email: contact.email || "",
            district: contact.district,
            subDistrict: contact.subDistrict || "",
            block: contact.block || "",
          })),
        };
      }

      // Handle documents if provided
      if (documents && Array.isArray(documents)) {
        prismaUpdateData.documents = {
          deleteMany: {}, // Clear existing documents
          create: documents.map((doc: any) => ({
            fileName: doc.fileName,
            originalName: doc.originalName,
            mimeType: doc.mimeType,
            size: doc.size,
          })),
        };
      }

      const updatedService = await prisma.contactService.update({
        where: { id },
        data: prismaUpdateData,
        include: {
          contacts: true,
          documents: true,
          admin: {
            select: { id: true, name: true, email: true },
          },
        },
      });

      console.log("Contact service updated successfully");

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
        error: error instanceof Error ? error.message : "Unknown error",
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
      console.log(`Publishing contact service with ID: ${id}`);

      const existingService = await prisma.contactService.findUnique({
        where: { id },
      });

      if (!existingService) {
        return res.status(404).json({
          success: false,
          message: "Contact service not found",
        });
      }

      const publishedService = await prisma.contactService.update({
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

      console.log("Contact service published successfully");

      res.json({
        success: true,
        contactService: publishedService,
        message: "Contact service published successfully",
      });
    } catch (error) {
      console.error("Error publishing contact service:", error);
      res.status(500).json({
        success: false,
        message: "Failed to publish contact service",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },
);

// PATCH /api/contact-services/:id - Toggle contact service active status
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
      const existingService = await prisma.contactService.findFirst({
        where: {
          id: serviceId,
          adminId: req.admin.id,
        },
      });

      if (!existingService) {
        return res.status(404).json({
          success: false,
          message: "Contact service not found",
        });
      }

      // Update isActive status
      const updatedService = await prisma.contactService.update({
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
        },
      });

      res.json({
        success: true,
        message: `Contact service ${
          isActive ? "activated" : "deactivated"
        } successfully`,
        contactService: updatedService,
      });
    } catch (error) {
      console.error("Toggle contact service active status error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to toggle contact service status",
        error: error instanceof Error ? error.message : "Unknown error",
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
      console.log(`Deleting contact service with ID: ${id}`);

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

      console.log("Contact service deleted successfully");

      res.json({
        success: true,
        message: "Contact service deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting contact service:", error);
      res.status(500).json({
        success: false,
        message: "Failed to delete contact service",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },
);

// PUBLIC ROUTES (no authentication required)

// GET /api/contact-services/public/list - Get all published contact services (public)
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

    const [contactServices, total] = await Promise.all([
      prisma.contactService.findMany({
        where: whereClause,
        include: {
          contacts: true,
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

    res.json({
      success: true,
      contactServices,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: totalPages,
      },
    });
  } catch (error) {
    console.error("Error fetching public contact services:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch contact services",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

export default router;
