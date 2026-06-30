"use client"

import { BriefcaseBusiness, Clock, MapPin, Handshake, Store, Image, Contact, BookCheck, CircleQuestionMark, Flame, LineChart, BadgeCheck, Rocket } from "lucide-react"
import { Button } from "@repo/ui/components/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BusinessProfile } from "./business/business-profile"
import { useQuery } from "@tanstack/react-query"
import Loading from "../layout/shared/loading"
import Error from "../layout/shared/error"

const Menu = [
    { icon: Clock, label: "Timings", url: "/hours", premium: false },
    { icon: MapPin, label: "Location", url: "/location", premium: false },
    { icon: Contact, label: "Contact", url: "/contact", premium: false },
    { icon: Store, label: "Category", url: "/category", premium: false },
    { icon: Image, label: "Gallery", url: "/gallery", premium: false },
    { icon: CircleQuestionMark, label: "FAQs", url: "/faqs", premium: false },
    { icon: BookCheck, label: "Claim", url: "/claim", premium: false },
    { icon: Handshake, label: "Leads", url: "/leads", premium: true },
    { icon: Rocket, label: "Featured", url: "/featured", premium: true },
    { icon: BadgeCheck, label: "Verified", url: "/verified", premium: true },
    { icon: Flame, label: "Ads", url: "/ads", premium: true },
    { icon: LineChart, label: "Analytics", url: "/analytics", premium: true },
]

async function fetchBusiness(id: string) {
    const res = await fetch(`/api/businesses/${id}`)
    return await res.json()
}
export function ViewListing({ id }: { id: string }) {
    const router = useRouter()

    const {data, isLoading, isError} = useQuery({
        queryKey: ["business"],
        queryFn: () => fetchBusiness(id)
    })

    if (isLoading) {
        return <Loading/>
    }

    if (isError || !data.success) {
        return <Error/>
    }
    return (
        <div className="p-4 space-y-8">
            <div className="flex justify-between">
                <h1 className="text-xl font-bold mb-4 flex items-center gap-3">
                    <BriefcaseBusiness className="size-10 rounded-md p-2 bg-primary text-white" />
                    {data.data.name}
                </h1>
                <BusinessProfile biz={data.data} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {Menu.map((item, index) => (
                    <Button onClick={() => router.push(`/dashboard/business/${id}${item.url}`)} disabled={item.premium} key={index} variant={"outline"} size={"lg"} className="h-fit cursor-pointer justify-between">
                        <item.icon className="size-12 rounded-md m-2 p-2 bg-primary text-white" />
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