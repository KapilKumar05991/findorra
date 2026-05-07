"use client"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { enquirySchema } from "@/schemas/zod"
import { Field, FieldError, FieldGroup, FieldLabel } from "@repo/ui/components/field"
import { Input } from "@repo/ui/components/input"
import { Button } from "@repo/ui/components/button"
import { useTransition } from "react"
import { SendHorizonal } from "lucide-react"

interface EnquiryFormProps {
    businessId: string
}

export default function EnquiryForm({ businessId }: EnquiryFormProps) {
    const [isPending, startTransition] = useTransition()
    const form = useForm({
        resolver: zodResolver(enquirySchema),
        defaultValues: {
            name: "",
            phone: "",
        }
    })
    const onSubmit = (data: any) => {
        startTransition(async () => {
            console.log(data)
        })
    }
    return (
        <form id="enquiry-form" onSubmit={form.handleSubmit(onSubmit)}>
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
                    name="phone"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="phone">
                                Phone
                            </FieldLabel>
                            <Input
                                {...field}
                                id="phone"
                                aria-invalid={fieldState.invalid}
                                placeholder="Enter your phone"
                                autoComplete="off"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Field >
                    <Button className="cursor-pointer" disabled={isPending} type="submit" form="enquiry-form">
                        <SendHorizonal /> Send Enquiry
                    </Button>
                </Field>
            </FieldGroup>
        </form>
    )
}