import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@repo/ui/components/button";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@repo/ui/components/card";

export default function SuccessListed() {
    return (
        <Card className="w-[400px]">
            <CardHeader>
                <CardTitle className="text-3xl text-center">Business Listed</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col items-center justify-center gap-4">
                    <div className="flex text-2xl items-center gap-2 font-semibold text-green-500">
                        SUCCESS
                        <CheckCircle2 className="animate-bounce size-8 text-green-500" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">Congratulations!</h1>
                    <p className="text-center text-lg text-muted-foreground">Your businesses now listed on findorra and visible to users across India</p>
                    <Button asChild>
                        <Link href="/dashboard/business" className="flex items-center gap-2">
                            View Listing
                            <ArrowRight className="size-5 animate-in slide-in-from-right-4 animate-duration-300" />
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}