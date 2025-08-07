import express from "express";
import dotenv from "dotenv";
import { WhatsAppBotService } from "./services/whatsappService";
import { SessionManager } from "./services/sessionService";
import { DatabaseService } from "./services/databaseService";
import { MessageHandler } from "./handlers/messageHandler";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize services
const databaseService = new DatabaseService();
const sessionManager = new SessionManager();
const messageHandler = new MessageHandler(databaseService, sessionManager);
const whatsappService = new WhatsAppBotService(messageHandler);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "WhatsApp Government Services Bot",
    version: process.env.BOT_VERSION || "1.0.0",
  });
});

// WhatsApp webhook verification
app.get("/webhook", (req, res) => {
  const verifyToken = process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN;
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token) {
    if (mode === "subscribe" && token === verifyToken) {
      console.log("✅ Webhook verified successfully");
      res.status(200).send(challenge);
    } else {
      console.log("❌ Webhook verification failed");
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(400);
  }
});

// WhatsApp webhook for receiving messages
app.post("/webhook", async (req, res) => {
  try {
    console.log("📩 Received webhook:", JSON.stringify(req.body, null, 2));

    const body = req.body;

    // Check if it's a WhatsApp message
    if (body.object === "whatsapp_business_account") {
      if (
        body.entry &&
        body.entry[0] &&
        body.entry[0].changes &&
        body.entry[0].changes[0]
      ) {
        const change = body.entry[0].changes[0];

        if (change.field === "messages" && change.value.messages) {
          // Process incoming messages
          await whatsappService.handleIncomingMessages(change.value);
        }
      }
    }

    res.status(200).send("EVENT_RECEIVED");
  } catch (error) {
    console.error("❌ Error processing webhook:", error);
    res.status(500).send("ERROR");
  }
});

// Start server
app.listen(PORT, async () => {
  console.log(`🚀 WhatsApp Government Services Bot is running on port ${PORT}`);
  console.log(`📱 Bot Name: ${process.env.BOT_NAME}`);
  console.log(`🔗 Webhook URL: http://localhost:${PORT}/webhook`);

  try {
    // Test database connection
    await databaseService.testConnection();
    console.log("✅ Database connection successful");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
});

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("\n🛑 Shutting down WhatsApp Bot...");
  await sessionManager.cleanup();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("\n🛑 Shutting down WhatsApp Bot...");
  await sessionManager.cleanup();
  process.exit(0);
});

export default app;
