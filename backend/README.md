# Government Services Backend API

Backend API for the Government Services Platform built with Node.js, Express, TypeScript, and Prisma ORM.

## 🌟 Overview

RESTful API providing services for:

- **Authentication**: Admin login/register with JWT
- **Scheme Management**: Government schemes CRUD operations
- **Certificate Services**: Certificate types and applications
- **Contact Services**: Government office directory
- **Feedback & Grievances**: User feedback and complaint system
- **Emergency Services**: Emergency contact information

## 🚀 Quick Start

### Development

```bash
# Install dependencies
npm install

# Configure environment
cp .env.example .env  # Edit with your settings

# Setup database
npm run db:push

# Start development server
npm run dev
```

Server runs at: **http://localhost:3001**

### Production Build

```bash
npm install
npm run build
npm start
```

## 📁 Project Structure

```
backend/
├── dist/                    # Compiled JavaScript output (production)
├── prisma/
│   ├── schema.prisma        # Database schema definition
│   └── migrations/          # Database migration files
├── routes/                  # API route handlers
│   ├── adminAuth.ts         # Admin authentication endpoints
│   ├── schemeService.ts     # Scheme management endpoints
│   ├── certificateService.ts # Certificate endpoints
│   ├── contactService.ts    # Contact directory endpoints
│   ├── feedback.ts          # Feedback endpoints
│   ├── grievance.ts         # Grievance endpoints
│   └── officeManagement.ts  # Office management endpoints
├── shared/                  # Shared utilities and types
│   └── api.ts               # Shared API types
├── types/                   # TypeScript type definitions
│   └── express.ts           # Express type extensions
├── index.ts                 # Main server entry point
├── package.json             # Dependencies and scripts
└── tsconfig.json            # TypeScript configuration
```

## 🛠 Available Scripts

| Script                  | Description                                         |
| ----------------------- | --------------------------------------------------- |
| `npm run dev`           | Start development server with hot reload (uses tsx) |
| `npm run build`         | Build for production (TypeScript → JavaScript)      |
| `npm start`             | Start production server from `dist/`                |
| `npm run build:check`   | Type checking without compilation                   |
| `npm run build:verbose` | Build with verbose TypeScript output                |
| `npm run db:generate`   | Generate Prisma Client                              |
| `npm run db:push`       | Push schema to database (dev)                       |
| `npm run db:migrate`    | Create and run migrations                           |
| `npm run db:studio`     | Open Prisma Studio (database GUI)                   |
| `npm run db:reset`      | Reset database (⚠️ deletes all data)                |
| `npm test`              | Run tests with Vitest                               |

## 🔧 Environment Configuration

Create a `.env` file in the `backend` directory:

```env
# Database Configuration
DATABASE_URL="postgresql://postgres:password@localhost:5432/government_services"

# JWT Secret (change in production!)
JWT_SECRET="your-super-secret-jwt-key-change-this"

# Server Configuration
PORT=3001
NODE_ENV=development

# CORS Origins (comma-separated)
ALLOWED_ORIGINS="http://localhost:5173,http://localhost:3000"

# File Upload Configuration
MAX_FILE_SIZE=5242880  # 5MB in bytes
UPLOAD_PATH="./uploads"
```

## 📡 API Endpoints

### Authentication

| Method | Endpoint              | Description          | Auth Required |
| ------ | --------------------- | -------------------- | ------------- |
| POST   | `/api/admin/register` | Register new admin   | No            |
| POST   | `/api/admin/login`    | Admin login          | No            |
| GET    | `/api/admin/profile`  | Get admin profile    | Yes           |
| PUT    | `/api/admin/profile`  | Update admin profile | Yes           |

### Scheme Services

| Method | Endpoint           | Description       | Auth Required |
| ------ | ------------------ | ----------------- | ------------- |
| GET    | `/api/schemes`     | List all schemes  | No            |
| GET    | `/api/schemes/:id` | Get scheme by ID  | No            |
| POST   | `/api/schemes`     | Create new scheme | Yes (Admin)   |
| PUT    | `/api/schemes/:id` | Update scheme     | Yes (Admin)   |
| DELETE | `/api/schemes/:id` | Delete scheme     | Yes (Admin)   |

