# Example Dockerfile for server
FROM node:20-slim
WORKDIR /app
COPY server/package.json server/package-lock.json ./server/
RUN cd server && npm ci --production
COPY server ./server
WORKDIR /app/server
ENV NODE_ENV=production
EXPOSE 4000
CMD ["node", "index.js"]
