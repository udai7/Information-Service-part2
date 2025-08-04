# Scheme Service Admin Dashboard Backend

This is a comprehensive backend implementation for the scheme service admin dashboard using Express.js, Prisma, and Neon database.

## Features

### Admin Authentication

- Secure admin registration and login
- JWT-based authentication
- Password hashing with bcrypt
- Protected routes with middleware

### Scheme Service Management

1. **Create Scheme Service**

   - Basic information collection (name, summary, type, target audience)
   - Application mode configuration (online/offline/both)
   - URL and address validation

2. **Edit Scheme Service**

   - Add eligibility details
   - Configure scheme details
   - Set up process flows (new, update, lost, surrender)
   - Document requirements
   - Contact person management
   - Supportive document configuration

3. **Publish Scheme Service**

   - Validation before publishing
   - Status management (draft → published)
   - Completeness checks

4. **Service Management**
   - List all services with pagination
   - Filter by status
   - Statistics dashboard
   - Delete services

### Database Schema

The Prisma schema includes:

- **Admin**: User management
- **SchemeService**: Core service data
- **ContactPerson**: Service contact information
- **SupportiveDocument**: Required documents

## Setup Instructions

### 1. Environment Setup

Create a `.env` file with your Neon database URL:

```env
DATABASE_URL="your-neon-postgresql-url"
JWT_SECRET="your-super-secret-jwt-key"
PORT=3001
NODE_ENV=development
FRONTEND_URL="http://localhost:5173"
```

### 2. Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Optional: Run migrations (for production)
npm run db:migrate
```

### 3. Development

```bash
# Install dependencies
npm install

# Start backend only
npm run dev:server

# Start both frontend and backend
npm run dev:full

# Or use the batch file (Windows)
./start-dev.bat
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new admin
- `POST /api/auth/login` - Login admin
- `GET /api/auth/profile` - Get current admin profile

### Scheme Services (Protected)

- `POST /api/scheme-services/create` - Create new scheme service
- `GET /api/scheme-services` - List admin's scheme services
- `GET /api/scheme-services/:id` - Get specific scheme service
- `PUT /api/scheme-services/:id` - Update scheme service
- `PATCH /api/scheme-services/:id/publish` - Publish scheme service
- `DELETE /api/scheme-services/:id` - Delete scheme service

### Public Endpoints

- `GET /api/scheme-services/public/list` - List published services
- `GET /api/scheme-services/public/:id` - Get public service details

## Frontend Integration

The frontend includes:

- **AuthContext**: React context for authentication state
- **useSchemeServices**: Custom hook for service management
- **API Client**: Type-safe API client with error handling
- **Updated Components**: CreateSchemeService, AdminLogin with backend integration

### Key Frontend Features

- Form validation and error handling
- Loading states and user feedback
- Automatic token management
- Type-safe API calls

## Workflow

1. **Admin Registration/Login**

   - Admin creates account or logs in
   - JWT token stored for subsequent requests

2. **Create Scheme Service**

   - Admin fills basic information form
   - Service created in "draft" status
   - Redirected to edit form for completion

3. **Edit Scheme Service**

   - Add detailed information
   - Configure contacts and documents
   - Set up process flows

4. **Publish Scheme Service**
   - Validation ensures completeness
   - Status changed to "published"
   - Service becomes publicly available

## Database Relationships

```
Admin (1) ←→ (M) SchemeService
SchemeService (1) ←→ (M) ContactPerson
SchemeService (1) ←→ (M) SupportiveDocument
```

## Error Handling

- Comprehensive error messages
- Input validation
- Database constraint handling
- Authentication errors
- User-friendly error responses

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation and sanitization
- CORS configuration
- Protected routes

## Development Commands

```bash
# Database
npm run db:generate     # Generate Prisma client
npm run db:push        # Push schema to database
npm run db:migrate     # Run migrations
npm run db:studio      # Open Prisma Studio

# Development
npm run dev            # Frontend only
npm run dev:server     # Backend only
npm run dev:full       # Both frontend and backend

# Build
npm run build:client   # Build frontend
npm run build:server   # Build backend

# Production
npm run start:server   # Start production server
```

## Technologies Used

- **Backend**: Node.js, Express.js, TypeScript
- **Database**: PostgreSQL (Neon), Prisma ORM
- **Authentication**: JWT, bcrypt
- **Validation**: express-validator
- **Frontend**: React, TypeScript, Vite
- **UI**: Tailwind CSS, shadcn/ui components

## Notes

- Ensure your Neon database is accessible
- Update CORS settings for production deployment
- Configure environment variables for production
- The frontend expects the backend to run on port 3001
- All API responses follow consistent error/success patterns
