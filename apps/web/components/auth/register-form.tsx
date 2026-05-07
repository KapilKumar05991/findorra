"use client"
import { registerSchema } from "@/schemas/zod"
import { useTransition } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@repo/ui/components/button"
import { Field, FieldError, FieldGroup, FieldLabel } from "@repo/ui/components/field"
import { Input } from "@repo/ui/components/input"
import { useRouter } from "next/navigation"
import { Controller, useForm } from "react-hook-form"
import z from "zod"
import { toast } from "@repo/ui/lib/utils"
import { Loader2 } from "lucide-react"

export default function RegisterForm() {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()


    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    function onSubmit(data: z.infer<typeof registerSchema>) {
        startTransition(async () => {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            const result = await res.json()
            if (result.success) {
                toast.success(result.message)
                form.reset()
                router.push(`/verify?identifier=${data.email}`)
            } else {
                toast.error(result.error)
            }
        })
    }

    return (
        <form id="register-form" className="mt-2" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
                <Controller
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="name">
                                Name
                            </FieldLabel>
                            <Input
                                {...field}
                                id="name"
                                aria-invalid={fieldState.invalid}
                                placeholder="Enter your name"
                                autoComplete="off"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
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
                            <FieldLabel htmlFor="password">
                                Password
                            </FieldLabel>
                            <Input
                                {...field}
                                id="password"
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
                    <Button className="cursor-pointer" disabled={isPending} type="submit" form="register-form">
                        {isPending && <Loader2 className="animate-spin size-5"/>}
                        Signup
                    </Button>
                </Field>
            </FieldGroup>
        </form>
    )
}