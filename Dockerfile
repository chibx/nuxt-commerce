# Start your image with a node base image
FROM node:22

# The /app directory should act as the main application directory
WORKDIR /usr/app

# Copy the app package and package-lock.json file
COPY package.json /usr/app/
# COPY . /usr/app/

# Install node packages, install serve, build the app, and remove dependencies at the end
RUN npm install \
    && npm run build \
    && rm -rf node_modules

# RUN npm run build

EXPOSE 3000

# Start the app using serve command
CMD [ "node", ".output/server/index.mjs" ]