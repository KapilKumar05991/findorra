import { auth } from "@/lib/auth";
import { getUserById } from "@/lib/queries/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const session = await auth()

    if (!session || !session.user.id) {
        return NextResponse.json({
            success: false,
            error: "Unauthorized"
        }, { status: 401 })
    }

    try {
        const user = await getUserById(session.user.id)
        return NextResponse.json({
            success: true,
            message: "User Found",
            data: {
                user
            }
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: "Internal Server Error"
        }, { status: 500 })
    }
}