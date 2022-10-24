import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config as envConfig } from 'dotenv';
import * as fs from 'fs';

async function bootstrap() {
  envConfig();
  const port = process.env['PORT'] || 3000;
  fs.mkdirSync(process.env['SAVE_DIRECTORY'], { recursive: true });
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
}
bootstrap();
