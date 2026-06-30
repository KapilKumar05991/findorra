"use client"
import { FieldGroup, FieldLegend, FieldSet } from "@repo/ui/components/field"
import { Controller, useForm } from "react-hook-form"
import { businessLocationSchema } from "@/schemas/zod"
import z from "zod"
import { Button } from "@repo/ui/components/button"
import { Input } from "@repo/ui/components/input"
import { Field, FieldError, FieldLabel } from "@repo/ui/components/field"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@repo/ui/components/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState, useTransition } from "react"
import { Loader2 } from "lucide-react"
import { toast } from "@repo/ui/lib/utils"

type Prop = {
    bizId: string
    update: boolean
}

async function updateLocation(bizId: string, data: z.infer<typeof businessLocationSchema>) {
    const res = await fetch(`/api/businesses/${bizId}/location`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    return await res.json()
}

async function fetchLocation(bizId: string) {
    const res = await fetch(`/api/businesses/${bizId}/location`)
    return await res.json()
}

async function getPostoffice(pincode: string) {
    const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
    const data = await response.json();
    return data
}

export default function LocationForm({ bizId, update }: Prop) {
    const [areas, setAreas] = useState<string[]>([])
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof businessLocationSchema>>({
        resolver: zodResolver(businessLocationSchema),
        defaultValues: {
            address: "",
            city: "",
            state: "",
            area: "",
            pincode: "",
            landmark: ""
        }
    })
    const pincode = form.watch("pincode")

    useEffect(() => {
        if (update) {
            startTransition(async () => {
                const result = await fetchLocation(bizId)
                if (result.success) {
                    form.setValue("address", result.data.address)
                    form.setValue("city", result.data.city)
                    form.setValue("state", result.data.state)
                    form.setValue("area", result.data.area || "")
                    form.setValue("landmark", result.data.landmark || "")
                    form.setValue("pincode", result.data.pincode)
                } else {
                    toast.error(result.error)
                }
            })
        }
    }, [])


    useEffect(() => {
        if (pincode.length == 6) {
            startTransition(async () => {
                const data = await getPostoffice(pincode)
                if (data[0].Status === "Success") {
                    form.setValue("city", data[0].PostOffice[0].District)
                    form.setValue("state", data[0].PostOffice[0].State)
                    const areas = data[0].PostOffice.map((po: { Name: string }) => po.Name)
                    setAreas(areas)
                } else {
                    toast.error("Pincode Not Found")
                }
            })
        }
    }, [pincode])

    function onSubmit(data: z.infer<typeof businessLocationSchema>) {
        startTransition(async () => {
            const result = await updateLocation(bizId, data)
            if (result.success) {
                toast.success(result.message)
            } else {
                toast.error(result.error)
            }
        })
    }
    return (
        <form id="listing-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
                <FieldSet>
                    <FieldLegend>
                        Enter Your Business Address
                    </FieldLegend>
                </FieldSet>
                <div className="grid grid-col-1 md:grid-cols-2 gap-4 md:gap-6">
                    <Controller
                        name="pincode"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel>Pincode</FieldLabel>
                                <Input placeholder="Enter Pincode" type="text" {...field} />
                                {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
                            </Field>
                        )}
                    />
                    <Controller
                        name="area"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel>Area</FieldLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Area" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Areas</SelectLabel>
                                            {areas.map((area, index) => (
                                                <SelectItem key={index} value={area}>{area}</SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
                            </Field>
                        )}
                    />
                </div>
                <Controller
                    name="address"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field>
                            <FieldLabel>Address</FieldLabel>
                            <Input placeholder="Enter Address" type="text" {...field} />
                            {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
                        </Field>
                    )}
                />
                <Controller
                    name="landmark"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field>
                            <FieldLabel>Landmark</FieldLabel>
                            <Input placeholder="Enter Landmark" type="text" {...field} />
                            {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
                        </Field>
                    )}
                />

                <div className="grid grid-col-1 md:grid-cols-2 gap-4 md:gap-6">
                    <Controller
                        name="city"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel>City</FieldLabel>
                                <Input placeholder="Enter City" disabled type="text" {...field} />
                                {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
                            </Field>
                        )}
                    />
                    <Controller
                        name="state"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel>State</FieldLabel>
                                <Input placeholder="Enter State" disabled type="text" {...field} />
                                {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
                            </Field>
                        )}
                    />
                </div>
                <div className="flex justify-end gap-4">
                    <Button disabled={isPending} className="cursor-pointer" form="location-form" type="submit">
                        {isPending ? <Loader2 className="size-5 animate-spin" /> : "Save"}
                    </Button>
                </div>
            </FieldGroup>

        </form>
    )
}