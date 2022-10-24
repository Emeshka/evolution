import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';

async function bootstrap() {
  config();
  const port = process.env['PORT'] || 3000;
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
}
bootstrap();
