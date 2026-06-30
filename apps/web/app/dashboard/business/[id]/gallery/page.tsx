import PhotosForm from "@/components/listing/photos-form"
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/card"

type Props = {
    params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
    const { id } = await params
    return (
        <main className="p-4">
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl font-semibold">
                        Manage Your Business Photos
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <PhotosForm bizId={id} update={true}/>
                </CardContent>
            </Card>
        </main>
    )
}