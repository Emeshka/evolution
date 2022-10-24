import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  start() {
    return this.appService.start();
  }

  @Get('/seed')
  seed() {
    return this.appService.seed();
  }
}