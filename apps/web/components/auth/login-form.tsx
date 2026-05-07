"use client"
import { loginSchema } from "@/schemas/zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@repo/ui/components/input"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { Controller, useForm } from "react-hook-form"
import { Field, FieldError, FieldGroup, FieldLabel } from "@repo/ui/components/field";
import z from "zod"
import Link from "next/link"
import { Button } from "@repo/ui/components/button"
import { signIn } from "next-auth/react"
import { toast } from "@repo/ui/lib/utils"
import { Loader2 } from "lucide-react"

export default function LoginForm() {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })
    function onSubmit(data: z.infer<typeof loginSchema>) {
        console.log(data)
        startTransition(async () => {
            
            const result = await signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false,
                redirectTo:"/"
            })
            console.log(result)
            if (!result.error) {
                router.push(result.url as string)
                return
            }
            if (result.error == "CredentialsSignin") {
                toast.error('Invalid Credentials')
            } else {
                toast.error('Something went wrong')
            }
        })
    }
    return (
        <form className="mt-2" id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
                <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="email">
                                Email
                            </FieldLabel>
                            <Input
                                {...field}
                                id="email"
                                aria-invalid={fieldState.invalid}
                                placeholder="Enter your email"
                                autoComplete="off"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <div className="flex items-center justify-between">
                                <FieldLabel htmlFor="password">
                                    Password
                                </FieldLabel>
                                <Link href='/forgot' className="text-sm text-muted-foreground hover:underline">
                                    Forgot password
                                </Link>
                            </div>
                            <Input
                                {...field}
                                id="password"
                                type="password"
                                aria-invalid={fieldState.invalid}
                                placeholder="Enter your password"
                                autoComplete="off"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                <Field >
                    <Button className="cursor-pointer" disabled={isPending} type="submit" form="login-form">
                        {isPending && <Loader2 className="animate-spin size-5"/>}
                        Login
                    </Button>
                </Field>
            </FieldGroup>
        </form>
    )
}