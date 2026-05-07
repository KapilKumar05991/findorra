import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
        const body = await req.json()
        const session = await auth()
        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        console.log(id)
        console.log(body)

        return NextResponse.json({
            success: true,
            message: "Hours added",
            data: {}
        })
    } catch (error) {
        console.log("[BUSINESSES_ID_HOURS_POST]", error)
        return NextResponse.json(
            { error: "Failed to add hours" },
            { status: 500 }
        );
    }
}