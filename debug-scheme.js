import { PrismaClient } from "@prisma/client";

async function checkSchemes() {
  const prisma = new PrismaClient();

  try {
    const schemes = await prisma.schemeService.findMany({
      where: { status: "published" },
      select: {
        id: true,
        name: true,
        type: true,
        summary: true,
        isActive: true,
      },
    });

    console.log("Published Schemes:");
    schemes.forEach((scheme) => {
      console.log(`\n- ID: ${scheme.id}`);
      console.log(`  Name: "${scheme.name}"`);
      console.log(`  Type: "${scheme.type}"`);
      console.log(`  Summary: "${scheme.summary}"`);
      console.log(`  Active: ${scheme.isActive}`);
    });

    // Also check Employment schemes specifically
    console.log("\n=== Employment Schemes Specifically ===");
    const employmentSchemes = await prisma.schemeService.findMany({
      where: {
        status: "published",
        type: "Employment",
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        summary: true,
      },
    });

    employmentSchemes.forEach((scheme) => {
      console.log(`\nEmployment Scheme - ID: ${scheme.id}`);
      console.log(`  Name: "${scheme.name}"`);
      console.log(`  Summary: "${scheme.summary}"`);
    });
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

checkSchemes();
