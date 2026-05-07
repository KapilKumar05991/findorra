"use client"

import { businessContactSchema } from "@/schemas/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/components/button";
import { Field, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@repo/ui/components/field";
import { Input } from "@repo/ui/components/input";
import { toast } from "@repo/ui/lib/utils";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

type Props = {
    bizId: string;
    update?: boolean,
    setStep: React.Dispatch<React.SetStateAction<string>>;
}


export default function ContactForm({ bizId, update = false, setStep }: Props) {
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
            const res = await fetch(`/api/businesses/${bizId}/contact`, {
                method: "POST",
                body: JSON.stringify(data)
            })

            const result = await res.json()
            if (result.success) {
                toast.success(result.message)
                setStep(step => String(parseInt(step) + 1));
            } else {
                toast.error(result.error)
            }
        })

    }
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
                    <Button onClick={() => { setStep(String(parseInt("2"))) }} type="button" variant="ghost">Skip</Button>

                    <Button disabled={isPending} className="cursor-pointer" form="contact-form" type="submit">
                        {isPending ? <Loader2 className="size-5 animate-spin" />: "Save & Continue"}
                    </Button>

                </div>
            </FieldGroup>
        </form>
    )
}