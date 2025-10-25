# Setup Guide - Government Services Platform

This guide provides step-by-step instructions to set up the Government Services Platform on your local machine.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Frontend Setup](#frontend-setup)
3. [Backend Setup](#backend-setup)
4. [WhatsApp Bot Setup](#whatsapp-bot-setup)
5. [Docker Setup](#docker-setup)
6. [Development Workflow](#development-workflow)
7. [Troubleshooting](#troubleshooting)

---

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

### Required Software

- **Node.js** (v18 or higher)
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify: `node --version`
- **npm** (v9 or higher) or **yarn**
  - Comes with Node.js
  - Verify: `npm --version`
- **PostgreSQL** (v14 or higher)
  - Download from [postgresql.org](https://www.postgresql.org/download/)
  - Verify: `psql --version`
- **Git**
  - Download from [git-scm.com](https://git-scm.com/)
  - Verify: `git --version`

### Optional (for Docker deployment)

- **Docker** (v20 or higher)
- **Docker Compose** (v2 or higher)

---

## 🎨 Frontend Setup

### Step 1: Navigate to Frontend Directory

```bash
cd frontend
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages including:

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router
- React Query
- Radix UI components
- And more...

### Step 3: Configure Environment Variables

Create a `.env` file in the `frontend` directory:

```bash
# Create .env file
touch .env  # On Windows: type nul > .env
```

Add the following content:

```env
# Backend API URL
VITE_API_URL=http://localhost:3001

# Optional: Public URL (for production)
# VITE_PUBLIC_URL=https://your-domain.com
```

### Step 4: Start Development Server

```bash
npm run dev
```

The frontend will be available at: **http://localhost:5173**

### Frontend Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run typecheck

# Lint code
npm run lint
```

### Frontend Features Verification

After starting the development server:

1. ✅ Open http://localhost:5173
2. ✅ You should see the landing page
3. ✅ Navigate to different sections:
   - Schemes
   - Certificates
   - Contact Services
   - Feedback
   - Admin Login

---

## ⚙️ Backend Setup

### Step 1: Navigate to Backend Directory

```bash
cd backend
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install:

- Express.js
- Prisma ORM
- PostgreSQL client
- JWT authentication
- TypeScript
- And all necessary dependencies

### Step 3: Configure Environment Variables

Create a `.env` file in the `backend` directory:

```bash
# Create .env file
touch .env  # On Windows: type nul > .env
```

Add the following content:

```env
# Database Configuration
DATABASE_URL="postgresql://postgres:password@localhost:5432/government_services"

# JWT Secret (Change this in production!)
JWT_SECRET="your-super-secret-jwt-key-change-in-production-123456"

# Server Configuration
PORT=3001
NODE_ENV=development

# CORS Configuration (optional)
ALLOWED_ORIGINS="http://localhost:5173,http://localhost:3000"

# File Upload Configuration
MAX_FILE_SIZE=5242880  # 5MB in bytes
UPLOAD_PATH="./uploads"
```

### Step 4: Setup PostgreSQL Database

#### Option A: Create Database Manually

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE government_services;

# Exit
\q
```

#### Option B: Use provided scripts (Windows)

```bash
# Run database setup script
./setup.bat
```

### Step 5: Run Prisma Migrations

```bash
# Generate Prisma Client
npm run db:generate

# Run migrations to create database tables
npm run db:migrate

# Or push schema without migration (for development)
npm run db:push
```

### Step 6: (Optional) Seed Database

Create initial admin user and sample data:

```bash
# You can create a seed script or manually insert admin user
# See DATABASE_SETUP.md for more details
```

### Step 7: Start Development Server

```bash
npm run dev
```

The backend API will be available at: **http://localhost:3001**

### Backend Scripts

```bash
# Development server with auto-reload
npm run dev

# Build TypeScript to JavaScript
npm run build

# Start production server
npm start

# Run tests
npm test

# Prisma commands
npm run db:generate    # Generate Prisma Client
npm run db:push        # Push schema to database (dev)
npm run db:migrate     # Create and run migrations
npm run db:studio      # Open Prisma Studio (GUI)
npm run db:reset       # Reset database (WARNING: deletes all data)

# Type checking
npm run build:check
```

### Backend API Verification

Test if the backend is running:

```bash
# Test API health
curl http://localhost:3001/api/health

# Or open in browser
http://localhost:3001/api/health
```

Expected response:

```json
{
  "status": "ok",
  "message": "Government Services API is running"
}
```

---

## 💬 WhatsApp Bot Setup

### Step 1: Navigate to WhatsApp Bot Directory

```bash
cd whatsapp-bot
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install:

- WhatsApp client libraries
- Prisma ORM
- Express.js
- Translation utilities
- And more...

### Step 3: Configure Environment Variables

Create a `.env` file in the `whatsapp-bot` directory:

```bash
# Create .env file
touch .env  # On Windows: type nul > .env
```

Add the following content:

```env
# Database Configuration (same as backend)
DATABASE_URL="postgresql://postgres:password@localhost:5432/government_services"

# WhatsApp API Configuration
WHATSAPP_API_URL="https://graph.facebook.com/v18.0"
WHATSAPP_PHONE_NUMBER_ID="your-phone-number-id"
WHATSAPP_BUSINESS_ACCOUNT_ID="your-business-account-id"
WHATSAPP_ACCESS_TOKEN="your-access-token"
WHATSAPP_VERIFY_TOKEN="your-custom-verify-token"

# Webhook Configuration
WEBHOOK_URL="https://your-domain.com/webhook"
PORT=3002

# API Configuration
BACKEND_API_URL="http://localhost:3001"

# Session Configuration
SESSION_TIMEOUT=1800000  # 30 minutes in milliseconds

# Default Language
DEFAULT_LANGUAGE="en"  # en or bn
```

### Step 4: Setup Prisma for WhatsApp Bot

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push
```

### Step 5: Configure WhatsApp Business API

1. **Create Meta Developer Account**

   - Go to [developers.facebook.com](https://developers.facebook.com)
   - Create an app with WhatsApp product

2. **Get API Credentials**

   - Phone Number ID
   - Business Account ID
   - Access Token
   - Set up webhook URL

3. **Configure Webhook**
   - Webhook URL: `https://your-domain.com/webhook`
   - Verify Token: (same as in .env file)
   - Subscribe to messages and message_status

### Step 6: Start WhatsApp Bot

```bash
# Development mode
npm run dev

# Production mode
npm run build
npm start
```

The WhatsApp bot will be available at: **http://localhost:3002**

### WhatsApp Bot Scripts

```bash
# Development with auto-reload
npm run dev

# Build TypeScript
npm run build

# Start production server
npm start

# Watch mode with nodemon
npm run watch

# Clean build directory
npm run clean
```

### WhatsApp Bot Verification

Test webhook endpoint:

```bash
# Test webhook verification
curl "http://localhost:3002/webhook?hub.mode=subscribe&hub.verify_token=your-verify-token&hub.challenge=test"
```

---

## 🐳 Docker Setup

### Prerequisites

- Docker installed
- Docker Compose installed

### Step 1: Environment Variables

Create `.env` files as described in the sections above.

### Step 2: Build and Run with Docker Compose

```bash
# Build and start all services
docker-compose up --build

# Run in detached mode (background)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Stop and remove volumes (WARNING: deletes database)
docker-compose down -v
```

### Services Running in Docker

- **PostgreSQL**: Port 5432
- **Backend API**: Port 3001
- **Frontend (via Nginx)**: Port 80
- **Nginx**: Serves frontend and proxies API requests

### Docker Commands

```bash
# View running containers
docker ps

# View logs for specific service
docker-compose logs -f backend
docker-compose logs -f postgres

# Restart a service
docker-compose restart backend

# Execute command in container
docker-compose exec backend npm run db:migrate

# Open Prisma Studio in container
docker-compose exec backend npm run db:studio
```

---

## 🔄 Development Workflow

### Running All Services Locally

#### Option 1: Using Root Package.json

From the project root directory:

```bash
# Install all dependencies
npm run install:all

# Run both frontend and backend in development
npm run dev

# Run only frontend
npm run dev:frontend

# Run only backend
npm run dev:backend

# Build all for production
npm run build

# Database commands
npm run db:generate
npm run db:push
npm run db:migrate
npm run db:studio
```

#### Option 2: Manual Start (Separate Terminals)

**Terminal 1 - Backend:**

```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**

```bash
cd frontend
npm run dev
```

**Terminal 3 - WhatsApp Bot (Optional):**

```bash
cd whatsapp-bot
npm run dev
```

### Initial Admin Account Setup

After setting up the backend, create an initial admin account:

1. **Use API endpoint:**

```bash
curl -X POST http://localhost:3001/api/admin/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "Admin@123",
    "name": "System Administrator"
  }'
```

2. **Or use Prisma Studio:**

```bash
cd backend
npm run db:studio
# Open http://localhost:5555
# Navigate to Admin table
# Add new admin record with hashed password
```

### Development Best Practices

1. **Always run migrations before starting backend:**

   ```bash
   cd backend
   npm run db:migrate
   ```

2. **Generate Prisma Client after schema changes:**

   ```bash
   npm run db:generate
   ```

3. **Use Prisma Studio to inspect database:**

   ```bash
   npm run db:studio
   ```

4. **Check TypeScript types:**

   ```bash
   # Backend
   cd backend && npm run build:check

   # Frontend
   cd frontend && npm run typecheck
   ```

---

## 🐛 Troubleshooting

### Common Issues and Solutions

#### 1. Database Connection Error

**Error:** `Can't reach database server`

**Solution:**

```bash
# Check if PostgreSQL is running
# Windows:
services.msc  # Look for postgresql service

# Linux/Mac:
sudo systemctl status postgresql

# Check DATABASE_URL in .env file
# Ensure PostgreSQL is running on correct port
```

#### 2. Port Already in Use

**Error:** `Port 3001 is already in use`

**Solution:**

```bash
# Windows - Find and kill process
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3001 | xargs kill -9

# Or change PORT in .env file
```

#### 3. Prisma Client Not Generated

**Error:** `Cannot find module '@prisma/client'`

**Solution:**

```bash
cd backend
npm run db:generate
```

#### 4. CORS Errors in Frontend

**Error:** `Access-Control-Allow-Origin error`

**Solution:**

- Check VITE_API_URL in frontend/.env
- Ensure backend CORS is configured correctly
- Verify backend is running

#### 5. npm Install Fails

**Error:** `npm ERR! code ERESOLVE`

**Solution:**

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install

# Or use legacy peer deps
npm install --legacy-peer-deps
```

#### 6. Database Migration Errors

**Error:** `Migration failed`

**Solution:**

```bash
# Reset database (WARNING: deletes all data)
cd backend
npm run db:reset

# Or manually fix migration
npx prisma migrate resolve --applied "migration-name"
npx prisma migrate deploy
```

#### 7. Frontend Build Errors

**Error:** TypeScript compilation errors

**Solution:**

```bash
cd frontend

# Check for type errors
npm run typecheck

# Clear Vite cache
rm -rf node_modules/.vite

# Rebuild
npm run build
```

#### 8. WhatsApp Webhook Not Working

**Error:** Webhook verification failed

**Solution:**

- Verify WHATSAPP_VERIFY_TOKEN matches in code and Meta dashboard
- Ensure webhook URL is publicly accessible (use ngrok for local testing)
- Check webhook endpoint is running

### Getting Help

1. Check existing documentation files
2. Review error logs carefully
3. Search for similar issues
4. Create an issue with detailed error information

---

## 📚 Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [React Documentation](https://react.dev)
- [Express.js Documentation](https://expressjs.com)
- [WhatsApp Business API](https://developers.facebook.com/docs/whatsapp)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

---

## ✅ Setup Checklist

Use this checklist to ensure everything is set up correctly:

- [ ] Node.js and npm installed
- [ ] PostgreSQL installed and running
- [ ] Project cloned/downloaded
- [ ] Backend dependencies installed
- [ ] Backend .env configured
- [ ] Database created
- [ ] Prisma migrations run
- [ ] Backend server starts successfully
- [ ] Frontend dependencies installed
- [ ] Frontend .env configured
- [ ] Frontend server starts successfully
- [ ] Can access frontend at http://localhost:5173
- [ ] Can access backend at http://localhost:3001
- [ ] Admin account created
- [ ] Can login to admin dashboard
- [ ] (Optional) WhatsApp bot configured
- [ ] (Optional) Docker containers running

---

**Need help?** Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md) or create an issue.

**Ready for production?** See [DEPLOYMENT.md](DEPLOYMENT.md) for deployment instructions.
