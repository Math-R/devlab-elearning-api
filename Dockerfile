#WIP
FROM node:11

WORKDIR /elearning-api

RUN mkdir /elearning-api

COPY . .

RUN npm i && npm i -g pm2 && cp .env.docker .env && npm run build

CMD ["pm2-runtime", "start", "ecosystem.config.js", "-i", "max"]

EXPOSE $APP_PORT
