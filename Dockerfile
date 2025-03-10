# Start your image with a node base image
FROM node:20.18-alpine AS install
WORKDIR /app

# Copy only package.json and package-lock.json first for caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Build the application
RUN npm run build


FROM node:20.18-alpine AS runner
WORKDIR /app

# Set environment variables
ENV NODE_ENV=production

# Create a non-root user for better security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nuxt-commerce

# Prepare output directory
RUN mkdir .output && chown nuxt-commerce:nodejs .output

# Copy built output from install stage
COPY --from=install /app/.output ./.output

# Switch to non-root user
USER nuxt-commerce

EXPOSE 3000

# Health check (optional)
HEALTHCHECK CMD curl --fail http://localhost:3000 || exit 1

# Start the app using serve command
CMD [ "node", ".output/server/index.mjs" ]