import BusinessCard from "@/components/business/business-card";
import EnquiryForm from "@/components/business/enquiry-form";
import PromoBar from "@/components/layout/advertise/promobar";
import { SearchFilters } from "@/components/layout/search/search-filters";
import Error from "@/components/layout/shared/error";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@repo/ui/components/breadcrumb"
import { Card, CardContent } from "@repo/ui/components/card";
import axios from "axios"

const api_url = process.env.AUTH_URL

async function fetchBusinesses(city: string, slug: string, postcode: any) {
    const arr = slug.split('-in-')
    const q = arr[0]
    const area = arr.length > 1 ? arr[1].replaceAll('-', ' ') : ""

    const url = new URL(`${api_url}/api/search/businesses`)
    url.searchParams.set("q", q)
    if (area) { url.searchParams.set("area", area) }
    url.searchParams.set("city", city)
    if (postcode) { url.searchParams.set("postcode", postcode) }

    try {
        const res = await axios.get(url.toString())
        return res.data
    } catch (error: any) {
        console.log(error)
        return error.response.data
    }
}


export default async function Page({ params, searchParams }: {
    params: Promise<{ city: string, slug: string }>,
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const { city, slug } = await params
    const { postcode } = await searchParams


    const res = await fetchBusinesses(city, slug, postcode)

    if (!res.success) {
        return <Error error={res.data.error} message="Something went wrong" />
    }

    const listings = res.data.data

    return (
        <div className="w-full">
            <section className="container mx-auto p-4 md:px-10">
                <PromoBar category="restaurants" city={"cityText"} />
            </section>
            <section className="container mx-auto grid grid-cols-4 gap-6 px-4 md:px-10">
                {/* LEFT */}
                <div className="w-full col-span-4 lg:col-span-3">
                    {/* Filters */}
                    <SearchFilters />

                    {/* Breadcrumb */}
                    <Breadcrumb className="mb-2">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="#">
                                    {city}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="#">
                                    {slug.replaceAll('-', ' ')}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>
                                    {listings.length} Listings
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    <h1 className="mb-5 text-2xl font-semibold">
                        {slug}
                    </h1>

                    <div className="space-y-6">
                        {listings.length === 0 ? (
                            <Card className="rounded-lg border p-10 text-center">
                                <p className="text-xl font-semibold">
                                    No listings found for Listing in {city}
                                </p>
                                <p className="mt-2 text-muted-foreground">
                                    Try a different city or category.
                                </p>
                            </Card>
                        ) : (
                            listings.map((business: any) => (
                                <BusinessCard key={business.id} business={business} />
                            ))
                        )}
                    </div>
                </div>

                {/* RIGHT */}
                <aside className="col-span-1 hidden lg:block">
                    <Card className="mt-36">
                        <CardContent className="p-4">
                            <EnquiryForm businessId="xyz" />
                        </CardContent>
                    </Card>
                </aside>
            </section>
        </div>
    )
}