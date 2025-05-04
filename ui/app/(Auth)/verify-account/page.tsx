"use client";

import { Suspense } from "react";
import VerifyAccountForm from "@/components/layout/auth/verify-account-form";

export default function VerifyAccountPage() {
  return (
    <div className="container flex h-screen items-center justify-center">
      <Suspense fallback={<div>Đang tải...</div>}>
        <VerifyAccountForm />
      </Suspense>
    </div>
  );
}
