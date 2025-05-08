import { Suspense } from "react";

export default function OAuthPage({ children }: { children: React.ReactNode }) {
  return <Suspense>{children}</Suspense>;
}
