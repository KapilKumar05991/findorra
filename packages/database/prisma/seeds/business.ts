import { prisma } from "../../src"
import { WeekDay, MediaType } from "../../src"

export default async function seedBusiness() {
  console.log('Seeding businesses ...')

  // Find owner and reviewer users
  const owner = await prisma.user.findUnique({
    where: { email: 'kapilkumar@gmail.com' }
  })
  const reviewer = await prisma.user.findUnique({
    where: { email: 'test@gmail.com' }
  })

  if (!owner || !reviewer) {
    throw new Error('Owner or reviewer user not found. Run user seed first.')
  }

  // Get all categories
  const categories = await prisma.category.findMany()
  const categoryMap = new Map(categories.map(c => [c.slug, c.id]))

  // Define businesses
  const businessesToSeed = [
    {
      name: 'Bella Italia',
      slug: 'bella-italia',
      description: 'Bella Italia brings the true taste of Italy to the heart of Delhi. Enjoy our hand-rolled pastas, wood-fired pizzas, and a selection of fine Italian beverages in a cozy, rustic atmosphere.',
      tagline: 'Authentic wood-fired pizzas & fresh pasta',
      yoe: new Date('2018-05-10'),
      rating_avg: 4.8,
      rating_count: 1,
      primaryCategorySlug: 'food-dining',
      categories: ['food-dining', 'italian-restaurants'],
      location: {
        address: 'H-Block, Connaught Place',
        landmark: 'Near Rajiv Chowk Metro Gate 3',
        area: 'Connaught Place',
        city: 'New Delhi',
        state: 'Delhi',
        pincode: '110001',
        country: 'India',
        latitude: 28.6304,
        longitude: 77.2177
      },
      contact: {
        person: 'Giovanni Rossi',
        designation: 'Head Chef / Owner',
        phone: '9876543210',
        whatsapp: '9876543210',
        email: 'info@bellaitalia.in',
        website: 'https://bellaitalia.in',
        instagram: 'https://instagram.com/bellaitalia_delhi',
        facebook: 'https://facebook.com/bellaitaliadelhi'
      },
      hours: [
        { day: WeekDay.MONDAY, open: '11:00', close: '23:00', closed: false },
        { day: WeekDay.TUESDAY, open: '11:00', close: '23:00', closed: false },
        { day: WeekDay.WEDNESDAY, open: '11:00', close: '23:00', closed: false },
        { day: WeekDay.THURSDAY, open: '11:00', close: '23:00', closed: false },
        { day: WeekDay.FRIDAY, open: '11:00', close: '23:30', closed: false },
        { day: WeekDay.SATURDAY, open: '11:00', close: '23:30', closed: false },
        { day: WeekDay.SUNDAY, open: '11:00', close: '23:00', closed: false },
      ],
      amenities: [
        'AC',
        'Free Wi-Fi',
        'Valet Parking',
        'Outdoor Seating',
        'Vegetarian Friendly',
        'Card Payment'
      ],
      faqs: [
        {
          question: 'Do you offer gluten-free options?',
          answer: 'Yes, we offer gluten-free pasta and pizza crusts upon request.'
        },
        {
          question: 'Is reservation required?',
          answer: 'Walk-ins are welcome, but we highly recommend reservations for weekend dinners.'
        }
      ],
      media: [
        {
          type: MediaType.LOGO,
          url: 'https://images.unsplash.com/photo-1579751626657-72bc17010498?w=150&h=150&fit=crop&q=80',
          sort_order: 0
        },
        {
          type: MediaType.COVER,
          url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&h=400&fit=crop&q=80',
          sort_order: 1
        },
        {
          type: MediaType.PHOTO,
          url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=400&fit=crop&q=80',
          sort_order: 2
        }
      ],
      reviews: [
        {
          rating: 5,
          text: 'Absolutely the best Italian food in Delhi! The wood-fired pizza was crispy and full of flavor. The staff was incredibly welcoming and warm.'
        }
      ]
    },
    {
      name: 'The Grind Cafe',
      slug: 'the-grind-cafe',
      description: 'A modern, cozy space designed for coffee enthusiasts, remote workers, and foodies. Serving single-origin coffees, organic teas, and freshly baked pastries daily in the lively Hauz Khas Village.',
      tagline: 'Artisanal coffee & fresh healthy bites',
      yoe: new Date('2021-09-01'),
      rating_avg: 4.5,
      rating_count: 1,
      primaryCategorySlug: 'food-dining',
      categories: ['food-dining', 'cafes'],
      location: {
        address: '12, Hauz Khas Village',
        landmark: 'Near Deer Park entrance',
        area: 'Hauz Khas',
        city: 'South Delhi',
        state: 'Delhi',
        pincode: '110016',
        country: 'India',
        latitude: 28.5535,
        longitude: 77.1947
      },
      contact: {
        person: 'Aditya Sen',
        designation: 'Manager',
        phone: '9876543211',
        whatsapp: '9876543211',
        email: 'hello@thegrindcafe.com',
        website: 'https://thegrindcafe.com',
        instagram: 'https://instagram.com/thegrindcafe_delhi'
      },
      hours: [
        { day: WeekDay.MONDAY, open: '08:00', close: '21:00', closed: false },
        { day: WeekDay.TUESDAY, open: '08:00', close: '21:00', closed: false },
        { day: WeekDay.WEDNESDAY, open: '08:00', close: '21:00', closed: false },
        { day: WeekDay.THURSDAY, open: '08:00', close: '21:00', closed: false },
        { day: WeekDay.FRIDAY, open: '08:00', close: '21:00', closed: false },
        { day: WeekDay.SATURDAY, open: '08:00', close: '22:00', closed: false },
        { day: WeekDay.SUNDAY, open: '09:00', close: '18:00', closed: false },
      ],
      amenities: [
        'AC',
        'Free Wi-Fi',
        'Pet Friendly',
        'Power Outlets',
        'Card Payment',
        'Vegan Options'
      ],
      faqs: [
        {
          question: 'Is there parking available?',
          answer: 'There is municipal street parking and a public parking lot 2 minutes away from the cafe.'
        },
        {
          question: 'Do you offer dairy-free milk?',
          answer: 'Yes, we offer soy, almond, and oat milk options for all our hot and cold beverages.'
        }
      ],
      media: [
        {
          type: MediaType.LOGO,
          url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=150&h=150&fit=crop&q=80',
          sort_order: 0
        },
        {
          type: MediaType.COVER,
          url: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?w=1200&h=400&fit=crop&q=80',
          sort_order: 1
        }
      ],
      reviews: [
        {
          rating: 4,
          text: 'Great spot for working remotely. The pour-over coffee was outstanding, and the vibe is very chill. A bit crowded on weekends.'
        }
      ]
    },
    {
      name: 'Iron Temple Gym',
      slug: 'iron-temple-gym',
      description: 'State-of-the-art strength training and cardio equipment, certified personal trainers, and high-energy group classes including Zumba, Yoga, and HIIT. Start your fitness journey with us.',
      tagline: 'Unleash your inner strength',
      yoe: new Date('2020-01-15'),
      rating_avg: 5.0,
      rating_count: 1,
      primaryCategorySlug: 'health-wellness',
      categories: ['health-wellness', 'gyms-fitness-centers'],
      location: {
        address: 'Plot 45, Saket District Centre',
        landmark: 'Opposite Select CityWalk Mall',
        area: 'Saket',
        city: 'New Delhi',
        state: 'Delhi',
        pincode: '110017',
        country: 'India',
        latitude: 28.5283,
        longitude: 77.2193
      },
      contact: {
        person: 'Vikram Singh',
        designation: 'Head Trainer',
        phone: '9876543212',
        email: 'info@irontemple.in',
        website: 'https://irontemple.in'
      },
      hours: [
        { day: WeekDay.MONDAY, open: '05:00', close: '22:00', closed: false },
        { day: WeekDay.TUESDAY, open: '05:00', close: '22:00', closed: false },
        { day: WeekDay.WEDNESDAY, open: '05:00', close: '22:00', closed: false },
        { day: WeekDay.THURSDAY, open: '05:00', close: '22:00', closed: false },
        { day: WeekDay.FRIDAY, open: '05:00', close: '22:00', closed: false },
        { day: WeekDay.SATURDAY, open: '06:00', close: '20:00', closed: false },
        { day: WeekDay.SUNDAY, open: null, close: null, closed: true },
      ],
      amenities: [
        'AC',
        'Locker Room',
        'Showers',
        'Steam Room',
        'Parking Available',
        'Personal Training',
        'Juice Bar'
      ],
      faqs: [
        {
          question: 'Do you offer guest trial passes?',
          answer: 'Yes, local residents can request a 1-day free guest trial pass with valid ID proof.'
        },
        {
          question: 'Are fitness classes included in membership?',
          answer: 'Yes, all standard memberships include unlimited access to our scheduled group classes (Yoga, Zumba, HIIT).'
        }
      ],
      media: [
        {
          type: MediaType.LOGO,
          url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=150&h=150&fit=crop&q=80',
          sort_order: 0
        },
        {
          type: MediaType.COVER,
          url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=400&fit=crop&q=80',
          sort_order: 1
        }
      ],
      reviews: [
        {
          rating: 5,
          text: 'Incredible facility with highly professional staff. The equipment is always clean and well-maintained. The trainers actually help you!'
        }
      ]
    },
    {
      name: 'Apex IT Solutions',
      slug: 'apex-it-solutions',
      description: 'Providing comprehensive IT support, cloud migration, cybersecurity solutions, and custom software development services for small and medium-sized businesses.',
      tagline: 'Your trusted technology partner',
      yoe: new Date('2015-03-20'),
      rating_avg: 0,
      rating_count: 0,
      primaryCategorySlug: 'professional-services',
      categories: ['professional-services', 'it-support-consulting'],
      location: {
        address: '2nd Floor, Shankar Road',
        landmark: 'Near Rajendra Nagar Metro Station',
        area: 'Rajendra Nagar',
        city: 'Karol Bagh',
        state: 'Delhi',
        pincode: '110060',
        country: 'India',
        latitude: 28.6385,
        longitude: 77.1892
      },
      contact: {
        person: 'Rajesh Sharma',
        designation: 'Managing Director',
        phone: '9876543213',
        email: 'sales@apexit.co.in',
        website: 'https://apexit.co.in',
        linkedin: 'https://linkedin.com/company/apexit-solutions'
      },
      hours: [
        { day: WeekDay.MONDAY, open: '09:00', close: '18:00', closed: false },
        { day: WeekDay.TUESDAY, open: '09:00', close: '18:00', closed: false },
        { day: WeekDay.WEDNESDAY, open: '09:00', close: '18:00', closed: false },
        { day: WeekDay.THURSDAY, open: '09:00', close: '18:00', closed: false },
        { day: WeekDay.FRIDAY, open: '09:00', close: '18:00', closed: false },
        { day: WeekDay.SATURDAY, open: null, close: null, closed: true },
        { day: WeekDay.SUNDAY, open: null, close: null, closed: true },
      ],
      amenities: [
        'AC',
        'Conference Room',
        'Visitor Parking',
        'Video Conferencing',
        '24/7 Security'
      ],
      faqs: [
        {
          question: 'Do you offer 24/7 support contracts?',
          answer: 'Yes, we provide 24/7 technical helpdesk support options for premium SLA contracts.'
        }
      ],
      media: [
        {
          type: MediaType.LOGO,
          url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=150&h=150&fit=crop&q=80',
          sort_order: 0
        }
      ],
      reviews: []
    },
    {
      name: 'QuickFix Plumbers',
      slug: 'quickfix-plumbers',
      description: 'From leaky faucets to full bathroom installations, our certified plumbers provide fast, clean, and reliable services for residential and commercial properties in Delhi NCR.',
      tagline: 'Fast, reliable plumbing services',
      yoe: new Date('2019-11-12'),
      rating_avg: 4.0,
      rating_count: 1,
      primaryCategorySlug: 'home-services',
      categories: ['home-services', 'plumbers'],
      location: {
        address: 'Shop No. 4, Central Market',
        landmark: 'Opposite Lajpat Nagar Metro Gate 2',
        area: 'Lajpat Nagar',
        city: 'South Delhi',
        state: 'Delhi',
        pincode: '110024',
        country: 'India',
        latitude: 28.5684,
        longitude: 77.2443
      },
      contact: {
        person: 'Sunil Kumar',
        designation: 'Proprietor',
        phone: '9876543214',
        whatsapp: '9876543214',
        email: 'support@quickfixplumbers.in'
      },
      hours: [
        { day: WeekDay.MONDAY, open: '00:00', close: '23:59', closed: false },
        { day: WeekDay.TUESDAY, open: '00:00', close: '23:59', closed: false },
        { day: WeekDay.WEDNESDAY, open: '00:00', close: '23:59', closed: false },
        { day: WeekDay.THURSDAY, open: '00:00', close: '23:59', closed: false },
        { day: WeekDay.FRIDAY, open: '00:00', close: '23:59', closed: false },
        { day: WeekDay.SATURDAY, open: '00:00', close: '23:59', closed: false },
        { day: WeekDay.SUNDAY, open: '00:00', close: '23:59', closed: false },
      ],
      amenities: [
        '24/7 Service',
        'Emergency Response',
        'Licensed Plumbers',
        'Satisfaction Guarantee',
        'Online Invoicing'
      ],
      faqs: [
        {
          question: 'Do you charge a call-out or visit fee?',
          answer: 'We charge a nominal visit fee of INR 200 for inspection, which is fully waived if you approve the service and we perform the repair work.'
        },
        {
          question: 'Are your plumbers insured?',
          answer: 'Yes, all our professionals are certified, background-checked, and fully insured.'
        }
      ],
      media: [
        {
          type: MediaType.LOGO,
          url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=150&h=150&fit=crop&q=80',
          sort_order: 0
        }
      ],
      reviews: [
        {
          rating: 4,
          text: 'Arrived within 45 minutes of my call for a clogged pipe. Fixed it quickly and left the place clean. Good professional service.'
        }
      ]
    }
  ]

  for (const b of businessesToSeed) {
    // 1. Check if business exists by slug
    const existing = await prisma.business.findUnique({
      where: { slug: b.slug }
    })

    if (existing) {
      console.log(`Cleaning existing records for business: ${b.name}`)
      // Delete child records that don't cascade delete automatically
      await prisma.businessFAQ.deleteMany({ where: { business_id: existing.id } })
      await prisma.businessHour.deleteMany({ where: { business_id: existing.id } })
      await prisma.businessLead.deleteMany({ where: { business_id: existing.id } })
      await prisma.businessClaim.deleteMany({ where: { business_id: existing.id } })
      
      const subs = await prisma.subscription.findUnique({ where: { business_id: existing.id } })
      if (subs) {
        await prisma.payment.deleteMany({ where: { subscription_id: subs.id } })
        await prisma.subscription.delete({ where: { business_id: existing.id } })
      }
      
      await prisma.business.delete({ where: { id: existing.id } })
    }

    // 2. Create business
    await prisma.business.create({
      data: {
        owner_id: owner.id,
        name: b.name,
        slug: b.slug,
        description: b.description,
        tagline: b.tagline,
        yoe: b.yoe,
        status: 'ACTIVE',
        is_verified: true,
        rating_avg: b.rating_avg,
        rating_count: b.rating_count,
        location: {
          create: b.location
        },
        contact: {
          create: b.contact
        },
        categories: {
          create: b.categories.map(slug => {
            const catId = categoryMap.get(slug)
            if (!catId) {
              throw new Error(`Category not found for slug: ${slug}`)
            }
            return {
              category_id: catId,
              is_primary: slug === b.primaryCategorySlug
            }
          })
        },
        business_hours: {
          create: b.hours
        },
        faqs: {
          create: b.faqs
        },
        amentities: {
          create: b.amenities.map(name => ({ name }))
        },
        media: {
          create: b.media
        },
        reviews: {
          create: b.reviews.map(r => ({
            user_id: reviewer.id,
            rating: r.rating,
            text: r.text,
            status: 'PUBLISHED'
          }))
        }
      }
    })
  }

  console.log('Businesses Done')
}
