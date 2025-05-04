import Footer from "@/components/layout/Footer/page";
import { Header } from "@/components/layout/Header/page";
import ScrollLinked from "@/components/ui/scroll-linked";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ScrollLinked />
      <Header />
      <div className="mt-20 md:mt-[140px] lg:mt-20 xl:mt-[100px]">
        {children}
      </div>
      <Footer />
    </>
  );
}
