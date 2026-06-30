import bcrypt from "bcryptjs"
import { prisma } from "../../src"

export default async function seedUser() {
  console.log('Seeding user ...')
  const passwordHash = await bcrypt.hash('superuser', 12)

  const adminUser = await prisma.user.upsert({
    where: { email: 'kapilkumar@gmail.com' },
    update: {},
    create: {
      email: 'kapilkumar@gmail.com',
      password: passwordHash,
      name: 'Kapil Kumar',
      role: "ADMIN",
      is_email_verified: true,
      phone: '7409495051'
    },
  })

  const testUser = await prisma.user.upsert({
    where: {
      email: 'test@gmail.com'
    },
    update: {},
    create: {
      email: 'test@gmail.com',
      password: passwordHash,
      name: 'Test User',
      is_email_verified: true,
      phone: '7409495052'
    }
  })

  console.log('User Done')
}