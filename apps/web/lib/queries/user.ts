import { registerSchema } from "@/schemas/zod";
import { Location, prisma, Profile, User } from "@repo/db";
import z from "zod";
import bcrypt from 'bcrypt'

export async function getUserById(id: string) {
    const user = await prisma.user.findUnique({
        where: {
            id
        },
        include: {
            profile: true,
            location: true,
        }
    })
    return user
}

export async function getUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })
    return user
}

export async function createUser(data: z.infer<typeof registerSchema>) {
    const user = await prisma.user.create({
        data
    })
    return user
}

export async function verifyUser(id: string) {
    const user = await prisma.user.update({
        where: {
            id
        },
        data: {
            emailVerified: new Date(),
            is_email_verified: true
        }
    })
    return user
}

export async function verifyPhone(id: string,phone: string) {
    const user = await prisma.user.update({
        where: {
            id
        },
        data: {
            phone,
            is_phone_verified: true
        }
    })
    return user
}

export async function updatePassword(id: string, newPassword: string) {
    const hashedPassword = await bcrypt.hash(newPassword, 10)
    await prisma.user.update({
        where: {
            id
        },
        data: {
            password: hashedPassword
        }
    })
}

export async function updateUser(id: string, data: Partial<User>) {
    const user = await prisma.user.update({
        where: {
            id
        },
        data
    })
    return user
}


export async function updateUserProfile(id: string, data: Pick<Profile, "dob" | "gender" | "maritial_status" | "occupation">) {
    const profile = await prisma.profile.upsert({
        where: {
            user_id: id
        },
        update: data,
        create: {
            ...data,
            user_id: id
        }
    })
    return profile
}

export async function updateUserLocation(id: string, data: Pick<Location, "address_line1" | "area" | "landmark" | "pincode" | "city" | "state">) {
    const location = await prisma.location.upsert({
        where: {
            user_id: id
        },
        update: data,
        create: {
            ...data,
            user_id: id
        }
    })
    return location
}