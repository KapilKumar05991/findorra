import { prisma } from "../../src/client"

const states = [
    { name: 'Andaman and Nicobar Islands' },
    { name: 'Andhra Pradesh' },
    { name: 'Arunachal Pradesh' },
    { name: 'Assam' },
    { name: 'Bihar' },
    { name: 'Chandigarh' },
    { name: 'Chhattisgarh' },
    { name: 'Dadra and Nagar Haveli and Daman and Diu' },
    { name: 'Delhi' },
    { name: 'Goa' },
    { name: 'Gujarat' },
    { name: 'Haryana' },
    { name: 'Himachal Pradesh' },
    { name: 'Jammu and Kashmir' },
    { name: 'Jharkhand' },
    { name: 'Karnataka' },
    { name: 'Kerala' },
    { name: 'Ladakh' },
    { name: 'Lakshadweep' },
    { name: 'Madhya Pradesh' },
    { name: 'Maharashtra' },
    { name: 'Manipur' },
    { name: 'Meghalaya' },
    { name: 'Mizoram' },
    { name: 'Nagaland' },
    { name: 'Odisha' },
    { name: 'Puducherry' },
    { name: 'Punjab' },
    { name: 'Rajasthan' },
    { name: 'Sikkim' },
    { name: 'Tamil Nadu' },
    { name: 'Telangana' },
    { name: 'Tripura' },
    { name: 'Uttar Pradesh' },
    { name: 'Uttarakhand' },
    { name: 'West Bengal' }
]

export default async function seedStates() {
    console.log('Seeding states ...')
    const country = await prisma.country.findFirst({
        where: {
            name: 'India'
        }
    })

    if (!country) {
        throw new Error("Country not found in seed states")
    }

    for (const state of states) {
        await prisma.state.upsert({
            where: { name: state.name },
            update: {},
            create: {
                name: state.name,
                country_id: country.id
            },
        });
    }
    console.log('States Done')

}