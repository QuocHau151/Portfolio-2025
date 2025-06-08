import { AppSidebar } from "@/components/layout/dashboard/app-sidebar";
import { SiteHeader } from "@/components/layout/dashboard/site-header";
import Dock from "@/components/layout/Dock/page";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          {children}
        </SidebarInset>
        <Dock />
      </SidebarProvider>
    </>
  );
}
