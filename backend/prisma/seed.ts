import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

type DepartmentSeed = {
  name: string;
  code: string;
  description: string;
  contactEmail: string;
  contactPhone: string;
  schemeType: string;
  certificateType: string;
};

const departmentsData: DepartmentSeed[] = [
  {
    name: "Police Department",
    code: "POL",
    description: "Law enforcement, FIR services, citizen safety and emergency response.",
    contactEmail: "contact.police@gov.in",
    contactPhone: "1800-120-0101",
    schemeType: "Central",
    certificateType: "Public Safety",
  },
  {
    name: "Revenue Department",
    code: "REV",
    description: "Land records, tax assessments, registrations and mutations.",
    contactEmail: "contact.revenue@gov.in",
    contactPhone: "1800-120-0102",
    schemeType: "State",
    certificateType: "Revenue",
  },
  {
    name: "Health Department",
    code: "HLT",
    description: "Primary and tertiary healthcare, preventive care, public health programs.",
    contactEmail: "contact.health@gov.in",
    contactPhone: "1800-120-0103",
    schemeType: "Healthcare",
    certificateType: "Medical",
  },
  {
    name: "Education Department",
    code: "EDU",
    description: "School administration, scholarships, examinations and literacy.",
    contactEmail: "contact.education@gov.in",
    contactPhone: "1800-120-0104",
    schemeType: "Education",
    certificateType: "Academic",
  },
  {
    name: "Public Works Department",
    code: "PWD",
    description: "Road and bridge works, building maintenance, civic infrastructure.",
    contactEmail: "contact.pwd@gov.in",
    contactPhone: "1800-120-0105",
    schemeType: "State",
    certificateType: "Infrastructure",
  },
  {
    name: "Agriculture Department",
    code: "AGR",
    description: "Farmer support, crop advisory, irrigation and subsidy delivery.",
    contactEmail: "contact.agri@gov.in",
    contactPhone: "1800-120-0106",
    schemeType: "Agriculture",
    certificateType: "Agricultural",
  },
  {
    name: "Social Welfare",
    code: "SOC",
    description: "Pensions, disability support, social security and inclusion schemes.",
    contactEmail: "contact.social@gov.in",
    contactPhone: "1800-120-0107",
    schemeType: "Social Welfare",
    certificateType: "Welfare",
  },
  {
    name: "Water Resources Department",
    code: "WRD",
    description: "Drinking water supply, irrigation planning and watershed management.",
    contactEmail: "contact.water@gov.in",
    contactPhone: "1800-120-0108",
    schemeType: "State",
    certificateType: "Water Resources",
  },
  {
    name: "Electricity Department",
    code: "ELC",
    description: "Power distribution, metering, billing and new electrical connections.",
    contactEmail: "contact.electricity@gov.in",
    contactPhone: "1800-120-0109",
    schemeType: "Central",
    certificateType: "Electrical",
  },
  {
    name: "Transport Department",
    code: "TRN",
    description: "Licensing, registrations, permits, road transport facilitation.",
    contactEmail: "contact.transport@gov.in",
    contactPhone: "1800-120-0110",
    schemeType: "Employment",
    certificateType: "Transport",
  },
];

