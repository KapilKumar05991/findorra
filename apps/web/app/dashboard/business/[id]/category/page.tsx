import CategoryForm from "@/components/listing/category-form"
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
                        Manage Your Business Category
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <CategoryForm bizId={id} update={true} />
                </CardContent>
            </Card>
        </main>
    )
}