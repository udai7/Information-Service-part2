import { Router, Response, Request } from "express";
import { body, param, validationResult } from "express-validator";
import { prisma } from "../index";
import { authenticateAdmin } from "./adminAuth";
import "../types/express";

const router = Router();

// GET /api/offices/by-id/:officeId - Get office by id
router.get(
  "/by-id/:officeId",
  authenticateAdmin,
  param("officeId").notEmpty().withMessage("Office id is required"),
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

      const officeId = parseInt(req.params.officeId);

      // Find office by name
      const office = await prisma.contactServiceContact.findFirst({
        where: {
          id: officeId
        },
      });

      if (!office) {
        return res.status(404).json({
          success: false,
          message: "Office not found",
        });
      }

      res.json({
        success: true,
        office,
      });
    } catch (error) {
      console.error("Error fetching office by name:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch office",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },
);

// GET /api/offices/:officeId/posts - Get all posts for an office
router.get(
  "/:officeId/posts",
  authenticateAdmin,
  param("officeId").isInt().withMessage("Office ID must be a valid integer"),
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

      const officeId = parseInt(req.params.officeId);

      // First verify the office exists
      const office = await prisma.contactServiceContact.findUnique({
        where: { id: officeId },
      });

      if (!office) {
        return res.status(404).json({
          success: false,
          message: "Office not found",
        });
      }

      const posts = await prisma.post.findMany({
        where: { officeId },
        include: {
          employees: true,
        },
        orderBy: { createdAt: "desc" },
      });

      res.json({
        success: true,
        posts,
      });
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch posts",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },
);

