FROM node:22-alpine

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat openssl 
WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma

RUN npm install

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/prisma ./prisma

RUN npx prisma generate

COPY . .

RUN npm run build

USER root

EXPOSE 80


CMD ["node", "dist/main"]