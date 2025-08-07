import axios from "axios";
import { WhatsAppWebhookData, WhatsAppMessage } from "../types";
import { MessageHandler } from "../handlers/messageHandler";

export class WhatsAppBotService {
  private readonly accessToken: string;
  private readonly phoneNumberId: string;
  private readonly apiVersion = "v18.0";
  private readonly apiUrl: string;

  constructor(private messageHandler: MessageHandler) {
    this.accessToken = process.env.WHATSAPP_ACCESS_TOKEN || "";
    this.phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID || "";
    this.apiUrl = `https://graph.facebook.com/${this.apiVersion}/${this.phoneNumberId}`;

    if (!this.accessToken || !this.phoneNumberId) {
      throw new Error("WhatsApp API credentials not configured properly");
    }

    // Set reference to this service in message handler
    this.messageHandler.setWhatsAppService(this);
  }

  // Handle incoming messages from webhook
  async handleIncomingMessages(
    webhookData: WhatsAppWebhookData,
  ): Promise<void> {
    try {
      if (!webhookData.messages) {
        console.log("📭 No messages in webhook data");
        return;
      }

      for (const message of webhookData.messages) {
        console.log(
          `📩 Processing message from ${message.from}: ${message.text?.body}`,
        );
        await this.messageHandler.handleMessage(message);
      }
    } catch (error) {
      console.error("❌ Error handling incoming messages:", error);
    }
  }

  // Send text message
  async sendTextMessage(to: string, text: string): Promise<boolean> {
    try {
      const payload = {
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: {
          body: text,
        },
      };

      const response = await axios.post(`${this.apiUrl}/messages`, payload, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "application/json",
        },
      });

      console.log(`✅ Text message sent to ${to}`);
      return response.status === 200;
    } catch (error) {
      console.error("❌ Error sending text message:", error);
      return false;
    }
  }

  // Send interactive button message
  async sendButtonMessage(
    to: string,
    text: string,
    buttons: Array<{ id: string; title: string }>,
  ): Promise<boolean> {
    try {
      if (buttons.length > 3) {
        console.warn(
          "⚠️ WhatsApp only supports up to 3 buttons, truncating...",
        );
        buttons = buttons.slice(0, 3);
      }

      const payload = {
        messaging_product: "whatsapp",
        to,
        type: "interactive",
        interactive: {
          type: "button",
          body: {
            text,
          },
          action: {
            buttons: buttons.map((button) => ({
              type: "reply",
              reply: {
                id: button.id,
                title: button.title.substring(0, 20), // WhatsApp button title limit
              },
            })),
          },
        },
      };

      const response = await axios.post(`${this.apiUrl}/messages`, payload, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "application/json",
        },
      });

      console.log(`✅ Button message sent to ${to}`);
      return response.status === 200;
    } catch (error) {
      console.error("❌ Error sending button message:", error);
      return false;
    }
  }

  // Send interactive list message
  async sendListMessage(
    to: string,
    text: string,
    buttonText: string,
    sections: Array<{
      title: string;
      rows: Array<{ id: string; title: string; description?: string }>;
    }>,
  ): Promise<boolean> {
    try {
      const payload = {
        messaging_product: "whatsapp",
        to,
        type: "interactive",
        interactive: {
          type: "list",
          body: {
            text,
          },
          action: {
            button: buttonText,
            sections: sections.map((section) => ({
              title: section.title,
              rows: section.rows.map((row) => ({
                id: row.id,
                title: row.title.substring(0, 24), // WhatsApp title limit
                description: row.description?.substring(0, 72), // WhatsApp description limit
              })),
            })),
          },
        },
      };

      const response = await axios.post(`${this.apiUrl}/messages`, payload, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "application/json",
        },
      });

      console.log(`✅ List message sent to ${to}`);
      return response.status === 200;
    } catch (error) {
      console.error("❌ Error sending list message:", error);
      return false;
    }
  }

  // Send template message (for notifications)
  async sendTemplateMessage(
    to: string,
    templateName: string,
    languageCode: string = "en",
  ): Promise<boolean> {
    try {
      const payload = {
        messaging_product: "whatsapp",
        to,
        type: "template",
        template: {
          name: templateName,
          language: {
            code: languageCode,
          },
        },
      };

      const response = await axios.post(`${this.apiUrl}/messages`, payload, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "application/json",
        },
      });

      console.log(`✅ Template message sent to ${to}`);
      return response.status === 200;
    } catch (error) {
      console.error("❌ Error sending template message:", error);
      return false;
    }
  }

  // Mark message as read
  async markMessageAsRead(messageId: string): Promise<boolean> {
    try {
      const payload = {
        messaging_product: "whatsapp",
        status: "read",
        message_id: messageId,
      };

      const response = await axios.post(`${this.apiUrl}/messages`, payload, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "application/json",
        },
      });

      return response.status === 200;
    } catch (error) {
      console.error("❌ Error marking message as read:", error);
      return false;
    }
  }

  // Send typing indicator
  async sendTypingIndicator(to: string): Promise<boolean> {
    try {
      const payload = {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to,
        type: "text",
        text: {
          body: "⏳",
        },
      };

      const response = await axios.post(`${this.apiUrl}/messages`, payload, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "application/json",
        },
      });

      return response.status === 200;
    } catch (error) {
      console.error("❌ Error sending typing indicator:", error);
      return false;
    }
  }

  // Validate webhook signature (for security)
  validateWebhookSignature(payload: string, signature: string): boolean {
    const crypto = require("crypto");
    const expectedSignature = crypto
      .createHmac("sha256", process.env.WHATSAPP_WEBHOOK_SECRET || "")
      .update(payload, "utf8")
      .digest("hex");

    return signature === `sha256=${expectedSignature}`;
  }

  // Get phone number info
  async getPhoneNumberInfo(): Promise<any> {
    try {
      const response = await axios.get(`${this.apiUrl}`, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error("❌ Error getting phone number info:", error);
      return null;
    }
  }

  // Health check for WhatsApp API
  async healthCheck(): Promise<boolean> {
    try {
      const info = await this.getPhoneNumberInfo();
      return info !== null;
    } catch (error) {
      console.error("❌ WhatsApp API health check failed:", error);
      return false;
    }
  }
}
