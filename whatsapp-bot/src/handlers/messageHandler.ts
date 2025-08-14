import { WhatsAppMessage, UserSession, ServiceData } from "../types";
import { DatabaseService } from "../services/databaseService";
import { SessionManager } from "../services/sessionService";
import { translationService } from "../translations";

export class MessageHandler {
  private whatsappService?: any; // Will be set by WhatsAppBotService

  constructor(
    private databaseService: DatabaseService,
    private sessionManager: SessionManager,
  ) {}

  setWhatsAppService(service: any): void {
    this.whatsappService = service;
  }

  async handleMessage(message: WhatsAppMessage): Promise<string> {
    const phoneNumber = message.from;
    const messageText = message.text?.body?.toLowerCase().trim() || "";

    try {
      // Get or create user session
      let session = this.sessionManager.getSession(phoneNumber);

      // Handle commands that work without session
      if (
        messageText === "start" ||
        messageText === "hi" ||
        messageText === "hello" ||
        !session
      ) {
        session = this.sessionManager.createSession(phoneNumber);
        return await this.sendLanguageSelection(phoneNumber);
      }

      // Handle global commands
      if (messageText === "menu" || messageText === "main") {
        this.sessionManager.resetToMainMenu(phoneNumber);
        return await this.sendMainMenu(phoneNumber, session.language);
      }

      if (messageText === "help") {
        return await this.sendHelp(phoneNumber, session.language);
      }

      if (messageText === "lang" || messageText === "language") {
        this.sessionManager.setCurrentMenu(phoneNumber, "language_selection");
        return await this.sendLanguageSelection(phoneNumber);
      }

      if (messageText === "back") {
        return await this.handleBackNavigation(phoneNumber, session);
      }

      // Route message based on current menu/state
      return await this.routeMessage(phoneNumber, messageText, session);
    } catch (error) {
      console.error("❌ Error handling message:", error);
      const currentSession = this.sessionManager.getSession(phoneNumber);
      const errorMsg = translationService.translate(
        "common.error",
        currentSession?.language || "en",
      );
      return await this.sendResponse(phoneNumber, errorMsg);
    }
  }

  private async routeMessage(
    phoneNumber: string,
    messageText: string,
    session: UserSession,
  ): Promise<string> {
    switch (session.currentMenu) {
      case "language_selection":
        return await this.handleLanguageSelection(phoneNumber, messageText);

      case "main_menu":
        return await this.handleMainMenuSelection(
          phoneNumber,
          messageText,
          session,
        );

      case "schemes_list":
        return await this.handleSchemesMenu(phoneNumber, messageText, session);

      case "scheme_details":
        return await this.handleSchemeDetails(
          phoneNumber,
          messageText,
          session,
        );

      case "certificates_list":
        return await this.handleCertificatesMenu(
          phoneNumber,
          messageText,
          session,
        );

      case "certificate_details":
        return await this.handleCertificateDetails(
          phoneNumber,
          messageText,
          session,
        );

      case "certificate_application_type":
        return await this.handleCertificateApplicationType(
          phoneNumber,
          messageText,
          session,
        );

      case "contacts_list":
        return await this.handleContactsMenu(phoneNumber, messageText, session);

      case "contact_details":
        return await this.handleContactDetails(
          phoneNumber,
          messageText,
          session,
        );

      case "grievance_form":
        return await this.handleGrievanceForm(
          phoneNumber,
          messageText,
          session,
        );

      case "feedback_form":
        return await this.handleFeedbackForm(phoneNumber, messageText, session);

      default:
        return await this.sendMainMenu(phoneNumber, session.language);
    }
  }

  private async sendLanguageSelection(phoneNumber: string): Promise<string> {
    const message = `Welcome to Government Services Bot! 🏛️\n\nसरकारी सेवा बॉट में आपका स्वागत है!\n\nসরকারি সেবা বটে স্বাগতম!\n\nPlease select your preferred language:\nकृपया अपनी पसंदीदा भाषा चुनें:\nঅনুগ্রহ করে আপনার পছন্দের ভাষা নির্বাচন করুন:\n\n1️⃣ English\n2️⃣ বাংলা (Bengali)`;

    return await this.sendResponse(phoneNumber, message);
  }

  private async handleLanguageSelection(
    phoneNumber: string,
    messageText: string,
  ): Promise<string> {
    let language: "en" | "bn" = "en";

    if (
      messageText === "1" ||
      messageText === "english" ||
      messageText === "en"
    ) {
      language = "en";
    } else if (
      messageText === "2" ||
      messageText === "bengali" ||
      messageText === "bangla" ||
      messageText === "bn"
    ) {
      language = "bn";
    } else {
      return await this.sendLanguageSelection(phoneNumber);
    }

    this.sessionManager.setLanguage(phoneNumber, language);
    this.sessionManager.setCurrentMenu(phoneNumber, "main_menu");

    return await this.sendMainMenu(phoneNumber, language);
  }

  private async sendMainMenu(
    phoneNumber: string,
    language: "en" | "bn",
  ): Promise<string> {
    const title = translationService.translate("mainMenu.title", language);
    const subtitle = translationService.translate(
      "mainMenu.subtitle",
      language,
    );
    const options = translationService.getTranslationObject(
      "mainMenu.options",
      language,
    );

    const message = `${title}\n\n${subtitle}\n\n1️⃣ ${options.schemes}\n2️⃣ ${
      options.certificates
    }\n3️⃣ ${options.contacts}\n4️⃣ ${options.grievances}\n5️⃣ ${
      options.feedback
    }\n\n🌐 ${translationService.translate(
      "navigation.changeLanguage",
      language,
    )}\n❓ ${translationService.translate("navigation.help", language)}`;

    return await this.sendResponse(phoneNumber, message);
  }

