"use client"
import { Button } from "@repo/ui/components/button";
import { Field, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@repo/ui/components/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/select";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { act, useEffect, useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { Combobox, ComboboxChip, ComboboxChips, ComboboxChipsInput, ComboboxContent, ComboboxEmpty, ComboboxItem, ComboboxList, ComboboxValue, useComboboxAnchor } from "@repo/ui/components/combobox";
import { Checkbox } from "@repo/ui/components/checkbox";
import days from "@/constants/days";
import timings from "@/constants/timings";
import { Loader2 } from "lucide-react";
import { toast } from "@repo/ui/lib/utils";
import { businessHoursSchema } from "@/schemas/zod";
import { Label } from "@repo/ui/components/label";

type Props = {
    bizId: string;
    update?: boolean
    action?: () => void;
}

const businessHoursFormSchema = z.object({
    days: z.array(z.string()).min(1, "Select at least one day"),
    open: z.string().min(1, "Select open time"),
    close: z.string().min(1, "Select close time"),
})

async function createHours(bizId: string, data: z.infer<typeof businessHoursSchema>) {
    const res = await fetch(`/api/businesses/${bizId}/hours`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    return await res.json();
}

async function updateHours(bizId: string, data: z.infer<typeof businessHoursSchema>) {
    const res = await fetch(`/api/businesses/${bizId}/hours`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    return await res.json();
}

export default function HoursForm({ bizId, action, update = false }: Props) {
    const [isPending, startTransition] = useTransition();
    const [checked, setChecked] = useState(false)

    const form = useForm<z.infer<typeof businessHoursFormSchema>>({
        resolver: zodResolver(businessHoursFormSchema),
        defaultValues: {
            days: [],
            open: "",
            close: "",
        }
    })

    const selectedDays = form.watch("days")

    useEffect(() => {
        if (selectedDays.length < 7) {
            setChecked(false)
        }
    }, [selectedDays])

    useEffect(() => {
        if (update) {
            startTransition(async () => {
                const res = await fetch(`/api/businesses/${bizId}/hours`)
                const result = await res.json()
                if(result.success) {
                    console.log(result.data)
                } else {
                    
                }
            })
        }
    }, [])

    function toogleCheck(check: boolean) {
        if (check) {
            form.setValue("days", days)
            setChecked(true)
        } else {
            form.setValue("days", [])
            setChecked(false)
        }
    }

    function onSubmit(data: z.infer<typeof businessHoursFormSchema>) {
        console.log(data)

        startTransition(async () => {
            let hours = []

            for (const day of days) {
                if (data.days.includes(day)) {
                    hours.push({
                        day,
                        open: data.open,
                        close: data.close,
                        closed: false
                    })

                } else {
                    hours.push({
                        day,
                        open: "00:00",
                        close: "00:00",
                        closed: true
                    })
                }
            }

            if (update) {
                const result = await updateHours(bizId, hours)
                if (result.success) {
                    toast.success(result.message)
                    action?.();
                }
                else {
                    toast.error(result.error)
                }
            } else {
                const result = await createHours(bizId, hours)
                if (result.success) {
                    toast.success(result.message)
                    action?.();
                }
                else {
                    toast.error(result.error)
                }
            }

        })
    }


    const anchor = useComboboxAnchor()

    return (
        <form id="hours-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
                <FieldSet>
                    <FieldLegend>
                        Enter Your Business Hours
                    </FieldLegend>

                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Checkbox checked={checked} onCheckedChange={toogleCheck} id="week-days" name="all-week" />
                            <Label className="text-nowrap cursor-pointer" htmlFor="week-days">
                                All Week
                            </Label>
                        </div>


                        <Controller
                            name="days"
                            control={form.control}
                            render={({ field, fieldState }) => (

                                <Field>
                                    <FieldLabel>Select Days</FieldLabel>
                                    <Combobox
                                        multiple
                                        autoHighlight
                                        items={days}
                                        value={field.value}
                                        onValueChange={(value) => field.onChange(value)}
                                    >
                                        <ComboboxChips ref={anchor} className="w-full">
                                            <ComboboxValue>
                                                {(values) => (
                                                    <React.Fragment>
                                                        {values.map((value: string) => (
                                                            <ComboboxChip key={value}>{value}</ComboboxChip>
                                                        ))}
                                                    </React.Fragment>
                                                )}
                                            </ComboboxValue>
                                            <ComboboxChipsInput placeholder={field.value.length ? "" : "Select Working Days"} />
                                        </ComboboxChips>
                                        <ComboboxContent anchor={anchor}>
                                            <ComboboxEmpty>No items found.</ComboboxEmpty>
                                            <ComboboxList>
                                                {(item) => (
                                                    <ComboboxItem key={item} value={item}>
                                                        {item}
                                                    </ComboboxItem>
                                                )}
                                            </ComboboxList>
                                        </ComboboxContent>
                                    </Combobox>
                                    {fieldState.error && (
                                        <FieldError>{fieldState.error.message}</FieldError>
                                    )}
                                </Field>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Controller
                            name="open"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel>Open Time</FieldLabel>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Open Time" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {timings.map((timing) => (
                                                <SelectItem key={timing} value={timing}>
                                                    {timing}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {fieldState.error && (
                                        <FieldError>{fieldState.error.message}</FieldError>
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="close"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel>Close Time</FieldLabel>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Close Time" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {timings.map((timing) => (
                                                <SelectItem key={timing} value={timing}>
                                                    {timing}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {fieldState.error && (
                                        <FieldError>{fieldState.error.message}</FieldError>
                                    )}
                                </Field>
                            )}
                        />

                    </div>
                </FieldSet>

                <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={action}>Skip</Button>
                    <Button disabled={isPending} className="cursor-pointer" form="hours-form" type="submit">{isPending ? <Loader2 className="size-5 animate-spin" /> : "Save & Continue"}</Button>
                </div>
            </FieldGroup>
        </form >
    )
}