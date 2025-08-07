# WhatsApp Government Services Bot

A comprehensive WhatsApp bot that provides government services in English and Bengali languages. Users can browse schemes, certificates, contacts, submit grievances, and provide feedback.

## Features

- 🌐 **Bilingual Support**: English and Bengali
- 📊 **Scheme Services**: Browse and view government scheme details
- 📜 **Certificate Services**: Access certificate information and application processes
- 📞 **Contact Directory**: Find government office contacts
- 📝 **Grievance System**: Submit complaints and track them
- 💬 **Feedback System**: Provide service feedback
- 🔒 **Session Management**: Maintains user context across conversations
- 📱 **WhatsApp Business API**: Official API integration

## Prerequisites

- Node.js 18+
- PostgreSQL database
- WhatsApp Business API access
- Meta Developer Account

## Setup Instructions

### 1. WhatsApp Business API Setup

1. **Create Meta Developer Account**

   - Go to [Meta for Developers](https://developers.facebook.com/)
   - Create a new app
   - Add WhatsApp Business API product

2. **Get Required Credentials**

   - Business Account ID
   - Phone Number ID
   - Access Token (permanent)
   - Webhook Verify Token (create your own)
   - Webhook Secret (create your own)

3. **Configure Webhook**
   - Webhook URL: `https://yourdomain.com/webhook`
   - Verify Token: Use the token you created
   - Subscribe to `messages` events

### 2. Environment Configuration

Update the `.env` file with your credentials:

```env
# Database (use same as main application)
DATABASE_URL=your_postgresql_connection_string

# WhatsApp Business API
WHATSAPP_BUSINESS_ACCOUNT_ID=your_business_account_id
WHATSAPP_ACCESS_TOKEN=your_permanent_access_token
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
WHATSAPP_WEBHOOK_VERIFY_TOKEN=your_webhook_verify_token
WHATSAPP_WEBHOOK_SECRET=your_webhook_secret

# Bot Configuration
PORT=3002
NODE_ENV=development
BOT_NAME="Government Services Bot"
```

### 3. Installation

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Build the application
npm run build
```

### 4. Development

```bash
# Start in development mode
npm run dev

# Start in production mode
npm start
```

### 5. Production Deployment

1. **Deploy to a Server**

   - Use services like Railway, Render, or DigitalOcean
   - Ensure HTTPS is enabled for webhook

2. **Configure Webhook in Meta**

   - Set webhook URL to your production domain
   - Test webhook connection

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
