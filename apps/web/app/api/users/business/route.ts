import { auth } from "@/lib/auth";
import { prisma } from "@repo/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const session = await auth();

        if (!session || !session.user.id) {
            return NextResponse.json({
                success: false,
                error: "Unauthorized"
            }, { status: 401 });
        }

        const businesses = await prisma.business.findMany({
            where: {
                owner_id: session.user.id
            },
            select: {
                id: true,
                name: true,
                created_at: true,
                status: true,
                slug: true,
            }
        })

        return NextResponse.json({
            success: true,
            message: "My Businesses fetched",
            data: businesses
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            error: "Internal Server Error"
        }, { status: 500 })
    }

}