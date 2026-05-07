import { auth } from "@/lib/auth";
import { getUserBusinessByName } from "@/lib/queries/business";
import { businessSchema } from "@/schemas/zod";
import slugGenerator from "@/utils/slug-generator";
import { Business, prisma } from "@repo/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = req.nextUrl;
        const q = searchParams.get("q")
        const city = searchParams.get("city")
        const area = searchParams.get("area")

        console.log({
            q,
            city,
            area
        })

        if (!q || !city) {
            return NextResponse.json(
                { error: "Query and city are required" },
                { status: 400 }
            );
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
        console.error("[BUSINESSES_GET]", error);
        return NextResponse.json({
            success: false,
            error: "Failed to fetch businesses",
        },
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

        bizSlug = bizSlug + "-" + crypto.randomUUID()

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
        console.error("[BUSINESSES_POST]", error);
        return NextResponse.json(
            { error: "Failed to create business" },
            { status: 500 }
        );
    }
}