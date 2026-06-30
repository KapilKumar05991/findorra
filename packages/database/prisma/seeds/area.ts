import { prisma } from "../../src/client"

const cityAreas: { [cityName: string]: { name: string; pincode: string }[] } = {
    "Delhi": [
        { name: "Chandni Chowk", pincode: "110006" },
        { name: "Daryaganj", pincode: "110002" },
        { name: "Paharganj", pincode: "110055" }
    ],
    "New Delhi": [
        { name: "Connaught Place", pincode: "110001" },
        { name: "Chanakyapuri", pincode: "110021" },
        { name: "Vasant Kunj", pincode: "110070" },
        { name: "Lodhi Colony", pincode: "110003" },
        { name: "Greater Kailash", pincode: "110048" },
        { name: "Saket", pincode: "110017" }
    ],
    "Karol Bagh": [
        { name: "Rajendra Nagar", pincode: "110060" },
        { name: "Patel Nagar", pincode: "110008" },
        { name: "Prasad Nagar", pincode: "110005" }
    ],
    "Rohini": [
        { name: "Rohini Sector 3", pincode: "110085" },
        { name: "Rohini Sector 7", pincode: "110085" },
        { name: "Rohini Sector 11", pincode: "110085" },
        { name: "Rohini Sector 15", pincode: "110089" }
    ],
    "South Delhi": [
        { name: "Hauz Khas", pincode: "110016" },
        { name: "Green Park", pincode: "110016" },
        { name: "Kalkaji", pincode: "110019" },
        { name: "Lajpat Nagar", pincode: "110024" },
        { name: "Defence Colony", pincode: "110024" }
    ],
    "West Delhi": [
        { name: "Rajouri Garden", pincode: "110027" },
        { name: "Punjabi Bagh", pincode: "110026" },
        { name: "Janakpuri", pincode: "110058" },
        { name: "Tilak Nagar", pincode: "110018" }
    ],
    "North Delhi": [
        { name: "Civil Lines", pincode: "110054" },
        { name: "Model Town", pincode: "110009" },
        { name: "GTB Nagar", pincode: "110009" }
    ],
    "East Delhi": [
        { name: "Preet Vihar", pincode: "110092" },
        { name: "Laxmi Nagar", pincode: "110092" },
        { name: "Mayur Vihar", pincode: "110091" }
    ],
    "South West Delhi": [
        { name: "Dwarka Sector 6", pincode: "110075" },
        { name: "Dwarka Sector 10", pincode: "110075" },
        { name: "Dwarka Sector 22", pincode: "110077" }
    ],
    "North West Delhi": [
        { name: "Pitampura", pincode: "110034" },
        { name: "Shalimar Bagh", pincode: "110088" }
    ],
    "Najafgarh": [
        { name: "Najafgarh Extension", pincode: "110043" },
        { name: "Prem Nagar", pincode: "110043" }
    ],
    "Bawana": [
        { name: "Bawana Industrial Area", pincode: "110039" },
        { name: "Bawana Village", pincode: "110039" }
    ],
    "Alipur": [
        { name: "Alipur Village", pincode: "110036" },
        { name: "Narela", pincode: "110040" }
    ],
    "Deoli": [
        { name: "Deoli Village", pincode: "110062" },
        { name: "Sangam Vihar", pincode: "110062" }
    ],
    "Nangloi Jat": [
        { name: "Nangloi Extension", pincode: "110041" },
        { name: "Sultanpuri", pincode: "110086" }
    ],
    "North East Delhi": [
        { name: "Shahdara", pincode: "110032" },
        { name: "Dilshad Garden", pincode: "110095" }
    ]
}

export async function seedAreas() {
    console.log('Seeding areas ...')
    
    for (const [cityName, areas] of Object.entries(cityAreas)) {
        const city = await prisma.city.findUnique({
            where: { name: cityName }
        })

        if (!city) {
            console.warn(`City '${cityName}' not found during area seeding. Skipping...`)
            continue
        }

        for (const area of areas) {
            const existing = await prisma.area.findFirst({
                where: {
                    name: area.name,
                    city_id: city.id
                }
            })

            if (!existing) {
                await prisma.area.create({
                    data: {
                        name: area.name,
                        pincode: area.pincode,
                        city_id: city.id
                    }
                })
            }
        }
    }

    console.log('Areas Done')
}