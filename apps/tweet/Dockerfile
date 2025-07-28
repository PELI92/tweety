FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./
COPY apps/tweet ./apps/tweet

RUN npm install

RUN npm run build:tweet

CMD ["node", "apps/tweet/dist/main.js"]
