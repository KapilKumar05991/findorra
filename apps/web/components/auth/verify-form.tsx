"use client"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { verifySchema } from "@/schemas/zod"
import { useTransition } from "react"
import z from "zod"
import { Field, FieldError, FieldGroup, FieldLabel } from "@repo/ui/components/field"
import { Input } from "@repo/ui/components/input"
import { Button } from "@repo/ui/components/button"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "@repo/ui/lib/utils"
import { Loader2 } from "lucide-react"


export default function VerifyForm() {
    const router = useRouter()
    const params = useSearchParams()
    const identifier = params.get("identifier")

    const [isPending, startTransition] = useTransition()
    const form = useForm({
        resolver: zodResolver(verifySchema),
        defaultValues: {
            identifier: identifier || '',
            token: ""
        }
    })


    function onSubmit(data: z.infer<typeof verifySchema>) {

        startTransition(async () => {
            const result = await fetch('/api/auth/verify/email', {
                method: "POST",
                body: JSON.stringify(data),
            })
            const response = await result.json()
            console.log(response)
            if (response.success) {
                toast.success(response.message)
                router.push('/login')
            } else {
                toast.error("Something Went Wrong")
            }
        })
    }
    return (
        <form id="verify-form" onSubmit={form.handleSubmit(onSubmit)}>
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
                            <FieldLabel htmlFor="token">
                                Enter OTP
                            </FieldLabel>
                            <Input
                                {...field}
                                id="token"
                                type="token"
                                aria-invalid={fieldState.invalid}
                                placeholder="Enter your token"
                                autoComplete="off"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Field >
                    <Button className="cursor-pointer" disabled={isPending} type="submit" form="verify-form">
                        {isPending && <Loader2 className="animate-spin size-5"/>}
                        Click to Verify
                    </Button>
                </Field>
            </FieldGroup>
        </form>
    )
}