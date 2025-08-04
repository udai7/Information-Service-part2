# Development
FROM node:18-alpine AS development
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD ["npm", "run", "dev"]

# Production Build
FROM node:18-alpine AS build
WORKDIR /app

# Install backend dependencies and build
COPY backend/package*.json ./backend/
RUN cd backend && npm ci --only=production

# Install frontend dependencies and build
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm ci
COPY frontend/ ./frontend/
RUN cd frontend && npm run build

# Copy backend source and build
COPY backend/ ./backend/
RUN cd backend && npm run build

# Production
FROM node:18-alpine AS production
WORKDIR /app

# Copy built backend
COPY --from=build /app/backend/dist ./backend/dist
COPY --from=build /app/backend/package*.json ./backend/
COPY --from=build /app/backend/node_modules ./backend/node_modules
COPY --from=build /app/backend/prisma ./backend/prisma

# Copy built frontend
COPY --from=build /app/frontend/dist ./frontend/dist

EXPOSE 3001
CMD ["node", "backend/dist/index.js"]
