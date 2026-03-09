import multer from "multer";
import path from "path";
import crypto from "crypto";
import sharp from "sharp";
import fs from "fs";
import os from "os";

// ─── Oracle OCI PAR (Pre-Authenticated Request) Configuration ───
// The PAR URL should end with /o/ e.g.:
// https://objectstorage.<region>.oraclecloud.com/p/<par-token>/n/<namespace>/b/<bucket>/o/
const OCI_PAR_URL = process.env.OCI_PAR_URL;

if (!OCI_PAR_URL) {
  console.warn(
    "⚠ WARNING: OCI_PAR_URL is not set. File uploads will fail. " +
    "Set this to your Oracle OCI Pre-Authenticated Request URL.",
  );
}

// ─── Helpers ───

// Generate a secure random filename
const generateFilename = (originalName: string): string => {
  const ext = path.extname(originalName).toLowerCase();
  const hash = crypto.randomBytes(16).toString("hex");
  const timestamp = Date.now();
  return `${timestamp}-${hash}${ext}`;
};

// Upload a buffer to OCI Object Storage via PAR PUT
const uploadToOCI = async (
  buffer: Buffer,
  objectName: string,
  contentType: string,
): Promise<string> => {
  if (!OCI_PAR_URL) {
    throw new Error("OCI_PAR_URL environment variable is not configured");
  }

  // Ensure base URL ends with /
  const baseUrl = OCI_PAR_URL.endsWith("/") ? OCI_PAR_URL : `${OCI_PAR_URL}/`;
  const url = `${baseUrl}${objectName}`;

  const response = await fetch(url, {
    method: "PUT",
    body: new Uint8Array(buffer),
    headers: {
      "Content-Length": buffer.length.toString(),
      "Content-Type": contentType,
    },
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "Unknown error");
    throw new Error(`OCI upload failed (${response.status}): ${errorText}`);
  }

  return url;
};

// ─── Multer Middleware (memory storage for both — buffers go to OCI) ───

export const pdfUpload = multer({
  storage: multer.diskStorage({
    destination: os.tmpdir(),
    filename: (_req, file, cb) => {
      cb(null, generateFilename(file.originalname));
    }
  }),
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

export const imageUpload = multer({
  storage: multer.diskStorage({
    destination: os.tmpdir(),
    filename: (_req, file, cb) => {
      cb(null, generateFilename(file.originalname));
    }
  }),
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

// ─── Upload Functions (OCI Object Storage) ───

/**
 * Upload a PDF file to OCI Object Storage.
 * @returns The full OCI URL of the uploaded PDF.
 */
export const uploadPDFToOCI = async (
  file: Express.Multer.File,
): Promise<string> => {
  const filename = path.basename(file.path);
  const objectName = `pdfs/${filename}`;

  try {
    const fileBuffer = await fs.promises.readFile(file.path);
    if (!fileBuffer || fileBuffer.length === 0) {
      throw new Error("PDF file buffer is empty");
    }

    return await uploadToOCI(fileBuffer, objectName, "application/pdf");
  } finally {
    // Always cleanup the temporary file
    try {
      if (fs.existsSync(file.path)) {
        await fs.promises.unlink(file.path);
      }
    } catch (cleanupErr) {
      console.error(`Failed to cleanup temp file ${file.path}:`, cleanupErr);
    }
  }
};

/**
 * Process (resize + compress to WebP) and upload an image to OCI Object Storage.
 * @returns The full OCI URL of the uploaded image.
 */
export const uploadImageToOCI = async (
  file: Express.Multer.File,
): Promise<string> => {
  const originalName = file.originalname;
  const filename = generateFilename(
    originalName.replace(/\.[^.]+$/, ".webp"),
  );
  const objectName = `images/${filename}`;

  try {
    const processedBuffer = await sharp(file.path)
      .resize(800, 800, {
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: 75 })
      .toBuffer();

    return await uploadToOCI(processedBuffer, objectName, "image/webp");
  } finally {
    // Always cleanup the temporary file
    try {
      if (fs.existsSync(file.path)) {
        await fs.promises.unlink(file.path);
      }
    } catch (cleanupErr) {
      console.error(`Failed to cleanup temp file ${file.path}:`, cleanupErr);
    }
  }
};

/**
 * Delete an object from OCI Object Storage via its full URL.
 */
export const deleteFromOCI = async (objectUrl: string): Promise<void> => {
  try {
    const response = await fetch(objectUrl, { method: "DELETE" });
    if (!response.ok && response.status !== 404) {
      console.error(
        `Failed to delete object from OCI (${response.status}): ${objectUrl}`,
      );
    }
  } catch (error) {
    console.error("Error deleting from OCI:", error);
  }
};
