# Fetch Node.js 13
FROM node:13.7.0-alpine3.11

# Create folder that will contain the project files
RUN mkdir /app
WORKDIR /app

# Copy package.json
COPY package.json /app
RUN npm install

# copy application files
COPY . .

# open port 3030 (default for node) for communication with container
EXPOSE 3030
