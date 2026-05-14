# --- Stage 1: Build Frontend ---
FROM node:20-alpine AS frontend-builder
WORKDIR /app
ARG VITE_NEON_AUTH_URL
ENV VITE_NEON_AUTH_URL=$VITE_NEON_AUTH_URL
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build 
# Frontend is now in /app/dist

# --- Stage 2: Prepare Backend ---
FROM node:20-alpine AS backend-builder
WORKDIR /app/server
# Copy server-specific package files
COPY server/package*.json ./
RUN npm install
# Copy server code
COPY server/ ./
# Copy prisma from root to generate client inside the server's node_modules
COPY prisma ../prisma
RUN npx prisma generate

# --- Stage 3: Runner ---
FROM node:20-alpine
WORKDIR /app

# Install tsx globally to run the server
RUN npm install -g tsx

# Copy built frontend
COPY --from=frontend-builder /app/dist ./dist

# Copy backend dependencies and code
COPY --from=backend-builder /app/server ./server
COPY --from=backend-builder /app/prisma ./prisma

# Environment variables
ENV NODE_ENV=production
ENV PORT=3001

EXPOSE 3001

# Start the server (using tsx directly on the source file)
WORKDIR /app/server
CMD ["tsx", "src/index.ts"]