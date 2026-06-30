import ContactForm from "@/components/listing/contact-form";
import { Card, CardContent, CardHeader } from "@repo/ui/components/card";

type Props = {
    params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
    const { id } = await params
    return (
        <main className="p-4">
            <Card>
                <CardHeader className="text-xl font-semibold">
                    Manage Business Contact
                </CardHeader>
                <CardContent>
                    <ContactForm bizId={id} update={true} />
                </CardContent>
            </Card>
        </main>
    )
}