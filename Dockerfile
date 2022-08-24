FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm i pnpm -g
RUN pnpm install
RUN pnpm run build
