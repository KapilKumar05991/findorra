"use client"
import { ListingCard } from "./listing-card"
import { Business } from "@repo/db"
import { useQuery } from "@tanstack/react-query"
import Error from "@/components/layout/shared/error"
import Loading from "@/components/layout/shared/loading"
import NotFound from "@/components/layout/shared/not-found"

async function fetchBusinesses() {
    const res = await fetch(`/api/businesses`)
    return await res.json()
}

export default function MyBusiness() {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["businesses"],
        queryFn: fetchBusinesses
    })

    if (isLoading) {
        return <Loading />
    }

    if (isError || !data.success) {
        return <Error />
    }

    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.data.length == 0 && <p className="text-xl font-semibold">You don't have any listings yet.</p>}
            {data.data.map((business: Business) => (
                <ListingCard key={business.id} listing={business} />
            ))}
        </div>
    )
}