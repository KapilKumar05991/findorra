import { Button } from "@repo/ui/components/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className="h-screen flex items-center justify-center">
            <Button className="fixed top-4 left-4" asChild>
                <Link href="/"><ChevronLeft />Back to Home</Link>
            </Button>
            {children}
        </main>
    )
}