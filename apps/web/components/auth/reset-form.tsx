"use client"
import { resetSchema } from "@/schemas/zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@repo/ui/components/button"
import { Field, FieldError, FieldGroup, FieldLabel } from "@repo/ui/components/field"
import { Input } from "@repo/ui/components/input"
import { toast } from "@repo/ui/lib/utils"
import { useSearchParams } from "next/navigation"
import { useTransition } from "react"
import { Controller, useForm } from "react-hook-form"
import z from "zod"

export default function ResetForm() {
    const params = useSearchParams()
    const token = params.get('token')
    const identifier = params.get('identifier')
    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof resetSchema>>({
        resolver: zodResolver(resetSchema),
        defaultValues: {
            identifier: identifier || "",
            token: token || "",
            newPassword: "",
            confirmPassword: ""
        }
    })
    function onSubmit(data: z.infer<typeof resetSchema>) {
        console.log(data)
        startTransition(async () => {
            const result = await fetch('/api/auth/reset', {
                method: "POST",
                body: JSON.stringify(data),
            })
            const response = await result.json()
            console.log(response)
            if (response.success) {
                toast.success(response.message)
            } else {
                toast.error("Something Went Wrong")
            }
        })
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} id="reset-form">
            <FieldGroup>
                <Controller
                    name="identifier"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Controller
                    name="token"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Controller
                    name="newPassword"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="new-password">
                                New Password
                            </FieldLabel>
                            <Input
                                {...field}
                                id="new-password"
                                aria-invalid={fieldState.invalid}
                                placeholder="Enter new password"
                                autoComplete="off"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Controller
                    name="confirmPassword"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="confirm-password">
                                Confirm Password
                            </FieldLabel>
                            <Input
                                {...field}
                                id="confirm-password"
                                aria-invalid={fieldState.invalid}
                                placeholder="Confirm new password"
                                autoComplete="off"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Field>
                    <Button className="cursor-pointer" disabled={isPending} type="submit" form="reset-form">
                        Continue
                    </Button>
                </Field>
            </FieldGroup>
        </form>
    )
}