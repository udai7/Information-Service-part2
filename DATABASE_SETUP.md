# Database Setup Instructions

## Setting up Neon Database

1. **Create Neon Account**

   - Go to [https://neon.tech](https://neon.tech)
   - Sign up for a free account
   - Create a new project

2. **Get Database URL**

   - After creating your project, go to the "Dashboard"
   - Click on "Connection Details"
   - Copy the connection string (it looks like: `postgresql://username:password@hostname/database?sslmode=require`)

3. **Update Environment Variables**

   - Open `.env` file in the project root
   - Replace `your-neon-database-url-here` with your actual Neon database URL

   ```env
   DATABASE_URL="postgresql://username:password@hostname/database?sslmode=require"
   ```

4. **Initialize Database**

   ```bash
   # Generate Prisma client
   npm run db:generate

   # Push schema to database (creates tables)
   npm run db:push
   ```

5. **Verify Setup**
   ```bash
   # Open Prisma Studio to view your database
   npm run db:studio
   ```

## Database Schema Overview

The database includes the following tables:

### Admin

- Stores admin user credentials and information
- Handles authentication and authorization

### SchemeService

- Main service information (name, summary, type, etc.)
- Application mode and URLs
- Status tracking (draft, pending, published)
- Process and document requirements

### ContactPerson

- Contact information for each service
- District/block level organization
- Official contact details

### SupportiveDocument

- Required documents for each service
- Document types and validation requirements

## Example Admin Registration

Once the backend is running, you can register an admin:

```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@example.com",
    "password": "password123"
  }'
```

Or use the frontend login page at `http://localhost:5173/admin/login`

## Database Commands

```bash
# Development
npm run db:generate    # Generate Prisma client
npm run db:push       # Push schema changes to database
npm run db:studio     # Open Prisma Studio GUI

# Production (using migrations)
npm run db:migrate    # Create and run migrations
```

## Troubleshooting

1. **Connection Issues**

   - Verify your Neon database URL is correct
   - Check that your Neon database is active
   - Ensure SSL mode is enabled

2. **Schema Issues**

   - Run `npm run db:generate` after any schema changes
   - Use `npm run db:push` for development
   - Use migrations for production

3. **Permission Issues**
   - Ensure your Neon user has proper permissions
   - Check that the database exists and is accessible
