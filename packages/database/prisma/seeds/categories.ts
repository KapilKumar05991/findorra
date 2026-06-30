import { prisma } from "../../src"

interface CategorySeed {
  name: string
  slug: string
  icon_url?: string
  sort_order?: number
  children?: {
    name: string
    slug: string
    icon_url?: string
    sort_order?: number
  }[]
}

const categoriesData: CategorySeed[] = [
  {
    name: 'Food & Dining',
    slug: 'food-dining',
    icon_url: 'https://cdn-icons-png.flaticon.com/512/201/201426.png',
    sort_order: 1,
    children: [
      { name: 'Italian Restaurants', slug: 'italian-restaurants', icon_url: 'https://cdn-icons-png.flaticon.com/512/201/201426.png', sort_order: 1 },
      { name: 'Cafes', slug: 'cafes', icon_url: 'https://cdn-icons-png.flaticon.com/512/201/201426.png', sort_order: 2 },
      { name: 'Bakeries', slug: 'bakeries', icon_url: 'https://cdn-icons-png.flaticon.com/512/201/201426.png', sort_order: 3 },
      { name: 'Fast Food', slug: 'fast-food', icon_url: 'https://cdn-icons-png.flaticon.com/512/201/201426.png', sort_order: 4 },
    ],
  },
  {
    name: 'Health & Wellness',
    slug: 'health-wellness',
    icon_url: 'https://cdn-icons-png.flaticon.com/512/201/201426.png',
    sort_order: 2,
    children: [
      { name: 'Gyms & Fitness Centers', slug: 'gyms-fitness-centers', icon_url: 'https://cdn-icons-png.flaticon.com/512/201/201426.png', sort_order: 1 },
      { name: 'Spas & Salons', slug: 'spas-salons', icon_url: 'https://cdn-icons-png.flaticon.com/512/201/201426.png', sort_order: 2 },
      { name: 'Dental Clinics', slug: 'dental-clinics', icon_url: 'https://cdn-icons-png.flaticon.com/512/201/201426.png', sort_order: 3 },
      { name: 'Pharmacies', slug: 'pharmacies', icon_url: 'https://cdn-icons-png.flaticon.com/512/201/201426.png', sort_order: 4 },
    ],
  },
  {
    name: 'Professional Services',
    slug: 'professional-services',
    icon_url: 'https://cdn-icons-png.flaticon.com/512/201/201426.png',
    sort_order: 3,
    children: [
      { name: 'Legal Services', slug: 'legal-services', icon_url: 'https://cdn-icons-png.flaticon.com/512/201/201426.png', sort_order: 1 },
      { name: 'Accounting & Tax', slug: 'accounting-tax', icon_url: 'https://cdn-icons-png.flaticon.com/512/201/201426.png', sort_order: 2 },
      { name: 'IT Support & Consulting', slug: 'it-support-consulting', icon_url: 'https://cdn-icons-png.flaticon.com/512/201/201426.png', sort_order: 3 },
      { name: 'Real Estate Agencies', slug: 'real-estate-agencies', icon_url: 'https://cdn-icons-png.flaticon.com/512/201/201426.png', sort_order: 4 },
    ],
  },
  {
    name: 'Home Services',
    slug: 'home-services',
    icon_url: 'https://cdn-icons-png.flaticon.com/512/201/201426.png',
    sort_order: 4,
    children: [
      { name: 'Plumbers', slug: 'plumbers', icon_url: 'https://cdn-icons-png.flaticon.com/512/201/201426.png', sort_order: 1 },
      { name: 'Electricians', slug: 'electricians', icon_url: 'https://cdn-icons-png.flaticon.com/512/201/201426.png', sort_order: 2 },
      { name: 'House Cleaning', slug: 'house-cleaning', icon_url: 'https://cdn-icons-png.flaticon.com/512/201/201426.png', sort_order: 3 },
      { name: 'Pest Control', slug: 'pest-control', icon_url: 'https://cdn-icons-png.flaticon.com/512/201/201426.png', sort_order: 4 },
    ],
  },
  {
    name: 'Education',
    slug: 'education',
    icon_url: 'https://cdn-icons-png.flaticon.com/512/201/201426.png',
    sort_order: 5,
    children: [
      { name: 'Schools', slug: 'schools', icon_url: 'https://cdn-icons-png.flaticon.com/512/201/201426.png', sort_order: 1 },
      { name: 'Coaching Classes', slug: 'coaching-classes', icon_url: 'https://cdn-icons-png.flaticon.com/512/201/201426.png', sort_order: 2 },
      { name: 'Language Schools', slug: 'language-schools', icon_url: 'https://cdn-icons-png.flaticon.com/512/201/201426.png', sort_order: 3 },
    ],
  },
]

export default async function seedCategories() {
  console.log('Seeding categories ...')

  for (const parent of categoriesData) {
    const parentCategory = await prisma.category.upsert({
      where: { slug: parent.slug },
      update: {
        name: parent.name,
        icon_url: parent.icon_url,
        sort_order: parent.sort_order ?? 0,
      },
      create: {
        name: parent.name,
        slug: parent.slug,
        icon_url: parent.icon_url,
        sort_order: parent.sort_order ?? 0,
      },
    })

    if (parent.children) {
      for (const child of parent.children) {
        await prisma.category.upsert({
          where: { slug: child.slug },
          update: {
            name: child.name,
            icon_url: child.icon_url,
            sort_order: child.sort_order ?? 0,
            parent_id: parentCategory.id,
          },
          create: {
            name: child.name,
            slug: child.slug,
            icon_url: child.icon_url,
            sort_order: child.sort_order ?? 0,
            parent_id: parentCategory.id,
          },
        })
      }
    }
  }

  console.log('Categories Done')
}
