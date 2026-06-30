import { prisma } from "@repo/db"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    try {
        const business = await prisma.business.findUnique({
            where: {
                id
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
                }
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