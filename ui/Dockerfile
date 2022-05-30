FROM node:16-alpine

WORKDIR /usr/src/app/ui

COPY package*.json ./

RUN npm ci

EXPOSE 3000

CMD ["npm", "start"]
