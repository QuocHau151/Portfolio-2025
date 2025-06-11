import ChatWidget from "@/components/feature/chat";
import Dock from "@/components/layout/Dock/page";
import Footer from "@/components/layout/Footer/page";
import { Header } from "@/components/layout/Header/page";
import ScrollLinked from "@/components/ui/scroll-linked";
import { Suspense } from "react";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ScrollLinked />
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <div className="mt-20 md:mt-[140px] lg:mt-20 xl:mt-[100px]">
          {children}
        </div>
        <ChatWidget />
      </Suspense>
      <Dock />
      <Footer />
    </>
  );
}
