"use client"
import { emailSchema } from "@/schemas/zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@repo/ui/components/button"
import { Field, FieldError, FieldGroup, FieldLabel } from "@repo/ui/components/field"
import { Input } from "@repo/ui/components/input"
import { useTransition } from "react"
import { Controller, useForm } from "react-hook-form"
import z from "zod"

export default function ForgotForm() {
    const [isPending, startTransition] = useTransition()
    const form = useForm<z.infer<typeof emailSchema>>({
        resolver: zodResolver(emailSchema),
        defaultValues: {
            email: ''
        }
    })

    function onSubmit(data: z.infer<typeof emailSchema>) {
        startTransition(async () => {
            // const result = await forgotPassword(data.email)
            // if (result.success) {
            //     toast.success(result.message)
            // } else {
            //     toast.error(result.error)
            // }
        })
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} id="forgot-form">
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
                <Field>
                    <Button className="cursor-pointer" disabled={isPending} type="submit" form="forgot-form">
                        Forgot
                    </Button>
                </Field>
            </FieldGroup>
        </form>
    )
}