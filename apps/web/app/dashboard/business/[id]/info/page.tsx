import BusinessForm from "@/components/listing/business-form";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/card";

export default async function Page() {
    return (
        <main className="p-4">
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl font-semibold">
                        Manage Your Business Information
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <BusinessForm />
                </CardContent>
            </Card>
        </main>
    )
}