"use client"
import { useEffect, useState } from "react"
import { ListingCard } from "./listing-card"
import { Business } from "@repo/db"
import { toast } from "@repo/ui/lib/utils"

export default function MyBusiness() {
    const [businesses, setBusinesses] = useState<Business[]>([])

    async function fetchBusinesses() {
        const res = await fetch(`/api/users/business`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const result = await res.json()
        if (result.success) {
            setBusinesses(result.data)
        } else {
            toast.error(result.message)
        }
    }
    
    useEffect(() => {
        fetchBusinesses()
    }, [])

    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            {businesses.map((business: Business) => (
                <ListingCard key={business.id} listing={business} />
            ))}
        </div>
    )
}