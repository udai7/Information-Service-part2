import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { PrismaClient } from "@prisma/client";

// Import routes
import adminAuthRoutes from "./routes/adminAuth";
import schemeServiceRoutes from "./routes/schemeService";
import certificateServiceRoutes from "./routes/certificateService";
import contactServiceRoutes from "./routes/contactService";
import officeManagementRoutes from "./routes/officeManagement";
import feedbackRoutes from "./routes/feedback";
import grievanceRoutes from "./routes/grievance";

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:8080",
      "http://localhost:8081",
      "http://localhost:3000",
    ],
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  next();
});

// Routes
app.use("/api/auth", adminAuthRoutes);
app.use("/api/scheme-services", schemeServiceRoutes);
app.use("/api/certificate-services", certificateServiceRoutes);
app.use("/api/contact-services", contactServiceRoutes);
app.use("/api/offices", officeManagementRoutes);
app.use("/api/feedbacks", feedbackRoutes);
app.use("/api/grievances", grievanceRoutes);
app.use("/api/feedbacks", feedbackRoutes);
app.use("/api/grievances", grievanceRoutes);

app.get("/api/test", (req, res) => {
  res.json({ status: "OK", message: "Test route working" });
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

// Serve static files from the React app build directory
const clientBuildPath = path.join(__dirname, "../dist/spa");
app.use(express.static(clientBuildPath));

// Error handling middleware
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    console.error(err.stack);
    res.status(500).json({
      error: "Something went wrong!",
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Internal server error",
    });
  },
);

// Catch-all handler: send back React's index.html file for any non-API routes
app.get("*", (req, res) => {
  // Don't serve index.html for API routes
  if (req.path.startsWith("/api/")) {
    res.status(404).json({ error: "API route not found" });
    return;
  }

  const indexPath = path.join(clientBuildPath, "index.html");
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error("Error serving index.html:", err);
      res.status(500).json({ error: "Failed to serve application" });
    }
  });
});

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("Shutting down gracefully...");
  await prisma.$disconnect();
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export { prisma };
export default app;
