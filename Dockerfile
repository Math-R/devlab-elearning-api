#WIP
FROM node:11

RUN mkdir /elearning-api

WORKDIR /elearning-api

COPY . .

RUN npm i && npm i -g pm2 && cp .env.docker .env && npm run build

RUN ls

CMD ["pm2-runtime", "start", "ecosystem.config.js", "-i", "max"]

EXPOSE $APP_PORT
