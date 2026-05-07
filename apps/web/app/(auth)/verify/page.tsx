import ResendTokenButton from "@/components/auth/resend-token";
import ResetForm from "@/components/auth/reset-form";
import VerifyForm from "@/components/auth/verify-form";
import { Button } from "@repo/ui/components/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@repo/ui/components/card";
import Link from "next/link";

export default function Page() {
    return (
        <Card className="mx-4 w-full max-w-sm">
            <CardHeader>
                <CardTitle>Verify your account</CardTitle>
                <CardDescription>
                    We've sent a token to your registered email address
                </CardDescription>
                <CardAction>
                    <Button variant="link"><Link href="/login">Login</Link></Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <VerifyForm />
            </CardContent>
            <CardFooter>
                <div className="flex flex-col space-y-2">
                    <p>Didn't receive code? <ResendTokenButton /></p>
                </div>
            </CardFooter>
        </Card>
    )
}

