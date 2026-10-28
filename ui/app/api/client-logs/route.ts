import { logger } from "@/libs/logger";

// Nhận lỗi từ trình duyệt (xem libs/client-log.ts) và ghi ra stdout bằng logger server
const str = (value: unknown, max: number) =>
  typeof value === "string" ? value.slice(0, max) : undefined;

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body.msg !== "string") {
    return new Response(null, { status: 400 });
  }
  const err = body.err && typeof body.err === "object" ? body.err : undefined;
  logger.warn(
    {
      source: "browser",
      route: str(body.route, 300),
      userAgent: str(req.headers.get("user-agent"), 300),
      err: err && {
        type: str(err.type, 100),
        message: str(err.message, 500),
        stack: str(err.stack, 2000),
        digest: str(err.digest, 100),
      },
    },
    body.msg.slice(0, 200),
  );
  return new Response(null, { status: 204 });
}
