-- AlterTable
ALTER TABLE "public"."CertificateService" ADD COLUMN     "applicationProcess" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "requiredDocuments" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "public"."Feedback" ADD COLUMN     "comment" TEXT,
ADD COLUMN     "serviceType" TEXT,
ADD COLUMN     "source" TEXT NOT NULL DEFAULT 'web',
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "subject" SET DEFAULT 'General Feedback',
ALTER COLUMN "message" SET DEFAULT '';

-- AlterTable
ALTER TABLE "public"."Grievance" ADD COLUMN     "department" TEXT,
ADD COLUMN     "source" TEXT NOT NULL DEFAULT 'web';

-- AlterTable
ALTER TABLE "public"."SchemeService" ADD COLUMN     "applicationProcess" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "benefitDetails" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "requiredDocuments" TEXT[] DEFAULT ARRAY[]::TEXT[];
