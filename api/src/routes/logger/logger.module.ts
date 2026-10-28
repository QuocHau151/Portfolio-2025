import { Global, Module } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { httpLoggerOptions } from './logger';

@Global()
@Module({
  imports: [PinoLoggerModule.forRoot({ pinoHttp: httpLoggerOptions })],
})
export class LoggerModule {}
