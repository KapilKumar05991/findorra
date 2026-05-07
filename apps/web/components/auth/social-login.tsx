"use client"
import { Button } from "@repo/ui/components/button";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function SocialLogin() {
    async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const result = await signIn("google", { redirectTo: "/" })
        console.log(result)
    }
    return (
        <form
            onSubmit={handleLogin}
            className="w-full"
        >
            <Button type="submit" variant={"outline"} className="flex-1 w-full cursor-pointer">
                <Image width={20} height={20} src="https://authjs.dev/img/providers/google.svg" alt="Google" /> Continue with Google
            </Button>
        </form>
    )
}