### Certificate Services

| Method | Endpoint                             | Description               | Auth Required |
| ------ | ------------------------------------ | ------------------------- | ------------- |
| GET    | `/api/certificates`                  | List certificate types    | No            |
| GET    | `/api/certificates/:id`              | Get certificate details   | No            |
| POST   | `/api/certificates`                  | Create certificate type   | Yes (Admin)   |
| POST   | `/api/certificates/apply`            | Submit application        | No            |
| GET    | `/api/certificates/applications`     | List applications         | Yes (Admin)   |
| PUT    | `/api/certificates/applications/:id` | Update application status | Yes (Admin)   |

### Contact Services

| Method | Endpoint            | Description         | Auth Required |
| ------ | ------------------- | ------------------- | ------------- |
| GET    | `/api/contacts`     | List all contacts   | No            |
| GET    | `/api/contacts/:id` | Get contact details | No            |
| POST   | `/api/contacts`     | Create contact      | Yes (Admin)   |
| PUT    | `/api/contacts/:id` | Update contact      | Yes (Admin)   |
| DELETE | `/api/contacts/:id` | Delete contact      | Yes (Admin)   |

### Feedback & Grievances

| Method | Endpoint              | Description            | Auth Required |
| ------ | --------------------- | ---------------------- | ------------- |
| POST   | `/api/feedback`       | Submit feedback        | No            |
| GET    | `/api/feedback`       | List all feedback      | Yes (Admin)   |
| POST   | `/api/grievances`     | File grievance         | No            |
| GET    | `/api/grievances`     | List all grievances    | Yes (Admin)   |
| GET    | `/api/grievances/:id` | Track grievance status | No            |
| PUT    | `/api/grievances/:id` | Update grievance       | Yes (Admin)   |

### Health Check

| Method | Endpoint      | Description      | Auth Required |
| ------ | ------------- | ---------------- | ------------- |
| GET    | `/api/health` | API health check | No            |

## 🗄️ Database Schema

### Key Models

```prisma
// Admin users
model Admin {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String   // bcrypt hashed
  name      String
  role      String   @default("admin")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

// Government schemes
model SchemeService {
  id                  Int      @id @default(autoincrement())
  name                String
  summary             String
  type                String?
  targetAudience      String[]
  applicationMode     String
  onlineUrl           String?
  offlineAddress      String?
  status              String   @default("draft")
  isActive            Boolean  @default(true)
  eligibilityDetails  String[]
  schemeDetails       String[]
  processDetails      String[]
  createdAt           DateTime @default(now())
  updatedAt           DateTime @updatedAt
  adminId             Int
}

// Certificate types and applications
model CertificateService {
  id                 Int      @id @default(autoincrement())
  name               String
  description        String
  requiredDocuments  String[]
  processingTime     String
  fees               Float
  applicationMode    String
  isActive           Boolean  @default(true)
  createdAt          DateTime @default(now())
  updatedAt          DateTime @updatedAt
}

model CertificateApplication {
  id              Int      @id @default(autoincrement())
  certificateId   Int
  applicantName   String
  applicantEmail  String?
  applicantPhone  String
  applicationData Json
  documents       String[]
  status          String   @default("pending")
  submittedAt     DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

// Government office contacts
model ContactService {
  id          Int      @id @default(autoincrement())
  department  String
  office      String
  address     String
  phone       String[]
  email       String[]
  workingHours String
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

// User feedback
model Feedback {
  id        Int      @id @default(autoincrement())
  name      String
  email     String?
  phone     String?
  service   String
  rating    Int      // 1-5
  comments  String
  createdAt DateTime @default(now())
}

// Grievances/Complaints
model Grievance {
  id          Int      @id @default(autoincrement())
  name        String
  email       String?
  phone       String
  subject     String
  description String
  status      String   @default("pending")
  resolution  String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

See `prisma/schema.prisma` for complete schema.

## 🔐 Authentication & Authorization

### JWT Authentication

- **Token Generation**: Upon successful login
- **Token Expiration**: 24 hours (configurable)
- **Token Storage**: Client-side (localStorage/cookies)
- **Protected Routes**: Require `Authorization: Bearer <token>` header

### Password Security

- **Hashing**: bcrypt with salt rounds = 10
- **Validation**: Minimum 6 characters (customizable)
- **Storage**: Never store plain-text passwords

### Example Authentication Flow

```typescript
// Login
POST /api/admin/login
{
  "email": "admin@example.com",
  "password": "password123"
}

