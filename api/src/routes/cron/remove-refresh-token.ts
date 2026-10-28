import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { randomUUID } from 'crypto';
import { PinoLogger } from 'nestjs-pino';
import { PrismaService } from 'src/common/services/prisma.service';

@Injectable()
export class RemoveRefreshTokenCronjob {
  constructor(
    private prismaService: PrismaService,
    private readonly logger: PinoLogger,
  ) {
    this.logger.setContext(RemoveRefreshTokenCronjob.name);
  }

  @Cron(CronExpression.EVERY_DAY_AT_5PM)
  async handleCron() {
    const log = this.logger.logger.child({
      job: 'remove-expired-refresh-token',
      jobId: randomUUID(),
    });
    const started = Date.now();
    log.info('Job started');
    try {
      const { count } = await this.prismaService.refreshToken.deleteMany({
        where: {
          expiresAt: {
            lt: new Date(),
          },
        },
      });
      log.info(
        { deleted: count, durationMs: Date.now() - started },
        'Job finished',
      );
    } catch (err) {
      log.error({ err, durationMs: Date.now() - started }, 'Job failed');
      throw err;
    }
  }
}