  private async handleMainMenuSelection(
    phoneNumber: string,
    messageText: string,
    session: UserSession,
  ): Promise<string> {
    switch (messageText) {
      case "1":
      case "schemes":
      case "scheme":
      case "scheme services":
      case "📊 scheme services":
        this.sessionManager.setCurrentMenu(phoneNumber, "schemes_list");
        this.sessionManager.setServiceContext(phoneNumber, "scheme");
        return await this.sendSchemesList(phoneNumber, session.language);

      case "2":
      case "certificates":
      case "certificate":
      case "certificate services":
      case "📜 certificate services":
        this.sessionManager.setCurrentMenu(phoneNumber, "certificates_list");
        this.sessionManager.setServiceContext(phoneNumber, "certificate");
        return await this.sendCertificatesList(phoneNumber, session.language);

      case "3":
      case "contacts":
      case "contact":
      case "contact services":
      case "📞 contact services":
        this.sessionManager.setCurrentMenu(phoneNumber, "contacts_list");
        this.sessionManager.setServiceContext(phoneNumber, "contact");
        return await this.sendContactsList(phoneNumber, session.language);

      case "4":
      case "grievances":
      case "grievance":
      case "grievances service":
      case "📝 grievances service":
        this.sessionManager.setCurrentMenu(phoneNumber, "grievance_form");
        this.sessionManager.setServiceContext(phoneNumber, "grievance");
        this.sessionManager.setFormStep(phoneNumber, 1);
        return await this.sendGrievanceForm(phoneNumber, session.language);

      case "5":
      case "feedback":
      case "feedback service":
      case "💬 feedback service":
        this.sessionManager.setCurrentMenu(phoneNumber, "feedback_form");
        this.sessionManager.setServiceContext(phoneNumber, "feedback");
        this.sessionManager.setFormStep(phoneNumber, 1);
        return await this.sendFeedbackForm(phoneNumber, session.language);

      default:
        const invalidMsg = translationService.translate(
          "common.invalidOption",
          session.language,
        );
        return await this.sendResponse(phoneNumber, invalidMsg);
    }
  }

  private async sendSchemesList(
    phoneNumber: string,
    language: "en" | "bn",
  ): Promise<string> {
    try {
      const schemes = await this.databaseService.getActiveSchemeServices();
      const title = translationService.translate("schemes.title", language);
      const subtitle = translationService.translate(
        "schemes.subtitle",
        language,
      );

      if (schemes.length === 0) {
        const noSchemes = translationService.translate(
          "schemes.noSchemes",
          language,
        );
        return await this.sendResponse(phoneNumber, `${title}\n\n${noSchemes}`);
      }

      let message = `${title}\n\n${subtitle}\n\n`;
      schemes.forEach((scheme, index) => {
        message += `${index + 1}️⃣ ${
          scheme.name
        }\n📋 ${scheme.summary.substring(0, 100)}...\n\n`;
      });

      message += `\n⬅️ ${translationService.translate(
        "navigation.back",
        language,
      )}`;

      return await this.sendResponse(phoneNumber, message);
    } catch (error) {
      console.error("Error fetching schemes:", error);
      const errorMsg = translationService.translate("common.error", language);
      return await this.sendResponse(phoneNumber, errorMsg);
    }
  }

  private async handleSchemesMenu(
    phoneNumber: string,
    messageText: string,
    session: UserSession,
  ): Promise<string> {
    const schemeIndex = parseInt(messageText) - 1;

    try {
      const schemes = await this.databaseService.getActiveSchemeServices();

      if (schemeIndex >= 0 && schemeIndex < schemes.length) {
        const scheme = schemes[schemeIndex];
        this.sessionManager.setServiceContext(
          phoneNumber,
          "scheme",
          scheme.id.toString(),
        );
        this.sessionManager.setCurrentMenu(phoneNumber, "scheme_details");
        return await this.sendSchemeDetails(
          phoneNumber,
          scheme,
          session.language,
        );
      } else {
        const invalidMsg = translationService.translate(
          "common.invalidOption",
          session.language,
        );
        return await this.sendResponse(phoneNumber, invalidMsg);
      }
    } catch (error) {
      console.error("Error handling schemes menu:", error);
      const errorMsg = translationService.translate(
        "common.error",
        session.language,
      );
      return await this.sendResponse(phoneNumber, errorMsg);
    }
  }

