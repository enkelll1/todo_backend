# Use the official Node.js image from the Docker Hub
FROM node:18-alpine

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 8081

# Command to run the application
CMD ["npm", "start"]