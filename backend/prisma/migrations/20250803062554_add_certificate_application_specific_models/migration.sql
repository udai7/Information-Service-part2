-- CreateTable
CREATE TABLE "public"."CertificateProcessStep" (
    "id" SERIAL NOT NULL,
    "slNo" INTEGER NOT NULL,
    "stepDetails" TEXT NOT NULL,
    "applicationType" TEXT NOT NULL DEFAULT 'New Application',
    "certificateServiceId" INTEGER NOT NULL,

    CONSTRAINT "CertificateProcessStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CertificateEligibility" (
    "id" SERIAL NOT NULL,
    "eligibilityDetail" TEXT NOT NULL,
    "applicationType" TEXT NOT NULL DEFAULT 'New Application',
    "certificateServiceId" INTEGER NOT NULL,

    CONSTRAINT "CertificateEligibility_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."CertificateProcessStep" ADD CONSTRAINT "CertificateProcessStep_certificateServiceId_fkey" FOREIGN KEY ("certificateServiceId") REFERENCES "public"."CertificateService"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CertificateEligibility" ADD CONSTRAINT "CertificateEligibility_certificateServiceId_fkey" FOREIGN KEY ("certificateServiceId") REFERENCES "public"."CertificateService"("id") ON DELETE CASCADE ON UPDATE CASCADE;
