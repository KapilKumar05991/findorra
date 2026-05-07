"use client"

import { Building, Building2, ChevronRight, Handshake, LayoutDashboard, Settings, Wallet, type LucideIcon } from "lucide-react"

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@repo/ui/components/sidebar"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@repo/ui/components/button"

const navItems = [
    {
        title: "Overview",
        url: "",
        icon: LayoutDashboard,
    },
    {
        title: "My Business",
        url: "/business",
        icon: Building2,
    },
    {
        title: "Leads",
        url: "/leads",
        icon: Handshake,
    },
    {
        title: "Payments",
        url: "/payments",
        icon: Wallet,
    },
]

export default function DashboardNav() {
    const router = useRouter()
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {navItems.map((item, index) => (

                    <SidebarMenuItem key={index}>
                        <SidebarMenuButton onClick={() => { router.replace(`/dashboard${item.url}`) }} tooltip={item.title}>
                            {item.icon && <item.icon />}
                            <Button asChild className="cursor-pointer text-foreground hover:no-underline" variant="link">
                                <span className="text-sm">
                                    {item.title}
                                </span>
                            </Button>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}