import { prisma } from "@repo/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const query = req.nextUrl.searchParams
    const q = query.get("q")
    const area = query.get("area")
    const city = query.get("city")
    const postcode = query.get("postcode")

    if (!q) {
        return NextResponse.json({
            success: false,
            error: "Query is required"
        }, { status: 400 })
    }
    
    try {
        const categories = await prisma.category.findMany({
            where: {
                slug: {
                    startsWith: q,
                    mode: "insensitive"
                }
            },
            take: 20
        })

        const businesses = await prisma.business.findMany({
            where: {
                slug: {
                    startsWith: q,
                    mode: "insensitive"
                },
                location: {
                    city: city ? {
                        equals: city,
                        mode: "insensitive"
                    }: undefined,
                    pincode: postcode ? {
                        equals: postcode,
                        mode: "insensitive"
                    }: undefined,
                    area: area ? {
                        equals: area,
                        mode: "insensitive"
                    } : undefined
                }
            },
            take: 5
        })

        return NextResponse.json({
            success: true,
            categories,
            businesses
        })

    } catch (error) {
        return NextResponse.json({
            success: false,
            error
        }, { status: 500 })
    }
}