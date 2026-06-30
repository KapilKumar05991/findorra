"use client"
import { editBusinessSchema } from "@/schemas/zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Field, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@repo/ui/components/field"
import { Input } from "@repo/ui/components/input"
import { Textarea } from "@repo/ui/components/textarea"
import { useTransition } from "react"
import { Controller, useForm } from "react-hook-form"
import z from "zod"

export default function BusinessForm() {
    const [isPending, startTransition] = useTransition()
    const form = useForm<z.infer<typeof editBusinessSchema>>({
        resolver: zodResolver(editBusinessSchema),
        defaultValues: {
            name: "",
            tagline: "",
            description: "",
            yoe: "",
        }
    })
    return (
        <form action="">
            <FieldGroup>
                <FieldSet>
                    <FieldLegend>Enter Your Business Details</FieldLegend>
                </FieldSet>
                <Controller
                    control={form.control}
                    name="name"
                    render={({ field, fieldState }) => (
                        <Field>
                            <FieldLabel>Business Name</FieldLabel>
                            <Input {...field} placeholder="Enter Business Name" />
                            {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
                        </Field>
                    )}
                />
                <Controller
                    control={form.control}
                    name="tagline"
                    render={({ field, fieldState }) => (
                        <Field>
                            <FieldLabel>Business Tagline</FieldLabel>
                            <Input {...field} placeholder="Enter Business Tagline" />
                            {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
                        </Field>
                    )}
                />
                <Controller
                    control={form.control}
                    name="description"
                    render={({ field, fieldState }) => (
                        <Field>
                            <FieldLabel>Business Description</FieldLabel>
                            <Textarea rows={6} {...field} placeholder="Enter Business Description" />
                            {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
                        </Field>
                    )}
                />
                <Controller
                    control={form.control}
                    name="yoe"
                    render={({ field, fieldState }) => (
                        <Field>
                            <FieldLabel>Year of Establishment</FieldLabel>
                            <Input type="date" {...field} placeholder="Enter Year of Establishment" />
                            {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
                        </Field>
                    )}
                />
            </FieldGroup>

        </form>
    )
}