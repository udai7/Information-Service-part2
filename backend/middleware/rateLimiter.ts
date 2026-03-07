import rateLimit from "express-rate-limit";

// Global rate limiter: 100 requests per minute per IP
export const globalLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many requests, please try again later.",
  },
});

// Auth rate limiter: 5 login attempts per 15 minutes per IP
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many login attempts. Please try again after 15 minutes.",
  },
  skipSuccessfulRequests: true,
});

// Public submission rate limiter: 10 submissions per hour per IP
export const submissionLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many submissions. Please try again later.",
  },
});

// Registration rate limiter: 3 per hour per IP (SuperAdmin only anyway)
export const registrationLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many registration attempts. Please try again later.",
  },
});
