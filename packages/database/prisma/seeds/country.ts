import { prisma } from "../../src"

const countries = [
    { 
        name: 'India',
        flag: "https://flagsapi.com/IN/flat/64.png",
        country_code: '+91',
        iso_code: 'IN' 
    },
]

export async function seedCountries() {
    console.log('Seeding countries ...')

    for (const country of countries) {
        await prisma.country.upsert({
            where: { name: country.name },
            update: {},
            create: {
                name: country.name,
                flag: country.flag,
                iso_code: country.iso_code,
                country_code: country.country_code
            },
        });
    }

    console.log('Countries Done')
}