// Response
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "admin": {
    "id": 1,
    "email": "admin@example.com",
    "name": "Admin User"
  }
}

// Use token in subsequent requests
GET /api/admin/profile
Headers: {
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIs..."
}
```

## 🚀 Deployment

### Option 1: Vercel (Recommended for Serverless)

1. **Prepare for Deployment**

   ```bash
   # Ensure vercel.json exists in backend directory
   ```

2. **Deploy via Vercel Dashboard**

   - Push code to GitHub
   - Import project to Vercel
   - Set root directory: `backend`
   - Environment Variables:
     - `DATABASE_URL` (PostgreSQL connection string)
     - `JWT_SECRET` (strong secret key)
     - `NODE_ENV=production`

3. **Or Deploy via CLI**
   ```bash
   npm install -g vercel
   vercel --prod
   ```

### Option 2: Railway

1. **Create New Project**

   - Connect GitHub repository
   - Railway auto-detects Node.js

2. **Add PostgreSQL**

   - Add PostgreSQL database service
   - Copy DATABASE_URL to backend service

3. **Configure Environment**
   - Add all environment variables
   - Deploy automatically on push

### Option 3: Render

1. **Create Web Service**

   - Connect repository
   - Root directory: `backend`
   - Build command: `npm install && npm run build`
   - Start command: `npm start`

2. **Add PostgreSQL**

   - Create PostgreSQL database
   - Connect to web service

3. **Environment Variables**
   - Add all required variables
   - Auto-deploy enabled

### Option 4: Docker

```dockerfile
# Dockerfile (already included in project root)
FROM node:18-alpine
WORKDIR /app
COPY backend/package*.json ./backend/
RUN cd backend && npm install
COPY backend ./backend
RUN cd backend && npm run build
EXPOSE 3001
CMD ["node", "backend/dist/index.js"]
```

```bash
# Build and run
docker build -t gov-services-backend .
docker run -p 3001:3001 --env-file backend/.env gov-services-backend
```

### Option 5: VPS (Ubuntu)

```bash
# Install dependencies
sudo apt update
sudo apt install nodejs npm postgresql nginx

# Clone and build
git clone <repo>
cd backend
npm install
npm run build

# Use PM2 for process management
sudo npm install -g pm2
pm2 start dist/index.js --name backend
pm2 startup
pm2 save

