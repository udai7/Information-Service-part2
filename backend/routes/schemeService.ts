import express, { Request, Response } from "express";
import { body, validationResult, param } from "express-validator";
import { PrismaClient } from "@prisma/client";
import { authenticateAdmin } from "./adminAuth";
import "../types/express";

const router = express.Router();
const prisma = new PrismaClient();

// Create new scheme service (basic information)
router.post(
  "/create",
  authenticateAdmin,
  [
    body("name")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters"),
    body("summary")
      .trim()
      .isLength({ min: 10 })
      .withMessage("Summary must be at least 10 characters"),
    body("type").optional().trim(),
    body("targetAudience")
      .isArray()
      .withMessage("Target audience must be an array"),
    body("applicationMode")
      .isIn(["online", "offline", "both"])
      .withMessage("Invalid application mode"),
    body("onlineUrl")
      .optional()
      .custom((value, { req }) => {
        // Only validate URL format if it's provided and application mode requires it
        if (
          value &&
          (req.body.applicationMode === "online" ||
            req.body.applicationMode === "both")
        ) {
          if (!value.startsWith("http://") && !value.startsWith("https://")) {
            throw new Error("Online URL must start with http:// or https://");
          }
        }
        return true;
      }),
    body("offlineAddress").optional().trim(),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const {
        name,
        summary,
        type,
        targetAudience,
        applicationMode,
        onlineUrl,
        offlineAddress,
      } = req.body;

      // Ensure admin is authenticated
      if (!req.admin) {
        return res.status(401).json({ error: "Authentication required" });
      }

      // Check if scheme service with same name exists
      const existingService = await prisma.schemeService.findFirst({
        where: {
          name: name,
          adminId: req.admin.id,
        },
      });

      if (existingService) {
        return res
          .status(400)
          .json({ error: "Scheme service with this name already exists" });
      }

      const schemeService = await prisma.schemeService.create({
        data: {
          name,
          summary,
          type: type || "",
          targetAudience: targetAudience.filter(
            (item: string) => item.trim() !== "",
          ),
          applicationMode,
          onlineUrl:
            applicationMode === "online" || applicationMode === "both"
              ? onlineUrl
              : null,
          offlineAddress:
            applicationMode === "offline" || applicationMode === "both"
              ? offlineAddress
              : null,
          adminId: req.admin.id,
          status: "draft",
          eligibilityDetails: [],
          schemeDetails: [],
          processDetails: [],
        },
        include: {
          admin: {
            select: { id: true, name: true, email: true },
          },
          contacts: true,
          documents: true,
        },
      });

      res.status(201).json({
        message: "Scheme service created successfully",
        schemeService,
      });
    } catch (error) {
      console.error("Create scheme service error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
);

// Get all scheme services for admin
router.get("/", authenticateAdmin, async (req: any, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where: any = { adminId: req.admin.id };
    if (status && ["draft", "pending", "published"].includes(status)) {
      where.status = status;
    }

    const [schemeServices, total] = await Promise.all([
      prisma.schemeService.findMany({
        where,
        include: {
          admin: {
            select: { id: true, name: true, email: true },
          },
          contacts: true,
          documents: true,
          _count: {
            select: {
              contacts: true,
              documents: true,
            },
          },
        },
        orderBy: { updatedAt: "desc" },
        skip,
        take: parseInt(limit),
      }),
      prisma.schemeService.count({ where }),
    ]);

    // Get statistics
    const stats = await prisma.schemeService.groupBy({
      by: ["status"],
      where: { adminId: req.admin.id },
      _count: {
        status: true,
      },
    });

    const statsFormatted = {
      draft: stats.find((s: any) => s.status === "draft")?._count?.status || 0,
      pending:
        stats.find((s: any) => s.status === "pending")?._count?.status || 0,
      published:
        stats.find((s: any) => s.status === "published")?._count?.status || 0,
      total: stats.reduce((sum: any, s: any) => sum + s._count.status, 0),
    };

    res.json({
      schemeServices,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
      stats: statsFormatted,
    });
  } catch (error) {
    console.error("Get scheme services error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get single scheme service by ID
router.get(
  "/:id",
  authenticateAdmin,
  [param("id").isInt().withMessage("Invalid service ID")],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Ensure admin is authenticated
      if (!req.admin) {
        return res.status(401).json({ error: "Authentication required" });
      }

      const serviceId = parseInt(req.params.id);
      console.log("Getting scheme service with ID:", serviceId);

      const schemeService = await prisma.schemeService.findFirst({
        where: {
          id: serviceId,
          adminId: req.admin.id,
        },
        include: {
          admin: {
            select: { id: true, name: true, email: true },
          },
          contacts: true,
          documents: true,
        },
      });

      console.log("Found scheme service:", schemeService);

      if (!schemeService) {
        console.log("Scheme service not found");
        return res.status(404).json({ error: "Scheme service not found" });
      }

      console.log("Returning scheme service response");
      res.json({ schemeService });
    } catch (error) {
      console.error("Get scheme service error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
);

// Update scheme service (for editing form)
router.put(
  "/:id",
  authenticateAdmin,
  [
    param("id").isInt().withMessage("Invalid service ID"),
    body("eligibilityDetails").optional().isArray(),
    body("schemeDetails").optional().isArray(),
    body("processDetails").optional().isArray(),
    body("processNew").optional().trim(),
    body("processUpdate").optional().trim(),
    body("processLost").optional().trim(),
    body("processSurrender").optional().trim(),
    body("docNew").optional().trim(),
    body("docUpdate").optional().trim(),
    body("docLost").optional().trim(),
    body("docSurrender").optional().trim(),
    body("contacts").optional().isArray(),
    body("documents").optional().isArray(),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Ensure admin is authenticated
      if (!req.admin) {
        return res.status(401).json({ error: "Authentication required" });
      }

      const serviceId = parseInt(req.params.id);
      const {
        eligibilityDetails,
        schemeDetails,
        processDetails,
        processNew,
        processUpdate,
        processLost,
        processSurrender,
        docNew,
        docUpdate,
        docLost,
        docSurrender,
        contacts,
        documents,
      } = req.body;

      // Verify ownership
      const existingService = await prisma.schemeService.findFirst({
        where: {
          id: serviceId,
          adminId: req.admin.id,
        },
      });

      if (!existingService) {
        return res.status(404).json({ error: "Scheme service not found" });
      }

      // Update using transaction
      const updatedService = await prisma.$transaction(async (tx: any) => {
        // Update main service
        const service = await tx.schemeService.update({
          where: { id: serviceId },
          data: {
            eligibilityDetails:
              eligibilityDetails?.filter(
                (item: string) => item.trim() !== "",
              ) || existingService.eligibilityDetails,
            schemeDetails:
              schemeDetails?.filter((item: string) => item.trim() !== "") ||
              existingService.schemeDetails,
            processDetails:
              processDetails?.filter((item: string) => item.trim() !== "") ||
              existingService.processDetails,
            processNew:
              processNew !== undefined
                ? processNew
                : existingService.processNew,
            processUpdate:
              processUpdate !== undefined
                ? processUpdate
                : existingService.processUpdate,
            processLost:
              processLost !== undefined
                ? processLost
                : existingService.processLost,
            processSurrender:
              processSurrender !== undefined
                ? processSurrender
                : existingService.processSurrender,
            docNew: docNew !== undefined ? docNew : existingService.docNew,
            docUpdate:
              docUpdate !== undefined ? docUpdate : existingService.docUpdate,
            docLost: docLost !== undefined ? docLost : existingService.docLost,
            docSurrender:
              docSurrender !== undefined
                ? docSurrender
                : existingService.docSurrender,
            updatedAt: new Date(),
          },
        });

        // Update contacts if provided
        if (contacts && Array.isArray(contacts)) {
          // Delete existing contacts
          await tx.contactPerson.deleteMany({
            where: { schemeServiceId: serviceId },
          });

          // Create new contacts
          if (contacts.length > 0) {
            const validContacts = contacts.filter(
              (contact: any) =>
                contact.name &&
                contact.name.trim() !== "" &&
                contact.contact &&
                contact.contact.trim() !== "",
            );

            if (validContacts.length > 0) {
              await tx.contactPerson.createMany({
                data: validContacts.map((contact: any) => ({
                  ...contact,
                  schemeServiceId: serviceId,
                })),
              });
            }
          }
        }

        // Update documents if provided
        if (documents && Array.isArray(documents)) {
          // Delete existing documents
          await tx.supportiveDocument.deleteMany({
            where: { schemeServiceId: serviceId },
          });

          // Create new documents
          if (documents.length > 0) {
            const validDocuments = documents.filter(
              (doc: any) =>
                doc.documentType &&
                doc.documentType.trim() !== "" &&
                doc.validProof &&
                doc.validProof.trim() !== "",
            );

            if (validDocuments.length > 0) {
              await tx.supportiveDocument.createMany({
                data: validDocuments.map((doc: any, index: number) => ({
                  slNo: doc.slNo || index + 1,
                  documentType: doc.documentType,
                  validProof: doc.validProof,
                  isRequired:
                    doc.isRequired !== undefined ? doc.isRequired : true,
                  schemeServiceId: serviceId,
                })),
              });
            }
          }
        }

        return service;
      });

      // Fetch updated service with relations
      const fullUpdatedService = await prisma.schemeService.findUnique({
        where: { id: serviceId },
        include: {
          admin: {
            select: { id: true, name: true, email: true },
          },
          contacts: true,
          documents: true,
        },
      });

      res.json({
        message: "Scheme service updated successfully",
        schemeService: fullUpdatedService,
      });
    } catch (error) {
      console.error("Update scheme service error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
);

// Publish scheme service (change status to published)
router.patch(
  "/:id/publish",
  authenticateAdmin,
  [param("id").isInt().withMessage("Invalid service ID")],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Ensure admin is authenticated
      if (!req.admin) {
        return res.status(401).json({ error: "Authentication required" });
      }

      const serviceId = parseInt(req.params.id);

      // Verify ownership and current status
      const existingService = await prisma.schemeService.findFirst({
        where: {
          id: serviceId,
          adminId: req.admin.id,
        },
        include: {
          contacts: true,
          documents: true,
        },
      });

      if (!existingService) {
        return res.status(404).json({ error: "Scheme service not found" });
      }

      // Allow republishing - just update the existing published service

      // Validate completeness before publishing
      const validationErrors = [];

      if (!existingService.name || existingService.name.trim() === "") {
        validationErrors.push("Service name is required");
      }

      if (!existingService.summary || existingService.summary.trim() === "") {
        validationErrors.push("Service summary is required");
      }

      if (existingService.eligibilityDetails.length === 0) {
        validationErrors.push("Eligibility details are required");
      }

      if (existingService.schemeDetails.length === 0) {
        validationErrors.push("Scheme details are required");
      }

      if (existingService.contacts.length === 0) {
        validationErrors.push("At least one contact person is required");
      }

      if (validationErrors.length > 0) {
        return res.status(400).json({
          error: "Cannot publish incomplete service",
          validationErrors,
        });
      }

      // Update status to published
      const updatedService = await prisma.schemeService.update({
        where: { id: serviceId },
        data: {
          status: "published",
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
        message: "Scheme service published successfully",
        schemeService: updatedService,
      });
    } catch (error) {
      console.error("Publish scheme service error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
);

// Toggle scheme service active status (for admin dashboard)
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
        return res.status(400).json({ errors: errors.array() });
      }

      // Ensure admin is authenticated
      if (!req.admin) {
        return res.status(401).json({ error: "Authentication required" });
      }

      const serviceId = parseInt(req.params.id);
      const { isActive } = req.body;

      // Verify ownership
      const existingService = await prisma.schemeService.findFirst({
        where: {
          id: serviceId,
          adminId: req.admin.id,
        },
      });

      if (!existingService) {
        return res.status(404).json({ error: "Scheme service not found" });
      }

      // Update isActive status
      const updatedService = await prisma.schemeService.update({
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
        message: `Scheme service ${isActive ? "activated" : "deactivated"} successfully`,
        schemeService: updatedService,
      });
    } catch (error) {
      console.error("Toggle scheme service active status error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
);

// Delete scheme service
router.delete(
  "/:id",
  authenticateAdmin,
  [param("id").isInt().withMessage("Invalid service ID")],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Ensure admin is authenticated
      if (!req.admin) {
        return res.status(401).json({ error: "Authentication required" });
      }

      const serviceId = parseInt(req.params.id);

      // Verify ownership
      const existingService = await prisma.schemeService.findFirst({
        where: {
          id: serviceId,
          adminId: req.admin.id,
        },
      });

      if (!existingService) {
        return res.status(404).json({ error: "Scheme service not found" });
      }

      // Delete using transaction (contacts and documents will be deleted due to cascade)
      await prisma.schemeService.delete({
        where: { id: serviceId },
      });

      res.json({ message: "Scheme service deleted successfully" });
    } catch (error) {
      console.error("Delete scheme service error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
);

// Get public scheme services (for user dashboard)
router.get("/public/list", async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

    const where: any = { status: "published" };

    if (search && typeof search === "string") {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { summary: { contains: search, mode: "insensitive" } },
        { type: { contains: search, mode: "insensitive" } },
      ];
    }

    const [schemeServices, total] = await Promise.all([
      prisma.schemeService.findMany({
        where,
        select: {
          id: true,
          name: true,
          summary: true,
          type: true,
          targetAudience: true,
          applicationMode: true,
          onlineUrl: true,
          offlineAddress: true,
          createdAt: true,
          updatedAt: true,
          admin: {
            select: { name: true },
          },
        },
        orderBy: { updatedAt: "desc" },
        skip,
        take: parseInt(limit as string),
      }),
      prisma.schemeService.count({ where }),
    ]);

    res.json({
      schemeServices,
      pagination: {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        total,
        pages: Math.ceil(total / parseInt(limit as string)),
      },
    });
  } catch (error) {
    console.error("Get public scheme services error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get single public scheme service details
router.get(
  "/public/:id",
  [param("id").isInt().withMessage("Invalid service ID")],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const serviceId = parseInt(req.params.id);

      const schemeService = await prisma.schemeService.findFirst({
        where: {
          id: serviceId,
          status: "published",
        },
        include: {
          admin: {
            select: { name: true },
          },
          contacts: true,
          documents: true,
        },
      });

      if (!schemeService) {
        return res.status(404).json({ error: "Scheme service not found" });
      }

      res.json({ schemeService });
    } catch (error) {
      console.error("Get public scheme service error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
);

export default router;
