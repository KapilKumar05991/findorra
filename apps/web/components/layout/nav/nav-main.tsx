"use client"

import { Menu } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "../theme/theme-toggle"
import { Button } from "@repo/ui/components/button"
import NavMobile from "./nav-mobile"
import { useState } from "react"
import { NavLinks } from "@/constants/nav-links"
import AuthUser from "@/components/auth/auth-user"



export default function NavMain() {
    const [open, setOpen] = useState(false)
    return (
        <nav className="z-40 bg-background py-4 border-b">
            <div className="container mx-auto px-4 md:px-12 flex justify-between items-center">
                <div className="flex gap-4">
                    <Button onClick={() => { setOpen(!open) }} variant='outline' className="lg:hidden">
                        <Menu />
                    </Button>
                    <Link className="text-2xl font-semibold" href={"/"}>
                        FINDORRA
                    </Link>
                </div>

                <div className="flex gap-6 justify-between items-center">
                    <div className="hidden lg:flex gap-4">
                        {NavLinks.map((link, index) => (
                            <Link
                                key={index}
                                className="relative group py-1"
                                href={link.href}
                            >
                                <span>{link.title}</span>
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        {/* <GoogleTranslate /> */}
                        <ThemeToggle />
                        <AuthUser />
                    </div>
                </div>
            </div>
            {open && <NavMobile setOpen={setOpen} />}
        </nav>
    )
}