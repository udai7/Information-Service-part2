import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import { prisma } from "./lib/prisma";

// Import middleware
import { globalLimiter } from "./middleware/rateLimiter";
import { errorHandler, sanitizeInput } from "./middleware/errorHandler";

// Import routes
import adminAuthRoutes from "./routes/adminAuth";
import departmentRoutes from "./routes/departments";
import adminManagementRoutes from "./routes/adminManagement";
import auditLogRoutes from "./routes/auditLogs";
import notificationRoutes from "./routes/notifications";
import schemeServiceRoutes from "./routes/schemeService";
import certificateServiceRoutes from "./routes/certificateService";
import contactServiceRoutes from "./routes/contactService";
import officeManagementRoutes from "./routes/officeManagement";
import feedbackRoutes from "./routes/feedback";
import grievanceRoutes from "./routes/grievance";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// ─── Security Middleware ───
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        imgSrc: ["'self'", "data:", "https:"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        connectSrc: ["'self'"],
      },
    },
    crossOriginEmbedderPolicy: false,
  }),
);

// ─── CORS Configuration ───
const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:5173",
  ...(process.env.NODE_ENV !== "production"
    ? [
        "http://localhost:5174",
        "http://localhost:8080",
        "http://localhost:8081",
        "http://localhost:3000",
      ]
    : []),
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, Postman, etc.)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// ─── Body Parsing ───
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(cookieParser());

// ─── Rate Limiting ───
app.use("/api/", globalLimiter);

// ─── Input Sanitization ───
app.use(sanitizeInput);

// ─── Request Logging (Development Only) ───
if (process.env.NODE_ENV === "development") {
  app.use((req, _res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
}

// ─── API Routes ───
app.use("/api/auth", adminAuthRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/admin", adminManagementRoutes);
app.use("/api/audit-logs", auditLogRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/scheme-services", schemeServiceRoutes);
app.use("/api/certificate-services", certificateServiceRoutes);
app.use("/api/contact-services", contactServiceRoutes);
app.use("/api/offices", officeManagementRoutes);
app.use("/api/feedbacks", feedbackRoutes);
app.use("/api/grievances", grievanceRoutes);

// ─── Health Check ───
app.get("/api/health", (_req, res) => {
  res.json({ status: "OK", message: "Server is running", timestamp: new Date().toISOString() });
});

// ─── Serve Frontend ───
const clientBuildPath = path.join(__dirname, "../dist/spa");
app.use(express.static(clientBuildPath));

// ─── Error Handling ───
app.use(errorHandler);

// ─── SPA Catch-all ───
app.get("*", (req, res) => {
  if (req.path.startsWith("/api/")) {
    return res.status(404).json({ error: "API route not found" });
  }

  const indexPath = path.join(clientBuildPath, "index.html");
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(500).json({ error: "Failed to serve application" });
    }
  });
});

// ─── Graceful Shutdown ───
process.on("SIGINT", async () => {
  console.log("Shutting down gracefully...");
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down...");
  await prisma.$disconnect();
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});

export { prisma };
export default app;
