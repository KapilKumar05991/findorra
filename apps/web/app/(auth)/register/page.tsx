import LoginForm from "@/components/auth/login-form";
import RegisterForm from "@/components/auth/register-form";
import SocialLogin from "@/components/auth/social-login";
import { Button } from "@repo/ui/components/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@repo/ui/components/card";
import Link from "next/link";

export default function Page() {
    return (
        <Card className="mx-4 w-full max-w-sm">
            <CardHeader>
                <CardTitle>Register to your account</CardTitle>
                <CardDescription>
                    Enter your name, email and password below to register to your account
                </CardDescription>
                <CardAction>
                    <Button variant="link"><Link href="/login">Login</Link></Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <RegisterForm />
            </CardContent>
            <CardFooter className="flex-col gap-2">
                <SocialLogin/>
            </CardFooter>
        </Card>
    )
}

