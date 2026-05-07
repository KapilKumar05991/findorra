"use client"

import { businessCategoriesSchema } from "@/schemas/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/components/button";
import { Combobox, ComboboxChip, ComboboxChips, ComboboxChipsInput, ComboboxContent, ComboboxEmpty, ComboboxItem, ComboboxList, ComboboxValue, useComboboxAnchor } from "@repo/ui/components/combobox";
import { Field, FieldError, FieldGroup, FieldLegend, FieldSet } from "@repo/ui/components/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/select";
import { toast } from "@repo/ui/lib/utils";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

type Props = {
    bizId: string;
    setStep: React.Dispatch<React.SetStateAction<string>>;
}

async function fetchCategories(parent: string | null) {
    const res = await fetch(`/api/categories?parentId=${parent}`)
    return res.json()
}

async function updateCategory(bizId: string, data: z.infer<typeof businessCategoriesSchema>) {
    const res = await fetch(`/api/businesses/${bizId}/category`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }
    )
    return res.json()
}


export default function CategoryForm({ bizId, setStep }: Props) {
    const [primaryOption, setPrimaryOption] = useState<{ id: string, name: string }[]>([])
    const [secondaryOption, setSecondaryOption] = useState<{ id: string, name: string }[]>([])

    const form = useForm<z.infer<typeof businessCategoriesSchema>>({
        resolver: zodResolver(businessCategoriesSchema),
        defaultValues: {
            primary: "",
            secondary: []
        }
    })

    useEffect(()=> {
        startTransition(async () => {
            const result = await fetchCategories(null)
            console.log(result)
            if (result.success) {
                setPrimaryOption(result.data)
            } else {
                toast.error(result.error)
            }
        })

    },[bizId])


    const [isPending, startTransition] = useTransition()
    async function onSubmit(data: z.infer<typeof businessCategoriesSchema>) {
        console.log(data)
        startTransition(async () => {
            const result = await updateCategory(bizId,data)
            if (result.success) {
                toast.success(result.message)
                setStep(step => String(parseInt(step) + 1));
            }
            else {
                toast.error(result.error)
            }
        })
    }

    const primary = form.watch("primary")

    useEffect(() => {
        if (primary) {
            startTransition(async () => {
                const result = await fetchCategories(primary)
                console.log(result)
                if (result.success) {
                    setSecondaryOption(result.data)
                } else {
                    toast.error(result.error)
                }
            })
        }
    },[primary])

    const anchor = useComboboxAnchor()
    return (
        <form id="category-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
                <FieldSet>
                    <FieldLegend>
                        Choose Your Business Category
                    </FieldLegend>
                </FieldSet>

                <Controller
                    control={form.control}
                    name="primary"
                    render={({ field, fieldState }) => (
                        <Field>
                            <Select value={field.value} onValueChange={field.onChange}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Main Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {primaryOption.map((category) => (
                                        <SelectItem key={category.id} value={category.id}>
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {fieldState.error &&
                                <FieldError>{fieldState.error.message}</FieldError>
                            }
                        </Field>)}
                />
                <Controller
                    control={form.control}
                    name="secondary"
                    render={({ field, fieldState }) => (
                        <Field>
                            <Combobox
                                multiple
                                autoHighlight
                                items={secondaryOption}
                                onValueChange={(value) => field.onChange(value.map((v: any) => v.id))}
                            >
                                <ComboboxChips ref={anchor} className="w-full">
                                    <ComboboxValue>
                                        {(values) => (
                                            <React.Fragment>
                                                {values.map((value: { id: string, name: string }) => (
                                                    <ComboboxChip key={value.id}>{value.name}</ComboboxChip>
                                                ))}
                                            </React.Fragment>
                                        )}
                                    </ComboboxValue>
                                    <ComboboxChipsInput placeholder={field.value.length ? "" : "Select Suggested Categories"}/>
                                </ComboboxChips>
                                <ComboboxContent anchor={anchor}>
                                    <ComboboxEmpty>No items found.</ComboboxEmpty>
                                    <ComboboxList>
                                        {(item) => (
                                            <ComboboxItem key={item.id} value={item}>
                                                {item.name}
                                            </ComboboxItem>
                                        )}
                                    </ComboboxList>
                                </ComboboxContent>
                            </Combobox>
                            {fieldState.error &&
                                <FieldError>{fieldState.error.message}</FieldError>
                            }
                        </Field>)}
                />
                <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setStep(step => String(parseInt(step) + 1))}>Skip
                    </Button>
                    <Button disabled={isPending} form="category-form" type="submit">{isPending ? <Loader2 className="size-5 animate-spin" /> : "Save & Continue"}</Button>
                </div>
            </FieldGroup>
        </form >
    )
}