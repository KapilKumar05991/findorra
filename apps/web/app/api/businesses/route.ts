import { auth } from "@/lib/auth";
import { businessSchema } from "@/schemas/zod";
import slugGenerator from "@/utils/slug-generator";
import { prisma } from "@repo/db";
import { NextResponse } from "next/server";


export async function GET(req: Request) {
    try {
        const session = await auth()
        if (!session || !session.user.id) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }
        const businesses = await prisma.business.findMany({
            where: {
                owner_id: session.user.id
            }
        })
        return NextResponse.json({
            success: true,
            message: "Businesses fetched",
            data: businesses
        })
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to get businesses" },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        const session = await auth()
        if (!session || !session.user.id) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }
        const body = await req.json()
        const result = businessSchema.safeParse(body)
        if (!result.success) {
            return NextResponse.json({
                success: false,
                error: "Invalid Inputs",
            }, { status: 400 })
        }

        const data = result.data

        const checkDuplicate = await prisma.business.findFirst({
            where: {
                name: data.name,
                owner_id: session.user.id
            }
        })
        if (checkDuplicate) {
            return NextResponse.json({
                success: false,
                error: "Duplicate Name",
            }, { status: 400 })
        }

        let bizSlug = ""
        if (data.area) {
            bizSlug = slugGenerator(data.name, data.area, data.city)
        } else {
            bizSlug = slugGenerator(data.name, data.city)
        }

        const business = await prisma.business.create({
            data: {
                name: data.name,
                slug: bizSlug,
                owner_id: session.user.id,
                location: {
                    create: {
                        address: data.address,
                        pincode: data.pincode,
                        city: data.city,
                        state: data.state,
                        area: data.area
                    }
                }
            }
        })

        return NextResponse.json({
            success: true,
            message: "Business created",
            data: business
        })

    } catch (error) {
        return NextResponse.json(
            { error: "Failed to create business" },
            { status: 500 }
        );
    }
}