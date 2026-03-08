import multer from "multer";
import path from "path";
import crypto from "crypto";
import sharp from "sharp";
import fs from "fs";

const UPLOAD_DIR = path.join(__dirname, "..", "uploads");
const PDF_DIR = path.join(UPLOAD_DIR, "pdfs");
const IMAGE_DIR = path.join(UPLOAD_DIR, "images");

// Ensure upload directories exist
[PDF_DIR, IMAGE_DIR].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Generate a secure random filename
const generateFilename = (originalName: string): string => {
  const ext = path.extname(originalName).toLowerCase();
  const hash = crypto.randomBytes(16).toString("hex");
  return `${hash}${ext}`;
};

// PDF upload configuration
const pdfStorage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, PDF_DIR),
  filename: (_req, file, cb) => cb(null, generateFilename(file.originalname)),
});

export const pdfUpload = multer({
  storage: pdfStorage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max
    files: 1,
  },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      cb(new Error("Only PDF files are allowed"));
      return;
    }
    cb(null, true);
  },
});

// Image upload configuration (initially stored in memory for processing)
const imageMemoryStorage = multer.memoryStorage();

export const imageUpload = multer({
  storage: imageMemoryStorage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max
    files: 1,
  },
  fileFilter: (_req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.mimetype)) {
      cb(new Error("Only JPEG, PNG, or WebP images are allowed"));
      return;
    }
    cb(null, true);
  },
});

// Process and compress image, return the saved filename
export const processAndSaveImage = async (
  buffer: Buffer,
  originalName: string,
): Promise<string> => {
  const filename = generateFilename(
    originalName.replace(/\.[^.]+$/, ".webp"),
  );
  const outputPath = path.join(IMAGE_DIR, filename);

  await sharp(buffer)
    .resize(800, 800, {
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: 75 })
    .toFile(outputPath);

  return filename;
};

// Delete a file from uploads
export const deleteUploadedFile = (
  filename: string,
  type: "pdf" | "image",
): void => {
  const dir = type === "pdf" ? PDF_DIR : IMAGE_DIR;
  const filePath = path.join(dir, filename);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

export { PDF_DIR, IMAGE_DIR, UPLOAD_DIR };
