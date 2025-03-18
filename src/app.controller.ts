import { Controller, Get, UseGuards, Version, VERSION_NEUTRAL } from '@nestjs/common';

import { AppService } from './app.service';
import { JwtAuthGuard } from './shared/guards/jwtAuth.guard';

@Controller()
@UseGuards(JwtAuthGuard)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Version(VERSION_NEUTRAL)
  @Get('health-check')
  async healthCheck(): Promise<{ message: string }> {
    console.log('healthCheck');
    return this.appService.healthCheck();
  }
}
