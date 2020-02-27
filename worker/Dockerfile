FROM node:9-alpine

# Copy files into the container
COPY . /app
WORKDIR /app

# Install everything
RUN npm install

# Expose port 5000 unless specified different by docker-compose.yml
ARG PORT=5000
ARG NODE_ENV=dev

# Database connection URI
ARG DB_URI

EXPOSE $PORT
