import { auth } from "@/lib/auth";
import { updateUser, updateUserLocation, updateUserProfile } from "@/lib/queries/user";
import { editSchema } from "@/schemas/zod";
import { Gender, MaritialStatus, Occupation } from "@repo/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
    const session = await auth()

    if (!session || !session.user.id) {
        return NextResponse.json({
            success: false,
            message: "Unauthorized"
        }, { status: 401 })
    }

    const body = await req.json()
    const dirtyFields = body.dirtyFields
    const result = editSchema.safeParse(body.data)

    if (!dirtyFields || !result.success) {
        return NextResponse.json({
            success: false,
            message: "Invalid Data",
        }, { status: 400 })
    }

    try {
        const data = result.data
        console.log("Dirty Fields",dirtyFields)
        console.log("Fields",data)

        // Update User
        if (dirtyFields.user) {
            await updateUser(session.user.id, {
                name: data.user.name,
            })
        }

        // Update User Profile
        if (dirtyFields.profile) {
            await updateUserProfile(session.user.id, {
                dob: new Date(data.profile.dob),
                gender: data.profile.gender as Gender,
                maritial_status: data.profile.maritalStatus as MaritialStatus,
                occupation: data.profile.occupation as Occupation
            })
        }

        // Update User Location
        if (dirtyFields.location) {
            await updateUserLocation(session.user.id, {
                address_line1: data.location.address,
                landmark: data.location.landmark || null,
                area: data.location.area,
                pincode: data.location.pincode,
                city: data.location.city,
                state: data.location.state,
            })
        }

        return NextResponse.json({
            success: true,
            message: "Profile Updated",
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            error: "Internal Server Error"
        }, { status: 500 })
    }
}