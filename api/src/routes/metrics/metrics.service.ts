import { Injectable, OnModuleInit } from '@nestjs/common';
import * as promClient from 'prom-client';

@Injectable()
export class MetricsService implements OnModuleInit {
  readonly registry: promClient.Registry;

  readonly httpRequestDuration: promClient.Histogram<string>;
  readonly httpRequestsTotal: promClient.Counter<string>;
  readonly activeConnections: promClient.Gauge<string>;

  readonly logsIngestedTotal: promClient.Counter<string>;
  readonly logsByLevelTotal: promClient.Counter<string>;
  readonly telegramAlertsTotal: promClient.Counter<string>;
  readonly telegramAlertErrorsTotal: promClient.Counter<string>;

  constructor() {
    this.registry = new promClient.Registry();

    this.httpRequestDuration = new promClient.Histogram({
      name: 'http_request_duration_seconds',
      help: 'Duration of HTTP requests in seconds',
      labelNames: ['method', 'route', 'status_code'],
      buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10],
      registers: [this.registry],
    });

    this.httpRequestsTotal = new promClient.Counter({
      name: 'http_requests_total',
      help: 'Total number of HTTP requests',
      labelNames: ['method', 'route', 'status_code'],
      registers: [this.registry],
    });

    this.activeConnections = new promClient.Gauge({
      name: 'http_active_connections',
      help: 'Number of active HTTP connections',
      registers: [this.registry],
    });

    this.logsIngestedTotal = new promClient.Counter({
      name: 'logs_ingested_total',
      help: 'Total number of logs ingested',
      labelNames: ['source', 'level'],
      registers: [this.registry],
    });

    this.logsByLevelTotal = new promClient.Counter({
      name: 'logs_by_level_total',
      help: 'Total number of logs by level',
      labelNames: ['level', 'service_name'],
      registers: [this.registry],
    });

    this.telegramAlertsTotal = new promClient.Counter({
      name: 'telegram_alerts_sent_total',
      help: 'Total number of Telegram alerts sent',
      labelNames: ['level', 'service_name'],
      registers: [this.registry],
    });

    this.telegramAlertErrorsTotal = new promClient.Counter({
      name: 'telegram_alert_errors_total',
      help: 'Total number of Telegram alert failures',
      registers: [this.registry],
    });
  }

  onModuleInit() {
    promClient.collectDefaultMetrics({
      register: this.registry,
      prefix: 'nodejs_',
    });
  }

  async getMetrics(): Promise<string> {
    return await this.registry.metrics();
  }

  getContentType(): string {
    return this.registry.contentType;
  }

  recordHttpRequest(
    method: string,
    route: string,
    statusCode: number,
    durationSec: number,
  ) {
    const labels = {
      method: method.toUpperCase(),
      route,
      status_code: String(statusCode),
    };
    this.httpRequestDuration.observe(labels, durationSec);
    this.httpRequestsTotal.inc(labels);
  }

  incLogsIngested(source: string, level: string) {
    this.logsIngestedTotal.inc({ source, level });
  }

  incLogsByLevel(level: string, serviceName: string) {
    this.logsByLevelTotal.inc({ level, service_name: serviceName });
  }

  incTelegramAlert(level: string, serviceName: string) {
    this.telegramAlertsTotal.inc({ level, service_name: serviceName });
  }

  incTelegramAlertError() {
    this.telegramAlertErrorsTotal.inc();
  }
}
