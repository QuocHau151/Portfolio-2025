import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ZodSerializationException } from 'nestjs-zod';

@Catch()
export class CatchEverythingFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal Server Error';

    // Lỗi server: gắn exception vào response để access log (pino-http) ghi ERROR kèm err.
    // Lỗi 4xx đã được access log ghi ở WARN, không cần thêm dòng nào.
    if (httpStatus >= 500) {
      ctx.getResponse().err =
        exception instanceof ZodSerializationException
          ? exception.getZodError()
          : exception;
    }

    const responseBody = {
      statusCode: httpStatus,
      message,
    };
    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
