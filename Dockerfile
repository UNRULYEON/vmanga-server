# syntax=docker/dockerfile:1

# Base
FROM node:14.16.1 as base
WORKDIR /app

COPY ["package.json", "yarn.lock", "./"]
RUN yarn install

# Development
FROM base as development
RUN yarn
COPY [".env.local", "./"]
COPY . .

# Production
FROM base as build
RUN yarn --prod

COPY . .
RUN yarn build
CMD ["yarn", "start"]