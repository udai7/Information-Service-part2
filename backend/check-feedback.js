const { PrismaClient } = require("./generated/prisma");

const prisma = new PrismaClient();

async function checkFeedbacks() {
  try {
    console.log("🔍 Checking feedback data in database...");

    // Get all feedbacks
    const allFeedbacks = await prisma.feedback.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    console.log(`📊 Total feedbacks in database: ${allFeedbacks.length}`);

    if (allFeedbacks.length > 0) {
      console.log("\n📋 Recent feedbacks:");
      allFeedbacks.forEach((feedback, index) => {
        console.log(`\n${index + 1}. ID: ${feedback.id}`);
        console.log(`   Name: ${feedback.name}`);
        console.log(`   Email: ${feedback.email}`);
        console.log(`   Phone: ${feedback.phone}`);
        console.log(`   Rating: ${feedback.rating}`);
        console.log(`   Comment: ${feedback.comment}`);
        console.log(`   Service Type: ${feedback.serviceType}`);
        console.log(`   Source: ${feedback.source}`);
        console.log(`   Status: ${feedback.status}`);
        console.log(`   Created: ${feedback.createdAt}`);
      });
    } else {
      console.log("❌ No feedbacks found in database");
    }

    // Check specifically for WhatsApp feedbacks
    const whatsappFeedbacks = await prisma.feedback.findMany({
      where: {
        source: "whatsapp",
      },
    });

    console.log(`\n📱 WhatsApp feedbacks: ${whatsappFeedbacks.length}`);

    // Check for feedbacks with specific comment
    const specificFeedback = await prisma.feedback.findMany({
      where: {
        comment: {
          contains: "adwahjdawhdjkahdjkhadkjh",
        },
      },
    });

    console.log(
      `\n🔍 Feedbacks with specific comment: ${specificFeedback.length}`,
    );
    if (specificFeedback.length > 0) {
      specificFeedback.forEach((fb) => {
        console.log(
          `   Found: ${fb.comment} (ID: ${fb.id}, Status: ${fb.status})`,
        );
      });
    }
  } catch (error) {
    console.error("❌ Error checking feedbacks:", error);
  } finally {
    await prisma.$disconnect();
  }
}

checkFeedbacks();
