FROM node:18-alpine AS base

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app
# COPY yarn.lock /usr/src/app

ENV PORT 3000

RUN yarn

EXPOSE 3000

CMD ["yarn", "dev"]
