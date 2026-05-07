import { auth } from "@/lib/auth";
import { prisma } from "@repo/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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
            }
        })

        if(!business) {
            return NextResponse.json({
                success: false,
                error: "Forbidden"
            }, { status: 403 })
        }
        
        const data = await req.formData()
        console.log(data)

        return NextResponse.json({
            success: true,
            message: "Photo uploaded",
            data: {}
        })

    } catch (error) {
        console.log("[BUSINESSES_ID_PHOTOS_POST]", error)
        return NextResponse.json(
            { error: "Failed to upload photo" },
            { status: 500 }
        );
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
        const { searchParams } = req.nextUrl
        const photoId = searchParams.get("photoId")
        const session = await auth()
        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        console.log({
            id,
            photoId
        })

        return NextResponse.json({
            success: true,
            message: "Photo deleted",
            data: {}
        })
    } catch (error) {
        console.log("[BUSINESSES_ID_PHOTOS_DELETE]", error)
        return NextResponse.json(
            { error: "Failed to delete hours" },
            { status: 500 }
        );
    }
}
