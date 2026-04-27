import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { IsPublic } from 'src/common/decorators/auth.decorator';
import { MetricsService } from './metrics.service';

@Controller('api/metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get()
  @IsPublic()
  async getMetrics(@Res() res: Response) {
    const metrics = await this.metricsService.getMetrics();
    res.set('Content-Type', this.metricsService.getContentType());
    res.send(metrics);
  }
}
