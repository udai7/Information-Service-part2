import NodeCache from "node-cache";
import { UserSession } from "../types";

export class SessionManager {
  private cache: NodeCache;
  private readonly SESSION_TTL = 30 * 60; // 30 minutes in seconds

  constructor() {
    this.cache = new NodeCache({
      stdTTL: this.SESSION_TTL,
      checkperiod: 60, // Check every minute for expired sessions
      useClones: false,
    });

    // Setup cleanup event
    this.cache.on("expired", (key: string) => {
      console.log(`🕒 Session expired for user: ${key}`);
    });
  }

  // Create or update user session
  createSession(
    phoneNumber: string,
    language: "en" | "bn" = "en",
  ): UserSession {
    const session: UserSession = {
      phoneNumber,
      language,
      currentMenu: "language_selection",
      lastActivity: new Date(),
      context: {},
    };

    this.cache.set(phoneNumber, session);
    console.log(`✅ Session created for user: ${phoneNumber}`);
    return session;
  }

  // Get user session
  getSession(phoneNumber: string): UserSession | null {
    const session = this.cache.get<UserSession>(phoneNumber);

    if (session) {
      // Update last activity
      session.lastActivity = new Date();
      this.cache.set(phoneNumber, session);
      return session;
    }

    return null;
  }

  // Update user session
  updateSession(
    phoneNumber: string,
    updates: Partial<UserSession>,
  ): UserSession | null {
    const session = this.getSession(phoneNumber);

    if (session) {
      const updatedSession = {
        ...session,
        ...updates,
        lastActivity: new Date(),
      };

      this.cache.set(phoneNumber, updatedSession);
      console.log(
        `🔄 Session updated for user: ${phoneNumber}, menu: ${updatedSession.currentMenu}`,
      );
      return updatedSession;
    }

    return null;
  }

  // Set user language
  setLanguage(phoneNumber: string, language: "en" | "bn"): boolean {
    const session = this.getSession(phoneNumber);

    if (session) {
      session.language = language;
      session.lastActivity = new Date();
      this.cache.set(phoneNumber, session);
      console.log(`🌐 Language set to ${language} for user: ${phoneNumber}`);
      return true;
    }

    return false;
  }

  // Set current menu/state
  setCurrentMenu(phoneNumber: string, menu: string): boolean {
    const session = this.getSession(phoneNumber);

    if (session) {
      session.currentMenu = menu;
      session.lastActivity = new Date();
      this.cache.set(phoneNumber, session);
      console.log(`📱 Menu changed to ${menu} for user: ${phoneNumber}`);
      return true;
    }

    return false;
  }

  // Set current service context
  setServiceContext(
    phoneNumber: string,
    serviceType: string,
    serviceId?: string,
  ): boolean {
    const session = this.getSession(phoneNumber);

    if (session) {
      session.context = {
        ...session.context,
        serviceType: serviceType as any,
        serviceId,
      };
      session.lastActivity = new Date();
      this.cache.set(phoneNumber, session);
      console.log(
        `🎯 Service context set for user: ${phoneNumber}, type: ${serviceType}, id: ${serviceId}`,
      );
      return true;
    }

    return false;
  }

  // Set form data for grievance/feedback
  setFormData(phoneNumber: string, formData: any): boolean {
    const session = this.getSession(phoneNumber);

    if (session) {
      session.context = {
        ...session.context,
        formData: {
          ...session.context?.formData,
          ...formData,
        },
      };
      session.lastActivity = new Date();
      this.cache.set(phoneNumber, session);
      console.log(`📝 Form data updated for user: ${phoneNumber}`);
      return true;
    }

    return false;
  }

  // Set form step
  setFormStep(phoneNumber: string, step: number): boolean {
    const session = this.getSession(phoneNumber);

    if (session) {
      session.context = {
        ...session.context,
        step,
      };
      session.lastActivity = new Date();
      this.cache.set(phoneNumber, session);
      console.log(`📊 Form step set to ${step} for user: ${phoneNumber}`);
      return true;
    }

    return false;
  }

  // Clear user session
  clearSession(phoneNumber: string): boolean {
    const result = this.cache.del(phoneNumber);
    if (result > 0) {
      console.log(`🗑️ Session cleared for user: ${phoneNumber}`);
      return true;
    }
    return false;
  }

  // Get session statistics
  getSessionStats(): { activeUsers: number; totalSessions: number } {
    const keys = this.cache.keys();
    return {
      activeUsers: keys.length,
      totalSessions: keys.length,
    };
  }

  // Check if session exists and is valid
  isValidSession(phoneNumber: string): boolean {
    return this.cache.has(phoneNumber);
  }

  // Extend session TTL
  extendSession(phoneNumber: string): boolean {
    const session = this.getSession(phoneNumber);
    if (session) {
      this.cache.ttl(phoneNumber, this.SESSION_TTL);
      console.log(`⏰ Session extended for user: ${phoneNumber}`);
      return true;
    }
    return false;
  }

  // Get all active sessions (for admin purposes)
  getAllActiveSessions(): UserSession[] {
    const keys = this.cache.keys();
    return keys
      .map((key) => this.cache.get<UserSession>(key))
      .filter((session): session is UserSession => session !== undefined);
  }

  // Reset user to main menu
  resetToMainMenu(phoneNumber: string): boolean {
    const session = this.getSession(phoneNumber);

    if (session) {
      session.currentMenu = "main_menu";
      session.currentService = undefined;
      session.currentStep = undefined;
      session.context = {};
      session.lastActivity = new Date();
      this.cache.set(phoneNumber, session);
      console.log(`🏠 User reset to main menu: ${phoneNumber}`);
      return true;
    }

    return false;
  }

  // Clean up expired sessions manually
  async cleanup(): Promise<void> {
    console.log("🧹 Cleaning up expired sessions...");
    this.cache.flushAll();
    console.log("✅ Session cleanup completed");
  }

  // Get session TTL
  getSessionTTL(phoneNumber: string): number {
    const ttl = this.cache.getTtl(phoneNumber);
    return ttl || 0;
  }
}
