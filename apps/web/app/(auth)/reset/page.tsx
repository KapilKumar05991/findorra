import ResetForm from "@/components/auth/reset-form";
import { Button } from "@repo/ui/components/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@repo/ui/components/card";
import Link from "next/link";

export default function Page() {
    return (
        <Card className="mx-4 w-full max-w-sm">
            <CardHeader>
                <CardTitle>Reset your password</CardTitle>
                <CardDescription>
                    Enter new password and confirm below to reset your password
                </CardDescription>
                <CardAction>
                    <Button variant="link"><Link href="/login">Login</Link></Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <ResetForm />
            </CardContent>
        </Card>
    )
}

