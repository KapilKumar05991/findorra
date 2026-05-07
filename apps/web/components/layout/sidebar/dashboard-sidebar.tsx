"use client"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarTrigger, useSidebar } from "@repo/ui/components/sidebar";
import DashboardUser from "./dashboard-user";
import DashboardNav from "./dashboard-nav";
import Link from "next/link";


export default function DashboardSidebar() {
    const { state } = useSidebar()

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <div className="flex justify-between items-center gap-2">
                    {state.includes('expanded') ?

                        <Link href="/" className="text-xl font-semibold">
                            FINDORRA
                        </Link>
                        : ''
                    }
                    <SidebarTrigger/>
                </div>

            </SidebarHeader>
            <SidebarContent>
                
                <DashboardNav/>
            </SidebarContent>
            <SidebarFooter>
                <DashboardUser />
            </SidebarFooter>
        </Sidebar>
    )
}