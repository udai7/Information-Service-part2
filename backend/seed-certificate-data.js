const { PrismaClient } = require("./generated/prisma");

const prisma = new PrismaClient();

async function main() {
  try {
    console.log("🌱 Seeding certificate application-specific data...");

    // Get the first certificate service (assuming it exists)
    const certificateService = await prisma.certificateService.findFirst({
      where: { isActive: true },
    });

    if (!certificateService) {
      console.log(
        "❌ No active certificate service found. Please create a certificate service first.",
      );
      return;
    }

    console.log(
      `📜 Found certificate service: ${certificateService.name} (ID: ${certificateService.id})`,
    );

    // Application types to seed
    const applicationTypes = [
      "Update/Renewal",
      "Lost Certificate",
      "Surrender Certificate",
    ];

    for (const appType of applicationTypes) {
      console.log(`\n🔄 Adding data for: ${appType}`);

      // Add Process Steps
      const processSteps = getProcessSteps(appType);
      for (const step of processSteps) {
        await prisma.certificateProcessStep.create({
          data: {
            ...step,
            applicationType: appType,
            certificateServiceId: certificateService.id,
          },
        });
      }
      console.log(`  ✅ Added ${processSteps.length} process steps`);

      // Add Required Documents
      const documents = getRequiredDocuments(appType);
      for (const doc of documents) {
        await prisma.certificateDocument.create({
          data: {
            ...doc,
            applicationType: appType,
            certificateServiceId: certificateService.id,
          },
        });
      }
      console.log(`  ✅ Added ${documents.length} required documents`);

      // Add Eligibility Criteria
      const eligibilityItems = getEligibilityCriteria(appType);
      for (const item of eligibilityItems) {
        await prisma.certificateEligibility.create({
          data: {
            ...item,
            applicationType: appType,
            certificateServiceId: certificateService.id,
          },
        });
      }
      console.log(`  ✅ Added ${eligibilityItems.length} eligibility criteria`);

      // Add Contact Information
      const contacts = getContactInformation(appType);
      for (const contact of contacts) {
        await prisma.certificateContact.create({
          data: {
            ...contact,
            applicationType: appType,
            certificateServiceId: certificateService.id,
          },
        });
      }
      console.log(`  ✅ Added ${contacts.length} contact information`);
    }

    console.log("\n🎉 Certificate data seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error seeding data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

function getProcessSteps(appType) {
  switch (appType) {
    case "Update/Renewal":
      return [
        {
          slNo: 1,
          stepDetails: "Submit renewal application with existing certificate",
        },
        {
          slNo: 2,
          stepDetails: "Verify current certificate status and validity",
        },
        { slNo: 3, stepDetails: "Pay renewal fees as applicable" },
        { slNo: 4, stepDetails: "Document verification and processing" },
        { slNo: 5, stepDetails: "Issue updated/renewed certificate" },
      ];

    case "Lost Certificate":
      return [
        { slNo: 1, stepDetails: "File police complaint for lost certificate" },
        { slNo: 2, stepDetails: "Submit lost certificate application form" },
        { slNo: 3, stepDetails: "Provide identity verification documents" },
        { slNo: 4, stepDetails: "Pay duplicate certificate fees" },
        {
          slNo: 5,
          stepDetails: "Verification and duplicate certificate issuance",
        },
      ];

    case "Surrender Certificate":
      return [
        { slNo: 1, stepDetails: "Submit certificate surrender application" },
        {
          slNo: 2,
          stepDetails: "Provide original certificate for cancellation",
        },
        { slNo: 3, stepDetails: "Submit reason for surrender" },
        { slNo: 4, stepDetails: "Verification and processing" },
        { slNo: 5, stepDetails: "Issue surrender acknowledgment receipt" },
      ];

    default:
      return [];
  }
}

function getRequiredDocuments(appType) {
  switch (appType) {
    case "Update/Renewal":
      return [
        {
          slNo: 1,
          documentType: "Original Certificate",
          validProof: "Current valid certificate",
          isRequired: true,
        },
        {
          slNo: 2,
          documentType: "Identity Proof",
          validProof: "Aadhar Card, Voter ID, Passport",
          isRequired: true,
        },
        {
          slNo: 3,
          documentType: "Address Proof",
          validProof: "Utility bill, Bank statement",
          isRequired: true,
        },
        {
          slNo: 4,
          documentType: "Recent Photograph",
          validProof: "Passport size photo",
          isRequired: true,
        },
        {
          slNo: 5,
          documentType: "Fee Receipt",
          validProof: "Payment confirmation",
          isRequired: false,
        },
      ];

    case "Lost Certificate":
      return [
        {
          slNo: 1,
          documentType: "Police Complaint Copy",
          validProof: "FIR or complaint receipt",
          isRequired: true,
        },
        {
          slNo: 2,
          documentType: "Identity Proof",
          validProof: "Aadhar Card, Voter ID, Passport",
          isRequired: true,
        },
        {
          slNo: 3,
          documentType: "Address Proof",
          validProof: "Utility bill, Bank statement",
          isRequired: true,
        },
        {
          slNo: 4,
          documentType: "Affidavit",
          validProof: "Notarized affidavit for lost certificate",
          isRequired: true,
        },
        {
          slNo: 5,
          documentType: "Certificate Copy",
          validProof: "Photocopy if available",
          isRequired: false,
        },
      ];

    case "Surrender Certificate":
      return [
        {
          slNo: 1,
          documentType: "Original Certificate",
          validProof: "Certificate to be surrendered",
          isRequired: true,
        },
        {
          slNo: 2,
          documentType: "Identity Proof",
          validProof: "Aadhar Card, Voter ID, Passport",
          isRequired: true,
        },
        {
          slNo: 3,
          documentType: "Surrender Application",
          validProof: "Duly filled surrender form",
          isRequired: true,
        },
        {
          slNo: 4,
          documentType: "Reason Statement",
          validProof: "Written reason for surrender",
          isRequired: true,
        },
      ];

    default:
      return [];
  }
}

function getEligibilityCriteria(appType) {
  switch (appType) {
    case "Update/Renewal":
      return [
        { eligibilityDetail: "Must be the original certificate holder" },
        {
          eligibilityDetail: "Certificate should be valid or recently expired",
        },
        { eligibilityDetail: "Age 18+ years at time of renewal" },
        {
          eligibilityDetail:
            "No pending legal issues related to the certificate",
        },
      ];

    case "Lost Certificate":
      return [
        { eligibilityDetail: "Must be the original certificate holder" },
        { eligibilityDetail: "Age 18+ years" },
        {
          eligibilityDetail:
            "Police complaint must be filed for lost certificate",
        },
        { eligibilityDetail: "Valid identity and address proof required" },
      ];

    case "Surrender Certificate":
      return [
        { eligibilityDetail: "Must be the certificate holder" },
        { eligibilityDetail: "Age 18+ years" },
        { eligibilityDetail: "Valid reason for surrender required" },
        { eligibilityDetail: "Original certificate must be submitted" },
      ];

    default:
      return [];
  }
}

function getContactInformation(appType) {
  switch (appType) {
    case "Update/Renewal":
      return [
        {
          serviceName: "certificate",
          district: "Central District",
          subDistrict: "Renewal Division",
          block: "Block A",
          name: "Renewal Officer",
          designation: "Certificate Renewal Specialist",
          contact: "08798421603",
          email: "renewal@gov.in",
        },
        {
          serviceName: "certificate",
          district: "Central District",
          subDistrict: "Renewal Division",
          block: "Block B",
          name: "Update Supervisor",
          designation: "Senior Renewal Officer",
          contact: "08798421604",
          email: "updates@gov.in",
        },
      ];

    case "Lost Certificate":
      return [
        {
          serviceName: "certificate",
          district: "Central District",
          subDistrict: "Lost Documents Division",
          block: "Block C",
          name: "Lost Certificate Officer",
          designation: "Duplicate Certificate Specialist",
          contact: "08798421605",
          email: "lostcert@gov.in",
        },
        {
          serviceName: "certificate",
          district: "Central District",
          subDistrict: "Lost Documents Division",
          block: "Block D",
          name: "Verification Officer",
          designation: "Document Verification Head",
          contact: "08798421606",
          email: "verification@gov.in",
        },
      ];

    case "Surrender Certificate":
      return [
        {
          serviceName: "certificate",
          district: "Central District",
          subDistrict: "Surrender Division",
          block: "Block E",
          name: "Surrender Officer",
          designation: "Certificate Surrender Specialist",
          contact: "08798421607",
          email: "surrender@gov.in",
        },
      ];

    default:
      return [];
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
