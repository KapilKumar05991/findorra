import { ViewListing } from "@/components/dashboard/view-listing"

type Prop = {
    params: Promise<{ id: string }>
}

export default async function Page({ params }: Prop) {

    const { id } = await params
    return (
        <main>
            <ViewListing id={id} />
        </main>
    )
}