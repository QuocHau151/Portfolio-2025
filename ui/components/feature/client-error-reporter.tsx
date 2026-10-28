"use client";

import { reportClientError } from "@/libs/client-log";
import { useEffect } from "react";

// Bắt lỗi trình duyệt chưa được xử lý (window.onerror, unhandledrejection) và gửi về server
export default function ClientErrorReporter() {
  useEffect(() => {
    const onError = (event: ErrorEvent) => {
      reportClientError(
        "Unhandled browser error",
        event.error ?? event.message,
      );
    };
    const onRejection = (event: PromiseRejectionEvent) => {
      reportClientError("Unhandled promise rejection", event.reason);
    };
    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);
    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
    };
  }, []);

  return null;
}
