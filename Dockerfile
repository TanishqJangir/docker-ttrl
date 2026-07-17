# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Provide a dummy MONGODB_URI for build time
ARG MONGODB_URI=mongodb://localhost:27017/dummy
RUN MONGODB_URI=$MONGODB_URI npm run build

# Runtime stage
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

ENV MONGO_DB_USERNAME=admin \
    MONGO_DB_PWD=qwerty

EXPOSE 3000

CMD ["npm", "start"]
