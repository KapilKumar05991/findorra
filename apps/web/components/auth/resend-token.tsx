"use client"
import { useEffect, useState, useTransition } from "react"
import { Button } from "@repo/ui/components/button"
import { toast } from "@repo/ui/lib/utils"
import { useSearchParams } from "next/navigation"

export default function ResendTokenButton() {
    const params = useSearchParams()
    const identifier = params.get('identifier')
    const [isPending, startTransition] = useTransition()
    const [timer, setTimer] = useState(0)
    const [blocked, setBlocked] = useState(timer > 0)

    useEffect(() => {
        if (blocked) {
            const interval = setInterval(() => {
                setTimer((timer) => {
                    if (timer == 0) {
                        clearInterval(interval)
                        setBlocked(false)
                    }
                    return timer - 1
                })
            }, 1000)
        }
    }, [blocked])

    function handleClick() {
        startTransition(async () => {
            const result = await fetch(`/api/auth/verify?email=${identifier}`)
            const response = await result.json()
            console.log(response)
            if (response.success) {
                toast.success(response.message)
                setTimer(120)
                setBlocked(true)
            } else {
                toast.error(response.error)
            }
        })
    }


    return (
        <span>
            <Button variant="link" onClick={handleClick} disabled={isPending || blocked} type="button" className="cursor-pointer">
                {blocked ? timer : 'Resend'}
            </Button>
        </span>
    )
}