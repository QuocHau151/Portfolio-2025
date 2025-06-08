import Dock from "@/components/layout/Dock/page";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children} <Dock />
    </>
  );
}
