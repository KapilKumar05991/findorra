import { auth } from "@/lib/auth";
import { verifyPhone } from "@/lib/queries/user";
import { otpSchema, phoneSchema } from "@/schemas/zod";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function POST(req: NextRequest) {
    const session = await auth()

    if (!session || !session.user.id) {
        return NextResponse.json({
            success: false,
            error: "Unauthorized"
        }, { status: 401 })
    }

    const data = await req.json()
    const result = z.intersection(phoneSchema, otpSchema).safeParse(data)
    
    if(!result.success){
        return NextResponse.json({
            success: false,
            error: "Invalid Inputs"
        }, { status: 400 })
    }
    const { phone, otp } = result.data
    try {
        // TODO: VERIFY MOBILE NUMBER AND OTP
        console.log(phone,otp)
        await verifyPhone(session.user.id, data.phone)

        return NextResponse.json({
            success: true,
            message: "Phone Verified"
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Internal Server Error"
        }, { status: 500 })
    }
}

export async function GET(req: NextRequest) {
    const data = await req.json()

    const result = phoneSchema.safeParse(data)

    if(!result.success){
        return NextResponse.json({
            success: false,
            error: "Invalid Inputs"
        }, { status: 400 })
    }
    
    try {
        const { phone } = result.data

        // TODO: SEND OTP TO MOBILE NUMBER
        console.log(phone)

        return NextResponse.json({
            success: true,
            message: "OTP Sent"
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Internal Server Error"
        }, { status: 500 })
    }
}