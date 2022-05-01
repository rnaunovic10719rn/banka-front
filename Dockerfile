FROM node:16.14

LABEL org.opencontainers.image.source https://github.com/RAF-SI-2021/banka-front

WORKDIR /usr/app

COPY package.json .
COPY package-lock.json .

RUN npm install

RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache

COPY . .

USER node

CMD ["npm", "start"]

