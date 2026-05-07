import { NavLinks } from "@/constants/nav-links"
import Link from "next/link"
import { Dispatch, SetStateAction } from "react"

type Prop = {
    setOpen: Dispatch<SetStateAction<boolean>>
}
export default function NavMobile({ setOpen }: Prop) {
    return (
        <div className="pt-2 px-4 lg:hidden flex flex-col space-y-2">
            {NavLinks.map((link, index) => (
                <Link
                    key={index}
                    className="font-semibold"
                    href={link.href}
                    onClick={()=>setOpen(false)}
                >
                    <span>{link.title}</span>
                </Link>
            ))}
        </div>
    )
}