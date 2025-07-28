FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./
COPY apps/user ./apps/user

RUN npm install

RUN npm run build:user

CMD ["node", "apps/user/dist/main.js"]
