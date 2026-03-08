import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import { prisma, queryCache } from "./lib/prisma";

// Import middleware
import { globalLimiter, apiLimiter } from "./middleware/rateLimiter";
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

// ─── Performance: Response Compression ───
app.use(
  compression({
    level: 6, // Balanced speed vs compression ratio
    threshold: 1024, // Only compress responses > 1KB
    filter: (req, res) => {
      if (req.headers["x-no-compression"]) return false;
      return compression.filter(req, res);
    },
  }),
);

// ─── Security Middleware ───
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        imgSrc: ["'self'", "data:", "https:"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        connectSrc: ["'self'"],
      },
    },
    crossOriginEmbedderPolicy: false,
    // Additional security headers
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
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
      // In production, reject requests with no origin
      if (!origin) {
        if (process.env.NODE_ENV === "production") {
          return callback(new Error("Origin required"));
        }
        return callback(null, true);
      }
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    maxAge: 86400, // Pre-flight cache: 24 hours
  }),
);

// ─── Body Parsing (with size limits for security) ───
app.use(express.json({ limit: "500kb" }));
app.use(express.urlencoded({ extended: true, limit: "500kb" }));
app.use(cookieParser());

// ─── Rate Limiting ───
app.use("/api/", globalLimiter);

// ─── Input Sanitization ───
app.use(sanitizeInput);

// ─── Performance: ETag support for conditional requests ───
app.set("etag", "strong");

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

// ─── Health Check (with cache headers) ───
app.get("/api/health", (_req, res) => {
  res.set("Cache-Control", "no-cache");
  res.json({ status: "OK", message: "Server is running", timestamp: new Date().toISOString() });
});

// ─── Serve Uploads (PDFs and images) ───
const uploadsPath = path.join(__dirname, "uploads");
app.use("/uploads", express.static(uploadsPath, {
  maxAge: "7d",
  etag: true,
}));

// ─── Serve Frontend ───
const clientBuildPath = path.join(__dirname, "../dist/spa");
app.use(express.static(clientBuildPath, {
  maxAge: "1y",
  immutable: true,
  etag: true,
}));

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
const gracefulShutdown = async (signal: string) => {
  console.log(`${signal} received, shutting down gracefully...`);
  queryCache.destroy();
  await prisma.$disconnect();
  process.exit(0);
};

process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

// ─── Periodic Session Cleanup (every 6 hours) ───
setInterval(async () => {
  try {
    const result = await prisma.session.deleteMany({
      where: {
        OR: [
          { expiresAt: { lt: new Date() } },
          { isActive: false },
        ],
      },
    });
    if (result.count > 0) {
      console.log(`Cleaned up ${result.count} expired/inactive sessions`);
    }
  } catch (e) {
    console.error("Session cleanup error:", e);
  }
}, 6 * 60 * 60 * 1000);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});

export { prisma };
export default app;
