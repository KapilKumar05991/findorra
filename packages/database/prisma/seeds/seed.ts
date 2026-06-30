import bcrypt from 'bcryptjs'
import { prisma } from '../../src/client'
import seedCategories from './categories'
import seedUser from './user'
import seedBusiness from './business'
import { seedCountries } from './country'
import seedStates from './state'
import seedCity from './city'
import { seedAreas } from './area'


async function main() {
  await seedUser()
  await seedCategories()
  await seedBusiness()
  await seedCountries()
  await seedStates()
  await seedCity()
  await seedAreas()
}

main()
  .catch((e) => {
    console.error('Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })