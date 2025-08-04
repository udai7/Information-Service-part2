# Deployment Guide

This guide provides multiple deployment options for the Government Services Platform.

## 🚀 Quick Deployment Options

### Option 1: Docker Compose (Recommended)

1. **Prerequisites**

   - Docker and Docker Compose installed
   - Clone the repository

2. **Deploy**

   ```bash
   # Clone and setup
   git clone <repository-url>
   cd government-services-platform

   # Start all services
   docker-compose up -d
   ```

3. **Access the application**
   - Frontend: http://localhost
   - Backend API: http://localhost:3001/api
   - Database: localhost:5432

### Option 2: Manual Deployment

#### Backend Deployment

1. **Prepare the server**

   ```bash
   # Install Node.js, PostgreSQL
   sudo apt update
   sudo apt install nodejs npm postgresql
   ```

2. **Deploy backend**

   ```bash
   cd backend
   npm install
   npm run build

   # Set up environment variables
   cp .env.example .env
   # Edit .env with production values

   # Set up database
   npm run db:generate
   npm run db:push

   # Start with PM2
   npm install -g pm2
   pm2 start dist/index.js --name gov-services-api
   ```

#### Frontend Deployment

1. **Build frontend**

   ```bash
   cd frontend
   npm install
   npm run build
   ```

2. **Deploy to web server**

   ```bash
   # Copy dist folder to web server
   scp -r dist/* user@server:/var/www/html/
   ```

3. **Configure Nginx**

   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       root /var/www/html;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }

       location /api/ {
           proxy_pass http://localhost:3001;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```

## 🌐 Platform-Specific Deployments

### Vercel (Frontend) + Railway (Backend)

1. **Deploy Backend to Railway**

   - Connect your GitHub repository
   - Add environment variables
   - Deploy automatically

2. **Deploy Frontend to Vercel**
   - Connect your GitHub repository
   - Set build command: `cd frontend && npm run build`
   - Set output directory: `frontend/dist`

### AWS Deployment

#### Using AWS ECS + RDS

1. **Set up RDS PostgreSQL**
2. **Create ECS cluster**
3. **Deploy using Docker containers**

#### Using AWS Amplify + Lambda

1. **Deploy frontend to Amplify**
2. **Deploy backend as Lambda functions**

### Heroku Deployment

1. **Backend**

   ```bash
   # Create Heroku app
   heroku create your-app-backend

   # Add PostgreSQL addon
   heroku addons:create heroku-postgresql:hobby-dev

   # Deploy
   git subtree push --prefix backend heroku main
   ```

2. **Frontend**

   ```bash
   # Create static site on Heroku
   heroku create your-app-frontend
   heroku buildpacks:set https://github.com/heroku/heroku-buildpack-static

   # Add static.json configuration
   echo '{"root": "frontend/dist/"}' > static.json
   ```

## 🔧 Environment Configuration

### Backend Environment Variables (.env)

```env
# Database
DATABASE_URL="postgresql://user:password@host:port/database"

# Authentication
JWT_SECRET="your-very-secure-jwt-secret-key"

# Server
PORT=3001
NODE_ENV="production"

# CORS
CORS_ORIGIN="https://your-frontend-domain.com"

# File Upload (optional)
MAX_FILE_SIZE=5242880
UPLOAD_PATH="./uploads"
```

### Frontend Environment Variables

Create `frontend/.env.production`:

```env
VITE_API_URL=https://your-backend-domain.com/api
VITE_APP_TITLE="Government Services Platform"
```

## 📊 Monitoring & Maintenance

### Health Checks

Add health check endpoints:

```typescript
// backend/routes/health.ts
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version,
  });
});
```

### Logging

Set up structured logging:

```bash
# Install winston for logging
npm install winston

# Use PM2 for process management
pm2 start ecosystem.config.js
pm2 logs
```

### Backup Strategy

1. **Database Backups**

   ```bash
   # Daily backup
   pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql
   ```

2. **File Uploads Backup**
   ```bash
   # Backup uploaded files
   tar -czf uploads_backup_$(date +%Y%m%d).tar.gz uploads/
   ```

## 🔒 Security Considerations

### Production Security Checklist

- [ ] Use HTTPS/SSL certificates
- [ ] Set secure JWT secrets
- [ ] Configure CORS properly
- [ ] Enable rate limiting
- [ ] Set up firewall rules
- [ ] Use environment variables for secrets
- [ ] Enable database SSL
- [ ] Set up monitoring and alerts
- [ ] Regular security updates
- [ ] Backup strategy in place

### SSL Certificate Setup

Using Let's Encrypt with Certbot:

```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

## 📈 Scaling Considerations

### Horizontal Scaling

1. **Load Balancer** - Use Nginx or AWS ALB
2. **Multiple Backend Instances** - Scale backend horizontally
3. **Database Connection Pooling** - Use PgBouncer
4. **CDN** - Use CloudFront or similar for static assets

### Performance Optimization

1. **Database Indexing**
2. **Caching** - Redis for session/data caching
3. **Image Optimization** - Compress and optimize images
4. **Bundle Splitting** - Code splitting in frontend

## 🆘 Troubleshooting

### Common Issues

1. **Database Connection Errors**

   - Check DATABASE_URL format
   - Verify database server is running
   - Check firewall settings

2. **CORS Issues**

   - Verify CORS_ORIGIN setting
   - Check frontend API URL configuration

3. **Build Failures**
   - Check Node.js version compatibility
   - Clear node_modules and reinstall
   - Verify TypeScript compilation

### Useful Commands

```bash
# Check logs
pm2 logs gov-services-api

# Restart services
pm2 restart gov-services-api

# Database connection test
psql $DATABASE_URL -c "SELECT 1;"

# Check disk space
df -h

# Check memory usage
free -h
```
