"use client"

import { businessGallerySchema } from "@/schemas/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/components/button";
import { FieldGroup, FieldLegend, FieldSet } from "@repo/ui/components/field";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { toast } from "@repo/ui/lib/utils";
import { Loader2, Trash, Trash2, UploadIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import z from "zod";

type Props = {
    bizId: string;
    setStep: React.Dispatch<React.SetStateAction<string>>;
}


async function updatePhotos(bizId: string, files: File[]) {

    const formData = new FormData()
    files.forEach((file) => {
        formData.append("files", file)
    })

    const res = await fetch(`/api/businesses/${bizId}/photos`, {
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data"
        },
        body: formData
    })
    return await res.json()
}

export default function PhotosForm({ bizId, setStep }: Props) {
    const router = useRouter()
    const form = useForm<z.infer<typeof businessGallerySchema>>({
        resolver: zodResolver(businessGallerySchema),
        defaultValues: {
            files: [],
        }
    })


    function appendFile(e: React.ChangeEvent<HTMLInputElement>) {
        const files = form.getValues("files")
        const file = e.target.files?.[0]
        if (file) {
            files.push(file)
            form.setValue("files", files)
        }
    }

    function removeFile(index: number) {
        const files = form.getValues("files")
        files.splice(index, 1)
        form.setValue("files", files)
    }

    const files = form.watch("files")


    const [isPending, startTransition] = useTransition()
    function onSubmit(data: any) {
        startTransition(async () => {
            console.log(data)
            const res = await updatePhotos(bizId, data.files)
            console.log(res)
            router.push('/free-listing/success')

        })
    }
    return (
        <form id="photos-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
                <FieldSet>
                    <FieldLegend>
                        Upload Your Business Photos
                    </FieldLegend>
                </FieldSet>

                <div className="flex flex-wrap gap-4">
                    {files?.map((file, index) => (
                        <div key={index} className="relative size-32 aspect-square border-2 border-primary rounded-lg flex flex-col items-center justify-center">
                            <Image src={URL.createObjectURL(file)} alt="" width={100} height={100} className="rounded-md w-full h-full object-cover" />
                            <Button variant="ghost" className="cursor-pointer absolute top-1 right-1 text-destructive" size="icon" type="button" onClick={() => { removeFile(index) }}>
                                <Trash2 className="size-4" />
                            </Button>
                        </div>
                    ))}

                    {files.length < 5 && (
                        <div className="size-32 aspect-square border-2 border-primary rounded-lg flex flex-col items-center justify-center">
                            <Input onChange={appendFile} id="cover-5" type="file" className="hidden" />
                            <Label className="cursor-pointer" htmlFor="cover-5">
                                <UploadIcon className="size-5" /> Upload
                            </Label>
                        </div>
                    )}

                </div>

                <div className="flex justify-end gap-2">
                    <Button disabled={isPending} type="submit">{isPending ? <Loader2 className="size-5 animate-spin" /> : "Save"}</Button>
                </div>
            </FieldGroup>
        </form >
    )
}