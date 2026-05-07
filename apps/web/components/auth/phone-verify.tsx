"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { otpSchema, phoneSchema } from "@/schemas/zod";
import z from "zod";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@repo/ui/components/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "@repo/ui/components/field";
import { Input } from "@repo/ui/components/input";
import { Button } from "@repo/ui/components/button";
import { useSession } from "next-auth/react";


async function verifyUserPhone(data:any) {
    const res = await fetch('/api/auth/verify/phone', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    return res.json()
}

export default function PhoneVerify() {
    const {data: session} = useSession()
    const [isPending, startTransition] = useTransition()
    const [showOtp, setShowOtp] = useState(false)
    const [verified, setVerified] = useState(false)

    const form1 = useForm<z.infer<typeof phoneSchema>>({
        resolver: zodResolver(phoneSchema),
        defaultValues: {
            phone: ''
        }
    })

    const form2 = useForm<z.infer<typeof otpSchema>>({
        resolver: zodResolver(otpSchema),
        defaultValues: {
            otp: ''
        }
    })

    function onSubmit(data: z.infer<typeof phoneSchema>) {
        console.log(data)
        if (data.phone) {
            setShowOtp(true)
        }
        startTransition(async () => {
            const res = await fetch('/api/auth/send-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ phone: data.phone })
            })

            const result = await res.json()
            if(result.success) {
                toast.success(result.message)
                form2.setValue('otp', result.data.otp)
            } else {
                toast.error(result.error)
            }
        })
    }

    function verify(data: z.infer<typeof otpSchema>) {
        startTransition(async()=> {
            const res = await verifyUserPhone({
                phone: form1.getValues('phone'),
                otp: data.otp
            })
            if(res.success){
                setVerified(true)
                toast.success('Phone verified')
            }else{
                toast.error(res.message)
            }
        })
    }

    return (
        <Dialog open={!verified}>
            <DialogTrigger asChild></DialogTrigger>
            <DialogContent showCloseButton={false}>
                <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold">Welcome, {session?.user?.name}</DialogTitle>
                    <DialogDescription>
                        Please, verify your phone number
                    </DialogDescription>
                </DialogHeader>
                <form id="phone-form" onSubmit={form1.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            name="phone"
                            control={form1.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="email">
                                        Phone
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="phone"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter phone number"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Field >
                            <Button className="cursor-pointer" disabled={isPending} type="submit" form="phone-form">
                                {showOtp ? 'Resend OTP' : 'Send OTP'}
                            </Button>
                        </Field>
                    </FieldGroup>
                </form>
                <DialogFooter>
                    {showOtp &&
                        <form className="w-full" id="otp-form" onSubmit={form2.handleSubmit(verify)}>
                            <FieldGroup>
                                <Controller
                                    name="otp"
                                    control={form2.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="otp">
                                                OTP
                                            </FieldLabel>
                                            <Input
                                                {...field}
                                                id="otp"
                                                aria-invalid={fieldState.invalid}
                                                placeholder="Enter OTP"
                                                autoComplete="off"
                                            />
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />
                                <Field >
                                    <Button className="cursor-pointer" disabled={isPending} type="submit" form="otp-form">
                                        Verify
                                    </Button>
                                </Field>
                            </FieldGroup>
                        </form>
                    }
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}