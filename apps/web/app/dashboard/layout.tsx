import DashboardSidebar from "@/components/layout/sidebar/dashboard-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@repo/ui/components/sidebar";
import { TooltipProvider } from "@repo/ui/components/tooltip";


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <TooltipProvider>
            <SidebarProvider>
                <DashboardSidebar />
                <main className="w-full min-h-screen">
                    <SidebarTrigger className="md:hidden" />
                    <SidebarInset>{children}</SidebarInset>
                </main>
            </SidebarProvider>
        </TooltipProvider>
    )
}