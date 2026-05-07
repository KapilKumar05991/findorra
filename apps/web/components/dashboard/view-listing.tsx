"use client"

import { BadgeX, BriefcaseBusiness, Loader2, Clock, MapPin, Handshake, Store, Images, Contact, BookCheck, CircleQuestionMark, Flame, LineChart, BadgeCheck, Rocket, X } from "lucide-react"
import { useEffect, useState } from "react"
import { Business } from "@repo/db"
import { Button } from "@repo/ui/components/button"
import Link from "next/link"
import { useRouter } from "next/navigation"

const Menu = [
    { icon: Clock, label: "Timings", url: "/hours", premium: false },
    { icon: MapPin, label: "Location", url: "/location", premium: false },
    { icon: Contact, label: "Contact", url: "/contact", premium: false },
    { icon: Store, label: "Category", url: "/category", premium: false },
    { icon: Images, label: "Gallery", url: "/gallery", premium: false },
    { icon: CircleQuestionMark, label: "FAQs", url: "/faqs", premium: false },
    { icon: BookCheck, label: "Claim", url: "/claim", premium: false },
    { icon: Handshake, label: "Leads", url: "/leads", premium: true },
    { icon: Rocket, label: "Featured", url: "/featured", premium: true },
    { icon: BadgeCheck, label: "Verified", url: "/verified", premium: true },
    { icon: Flame, label: "Ads", url: "/ads", premium: true },
    { icon: LineChart, label: "Analytics", url: "/analytics", premium: true },
]

export function ViewListing({ id }: { id: string }) {
    const [business, setBusiness] = useState<Business | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    async function fetchBusiness(id: string) {
        setLoading(true)
        const res = await fetch(`/api/users/business/${id}`)
        const result = await res.json()
        setBusiness(result.data)
        setLoading(false)
    }

    useEffect(() => {
        fetchBusiness(id)
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="animate-spin" size={24} />
            </div>)
    }
    if (!business) {
        return (
            <div className="min-h-screen flex items-center justify-center gap-4">
                <BadgeX className="size-8 text-destructive" />
                <span className="text-xl font-semibold">Something went wrong!</span>
            </div>)

    }
    return (
        <div className="p-4 space-y-8">
            <h1 className="text-xl font-bold mb-4 flex items-center gap-3">
                <BriefcaseBusiness className="size-10 rounded-md p-2 bg-primary text-white" />
                {business.name}
            </h1>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {Menu.map((item, index) => (
                    <Button onClick={() => router.push(`/dashboard/business/${id}${item.url}`)} disabled={item.premium} key={index} variant={"outline"} size={"lg"} className="h-fit cursor-pointer justify-between">
                        <item.icon className="size-12 rounded-full m-2 p-2 bg-primary text-white" />
                        <span className="text-lg">
                            {item.label}
                            <br />
                            <span className="text-sm text-primary">{item.premium && "Premium"}</span>
                        </span>
                    </Button>
                ))}
            </div>

            <div className="p-4 rounded-md bg-gradient-to-l from-primary to-red-500 flex flex-col md:flex-row items-center justify-center">
                <div>
                    <h4 className="text-2xl font-bold">Why Upgrade to Premium?</h4>
                    <ul className="text-white mt-4 text-lg">
                        <li className="flex items-center gap-2">
                            <BadgeCheck className="size-6" />
                            <span>More visibility in your category</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <BadgeCheck className="size-6" />
                            <span>Get verified listing badge</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <BadgeCheck className="size-6" />
                            <span>Get exclusive deals & offers for customers</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <BadgeCheck className="size-6" />
                            <span>Get hidden tarffic</span>
                        </li>
                    </ul>
                </div>
                <Link href={'/dashboard/subscription'} className="h-12 w-60 text-xl bg-white flex items-center justify-center rounded-md text-primary font-semibold">Upgrade to Premium</Link>
            </div>
        </div>
    )
}