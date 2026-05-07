import { deleteToken, getToken } from "@/lib/queries/token";
import { getUserByEmail, updatePassword } from "@/lib/queries/user";
import { resetSchema } from "@/schemas/zod";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const data = await req.json()
    const result = resetSchema.safeParse(data)

    if (!result.success) {
        return NextResponse.json({
            success: false,
            error: "Invalid Inputs"
        }, { status: 400 })
    }

    const { token, identifier, newPassword } = result.data

    try {
        const existingToken = await getToken({ token, identifier })

        if (!existingToken) {
            return NextResponse.json({
                success: false,
                error: "Token Not Found"
            }, { status: 404 })
        }

        const user = await getUserByEmail(existingToken.identifier)

        if (!user) {
            return NextResponse.json({
                success: false,
                error: "User Not Found"
            }, { status: 404 })
        }
        
        await updatePassword(user.id, newPassword)
        await deleteToken(existingToken.id)

        return NextResponse.json({
            success: true,
            message: "Password Updated"
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            error: "Internal Server Error"
        }, { status: 500 })
    }
}