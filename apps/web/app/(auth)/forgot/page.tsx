
import ForgotForm from "@/components/auth/forgot-form";
import SocialLogin from "@/components/auth/social-login";
import { Button } from "@repo/ui/components/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@repo/ui/components/card";
import Link from "next/link";

export default function Page() {
    return (
        <Card className="mx-4 w-full max-w-sm">
            <CardHeader>
                <CardTitle>Forgot your password?</CardTitle>
                <CardDescription>
                    Enter your email address below to receive a link to reset your password
                </CardDescription>
                <CardAction>
                    <Button variant="link"><Link href="/login">Login</Link></Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <ForgotForm />
            </CardContent>
        </Card>
    )
}

