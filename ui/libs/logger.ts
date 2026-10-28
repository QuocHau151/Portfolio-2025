import pino, { DestinationStream } from "pino";

// Logger server của UI (SSR, route handler, proxy) theo Logging Standard v1.0.
// Chỉ import ở code chạy trên server; trình duyệt gửi lỗi qua POST /api/client-logs.

// LOG_FORMAT=pretty|json. Mặc định: in đẹp khi `next dev`, JSON khi chạy production (container).
const usePretty =
  process.env.LOG_FORMAT === "pretty" ||
  (process.env.LOG_FORMAT !== "json" && process.env.NODE_ENV !== "production");

const createDestination = (): DestinationStream | undefined => {
  if (!usePretty) return undefined;
  // pino-pretty chỉ có ở devDependencies
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const pretty = require("pino-pretty") as typeof import("pino-pretty");
  return pretty({
    sync: true,
    colorize: true,
    translateTime: "SYS:HH:MM:ss.l",
    ignore: "pid,hostname,service",
    errorLikeObjectKeys: [],
    customPrettifiers: {
      // In err như stack trace của Node thay vì object JSON
      err: (value: any) => {
        const text = String(
          value?.stack || `${value?.type}: ${value?.message}`,
        ).split("\n");
        return [
          `\x1b[31m${text[0]}\x1b[39m`,
          ...text
            .slice(1)
            .map((line) =>
              line.includes("node_modules") || line.includes("node:internal")
                ? `\x1b[90m${line}\x1b[39m`
                : line,
            ),
        ].join("\n");
      },
    },
  });
};

export const logger = pino(
  {
    level: process.env.LOG_LEVEL || (usePretty ? "debug" : "info"),
    base: { service: process.env.SERVICE_NAME || "portfolio-ui" },
    timestamp: pino.stdTimeFunctions.isoTime,
    formatters: { level: (label) => ({ level: label }) },
    // Error thật thì serialize chuẩn; object { type, message, stack } đã chuẩn bị sẵn thì giữ nguyên
    serializers: {
      err: (err: unknown) =>
        err instanceof Error ? pino.stdSerializers.err(err) : err,
    },
    redact: {
      paths: ["*.password", "*.accessToken", "*.refreshToken", "*.token"],
      censor: "***",
    },
  },
  createDestination(),
);
