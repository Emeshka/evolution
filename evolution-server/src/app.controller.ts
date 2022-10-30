import { Controller, Get, Put } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Put('start-simulation')
  startSimulation() {
    return this.appService.startSimulation();
  }

  @Put('resume-simulation')
  resumeSimulation() {
    return this.appService.resumeSimulation();
  }

  @Put('stop-simulation')
  stopSimulation() {
    return this.appService.stopSimulation();
  }

  @Get('/seed')
  seed() {
    return this.appService.seed();
  }
}
