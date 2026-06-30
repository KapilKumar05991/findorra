import LocationForm from "@/components/listing/location-form";
import { Card, CardContent, CardHeader } from "@repo/ui/components/card";

type Prop = {
    params: Promise<{ id: string }>
}

export default async function Page({params}: Prop) {
    const {id} = await params
    return (
        <main className="p-4">
            <Card>
                <CardHeader className="text-xl font-semibold">
                    Manage Business Location
                </CardHeader>
                <CardContent>
                    <LocationForm bizId={id} update={true}/>
                </CardContent>
            </Card>
        </main>
    )
}