import { prisma } from "../lib/prisma";

interface AuditLogEntry {
  action: string;
  entity: string;
  entityId?: number;
  details?: any;
  adminId?: number;
  ipAddress?: string;
  userAgent?: string;
}

export const createAuditLog = async (entry: AuditLogEntry): Promise<void> => {
  try {
    await prisma.auditLog.create({
      data: {
        action: entry.action,
        entity: entry.entity,
        entityId: entry.entityId,
        details: entry.details || {},
        adminId: entry.adminId,
        ipAddress: entry.ipAddress,
        userAgent: entry.userAgent,
      },
    });
  } catch (error) {
    // Don't let audit logging failures break the main flow
    console.error("Audit log creation failed:", error);
  }
};

export const AuditActions = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  LOGIN_FAILED: "LOGIN_FAILED",
  REGISTER: "REGISTER",
  CREATE: "CREATE",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
  PUBLISH: "PUBLISH",
  TOGGLE_ACTIVE: "TOGGLE_ACTIVE",
  ASSIGN: "ASSIGN",
  ESCALATE: "ESCALATE",
  STATUS_CHANGE: "STATUS_CHANGE",
  PASSWORD_CHANGE: "PASSWORD_CHANGE",
} as const;