function buildSchemeDetails(dept: DepartmentSeed) {
  return {
    name: `${dept.name} Integrated Citizen Assistance Scheme`,
    summary: `A detailed, multi-component assistance scheme by the ${dept.name} focused on service access, subsidies, grievance support, and citizen facilitation through digital and field channels.`,
    type: dept.schemeType,
    targetAudience: [
      "Citizens",
      "Students",
      "Women",
      "Senior Citizens",
      "Persons with Disabilities",
      "Rural Households",
      "Urban Low-Income Families",
    ],
    applicationMode: "both",
    onlineUrl: `https://${dept.code.toLowerCase()}.gov.in/schemes/integrated-assistance`,
    offlineAddress: `${dept.name} Citizen Facilitation Center, State Secretariat Campus`,
    eligibilityDetails: [
      "Applicant must be a permanent resident of the state with a valid domicile certificate.",
      "Family annual income should be within the threshold notified in the latest department circular.",
      "Applicant should not be a duplicate beneficiary of equivalent central or state benefit under the same category.",
      "Valid Aadhaar and mobile number linked with bank account is mandatory for DBT-enabled components.",
      "Priority categories include widows, single mothers, landless workers, and households in notified vulnerable clusters.",
      "Applicants with pending fraud or blacklisting records in departmental systems are ineligible until cleared.",
      "For student-linked benefits, enrollment verification through recognized institutions is required.",
      "For business-linked benefits, valid UDYAM/GST registration should be provided where applicable.",
    ],
    schemeDetails: [
      "Provides direct financial support in quarterly cycles through Aadhaar-enabled DBT.",
      "Includes optional service vouchers redeemable at empaneled centers for priority services.",
      "Supports both online and assisted offline application workflows through district facilitation desks.",
      "Auto-tracks SLA milestones and notifies applicants via SMS/email for each processing stage.",
      "Integrates grievance escalation matrix with department nodal officers for delayed applications.",
      "Offers annual compliance renewal process to maintain beneficiary eligibility continuity.",
      "Maintains audit-ready digital logs for each verification and sanction decision.",
      "Provides district-level dashboard analytics for workload balancing and pendency review.",
    ],
    processDetails: [
      "1. Create applicant profile with eKYC and contact verification.",
      "2. Select benefit category and complete rule-driven application form.",
      "3. Upload mandatory and conditional documents in PDF/JPEG format.",
      "4. Application receives block-level scrutiny and field verification where required.",
      "5. District authority performs sanction check and approves/rejects with reasons.",
      "6. Approved applications are queued for treasury/DBT disbursal cycle.",
      "7. Beneficiary receives sanction order and downloadable acknowledgment.",
      "8. Renewal reminder is generated before annual validity expiry.",
    ],
    benefitDetails: [
      "Quarterly financial assistance between INR 3,000 and INR 15,000 based on category.",
      "Fee reimbursement for selected citizen-facing services capped per policy.",
      "Priority processing window for emergency and vulnerable-category cases.",
      "Access to helpline and assisted service counters without additional facilitation charge.",
      "Eligibility for linked complementary departmental micro-schemes.",
    ],
    applicationProcess: [
      "Profile Creation",
      "Application Drafting",
      "Document Upload",
      "Verification",
      "Approval Workflow",
      "Benefit Disbursal",
      "Post-Sanction Monitoring",
    ],
    requiredDocuments: [
      "Aadhaar Card",
      "Domicile Certificate",
      "Income Certificate",
      "Recent Passport Photograph",
      "Bank Passbook (first page)",
      "Category Certificate (if applicable)",
      "Disability Certificate (if applicable)",
      "Institution/Employer Letter (category specific)",
    ],
    processNew: "New applications are processed through eKYC, document scrutiny, and district-level sanction with a target SLA of 30 calendar days.",
    processUpdate: "Update requests allow correction of demographic, bank, and category-linked data after OTP-authenticated consent and validation checks.",
    processLost: "For lost sanction letters/cards, a duplicate can be requested using registered mobile + declaration and is issued within 7 working days.",
    processSurrender: "Voluntary surrender is accepted online/offline with declaration; pending dues are reconciled and closure order is generated.",
    docNew: "Identity, address, income, and category proofs are mandatory for new applications.",
    docUpdate: "Only changed fields require supporting documents, along with a self-declaration for data correction.",
    docLost: "Self-declaration and FIR/DD entry (if available) are accepted for duplicate issuance.",
    docSurrender: "Signed surrender request and any issued physical artifacts are required where applicable.",
  };
}

