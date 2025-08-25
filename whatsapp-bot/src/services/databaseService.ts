import { PrismaClient } from "../../prisma/generated/prisma";
import { ServiceData, GrievanceInput, FeedbackInput } from "../types";

export class DatabaseService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient({
      datasourceUrl: process.env.DATABASE_URL,
    });
  }

  async testConnection(): Promise<boolean> {
    try {
      await this.prisma.$connect();
      console.log("✅ Database connected successfully");
      return true;
    } catch (error) {
      console.error("❌ Database connection failed:", error);
      throw error;
    }
  }

  // Scheme Services
  async getActiveSchemeServices(): Promise<ServiceData[]> {
    try {
      const schemes = await this.prisma.schemeService.findMany({
        where: {
          isActive: true,
          status: "published",
        },
        select: {
          id: true,
          name: true,
          summary: true,
          type: true,
          targetAudience: true,
          applicationMode: true,
          onlineUrl: true,
          offlineAddress: true,
          isActive: true,
          eligibilityDetails: true,
          schemeDetails: true,
          processDetails: true,
          processNew: true,
          processUpdate: true,
          processLost: true,
          processSurrender: true,
          docNew: true,
          docUpdate: true,
          docLost: true,
          docSurrender: true,
          contacts: {
            select: {
              id: true,
              name: true,
              designation: true,
              contact: true,
              email: true,
              serviceName: true,
              district: true,
              subDistrict: true,
              block: true,
            },
          },
          documents: {
            select: {
              id: true,
              slNo: true,
              documentType: true,
              validProof: true,
              isRequired: true,
            },
          },
        },
      });

      return schemes.map((scheme: any) => ({
        id: scheme.id,
        name: scheme.name,
        summary: scheme.summary,
        type: scheme.type,
        targetAudience: scheme.targetAudience,
        applicationMode: scheme.applicationMode,
        onlineUrl: scheme.onlineUrl || undefined,
        offlineAddress: scheme.offlineAddress || undefined,
        isActive: scheme.isActive || false,
        eligibilityDetails: scheme.eligibilityDetails,
        schemeDetails: scheme.schemeDetails,
        processDetails: scheme.processDetails,
        processNew: scheme.processNew,
        processUpdate: scheme.processUpdate,
        processLost: scheme.processLost,
        processSurrender: scheme.processSurrender,
        docNew: scheme.docNew,
        docUpdate: scheme.docUpdate,
        docLost: scheme.docLost,
        docSurrender: scheme.docSurrender,
        contacts: scheme.contacts,
        documents: scheme.documents,
      }));
    } catch (error) {
      console.error("Error fetching scheme services:", error);
      throw error;
    }
  }

  async getSchemeServicesByType(type: string): Promise<ServiceData[]> {
    try {
      const schemes = await this.prisma.schemeService.findMany({
        where: {
          isActive: true,
          status: "published",
          type: type,
        },
        select: {
          id: true,
          name: true,
          summary: true,
          type: true,
          targetAudience: true,
          applicationMode: true,
          onlineUrl: true,
          offlineAddress: true,
          isActive: true,
          eligibilityDetails: true,
          schemeDetails: true,
          processDetails: true,
          processNew: true,
          processUpdate: true,
          processLost: true,
          processSurrender: true,
          docNew: true,
          docUpdate: true,
          docLost: true,
          docSurrender: true,
          contacts: {
            select: {
              id: true,
              name: true,
              designation: true,
              contact: true,
              email: true,
              serviceName: true,
              district: true,
              subDistrict: true,
              block: true,
            },
          },
          documents: {
            select: {
              id: true,
              slNo: true,
              documentType: true,
              validProof: true,
              isRequired: true,
            },
          },
        },
      });

      console.log(
        `📊 WhatsApp Bot - Found ${schemes.length} schemes for type "${type}"`,
      );

      const result = schemes.map((scheme: any) => ({
        id: scheme.id,
        name: scheme.name,
        summary: scheme.summary,
        type: scheme.type,
        targetAudience: scheme.targetAudience,
        applicationMode: scheme.applicationMode,
        onlineUrl: scheme.onlineUrl || undefined,
        offlineAddress: scheme.offlineAddress || undefined,
        isActive: scheme.isActive || false,
        eligibilityDetails: scheme.eligibilityDetails,
        schemeDetails: scheme.schemeDetails,
        processDetails: scheme.processDetails,
        processNew: scheme.processNew,
        processUpdate: scheme.processUpdate,
        processLost: scheme.processLost,
        processSurrender: scheme.processSurrender,
        docNew: scheme.docNew,
        docUpdate: scheme.docUpdate,
        docLost: scheme.docLost,
        docSurrender: scheme.docSurrender,
        contacts: scheme.contacts,
        documents: scheme.documents,
      }));

      return schemes.map((scheme: any) => ({
        id: scheme.id,
        name: scheme.name,
        summary: scheme.summary,
        type: scheme.type,
        targetAudience: scheme.targetAudience,
        applicationMode: scheme.applicationMode,
        onlineUrl: scheme.onlineUrl || undefined,
        offlineAddress: scheme.offlineAddress || undefined,
        isActive: scheme.isActive || false,
        eligibilityDetails: scheme.eligibilityDetails,
        schemeDetails: scheme.schemeDetails,
        processDetails: scheme.processDetails,
        processNew: scheme.processNew,
        processUpdate: scheme.processUpdate,
        processLost: scheme.processLost,
        processSurrender: scheme.processSurrender,
        docNew: scheme.docNew,
        docUpdate: scheme.docUpdate,
        docLost: scheme.docLost,
        docSurrender: scheme.docSurrender,
        contacts: scheme.contacts,
        documents: scheme.documents,
      }));
    } catch (error) {
      console.error("Error fetching scheme services by type:", error);
      throw error;
    }
  }

  async getSchemeById(id: number): Promise<ServiceData | null> {
    try {
      const scheme = await this.prisma.schemeService.findUnique({
        where: { id, isActive: true },
        select: {
          id: true,
          name: true,
          summary: true,
          targetAudience: true,
          applicationMode: true,
          onlineUrl: true,
          offlineAddress: true,
          isActive: true,
          eligibilityDetails: true,
          schemeDetails: true,
          processDetails: true,
        },
      });

      if (!scheme) return null;

      return {
        id: scheme.id,
        name: scheme.name,
        summary: scheme.summary,
        targetAudience: scheme.targetAudience,
        applicationMode: scheme.applicationMode,
        onlineUrl: scheme.onlineUrl || undefined,
        offlineAddress: scheme.offlineAddress || undefined,
        isActive: scheme.isActive || false,
        eligibilityDetails: scheme.eligibilityDetails,
        schemeDetails: scheme.schemeDetails,
        processDetails: scheme.processDetails,
      };
    } catch (error) {
      console.error("Error fetching scheme by ID:", error);
      throw error;
    }
  }

  // Certificate Services
  async getActiveCertificateServices(): Promise<ServiceData[]> {
    try {
      const certificates = await this.prisma.certificateService.findMany({
        where: {
          isActive: true,
          status: "published",
        },
        select: {
          id: true,
          name: true,
          summary: true,
          type: true,
          targetAudience: true,
          applicationMode: true,
          onlineUrl: true,
          offlineAddress: true,
          isActive: true,
          eligibilityDetails: true,
          certificateDetails: true,
          processDetails: true,
          processNew: true,
          processUpdate: true,
          processLost: true,
          processSurrender: true,
          docNew: true,
          docUpdate: true,
          docLost: true,
          docSurrender: true,
          contacts: {
            select: {
              id: true,
              serviceName: true,
              district: true,
              subDistrict: true,
              block: true,
              name: true,
              designation: true,
              contact: true,
              email: true,
              applicationType: true,
            },
          },
          documents: {
            select: {
              id: true,
              slNo: true,
              documentType: true,
              validProof: true,
              isRequired: true,
              applicationType: true,
            },
          },
          processSteps: {
            select: {
              id: true,
              slNo: true,
              stepDetails: true,
              applicationType: true,
            },
          },
          eligibilityItems: {
            select: {
              id: true,
              eligibilityDetail: true,
              applicationType: true,
            },
          },
        },
      });

      return certificates.map((cert: any) => ({
        id: cert.id,
        name: cert.name,
        summary: cert.summary,
        type: cert.type,
        targetAudience: cert.targetAudience,
        applicationMode: cert.applicationMode,
        onlineUrl: cert.onlineUrl || undefined,
        offlineAddress: cert.offlineAddress || undefined,
        isActive: cert.isActive || false,
        eligibilityDetails: cert.eligibilityDetails,
        certificateDetails: cert.certificateDetails,
        applicationProcess: cert.applicationProcess,
        requiredDocuments: cert.requiredDocuments,
        processNew: cert.processNew,
        processUpdate: cert.processUpdate,
        processLost: cert.processLost,
        processSurrender: cert.processSurrender,
        docNew: cert.docNew,
        docUpdate: cert.docUpdate,
        docLost: cert.docLost,
        docSurrender: cert.docSurrender,
        contacts: cert.contacts,
        documents: cert.documents,
        processSteps: cert.processSteps,
        eligibilityItems: cert.eligibilityItems,
      }));
    } catch (error) {
      console.error("Error fetching certificate services:", error);
      throw error;
    }
  }

  async getCertificateById(id: number): Promise<ServiceData | null> {
    try {
      const certificate = await this.prisma.certificateService.findUnique({
        where: { id, isActive: true },
        select: {
          id: true,
          name: true,
          summary: true,
          type: true,
          targetAudience: true,
          applicationMode: true,
          onlineUrl: true,
          offlineAddress: true,
          isActive: true,
          eligibilityDetails: true,
          certificateDetails: true,
          processNew: true,
          processUpdate: true,
          processLost: true,
          processSurrender: true,
          docNew: true,
          docUpdate: true,
          docLost: true,
          docSurrender: true,
          contacts: {
            select: {
              id: true,
              serviceName: true,
              district: true,
              subDistrict: true,
              block: true,
              name: true,
              designation: true,
              contact: true,
              email: true,
              applicationType: true,
            },
          },
          documents: {
            select: {
              id: true,
              slNo: true,
              documentType: true,
              validProof: true,
              isRequired: true,
              applicationType: true,
            },
          },
          processSteps: {
            select: {
              id: true,
              slNo: true,
              stepDetails: true,
              applicationType: true,
            },
          },
          eligibilityItems: {
            select: {
              id: true,
              eligibilityDetail: true,
              applicationType: true,
            },
          },
        },
      });

      if (!certificate) return null;

      return {
        id: certificate.id,
        name: certificate.name,
        summary: certificate.summary,
        type: certificate.type || undefined,
        targetAudience: certificate.targetAudience,
        applicationMode: certificate.applicationMode,
        onlineUrl: certificate.onlineUrl || undefined,
        offlineAddress: certificate.offlineAddress || undefined,
        isActive: certificate.isActive || false,
        eligibilityDetails: certificate.eligibilityDetails,
        certificateDetails: certificate.certificateDetails,
        processNew: certificate.processNew || undefined,
        processUpdate: certificate.processUpdate || undefined,
        processLost: certificate.processLost || undefined,
        processSurrender: certificate.processSurrender || undefined,
        docNew: certificate.docNew || undefined,
        docUpdate: certificate.docUpdate || undefined,
        docLost: certificate.docLost || undefined,
        docSurrender: certificate.docSurrender || undefined,
        // Include the related data arrays
        contacts: certificate.contacts || [],
        documents: certificate.documents || [],
        processSteps: certificate.processSteps || [],
        eligibilityItems: certificate.eligibilityItems || [],
      };
    } catch (error) {
      console.error("Error fetching certificate by ID:", error);
      throw error;
    }
  }

  // Contact Services
  async getActiveContactServices(
    contactType?: string,
    locationType?: string,
  ): Promise<any[]> {
    try {
      // Build where clause based on filters
      const whereClause: any = {
        isActive: true,
        status: "published",
      };

      // Add contact type filter
      if (contactType) {
        if (contactType === "Emergency") {
          whereClause.type = "Emergency";
        } else if (contactType === "Regular") {
          whereClause.type = "Regular";
        }
      }

      const contacts = await this.prisma.contactService.findMany({
        where: whereClause,
        select: {
          id: true,
          name: true,
          summary: true,
          type: true,
          applicationMode: true,
          onlineUrl: true,
          offlineAddress: true,
          isActive: true,
          eligibilityDetails: true,
          contactDetails: true,
          processDetails: true,
          contacts: {
            select: {
              id: true,
              serviceName: true,
              district: true,
              subDistrict: true,
              block: true,
              name: true,
              designation: true,
              contact: true,
              email: true,
            },
          },
        },
      });

      let filteredContacts = contacts.map((contact: any) => ({
        ...contact,
        serviceName: contact.name, // Map name to serviceName for bot compatibility
        district: contact.contacts[0]?.district || "",
        block: contact.contacts[0]?.block || "",
      }));

      // Apply location filter on the mapped results
      if (locationType) {
        if (locationType === "State") {
          // Filter for state-level contacts (where district is "State" or similar)
          filteredContacts = filteredContacts.filter(
            (contact) =>
              contact.district?.toLowerCase().includes("state") ||
              contact.district?.toLowerCase().includes("agartala") ||
              contact.district === "",
          );
        } else if (locationType === "District") {
          // Filter for district-level contacts (excluding state-level)
          filteredContacts = filteredContacts.filter(
            (contact) =>
              contact.district &&
              !contact.district.toLowerCase().includes("state") &&
              contact.district.toLowerCase() !== "agartala",
          );
        }
      }

      return filteredContacts;
    } catch (error) {
      console.error("Error fetching contact services:", error);
      throw error;
    }
  }

  async getContactById(id: number): Promise<any | null> {
    try {
      const contact = await this.prisma.contactService.findUnique({
        where: { id, isActive: true },
        include: {
          contacts: true,
        },
      });

      return contact;
    } catch (error) {
      console.error("Error fetching contact by ID:", error);
      throw error;
    }
  }

  async getContactServiceWithOfficeStructure(id: number): Promise<any | null> {
    try {
      const contact = await this.prisma.contactService.findUnique({
        where: { id },
        include: {
          contacts: {
            include: {
              posts: {
                include: {
                  employees: true,
                },
                orderBy: { createdAt: "desc" },
              },
            },
          },
        },
      });

      // Check if contact exists and is active
      if (!contact || !contact.isActive) {
        return null;
      }

      return contact;
    } catch (error) {
      console.error(
        "Error fetching contact service with office structure:",
        error,
      );
      throw error;
    }
  }

  // Grievance Services
  async submitGrievance(grievanceData: GrievanceInput): Promise<string> {
    try {
      // Generate a unique tracking ID
      const timestamp = Date.now().toString();
      const trackingId = `GRV-${timestamp.slice(-8)}`;

      const grievance = await this.prisma.grievance.create({
        data: {
          trackingId: trackingId,
          name: grievanceData.name,
          email: grievanceData.email,
          phone: grievanceData.phone,
          address: grievanceData.address || "", // Provide default for required field
          subject: grievanceData.subject,
          description: grievanceData.description,
          priority: grievanceData.priority,
          status: "pending", // Use "pending" as per schema
        },
      });

      return trackingId;
    } catch (error) {
      console.error("Error submitting grievance:", error);
      throw error;
    }
  }

  // Feedback Services
  async submitFeedback(feedbackData: FeedbackInput): Promise<boolean> {
    try {
      console.log("📝 Submitting feedback:", feedbackData);

      const result = await this.prisma.feedback.create({
        data: {
          name: feedbackData.name,
          email:
            feedbackData.email ||
            `${feedbackData.name
              .toLowerCase()
              .replace(/\s+/g, "")}@whatsapp.user`,
          phone: feedbackData.phone,
          message: feedbackData.comment, // Set message field for admin panel display
          rating: feedbackData.rating,
          subject: `Feedback from ${feedbackData.name}`, // Set subject
        },
      });

      console.log("✅ Feedback submitted successfully:", result.id);
      return true;
    } catch (error) {
      console.error("Error submitting feedback:", error);
      throw error;
    }
  }

  // Get departments for grievance
  async getDepartments(): Promise<string[]> {
    try {
      // Get unique departments from various services
      const schemeDepts = await this.prisma.schemeService.findMany({
        where: { isActive: true },
        select: { targetAudience: true },
        distinct: ["targetAudience"],
      });

      const certDepts = await this.prisma.certificateService.findMany({
        where: { isActive: true },
        select: { targetAudience: true },
        distinct: ["targetAudience"],
      });

      // Flatten and get unique departments
      const allDepts = [
        ...schemeDepts.flatMap((s: any) => s.targetAudience),
        ...certDepts.flatMap((c: any) => c.targetAudience),
      ];

      const uniqueDepts = [...new Set(allDepts)].filter(
        (dept) => dept && dept.length > 0,
      );

      // Add common government departments
      const commonDepts = [
        "General Administration",
        "Revenue Department",
        "Health Department",
        "Education Department",
        "Agriculture Department",
        "Public Works Department",
        "Social Welfare Department",
        "Other",
      ];

      return [...new Set([...uniqueDepts, ...commonDepts])];
    } catch (error) {
      console.error("Error fetching departments:", error);
      return ["General Administration", "Other"];
    }
  }

  async disconnect(): Promise<void> {
    await this.prisma.$disconnect();
  }
}
