"use client"
import { editSchema, loginSchema } from "@/schemas/zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@repo/ui/components/input"
import { useRouter } from "next/navigation"
import { useEffect, useState, useTransition } from "react"
import { Controller, useForm } from "react-hook-form"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet } from "@repo/ui/components/field";
import z from "zod"
import { Button } from "@repo/ui/components/button"
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/avatar"
import Image from "next/image"
import { Hand, Loader2, Lock } from "lucide-react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@repo/ui/components/select"
import { MaritialStatus, User } from "@repo/db"
import { cities } from "@/constants/cities"
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "@repo/ui/components/combobox"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@repo/ui/components/dialog"
import { toast } from "@repo/ui/lib/utils"

async function fetchUser() {
    const res = await fetch("/api/users/me")
    const data = await res.json()
    return data
}

async function updateUser(data: z.infer<typeof editSchema>, dirtyFields: any) {
    const res = await fetch("/api/users/update", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            dirtyFields,
            data
        }),
    })
    const result = await res.json()
    return result
}



export default function ProfileForm() {
    const [isPending, startTransition] = useTransition()
    const [url, setUrl] = useState<string | undefined>(undefined)

    useEffect(() => {
        startTransition(async () => {
            const res = await fetchUser()
            if (res.success) {
                const user = res.data.user
                form.setValue("user.name", user.name)
                form.setValue("user.email", user.email)
                form.setValue("user.phone", user.phone || undefined)
                form.setValue("user.image", user.image || undefined)
                if (user.profile) {
                    const dob = new Date(user.profile.dob)
                    const dobString = [String(dob.getFullYear()), String(dob.getMonth() + 1).padStart(2, '0'), String(dob.getDate()).padStart(2, '0')]
                    form.setValue("profile.dob", dobString.join("-"))
                    form.setValue("profile.gender", user.profile.gender)
                    form.setValue("profile.maritalStatus", user.profile.maritial_status)
                    form.setValue("profile.occupation", user.profile.occupation)
                }
                if (user.location) {
                    form.setValue("location.address", user.location.address_line1)
                    form.setValue("location.landmark", user.location?.landmark || '')
                    form.setValue("location.area", user.location.area)
                    form.setValue("location.pincode", user.location.pincode)
                    form.setValue("location.city", user.location.city)
                    form.setValue("location.state", user.location.state)
                }
            } else {
                toast.error("Something Went Wrong")
            }
        })
    }, [])



    const form = useForm<z.infer<typeof editSchema>>({
        resolver: zodResolver(editSchema),
        defaultValues: {
            user: {
                name: 'mine',
                email: 'mine@gmail.com',
                phone: '9XXXXXXXX9',
                image: undefined
            },
            profile: {
                dob: '',
                gender: '',
                maritalStatus: '',
                occupation: ''
            },
            location: {
                address: '',
                landmark: '',
                pincode: '',
                area: '',
                city: '',
                state: ''
            }
        }
    })

    useEffect(() => {
        console.log("isDirty: ", form.formState.isDirty)
    }, [form.formState.isDirty])

    function onSubmit(data: z.infer<typeof editSchema>) {
        if (form.formState.isDirty) {
            startTransition(async () => {
                const res = await updateUser(data, form.formState.dirtyFields)
                if (res.success) {
                    toast.success(res.message)
                } else {
                    toast.error("Something Went Wrong")
                }
            })
        } else {
            toast.info("No Changes Detected")
        }

    }
    return (
        <form className="mt-2" id="profile-form" onSubmit={form.handleSubmit(onSubmit)}>
            <Dialog defaultOpen open={isPending}>
                <DialogContent className="w-fit" showCloseButton={false}>
                    <DialogHeader>
                        <DialogTitle className="flex flex-col justify-center items-center gap-2">
                            <span className="text-xl">
                                Processing
                            </span>
                            <Loader2 className="text-primary size-16 animate-spin" />
                        </DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
            <FieldGroup>
                <FieldSet>
                    <FieldLegend>
                        Basic Information
                    </FieldLegend>
                    <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Controller
                            name="user.image"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <div className="flex justify-center items-center gap-6">
                                        <Avatar className="size-24">
                                            <AvatarImage src={url || form.getValues("user.image")} />
                                            <AvatarFallback className="text-2xl">{form.getValues("user.name").slice(0, 1).toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                        <Button variant="outline" asChild>
                                            <FieldLabel htmlFor="image">
                                                Change
                                            </FieldLabel>
                                        </Button>
                                    </div>
                                    <Input
                                        onChange={(e) => {
                                            const file = e.target.files?.[0]
                                            if (file) {
                                                field.onChange(file)
                                                setUrl(URL.createObjectURL(file))
                                            }
                                        }}
                                        id="image"
                                        className="hidden"
                                        type="file"
                                        aria-invalid={fieldState.invalid}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="user.name"
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
                                        placeholder="Enter your Name"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="user.email"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <div className="flex items-center justify-between">
                                        <FieldLabel htmlFor="email">
                                            Email
                                        </FieldLabel>
                                        <Lock className="text-muted-foreground size-4" />
                                    </div>
                                    <Input
                                        {...field}
                                        id="email"
                                        type="email"
                                        disabled
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter your Email"
                                        autoComplete="on"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="user.phone"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <div className="flex items-center justify-between">
                                        <FieldLabel htmlFor="phone">
                                            Phone
                                        </FieldLabel>
                                        <Lock className="text-muted-foreground size-4" />
                                    </div>
                                    <Input
                                        {...field}
                                        id="phone"
                                        type="phone"
                                        disabled
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter your Phone"
                                        autoComplete="on"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                </FieldSet>

                <FieldSeparator />

                <FieldSet>
                    <FieldLegend>
                        Profile
                    </FieldLegend>
                    <FieldDescription>
                        Fields marked with <span className="text-primary">*</span> are mandatory
                    </FieldDescription>
                    <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Controller
                            name="profile.dob"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="dob">
                                        <span className="text-primary">*</span>Date of Birth
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="dob"
                                        type="date"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter your Date of Birth"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="profile.gender"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="gender">
                                        <span className="text-primary">*</span>Gender
                                    </FieldLabel>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select Gender" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Gender</SelectLabel>
                                                <SelectItem value="MALE">Male</SelectItem>
                                                <SelectItem value="FEMALE">Female</SelectItem>
                                                <SelectItem value="OTHER">Other</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="profile.maritalStatus"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="maritial-status">
                                        <span className="text-primary">*</span>Maritial Status
                                    </FieldLabel>
                                    <Select value={field.value} onValueChange={field.onChange} >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select Maritial Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Maritial Status</SelectLabel>
                                                <SelectItem value="SINGLE">Single</SelectItem>
                                                <SelectItem value="MARRIED">Married</SelectItem>
                                                <SelectItem value="DIVORCED">Divorced</SelectItem>
                                                <SelectItem value="WIDOWED">Widowed</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="profile.occupation"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="occupation">
                                        <span className="text-primary">*</span>Occupation
                                    </FieldLabel>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select Occupation" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Occupation</SelectLabel>
                                                <SelectItem value="EMPLOYED">Employed</SelectItem>
                                                <SelectItem value="UNEMPLOYED">Unemployed</SelectItem>
                                                <SelectItem value="BUSINESSMAN">Business</SelectItem>
                                                <SelectItem value="RETIRED">Retired</SelectItem>
                                                <SelectItem value="STUDENT">Student</SelectItem>
                                                <SelectItem value="OTHER">Other</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                </FieldSet>

                <FieldSeparator />

                <FieldSet>
                    <FieldLegend>
                        Location
                    </FieldLegend>
                    <FieldDescription>
                        Enter your location details
                    </FieldDescription>
                    <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Controller
                            name="location.address"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="address">
                                        <span className="text-primary">*</span>Address
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="address"
                                        type="text"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter your Address"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="location.landmark"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="landmark">
                                        Landmark
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="landmark"
                                        type="text"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter your Landmark"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="location.area"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="area">
                                        <span className="text-primary">*</span>Area
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="area"
                                        type="text"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter your Area"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="location.city"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="city">
                                        <span className="text-primary">*</span>City
                                    </FieldLabel>
                                    <Combobox value={field.value} onValueChange={field.onChange} items={cities}>
                                        <ComboboxInput placeholder="Select City" />
                                        <ComboboxContent alignOffset={-10} className="w-60">
                                            <ComboboxEmpty>No Results Found</ComboboxEmpty>
                                            <ComboboxList>
                                                <ComboboxList>
                                                    {(item) => (
                                                        <ComboboxItem key={item} value={item}>
                                                            {item}
                                                        </ComboboxItem>
                                                    )}
                                                </ComboboxList>
                                            </ComboboxList>
                                        </ComboboxContent>
                                    </Combobox>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="location.pincode"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="pincode">
                                        <span className="text-primary">*</span>Pincode
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="pincode"
                                        type="text"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter your Pincode"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="location.state"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="state">
                                        <span className="text-primary">*</span>State
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="state"
                                        type="text"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter your State"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />


                        <Field >
                            <Button variant="outline" type="reset" className="cursor-pointer">
                                Cancel
                            </Button>
                        </Field>
                        <Field >
                            <Button className="cursor-pointer" disabled={isPending} type="submit" form="profile-form">
                                Save
                            </Button>
                        </Field>
                    </FieldGroup>
                </FieldSet>


            </FieldGroup>

        </form>
    )
}