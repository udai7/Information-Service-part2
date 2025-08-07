/**
 * Utility functions for the WhatsApp Bot
 */

// Format phone number to international format
export function formatPhoneNumber(phone: string): string {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, "");

  // Add country code if missing (assuming India +91)
  if (cleaned.length === 10) {
    return `91${cleaned}`;
  }

  // Remove leading + if present
  if (cleaned.startsWith("91") && cleaned.length === 12) {
    return cleaned;
  }

  return cleaned;
}

// Truncate text to fit WhatsApp message limits
export function truncateText(text: string, maxLength: number = 4096): string {
  if (text.length <= maxLength) {
    return text;
  }

  return text.substring(0, maxLength - 3) + "...";
}

// Format message with emojis and structure
export function formatMessage(
  title: string,
  content: string,
  footer?: string,
): string {
  let message = `*${title}*\n\n${content}`;

  if (footer) {
    message += `\n\n${footer}`;
  }

  return message;
}

// Extract numbers from text for menu selection
export function extractNumber(text: string): number | null {
  const match = text.match(/\d+/);
  return match ? parseInt(match[0]) : null;
}

// Check if text is a command
export function isCommand(text: string): boolean {
  const commands = [
    "start",
    "menu",
    "help",
    "back",
    "lang",
    "language",
    "main",
    "hi",
    "hello",
  ];
  return commands.includes(text.toLowerCase());
}

// Validate input data
export class Validator {
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static isValidPhone(phone: string): boolean {
    const cleaned = phone.replace(/\D/g, "");
    return cleaned.length >= 10 && cleaned.length <= 15;
  }

  static isValidRating(rating: string): boolean {
    const num = parseInt(rating);
    return !isNaN(num) && num >= 1 && num <= 5;
  }

  static isValidName(name: string): boolean {
    return name.trim().length >= 2 && name.trim().length <= 100;
  }

  static isValidText(
    text: string,
    minLength: number = 1,
    maxLength: number = 1000,
  ): boolean {
    const trimmed = text.trim();
    return trimmed.length >= minLength && trimmed.length <= maxLength;
  }
}

// Rate limiting utility
export class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  private readonly windowMs: number;
  private readonly maxRequests: number;

  constructor(windowMs: number = 60000, maxRequests: number = 10) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
  }

  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const userRequests = this.requests.get(identifier) || [];

    // Remove old requests outside the window
    const validRequests = userRequests.filter(
      (time) => now - time < this.windowMs,
    );

    if (validRequests.length >= this.maxRequests) {
      return false;
    }

    // Add current request
    validRequests.push(now);
    this.requests.set(identifier, validRequests);

    return true;
  }

  getRemainingRequests(identifier: string): number {
    const now = Date.now();
    const userRequests = this.requests.get(identifier) || [];
    const validRequests = userRequests.filter(
      (time) => now - time < this.windowMs,
    );

    return Math.max(0, this.maxRequests - validRequests.length);
  }

  getResetTime(identifier: string): number {
    const userRequests = this.requests.get(identifier) || [];
    if (userRequests.length === 0) return 0;

    const oldestRequest = Math.min(...userRequests);
    return oldestRequest + this.windowMs;
  }
}

// Message formatting utilities
export class MessageFormatter {
  static createList(items: string[], numbered: boolean = true): string {
    return items
      .map((item, index) => {
        const prefix = numbered ? `${index + 1}️⃣` : "•";
        return `${prefix} ${item}`;
      })
      .join("\n");
  }

  static createButtonList(
    buttons: Array<{ id: string; title: string; description?: string }>,
  ): string {
    return buttons
      .map((button, index) => {
        let line = `${index + 1}️⃣ ${button.title}`;
        if (button.description) {
          line += `\n   ${button.description}`;
        }
        return line;
      })
      .join("\n\n");
  }

  static createContactCard(contact: any): string {
    let card = `👤 *${contact.name}*\n`;
    if (contact.designation) card += `💼 ${contact.designation}\n`;
    if (contact.phone || contact.contact)
      card += `📞 ${contact.phone || contact.contact}\n`;
    if (contact.email) card += `✉️ ${contact.email}\n`;
    if (contact.office || contact.officeAddress)
      card += `🏢 ${contact.office || contact.officeAddress}\n`;

    return card;
  }

  static createServiceCard(service: any): string {
    let card = `📋 *${service.name}*\n\n`;
    card += `${service.summary}\n\n`;

    if (service.targetAudience && service.targetAudience.length > 0) {
      card += `👥 *Target Audience:* ${service.targetAudience.join(", ")}\n`;
    }

    if (service.applicationMode) {
      card += `💻 *Application:* ${service.applicationMode}\n`;
    }

    return card;
  }

  static addNavigationFooter(
    message: string,
    language: "en" | "bn" = "en",
  ): string {
    const backText = language === "bn" ? "⬅️ পিছনে" : "⬅️ Back";
    const menuText = language === "bn" ? "🏠 প্রধান মেনু" : "🏠 Main Menu";

    return `${message}\n\n${backText} | ${menuText}`;
  }
}

// Time utilities
export class TimeUtils {
  static formatDuration(ms: number): string {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);

    if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    }
    return `${seconds}s`;
  }

  static isBusinessHours(): boolean {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay();

    // Monday to Friday, 9 AM to 6 PM
    return day >= 1 && day <= 5 && hour >= 9 && hour < 18;
  }

  static getBusinessHoursMessage(language: "en" | "bn" = "en"): string {
    if (language === "bn") {
      return "অফিস সময়: সোমবার থেকে শুক্রবার, সকাল ৯টা থেকে সন্ধ্যা ৬টা";
    }
    return "Office Hours: Monday to Friday, 9 AM to 6 PM";
  }
}

// Logging utility
export class Logger {
  private static logToConsole(
    level: string,
    message: string,
    data?: any,
  ): void {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${level}: ${message}`, data || "");
  }

  static info(message: string, data?: any): void {
    this.logToConsole("INFO", message, data);
  }

  static warn(message: string, data?: any): void {
    this.logToConsole("WARN", message, data);
  }

  static error(message: string, error?: any): void {
    this.logToConsole("ERROR", message, error);
  }

  static debug(message: string, data?: any): void {
    if (process.env.NODE_ENV === "development") {
      this.logToConsole("DEBUG", message, data);
    }
  }
}

// Error handling
export class BotError extends Error {
  constructor(
    message: string,
    public code: string = "GENERAL_ERROR",
    public userMessage?: string,
  ) {
    super(message);
    this.name = "BotError";
  }
}

export class ValidationError extends BotError {
  constructor(message: string, userMessage?: string) {
    super(message, "VALIDATION_ERROR", userMessage);
    this.name = "ValidationError";
  }
}

export class DatabaseError extends BotError {
  constructor(message: string, userMessage?: string) {
    super(message, "DATABASE_ERROR", userMessage);
    this.name = "DatabaseError";
  }
}

export class WhatsAppAPIError extends BotError {
  constructor(message: string, userMessage?: string) {
    super(message, "WHATSAPP_API_ERROR", userMessage);
    this.name = "WhatsAppAPIError";
  }
}
