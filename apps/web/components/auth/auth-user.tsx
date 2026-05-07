"use client"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/avatar";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

import { AuthDialog } from "@/components/auth/auth-dialog";
import { Bell, LoaderCircle, LogOut, Store, UserCircle2 } from "lucide-react";
import PhoneVerify from "./phone-verify";




export default function AuthUser() {
    const session = useSession()

    if (session.status === 'loading') {
        return <LoaderCircle className="size-6 text-primary animate-spin" />
    }

    if (!session.data) {
        return <AuthDialog />
    }

    return (

        <>
            <Link href="/notification">
                <Bell className="hover:text-primary size-5 hover:animate-wiggle" />
            </Link>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer">
                        <AvatarImage
                            src={session.data.user?.image || "/avatar.png"}
                        />
                        <AvatarFallback>
                            {session.data.user?.name?.charAt(0) || "U"}
                        </AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">
                                {session.data.user?.name}
                            </p>
                            <p className="text-xs leading-none text-muted-foreground">
                                {session.data.user?.email}
                            </p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Link
                            href="/profile"
                            className="cursor-pointer w-full flex items-center"
                        >
                            <UserCircle2 className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link
                            href="/dashboard"
                            className="cursor-pointer w-full flex items-center"
                        >
                            <Store className="mr-2 h-4 w-4" />
                            <span>Dashboard</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => {
                            signOut({
                                redirectTo: '/'
                            })
                        }}
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            {!session.data.user?.is_phone_verified && <PhoneVerify />}
        </>
    )
}