function buildCertificateMatrices(dept: DepartmentSeed, index: number) {
  const appTypes = [
    "New Application",
    "Update Application",
    "Lost Application",
    "Surrender Application",
  ] as const;

  const processSteps = appTypes.flatMap((applicationType) => [
    {
      slNo: 1,
      stepDetails: `Register request for ${applicationType.toLowerCase()} and generate acknowledgement token.`,
      applicationType,
    },
    {
      slNo: 2,
      stepDetails: "Submit mandatory and conditional documents in prescribed format.",
      applicationType,
    },
    {
      slNo: 3,
      stepDetails: "Department officer performs digital scrutiny and field verification (if required).",
      applicationType,
    },
    {
      slNo: 4,
      stepDetails: "Competent authority records decision and digitally signs outcome document.",
      applicationType,
    },
    {
      slNo: 5,
      stepDetails: "Citizen receives downloadable certificate/order and SMS/email notification.",
      applicationType,
    },
  ]);

  const eligibilityItems = appTypes.flatMap((applicationType) => [
    {
      eligibilityDetail: `Applicant must satisfy ${applicationType.toLowerCase()} criteria notified by ${dept.name}.`,
      applicationType,
    },
    {
      eligibilityDetail: "Applicant identity must be verifiable through approved government ID.",
      applicationType,
    },
    {
      eligibilityDetail: "No unresolved compliance mismatch should exist in departmental records.",
      applicationType,
    },
  ]);

  const documents = appTypes.flatMap((applicationType) => [
    {
      slNo: 1,
      documentType: "Identity Proof",
      validProof: "Aadhaar / Passport / Voter ID",
      isRequired: true,
      applicationType,
    },
    {
      slNo: 2,
      documentType: "Address Proof",
      validProof: "Utility Bill / Ration Card / Lease Document",
      isRequired: true,
      applicationType,
    },
    {
      slNo: 3,
      documentType: "Supporting Proof",
      validProof:
        applicationType === "Lost Application"
          ? "FIR / DD Entry / Signed Loss Declaration"
          : applicationType === "Update Application"
            ? "Previous Certificate + Change Supporting Document"
            : applicationType === "Surrender Application"
              ? "Surrender Declaration + Original Certificate"
              : "Application-specific evidence as per service rulebook",
      isRequired: true,
      applicationType,
    },
  ]);

  const contacts = appTypes.map((applicationType, idx) => ({
    serviceName: `${dept.code} Unified Certificate Service`,
    district: `District ${index + 1}`,
    subDistrict: idx % 2 === 0 ? "Central" : "North",
    block: idx % 2 === 0 ? "Block A" : "Block B",
    name: `${dept.code} Certificate Officer ${idx + 1}`,
    designation: "Verification & Issuance Officer",
    contact: `88${index}${idx}77554${idx}`.slice(0, 10),
    email: `cert.${applicationType.toLowerCase().split(" ")[0]}.${dept.code.toLowerCase()}@gov.in`,
    applicationType,
  }));

  return { processSteps, eligibilityItems, documents, contacts };
}

