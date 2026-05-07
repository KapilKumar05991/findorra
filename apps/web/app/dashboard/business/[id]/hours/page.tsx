"use server"
import HoursForm from "@/components/listing/hours-form";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/card";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    return (
        <div className="p-4 py-12 flex items-center justify-center">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="text-xl">Manage Business Hours</CardTitle>
                </CardHeader>
                <CardContent>
                    <HoursForm bizId={id} update={true} />
                </CardContent>
            </Card>
        </div>
    )
}