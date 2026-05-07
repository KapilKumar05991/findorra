import { sendForgotEmail } from "@/lib/email/resend";
import { generateToken } from "@/lib/queries/token";
import { getUserByEmail } from "@/lib/queries/user";
import { emailSchema } from "@/schemas/zod";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const data = await req.json()
    const result = emailSchema.safeParse(data)

    if (!result.success) {
        return NextResponse.json(({
            success: false,
            error: "Invalid Inputs"
        }), { status: 400 })
    }

    try {
        const user = await getUserByEmail(result.data.email)

        if (!user) {
            return NextResponse.json({
                success: false,
                error: "User Not Found"
            }, { status: 404 })
        }

        const code = crypto.randomUUID()
        const token = await generateToken({
            token: code,
            identifier: user.email
        })

        const status = await sendForgotEmail(token)
        console.log(status)

        return NextResponse.json(({
            success: true,
            message: 'Reset link sent to your email'
        }))
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            error: "Internal Server Error"
        }, { status: 500 })
    }
}