  private async sendSchemeDetails(
    phoneNumber: string,
    scheme: ServiceData,
    language: "en" | "bn",
  ): Promise<string> {
    const translations = translationService.getTranslationObject(
      "schemes",
      language,
    );

    let message = `📊 ${scheme.name}\n\n`;
    message += `📋 ${scheme.summary}\n\n`;

    // Scheme Details Section
    if (scheme.schemeDetails && scheme.schemeDetails.length > 0) {
      message += `🔍 Scheme Details:\n`;
      scheme.schemeDetails.forEach((detail) => {
        message += `• ${detail}\n`;
      });
      message += "\n";
    }

    // Eligibility Criteria
    if (scheme.eligibilityDetails && scheme.eligibilityDetails.length > 0) {
      message += `✅ ${translations.eligibility}\n`;
      scheme.eligibilityDetails.forEach((detail) => {
        message += `• ${detail}\n`;
      });
      message += "\n";
    }

    // Benefits Section
    if (scheme.benefitDetails && scheme.benefitDetails.length > 0) {
      message += `🎁 ${translations.benefits}\n`;
      scheme.benefitDetails.forEach((benefit) => {
        message += `• ${benefit}\n`;
      });
      message += "\n";
    }

    // How to Apply / Application Process
    if (scheme.applicationProcess && scheme.applicationProcess.length > 0) {
      message += `📝 ${translations.howToApply}\n`;
      scheme.applicationProcess.forEach((step, index) => {
        message += `${index + 1}. ${step}\n`;
      });
      message += "\n";
    }

    // Process Details
    if (scheme.processDetails && scheme.processDetails.length > 0) {
      message += `⚙️ Process Details:\n`;
      scheme.processDetails.forEach((detail) => {
        message += `• ${detail}\n`;
      });
      message += "\n";
    }

    // Specific Process Flows
    if (scheme.processNew) {
      message += `🆕 New Application Process:\n${scheme.processNew}\n\n`;
    }
    if (scheme.processUpdate) {
      message += `🔄 Update Process:\n${scheme.processUpdate}\n\n`;
    }
    if (scheme.processLost) {
      message += `🔍 Lost Document Process:\n${scheme.processLost}\n\n`;
    }
    if (scheme.processSurrender) {
      message += `📤 Surrender Process:\n${scheme.processSurrender}\n\n`;
    }

    // Required Documents
    if (scheme.requiredDocuments && scheme.requiredDocuments.length > 0) {
      message += `📄 ${translations.requiredDocs}\n`;
      scheme.requiredDocuments.forEach((doc) => {
        message += `• ${doc}\n`;
      });
      message += "\n";
    }

    // Document Requirements for Different Processes
    if (scheme.docNew) {
      message += `📋 Documents for New Application:\n${scheme.docNew}\n\n`;
    }
    if (scheme.docUpdate) {
      message += `📋 Documents for Update:\n${scheme.docUpdate}\n\n`;
    }
    if (scheme.docLost) {
      message += `📋 Documents for Lost Certificate:\n${scheme.docLost}\n\n`;
    }
    if (scheme.docSurrender) {
      message += `📋 Documents for Surrender:\n${scheme.docSurrender}\n\n`;
    }

    // Supporting Documents
    if (scheme.documents && scheme.documents.length > 0) {
      message += `📑 Supporting Documents:\n`;
      scheme.documents
        .sort((a: any, b: any) => a.slNo - b.slNo)
        .forEach((doc: any) => {
          const required = doc.isRequired ? "✅ Required" : "⚪ Optional";
          message += `${doc.slNo}. ${doc.documentType}\n`;
          message += `   Valid Proof: ${doc.validProof}\n`;
          message += `   Status: ${required}\n\n`;
        });
    }

    // Application Mode and URLs
    message += `🌐 ${translations.applicationMode} ${scheme.applicationMode}\n`;

    if (scheme.onlineUrl) {
      message += `🔗 ${translations.onlineUrl} ${scheme.onlineUrl}\n`;
    }

    if (scheme.offlineAddress) {
      message += `🏢 ${translations.offlineAddress} ${scheme.offlineAddress}\n`;
    }

    // Contact Details for New Application
    if (scheme.contacts && scheme.contacts.length > 0) {
      message += `\n📞 Contact Details for New Application:\n`;
      scheme.contacts.forEach((contact: any, index: number) => {
        message += `\n${index + 1}. ${contact.name}\n`;
        message += `   📋 ${contact.designation}\n`;
        if (contact.serviceName) {
          message += `   🏢 Service: ${contact.serviceName}\n`;
        }
        message += `   📍 Location: ${contact.district}`;
        if (contact.subDistrict) message += `, ${contact.subDistrict}`;
        if (contact.block) message += `, ${contact.block}`;
        message += `\n   📞 ${contact.contact}\n`;
        if (contact.email) {
          message += `   ✉️ ${contact.email}\n`;
        }
      });
      message += "\n";
    }

    message += `\n⬅️ ${translationService.translate(
      "navigation.back",
      language,
    )}`;
    message += `\n🏠 ${translationService.translate(
      "navigation.mainMenu",
      language,
    )}`;

    return await this.sendResponse(phoneNumber, message);
  }

  private async sendCertificatesList(
    phoneNumber: string,
    language: "en" | "bn",
  ): Promise<string> {
    try {
      const certificates =
        await this.databaseService.getActiveCertificateServices();
      const title = translationService.translate(
        "certificates.title",
        language,
      );
      const subtitle = translationService.translate(
        "certificates.subtitle",
        language,
      );

      if (certificates.length === 0) {
        const noCertificates = translationService.translate(
          "certificates.noCertificates",
          language,
        );
        return await this.sendResponse(
          phoneNumber,
          `${title}\n\n${noCertificates}`,
        );
      }

      let message = `${title}\n\n${subtitle}\n\n`;
      certificates.forEach((cert, index) => {
        message += `${index + 1}️⃣ ${cert.name}\n📋 ${cert.summary.substring(
          0,
          100,
        )}...\n\n`;
      });

      message += `\n⬅️ ${translationService.translate(
        "navigation.back",
        language,
      )}`;

      return await this.sendResponse(phoneNumber, message);
    } catch (error) {
      console.error("Error fetching certificates:", error);
      const errorMsg = translationService.translate("common.error", language);
      return await this.sendResponse(phoneNumber, errorMsg);
    }
  }

