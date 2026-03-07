/*
  Warnings:

  - You are about to drop the column `department` on the `Grievance` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Admin" ADD COLUMN     "departmentId" INTEGER,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "lastLogin" TIMESTAMP(3),
ADD COLUMN     "lockedUntil" TIMESTAMP(3),
ADD COLUMN     "loginAttempts" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "phone" TEXT,
ALTER COLUMN "role" SET DEFAULT 'department_admin';

-- AlterTable
ALTER TABLE "public"."CertificateService" ADD COLUMN     "departmentId" INTEGER;

-- AlterTable
ALTER TABLE "public"."ContactService" ADD COLUMN     "departmentId" INTEGER;

-- AlterTable
ALTER TABLE "public"."Feedback" ADD COLUMN     "departmentId" INTEGER;

-- AlterTable
ALTER TABLE "public"."Grievance" DROP COLUMN "department",
ADD COLUMN     "departmentId" INTEGER,
ADD COLUMN     "escalatedAt" TIMESTAMP(3),
ADD COLUMN     "escalatedTo" TEXT,
ADD COLUMN     "responseCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "slaDeadline" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "public"."SchemeService" ADD COLUMN     "departmentId" INTEGER;

-- CreateTable
CREATE TABLE "public"."Department" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT,
    "contactEmail" TEXT,
    "contactPhone" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AuditLog" (
    "id" SERIAL NOT NULL,
    "action" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "entityId" INTEGER,
    "details" JSONB,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "adminId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Session" (
    "id" TEXT NOT NULL,
    "adminId" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Notification" (
    "id" SERIAL NOT NULL,
    "adminId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "link" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."GrievanceActivity" (
    "id" SERIAL NOT NULL,
    "grievanceId" INTEGER NOT NULL,
    "action" TEXT NOT NULL,
    "fromValue" TEXT,
    "toValue" TEXT,
    "note" TEXT,
    "performedBy" TEXT,
    "adminId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GrievanceActivity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Department_name_key" ON "public"."Department"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Department_code_key" ON "public"."Department"("code");

-- CreateIndex
CREATE INDEX "AuditLog_adminId_idx" ON "public"."AuditLog"("adminId");

-- CreateIndex
CREATE INDEX "AuditLog_entity_entityId_idx" ON "public"."AuditLog"("entity", "entityId");

-- CreateIndex
CREATE INDEX "AuditLog_createdAt_idx" ON "public"."AuditLog"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Session_token_key" ON "public"."Session"("token");

-- CreateIndex
CREATE INDEX "Session_adminId_idx" ON "public"."Session"("adminId");

-- CreateIndex
CREATE INDEX "Session_token_idx" ON "public"."Session"("token");

-- CreateIndex
CREATE INDEX "Session_expiresAt_idx" ON "public"."Session"("expiresAt");

-- CreateIndex
CREATE INDEX "Notification_adminId_isRead_idx" ON "public"."Notification"("adminId", "isRead");

-- CreateIndex
CREATE INDEX "GrievanceActivity_grievanceId_idx" ON "public"."GrievanceActivity"("grievanceId");

-- CreateIndex
CREATE INDEX "Admin_email_idx" ON "public"."Admin"("email");

-- CreateIndex
CREATE INDEX "Admin_role_idx" ON "public"."Admin"("role");

-- CreateIndex
CREATE INDEX "Admin_departmentId_idx" ON "public"."Admin"("departmentId");

-- CreateIndex
CREATE INDEX "CertificateService_status_isActive_idx" ON "public"."CertificateService"("status", "isActive");

-- CreateIndex
CREATE INDEX "CertificateService_departmentId_status_idx" ON "public"."CertificateService"("departmentId", "status");

-- CreateIndex
CREATE INDEX "CertificateService_createdAt_idx" ON "public"."CertificateService"("createdAt");

-- CreateIndex
CREATE INDEX "ContactService_status_isActive_idx" ON "public"."ContactService"("status", "isActive");

-- CreateIndex
CREATE INDEX "ContactService_departmentId_status_idx" ON "public"."ContactService"("departmentId", "status");

-- CreateIndex
CREATE INDEX "ContactService_createdAt_idx" ON "public"."ContactService"("createdAt");

-- CreateIndex
CREATE INDEX "Feedback_status_departmentId_idx" ON "public"."Feedback"("status", "departmentId");

-- CreateIndex
CREATE INDEX "Feedback_createdAt_idx" ON "public"."Feedback"("createdAt");

-- CreateIndex
CREATE INDEX "Feedback_email_idx" ON "public"."Feedback"("email");

-- CreateIndex
CREATE INDEX "Grievance_status_departmentId_idx" ON "public"."Grievance"("status", "departmentId");

-- CreateIndex
CREATE INDEX "Grievance_createdAt_idx" ON "public"."Grievance"("createdAt");

-- CreateIndex
CREATE INDEX "Grievance_trackingId_idx" ON "public"."Grievance"("trackingId");

-- CreateIndex
CREATE INDEX "Grievance_email_idx" ON "public"."Grievance"("email");

-- CreateIndex
CREATE INDEX "Grievance_priority_status_idx" ON "public"."Grievance"("priority", "status");

-- CreateIndex
CREATE INDEX "SchemeService_status_isActive_idx" ON "public"."SchemeService"("status", "isActive");

-- CreateIndex
CREATE INDEX "SchemeService_departmentId_status_idx" ON "public"."SchemeService"("departmentId", "status");

-- CreateIndex
CREATE INDEX "SchemeService_createdAt_idx" ON "public"."SchemeService"("createdAt");

-- AddForeignKey
ALTER TABLE "public"."AuditLog" ADD CONSTRAINT "AuditLog_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "public"."Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Session" ADD CONSTRAINT "Session_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "public"."Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Notification" ADD CONSTRAINT "Notification_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "public"."Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."GrievanceActivity" ADD CONSTRAINT "GrievanceActivity_grievanceId_fkey" FOREIGN KEY ("grievanceId") REFERENCES "public"."Grievance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Admin" ADD CONSTRAINT "Admin_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "public"."Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SchemeService" ADD CONSTRAINT "SchemeService_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "public"."Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CertificateService" ADD CONSTRAINT "CertificateService_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "public"."Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ContactService" ADD CONSTRAINT "ContactService_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "public"."Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Feedback" ADD CONSTRAINT "Feedback_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "public"."Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Grievance" ADD CONSTRAINT "Grievance_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "public"."Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;
