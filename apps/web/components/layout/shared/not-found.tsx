import { BadgeInfo } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center gap-2">
            <BadgeInfo className="w-12 h-12 text-red-500" />
            <h2 className="text-xl font-semibold">Not Found</h2>
        </div>
    )
}