  private async handleCertificatesMenu(
    phoneNumber: string,
    messageText: string,
    session: UserSession,
  ): Promise<string> {
    const certIndex = parseInt(messageText) - 1;

    try {
      const certificates =
        await this.databaseService.getActiveCertificateServices();

      if (certIndex >= 0 && certIndex < certificates.length) {
        const certificate = certificates[certIndex];
        this.sessionManager.setServiceContext(
          phoneNumber,
          "certificate",
          certificate.id.toString(),
        );
        this.sessionManager.setCurrentMenu(
          phoneNumber,
          "certificate_application_type",
        );
        return await this.sendCertificateDetails(
          phoneNumber,
          certificate,
          session.language,
        );
      } else {
        const invalidMsg = translationService.translate(
          "common.invalidOption",
          session.language,
        );
        return await this.sendResponse(phoneNumber, invalidMsg);
      }
    } catch (error) {
      console.error("Error handling certificates menu:", error);
      const errorMsg = translationService.translate(
        "common.error",
        session.language,
      );
      return await this.sendResponse(phoneNumber, errorMsg);
    }
  }

  private async sendCertificateDetails(
    phoneNumber: string,
    certificate: ServiceData,
    language: "en" | "bn",
  ): Promise<string> {
    const translations = translationService.getTranslationObject(
      "certificates",
      language,
    );

    let message = `📜 ${certificate.name}\n\n`;

    // Basic Information Section
    message += `📋 Basic Information:\n`;
    message += `${certificate.summary}\n\n`;

    // Certificate Details
    if (
      certificate.certificateDetails &&
      certificate.certificateDetails.length > 0
    ) {
      message += `� Certificate Details:\n`;
      certificate.certificateDetails.forEach((detail) => {
        message += `• ${detail}\n`;
      });
      message += "\n";
    }

    // How to Apply - General Information
    message += `📝 How to Apply:\n`;
    if (
      certificate.applicationProcess &&
      certificate.applicationProcess.length > 0
    ) {
      certificate.applicationProcess.forEach((step, index) => {
        message += `${index + 1}. ${step}\n`;
      });
    } else {
      message += `Please select your application type below for detailed process.\n`;
    }
    message += "\n";

    // Application Mode and URLs
    message += `🌐 Application Mode: ${certificate.applicationMode}\n`;
    if (certificate.onlineUrl) {
      message += `🔗 Online Application: ${certificate.onlineUrl}\n`;
    }
    if (certificate.offlineAddress) {
      message += `🏢 Offline Address: ${certificate.offlineAddress}\n`;
    }
    message += "\n";

    // Ask user to select application type for detailed information
    message += `🎯 Select Application Type for Detailed Information:\n\n`;
    message += `1️⃣ 🆕 New Application\n`;
    message += `2️⃣ 🔄 Update/Renewal\n`;
    message += `3️⃣ 🔍 Lost Certificate\n`;
    message += `4️⃣ 📤 Surrender Certificate\n\n`;

    message += `⬅️ ${translationService.translate(
      "navigation.back",
      language,
    )}`;
    message += `\n🏠 ${translationService.translate(
      "navigation.mainMenu",
      language,
    )}`;

    return await this.sendResponse(phoneNumber, message);
  }

  private async handleCertificateApplicationType(
    phoneNumber: string,
    messageText: string,
    session: UserSession,
  ): Promise<string> {
    const applicationTypes = [
      "New Application",
      "Update/Renewal",
      "Lost Certificate",
      "Surrender Certificate",
    ];
    const appTypeIndex = parseInt(messageText) - 1;

    if (appTypeIndex >= 0 && appTypeIndex < applicationTypes.length) {
      const selectedType = applicationTypes[appTypeIndex];

      // Get the certificate from session context
      const certificateId = parseInt(session.context?.serviceId || "0");

      try {
        const certificate = await this.databaseService.getCertificateById(
          certificateId,
        );

        if (!certificate) {
          const errorMsg = translationService.translate(
            "common.error",
            session.language,
          );
          return await this.sendResponse(phoneNumber, errorMsg);
        }

        return await this.sendCertificateDetailsByType(
          phoneNumber,
          certificate,
          selectedType,
          session.language,
        );
      } catch (error) {
        console.error("Error fetching certificate details:", error);
        const errorMsg = translationService.translate(
          "common.error",
          session.language,
        );
        return await this.sendResponse(phoneNumber, errorMsg);
      }
    } else {
      const invalidMsg = translationService.translate(
        "common.invalidOption",
        session.language,
      );
      return await this.sendResponse(phoneNumber, invalidMsg);
    }
  }

