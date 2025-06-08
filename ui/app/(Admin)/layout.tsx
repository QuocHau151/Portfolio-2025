import { AppSidebar } from "@/components/layout/admin/app-sidebar";
import { SiteHeader } from "@/components/layout/admin/site-header";
import Dock from "@/components/layout/Dock/page";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function AdminLayout({
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
