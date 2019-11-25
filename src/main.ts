import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger';
import { ValidationPipe } from '@nestjs/common';
import bodyParser = require('body-parser');
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  setupSwagger(app);
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.APP_PORT, '0.0.0.0');
  console.log(
    `🚀 Server listen on ${process.env.APP_PORT}, see ${process.env.APP_URL}:${
      process.env.APP_PORT
      }/api for see result`,
  );

  console.log(
    `🚀 Go to ${process.env.APP_URL}:${
      process.env.APP_PORT
      }/api/docs for see swagger page`,
  );

}

bootstrap();
