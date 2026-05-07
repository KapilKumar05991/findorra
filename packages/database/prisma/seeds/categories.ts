import { prisma } from "../../src/index";

const categories = [
    {
        name: "Restaurants",
        slug: "restaurant",
        children: ["Indian", "Chinese", "Fast Food", "Cafes", "Bars"]
    },
    {
        name: "Healthcare",
        slug: "healthcare",
        children: ["Hospitals", "Clinics", "Pharmacies", "Labs", "Dentists", "Physicians", "Pathology Labs", "Veterinary Clinics"]
    },
    {
        name: "Education",
        slug: "education",
        children: ["Schools", "Colleges", "Coaching Centres", "Tutors", "Universities", "Institutes", "Tuition Centres"]
    },
    {
        name: "Shopping",
        slug: "shopping",
        children: ["Groceries", "Retail Stores", "Malls", "Online Shops", "Electronics", "Clothing", "Jwellery"]
    },
    {
        name: "Hotels",
        slug: "hotels",
        children: ["Resorts", "Guesthouses", "Homestays", "Paying Guest"]
    },
    {
        name: "Services",
        slug: "services",
        children: ["Plumbers", "Electricians", "Carpenters", "AC Services", "Home Services", "Repairs", "Cleaning"]
    },
    {
        name: "Real Estate",
        slug: "real-estate",
        children: ["Property Dealers", "Agents", "Builders"]
    },
    {
        name: "Automobile",
        slug: "automobile",
        children: ["Car Dealers", "Service Centres", "Spare Parts"]
    },
]

export default async function seedCategories() {
    console.log("Seeding Categories...")

    for (const cat of categories) {
        const parent = await prisma.category.upsert({
            where: { slug: cat.slug },
            update: {},
            create: { name: cat.name, slug: cat.slug },
        });

        for (const child of cat.children) {
            const childSlug = `${child.toLowerCase().replace(/\s+/g, "-")}`;
            await prisma.category.upsert({
                where: { slug: childSlug },
                update: {},
                create: { name: child, slug: childSlug, parent_id: parent.id, sort_order: 1 },
            });
        }
    }

    console.log("✅ Categories seeded");
}

seedCategories()