import { auth } from "@/lib/auth";
import { businessContactSchema } from "@/schemas/zod";
import { prisma } from "@repo/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {

    const { id } = await params
    const session = await auth()

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

    const contact = await prisma.contact.findUnique({
        where: {
            business_id: business.id
        }
    })
    
    return NextResponse.json({
        success: true,
        message: "Contact Fetched",
        data: contact
    })
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
    const result = businessContactSchema.safeParse(body)

    if (!result.success) {
        return NextResponse.json({
            success: false,
            error: "Invalid Inputs",
        }, { status: 400 })
    }

    try {
        const bizContact = await prisma.contact.upsert({
            where: {
                business_id: business.id
            },
            update: result.data,
            create: {
                ...result.data,
                business_id: business.id
            }
        })

        return NextResponse.json({
            success: true,
            message: "Contact Updated",
            data: bizContact
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: "Internal Server Error",
        }, { status: 500 })
    }
}