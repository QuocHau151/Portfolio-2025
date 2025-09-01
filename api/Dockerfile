FROM node:22-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# Copy Prisma schema and .env BEFORE prisma generate
COPY prisma ./prisma

# Generate Prisma client
RUN npx prisma generate

# Copy the rest of the code
COPY . .

RUN npm run build

CMD ["node", "dist/main"]