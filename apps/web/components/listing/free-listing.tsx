"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/components/tabs";
import { useEffect, useState, useTransition } from "react";
import { businessSchema } from "@/schemas/zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { toast } from "@repo/ui/lib/utils";
import { Field, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@repo/ui/components/field";
import { Input } from "@repo/ui/components/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@repo/ui/components/select";
import { Button } from "@repo/ui/components/button";
import { Loader2 } from "lucide-react";
import ContactForm from "./contact-form";
import HoursForm from "./hours-form";
import CategoryForm from "./category-form";
import PhotosForm from "./photos-form";
import SuccessListed from "./success-listed";

async function getPostoffice(pincode: string) {
    const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
    const data = await response.json();
    return data
}

export default function FreeListing() {
    const [tab, setTab] = useState("0")
    const [bizId, setBizId] = useState<string | null>("cmosl16k4000cvoucjccqcn26")
    const [areas, setAreas] = useState<string[]>([])
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof businessSchema>>({
        resolver: zodResolver(businessSchema),
        defaultValues: {
            name: "",
            pincode: "",
            area: "",
            city: "",
            state: "",
            address: "",
            landmark: "",
        },
    })

    const pincode = form.watch("pincode")


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

    async function onSubmit(data: z.infer<typeof businessSchema>) {
        startTransition(async () => {
            const res = await fetch(`/api/businesses`, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            const result = await res.json()
            if (result.success) {
                toast.success(result.message)
                setBizId(result.data.id)
                setTab((tab) => String(parseInt(tab) + 1))
            } else {
                toast.error(result.error)
            }
        })
    }


    return (
        <Tabs value={tab} onValueChange={setTab} className="max-w-4xl mx-auto">
            <TabsList variant="line" >
                <TabsTrigger disabled={tab == "0" ? false : true} value="0">Business</TabsTrigger>
                <TabsTrigger disabled={tab == "1" ? false : true} value="1">Contact</TabsTrigger>
                <TabsTrigger disabled={tab == "2" ? false : true} value="2">Hours</TabsTrigger>
                <TabsTrigger disabled={tab == "3" ? false : true} value="3">Category</TabsTrigger>
                <TabsTrigger disabled={tab == "4" ? false : true} value="4">Photos</TabsTrigger>
            </TabsList>
            <TabsContent value="0" className="py-4">
                <form id="listing-form" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <FieldSet>
                            <FieldLegend>
                                Enter Your Business Details
                            </FieldLegend>
                        </FieldSet>
                        <Controller
                            name="name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor="name">Business Name</FieldLabel>
                                    <Input placeholder="Enter Business Name" id="name" type="text" {...field} />
                                    {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
                                </Field>
                            )}
                        />
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
                            <Button onClick={() => { setTab("1") }} type="button" variant="ghost">Skip</Button>
                            <Button disabled={isPending} className="cursor-pointer" form="listing-form" type="submit">
                                {isPending ? <Loader2 className="size-5 animate-spin" />: "Save & Continue"}
                            </Button>
                        </div>
                    </FieldGroup>

                </form>
            </TabsContent>
            <TabsContent className="py-4" value="1">
                <ContactForm bizId={bizId!} setStep={setTab} />
            </TabsContent>
            <TabsContent className="py-4" value="2">
                <HoursForm bizId={bizId!} action={() => {setTab("3") }} />
            </TabsContent>
            <TabsContent className="py-4" value="3">
                <CategoryForm bizId={bizId!} setStep={setTab} />
            </TabsContent>
            <TabsContent className="py-4" value="4">
                <PhotosForm bizId={bizId!} setStep={setTab} />
            </TabsContent> 
        </Tabs>
    )
}
