const { PrismaClient } = require("@prisma/client");

async function checkData() {
  const prisma = new PrismaClient();

  try {
    await prisma.$connect();
    console.log("✅ Database connected successfully!");

    // Check contact services
    const contactServices = await prisma.contactService.findMany({
      include: {
        contacts: true,
      },
    });
    console.log("\n📋 Contact Services:");
    contactServices.forEach((service) => {
      console.log(
        `- ${service.name} (${service.status}) - ${service.contacts.length} contacts`,
      );
      service.contacts.forEach((contact) => {
        console.log(`  📍 ${contact.name} (${contact.designation})`);
      });
    });

    // Check scheme services
    const schemeServices = await prisma.schemeService.findMany();
    console.log("\n🎯 Scheme Services:");
    schemeServices.forEach((service) => {
      console.log(
        `- ${service.name} (${service.status}) - Active: ${service.isActive}`,
      );
    });

    // Check certificate services
    const certificateServices = await prisma.certificateService.findMany();
    console.log("\n📜 Certificate Services:");
    certificateServices.forEach((service) => {
      console.log(
        `- ${service.name} (${service.status}) - Active: ${service.isActive}`,
      );
    });

    // Check posts
    const posts = await prisma.post.findMany({
      include: {
        employees: true,
        office: true,
      },
    });
    console.log("\n🏢 Posts:");
    posts.forEach((post) => {
      console.log(
        `- ${post.postName} at office ${post.office?.name || "Unknown"} - ${
          post.employees.length
        } employees`,
      );
    });

    // Check employees
    const employees = await prisma.employee.findMany();
    console.log(`\n👥 Total Employees: ${employees.length}`);

    await prisma.$disconnect();
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

checkData();
