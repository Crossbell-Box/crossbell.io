FROM node:16

WORKDIR /app

COPY . .

RUN npm install -g npm@v8.0.0 && npm install
RUN npm run build
