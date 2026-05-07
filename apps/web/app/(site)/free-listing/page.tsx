import FreeListing from "@/components/listing/free-listing";

export default function Page() {
    return (
        <main className="min-h-screen mx-auto p-4 md:py-8">
            <h1 className="text-3xl text-center font-semibold">List your business for free</h1>
            <FreeListing/>
        </main>
    )
}