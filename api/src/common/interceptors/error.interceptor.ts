import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { randomUUID } from 'crypto';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface ErrorContext {
  requestId: string;
  path: string;
  method: string;
  userId?: string;
  userEmail?: string;
  timestamp: string;
  userAgent?: string;
  ip?: string;
}

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  constructor(private readonly logger: PinoLogger) {
    this.logger.setContext(ErrorInterceptor.name);
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        const enhancedError = this.enhanceError(error, context);
        return throwError(() => enhancedError);
      }),
    );
  }

  private enhanceError(error: any, context: ExecutionContext): any {
    const request = context.switchToHttp().getRequest();
    const requestId = request.id || randomUUID();

    const errorContext: ErrorContext = {
      requestId,
      path: request.url,
      method: request.method,
      userId: request.user?.id,
      userEmail: request.user?.email,
      timestamp: new Date().toISOString(),
      userAgent: request.get('user-agent'),
      ip: this.getClientIp(request),
    };

    if (error instanceof HttpException) {
      const response = error.getResponse() as any;
      error.message = { ...response, ...errorContext };
    } else {
      error.errorContext = errorContext;
    }

    this.logEnhancedError(error, errorContext);
    return error;
  }

  private getClientIp(request: any): string {
    return (
      request.ip ||
      request.connection?.remoteAddress ||
      request.socket?.remoteAddress ||
      request.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
      request.headers['x-real-ip'] ||
      'unknown'
    );
  }

  private logEnhancedError(error: any, context: ErrorContext): void {
    const statusCode = error.status || 500;
    const logData = {
      errorType: error.constructor?.name || 'Error',
      statusCode,
      message: error.message,
      stack: error.stack,
      context,
    };

    if (statusCode >= 500) {
      this.logger.error({ ...logData, msg: 'Server Error' });
    } else if (statusCode >= 400) {
      this.logger.error({ ...logData, msg: 'Client Error' });
    } else {
      this.logger.error({ ...logData, msg: 'Application Error' });
    }
  }
}
