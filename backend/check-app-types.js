const { PrismaClient } = require("./generated/prisma");
const prisma = new PrismaClient();

async function checkApplicationTypes() {
  try {
    console.log("=== Checking Certificate Application Types ===\n");

    // Get all unique application types from each table
    const processSteps = await prisma.certificateProcessStep.findMany({
      select: { applicationType: true },
      distinct: ["applicationType"],
    });

    const documents = await prisma.certificateDocument.findMany({
      select: { applicationType: true },
      distinct: ["applicationType"],
    });

    const eligibility = await prisma.certificateEligibility.findMany({
      select: { applicationType: true },
      distinct: ["applicationType"],
    });

    const contacts = await prisma.certificateContact.findMany({
      select: { applicationType: true },
      distinct: ["applicationType"],
    });

    console.log("Process Steps Application Types:");
    processSteps.forEach((p) => console.log(`  - "${p.applicationType}"`));

    console.log("\nDocuments Application Types:");
    documents.forEach((d) => console.log(`  - "${d.applicationType}"`));

    console.log("\nEligibility Application Types:");
    eligibility.forEach((e) => console.log(`  - "${e.applicationType}"`));

    console.log("\nContacts Application Types:");
    contacts.forEach((c) => console.log(`  - "${c.applicationType}"`));

    // Also get a sample of actual data
    console.log("\n=== Sample Data ===");

    const sampleProcessSteps = await prisma.certificateProcessStep.findMany({
      take: 3,
      select: { applicationType: true, stepDetails: true },
    });

    console.log("\nSample Process Steps:");
    sampleProcessSteps.forEach((s) =>
      console.log(`  "${s.applicationType}": ${s.stepDetails}`),
    );
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

checkApplicationTypes();
