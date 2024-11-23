# Start your image with a node base image
FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nuxt-commerce

RUN mkdir .output
RUN chown nuxt-commerce:nodejs .output

COPY --from=builder /app/.output ./.output

EXPOSE 3000

# Start the app using serve command
CMD [ "node", ".output/server/index.mjs" ]