import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MetricsService } from './metrics.service';

@Injectable()
export class MetricsInterceptor implements NestInterceptor {
  constructor(private readonly metricsService: MetricsService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const start = process.hrtime.bigint();

    return next.handle().pipe(
      tap(() => {
        const diff = process.hrtime.bigint() - start;
        const durationSec = Number(diff) / 1e9;
        const route = this.getRoute(request);
        const statusCode = response.statusCode || 200;

        this.metricsService.recordHttpRequest(
          request.method,
          route,
          statusCode,
          durationSec,
        );
      }),
    );
  }

  private getRoute(request: any): string {
    // Use the route path if available (e.g. /api/logs/:id)
    // Fallback to the URL path for unhandled routes
    return request.route?.path || request.url || 'unknown';
  }
}
