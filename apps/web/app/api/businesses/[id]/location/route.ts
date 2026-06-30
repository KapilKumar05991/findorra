import { auth } from "@/lib/auth";
import { businessLocationSchema } from "@/schemas/zod";
import { prisma } from "@repo/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const session = await auth()

    if(!session || !session.user.id) {
        return NextResponse.json({
            success: false,
            error: "Unauthorized"
        }, {status: 401})
    }

    const business = await prisma.business.findUnique({
        where: {
            id,
            owner_id: session.user.id
        }
    })

    if(!business) {
        return NextResponse.json({
            success: false,
            error: "Forbidden"
        }, {status: 403})
    }

    const location = await prisma.location.findUnique({
        where: {
            business_id: business.id
        }
    })

    if(!location) {
        return NextResponse.json({
            success: false,
            error: "Location Not Found"
        }, {status: 404})
    }

    return NextResponse.json({
        success: true,
        message: "Location Found",
        data: location
    })
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const session = await auth()

    if(!session || !session.user.id) {
        return NextResponse.json({
            success: false,
            error: "Unauthorized"
        }, {status: 401})
    }

    const body = await req.json()
    const result = businessLocationSchema.safeParse(body)
    if(!result.success) {
        return NextResponse.json({
            success: false,
            error: "Invalid Inputs"
        }, {status: 400})
    }

    const business = await prisma.business.findUnique({
        where: {
            id,
            owner_id: session.user.id
        }
    })

    if(!business) {
        return NextResponse.json({
            success: false,
            error: "Forbidden"
        }, {status: 403})
    }
    const Location = await prisma.location.update({
        where: {
            business_id: business.id
        },
        data: {
            address: result.data.address,
            area: result.data.area,
            city: result.data.city,
            state: result.data.state,
            pincode: result.data.pincode,
            landmark: result.data.landmark
        }
    })

    if(!Location) {
        return NextResponse.json({
            success: false,
            error: "Failed to Update Location"
        }, {status: 400})
    }
    return NextResponse.json({
        success: true,
        message: "Location Updated"
    })
}