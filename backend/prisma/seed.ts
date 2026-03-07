import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  console.log("🌱 Seeding database...\n");

  // ─── Create Default Departments ───
  const departments = [
    { name: "Police Department", code: "POL", description: "Law enforcement, FIR services, safety" },
    { name: "Revenue Department", code: "REV", description: "Land records, tax, registrations" },
    { name: "Health Department", code: "HLT", description: "Hospitals, vaccination, health schemes" },
    { name: "Education Department", code: "EDU", description: "Schools, scholarships, examinations" },
    { name: "Public Works Department", code: "PWD", description: "Roads, buildings, infrastructure" },
    { name: "Agriculture Department", code: "AGR", description: "Farming schemes, subsidies, crop insurance" },
    { name: "Social Welfare", code: "SOC", description: "Pension, disability, SC/ST/OBC welfare" },
    { name: "Water Resources Department", code: "WRD", description: "Water supply, irrigation" },
    { name: "Electricity Department", code: "ELC", description: "Power supply, billing, connections" },
    { name: "Transport Department", code: "TRN", description: "Licenses, vehicle registration, permits" },
  ];

  for (const dept of departments) {
    const existing = await prisma.department.findUnique({ where: { code: dept.code } });
    if (!existing) {
      await prisma.department.create({ data: dept });
      console.log(`  ✅ Created department: ${dept.name} (${dept.code})`);
    } else {
      console.log(`  ⏭️  Department already exists: ${dept.name} (${dept.code})`);
    }
  }

  // ─── Create SuperAdmin ───
  const superAdminEmail = process.env.SUPER_ADMIN_EMAIL || "admin@govservices.in";
  const superAdminPassword = process.env.SUPER_ADMIN_PASSWORD || "Admin@123456";
  const superAdminName = process.env.SUPER_ADMIN_NAME || "Super Admin";

  const existingSuperAdmin = await prisma.admin.findUnique({
    where: { email: superAdminEmail },
  });

  if (!existingSuperAdmin) {
    const hashedPassword = await bcrypt.hash(superAdminPassword, 12);
    const superAdmin = await prisma.admin.create({
      data: {
        email: superAdminEmail,
        password: hashedPassword,
        name: superAdminName,
        role: "super_admin",
        isActive: true,
      },
    });
    console.log(`\n  ✅ Created SuperAdmin:`);
    console.log(`     Email: ${superAdminEmail}`);
    console.log(`     Password: ${superAdminPassword}`);
    console.log(`     ID: ${superAdmin.id}`);
  } else {
    // Ensure existing admin has super_admin role
    if (existingSuperAdmin.role !== "super_admin") {
      await prisma.admin.update({
        where: { id: existingSuperAdmin.id },
        data: { role: "super_admin", isActive: true },
      });
      console.log(`\n  🔄 Updated existing admin to SuperAdmin: ${superAdminEmail}`);
    } else {
      console.log(`\n  ⏭️  SuperAdmin already exists: ${superAdminEmail}`);
    }
  }

  console.log("\n🌱 Seeding complete!\n");
}

seed()
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
