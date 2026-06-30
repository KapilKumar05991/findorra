import { BadgeInfo } from "lucide-react";

type Prop = {
    error: string
    message: string
}

export default function Error({error, message}: Prop) {
    return (
        <div className="p-6 flex flex-col items-center justify-center gap-2">
            <BadgeInfo className="size-12 text-red-500" />
            <h2 className="text-xl font-semibold">{error}</h2>
            <span className="text-sm text-muted-foreground">{message}</span>
        </div>
    )
}