import { Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { rootLogger } from 'src/routes/logger/logger';

const logger = rootLogger.child({ context: 'Prisma' });

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, 'info' | 'warn' | 'error'>
  implements OnModuleInit
{
  constructor() {
    super({
      // Đưa log của Prisma qua logger chung thay vì để Prisma tự in text ra stdout
      log: [
        { emit: 'event', level: 'info' },
        { emit: 'event', level: 'warn' },
        { emit: 'event', level: 'error' },
      ],
    });
    this.$on('info', (e) => {
      logger.debug({ detail: e.message, target: e.target }, 'Prisma info');
    });
    this.$on('warn', (e) => {
      logger.warn({ detail: e.message, target: e.target }, 'Prisma warning');
    });
    this.$on('error', (e) => {
      logger.error({ detail: e.message, target: e.target }, 'Prisma error');
    });
  }
  async onModuleInit() {
    await this.$connect();
  }
}
