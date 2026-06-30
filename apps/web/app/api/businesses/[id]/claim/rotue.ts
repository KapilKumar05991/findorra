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
        // TODO: Create claim request

        return NextResponse.json({
            success: true,
            message: "Claim Request",
            data: {}
        })
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to add hours" },
            { status: 500 }
        );
    }
}