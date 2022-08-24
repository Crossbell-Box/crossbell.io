FROM node:18-alpine

WORKDIR /app

COPY . .

RUN apk add --no-cache curl
RUN curl -fsSL https://get.pnpm.io/install.sh | sh -
RUN pnpm install
RUN pnpm run build
