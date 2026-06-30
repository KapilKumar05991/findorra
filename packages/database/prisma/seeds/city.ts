import { prisma } from "../../src/client"

const delhiCities = [
    "Delhi",
    "New Delhi",
    "Alipur",
    "Bawana",
    "Central Delhi",
    "Deoli",
    "East Delhi",
    "Karol Bagh",
    "Najafgarh",
    "Nangloi Jat",
    "North Delhi",
    "North East Delhi",
    "North West Delhi",
    "Rohini",
    "South Delhi",
    "South West Delhi",
    "West Delhi"
]

export default async function seedCity() {
    console.log('Seeding cities ...')
    
    const state = await prisma.state.findUnique({
        where: {
            name: 'Delhi'
        }
    })

    if (!state) {
        throw new Error("State 'Delhi' not found in seed cities")
    }

    for (const cityName of delhiCities) {
        await prisma.city.upsert({
            where: { name: cityName },
            update: {},
            create: {
                name: cityName,
                state_id: state.id
            },
        });
    }

    console.log('Cities Done')
}