// POST /api/offices/:officeId/posts - Create a new post
router.post(
  "/:officeId/posts",
  authenticateAdmin,
  [
    param("officeId").isInt().withMessage("Office ID must be a valid integer"),
    body("postName").notEmpty().withMessage("Post name is required"),
    body("rank").notEmpty().withMessage("Rank is required"),
    body("description").optional().isString(),
    body("department").optional().isString(),
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

      const officeId = parseInt(req.params.officeId);
      const { postName, rank, description, department } = req.body;

      // Verify the office exists
      const office = await prisma.contactServiceContact.findUnique({
        where: { id: officeId },
      });

      if (!office) {
        return res.status(404).json({
          success: false,
          message: "Office not found",
        });
      }

      const newPost = await prisma.post.create({
        data: {
          postName,
          rank,
          description,
          department,
          officeId,
        },
        include: {
          employees: true,
        },
      });

      res.status(201).json({
        success: true,
        post: newPost,
        message: "Post created successfully",
      });
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(500).json({
        success: false,
        message: "Failed to create post",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },
);

// POST /api/offices/:officeId/posts/:postId/employees - Add employee to a post
router.post(
  "/:officeId/posts/:postId/employees",
  authenticateAdmin,
  [
    param("officeId").isInt().withMessage("Office ID must be a valid integer"),
    param("postId").isInt().withMessage("Post ID must be a valid integer"),
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("phone").notEmpty().withMessage("Phone is required"),
    body("designation").notEmpty().withMessage("Designation is required"),
    body("employeeId").optional().isString(),
    body("joiningDate")
      .optional()
      .isISO8601()
      .withMessage("Valid date required"),
    body("salary")
      .optional()
      .isFloat({ min: 0 })
      .withMessage("Salary must be a positive number"),
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

      const officeId = parseInt(req.params.officeId);
      const postId = parseInt(req.params.postId);
      const {
        name,
        email,
        phone,
        designation,
        employeeId,
        joiningDate,
        salary,
      } = req.body;

      // Verify the post exists and belongs to the office
      const post = await prisma.post.findFirst({
        where: {
          id: postId,
          officeId: officeId,
        },
      });

      if (!post) {
        return res.status(404).json({
          success: false,
          message: "Post not found in this office",
        });
      }

      const newEmployee = await prisma.employee.create({
        data: {
          name,
          email,
          phone,
          designation,
          employeeId,
          joiningDate: joiningDate ? new Date(joiningDate) : null,
          salary: salary ? parseFloat(salary) : null,
          postId,
        },
      });

      res.status(201).json({
        success: true,
        employee: newEmployee,
        message: "Employee added successfully",
      });
    } catch (error) {
      console.error("Error adding employee:", error);
      res.status(500).json({
        success: false,
        message: "Failed to add employee",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },
);

// PUT /api/offices/:officeId/posts/:postId/employees/:employeeId - Update employee
router.put(
  "/:officeId/posts/:postId/employees/:employeeId",
  authenticateAdmin,
  [
    param("officeId").isInt().withMessage("Office ID must be a valid integer"),
    param("postId").isInt().withMessage("Post ID must be a valid integer"),
    param("employeeId")
      .isInt()
      .withMessage("Employee ID must be a valid integer"),
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("phone").notEmpty().withMessage("Phone is required"),
    body("designation").notEmpty().withMessage("Designation is required"),
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

      const officeId = parseInt(req.params.officeId);
      const postId = parseInt(req.params.postId);
      const employeeId = parseInt(req.params.employeeId);
      const { name, email, phone, designation } = req.body;

      // Verify the employee exists and belongs to the correct post/office
      const employee = await prisma.employee.findFirst({
        where: {
          id: employeeId,
          post: {
            id: postId,
            officeId: officeId,
          },
        },
      });

      if (!employee) {
        return res.status(404).json({
          success: false,
          message: "Employee not found",
        });
      }

      const updatedEmployee = await prisma.employee.update({
        where: { id: employeeId },
        data: {
          name,
          email,
          phone,
          designation,
        },
      });

      res.json({
        success: true,
        employee: updatedEmployee,
        message: "Employee updated successfully",
      });
    } catch (error) {
      console.error("Error updating employee:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update employee",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },
);

// DELETE /api/offices/:officeId/posts/:postId/employees/:employeeId - Delete employee
router.delete(
  "/:officeId/posts/:postId/employees/:employeeId",
  authenticateAdmin,
  [
    param("officeId").isInt().withMessage("Office ID must be a valid integer"),
    param("postId").isInt().withMessage("Post ID must be a valid integer"),
    param("employeeId")
      .isInt()
      .withMessage("Employee ID must be a valid integer"),
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

      const officeId = parseInt(req.params.officeId);
      const postId = parseInt(req.params.postId);
      const employeeId = parseInt(req.params.employeeId);

      // Verify the employee exists and belongs to the correct post/office
      const employee = await prisma.employee.findFirst({
        where: {
          id: employeeId,
          post: {
            id: postId,
            officeId: officeId,
          },
        },
      });

      if (!employee) {
        return res.status(404).json({
          success: false,
          message: "Employee not found",
        });
      }

      await prisma.employee.delete({
        where: { id: employeeId },
      });

      res.json({
        success: true,
        message: "Employee deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting employee:", error);
      res.status(500).json({
        success: false,
        message: "Failed to delete employee",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },
);

// PUBLIC ROUTES (no authentication required for user dashboard)

// GET /api/offices/public/by-name/:officeName - Get office by name (Public)
router.get(
  "/public/by-name/:officeName",
  param("officeName").notEmpty().withMessage("Office name is required"),
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

      const officeName = req.params.officeName;

      // Find office by name
      const office = await prisma.contactServiceContact.findFirst({
        where: {
          name: {
            equals: officeName,
            mode: "insensitive", // Case-insensitive search
          },
        },
      });

      if (!office) {
        return res.status(404).json({
          success: false,
          message: "Office not found",
        });
      }

      res.json({
        success: true,
        office,
      });
    } catch (error) {
      console.error("Error fetching office by name:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch office",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },
);

// GET /api/offices/public/:officeId/posts - Get all posts for an office (Public)
router.get(
  "/public/:officeId/posts",
  param("officeId").isInt().withMessage("Office ID must be a valid integer"),
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

      const officeId = parseInt(req.params.officeId);

      // First verify the office exists
      const office = await prisma.contactServiceContact.findUnique({
        where: { id: officeId },
      });

      if (!office) {
        return res.status(404).json({
          success: false,
          message: "Office not found",
        });
      }

      const posts = await prisma.post.findMany({
        where: { officeId },
        include: {
          employees: true,
        },
        orderBy: { createdAt: "desc" },
      });

      res.json({
        success: true,
        posts,
      });
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch posts",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },
);

export default router;
