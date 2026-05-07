import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@repo/ui/components/dialog"
import { Button } from "@repo/ui/components/button"
import LoginForm from "./login-form"
import SocialLogin from "./social-login"
import Link from "next/link"

type Prop = {
    defaultOpen?: boolean
    closable?: boolean
}

export function AuthDialog({ defaultOpen = false, closable = true }: Prop) {

    return (
        <Dialog defaultOpen={defaultOpen} open={closable ? undefined : true}>
            <DialogTrigger asChild>
                <Button>Login / Register</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Login to your account</DialogTitle>
                    <DialogDescription>
                        Enter your email and password to login to your account
                    </DialogDescription>
                </DialogHeader>
                <LoginForm />
                <DialogFooter>
                    <SocialLogin />
                </DialogFooter>
                <div className="text-center">
                    Didn't have an account?
                    <Button variant="link"><Link href="/register">Register</Link></Button>
                </div>
            </DialogContent>
        </Dialog >
    )
}