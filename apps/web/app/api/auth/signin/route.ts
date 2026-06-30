import { signIn } from "@/lib/auth";
import { loginSchema } from "@/schemas/zod";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const body = await req.json()

    const result = loginSchema.safeParse(body)

    if(!result.success) {
        return NextResponse.json({
            success: false,
            error: "Invalid Credentials"
        })
    }

    const { email, password } = body;

    const  res = await signIn('credentials', {
        email,
        password,
        redirect: false
    })

    return NextResponse.json({
        success: true,
        message: "Authenticated",
        data: res
    })
}