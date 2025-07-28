FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./
COPY apps/auth ./apps/auth

RUN npm install

RUN npm run build:auth

CMD ["node", "apps/auth/dist/main.js"]
