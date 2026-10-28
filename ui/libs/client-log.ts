import { HttpError } from "@/libs/http";

// Gửi lỗi của trình duyệt về POST /api/client-logs để server ghi log (trình duyệt không có stdout).
// Lỗi từ API (HttpError) không gửi lại vì API đã ghi chúng trong access log.

const MAX_PER_MINUTE = 5;
let windowStart = 0;
let sentInWindow = 0;

const allowSend = () => {
  const now = Date.now();
  if (now - windowStart > 60_000) {
    windowStart = now;
    sentInWindow = 0;
  }
  return ++sentInWindow <= MAX_PER_MINUTE;
};

const toErr = (error: unknown) => {
  if (error instanceof Error) {
    return {
      type: error.name,
      message: error.message,
      stack: error.stack,
      digest: (error as Error & { digest?: string }).digest,
    };
  }
  return { type: typeof error, message: String(error) };
};

/** msg là câu cố định (không chứa biến), ví dụ "Create order failed". */
export function reportClientError(msg: string, error?: unknown) {
  if (typeof window === "undefined" || error instanceof HttpError) return;
  if (process.env.NODE_ENV !== "production") {
    // Dev: vẫn hiện trên devtools cho dễ dò
    console.error(msg, error);
  }
  if (!allowSend()) return;
  void fetch("/api/client-logs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    keepalive: true,
    body: JSON.stringify({
      level: "error",
      msg,
      route: window.location.pathname,
      err: error === undefined ? undefined : toErr(error),
    }),
  }).catch(() => {
    // Không gửi được log thì bỏ qua, tránh vòng lặp báo lỗi
  });
}
