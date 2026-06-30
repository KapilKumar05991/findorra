import { auth } from "@/lib/auth";
import { businessCategoriesSchema } from "@/schemas/zod";
import { prisma } from "@repo/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest,{ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const session = await auth()
    try {
        if (!session || !session.user.id) {
            return NextResponse.json({
                success: false,
                error: "Unauthorized",
            }, { status: 401 })
        }
        const business = await prisma.business.findUnique({
            where: {
                id,
                owner_id: session.user.id
            }
        })

        if (!business) {
            return NextResponse.json({
                success: false,
                error: "Forbidden"
            }, { status: 403 })

        }

        const primaryCat = await prisma.businessCategory.findFirst({
            where: {
                business_id: business.id,
                is_primary: true
            },
            include: {
                category: {
                    select: {
                        id: true,
                        name: true,
                    }
                }
            }
        })
        const secondaryCats = await prisma.businessCategory.findMany({
            where: {
                business_id: id,
                is_primary: false
            },
            include: {
                category: {
                    select: {
                        id: true,
                        name: true,
                    }
                }
            }
        })
        return NextResponse.json({
            success: true,
            message: "Category Fetched",
            data: {
                primary:primaryCat,
                secondary:secondaryCats
            }
        })
    } catch (error) {
        console.log("[GET] /api/businesses/[id]/category Error:", error)
        return NextResponse.json({
            success: false,
            error: "Internal Server Error"
        }, { status: 500 })
    }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth()
    if (!session || !session.user.id) {
        return NextResponse.json({
            success: false,
            error: "Unauthorized",
        }, { status: 401 })
    }
    const { id } = await params
    const business = await prisma.business.findUnique({
        where: {
            id,
            owner_id: session.user.id
        }
    })

    if (!business) {
        return NextResponse.json({
            success: false,
            error: "Forbidden"
        }, { status: 403 })

    }
    const body = await req.json()
    const result = businessCategoriesSchema.safeParse(body)
    if (!result.success) {
        return NextResponse.json({
            success: false,
            error: "Invalid Inputs"
        }, { status: 400 })
    }

    try {
        await prisma.businessCategory.deleteMany({
            where: {
                business_id: id,
            }
        })

        const mainCat = await prisma.businessCategory.create({
            data: {
                business_id: id,
                category_id: result.data.primary,
                is_primary: true,
            }
        })

        const subCats = await prisma.businessCategory.createMany({
            data: result.data.secondary.map((cat) => ({
                business_id: id,
                category_id: cat
            }))
        })

        return NextResponse.json({
            success: true,
            message: "Category Updated",
            data: {
                mainCat,
                subCats
            }
        })
    } catch (error) {
        console.log("[POST] /api/businesses/[id]/category Error:", error)
        return NextResponse.json({
            success: false,
            error: "Internal Server Error"
        }, { status: 500 })
    }
}
