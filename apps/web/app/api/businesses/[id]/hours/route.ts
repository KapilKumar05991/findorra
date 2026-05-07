import { auth } from "@/lib/auth";
import { businessHoursSchema } from "@/schemas/zod";
import { prisma } from "@repo/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
        const session = await auth()
        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const business = await prisma.business.findUnique({
            where: {
                id,
                owner_id: session.user.id
            },
            select: { id: true }
        })

        if (!business) {
            return NextResponse.json({
                success: false,
                error: "Forbidden"
            }, { status: 403 })
        }

        const hours = await prisma.businessHour.findMany({
            where: {
                business_id: id
            }
        })

        return NextResponse.json({
            success: true,
            message: "Hours fetched",
            data: hours
        })
    } catch (error) {
        console.log("[BUSINESSES_ID_HOURS_GET]", error)
        return NextResponse.json(
            { error: "Failed to fetch hours" },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await auth()
        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
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
        const result = businessHoursSchema.safeParse(body)

        if (!result.success) {
            return NextResponse.json({
                success: false,
                error: "Invalid Data"
            }, { status: 400 })
        }


        const bizHours = await prisma.businessHour.createMany({
            data: result.data.map((hour) => ({
                business_id: id,
                day: hour.day,
                open: hour.open,
                close: hour.close,
                closed: hour.closed,
            }))
        })

        return NextResponse.json({
            success: true,
            message: "Hours added",
            data: bizHours
        })
    } catch (error) {
        console.log("[BUSINESSES_ID_HOURS_POST]", error)
        return NextResponse.json(
            { error: "Failed to add hours" },
            { status: 500 }
        );
    }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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

        const result = businessHoursSchema.safeParse(body)
        if (!result.success) {
            return NextResponse.json({
                success: false,
                error: "Invalid Data"
            }, { status: 400 })
        }

        const updated = await prisma.businessHour.updateMany({
            where: {
                business_id: id
            },
            data: result.data
        })

        return NextResponse.json({
            success: true,
            message: "Hours updated",
            data: updated
        })
    } catch (error) {
        console.log("[BUSINESSES_ID_HOURS_PUT]", error)
        return NextResponse.json(
            { error: "Failed to update hours" },
            { status: 500 }
        );
    }
}