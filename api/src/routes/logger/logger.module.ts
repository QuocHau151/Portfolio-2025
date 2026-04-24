import { Global, Module } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';

@Global()
@Module({
  imports: [
    PinoLoggerModule.forRoot({
      pinoHttp:
        process.env.NODE_ENV === 'production'
          ? {
              level: process.env.LOG_LEVEL || 'info',
              autoLogging: false,
              formatters: {
                level: (label: string) => ({ level: label }),
              },
              base: { pid: process.pid },
            }
          : {
              level: 'silent',
            },
    }),
  ],
})
export class LoggerModule {}
