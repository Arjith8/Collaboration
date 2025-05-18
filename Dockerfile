FROM node:20-alpine AS deps

WORKDIR /app

COPY package*.json .
RUN npm install --frozen-lockfile

COPY . .

RUN ["npm", "run", "dev", "-H", "0.0.0.0"]

