import type { IncomingMessage, ServerResponse } from 'http';
import { randomUUID } from 'crypto';
import pino, { DestinationStream, LoggerOptions } from 'pino';
import { REQUEST_USER_KEY } from 'src/common/constants/auth.constant';

// Logger gốc duy nhất của API, theo Logging Standard v1.0:
// JSON một dòng ra stdout, mức đọc từ LOG_LEVEL, có service, redact dữ liệu nhạy cảm.
// Mọi nơi khác (Nest, pino-http, script) đều dùng instance này.

const isProduction = process.env.NODE_ENV === 'production';

// LOG_FORMAT=pretty|json. Mặc định: in đẹp khi chạy dev trên terminal, JSON ở mọi nơi khác (container, CI).
const usePretty =
  process.env.LOG_FORMAT === 'pretty' ||
  (process.env.LOG_FORMAT !== 'json' &&
    !isProduction &&
    Boolean(process.stdout.isTTY));

// Log khởi động của Nest (mỗi route / module một dòng) chỉ có ích khi dò lỗi
const NOISY_CONTEXTS = new Set([
  'InstanceLoader',
  'RoutesResolver',
  'RouterExplorer',
  'WebSocketsController',
]);

const IGNORED_PATH = /^\/(api\/)?(health|healthz|ready|live|metrics)(\/|$)/;
const IGNORED_USER_AGENT = /^(kube-probe|Prometheus)\//;

const stripQuery = (url?: string) => (url ?? '').split('?')[0];

const firstHeader = (value?: string | string[]) =>
  (Array.isArray(value) ? value[0] : value)?.split(',')[0]?.trim();

export const getRemoteAddress = (req: IncomingMessage) =>
  firstHeader(req.headers['cf-connecting-ip']) ||
  firstHeader(req.headers['x-forwarded-for']) ||
  req.socket?.remoteAddress;

// Chỉ giữ type / message / stack (+ code, status nếu có). Không chép các thuộc tính khác
// của error vì chúng hay chứa config request, header, URL kèm mật khẩu (vd: AxiosError).
const serializeError = (err: any) => {
  if (!err || typeof err !== 'object') return err;
  // pino-http đã serialize sẵn (giữ error gốc ở .raw); logger thường thì chưa
  const base = err.raw ? err : pino.stdSerializers.err(err);
  err = err.raw ?? err;
  return {
    type: base.type,
    message: base.message,
    stack: base.stack,
    ...(err.code !== undefined && { code: err.code }),
    ...(typeof err.status === 'number' && { status: err.status }),
    ...(typeof err.statusCode === 'number' && { statusCode: err.statusCode }),
  };
};

const options: LoggerOptions = {
  // Không dựa vào NODE_ENV vì ConfigMap production không đặt biến này
  level: process.env.LOG_LEVEL || (usePretty ? 'debug' : 'info'),
  base: { service: process.env.SERVICE_NAME || 'portfolio-api' },
  timestamp: pino.stdTimeFunctions.isoTime,
  messageKey: 'msg',
  formatters: { level: (label) => ({ level: label }) },
  serializers: { err: serializeError },
  redact: {
    paths: [
      'req.headers.authorization',
      'req.headers.cookie',
      'res.headers["set-cookie"]',
      '*.password',
      '*.accessToken',
      '*.refreshToken',
      '*.token',
      '*.totpCode',
    ],
    censor: '***',
  },
  hooks: {
    logMethod(args, method, level) {
      const first = args[0] as { context?: string } | undefined;
      if (
        level === 30 &&
        first &&
        typeof first === 'object' &&
        NOISY_CONTEXTS.has(first.context ?? '')
      ) {
        if (!this.isLevelEnabled('debug')) return;
        return this.debug(...(args as [object, string]));
      }
      return method.apply(this, args);
    },
  },
};

const createDestination = (): DestinationStream | undefined => {
  if (!usePretty) return undefined;
  // pino-pretty chỉ có ở devDependencies, nên chỉ require khi thật sự in đẹp
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const pretty = require('pino-pretty') as typeof import('pino-pretty');
  return pretty({
    sync: true,
    colorize: true,
    translateTime: 'SYS:HH:MM:ss.l',
    ignore: 'pid,hostname,service,context,req,res,responseTime,requestId',
    // "[Context] msg 12ms" — gọn trên một dòng, ngữ cảnh khác in bên dưới dạng key: value
    messageFormat: (log, messageKey, _levelLabel, { colors }) => {
      const context = log.context
        ? colors.yellow(`[${String(log.context as string)}] `)
        : '';
      const time =
        log.responseTime !== undefined
          ? colors.gray(` ${log.responseTime as number}ms`)
          : '';
      return `${context}${log[messageKey] as string}${time}`;
    },
    errorLikeObjectKeys: [],
    customPrettifiers: {
      // In err như stack trace của Node thay vì object JSON; dòng trong node_modules in mờ
      err: (value: any) => {
        const lines = String(
          value?.stack ?? `${value?.type}: ${value?.message}`,
        ).split('\n');
        const code = value?.code !== undefined ? ` (code: ${value.code})` : '';
        return [
          `\x1b[31m${lines[0]}\x1b[39m${code}`,
          ...lines
            .slice(1)
            .map((line) =>
              line.includes('node_modules') || line.includes('node:internal')
                ? `\x1b[90m${line}\x1b[39m`
                : line,
            ),
        ].join('\n');
      },
    },
  });
};

export const rootLogger = pino(options, createDestination());

// Cấu hình access log cho pino-http: một dòng mỗi request khi response kết thúc
export const httpLoggerOptions = {
  logger: rootLogger,
  genReqId: (req: IncomingMessage) =>
    firstHeader(req.headers['x-request-id'])?.slice(0, 64) || randomUUID(),
  customAttributeKeys: { reqId: 'requestId' },
  // Log trong request chỉ mang requestId; req đầy đủ chỉ nằm ở dòng access log
  quietReqLogger: true,
  autoLogging: {
    ignore: (req: IncomingMessage) =>
      req.method === 'OPTIONS' ||
      IGNORED_PATH.test(stripQuery(req.url)) ||
      IGNORED_USER_AGENT.test(req.headers['user-agent'] ?? ''),
  },
  customLogLevel: (_req: IncomingMessage, res: ServerResponse, err?: Error) =>
    err || res.statusCode >= 500
      ? 'error'
      : res.statusCode >= 400
        ? 'warn'
        : 'info',
  customSuccessMessage: (req: IncomingMessage, res: ServerResponse) =>
    `${req.method} ${stripQuery((req as any).originalUrl ?? req.url)} ${res.statusCode}`,
  customErrorMessage: (req: IncomingMessage, res: ServerResponse) =>
    `${req.method} ${stripQuery((req as any).originalUrl ?? req.url)} ${res.statusCode}`,
  customProps: (req: IncomingMessage) => {
    const userId = (req as any)[REQUEST_USER_KEY]?.userId;
    return userId !== undefined ? { userId: String(userId) } : {};
  },
  serializers: {
    req: (req: any) => ({
      method: req.method,
      url: stripQuery(req.raw?.originalUrl ?? req.url),
      remoteAddress: req.raw ? getRemoteAddress(req.raw) : req.remoteAddress,
      headers: { 'user-agent': req.headers?.['user-agent'] },
    }),
    res: (res: any) => ({ statusCode: res.statusCode }),
    err: serializeError,
  },
};
