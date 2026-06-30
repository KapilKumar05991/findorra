import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="p-6 flex items-center justify-center">
            <Loader2 className="size-10 animate-spin" />
        </div>
    )
}