  private async sendCertificateDetailsByType(
    phoneNumber: string,
    certificate: ServiceData,
    applicationType: string,
    language: "en" | "bn",
  ): Promise<string> {
    let message = `📜 ${certificate.name}\n`;
    message += `🎯 Application Type: ${applicationType}\n\n`;

    // Debug logging
    console.log(`🔍 Debug - Application Type: "${applicationType}"`);
    console.log(
      `🔍 Debug - Available processSteps:`,
      certificate.processSteps?.map((s) => ({
        applicationType: s.applicationType,
        stepDetails: s.stepDetails,
      })),
    );
    console.log(
      `🔍 Debug - Available documents:`,
      certificate.documents?.map((d) => ({
        applicationType: d.applicationType,
        documentType: d.documentType,
      })),
    );
    console.log(
      `🔍 Debug - Available eligibilityItems:`,
      certificate.eligibilityItems?.map((e) => ({
        applicationType: e.applicationType,
        eligibilityDetail: e.eligibilityDetail,
      })),
    );
    console.log(
      `🔍 Debug - Available contacts:`,
      certificate.contacts?.map((c) => ({
        applicationType: c.applicationType,
        name: c.name,
      })),
    );

    // Process Steps based on application type
    const processSteps = certificate.processSteps?.filter(
      (step: any) => step.applicationType === applicationType,
    );

    if (processSteps && processSteps.length > 0) {
      message += `⚙️ Process Steps:\n`;
      processSteps
        .sort((a: any, b: any) => a.slNo - b.slNo)
        .forEach((step: any) => {
          message += `${step.slNo}. ${step.stepDetails}\n`;
        });
      message += "\n";
    } else {
      // Check if there are any general application process steps
      if (
        certificate.applicationProcess &&
        certificate.applicationProcess.length > 0
      ) {
        message += `⚙️ Process Steps:\n`;
        certificate.applicationProcess.forEach(
          (step: string, index: number) => {
            message += `${index + 1}. ${step}\n`;
          },
        );
        message += "\n";
      } else {
        message += `⚙️ Process Steps:\n❌ No data available\n\n`;
      }
    }

    // Required Documents based on application type
    const documents = certificate.documents?.filter(
      (doc: any) => doc.applicationType === applicationType,
    );

    if (documents && documents.length > 0) {
      message += `📄 Required Documents:\n`;
      documents
        .sort((a: any, b: any) => a.slNo - b.slNo)
        .forEach((doc: any) => {
          const required = doc.isRequired ? "✅ Required" : "⚪ Optional";
          message += `${doc.slNo}. ${doc.documentType}\n`;
          message += `   Valid Proof: ${doc.validProof}\n`;
          message += `   Status: ${required}\n\n`;
        });
    } else {
      // Check if there are any general required documents
      if (
        certificate.requiredDocuments &&
        certificate.requiredDocuments.length > 0
      ) {
        message += `📄 Required Documents:\n`;
        certificate.requiredDocuments.forEach((doc: string) => {
          message += `• ${doc}\n`;
        });
        message += "\n";
      } else {
        message += `📄 Required Documents:\n❌ No data available\n\n`;
      }
    }

    // Eligibility Criteria based on application type
    const eligibilityItems = certificate.eligibilityItems?.filter(
      (item: any) => item.applicationType === applicationType,
    );

    if (eligibilityItems && eligibilityItems.length > 0) {
      message += `✅ Eligibility Criteria:\n`;
      eligibilityItems.forEach((item: any) => {
        message += `• ${item.eligibilityDetail}\n`;
      });
      message += "\n";
    } else {
      // Check if there are any general eligibility details
      if (
        certificate.eligibilityDetails &&
        certificate.eligibilityDetails.length > 0
      ) {
        message += `✅ Eligibility Criteria:\n`;
        certificate.eligibilityDetails.forEach((detail: string) => {
          message += `• ${detail}\n`;
        });
        message += "\n";
      } else {
        message += `✅ Eligibility Criteria:\n❌ No data available\n\n`;
      }
    }

    // Specific process information
    let processInfo = "";
    switch (applicationType) {
      case "New Application":
        processInfo = certificate.processNew || "";
        break;
      case "Update/Renewal":
        processInfo = certificate.processUpdate || "";
        break;
      case "Lost Certificate":
        processInfo = certificate.processLost || "";
        break;
      case "Surrender Certificate":
        processInfo = certificate.processSurrender || "";
        break;
    }

    if (processInfo && processInfo.trim()) {
      message += `📋 Application Process:\n${processInfo}\n\n`;
    } else {
      message += `📋 Application Process:\n❌ No data available\n\n`;
    }

    // Contact Information based on application type
    const contacts = certificate.contacts?.filter(
      (contact: any) => contact.applicationType === applicationType,
    );

    if (contacts && contacts.length > 0) {
      message += `📞 Contact Information:\n`;
      contacts.forEach((contact: any, index: number) => {
        message += `\n${index + 1}. ${contact.name}\n`;
        message += `   📋 ${contact.designation}\n`;
        if (contact.serviceName) {
          message += `   🏢 Service: ${contact.serviceName}\n`;
        }
        message += `   📍 Location: ${contact.district}`;
        if (contact.subDistrict) message += `, ${contact.subDistrict}`;
        if (contact.block) message += `, ${contact.block}`;
        message += `\n   📞 ${contact.contact}\n`;
        if (contact.email) {
          message += `   ✉️ ${contact.email}\n`;
        }
      });
      message += "\n";
    } else {
      // Check if there are any general contacts
      const generalContacts = certificate.contacts?.filter(
        (contact: any) =>
          !contact.applicationType ||
          contact.applicationType === null ||
          contact.applicationType === "",
      );

      if (generalContacts && generalContacts.length > 0) {
        message += `📞 Contact Information:\n`;
        generalContacts.forEach((contact: any, index: number) => {
          message += `\n${index + 1}. ${contact.name}\n`;
          message += `   📋 ${contact.designation}\n`;
          message += `   📞 ${contact.contact}\n`;
          if (contact.email) {
            message += `   ✉️ ${contact.email}\n`;
          }
        });
        message += "\n";
      } else {
        message += `📞 Contact Information:\n❌ No data available\n\n`;
      }
    }

    // Application Mode and URLs
    message += `🌐 Application Mode: ${certificate.applicationMode}\n`;
    if (certificate.onlineUrl) {
      message += `🔗 Online Application: ${certificate.onlineUrl}\n`;
    }
    if (certificate.offlineAddress) {
      message += `🏢 Offline Address: ${certificate.offlineAddress}\n`;
    }

    message += `\n⬅️ ${translationService.translate(
      "navigation.back",
      language,
    )}`;
    message += `\n🏠 ${translationService.translate(
      "navigation.mainMenu",
      language,
    )}`;

    return await this.sendResponse(phoneNumber, message);
  }

