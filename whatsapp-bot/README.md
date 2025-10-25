# WhatsApp Government Services Bot

A comprehensive WhatsApp bot that provides government services in English and Bengali languages. Users can browse schemes, certificates, contacts, submit grievances, and provide feedback through WhatsApp messaging.

## 🌟 Features

### Core Capabilities

- 🌐 **Bilingual Support**: Seamless switching between English and Bengali
- 📊 **Scheme Services**: Browse and view government scheme details with pagination
- 📜 **Certificate Services**: Access certificate information and application processes
- 📞 **Contact Directory**: Find government office contacts by department
- 📝 **Grievance System**: Submit complaints and track their status
- 💬 **Feedback System**: Provide service feedback with ratings
- 🆘 **Emergency Services**: Quick access to emergency contact numbers
- 🔒 **Session Management**: Maintains user context and conversation state
- 📱 **WhatsApp Business API**: Official Meta API integration

### User Experience

- Interactive menu-driven navigation
- Contextual responses based on user selection
- Back/Main menu options at every step
- Error handling with helpful messages
- Session timeout management (30 minutes)
- User-friendly message formatting

## 🏗️ Architecture

### Technology Stack

- **Language**: TypeScript
- **Runtime**: Node.js 18+
- **Database**: PostgreSQL with Prisma ORM
- **Framework**: Express.js for webhook handling
- **API**: WhatsApp Business API (Graph API)
- **Caching**: Node-Cache for session management
- **HTTP Client**: Axios for API calls

### Project Structure

```
whatsapp-bot/
├── src/
│   ├── handlers/           # Message and event handlers
│   │   ├── messageHandler.ts
│   │   ├── schemeHandler.ts
│   │   ├── certificateHandler.ts
│   │   ├── contactHandler.ts
│   │   ├── grievanceHandler.ts
│   │   ├── feedbackHandler.ts
│   │   └── emergencyHandler.ts
│   ├── services/           # Business logic services
│   │   ├── whatsappService.ts
│   │   ├── databaseService.ts
│   │   └── sessionService.ts
│   ├── translations/       # Language translations
│   │   ├── en.ts          # English translations
│   │   └── bn.ts          # Bengali translations
│   ├── types/             # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/             # Utility functions
│   │   ├── messageFormatter.ts
│   │   ├── validator.ts
│   │   └── logger.ts
│   └── index.ts           # Application entry point
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── generated/         # Generated Prisma client
├── dist/                  # Compiled JavaScript (production)
├── tsconfig.json
├── package.json
└── .env                   # Environment configuration
```

## 📋 Prerequisites

### Required Software

- **Node.js**: v18 or higher
- **npm**: v9 or higher
- **PostgreSQL**: v14 or higher (shared with main backend)
- **TypeScript**: v5 or higher

### Required Accounts & Access

- **Meta Developer Account**: For WhatsApp Business API
- **WhatsApp Business Account**: Verified business profile
- **Meta App**: Created with WhatsApp product enabled
- **Phone Number**: Registered with WhatsApp Business API
- **Production Domain**: HTTPS-enabled URL for webhooks (not required for development with ngrok)

## 🚀 Setup Instructions

### Step 1: WhatsApp Business API Setup

#### 1.1 Create Meta Developer Account

