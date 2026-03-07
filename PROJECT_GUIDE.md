# InfoServices Tripura — Project Guide

A unified government services portal for the citizens of Tripura. This application allows administrators to manage government services (schemes, certificates, contact directories) and citizens to browse, search and access them without authentication.

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Prerequisites](#prerequisites)
3. [Quick Start](#quick-start)
4. [Environment Variables](#environment-variables)
5. [Database Setup](#database-setup)
6. [Running the Application](#running-the-application)
7. [Default Credentials](#default-credentials)
8. [User Roles & Permissions](#user-roles--permissions)
9. [Project Structure](#project-structure)
10. [API Endpoints](#api-endpoints)
11. [Admin Features](#admin-features)
12. [Public Features](#public-features)
13. [Troubleshooting](#troubleshooting)

---

## Tech Stack

| Layer      | Technology                                    |
| ---------- | --------------------------------------------- |
| Frontend   | React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui |
| Backend    | Node.js, Express, TypeScript                  |
| Database   | PostgreSQL (Neon serverless)                   |
| ORM        | Prisma 6                                       |
| Auth       | JWT (access + refresh tokens), bcrypt          |
| Validation | express-validator                              |
| Security   | helmet, cors, express-rate-limit, cookie-parser |

---

## Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9
- **PostgreSQL** database (local or hosted — Neon, Supabase, etc.)

---

## Quick Start

```bash
# 1. Clone the repo
git clone <repo-url>
cd Information-Service-part2

# 2. Install dependencies
cd backend && npm install
cd ../frontend && npm install
cd ..

# 3. Configure environment
cp backend/.env.example backend/.env   # Edit with your DB URL and JWT secret

# 4. Set up database
cd backend
npx prisma migrate deploy
npx prisma generate
npx tsx prisma/seed.ts

# 5. Start both servers
# Terminal 1 — Backend
cd backend && npm run dev     # Runs on http://localhost:3001

# Terminal 2 — Frontend
cd frontend && npm run dev    # Runs on http://localhost:5173
```

---

## Environment Variables

Create `backend/.env` with the following:

```env
# Database
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require"

# JWT Secret — generate with: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
JWT_SECRET="your-long-random-secret"

# Server
PORT=3001
NODE_ENV=development
FRONTEND_URL="http://localhost:5173"

# Optional: Override default SuperAdmin credentials during seeding
SUPER_ADMIN_EMAIL="admin@govservices.in"
SUPER_ADMIN_PASSWORD="Admin@123456"
SUPER_ADMIN_NAME="Super Admin"
```

---

## Database Setup

### Apply migrations

```bash
cd backend
npx prisma migrate deploy
```

### Generate Prisma client

```bash
npx prisma generate
```

### Seed default data

Seeds 10 departments + 1 SuperAdmin account:

```bash
npx tsx prisma/seed.ts
```

### Reset database (destructive)

```bash
npx prisma migrate reset --force
```

---

## Running the Application

### Development

```bash
# Backend (Terminal 1)
cd backend
npm run dev          # tsx watch index.ts — hot reload on port 3001

# Frontend (Terminal 2)
cd frontend
npm run dev          # Vite dev server on port 5173
```

### Production build

```bash
# Frontend
cd frontend
npm run build        # Outputs to frontend/dist/

# Backend
cd backend
npm run build        # Compiles to backend/dist/
npm start            # Runs compiled JS
```

---

## Default Credentials

### SuperAdmin (full access)

| Field    | Value                  |
| -------- | ---------------------- |
| Email    | `admin@govservices.in` |
| Password | `Admin@123456`         |
| Role     | `super_admin`          |

> **Important:** Change the default password immediately after first login in a production environment. You can also override these during seeding via environment variables.

### Creating department admins

1. Log in as SuperAdmin
2. Navigate to **Admin Management** in the sidebar (under "Management" section)
3. Click **Add Admin** to create a new department admin
4. Assign them to a specific department

---

## User Roles & Permissions

| Role              | Can do                                                                                        |
| ----------------- | --------------------------------------------------------------------------------------------- |
| **super_admin**   | Everything — manage departments, admins, audit logs, all services across all departments       |
| **department_admin** | Manage services (schemes, certificates, contacts) within their assigned department only      |
| **Public user**   | Browse all published services, file grievances, submit feedback (no login required)            |

---

## Project Structure

```
Information-Service-part2/
├── backend/
│   ├── index.ts              # Express entry point
│   ├── lib/
│   │   ├── prisma.ts         # Prisma singleton
│   │   └── auditLog.ts       # Audit logging utility
│   ├── middleware/
│   │   ├── auth.ts           # JWT auth & RBAC guards
│   │   ├── rateLimiter.ts    # Rate limiting configs
│   │   └── errorHandler.ts   # Global error handler
│   ├── routes/
│   │   ├── adminAuth.ts      # Login, register, refresh, sessions
│   │   ├── adminManagement.ts # Admin CRUD (SuperAdmin only)
│   │   ├── departments.ts    # Department CRUD
│   │   ├── auditLogs.ts      # Audit log viewer
│   │   ├── schemeService.ts  # Scheme CRUD + public endpoints
│   │   ├── certificateService.ts
│   │   ├── contactService.ts
│   │   ├── officeManagement.ts
│   │   ├── feedback.ts
│   │   ├── grievance.ts
│   │   └── notifications.ts
│   └── prisma/
│       ├── schema.prisma     # Database schema
│       ├── seed.ts           # Seed script
│       └── migrations/       # Migration history
├── frontend/
│   ├── src/
│   │   ├── App.tsx           # Routes & auth guards
│   │   ├── contexts/AuthContext.tsx
│   │   ├── types/api.ts      # API client class
│   │   ├── pages/            # All page components
│   │   └── components/ui/    # shadcn/ui + AdminSidebar
│   └── vite.config.ts
└── PROJECT_GUIDE.md          # This file
```

---

## API Endpoints

### Public (no authentication)

| Method | Endpoint                                | Description                    |
| ------ | --------------------------------------- | ------------------------------ |
| GET    | `/api/scheme-services/public/list`      | List published schemes         |
| GET    | `/api/scheme-services/public/:id`       | Single scheme details          |
| GET    | `/api/certificate-services/public/list` | List published certificates    |
| GET    | `/api/certificate-services/public/:id`  | Single certificate details     |
| GET    | `/api/contact-services/public/list`     | List published contacts        |
| GET    | `/api/offices/public/by-name/:name`     | Office lookup by name          |
| GET    | `/api/offices/public/:id/posts`         | Office posts                   |
| POST   | `/api/grievances`                       | Submit a grievance             |
| POST   | `/api/feedbacks`                        | Submit feedback                |
| GET    | `/api/health`                           | Health check                   |

### Authentication

| Method | Endpoint                  | Description          |
| ------ | ------------------------- | -------------------- |
| POST   | `/api/auth/login`         | Admin login          |
| POST   | `/api/auth/refresh`       | Refresh access token |
| POST   | `/api/auth/logout`        | Logout (clear token) |
| POST   | `/api/auth/register`      | Register admin (SuperAdmin only) |

### Admin (requires JWT)

| Method | Endpoint                          | Description                       |
| ------ | --------------------------------- | --------------------------------- |
| GET    | `/api/scheme-services`            | List admin's schemes              |
| POST   | `/api/scheme-services/create`     | Create scheme                     |
| PUT    | `/api/scheme-services/:id`        | Update scheme                     |
| DELETE | `/api/scheme-services/:id`        | Delete scheme                     |
| PATCH  | `/api/scheme-services/:id/publish`| Publish scheme                    |
| GET    | `/api/certificate-services`       | List admin's certificates         |
| GET    | `/api/contact-services`           | List admin's contacts             |
| GET    | `/api/departments`                | List departments                  |
| POST   | `/api/departments`                | Create department (SuperAdmin)    |
| GET    | `/api/admin/admins`               | List admins (SuperAdmin)          |
| GET    | `/api/audit-logs`                 | View audit logs (SuperAdmin)      |

---

## Admin Features

- **Dashboard** — Overview of services, recent activity
- **Scheme Management** — Create, edit, publish, unpublish, delete government schemes
- **Certificate Management** — Manage certificate services with documents, steps, eligibility items
- **Contact Management** — Manage government office contacts and directories
- **Grievance Management** — View and respond to citizen grievances
- **Feedback Management** — View citizen feedback and ratings
- **Department Management** — Create and manage departments (SuperAdmin)
- **Admin Management** — Add, edit, deactivate admin accounts (SuperAdmin)
- **Audit Logs** — View all admin actions with filtering (SuperAdmin)
- **Profile** — View and update admin profile

---

## Public Features

All public features are available **without login**:

- **Service Browser** — Search and filter through all published government services
- **Scheme Details** — View full scheme info including eligibility, documents, application mode
- **Certificate Details** — Step-by-step guide with document requirements
- **Contact Directory** — Find government offices with phone, email, and address
- **Grievance Filing** — Submit complaints about government services
- **Feedback** — Rate and review services
- **Emergency Services** — Access emergency contacts and helplines

---

## Troubleshooting

### "Prisma query" logs appearing in terminal

The Prisma client is configured to only log errors. If you see query logs, delete `node_modules/.prisma` and restart:

```bash
cd backend
rm -rf node_modules/.prisma
npx prisma generate
npm run dev
```

### Frontend shows 404 for user service pages

Make sure the frontend routes in `App.tsx` match the sidebar links in `sidebar.tsx`. The correct user-facing routes are:

- `/scheme-service`
- `/certificate-service`
- `/contact-service`
- `/grievances-service`
- `/feedback-service`

### API returns 401 on public endpoints

Public endpoints use the `/public/list` and `/public/:id` paths. If you're hitting the root endpoints (e.g., `/api/scheme-services`), those require admin authentication.

### Database connection errors

1. Check `DATABASE_URL` in `backend/.env`
2. Ensure the database is accessible from your network
3. Run `npx prisma db pull` to verify connectivity

### TypeScript errors in VS Code but build succeeds

Restart the TypeScript server: **Ctrl+Shift+P** → "TypeScript: Restart TS Server"
