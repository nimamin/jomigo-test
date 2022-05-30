FROM node:16-alpine as base

WORKDIR /usr/src/app/api

COPY package*.json ./

RUN npm ci

EXPOSE 3080

FROM base as production
ENV NODE_ENV=production
RUN npm ci
COPY . /
CMD ["node", "bin/www"]

FROM base as dev
ENV NODE_ENV=development
RUN npm install -g nodemon && npm install
COPY . /
CMD ["nodemon", "bin/www"]
