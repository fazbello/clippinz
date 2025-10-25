# syntax=docker/dockerfile:1

FROM node:18-alpine AS base

# Install ffmpeg for video processing
RUN apk add --no-cache ffmpeg

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY server/package*.json ./server/

# Install dependencies
RUN npm install
RUN cd server && npm install

# Copy server source
COPY server ./server

# Expose server port
EXPOSE 3001

# Set environment to production
ENV NODE_ENV=production

# Start the server
CMD ["node", "server/src/index.js"]
