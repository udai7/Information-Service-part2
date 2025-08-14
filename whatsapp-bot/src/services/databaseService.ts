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
          targetAudience: true,
          applicationMode: true,
          onlineUrl: true,
          offlineAddress: true,
          isActive: true,
          eligibilityDetails: true,
          benefitDetails: true,
          applicationProcess: true,
          requiredDocuments: true,
        },
      });

      return schemes.map((scheme: any) => ({
        id: scheme.id,
        name: scheme.name,
        summary: scheme.summary,
        targetAudience: scheme.targetAudience,
        applicationMode: scheme.applicationMode,
        onlineUrl: scheme.onlineUrl || undefined,
        offlineAddress: scheme.offlineAddress || undefined,
        isActive: scheme.isActive || false,
        eligibilityDetails: scheme.eligibilityDetails,
        benefitDetails: scheme.benefitDetails,
        applicationProcess: scheme.applicationProcess,
        requiredDocuments: scheme.requiredDocuments,
      }));
    } catch (error) {
      console.error("Error fetching scheme services:", error);
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
          benefitDetails: true,
          applicationProcess: true,
          requiredDocuments: true,
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
        benefitDetails: scheme.benefitDetails,
        applicationProcess: scheme.applicationProcess,
        requiredDocuments: scheme.requiredDocuments,
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
          targetAudience: true,
          applicationMode: true,
          onlineUrl: true,
          offlineAddress: true,
          isActive: true,
          eligibilityDetails: true,
          certificateDetails: true,
          applicationProcess: true,
          requiredDocuments: true,
        },
      });

      return certificates.map((cert: any) => ({
        id: cert.id,
        name: cert.name,
        summary: cert.summary,
        targetAudience: cert.targetAudience,
        applicationMode: cert.applicationMode,
        onlineUrl: cert.onlineUrl || undefined,
        offlineAddress: cert.offlineAddress || undefined,
        isActive: cert.isActive || false,
        eligibilityDetails: cert.eligibilityDetails,
        certificateDetails: cert.certificateDetails,
        applicationProcess: cert.applicationProcess,
        requiredDocuments: cert.requiredDocuments,
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
          targetAudience: true,
          applicationMode: true,
          onlineUrl: true,
          offlineAddress: true,
          isActive: true,
          eligibilityDetails: true,
          certificateDetails: true,
          applicationProcess: true,
          requiredDocuments: true,
        },
      });

      if (!certificate) return null;

      return {
        id: certificate.id,
        name: certificate.name,
        summary: certificate.summary,
        targetAudience: certificate.targetAudience,
        applicationMode: certificate.applicationMode,
        onlineUrl: certificate.onlineUrl || undefined,
        offlineAddress: certificate.offlineAddress || undefined,
        isActive: certificate.isActive || false,
        eligibilityDetails: certificate.eligibilityDetails,
        certificateDetails: certificate.certificateDetails,
        applicationProcess: certificate.applicationProcess,
        requiredDocuments: certificate.requiredDocuments,
      };
    } catch (error) {
      console.error("Error fetching certificate by ID:", error);
      throw error;
    }
  }

  // Contact Services
  async getActiveContactServices(): Promise<any[]> {
    try {
      const contacts = await this.prisma.contactService.findMany({
        where: {
          isActive: true,
          status: "published",
        },
        select: {
          id: true,
          serviceName: true,
          district: true,
          subDistrict: true,
          block: true,
          officeAddress: true,
          isActive: true,
          contacts: {
            select: {
              id: true,
              name: true,
              designation: true,
              contact: true,
              email: true,
            },
          },
        },
      });

      return contacts.map((contact: any) => ({
        ...contact,
        serviceName: contact.name, // Map name to serviceName for bot compatibility
        district: contact.contacts[0]?.district || "",
        block: contact.contacts[0]?.block || "",
        officeAddress: contact.offlineAddress,
      }));
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

  // Grievance Services
  async submitGrievance(grievanceData: GrievanceInput): Promise<string> {
    try {
      const grievance = await this.prisma.grievance.create({
        data: {
          name: grievanceData.name,
          email: grievanceData.email,
          phone: grievanceData.phone,
          subject: grievanceData.subject,
          description: grievanceData.description,
          department: grievanceData.department,
          priority: grievanceData.priority,
          status: "pending", // Use "pending" as per schema
          source: "whatsapp",
        },
      });

      // Create a tracking ID from the grievance ID
      const trackingId = `GRV-${grievance.id.toString().padStart(6, "0")}`;
      return trackingId;
    } catch (error) {
      console.error("Error submitting grievance:", error);
      throw error;
    }
  }

  // Feedback Services
  async submitFeedback(feedbackData: FeedbackInput): Promise<boolean> {
    try {
      await this.prisma.feedback.create({
        data: {
          name: feedbackData.name,
          email: feedbackData.email || null,
          phone: feedbackData.phone || null,
          comment: feedbackData.comment,
          rating: feedbackData.rating,
          serviceType: feedbackData.serviceType,
          source: "whatsapp",
        },
      });

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
