export interface UserSession {
  phoneNumber: string;
  language: "en" | "bn";
  currentMenu: string;
  currentService?: string;
  currentStep?: string;
  userData?: any;
  lastActivity: Date;
  context?: {
    serviceType?:
      | "scheme"
      | "certificate"
      | "contact"
      | "grievance"
      | "feedback";
    serviceId?: string;
    formData?: any;
    step?: number;
  };
}

export interface WhatsAppMessage {
  from: string;
  id: string;
  timestamp: string;
  text: {
    body: string;
  };
  type: "text" | "interactive" | "button";
}

export interface WhatsAppWebhookData {
  messaging_product: string;
  metadata: {
    display_phone_number: string;
    phone_number_id: string;
  };
  contacts?: Array<{
    profile: {
      name: string;
    };
    wa_id: string;
  }>;
  messages?: WhatsAppMessage[];
}

export interface Translation {
  [key: string]: string | Translation;
}

export interface BotMenu {
  title: string;
  options: Array<{
    id: string;
    title: string;
    description?: string;
  }>;
}

export interface ServiceData {
  id: number;
  name: string;
  summary: string;
  type?: string;
  targetAudience: string[];
  applicationMode: string;
  onlineUrl?: string;
  offlineAddress?: string;
  isActive: boolean;
  eligibilityDetails?: string[];
  benefitDetails?: string[];
  certificateDetails?: string[];
  applicationProcess?: string[];
  requiredDocuments?: string[];
}

export interface GrievanceInput {
  name: string;
  email: string;
  phone: string;
  subject: string;
  description: string;
  department: string;
  priority: "low" | "medium" | "high";
}

export interface FeedbackInput {
  name: string;
  email?: string;
  phone?: string;
  rating: number;
  comment: string;
  serviceType: string;
}
