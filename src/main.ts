import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as fs from 'fs';
import * as morgan from 'morgan';

const logStream = fs.createWriteStream('api.log', {
  flags: 'a',
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.setGlobalPrefix('/api/v1');

  app.use(morgan('tiny', { stream: logStream }));

  await app.listen(3000);
}
bootstrap();
