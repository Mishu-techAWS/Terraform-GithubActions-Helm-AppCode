# Build stage
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies with specific version of npm
RUN apk add --no-cache python3 make g++ && \
    npm install -g npm@10.8.2 && \
    npm cache clean --force && \
    npm install --verbose

# Copy source code
COPY . .

# Expose port
EXPOSE 3001

# Start the application
CMD ["npm", "start"] 