# Government Services Platform

A comprehensive full-stack web application for managing government services, built with React, TypeScript, Node.js, Express, and PostgreSQL.

## 🏗️ Project Structure

```
government-services-platform/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── contexts/         # React contexts
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Utility libraries
│   │   ├── pages/           # Application pages/routes
│   │   ├── types/           # TypeScript type definitions
│   │   ├── App.tsx          # Main application component
│   │   └── global.css       # Global styles
│   ├── public/              # Static assets
│   ├── index.html           # HTML entry point
│   ├── package.json         # Frontend dependencies
│   ├── vite.config.ts       # Vite configuration
│   ├── tailwind.config.ts   # Tailwind CSS configuration
│   └── tsconfig.json        # TypeScript configuration
│
├── backend/                 # Express.js backend API
│   ├── routes/              # API route handlers
│   ├── shared/              # Shared types and utilities
│   ├── prisma/              # Database schema and migrations
│   ├── index.ts             # Express server entry point
│   ├── package.json         # Backend dependencies
│   └── tsconfig.json        # TypeScript configuration
│
├── package.json             # Root package.json for monorepo scripts
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd government-services-platform
   ```

2. **Install dependencies**

   ```bash
   npm run install:all
   ```

3. **Set up environment variables**

   Create `.env` file in the backend directory:

   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/government_services"
   JWT_SECRET="your-jwt-secret-key"
   PORT=3001
   ```

4. **Set up the database**

   ```bash
   npm run db:generate
   npm run db:push
   ```

5. **Start development servers**

   ```bash
   npm run dev
   ```

   This will start:

   - Frontend: http://localhost:5173
   - Backend: http://localhost:3001

## 📝 Available Scripts

### Root Level Commands

- `npm run install:all` - Install dependencies for both frontend and backend
- `npm run dev` - Start both frontend and backend in development mode
- `npm run build` - Build both frontend and backend for production
- `npm run start` - Start the production backend server

### Frontend Commands

- `cd frontend && npm run dev` - Start frontend development server
- `cd frontend && npm run build` - Build frontend for production
- `cd frontend && npm run preview` - Preview production build

### Backend Commands

- `cd backend && npm run dev` - Start backend development server
- `cd backend && npm run build` - Build backend for production
- `cd backend && npm start` - Start production backend server

### Database Commands

- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema changes to database
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio

## 🛠️ Technology Stack

### Frontend

- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Radix UI** for accessible components
- **React Router** for navigation
- **React Query** for server state management
- **React Hook Form** for form management

### Backend

- **Node.js** with TypeScript
- **Express.js** web framework
- **Prisma** ORM with PostgreSQL
- **JWT** for authentication
- **Express Validator** for input validation
- **Bcrypt** for password hashing
- **Multer** for file uploads

## 🎯 Features

### User Services

- **Scheme Services** - Browse and access government schemes
- **Certificate Services** - Apply for various certificates
- **Contact Services** - Find contact information for departments
- **Emergency Services** - Access emergency contacts and services
- **Feedback System** - Submit feedback and suggestions
- **Grievance Portal** - File and track grievances

### Admin Dashboard

- **Service Management** - Create, edit, and manage all services
- **User Management** - Manage user accounts and permissions
- **Content Management** - Update service information and documents
- **Analytics** - View usage statistics and reports

### Technical Features

- **Responsive Design** - Works on all device sizes
- **Authentication & Authorization** - Secure login system
- **File Upload** - Support for document uploads
- **Search & Filtering** - Advanced search capabilities
- **Real-time Updates** - Live data synchronization

## 🚀 Deployment

### Building for Production

1. **Build the applications**

   ```bash
   npm run build
   ```

2. **Set up production environment variables**

   - Configure production database
   - Set secure JWT secrets
   - Configure CORS settings

3. **Deploy backend**

   - Upload `backend/dist` folder to your server
   - Install production dependencies
   - Set up process manager (PM2 recommended)

4. **Deploy frontend**
   - Upload `frontend/dist` folder to your web server
   - Configure web server (Nginx/Apache) to serve static files
   - Set up reverse proxy to backend API

### Environment Variables

#### Backend (.env)

```env
DATABASE_URL="postgresql://user:password@host:port/database"
JWT_SECRET="your-secure-jwt-secret"
PORT=3001
NODE_ENV="production"
CORS_ORIGIN="https://your-frontend-domain.com"
```

## 🔧 Development

### Adding New Features

1. **Backend API Endpoints**

   - Create route handlers in `backend/routes/`
   - Add types to `backend/shared/api.ts`
   - Update database schema if needed

2. **Frontend Components**
   - Create components in `frontend/src/components/`
   - Add pages in `frontend/src/pages/`
   - Update types in `frontend/src/types/`

### Code Style

- Use TypeScript for all new code
- Follow ESLint and Prettier configurations
- Use meaningful component and function names
- Add proper error handling and validation

## 📊 Database Schema

The application uses PostgreSQL with Prisma ORM. Key entities include:

- **Admin** - Administrator accounts
- **SchemeService** - Government schemes
- **CertificateService** - Certificate services
- **ContactService** - Department contacts
- **EmergencyService** - Emergency services
- **Feedback** - User feedback
- **Grievance** - User grievances

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For questions or support, please contact the development team or create an issue in the repository.
