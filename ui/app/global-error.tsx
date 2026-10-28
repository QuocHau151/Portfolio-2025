"use client";

import { reportClientError } from "@/libs/client-log";
import { useEffect } from "react";

// Error boundary gốc: lỗi render không bắt được ở đâu khác sẽ tới đây
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    reportClientError("Unhandled UI error", error);
  }, [error]);

  return (
    <html lang="vi" className="dark">
      <body className="flex min-h-screen flex-col items-center justify-center gap-4">
        <h2 className="text-xl font-semibold">Đã có lỗi xảy ra</h2>
        <button className="rounded-md border px-4 py-2" onClick={() => reset()}>
          Thử lại
        </button>
      </body>
    </html>
  );
}