  private async sendContactsList(
    phoneNumber: string,
    language: "en" | "bn",
  ): Promise<string> {
    try {
      const contacts = await this.databaseService.getActiveContactServices();
      const title = translationService.translate("contacts.title", language);
      const subtitle = translationService.translate(
        "contacts.subtitle",
        language,
      );

      if (contacts.length === 0) {
        const noContacts = translationService.translate(
          "contacts.noContacts",
          language,
        );
        return await this.sendResponse(
          phoneNumber,
          `${title}\n\n${noContacts}`,
        );
      }

      let message = `${title}\n\n${subtitle}\n\n`;
      contacts.forEach((contact, index) => {
        message += `${index + 1}️⃣ ${contact.serviceName}\n📍 ${
          contact.district
        } - ${contact.block}\n\n`;
      });

      message += `\n⬅️ ${translationService.translate(
        "navigation.back",
        language,
      )}`;

      return await this.sendResponse(phoneNumber, message);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      const errorMsg = translationService.translate("common.error", language);
      return await this.sendResponse(phoneNumber, errorMsg);
    }
  }

  private async handleContactsMenu(
    phoneNumber: string,
    messageText: string,
    session: UserSession,
  ): Promise<string> {
    const contactIndex = parseInt(messageText) - 1;

    try {
      const contacts = await this.databaseService.getActiveContactServices();

      if (contactIndex >= 0 && contactIndex < contacts.length) {
        const contact = contacts[contactIndex];
        this.sessionManager.setServiceContext(
          phoneNumber,
          "contact",
          contact.id.toString(),
        );
        this.sessionManager.setCurrentMenu(phoneNumber, "contact_details");
        return await this.sendContactDetails(
          phoneNumber,
          contact,
          session.language,
        );
      } else {
        const invalidMsg = translationService.translate(
          "common.invalidOption",
          session.language,
        );
        return await this.sendResponse(phoneNumber, invalidMsg);
      }
    } catch (error) {
      console.error("Error handling contacts menu:", error);
      const errorMsg = translationService.translate(
        "common.error",
        session.language,
      );
      return await this.sendResponse(phoneNumber, errorMsg);
    }
  }

  private async sendContactDetails(
    phoneNumber: string,
    contact: any,
    language: "en" | "bn",
  ): Promise<string> {
    const translations = translationService.getTranslationObject(
      "contacts",
      language,
    );

    let message = `📞 ${contact.serviceName}\n\n`;
    message += `📍 ${translations.district} ${contact.district}\n`;
    message += `📍 ${translations.block} ${contact.block}\n`;

    if (contact.officeAddress) {
      message += `🏢 ${translations.office} ${contact.officeAddress}\n`;
    }

    message += "\n👥 Contact Information:\n";

    if (contact.contacts && contact.contacts.length > 0) {
      contact.contacts.forEach((contactPerson: any, index: number) => {
        message += `\n${index + 1}. ${contactPerson.name}\n`;
        message += `   ${translations.designation} ${contactPerson.designation}\n`;
        message += `   📞 ${contactPerson.contact}\n`;
        if (contactPerson.email) {
          message += `   ✉️ ${contactPerson.email}\n`;
        }
      });
    }

    message += `\n⬅️ ${translationService.translate(
      "navigation.back",
      language,
    )}`;
    message += `\n🏠 ${translationService.translate(
      "navigation.mainMenu",
      language,
    )}`;

    return await this.sendResponse(phoneNumber, message);
  }

  private async sendGrievanceForm(
    phoneNumber: string,
    language: "en" | "bn",
  ): Promise<string> {
    const session = this.sessionManager.getSession(phoneNumber);
    const step = session?.context?.step || 1;
    const title = translationService.translate("grievances.title", language);
    const subtitle = translationService.translate(
      "grievances.subtitle",
      language,
    );
    const form = translationService.getTranslationObject(
      "grievances.form",
      language,
    );

    switch (step) {
      case 1:
        return await this.sendResponse(
          phoneNumber,
          `${title}\n\n${subtitle}\n\n${form.name}`,
        );
      case 2:
        return await this.sendResponse(phoneNumber, form.email);
      case 3:
        return await this.sendResponse(phoneNumber, form.phone);
      case 4:
        return await this.sendResponse(phoneNumber, form.subject);
      case 5:
        return await this.sendResponse(phoneNumber, form.description);
      case 6:
        const departments = await this.databaseService.getDepartments();
        let deptMessage = `${form.department}\n\n`;
        departments.forEach((dept, index) => {
          deptMessage += `${index + 1}️⃣ ${dept}\n`;
        });
        return await this.sendResponse(phoneNumber, deptMessage);
      case 7:
        const priorities = translationService.getTranslationObject(
          "grievances.priorities",
          language,
        );
        return await this.sendResponse(
          phoneNumber,
          `${form.priority}\n\n1️⃣ ${priorities.low}\n2️⃣ ${priorities.medium}\n3️⃣ ${priorities.high}`,
        );
      default:
        return await this.sendMainMenu(phoneNumber, language);
    }
  }

