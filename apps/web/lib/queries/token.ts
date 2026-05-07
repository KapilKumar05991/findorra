import { prisma } from "@repo/db"

type Data = {
    token: string
    identifier: string
}

export async function getToken(data: Partial<Data>) {

    const existingToken = await prisma.token.findUnique({
        where: {
            token: data.token,
            identifier: data.identifier
        }
    })

    return existingToken
}


export async function generateToken(data: Data) {
    const existingToken = await getToken(data)

    if(existingToken) {
        await deleteToken(existingToken.id)
    }

    const expiry = new Date(Date.now() + 1000 * 60 * 10)
    const token = await prisma.token.create({
        data: {
            token: data.token,
            identifier: data.identifier,
            expires_at: expiry
        }
    })

    return token
}

export async function deleteToken(id: string) {
    const token = await prisma.token.delete({
        where: {
            id
        }
    })
    
    return token
}