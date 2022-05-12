# syntax=docker/dockerfile:1

FROM node:16.15.0-alpine
ENV NODE_ENV=production

WORKDIR /festival-app

COPY ["package.json", "yarn.lock", "./"]

RUN yarn install

COPY . .

CMD [ "yarn", "start"]