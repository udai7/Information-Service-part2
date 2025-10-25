# Government Services Information Platform

A comprehensive full-stack web application for managing and accessing government services, schemes, certificates, and grievances. The platform includes a citizen-facing web portal, administrative dashboard, and WhatsApp bot integration for multi-channel service delivery.

## 🌟 Features

### For Citizens

- **📋 Scheme Services**: Browse and apply for various government schemes
- **📜 Certificate Services**: Apply for certificates online (Birth, Death, Caste, Income, etc.)
- **📞 Contact Services**: Access government office contact information
- **📝 Feedback & Grievances**: Submit feedback and track grievance status
- **🚨 Emergency Services**: Quick access to emergency contact numbers
- **💬 WhatsApp Bot**: Interact with services via WhatsApp in Bengali and English

### For Administrators

- **👨‍💼 Admin Dashboard**: Centralized management interface
- **📊 Service Management**: Create, edit, and manage all services
- **👥 Application Review**: Review and process certificate applications
- **📈 Analytics**: View service statistics and user engagement
- **🔐 Secure Authentication**: Role-based access control with JWT

### Technical Features

- **🎨 Modern UI**: Built with React, TypeScript, and Tailwind CSS
- **⚡ Real-time Updates**: Fast and responsive user experience
- **🔒 Secure**: JWT authentication, input validation, and secure data handling
- **📱 Responsive Design**: Mobile-first approach for all devices
- **🌐 Multi-language**: Support for Bengali and English
- **🐳 Docker Support**: Easy deployment with Docker containers

## 🏗️ Technology Stack

### Frontend

- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI, shadcn/ui
- **State Management**: React Query (TanStack Query)
- **Routing**: React Router v6
- **Build Tool**: Vite
- **Animations**: Framer Motion
- **3D Graphics**: Three.js, React Three Fiber

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT (jsonwebtoken), bcryptjs
- **Validation**: Express Validator, Zod
- **File Upload**: Multer

### WhatsApp Bot

- **Platform**: WhatsApp Business API
- **Language**: TypeScript
- **Database**: PostgreSQL (Prisma)
- **Caching**: Node Cache
- **Languages**: Bengali, English

### DevOps

- **Containerization**: Docker, Docker Compose
- **Web Server**: Nginx (reverse proxy)
- **Database**: PostgreSQL 15
- **CI/CD Ready**: Structured for deployment pipelines

## 📁 Project Structure

```
Information-Service-part2/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── contexts/        # React contexts (Auth)
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Utility functions
│   │   └── types/           # TypeScript type definitions
│   └── public/              # Static assets
├── backend/                  # Express.js backend API
│   ├── routes/              # API route handlers
│   │   ├── adminAuth.ts     # Admin authentication
│   │   ├── schemeService.ts # Scheme management
│   │   ├── certificateService.ts
│   │   ├── contactService.ts
│   │   ├── feedback.ts
│   │   └── grievance.ts
│   ├── prisma/              # Database schema and migrations
│   │   ├── schema.prisma    # Prisma schema
│   │   └── migrations/      # Database migrations
│   ├── types/               # TypeScript types
│   └── shared/              # Shared utilities
├── whatsapp-bot/            # WhatsApp bot service
│   ├── src/
│   │   ├── handlers/        # Message handlers
│   │   ├── services/        # Business logic
│   │   ├── translations/    # Multi-language support
│   │   └── utils/           # Utility functions
│   └── prisma/              # Bot database schema
├── docker-compose.yml       # Docker orchestration
├── Dockerfile               # Container image definition
└── nginx.conf               # Nginx configuration

```

## 🎯 Core Services

### 1. Scheme Services

- Government welfare schemes
- Eligibility checking
- Application guidance
- Online/offline application modes

### 2. Certificate Services

- Birth Certificate
- Death Certificate
- Caste Certificate
- Income Certificate
- Domicile Certificate
- Character Certificate
- Application tracking
- Document upload

### 3. Contact Services

- Government office directory
- Department information
- Contact details (phone, email, address)
- Office hours and locations

### 4. Feedback & Grievance System

- Submit feedback
- File grievances
- Track complaint status
- Admin resolution workflow

### 5. Emergency Services

- Quick access to emergency numbers
- Police, Fire, Ambulance
- Helpline numbers

## 🚀 Quick Start

See [SETUP.md](SETUP.md) for detailed setup instructions for:

- Frontend setup
- Backend setup
- WhatsApp Bot setup
- Docker deployment

## 📚 Documentation

- [SETUP.md](SETUP.md) - Complete setup guide for all services
- [BACKEND_README.md](BACKEND_README.md) - Backend API documentation
- [DATABASE_SETUP.md](DATABASE_SETUP.md) - Database configuration guide
- [WHATSAPP_BOT_INTEGRATION.md](WHATSAPP_BOT_INTEGRATION.md) - WhatsApp bot guide
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment instructions

## 🔐 Environment Variables

### Backend (.env)

```env
DATABASE_URL="postgresql://user:password@localhost:5432/government_services"
JWT_SECRET="your-secret-key"
PORT=3001
NODE_ENV=development
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:3001
```

### WhatsApp Bot (.env)

```env
DATABASE_URL="postgresql://user:password@localhost:5432/government_services"
WHATSAPP_API_URL="your-whatsapp-api-url"
WHATSAPP_API_TOKEN="your-api-token"
PORT=3002
```

## 🗄️ Database Models

- **Admin**: Administrator accounts
- **SchemeService**: Government schemes
- **CertificateService**: Certificate types and applications
- **CertificateApplication**: User applications
- **ContactService**: Government office contacts
- **Feedback**: User feedback
- **Grievance**: User complaints
- **WhatsAppUser**: WhatsApp bot users
- **WhatsAppSession**: Conversation sessions

## 🛣️ API Endpoints

### Authentication

- `POST /api/admin/register` - Register admin
- `POST /api/admin/login` - Admin login
- `GET /api/admin/profile` - Get admin profile

### Schemes

- `GET /api/schemes` - List all schemes
- `POST /api/schemes` - Create scheme (admin)
- `PUT /api/schemes/:id` - Update scheme (admin)
- `DELETE /api/schemes/:id` - Delete scheme (admin)

### Certificates

- `GET /api/certificates` - List certificate services
- `POST /api/certificates/apply` - Submit application
- `GET /api/certificates/applications` - List applications (admin)

### Contact Services

- `GET /api/contacts` - List all contacts
- `POST /api/contacts` - Create contact (admin)

### Feedback & Grievances

- `POST /api/feedback` - Submit feedback
- `POST /api/grievances` - File grievance
- `GET /api/grievances/:id` - Track grievance status

## 🎨 UI Components

Built with **shadcn/ui** and **Radix UI**:

- Buttons, Cards, Dialogs
- Forms with validation
- Tables with sorting and filtering
- Toasts and notifications
- Accordions and tabs
- Dropdowns and selects
- And many more...

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- CORS configuration
- SQL injection prevention (Prisma)
- XSS protection
- Secure file upload handling

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📱 WhatsApp Bot Commands

- **Start**: Initiate conversation
- **Schemes**: Browse schemes
- **Certificates**: Apply for certificates
- **Contact**: Get office contacts
- **Emergency**: Emergency numbers
- **Language**: Switch between Bengali/English

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

Government Services Platform Development Team

## 🙏 Acknowledgments

- React and TypeScript communities
- Prisma team
- shadcn/ui for amazing components
- All contributors and testers

## 📞 Support

For support, email support@govservices.com or create an issue in the repository.

---

**Made with ❤️ for better government service delivery**
