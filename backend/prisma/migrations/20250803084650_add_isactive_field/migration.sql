-- AlterTable
ALTER TABLE "public"."CertificateService" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "public"."ContactService" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "public"."SchemeService" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;
