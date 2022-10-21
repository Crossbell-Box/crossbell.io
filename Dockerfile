FROM node:19-alpine

WORKDIR /app

COPY . .

RUN npm i pnpm@latest -g
# RUN pnpm install -r --offline
RUN pnpm run build
