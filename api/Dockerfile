# Base image
FROM node:22-alpine AS base

# Stage: deps
FROM base AS deps
RUN apk add --no-cache libc6-compat openssl 
WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma

RUN npm install

# Stage: builder
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/prisma ./prisma

RUN npx prisma generate

COPY . .

RUN npm run build

# Stage: runner
FROM base AS runner
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=deps /app/node_modules ./node_modules

USER node
EXPOSE 80

CMD ["node", "dist/main"]