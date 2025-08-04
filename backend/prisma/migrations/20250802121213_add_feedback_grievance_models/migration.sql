-- CreateTable
CREATE TABLE "public"."Admin" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'admin',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SchemeService" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "type" TEXT,
    "targetAudience" TEXT[],
    "applicationMode" TEXT NOT NULL,
    "onlineUrl" TEXT,
    "offlineAddress" TEXT,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "adminId" INTEGER NOT NULL,
    "eligibilityDetails" TEXT[],
    "schemeDetails" TEXT[],
    "processDetails" TEXT[],
    "processNew" TEXT,
    "processUpdate" TEXT,
    "processLost" TEXT,
    "processSurrender" TEXT,
    "docNew" TEXT,
    "docUpdate" TEXT,
    "docLost" TEXT,
    "docSurrender" TEXT,

    CONSTRAINT "SchemeService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ContactPerson" (
    "id" SERIAL NOT NULL,
    "serviceName" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "subDistrict" TEXT NOT NULL,
    "block" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "schemeServiceId" INTEGER NOT NULL,

    CONSTRAINT "ContactPerson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SupportiveDocument" (
    "id" SERIAL NOT NULL,
    "slNo" INTEGER NOT NULL,
    "documentType" TEXT NOT NULL,
    "validProof" TEXT NOT NULL,
    "isRequired" BOOLEAN NOT NULL DEFAULT true,
    "schemeServiceId" INTEGER NOT NULL,

    CONSTRAINT "SupportiveDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CertificateService" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "type" TEXT,
    "targetAudience" TEXT[],
    "applicationMode" TEXT NOT NULL,
    "onlineUrl" TEXT,
    "offlineAddress" TEXT,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "adminId" INTEGER NOT NULL,
    "eligibilityDetails" TEXT[],
    "certificateDetails" TEXT[],
    "processDetails" TEXT[],
    "processNew" TEXT,
    "processUpdate" TEXT,
    "processLost" TEXT,
    "processSurrender" TEXT,
    "docNew" TEXT,
    "docUpdate" TEXT,
    "docLost" TEXT,
    "docSurrender" TEXT,

    CONSTRAINT "CertificateService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CertificateContact" (
    "id" SERIAL NOT NULL,
    "serviceName" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "subDistrict" TEXT NOT NULL,
    "block" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "applicationType" TEXT NOT NULL DEFAULT 'New Application',
    "certificateServiceId" INTEGER NOT NULL,

    CONSTRAINT "CertificateContact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CertificateDocument" (
    "id" SERIAL NOT NULL,
    "slNo" INTEGER NOT NULL,
    "documentType" TEXT NOT NULL,
    "validProof" TEXT NOT NULL,
    "isRequired" BOOLEAN NOT NULL DEFAULT true,
    "applicationType" TEXT NOT NULL DEFAULT 'New Application',
    "certificateServiceId" INTEGER NOT NULL,

    CONSTRAINT "CertificateDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ContactService" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "type" TEXT,
    "targetAudience" TEXT[],
    "applicationMode" TEXT NOT NULL,
    "onlineUrl" TEXT,
    "offlineAddress" TEXT,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "adminId" INTEGER NOT NULL,
    "eligibilityDetails" TEXT[],
    "contactDetails" TEXT[],
    "processDetails" TEXT[],
    "processNew" TEXT,
    "processUpdate" TEXT,
    "processLost" TEXT,
    "processSurrender" TEXT,
    "docNew" TEXT,
    "docUpdate" TEXT,
    "docLost" TEXT,
    "docSurrender" TEXT,

    CONSTRAINT "ContactService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ContactServiceContact" (
    "id" SERIAL NOT NULL,
    "serviceName" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "subDistrict" TEXT NOT NULL,
    "block" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contactServiceId" INTEGER NOT NULL,

    CONSTRAINT "ContactServiceContact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ContactServiceDocument" (
    "id" SERIAL NOT NULL,
    "slNo" INTEGER NOT NULL,
    "documentType" TEXT NOT NULL,
    "validProof" TEXT NOT NULL,
    "isRequired" BOOLEAN NOT NULL DEFAULT true,
    "contactServiceId" INTEGER NOT NULL,

    CONSTRAINT "ContactServiceDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Post" (
    "id" SERIAL NOT NULL,
    "postName" TEXT NOT NULL,
    "rank" TEXT NOT NULL,
    "description" TEXT,
    "department" TEXT,
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "officeId" INTEGER NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Employee" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "employeeId" TEXT,
    "joiningDate" TIMESTAMP(3),
    "salary" DOUBLE PRECISION,
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Feedback" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "rating" INTEGER,
    "category" TEXT,
    "status" TEXT NOT NULL DEFAULT 'new',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "resolvedAt" TIMESTAMP(3),
    "resolvedBy" TEXT,
    "adminNotes" TEXT,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Grievance" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT,
    "priority" TEXT NOT NULL DEFAULT 'medium',
    "status" TEXT NOT NULL DEFAULT 'new',
    "attachments" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "assignedTo" TEXT,
    "adminNotes" TEXT,
    "resolvedAt" TIMESTAMP(3),
    "trackingId" TEXT NOT NULL,

    CONSTRAINT "Grievance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "public"."Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Grievance_trackingId_key" ON "public"."Grievance"("trackingId");

-- AddForeignKey
ALTER TABLE "public"."SchemeService" ADD CONSTRAINT "SchemeService_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "public"."Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ContactPerson" ADD CONSTRAINT "ContactPerson_schemeServiceId_fkey" FOREIGN KEY ("schemeServiceId") REFERENCES "public"."SchemeService"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SupportiveDocument" ADD CONSTRAINT "SupportiveDocument_schemeServiceId_fkey" FOREIGN KEY ("schemeServiceId") REFERENCES "public"."SchemeService"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CertificateService" ADD CONSTRAINT "CertificateService_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "public"."Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CertificateContact" ADD CONSTRAINT "CertificateContact_certificateServiceId_fkey" FOREIGN KEY ("certificateServiceId") REFERENCES "public"."CertificateService"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CertificateDocument" ADD CONSTRAINT "CertificateDocument_certificateServiceId_fkey" FOREIGN KEY ("certificateServiceId") REFERENCES "public"."CertificateService"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ContactService" ADD CONSTRAINT "ContactService_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "public"."Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ContactServiceContact" ADD CONSTRAINT "ContactServiceContact_contactServiceId_fkey" FOREIGN KEY ("contactServiceId") REFERENCES "public"."ContactService"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ContactServiceDocument" ADD CONSTRAINT "ContactServiceDocument_contactServiceId_fkey" FOREIGN KEY ("contactServiceId") REFERENCES "public"."ContactService"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Post" ADD CONSTRAINT "Post_officeId_fkey" FOREIGN KEY ("officeId") REFERENCES "public"."ContactServiceContact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Employee" ADD CONSTRAINT "Employee_postId_fkey" FOREIGN KEY ("postId") REFERENCES "public"."Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
