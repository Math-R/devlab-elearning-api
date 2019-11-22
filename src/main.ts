import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  setupSwagger(app);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
  console.log('App run at http://127.0.0.1:3000/api');
  console.log('App run at http://127.0.0.1:3000/api/docs');

}

bootstrap();