1. Visit [Meta for Developers](https://developers.facebook.com/)
2. Sign up or log in with your Facebook account
3. Complete business verification if required

#### 1.2 Create a New App

1. Go to **My Apps** → **Create App**
2. Select **Business** as app type
3. Fill in app details:
   - App Name: "Government Services Bot"
   - App Contact Email: your email
   - Business Account: select or create one

#### 1.3 Add WhatsApp Product

1. In your app dashboard, click **Add Product**
2. Find **WhatsApp** and click **Set Up**
3. Complete WhatsApp Business Account setup

#### 1.4 Get API Credentials

Navigate to **WhatsApp** → **API Setup** to find:

- **Business Account ID**: Found in settings
- **Phone Number ID**: From test/production phone number
- **Access Token**:
  - Temporary (24h): Generated in API setup
  - Permanent: Create in **System Users** (recommended for production)

#### 1.5 Create Permanent Access Token (Production)

1. Go to **Business Settings** → **System Users**
2. Click **Add** → Create system user
3. Assign assets: Select your app
4. Generate token with permissions:
   - `whatsapp_business_messaging`
   - `whatsapp_business_management`
5. Save token securely (shown only once)

#### 1.6 Configure Webhook

1. In WhatsApp API setup, find **Webhook** section
2. Click **Configure**
3. Enter webhook details:
   - **Callback URL**: `https://yourdomain.com/webhook`
   - **Verify Token**: Create a random string (e.g., `my_secure_verify_token_123`)
4. Click **Verify and Save**
5. Subscribe to webhook fields:
   - ✅ `messages`
   - ✅ `message_status` (optional, for delivery tracking)

### Step 2: Environment Configuration

Create `.env` file in `whatsapp-bot` directory:

```env
# Database Configuration (same as main backend)
DATABASE_URL="postgresql://postgres:password@localhost:5432/government_services"

# WhatsApp Business API Configuration
WHATSAPP_API_URL="https://graph.facebook.com/v18.0"
WHATSAPP_PHONE_NUMBER_ID="your_phone_number_id"
WHATSAPP_BUSINESS_ACCOUNT_ID="your_business_account_id"
WHATSAPP_ACCESS_TOKEN="your_permanent_access_token"
WHATSAPP_VERIFY_TOKEN="my_secure_verify_token_123"

# Webhook Configuration
WEBHOOK_URL="https://yourdomain.com/webhook"
PORT=3002

# Backend API Configuration
BACKEND_API_URL="http://localhost:3001"

# Session Configuration
SESSION_TIMEOUT=1800000  # 30 minutes in milliseconds
SESSION_CLEANUP_INTERVAL=300000  # 5 minutes

# Bot Configuration
BOT_NAME="Government Services Bot"
DEFAULT_LANGUAGE="en"  # en or bn
MAX_RETRIES=3
REQUEST_TIMEOUT=10000  # 10 seconds

# Logging
LOG_LEVEL="info"  # error, warn, info, debug
NODE_ENV="development"  # development or production
```

### Step 3: Local Development Setup with ngrok

For local testing, use ngrok to expose your local server:

```bash
# Install ngrok (if not installed)
# Windows: Download from https://ngrok.com/download
# Or use npm:
npm install -g ngrok

# Start ngrok tunnel
ngrok http 3002

# Copy the HTTPS URL (e.g., https://abc123.ngrok.io)
# Update webhook URL in Meta dashboard with:
# https://abc123.ngrok.io/webhook
```

### Step 4: Install Dependencies

```bash
cd whatsapp-bot

# Install all dependencies
npm install

# Generate Prisma Client
npx prisma generate

# (Optional) Push database schema if not already done
npx prisma db push
```

Dependencies installed:

- `express`: Web framework for webhook handling
- `@prisma/client`: Database ORM
- `axios`: HTTP client for WhatsApp API calls
- `dotenv`: Environment variable management
- `node-cache`: In-memory session storage
- `uuid`: Unique ID generation
- TypeScript and related type definitions

### Step 5: Build the Application

```bash
# Build TypeScript to JavaScript
npm run build

# Clean previous builds (optional)
npm run clean
```

### Step 6: Start the Bot

#### Development Mode (with auto-reload)

```bash
npm run dev
```

#### Production Mode

```bash
# Build first
npm run build

# Start the server
npm start
```

#### Using Nodemon (watch mode)

```bash
npm run watch
```

### Step 7: Verify Webhook Connection

#### Test Webhook Verification

```bash
# Test the webhook verification endpoint
curl "http://localhost:3002/webhook?hub.mode=subscribe&hub.verify_token=my_secure_verify_token_123&hub.challenge=test_challenge"

# Should return: test_challenge
```

#### Test Webhook Message Handling

```bash
# Send test message (simulate WhatsApp API)
curl -X POST http://localhost:3002/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "object": "whatsapp_business_account",
    "entry": [{
      "changes": [{
        "value": {
          "messages": [{
            "from": "1234567890",
            "id": "test_msg_id",
            "timestamp": "1234567890",
            "text": { "body": "hi" },
            "type": "text"
          }]
        }
      }]
    }]
  }'
```

### Step 8: Test with Real WhatsApp

1. Open WhatsApp on your phone
2. Start a conversation with your test number
3. Send "hi" or "hello"
4. Bot should respond with welcome menu

### Step 9: Monitor Logs

```bash
# View real-time logs
npm run dev

# Or in production with PM2
pm2 logs whatsapp-bot
```

## 📱 Usage & Commands

### User Flow

1. **Start Conversation**: User sends any message
2. **Language Selection**: Choose English or Bengali
3. **Main Menu**: Select service category:

   - Schemes
   - Certificates
   - Contacts
   - Grievances
   - Feedback
   - Emergency
   - Change Language

4. **Service Navigation**: Browse and interact with selected service
5. **Back/Home**: Return to previous menu or main menu

### Message Examples

#### Welcome Message (English)

```
Welcome to Government Services! 👋

Please choose your preferred language:
1️⃣ English
2️⃣ বাংলা (Bengali)

Reply with 1 or 2
```

#### Main Menu (English)

```
🏛️ GOVERNMENT SERVICES

Please select a service:

1️⃣ Schemes
2️⃣ Certificates
3️⃣ Contact Services
4️⃣ Grievances
5️⃣ Feedback
6️⃣ Emergency Numbers
7️⃣ Change Language

Reply with a number (1-7)
```

#### Scheme List

```
📊 GOVERNMENT SCHEMES

1️⃣ Pradhan Mantri Awas Yojana
2️⃣ National Health Mission
3️⃣ Mid-Day Meal Scheme

Reply with number for details
0️⃣ Back | #️⃣ Main Menu
```

### Bot Commands & Keywords

- **Numbers (1-9)**: Navigate menus
- **0**: Go back to previous menu
- **#** or **home**: Return to main menu
- **hi**, **hello**, **start**: Restart conversation
- **help**: Show help message
- **language**: Change language preference

## 🔧 Configuration

### Session Management

Sessions are stored in-memory using `node-cache`:

```typescript
// Session structure
interface UserSession {
  userId: string;
  language: "en" | "bn";
  currentMenu: string;
  previousMenu: string;
  context: Record<string, any>;
  lastActivity: Date;
}

// Default timeout: 30 minutes
// Cleanup interval: 5 minutes
```

### Message Rate Limiting

WhatsApp API has rate limits:

- **1000 messages per second** (business messages)
- **Daily limits** based on phone number tier

### Error Handling

The bot includes comprehensive error handling:

- API call failures with retry logic
- Database connection errors
- Invalid user input validation
- Session timeout handling
- Webhook signature verification

## 🗄️ Database Schema

### WhatsAppUser Model

```prisma
model WhatsAppUser {
  id            String   @id @default(uuid())
  phoneNumber   String   @unique
  name          String?
  language      String   @default("en")
  lastActive    DateTime @default(now())
  createdAt     DateTime @default(now())

  sessions      WhatsAppSession[]
  grievances    Grievance[]
  feedbacks     Feedback[]
}
```

### WhatsAppSession Model

```prisma
model WhatsAppSession {
  id            String   @id @default(uuid())
  userId        String
  user          WhatsAppUser @relation(fields: [userId], references: [id])
  sessionData   Json
  expiresAt     DateTime
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

## 📊 API Integration

### WhatsApp API Endpoints Used

#### Send Message

```typescript
POST https://graph.facebook.com/v18.0/{phone_number_id}/messages

// Request body
{
  "messaging_product": "whatsapp",
  "recipient_type": "individual",
  "to": "1234567890",
  "type": "text",
  "text": {
    "body": "Your message here"
  }
}
```

#### Send Interactive Buttons (Future Enhancement)

```typescript
{
  "messaging_product": "whatsapp",
  "to": "1234567890",
  "type": "interactive",
  "interactive": {
    "type": "button",
    "body": {
      "text": "Select an option"
    },
    "action": {
      "buttons": [
        { "type": "reply", "reply": { "id": "1", "title": "Option 1" } },
        { "type": "reply", "reply": { "id": "2", "title": "Option 2" } }
      ]
    }
  }
}
```

### Backend API Integration

The bot integrates with the main backend API:

```typescript
// Fetch schemes
GET http://localhost:3001/api/schemes

// Submit grievance
POST http://localhost:3001/api/grievances
{
  "name": "User Name",
  "phone": "1234567890",
  "subject": "Issue subject",
  "description": "Detailed description"
}

// Submit feedback
POST http://localhost:3001/api/feedback
{
  "name": "User Name",
  "phone": "1234567890",
  "service": "scheme",
  "rating": 5,
  "comments": "Great service!"
}
```

## 🚀 Deployment

### Option 1: Railway

3. **Test Bot**
   - Send a message to your WhatsApp Business number
   - Verify bot responds correctly

## Bot Usage

### Getting Started

1. Send any message to the bot
2. Select your preferred language (English/Bengali)
3. Choose from the main menu options

### Available Services

#### 1. Scheme Services

- Browse all active government schemes
- View detailed scheme information
- See eligibility criteria and benefits
- Get application process details

#### 2. Certificate Services

- Access certificate services
- View application requirements
- Get processing information
- See required documents

#### 3. Contact Services

- Find government office contacts
- Get contact details by district/block
- Access office addresses and phone numbers

#### 4. Grievance Submission

- Submit complaints step-by-step
- Select department and priority
- Receive reference ID for tracking

#### 5. Feedback System

- Rate services (1-5 stars)
- Provide detailed feedback
- Optional contact information

### Commands

- `start` - Start/restart the bot
- `menu` - Go to main menu
- `help` - Show help information
- `lang` - Change language
- `back` - Go to previous menu

## Architecture

```
src/
├── handlers/          # Message processing logic
├── services/          # Core services (Database, WhatsApp, Session)
├── translations/      # Language files (English, Bengali)
├── types/            # TypeScript interfaces
└── index.ts          # Main application entry point
```

### Key Components

- **MessageHandler**: Processes user messages and manages conversation flow
- **DatabaseService**: Interfaces with PostgreSQL using Prisma
- **SessionManager**: Manages user sessions and context
- **WhatsAppBotService**: Handles WhatsApp API communication
- **TranslationService**: Provides multilingual support

## Database Integration

The bot uses the same PostgreSQL database as the main application:

- **Schemes**: Active scheme services
- **Certificates**: Certificate services
- **Contacts**: Government office contacts
- **Grievances**: User complaints
- **Feedback**: User feedback and ratings

## Session Management

- 30-minute session timeout
- Maintains user language preference
- Tracks conversation state
- Stores form data during multi-step processes

## Security Features

- Webhook signature validation
- Rate limiting (10 messages/minute)
- Input validation for forms
- Session isolation per user

## Monitoring

- Request/response logging
- Error tracking
- Session statistics
- Performance metrics

## Troubleshooting

### Common Issues

1. **Webhook Verification Failed**

   - Check verify token matches
   - Ensure HTTPS is enabled
   - Verify URL is accessible

2. **Messages Not Received**

   - Check WhatsApp API credentials
   - Verify phone number is approved
   - Check webhook subscription

3. **Database Errors**

   - Verify DATABASE_URL is correct
   - Check database connectivity
   - Ensure Prisma client is generated

4. **Translation Issues**
   - Check language code format
   - Verify translation files exist
   - Test fallback to English

### Logs

Monitor application logs for:

- Incoming message processing
- Database queries
- WhatsApp API responses
- Session management events

## Contributing

1. Fork the repository
2. Create feature branch
3. Add comprehensive tests
4. Update documentation
5. Submit pull request

## License

MIT License - see LICENSE file for details

## Support

For technical support:

- Check documentation
- Review troubleshooting guide
- Contact development team during office hours
