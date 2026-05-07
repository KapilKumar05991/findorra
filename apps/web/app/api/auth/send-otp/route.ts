import { phoneSchema } from "@/schemas/zod";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    
    const body = await request.json()
    
    const result = phoneSchema.safeParse(body)
    
    if(!result.success) {
        return NextResponse.json({
            success: false,
            error: "Invalid phone number"
        }, { status: 400})
    }
    
    const { phone } = result.data
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    console.log("OTP",otp,"Send To",phone)
    // TODO: STORE OTP IN CACHE WITH PHONE NUMBER AS KEY

    return NextResponse.json({
        success: true,
        message: "OTP Sent",
        data: {
            otp
        }
    }, {status: 201})
}