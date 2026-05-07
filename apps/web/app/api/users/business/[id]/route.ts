import { auth } from "@/lib/auth"
import { prisma } from "@repo/db"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const session = await auth()

    if (!session || !session.user) {
        return NextResponse.json({
            success: false,
            error: "Unauthorized"
        }, { status: 401 })
    }
    try {
        const business = await prisma.business.findUnique({
            where: {
                id,
                owner_id: session.user.id
            },
            include: {
                attributes: true,
                location: true,
                contact: true,
                media: true,
                faqs: true,
                reviews: {
                    include: {
                        user: true
                    }
                },
                categories: true,
                leads: true
            }
        })

        if (!business) {
            return NextResponse.json({
                success: false,
                error: "Business Not Found"
            }, { status: 404 })
        }
        return NextResponse.json({
            success: true,
            data: business
        })
    } catch (error) {
        console.log("[BUSINESSES_ID_GET]", error)
        return NextResponse.json({
            success: false,
            error: "Something went wrong"
        }, { status: 500 })
    }

}