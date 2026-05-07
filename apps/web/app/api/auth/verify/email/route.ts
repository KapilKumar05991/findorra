import { sendVerifyEmail } from "@/lib/email/resend";
import { deleteToken, generateToken, getToken } from "@/lib/queries/token";
import { getUserByEmail, verifyUser } from "@/lib/queries/user";
import { emailSchema, verifySchema } from "@/schemas/zod";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const data = await req.json()
    const result = verifySchema.safeParse(data)

    if (!result.success) {
        return NextResponse.json({
            success: false,
            error: "Invalid Inputs"
        }, { status: 400 })
    }

    const { token, identifier } = result.data

    try {
        const existingToken = await getToken({ token, identifier })

        if (!existingToken) {
            return NextResponse.json({
                success: false,
                error: "Token Not Found"
            }, { status: 404 })
        }

        const expired = existingToken.expires_at < new Date()
        if (expired) {
            return NextResponse.json({
                success: false,
                error: "Token Expired! Try Requesting New Token"
            }, { status: 400 })
        }

        const user = await getUserByEmail(existingToken.identifier)

        if (!user) {
            return NextResponse.json({
                success: false,
                error: "User Not Found"
            }, { status: 404 })
        }

        await verifyUser(user.id)
        await deleteToken(existingToken.id)

        return NextResponse.json({
            success: true,
            message: "Account Verified"
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Internal Server Error"
        }, { status: 500 })

    }
}

export async function GET(req: NextRequest) {
    const queryParams = req.nextUrl.searchParams
    const emailParam = queryParams.get("email")

    const result = emailSchema.safeParse({ email: emailParam })

    if (!result.success) {
        return NextResponse.json({
            success: false,
            error: "Email Required"
        }, { status: 400 })
    }

    const { email } = result.data

    try {
        const user = await getUserByEmail(email)

        if (!user) {
            return NextResponse.json({
                success: false,
                error: "Email Not Registered"
            }, { status: 404 })
        }

        const existingToken = await getToken({ identifier: user.email })
        if (existingToken) {
            await deleteToken(existingToken.id)
        }

        const code = Math.floor(100000 + Math.random() * 900000).toString()
        const token = await generateToken({
            token: code,
            identifier: user.email
        })

        const status = await sendVerifyEmail(token)
        console.log(status)
        return NextResponse.json({
            success: true,
            message: "Verify Email Sent"
        })

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            error: "Internal Server Error"
        }, { status: 500 })
    }
}