function buildContactOffices(dept: DepartmentSeed, index: number) {
  return [
    {
      serviceName: `${dept.name} State Control Office`,
      district: "State Capital",
      subDistrict: "Central",
      block: "Secretariat Block",
      name: `${dept.code} Central Helpdesk`,
      designation: "Chief Public Information Officer",
      contact: `1800-42${(500 + index).toString().padStart(4, "0")}`,
      email: `cpio.${dept.code.toLowerCase()}@gov.in`,
      posts: {
        create: [
          {
            postName: "Citizen Support Executive",
            rank: "Class C",
            description: "Handles first-contact calls, ticket creation, and citizen guidance.",
            department: dept.name,
            employees: {
              create: [
                {
                  name: `Support Officer ${dept.code}-01`,
                  email: `support01.${dept.code.toLowerCase()}@gov.in`,
                  phone: `98${index}1100110`.slice(0, 10),
                  designation: "Helpdesk Executive",
                  employeeId: `EMP-${dept.code}-001`,
                },
                {
                  name: `Support Officer ${dept.code}-02`,
                  email: `support02.${dept.code.toLowerCase()}@gov.in`,
                  phone: `98${index}1100111`.slice(0, 10),
                  designation: "Helpdesk Executive",
                  employeeId: `EMP-${dept.code}-002`,
                },
              ],
            },
          },
          {
            postName: "Grievance Redressal Officer",
            rank: "Class B",
            description: "Owns escalations, SLA breaches, and final response coordination.",
            department: dept.name,
            employees: {
              create: [
                {
                  name: `Redressal Officer ${dept.code}-01`,
                  email: `gro.${dept.code.toLowerCase()}@gov.in`,
                  phone: `98${index}2200220`.slice(0, 10),
                  designation: "Senior Grievance Officer",
                  employeeId: `EMP-${dept.code}-003`,
                },
              ],
            },
          },
        ],
      },
    },
    {
      serviceName: `${dept.name} District Facilitation Office`,
      district: `District ${index + 1}`,
      subDistrict: "North Zone",
      block: "Administrative Block",
      name: `${dept.code} District Service Office`,
      designation: "District Public Information Officer",
      contact: `1800-42${(600 + index).toString().padStart(4, "0")}`,
      email: `dpio.${dept.code.toLowerCase()}@gov.in`,
      posts: {
        create: [
          {
            postName: "Regional Coordinator",
            rank: "Class B",
            description: "Coordinates district service camps and inter-office workflows.",
            department: dept.name,
            employees: {
              create: [
                {
                  name: `Regional Coordinator ${dept.code}-01`,
                  email: `regional.${dept.code.toLowerCase()}@gov.in`,
                  phone: `98${index}3300330`.slice(0, 10),
                  designation: "Coordinator",
                  employeeId: `EMP-${dept.code}-101`,
                },
              ],
            },
          },
          {
            postName: "Technical Support Officer",
            rank: "Class C",
            description: "Resolves portal, document upload, and digital certificate issues.",
            department: dept.name,
            employees: {
              create: [
                {
                  name: `Tech Officer ${dept.code}-01`,
                  email: `tech.${dept.code.toLowerCase()}@gov.in`,
                  phone: `98${index}4400440`.slice(0, 10),
                  designation: "Technical Support",
                  employeeId: `EMP-${dept.code}-102`,
                },
              ],
            },
          },
        ],
      },
    },
    {
      serviceName: `${dept.name} Sub-Division Facilitation Counter`,
      district: `District ${index + 1}`,
      subDistrict: "South Zone",
      block: "Citizen Service Complex",
      name: `${dept.code} Sub-Division Counter`,
      designation: "Assistant Public Facilitation Officer",
      contact: `1800-42${(700 + index).toString().padStart(4, "0")}`,
      email: `subdivision.${dept.code.toLowerCase()}@gov.in`,
      posts: {
        create: [
          {
            postName: "Counter Assistant",
            rank: "Class D",
            description: "Supports walk-in citizens with tokening, form checks, and queue assistance.",
            department: dept.name,
            employees: {
              create: [
                {
                  name: `Counter Assistant ${dept.code}-01`,
                  email: `counter.${dept.code.toLowerCase()}@gov.in`,
                  phone: `98${index}5500550`.slice(0, 10),
                  designation: "Citizen Counter Assistant",
                  employeeId: `EMP-${dept.code}-201`,
                },
              ],
            },
          },
        ],
      },
    },
  ];
}

