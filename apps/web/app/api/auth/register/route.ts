import { createUser, getUserByEmail } from "@/lib/queries/user";
import { registerSchema } from "@/schemas/zod";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import { generateToken } from "@/lib/queries/token";
import { sendVerifyEmail } from "@/lib/email/resend";

export async function POST(req: NextRequest) {
    const data = await req.json();
    const result = registerSchema.safeParse(data)

    if(!result.success) {
        return NextResponse.json({
            success: false,
            error: "Invalid Inputs"
        }, {status: 400})
    }

    const { name, email, password } = result.data
    try {
        const existingUser = await getUserByEmail(email)
        if(existingUser) {
            return NextResponse.json({
                success: false,
                error: "An account with this email already exists"
            },{ status: 409})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await createUser({
            name,
            email,
            password: hashedPassword
        })

        const code = Math.floor(100000 + Math.random() * 900000).toString()
        const token = await generateToken({
            token: code,
            identifier: newUser.email
        })

        const status = await sendVerifyEmail(token)
        console.log(status)

        return NextResponse.json({
            success: true,
            message: "User Registered. Now Verify Your Account"
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            error: "Internal Server Error"
        }, {status: 500})
    }
}