  private async handleGrievanceForm(
    phoneNumber: string,
    messageText: string,
    session: UserSession,
  ): Promise<string> {
    const step = session.context?.step || 1;
    const formData = session.context?.formData || {};

    try {
      switch (step) {
        case 1:
          this.sessionManager.setFormData(phoneNumber, { name: messageText });
          this.sessionManager.setFormStep(phoneNumber, 2);
          return await this.sendGrievanceForm(phoneNumber, session.language);

        case 2:
          if (this.isValidEmail(messageText)) {
            this.sessionManager.setFormData(phoneNumber, {
              email: messageText,
            });
            this.sessionManager.setFormStep(phoneNumber, 3);
            return await this.sendGrievanceForm(phoneNumber, session.language);
          } else {
            return await this.sendResponse(
              phoneNumber,
              "Please enter a valid email address.",
            );
          }

        case 3:
          if (this.isValidPhone(messageText)) {
            this.sessionManager.setFormData(phoneNumber, {
              phone: messageText,
            });
            this.sessionManager.setFormStep(phoneNumber, 4);
            return await this.sendGrievanceForm(phoneNumber, session.language);
          } else {
            return await this.sendResponse(
              phoneNumber,
              "Please enter a valid phone number.",
            );
          }

        case 4:
          this.sessionManager.setFormData(phoneNumber, {
            subject: messageText,
          });
          this.sessionManager.setFormStep(phoneNumber, 5);
          return await this.sendGrievanceForm(phoneNumber, session.language);

        case 5:
          this.sessionManager.setFormData(phoneNumber, {
            description: messageText,
          });
          this.sessionManager.setFormStep(phoneNumber, 6);
          return await this.sendGrievanceForm(phoneNumber, session.language);

        case 6:
          const departments = await this.databaseService.getDepartments();
          const deptIndex = parseInt(messageText) - 1;
          if (deptIndex >= 0 && deptIndex < departments.length) {
            this.sessionManager.setFormData(phoneNumber, {
              department: departments[deptIndex],
            });
            this.sessionManager.setFormStep(phoneNumber, 7);
            return await this.sendGrievanceForm(phoneNumber, session.language);
          } else {
            return await this.sendResponse(
              phoneNumber,
              translationService.translate(
                "common.invalidOption",
                session.language,
              ),
            );
          }

        case 7:
          const priorities = ["low", "medium", "high"];
          const priorityIndex = parseInt(messageText) - 1;
          if (priorityIndex >= 0 && priorityIndex < priorities.length) {
            const finalFormData = {
              ...session.context?.formData,
              priority: priorities[priorityIndex],
            };

            const referenceId = await this.databaseService.submitGrievance(
              finalFormData,
            );
            this.sessionManager.resetToMainMenu(phoneNumber);

            const successMsg = translationService.translate(
              "grievances.success",
              session.language,
            );
            return await this.sendResponse(
              phoneNumber,
              `${successMsg}${referenceId}`,
            );
          } else {
            return await this.sendResponse(
              phoneNumber,
              translationService.translate(
                "common.invalidOption",
                session.language,
              ),
            );
          }

        default:
          return await this.sendMainMenu(phoneNumber, session.language);
      }
    } catch (error) {
      console.error("Error handling grievance form:", error);
      const errorMsg = translationService.translate(
        "grievances.error",
        session.language,
      );
      return await this.sendResponse(phoneNumber, errorMsg);
    }
  }

  private async sendFeedbackForm(
    phoneNumber: string,
    language: "en" | "bn",
  ): Promise<string> {
    const session = this.sessionManager.getSession(phoneNumber);
    const step = session?.context?.step || 1;
    const title = translationService.translate("feedback.title", language);
    const subtitle = translationService.translate(
      "feedback.subtitle",
      language,
    );
    const form = translationService.getTranslationObject(
      "feedback.form",
      language,
    );

    switch (step) {
      case 1:
        return await this.sendResponse(
          phoneNumber,
          `${title}\n\n${subtitle}\n\n${form.name}`,
        );
      case 2:
        return await this.sendResponse(phoneNumber, form.rating);
      case 3:
        return await this.sendResponse(phoneNumber, form.comment);
      case 4:
        return await this.sendResponse(
          phoneNumber,
          `${form.serviceType}\n\n1️⃣ Scheme Services\n2️⃣ Certificate Services\n3️⃣ Contact Services\n4️⃣ General Services`,
        );
      case 5:
        return await this.sendResponse(
          phoneNumber,
          `${form.email}\n\nType 'skip' to skip this field.`,
        );
      case 6:
        return await this.sendResponse(
          phoneNumber,
          `${form.phone}\n\nType 'skip' to skip this field.`,
        );
      default:
        return await this.sendMainMenu(phoneNumber, language);
    }
  }

