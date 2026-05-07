
import { Business } from "@repo/db";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@repo/ui/components/card";
import Image from "next/image";
import Link from "next/link";

type Prop = {
    listing: Business
}

export function ListingCard({ listing }: Prop) {
    return (
        <Link href={`/dashboard/business/${listing.id}`}>
            <Card className="w-full">
                <CardContent className="flex items-center gap-4">
                    <div className="size-40 border relative">
                        <Image src={'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} alt="Biz image" fill className="object-cover rounded-xl" />
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-xl">{listing.name}</h2>
                        <p>Listed on {new Date(listing.created_at).toDateString()}</p>
                        <p>Status: {listing.status}</p>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}