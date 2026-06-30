import { Business, prisma } from "@repo/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = req.nextUrl;
        const q = searchParams.get("q")
        const city = searchParams.get("city")
        const area = searchParams.get("area")
        const postcode = searchParams.get("postcode")
        
        console.log({
            q,
            city,
            area,
            postcode
        })

        if (!q || !city) {
            return NextResponse.json({ 
                success: false,
                error: "Query and city are required"
            }, { status: 400 });
        }


        const catExist = await prisma.category.findUnique({
            where: {
                slug: q.toLowerCase()
            }
        })

        let businesses: Business[] = []

        if (catExist) {
            const listings = await prisma.business.findMany({
                where: {
                    location: {
                        city: {
                            equals: city,
                            mode: "insensitive"
                        },
                        area: area ? {
                            equals: area,
                            mode: "insensitive"
                        } : undefined
                    },
                    categories: {
                        some: {
                            category_id: catExist.id
                        }
                    },
                    status: "ACTIVE"
                },
                include: {
                    location: true,
                    contact: true,
                    attributes: true,
                }
            })

            businesses = businesses.concat(listings)
        } else {
            const listings = await prisma.business.findMany({
                where: {
                    location: {
                        city: {
                            equals: city,
                            mode: "insensitive"
                        },
                        area: area ? {
                            equals: area,
                            mode: "insensitive"
                        } : undefined
                    },
                    name: {
                        startsWith: q,
                        mode: "insensitive"
                    },
                    status: "ACTIVE"
                },
                include: {
                    location: true,
                    contact: true,
                    attributes: true,
                }
            })

            businesses = businesses.concat(listings)

        }

        return NextResponse.json({
            success: true,
            message: "Businesses fetched",
            data: businesses
        })

    } catch (error) {
        return NextResponse.json({
            success: false,
            error: "Failed to fetch businesses",
        },
            { status: 500 }
        );
    }
}

