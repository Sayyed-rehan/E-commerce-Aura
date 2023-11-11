import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from "express"
import {join} from 'path'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use("./../'uploads", express.static(join(__dirname, "..", 'uploads')))
  await app.listen(5000, '0.0.0.0');
}
bootstrap();
