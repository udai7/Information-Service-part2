# Government Services Backend

Backend API for the Government Services Platform built with Node.js, Express, TypeScript, and Prisma.

## 🚀 Quick Start

### Development

```bash
npm install
npm run dev
```

### Production Build

```bash
npm install
npm run build
npm start
```

## 📁 Project Structure

```
backend/
├── dist/                 # Compiled JavaScript output
├── prisma/
│   └── schema.prisma     # Database schema
├── routes/               # API route handlers
├── shared/               # Shared utilities and types
├── types/                # TypeScript type definitions
├── index.ts              # Main server file
└── package.json
```

## 🛠 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production (TypeScript compilation)
- `npm start` - Start production server
- `npm run build:check` - Type checking without compilation
- `npm run build:verbose` - Build with verbose TypeScript output
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push database schema changes
- `npm run db:migrate` - Run database migrations

## 🚀 Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `NODE_ENV=production`

The project includes `vercel.json` configuration for automatic deployment.

### Manual Deployment

1. Ensure environment variables are set
2. Run build process:
   ```bash
   npm install
   npm run db:generate
   npm run build
   ```
3. Start the server:
   ```bash
   npm start
   ```

## 🔧 Build Process

The build process:

1. Cleans previous build (`rimraf dist`)
2. Compiles TypeScript to JavaScript (`tsc`)
3. Generates Prisma client (automatic via `postinstall`)
4. Outputs to `dist/` directory

## 📦 Dependencies

### Runtime Dependencies

- **Express** - Web framework
- **Prisma** - Database ORM
- **TypeScript** - Type safety
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **cors** - Cross-origin resource sharing
- **express-validator** - Input validation

### Development Dependencies

- **tsx** - TypeScript execution
- **rimraf** - Cross-platform rm -rf
- **@types/** - TypeScript definitions

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
