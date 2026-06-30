"use client"

import { businessContactSchema } from "@/schemas/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/components/button";
import { Field, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@repo/ui/components/field";
import { Input } from "@repo/ui/components/input";
import { toast } from "@repo/ui/lib/utils";
import { Loader2 } from "lucide-react";
import { useEffect, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

type Props = {
    bizId: string;
    update?: boolean,
    action?: () => void;
}


async function fetchContact(bizId: string) {
    const res = await fetch(`/api/businesses/${bizId}/contact`);
    return await res.json()
}

async function updateContact(bizId: string, data: z.infer<typeof businessContactSchema>) {
    const res = await fetch(`/api/businesses/${bizId}/contact`, {
        method: "POST",
        body: JSON.stringify(data)
    })

    return await res.json()
}

export default function ContactForm({ bizId, update = false, action }: Props) {
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof businessContactSchema>>({
        resolver: zodResolver(businessContactSchema),
        defaultValues: {
            person: "",
            designation: "",
            phone: "",
            whatsapp: "",
            email: "",
            website: "",
            facebook: "",
            instagram: "",
            twitter: "",
            youtube: "",
            linkedin: ""
        },
    })
    function onSubmit(data: z.infer<typeof businessContactSchema>) {
        startTransition(async () => {
            const result = await updateContact(bizId,data)
            if (result.success) {
                toast.success(result.message)
                action?.()
            } else {
                toast.error(result.error)
            }
        })

    }

    useEffect(() => {
        if(update) {
            startTransition(async () => {
                const result = await fetchContact(bizId)
                if(result.success) {
                    form.setValue("phone",result.data.phone)
                    form.setValue("whatsapp",result.data.whatsapp)
                    form.setValue("email",result.data.email)
                    form.setValue("person",result.data.person)
                    form.setValue("designation",result.data.designation || "")
                    form.setValue("website",result.data.website || "")
                    form.setValue("facebook",result.data.facebook || "")
                    form.setValue("instagram",result.data.instagram || "")
                    form.setValue("twitter",result.data.twitter || "")
                    form.setValue("youtube",result.data.youtube || "")
                    form.setValue("linkedin",result.data.linkedin || "")
                } else {
                    toast.error(result.error)
                }
            })
        }
    },[])
    return (
        <form id="contact-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
                <FieldSet>
                    <FieldLegend>
                        Enter Your Contact Details
                    </FieldLegend>
                </FieldSet>
                <div className="grid grid-col-1 md:grid-cols-2 gap-4 md:gap-6">

                    <Controller
                        name="person"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel>Contact Person</FieldLabel>
                                <Input placeholder="Enter Person Name" type="text" {...field} />
                                {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
                            </Field>
                        )}
                    />
                    <Controller
                        name="designation"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel>Designation</FieldLabel>
                                <Input placeholder="Enter Designation" type="text" {...field} />
                                {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
                            </Field>
                        )}
                    />
                </div>
                <div className="grid grid-col-1 md:grid-cols-2 gap-4 md:gap-6">
                    <Controller
                        name="phone"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel>Contact Number</FieldLabel>
                                <Input placeholder="Enter Phone Number" type="text" {...field} />
                                {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
                            </Field>
                        )}
                    />
                    <Controller
                        name="whatsapp"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel>Whatsapp Number</FieldLabel>
                                <Input placeholder="Enter Whatsapp Number" type="text" {...field} />
                                {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
                            </Field>
                        )}
                    />
                </div>

                <div className="grid grid-col-1 md:grid-cols-2 gap-4 md:gap-6">

                    <Controller
                        name="email"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel>Business Email</FieldLabel>
                                <Input placeholder="Enter Business Email" type="text" {...field} />
                                {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
                            </Field>
                        )}
                    />
                    <Controller
                        name="website"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel>Website Url</FieldLabel>
                                <Input placeholder="Enter Website Url" type="text" {...field} />
                                {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
                            </Field>
                        )}
                    />
                </div>
                {update && <div className="grid grid-col-1 md:grid-cols-2 gap-4 md:gap-6">

                    <Controller
                        name="facebook"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel>Facebook Url</FieldLabel>
                                <Input placeholder="Enter Facebook Url" type="text" {...field} />
                                {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
                            </Field>
                        )}
                    />
                    <Controller
                        name="instagram"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel>Instagram Url</FieldLabel>
                                <Input placeholder="Enter Instagram Url" type="text" {...field} />
                                {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
                            </Field>
                        )}
                    />
                    <Controller
                        name="twitter"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel>Twitter Url</FieldLabel>
                                <Input placeholder="Enter Twitter Url" type="text" {...field} />
                                {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
                            </Field>
                        )}
                    />
                    <Controller
                        name="youtube"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel>Youtube Url</FieldLabel>
                                <Input placeholder="Enter Youtube Url" type="text" {...field} />
                                {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
                            </Field>
                        )}
                    />
                    <Controller
                        name="linkedin"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel>Linkedin Url</FieldLabel>
                                <Input placeholder="Enter Linkedin Url" type="text" {...field} />
                                {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
                            </Field>
                        )}
                    />
                </div>}
                <div className="flex justify-end">
                    <Button disabled={isPending} className="cursor-pointer" form="contact-form" type="submit">
                        {isPending ? <Loader2 className="size-5 animate-spin" />: "Save"}
                    </Button>

                </div>
            </FieldGroup>
        </form>
    )
}