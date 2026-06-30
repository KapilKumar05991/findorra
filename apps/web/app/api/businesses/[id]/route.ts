import { auth } from "@/lib/auth";
import { businessSchema } from "@/schemas/zod";
import { prisma } from "@repo/db";
import { NextRequest, NextResponse } from "next/server";

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
        return NextResponse.json({
            success: false,
            error: "Something went wrong"
        }, { status: 500 })
    }

}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await auth()
        if (!session || !session.user) {
            return NextResponse.json({
                success: false,
                error: "Unauthorized"
            }, { status: 401 })
        }

        const { id } = await params
        const body = await req.json()
        const result = businessSchema.safeParse(body)
        if (!result.success) {
            return NextResponse.json({
                success: false,
                error: "Invalid Data",
            }, { status: 400 })
        }
        const data = result.data

        const business = await prisma.business.findUnique({
            where: {
                id,
                owner_id: session.user.id
            }
        })

        if (!business) {
            return NextResponse.json({
                success: false,
                message: "Forbidden"
            }, { status: 403 })
        }

        // TODO: Update Partial Fields
        const updated = await prisma.business.update({
            where: {
                id
            },
            data: data
        })

        return NextResponse.json({
            success: true,
            message: "Business Updated",
            data: updated
        })


    } catch (error) {
        return NextResponse.json({
            success: false,
            error: "Something went wrong"
        }, { status: 500 })
    }
}


export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await auth()
        if (!session || !session.user) {
            return NextResponse.json({
                success: false,
                error: "Unauthorized"
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
                message: "Forbidden"
            }, { status: 403 })
        }

        const deleted = await prisma.business.update({
            where: {
                id
            },
            data: {
                status: "CLOSED"
            }
        })

        return NextResponse.json({
            success: true,
            message: "Business Deleted",
            data: deleted
        })

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            error: "Something went wrong"
        }, { status: 500 })
    }
}