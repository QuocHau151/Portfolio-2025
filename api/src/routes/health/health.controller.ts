import { Controller, Get, Header } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';
import { IsPublic } from 'src/common/decorators/auth.decorator';

@ApiTags('health')
@Controller('health')
export class HealthController {
  @Get()
  @IsPublic()
  @SkipThrottle({ short: true, long: true })
  @Header('Cache-Control', 'no-store')
  @ApiOperation({ summary: 'Kiểm tra API còn phản hồi' })
  check() {
    return {
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    };
  }
}