async function seed() {
  console.log("🌱 Seeding database with comprehensive and deeply detailed sample data...\n");

  const defaultPassword = "Password@123";
  const hashedPassword = await bcrypt.hash(defaultPassword, 12);

  // Keep departments/admins; refresh service/grievance/feedback data for deterministic results.
  await prisma.notification.deleteMany({});
  await prisma.grievanceActivity.deleteMany({});
  await prisma.verificationOTP.deleteMany({});
  await prisma.grievance.deleteMany({});
  await prisma.feedback.deleteMany({});
  await prisma.contactService.deleteMany({});
  await prisma.certificateService.deleteMany({});
  await prisma.schemeService.deleteMany({});

  const adminCredentials: Array<{ dept: string; email: string; password: string }> = [];

  for (let i = 0; i < departmentsData.length; i++) {
    const deptInfo = departmentsData[i];

    const department = await prisma.department.upsert({
      where: { code: deptInfo.code },
      update: {
        name: deptInfo.name,
        description: deptInfo.description,
        contactEmail: deptInfo.contactEmail,
        contactPhone: deptInfo.contactPhone,
        isActive: true,
      },
      create: {
        name: deptInfo.name,
        code: deptInfo.code,
        description: deptInfo.description,
        contactEmail: deptInfo.contactEmail,
        contactPhone: deptInfo.contactPhone,
        isActive: true,
      },
    });

    const email = `admin@${deptInfo.code.toLowerCase()}.gov.in`;
    const admin = await prisma.admin.upsert({
      where: { email },
      update: {
        password: hashedPassword,
        name: `${deptInfo.name} Admin`,
        role: "department_admin",
        isActive: true,
        departmentId: department.id,
        assignedServices: ["schemes", "certificates", "contacts", "grievances", "feedbacks"],
      },
      create: {
        email,
        password: hashedPassword,
        name: `${deptInfo.name} Admin`,
        role: "department_admin",
        isActive: true,
        departmentId: department.id,
        assignedServices: ["schemes", "certificates", "contacts", "grievances", "feedbacks"],
      },
    });

    adminCredentials.push({ dept: deptInfo.name, email, password: defaultPassword });

    const scheme = buildSchemeDetails(deptInfo);
    await prisma.schemeService.create({
      data: {
        name: scheme.name,
        summary: scheme.summary,
        type: scheme.type,
        targetAudience: scheme.targetAudience,
        applicationMode: scheme.applicationMode,
        onlineUrl: scheme.onlineUrl,
        offlineAddress: scheme.offlineAddress,
        status: "published",
        isActive: true,
        adminId: admin.id,
        departmentId: department.id,
        eligibilityDetails: scheme.eligibilityDetails,
        schemeDetails: scheme.schemeDetails,
        processDetails: scheme.processDetails,
        benefitDetails: scheme.benefitDetails,
        applicationProcess: scheme.applicationProcess,
        requiredDocuments: scheme.requiredDocuments,
        processNew: scheme.processNew,
        processUpdate: scheme.processUpdate,
        processLost: scheme.processLost,
        processSurrender: scheme.processSurrender,
        docNew: scheme.docNew,
        docUpdate: scheme.docUpdate,
        docLost: scheme.docLost,
        docSurrender: scheme.docSurrender,
        contacts: {
          create: [
            {
              serviceName: scheme.name,
              district: `District ${i + 1}`,
              subDistrict: "Central",
              block: "Primary Block",
              name: `${deptInfo.code} Scheme Nodal Officer`,
              designation: "Nodal Scheme Officer",
              contact: `99${i}6012345`.slice(0, 10),
              email: `scheme.nodal.${deptInfo.code.toLowerCase()}@gov.in`,
            },
            {
              serviceName: scheme.name,
              district: `District ${i + 1}`,
              subDistrict: "North",
              block: "Block B",
              name: `${deptInfo.code} District Implementation Officer`,
              designation: "District Implementation Officer",
              contact: `99${i}6012346`.slice(0, 10),
              email: `scheme.district.${deptInfo.code.toLowerCase()}@gov.in`,
            },
          ],
        },
        documents: {
          create: [
            { slNo: 1, documentType: "Identity Document", validProof: "Aadhaar / Voter ID / Passport", isRequired: true },
            { slNo: 2, documentType: "Address Proof", validProof: "Utility Bill / Domicile / Rent Agreement", isRequired: true },
            { slNo: 3, documentType: "Income Certificate", validProof: "Issued by competent revenue authority", isRequired: true },
            { slNo: 4, documentType: "Bank Verification", validProof: "Passbook or cancelled cheque", isRequired: true },
            { slNo: 5, documentType: "Category Supporting Proof", validProof: "Category/disability/student proofs where applicable", isRequired: false },
          ],
        },
      },
    });

    const certificateMatrices = buildCertificateMatrices(deptInfo, i);
    await prisma.certificateService.create({
      data: {
        name: `${deptInfo.code} Unified Eligibility Certificate`,
        summary: `A highly detailed, multi-scenario certification service by ${deptInfo.name} supporting new, update, lost, and surrender workflows with transparent eligibility and process tracking.`,
        type: deptInfo.certificateType,
        targetAudience: ["Citizens", "Businesses", "Institutions", "Vendors"],
        applicationMode: "both",
        onlineUrl: `https://${deptInfo.code.toLowerCase()}.gov.in/certificates/unified-eligibility`,
        offlineAddress: `${deptInfo.name} District e-Governance Counter`,
        status: "published",
        isActive: true,
        adminId: admin.id,
        departmentId: department.id,
        eligibilityDetails: [
          "Applicant must satisfy service-specific statutory and departmental criteria.",
          "Applicant profile must not have unresolved fraud/compliance flags.",
          "All mandatory documents should be legible and valid on date of submission.",
          "In-person verification may be mandated for high-risk categories.",
        ],
        certificateDetails: [
          "Certificate is digitally signed and downloadable from applicant dashboard.",
          "QR-based verification endpoint is embedded for public authenticity checks.",
          "Tamper-evident metadata includes issuance date, application type, and issuing authority code.",
          "Reissue history and amendment trail are retained for audit and legal traceability.",
        ],
        processDetails: [
          "Submission and verification are application-type aware (new/update/lost/surrender).",
          "Escalation workflow auto-triggers for pending files beyond configured SLA.",
          "Service status can be tracked using acknowledgment number and registered contact.",
          "Certified output is issued only after mandatory compliance checks pass.",
        ],
        applicationProcess: [
          "Application Registration",
          "Document Upload",
          "Preliminary Scrutiny",
          "Field Verification (if required)",
          "Approving Authority Review",
          "Digital Issuance",
        ],
        requiredDocuments: [
          "Identity Proof",
          "Address Proof",
          "Service-Specific Supporting Proof",
          "Declaration Form",
          "Legacy Certificate Copy (for update/lost/surrender)",
        ],
        processNew: "New application requires full document set and baseline verification before issuance.",
        processUpdate: "Update application permits correction/amendment with delta-document validation.",
        processLost: "Lost application supports duplicate issuance against declaration and traceable reference.",
        processSurrender: "Surrender application records closure intent and archives certificate lifecycle status.",
        docNew: "Identity + address + baseline eligibility proofs.",
        docUpdate: "Existing certificate + change request evidence.",
        docLost: "Loss declaration + FIR/DD reference if available.",
        docSurrender: "Surrender declaration + original certificate details.",
        processSteps: { create: certificateMatrices.processSteps },
        eligibilityItems: { create: certificateMatrices.eligibilityItems },
        documents: { create: certificateMatrices.documents },
        contacts: { create: certificateMatrices.contacts },
      },
    });

    await prisma.contactService.create({
      data: {
        name: `${deptInfo.name} Contact, Office & Escalation Network`,
        summary: `Comprehensive contact service for ${deptInfo.name} with state, district and subdivision offices, mapped posts, designated employees, and escalation channels.`,
        type: "General Contacts",
        targetAudience: ["Citizens", "Media", "Inter-Department Officers", "Vendors"],
        applicationMode: "both",
        onlineUrl: `https://${deptInfo.code.toLowerCase()}.gov.in/contact-services`,
        offlineAddress: `${deptInfo.name} Main Secretariat Helpdesk and District Facilitation Counters`,
        status: "published",
        isActive: true,
        adminId: admin.id,
        departmentId: department.id,
        eligibilityDetails: [
          "Open access service for all citizens and organizations requiring official assistance.",
          "Emergency escalation available for time-bound or critical service disruptions.",
        ],
        contactDetails: [
          `Primary Helpline: ${deptInfo.contactPhone}`,
          `Nodal Email: ${deptInfo.contactEmail}`,
          "Working Hours: 10:00 AM to 6:00 PM (Mon-Sat)",
          "Escalation Window: 48 hours from unresolved ticket timestamp",
        ],
        processDetails: [
          "Citizen raises query via phone/email/portal.",
          "Ticket is categorized and routed to office-level post owner.",
          "Assigned employee responds and records closure note.",
          "Escalation path auto-activates for unresolved or overdue tickets.",
        ],
        processNew: "New service ticket is assigned to office-level queue and acknowledged instantly.",
        processUpdate: "Existing ticket can be updated with additional evidence and comments.",
        processLost: "Legacy reference lookup support available when ticket details are partially missing.",
        processSurrender: "Users may close ticket voluntarily after confirming resolution.",
        docNew: "Optional supporting documents can be attached for faster diagnosis.",
        docUpdate: "Additional clarifications/documents can be appended to same ticket.",
        docLost: "Identity + service reference details required for lookup.",
        docSurrender: "Closure consent confirmation through portal or recorded phone consent.",
        contacts: { create: buildContactOffices(deptInfo, i) },
        documents: {
          create: [
            { slNo: 1, documentType: "Ticket Request Form", validProof: "Online form or signed offline request", isRequired: false },
            { slNo: 2, documentType: "Supporting Evidence", validProof: "Screenshots, receipts, or correspondence copy", isRequired: false },
            { slNo: 3, documentType: "Authorization Letter", validProof: "Required when represented by authorized agent", isRequired: false },
          ],
        },
      },
    });

    await prisma.grievance.create({
      data: {
        name: `Citizen ${deptInfo.code} Grievance`,
        email: `grievance.${deptInfo.code.toLowerCase()}@example.com`,
        phone: `97${i}7001200`.slice(0, 10),
        address: `Ward ${i + 11}, Civic Avenue, District ${i + 1}`,
        subject: `Delay and repeated rework in ${deptInfo.name} service processing`,
        description:
          `I submitted all mandatory documents for a ${deptInfo.name} service and received acknowledgment 32 days ago. The portal timeline shows repeated 'under verification' states without any deficiency memo. The local office informed that the file moved between counters twice due to internal routing issues. This delay has impacted a time-sensitive requirement. Please review the case, provide reasoned status, and process it within the notified SLA with accountability details.`,
        category: "SLA Delay",
        priority: "high",
        status: "pending",
        attachments: [
          `ack-${deptInfo.code.toLowerCase()}-${i + 1}.pdf`,
          `timeline-${deptInfo.code.toLowerCase()}-${i + 1}.png`,
          `office-visit-notes-${deptInfo.code.toLowerCase()}-${i + 1}.txt`,
        ],
        source: "web",
        trackingId: `GRV-${deptInfo.code}-SEED-${String(i + 1).padStart(3, "0")}`,
        departmentId: department.id,
      },
    });

    await prisma.feedback.create({
      data: {
        name: `Citizen ${deptInfo.code} Feedback`,
        email: `feedback.${deptInfo.code.toLowerCase()}@example.com`,
        phone: `96${i}8803300`.slice(0, 10),
        subject: `${deptInfo.name} portal and counter experience feedback`,
        message:
          `The ${deptInfo.name} portal is generally stable and the service list is useful. The form guidance and document checklist are clear, but queue visibility at district counters can be improved. If the portal adds estimated waiting time, auto-reminders for pending documents, and office-wise slot availability, it would significantly reduce repeat visits. Overall experience is good, with scope for better real-time tracking and mobile-first UI improvements.`,
        category: "Service Experience",
        serviceType: "Citizen Services",
        rating: 4,
        source: "web",
        status: "new",
        departmentId: department.id,
      },
    });

    console.log(`✅ Seeded complete detailed dataset for ${deptInfo.name}`);
  }

  const superAdminEmail = process.env.SUPER_ADMIN_EMAIL || "admin@govservices.in";
  const superAdminPassword = process.env.SUPER_ADMIN_PASSWORD || "Admin@123456";
  const superAdminHashed = await bcrypt.hash(superAdminPassword, 12);

  await prisma.admin.upsert({
    where: { email: superAdminEmail },
    update: { role: "super_admin", password: superAdminHashed, isActive: true },
    create: {
      email: superAdminEmail,
      password: superAdminHashed,
      name: "Super Admin",
      role: "super_admin",
      isActive: true,
    },
  });

  console.log("\n🔑 Department Admin Credentials:");
  console.table(adminCredentials);
  console.log("\n🌱 Seeding complete. Services are now deeply populated across all departments.\n");
}

seed()
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
