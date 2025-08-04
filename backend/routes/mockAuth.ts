import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Simple auth route without database
const router = express.Router();

// Mock data storage (in production this would be database)
const admins: any[] = [];

// Simple register admin
router.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check if admin already exists
    const existingAdmin = admins.find((admin) => admin.email === email);

    if (existingAdmin) {
      return res.status(400).json({ error: "Admin already exists" });
    }

    // Create admin (without real hashing for simplicity)
    const admin = {
      id: admins.length + 1,
      email,
      password, // In production, this would be hashed
      name,
      createdAt: new Date(),
    };

    admins.push(admin);

    res.status(201).json({
      message: "Admin registered successfully",
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Simple login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find admin
    const admin = admins.find((a) => a.email === email);

    if (!admin || admin.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.json({
      message: "Login successful",
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all admins (for testing)
router.get("/list", (req, res) => {
  res.json({
    admins: admins.map((admin) => ({
      id: admin.id,
      email: admin.email,
      name: admin.name,
    })),
  });
});

export default router;
