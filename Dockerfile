FROM node:18-alpine

WORKDIR /app

COPY . .

RUN wget -qO- https://get.pnpm.io/install.sh | sh -
RUN pnpm install
RUN pnpm run build