# Configure Nginx as reverse proxy
# See DEPLOYMENT.md for full nginx config
```

## 🔧 Build Process

The build process follows these steps:

1. **Clean**: Remove previous build artifacts (`rimraf dist`)
2. **Compile**: TypeScript → JavaScript (`tsc`)
3. **Generate**: Prisma Client (automatic via `postinstall` hook)
4. **Output**: Compiled files in `dist/` directory

```bash
# Build output structure
dist/
├── index.js              # Main server file
├── routes/               # Compiled route handlers
├── shared/              # Compiled shared utilities
└── types/               # Compiled type definitions
```

## 📦 Dependencies

### Runtime Dependencies

| Package             | Version | Purpose                       |
| ------------------- | ------- | ----------------------------- |
| `express`           | ^4.18.2 | Web framework                 |
| `@prisma/client`    | ^6.13.0 | Database ORM client           |
| `bcryptjs`          | ^3.0.2  | Password hashing              |
| `jsonwebtoken`      | ^9.0.2  | JWT authentication            |
| `cors`              | ^2.8.5  | Cross-origin resource sharing |
| `dotenv`            | ^17.2.1 | Environment variables         |
| `express-validator` | ^7.2.1  | Input validation              |
| `multer`            | ^2.0.2  | File upload handling          |
| `uuid`              | ^11.1.0 | Unique ID generation          |
| `zod`               | ^3.23.8 | Schema validation             |

### Development Dependencies

| Package      | Version | Purpose                      |
| ------------ | ------- | ---------------------------- |
| `typescript` | ^5.5.3  | TypeScript compiler          |
| `tsx`        | ^4.20.3 | TypeScript execution         |
| `prisma`     | ^6.13.0 | Prisma CLI                   |
| `@types/*`   | Latest  | TypeScript definitions       |
| `rimraf`     | ^6.0.1  | Cross-platform file deletion |
| `vitest`     | ^3.1.4  | Testing framework            |

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Example Test

```typescript
import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../index";

describe("GET /api/health", () => {
  it("should return 200 OK", async () => {
    const response = await request(app).get("/api/health");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("status", "ok");
  });
});
```

## 🔍 Debugging

### Enable Debug Logs

```env
# .env
LOG_LEVEL=debug
NODE_ENV=development
```

### VS Code Launch Configuration

```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Backend",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "dev"],
      "cwd": "${workspaceFolder}/backend",
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```

## 🛡️ Security Best Practices

1. **Environment Variables**: Never commit `.env` files
2. **JWT Secret**: Use strong, random secrets in production
3. **CORS**: Configure allowed origins appropriately
4. **Input Validation**: Validate all user inputs
5. **SQL Injection**: Prisma prevents this by default
6. **Password Policy**: Enforce strong passwords
7. **Rate Limiting**: Consider adding rate limiting middleware
8. **HTTPS**: Always use HTTPS in production

## 📊 Performance Optimization

### Database Optimization

```typescript
// Use connection pooling
// In prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  connection_limit = 10
}

// Index frequently queried fields
model SchemeService {
  id     Int    @id @default(autoincrement())
  name   String @db.VarChar(255)
  status String @default("draft")

  @@index([status])
  @@index([name])
}
```

### Caching

Consider adding Redis for caching:

```typescript
// Example with Redis
import Redis from "ioredis";
const redis = new Redis(process.env.REDIS_URL);

// Cache scheme list
const schemes = await redis.get("schemes");
if (!schemes) {
  const data = await prisma.schemeService.findMany();
  await redis.set("schemes", JSON.stringify(data), "EX", 3600);
  return data;
}
return JSON.parse(schemes);
```

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [JWT.io](https://jwt.io/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit pull request

## 📄 License

MIT License - See LICENSE file for details

## 🆘 Support

For detailed setup instructions, see [SETUP.md](../SETUP.md)

For deployment guides, see [DEPLOYMENT.md](../DEPLOYMENT.md)

For database configuration, see [DATABASE_SETUP.md](../DATABASE_SETUP.md)

---

**Built with ❤️ for Government Services Platform**

## 🔐 Environment Variables

Required environment variables:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/database"
JWT_SECRET="your-secret-key"
NODE_ENV="development|production"
```

## 🧪 API Endpoints

### Authentication

- `POST /api/admin/login` - Admin login
- `POST /api/admin/register` - Admin registration

### Services

- `GET /api/scheme-services` - List scheme services
- `POST /api/scheme-services` - Create scheme service
- `PUT /api/scheme-services/:id` - Update scheme service
- `DELETE /api/scheme-services/:id` - Delete scheme service

### Other Services

- Certificate Services
- Contact Services
- Emergency Services
- Feedback Services
- Grievance Services

## 🔧 TypeScript Configuration

The project uses strict TypeScript configuration:

- **Module System**: CommonJS (for Node.js compatibility)
- **Target**: ES2020
- **Strict Mode**: Enabled
- **Output Directory**: `dist/`

## 🗄️ Database

Uses PostgreSQL with Prisma ORM:

- Database schema defined in `prisma/schema.prisma`
- Migrations managed by Prisma
- Client generated to `node_modules/@prisma/client`

## 📝 Build Artifacts

The build process generates:

- Compiled JavaScript files in `dist/`
- TypeScript declaration files (`.d.ts`)
- Source maps for debugging
- Proper module structure for Node.js

## 🚨 Troubleshooting

### Build Issues

- Ensure all TypeScript errors are resolved
- Check Prisma client generation
- Verify environment variables

### Runtime Issues

- Check database connection
- Verify JWT_SECRET is set
- Ensure CORS configuration for frontend

## ✅ Build Status Verification

The build process includes completion messages:

- "TypeScript compilation completed"
- "Build artifacts generated successfully"

This ensures deployment platforms properly detect build completion.