  private async handleFeedbackForm(
    phoneNumber: string,
    messageText: string,
    session: UserSession,
  ): Promise<string> {
    const step = session.context?.step || 1;

    try {
      switch (step) {
        case 1:
          this.sessionManager.setFormData(phoneNumber, { name: messageText });
          this.sessionManager.setFormStep(phoneNumber, 2);
          return await this.sendFeedbackForm(phoneNumber, session.language);

        case 2:
          const rating = parseInt(messageText);
          if (rating >= 1 && rating <= 5) {
            this.sessionManager.setFormData(phoneNumber, { rating });
            this.sessionManager.setFormStep(phoneNumber, 3);
            return await this.sendFeedbackForm(phoneNumber, session.language);
          } else {
            return await this.sendResponse(
              phoneNumber,
              "Please enter a rating between 1 and 5.",
            );
          }

        case 3:
          this.sessionManager.setFormData(phoneNumber, {
            comment: messageText,
          });
          this.sessionManager.setFormStep(phoneNumber, 4);
          return await this.sendFeedbackForm(phoneNumber, session.language);

        case 4:
          const serviceTypes = [
            "Scheme Services",
            "Certificate Services",
            "Contact Services",
            "General Services",
          ];
          const serviceIndex = parseInt(messageText) - 1;
          if (serviceIndex >= 0 && serviceIndex < serviceTypes.length) {
            this.sessionManager.setFormData(phoneNumber, {
              serviceType: serviceTypes[serviceIndex],
            });
            this.sessionManager.setFormStep(phoneNumber, 5);
            return await this.sendFeedbackForm(phoneNumber, session.language);
          } else {
            return await this.sendResponse(
              phoneNumber,
              translationService.translate(
                "common.invalidOption",
                session.language,
              ),
            );
          }

        case 5:
          if (messageText.toLowerCase() === "skip") {
            this.sessionManager.setFormStep(phoneNumber, 6);
            return await this.sendFeedbackForm(phoneNumber, session.language);
          } else if (this.isValidEmail(messageText)) {
            this.sessionManager.setFormData(phoneNumber, {
              email: messageText,
            });
            this.sessionManager.setFormStep(phoneNumber, 6);
            return await this.sendFeedbackForm(phoneNumber, session.language);
          } else {
            return await this.sendResponse(
              phoneNumber,
              'Please enter a valid email address or type "skip".',
            );
          }

        case 6:
          let finalFormData = session.context?.formData || {};

          if (messageText.toLowerCase() !== "skip") {
            if (this.isValidPhone(messageText)) {
              finalFormData.phone = messageText;
            } else {
              return await this.sendResponse(
                phoneNumber,
                'Please enter a valid phone number or type "skip".',
              );
            }
          }

          await this.databaseService.submitFeedback(finalFormData);
          this.sessionManager.resetToMainMenu(phoneNumber);

          const successMsg = translationService.translate(
            "feedback.success",
            session.language,
          );
          return await this.sendResponse(phoneNumber, successMsg);

        default:
          return await this.sendMainMenu(phoneNumber, session.language);
      }
    } catch (error) {
      console.error("Error handling feedback form:", error);
      const errorMsg = translationService.translate(
        "feedback.error",
        session.language,
      );
      return await this.sendResponse(phoneNumber, errorMsg);
    }
  }

  private async handleBackNavigation(
    phoneNumber: string,
    session: UserSession,
  ): Promise<string> {
    switch (session.currentMenu) {
      case "schemes_list":
      case "certificates_list":
      case "contacts_list":
      case "grievance_form":
      case "feedback_form":
        this.sessionManager.resetToMainMenu(phoneNumber);
        return await this.sendMainMenu(phoneNumber, session.language);

      case "scheme_details":
        this.sessionManager.setCurrentMenu(phoneNumber, "schemes_list");
        return await this.sendSchemesList(phoneNumber, session.language);

      case "certificate_details":
        this.sessionManager.setCurrentMenu(phoneNumber, "certificates_list");
        return await this.sendCertificatesList(phoneNumber, session.language);

      case "contact_details":
        this.sessionManager.setCurrentMenu(phoneNumber, "contacts_list");
        return await this.sendContactsList(phoneNumber, session.language);

      default:
        return await this.sendMainMenu(phoneNumber, session.language);
    }
  }

  private async sendHelp(
    phoneNumber: string,
    language: "en" | "bn",
  ): Promise<string> {
    const help = translationService.getTranslationObject("help", language);
    return await this.sendResponse(
      phoneNumber,
      `${help.title}\n${help.content}`,
    );
  }

  private async handleSchemeDetails(
    phoneNumber: string,
    messageText: string,
    session: UserSession,
  ): Promise<string> {
    if (messageText === "back" || messageText === "⬅️") {
      return await this.handleBackNavigation(phoneNumber, session);
    }
    return await this.sendMainMenu(phoneNumber, session.language);
  }

  private async handleCertificateDetails(
    phoneNumber: string,
    messageText: string,
    session: UserSession,
  ): Promise<string> {
    if (messageText === "back" || messageText === "⬅️") {
      return await this.handleBackNavigation(phoneNumber, session);
    }
    return await this.sendMainMenu(phoneNumber, session.language);
  }

  private async handleContactDetails(
    phoneNumber: string,
    messageText: string,
    session: UserSession,
  ): Promise<string> {
    if (messageText === "back" || messageText === "⬅️") {
      return await this.handleBackNavigation(phoneNumber, session);
    }
    return await this.sendMainMenu(phoneNumber, session.language);
  }

  private async sendResponse(
    phoneNumber: string,
    message: string,
  ): Promise<string> {
    // Send via WhatsApp if service is available
    if (this.whatsappService) {
      try {
        await this.whatsappService.sendTextMessage(phoneNumber, message);
      } catch (error) {
        console.error("❌ Error sending WhatsApp message:", error);
      }
    }

    // Also log for testing/debugging
    console.log(`📤 Sending to ${phoneNumber}: ${message}`);
    return message;
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private isValidPhone(phone: string): boolean {
    const phoneRegex = /^[\+]?[1-9][\d]{7,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  }
}
