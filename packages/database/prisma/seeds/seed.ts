import bcrypt from 'bcryptjs'
import { prisma } from '../../src/client'
import seedCategories from './categories'


async function main() {
  console.log('🌱 Starting Findorra seed...')

  // ─────────────────────────────────────────────
  // 1. USERS
  // ─────────────────────────────────────────────

  console.log('👤 Seeding users...')

  const passwordHash = await bcrypt.hash('password123', 12)

  const superAdmin = await prisma.user.upsert({
    where: { email: 'super@findorra.com' },
    update: {},
    create: {
      email: 'super@findorra.com',
      password: passwordHash,
      name: 'Super Admin',
      role: 'SUPER',
      status: 'ACTIVE',
      is_email_verified: true,
      phone: '+919000000000',
    },
  })

  const admin = await prisma.user.upsert({
    where: { email: 'admin@findorra.com' },
    update: {},
    create: {
      email: 'admin@findorra.com',
      password: passwordHash,
      name: 'Admin User',
      role: 'ADMIN',
      status: 'ACTIVE',
      is_email_verified: true,
      phone: '+919000000001',
    },
  })

  const owner1 = await prisma.user.upsert({
    where: { email: 'rahul@example.com' },
    update: {},
    create: {
      email: 'rahul@example.com',
      password: passwordHash,
      name: 'Rahul Sharma',
      role: 'BUSINESS_OWNER',
      status: 'ACTIVE',
      is_email_verified: true,
      phone: '+919876543210',
    },
  })

  const owner2 = await prisma.user.upsert({
    where: { email: 'priya@example.com' },
    update: {},
    create: {
      email: 'priya@example.com',
      password: passwordHash,
      name: 'Priya Mehta',
      role: 'BUSINESS_OWNER',
      status: 'ACTIVE',
      is_email_verified: true,
      phone: '+919876543211',
    },
  })

  const owner3 = await prisma.user.upsert({
    where: { email: 'amit@example.com' },
    update: {},
    create: {
      email: 'amit@example.com',
      password: passwordHash,
      name: 'Amit Verma',
      role: 'BUSINESS_OWNER',
      status: 'ACTIVE',
      is_email_verified: true,
      phone: '+919876543212',
    },
  })

  const user1 = await prisma.user.upsert({
    where: { email: 'user1@example.com' },
    update: {},
    create: {
      email: 'user1@example.com',
      password: passwordHash,
      name: 'Sneha Gupta',
      role: 'USER',
      status: 'ACTIVE',
      is_email_verified: true,
      phone: '+919876543213',
    },
  })

  const user2 = await prisma.user.upsert({
    where: { email: 'user2@example.com' },
    update: {},
    create: {
      email: 'user2@example.com',
      password: passwordHash,
      name: 'Vikram Singh',
      role: 'USER',
      status: 'ACTIVE',
      is_email_verified: true,
      phone: '+919876543214',
    },
  })

  console.log('✅ Users seeded')
  
  await seedCategories()
  


  // ─────────────────────────────────────────────
  // 3. BUSINESSES
  // ─────────────────────────────────────────────

  console.log('🏢 Seeding businesses...')

  const business1 = await prisma.business.upsert({
    where: { slug: 'spice-garden-agra' },
    update: {},
    create: {
      owner_id: owner1.id,
      name: 'Spice Garden',
      slug: 'spice-garden-agra',
      description:
        'Authentic North Indian cuisine in the heart of Agra. Famous for our Dal Makhani, Butter Chicken and freshly baked Naan.',
      tagline: 'Where every meal tells a story',
      status: 'ACTIVE',
      is_verified: true,
      is_featured: true,
      business_hours: {
        mon: { open: '11:00', close: '23:00', closed: false },
        tue: { open: '11:00', close: '23:00', closed: false },
        wed: { open: '11:00', close: '23:00', closed: false },
        thu: { open: '11:00', close: '23:00', closed: false },
        fri: { open: '11:00', close: '23:30', closed: false },
        sat: { open: '11:00', close: '23:30', closed: false },
        sun: { open: '12:00', close: '22:00', closed: false },
      },
      rating_avg: 4.5,
      rating_count: 128,
      view_count: 3420,
      lead_count: 89,
      meta_title: 'Spice Garden — Best North Indian Restaurant in Agra',
      meta_description:
        'Visit Spice Garden for authentic North Indian food near Taj Mahal. Best Dal Makhani, Butter Chicken and Naan in Agra.',
      keywords: ['restaurant', 'north indian', 'agra', 'taj mahal', 'biryani'],
      location: {
        create: {
          address_line1: '12, MG Road',
          address_line2: 'Near Taj Mahal',
          landmark: 'Opposite HDFC Bank',
          area: 'Taj Ganj',
          city: 'Agra',
          state: 'Uttar Pradesh',
          pincode: '282001',
          latitude: 27.1751,
          longitude: 78.0421,
        },
      },
      contact: {
        create: {
          phone: '+911234567890',
          whatsapp: '+911234567890',
          email: 'info@spicegarden.com',
          website: 'https://spicegarden.com',
        },
      },
    },
  })

  const business2 = await prisma.business.upsert({
    where: { slug: 'dr-mehta-clinic-agra' },
    update: {},
    create: {
      owner_id: owner2.id,
      name: 'Dr. Mehta General Clinic',
      slug: 'dr-mehta-clinic-agra',
      description:
        'Trusted general physician clinic serving Agra for over 15 years. Specialising in diabetes, hypertension, and preventive care.',
      tagline: 'Your health, our priority',
      status: 'ACTIVE',
      is_verified: true,
      is_featured: false,
      business_hours: {
        mon: { open: '09:00', close: '13:00', closed: false },
        tue: { open: '09:00', close: '13:00', closed: false },
        wed: { open: '09:00', close: '13:00', closed: false },
        thu: { open: '09:00', close: '13:00', closed: false },
        fri: { open: '09:00', close: '13:00', closed: false },
        sat: { open: '09:00', close: '12:00', closed: false },
        sun: { open: '00:00', close: '00:00', closed: true },
      },
      rating_avg: 4.8,
      rating_count: 245,
      view_count: 5600,
      lead_count: 312,
      meta_title: 'Dr. Mehta General Clinic — Best Doctor in Agra',
      meta_description:
        'Consult Dr. Mehta for diabetes, hypertension and general health issues in Agra. 15+ years of trusted care.',
      keywords: ['doctor', 'clinic', 'general physician', 'agra', 'diabetes'],
      location: {
        create: {
          address_line1: '45, Civil Lines',
          landmark: 'Near Post Office',
          area: 'Civil Lines',
          city: 'Agra',
          state: 'Uttar Pradesh',
          pincode: '282002',
          latitude: 27.1959,
          longitude: 78.0053,
        },
      },
      contact: {
        create: {
          phone: '+911234567891',
          whatsapp: '+911234567891',
          email: 'drmehta@clinic.com',
        },
      },
    },
  })

  const business3 = await prisma.business.upsert({
    where: { slug: 'bright-future-academy-agra' },
    update: {},
    create: {
      owner_id: owner3.id,
      name: 'Bright Future Academy',
      slug: 'bright-future-academy-agra',
      description:
        'Leading coaching centre for JEE, NEET and board exams in Agra. Expert faculty, small batch sizes and proven results.',
      tagline: 'Your success is our mission',
      status: 'ACTIVE',
      is_verified: true,
      is_featured: true,
      business_hours: {
        mon: { open: '07:00', close: '20:00', closed: false },
        tue: { open: '07:00', close: '20:00', closed: false },
        wed: { open: '07:00', close: '20:00', closed: false },
        thu: { open: '07:00', close: '20:00', closed: false },
        fri: { open: '07:00', close: '20:00', closed: false },
        sat: { open: '07:00', close: '18:00', closed: false },
        sun: { open: '09:00', close: '13:00', closed: false },
      },
      rating_avg: 4.6,
      rating_count: 98,
      view_count: 2100,
      lead_count: 145,
      meta_title: 'Bright Future Academy — JEE NEET Coaching in Agra',
      meta_description:
        'Top coaching institute for JEE and NEET preparation in Agra. Experienced faculty and excellent results.',
      keywords: ['coaching', 'jee', 'neet', 'education', 'agra', 'tuition'],
      location: {
        create: {
          address_line1: '78, Sanjay Place',
          landmark: 'Above Axis Bank',
          area: 'Sanjay Place',
          city: 'Agra',
          state: 'Uttar Pradesh',
          pincode: '282002',
          latitude: 27.2046,
          longitude: 78.0105,
        },
      },
      contact: {
        create: {
          phone: '+911234567892',
          whatsapp: '+911234567892',
          email: 'info@brightfuture.edu',
          website: 'https://brightfutureacademy.in',
        },
      },
    },
  })

  const business4 = await prisma.business.upsert({
    where: { slug: 'grand-palace-hotel-agra' },
    update: {},
    create: {
      owner_id: owner1.id,
      name: 'Grand Palace Hotel',
      slug: 'grand-palace-hotel-agra',
      description:
        'Luxury hotel with Taj Mahal view rooms, rooftop restaurant and modern amenities. Perfect for tourists and business travellers.',
      tagline: 'Experience luxury near the Taj',
      status: 'ACTIVE',
      is_verified: true,
      is_featured: true,
      business_hours: {
        mon: { open: '00:00', close: '23:59', closed: false },
        tue: { open: '00:00', close: '23:59', closed: false },
        wed: { open: '00:00', close: '23:59', closed: false },
        thu: { open: '00:00', close: '23:59', closed: false },
        fri: { open: '00:00', close: '23:59', closed: false },
        sat: { open: '00:00', close: '23:59', closed: false },
        sun: { open: '00:00', close: '23:59', closed: false },
      },
      rating_avg: 4.3,
      rating_count: 312,
      view_count: 8900,
      lead_count: 560,
      meta_title: 'Grand Palace Hotel — Luxury Hotel in Agra with Taj View',
      meta_description:
        'Stay at Grand Palace Hotel in Agra for Taj Mahal views, fine dining and luxury amenities at competitive prices.',
      keywords: ['hotel', 'luxury', 'agra', 'taj mahal', 'resort', 'stay'],
      location: {
        create: {
          address_line1: '5, Fatehabad Road',
          landmark: 'Opposite Agra Gate',
          area: 'Fatehabad Road',
          city: 'Agra',
          state: 'Uttar Pradesh',
          pincode: '282001',
          latitude: 27.1594,
          longitude: 78.0506,
        },
      },
      contact: {
        create: {
          phone: '+911234567893',
          whatsapp: '+911234567893',
          email: 'reservations@grandpalace.com',
          website: 'https://grandpalaceagra.com',
        },
      },
    },
  })

  const business5 = await prisma.business.upsert({
    where: { slug: 'quick-fix-services-agra' },
    update: {},
    create: {
      owner_id: owner2.id,
      name: 'Quick Fix Home Services',
      slug: 'quick-fix-services-agra',
      description:
        'Professional home repair and maintenance services in Agra. Plumbing, electrical, carpentry and appliance repair — all under one roof.',
      tagline: 'Fast, reliable, affordable',
      status: 'ACTIVE',
      is_verified: false,
      is_featured: false,
      business_hours: {
        mon: { open: '08:00', close: '20:00', closed: false },
        tue: { open: '08:00', close: '20:00', closed: false },
        wed: { open: '08:00', close: '20:00', closed: false },
        thu: { open: '08:00', close: '20:00', closed: false },
        fri: { open: '08:00', close: '20:00', closed: false },
        sat: { open: '08:00', close: '18:00', closed: false },
        sun: { open: '00:00', close: '00:00', closed: true },
      },
      rating_avg: 4.1,
      rating_count: 67,
      view_count: 1230,
      lead_count: 98,
      keywords: ['plumber', 'electrician', 'repair', 'home services', 'agra'],
      location: {
        create: {
          address_line1: '23, Belanganj',
          area: 'Belanganj',
          city: 'Agra',
          state: 'Uttar Pradesh',
          pincode: '282004',
          latitude: 27.1826,
          longitude: 78.0115,
        },
      },
      contact: {
        create: {
          phone: '+911234567894',
          whatsapp: '+911234567894',
          email: 'quickfix@services.com',
        },
      },
    },
  })

  console.log('✅ Businesses seeded')

  // ─────────────────────────────────────────────
  // 4. BUSINESS CATEGORIES (junction)
  // ─────────────────────────────────────────────

  console.log('🔗 Linking business categories...')

  await prisma.businessCategory.upsert({
    where: {
      business_id_category_id: {
        business_id: business1.id,
        category_id: catRestaurants.id,
      },
    },
    update: {},
    create: {
      business_id: business1.id,
      category_id: catRestaurants.id,
      is_primary: true,
    },
  })

  await prisma.businessCategory.upsert({
    where: {
      business_id_category_id: {
        business_id: business1.id,
        category_id: catNorthIndian.id,
      },
    },
    update: {},
    create: {
      business_id: business1.id,
      category_id: catNorthIndian.id,
      is_primary: false,
    },
  })

  await prisma.businessCategory.upsert({
    where: {
      business_id_category_id: {
        business_id: business2.id,
        category_id: catHealthcare.id,
      },
    },
    update: {},
    create: {
      business_id: business2.id,
      category_id: catHealthcare.id,
      is_primary: true,
    },
  })

  await prisma.businessCategory.upsert({
    where: {
      business_id_category_id: {
        business_id: business2.id,
        category_id: catClinics.id,
      },
    },
    update: {},
    create: {
      business_id: business2.id,
      category_id: catClinics.id,
      is_primary: false,
    },
  })

  await prisma.businessCategory.upsert({
    where: {
      business_id_category_id: {
        business_id: business3.id,
        category_id: catEducation.id,
      },
    },
    update: {},
    create: {
      business_id: business3.id,
      category_id: catEducation.id,
      is_primary: true,
    },
  })

  await prisma.businessCategory.upsert({
    where: {
      business_id_category_id: {
        business_id: business4.id,
        category_id: catHotels.id,
      },
    },
    update: {},
    create: {
      business_id: business4.id,
      category_id: catHotels.id,
      is_primary: true,
    },
  })

  await prisma.businessCategory.upsert({
    where: {
      business_id_category_id: {
        business_id: business5.id,
        category_id: catServices.id,
      },
    },
    update: {},
    create: {
      business_id: business5.id,
      category_id: catServices.id,
      is_primary: true,
    },
  })

  console.log('✅ Business categories linked')

  // ─────────────────────────────────────────────
  // 5. BUSINESS ATTRIBUTES
  // ─────────────────────────────────────────────

  console.log('🏷️  Seeding business attributes...')

  const restaurantAttributes = [
    { key: 'Cuisine', value: 'North Indian, Mughlai' },
    { key: 'Seating Capacity', value: '80 covers' },
    { key: 'WiFi', value: 'Yes' },
    { key: 'Parking', value: 'Valet available' },
    { key: 'Air Conditioning', value: 'Yes' },
    { key: 'Home Delivery', value: 'Yes' },
    { key: 'Accepts Cards', value: 'Yes' },
    { key: 'Outdoor Seating', value: 'Yes' },
  ]

  for (const attr of restaurantAttributes) {
    await prisma.businessAttribute.upsert({
      where: {
        business_id_key: { business_id: business1.id, key: attr.key },
      },
      update: {},
      create: { business_id: business1.id, ...attr },
    })
  }

  const clinicAttributes = [
    { key: 'Specialisation', value: 'General Physician' },
    { key: 'Experience', value: '15+ years' },
    { key: 'Consultation Fee', value: '₹300' },
    { key: 'Appointment Required', value: 'Preferred' },
    { key: 'Home Visits', value: 'Yes' },
    { key: 'Online Consultation', value: 'Yes' },
    { key: 'Languages', value: 'Hindi, English' },
  ]

  for (const attr of clinicAttributes) {
    await prisma.businessAttribute.upsert({
      where: {
        business_id_key: { business_id: business2.id, key: attr.key },
      },
      update: {},
      create: { business_id: business2.id, ...attr },
    })
  }

  const hotelAttributes = [
    { key: 'Room Types', value: 'Standard, Deluxe, Suite' },
    { key: 'Starting Price', value: '₹2,500/night' },
    { key: 'WiFi', value: 'Free in all rooms' },
    { key: 'Swimming Pool', value: 'Yes' },
    { key: 'Restaurant', value: 'Yes — rooftop dining' },
    { key: 'Parking', value: 'Free' },
    { key: 'Airport Shuttle', value: 'Yes' },
    { key: 'Room Service', value: '24/7' },
    { key: 'Check-in', value: '12:00 PM' },
    { key: 'Check-out', value: '11:00 AM' },
  ]

  for (const attr of hotelAttributes) {
    await prisma.businessAttribute.upsert({
      where: {
        business_id_key: { business_id: business4.id, key: attr.key },
      },
      update: {},
      create: { business_id: business4.id, ...attr },
    })
  }

  console.log('✅ Business attributes seeded')

  // ─────────────────────────────────────────────
  // 5b. BUSINESS FAQs
  // ─────────────────────────────────────────────

  console.log('❓ Seeding FAQs...')

  await prisma.businessFAQ.createMany({
    data: [
      // Spice Garden
      { business_id: business1.id, question: 'Do you accept table reservations?', answer: 'Yes, we accept reservations for groups of 4 or more. Call or WhatsApp us to book in advance, especially on weekends.' },
      { business_id: business1.id, question: 'Do you offer home delivery?', answer: 'Yes, we deliver within a 5 km radius. You can also order through Swiggy and Zomato.' },
      { business_id: business1.id, question: 'Is parking available?', answer: 'Yes, complimentary valet parking is available for all dine-in guests.' },
      { business_id: business1.id, question: 'Do you have Jain or vegan options?', answer: 'Yes, we have a dedicated Jain menu (no onion, no garlic) and several vegan dishes available on request.' },

      // Dr. Mehta Clinic
      { business_id: business2.id, question: 'Is prior appointment required?', answer: 'Appointments are preferred to reduce waiting time, but walk-ins are welcome during clinic hours.' },
      { business_id: business2.id, question: 'What is the consultation fee?', answer: 'The consultation fee is ₹300. Follow-up consultations within 7 days are charged ₹150.' },
      { business_id: business2.id, question: 'Are online consultations available?', answer: 'Yes, video consultations are available. Please call or WhatsApp us to schedule a slot.' },
      { business_id: business2.id, question: 'Which insurance plans are accepted?', answer: 'We accept Star Health, HDFC Ergo, and government schemes including Ayushman Bharat.' },

      // Bright Future Academy
      { business_id: business3.id, question: 'Which exams do you coach for?', answer: 'We offer coaching for JEE Mains, JEE Advanced, NEET UG, and Class 10–12 board exams (CBSE & UP Board).' },
      { business_id: business3.id, question: 'What is the batch size?', answer: 'We maintain small batches of 20–25 students to ensure personalised attention.' },
      { business_id: business3.id, question: 'Do you offer demo classes?', answer: 'Yes, 2 free demo classes are available before enrolment.' },
      { business_id: business3.id, question: 'Are study materials included?', answer: 'Yes, study materials, practice papers, and mock tests are all included in the course fee.' },

      // Grand Palace Hotel
      { business_id: business4.id, question: 'What are the check-in and check-out times?', answer: 'Check-in is at 12:00 PM and check-out at 11:00 AM. Early/late options available subject to availability.' },
      { business_id: business4.id, question: 'Do all rooms have a Taj Mahal view?', answer: 'Deluxe and Suite rooms offer direct Taj views. Standard rooms have a garden view.' },
      { business_id: business4.id, question: 'Is breakfast included?', answer: 'Complimentary for Deluxe and Suite bookings. Can be added for Standard rooms at ₹350 per person.' },
      { business_id: business4.id, question: 'Do you provide airport or station transfers?', answer: 'Yes, paid transfers from Agra Cantonment and Agra Airport are available. Inform us 24 hours in advance.' },

      // Quick Fix Home Services
      { business_id: business5.id, question: 'What services do you offer?', answer: 'Plumbing, electrical, carpentry, appliance repair (AC, washing machine, refrigerator), painting, and general home maintenance.' },
      { business_id: business5.id, question: 'How quickly can a technician arrive?', answer: 'Standard bookings within 4 hours. Urgent same-day service within 2 hours is available at an extra charge.' },
      { business_id: business5.id, question: 'Do you provide a service warranty?', answer: 'Yes, all repairs include a 30-day warranty. If the issue recurs we fix it at no extra cost.' },
    ],
  })

  console.log('✅ FAQs seeded')

  // ─────────────────────────────────────────────
  // 6. MEDIA
  // ─────────────────────────────────────────────

  console.log('🖼️  Seeding media...')

  await prisma.businessMedia.createMany({
    skipDuplicates: true,
    data: [
      {
        business_id: business1.id,
        type: 'COVER',
        url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200',
        thumbnail_url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400',
        caption: 'Interior view of Spice Garden',
        sort_order: 0,
      },
      {
        business_id: business1.id,
        type: 'PHOTO',
        url: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1200',
        thumbnail_url: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400',
        caption: 'Dal Makhani — our signature dish',
        sort_order: 1,
      },
      {
        business_id: business1.id,
        type: 'PHOTO',
        url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=1200',
        thumbnail_url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400',
        caption: 'Fresh tandoori platter',
        sort_order: 2,
      },
      {
        business_id: business2.id,
        type: 'COVER',
        url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200',
        thumbnail_url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400',
        caption: 'Dr. Mehta General Clinic',
        sort_order: 0,
      },
      {
        business_id: business3.id,
        type: 'COVER',
        url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200',
        thumbnail_url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400',
        caption: 'Bright Future Academy classrooms',
        sort_order: 0,
      },
      {
        business_id: business4.id,
        type: 'COVER',
        url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200',
        thumbnail_url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
        caption: 'Grand Palace Hotel exterior',
        sort_order: 0,
      },
      {
        business_id: business4.id,
        type: 'PHOTO',
        url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200',
        thumbnail_url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400',
        caption: 'Deluxe room with Taj view',
        sort_order: 1,
      },
    ],
  })

  console.log('✅ Media seeded')

  // ─────────────────────────────────────────────
  // 7. SUBSCRIPTIONS
  // ─────────────────────────────────────────────

  console.log('💳 Seeding subscriptions...')

  await prisma.subscription.upsert({
    where: { business_id: business1.id },
    update: {},
    create: {
      business_id: business1.id,
      plan: 'PRO',
      status: 'ACTIVE',
      current_period_start: new Date(),
      current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  })

  await prisma.subscription.upsert({
    where: { business_id: business2.id },
    update: {},
    create: {
      business_id: business2.id,
      plan: 'STARTER',
      status: 'ACTIVE',
      current_period_start: new Date(),
      current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  })

  await prisma.subscription.upsert({
    where: { business_id: business3.id },
    update: {},
    create: {
      business_id: business3.id,
      plan: 'PRO',
      status: 'ACTIVE',
      current_period_start: new Date(),
      current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  })

  await prisma.subscription.upsert({
    where: { business_id: business4.id },
    update: {},
    create: {
      business_id: business4.id,
      plan: 'ENTERPRISE',
      status: 'ACTIVE',
      current_period_start: new Date(),
      current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  })

  await prisma.subscription.upsert({
    where: { business_id: business5.id },
    update: {},
    create: {
      business_id: business5.id,
      plan: 'FREE',
      status: 'ACTIVE',
      current_period_start: new Date(),
      current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  })

  console.log('✅ Subscriptions seeded')

  // ─────────────────────────────────────────────
  // 8. REVIEWS
  // ─────────────────────────────────────────────

  console.log('⭐ Seeding reviews...')

  await prisma.review.upsert({
    where: {
      business_id_user_id: {
        business_id: business1.id,
        user_id: user1.id,
      },
    },
    update: {},
    create: {
      business_id: business1.id,
      user_id: user1.id,
      rating: 5,
      title: 'Best biryani in Agra!',
      body: 'Absolutely loved the food here. The Dal Makhani was creamy and the naan was perfectly baked. Staff was friendly and the ambiance was great. Will definitely come back!',
      status: 'PUBLISHED',
      helpful_count: 12,
      owner_reply:
        'Thank you so much Sneha! We are delighted you enjoyed your experience at Spice Garden. We look forward to welcoming you again!',
      owner_replied_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
  })

  await prisma.review.upsert({
    where: {
      business_id_user_id: {
        business_id: business1.id,
        user_id: user2.id,
      },
    },
    update: {},
    create: {
      business_id: business1.id,
      user_id: user2.id,
      rating: 4,
      title: 'Great food, slightly slow service',
      body: 'Food quality is excellent. The butter chicken and tandoori roti were amazing. Service was a bit slow during peak hours but the food made up for it.',
      status: 'PUBLISHED',
      helpful_count: 7,
    },
  })

  await prisma.review.upsert({
    where: {
      business_id_user_id: {
        business_id: business2.id,
        user_id: user1.id,
      },
    },
    update: {},
    create: {
      business_id: business2.id,
      user_id: user1.id,
      rating: 5,
      title: 'Very knowledgeable and caring doctor',
      body: 'Dr. Mehta took his time to understand my health concerns. Very thorough examination and clear explanation of the diagnosis. Highly recommend for anyone looking for a reliable GP in Agra.',
      status: 'PUBLISHED',
      helpful_count: 23,
      owner_reply:
        'Thank you for your kind words! We are committed to providing the best care to all our patients.',
      owner_replied_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    },
  })

  await prisma.review.upsert({
    where: {
      business_id_user_id: {
        business_id: business4.id,
        user_id: user2.id,
      },
    },
    update: {},
    create: {
      business_id: business4.id,
      user_id: user2.id,
      rating: 4,
      title: 'Wonderful Taj view from the rooftop',
      body: 'Stayed for 3 nights. The room was clean and well-maintained. The rooftop restaurant has a stunning view of the Taj Mahal at sunrise. Breakfast was excellent. Would stay again.',
      status: 'PUBLISHED',
      helpful_count: 18,
    },
  })

  console.log('✅ Reviews seeded')

  // ─────────────────────────────────────────────
  // 9. LEADS
  // ─────────────────────────────────────────────

  console.log('📋 Seeding leads...')

  await prisma.lead.createMany({
    skipDuplicates: true,
    data: [
      {
        business_id: business1.id,
        user_id: user1.id,
        name: 'Sneha Gupta',
        phone: '+919876543213',
        email: 'user1@example.com',
        message: 'Would like to book a table for 6 people this Saturday evening.',
        status: 'CONVERTED',
        source: 'profile',
      },
      {
        business_id: business2.id,
        user_id: user2.id,
        name: 'Vikram Singh',
        phone: '+919876543214',
        email: 'user2@example.com',
        message: 'Need an appointment for a routine health checkup.',
        status: 'CONTACTED',
        source: 'search',
      },
      {
        business_id: business4.id,
        name: 'Rohan Kapoor',
        phone: '+919812345678',
        email: 'rohan@example.com',
        message: 'Looking for a room for 2 nights from 15th to 17th. Need Taj view room.',
        status: 'NEW',
        source: 'search',
      },
      {
        business_id: business3.id,
        name: 'Anita Sharma',
        phone: '+919823456789',
        message: 'Interested in JEE coaching for my son. Please share fee structure.',
        status: 'NEW',
        source: 'profile',
      },
    ],
  })

  console.log('✅ Leads seeded')

  // ─────────────────────────────────────────────
  // 10. BOOKINGS
  // ─────────────────────────────────────────────

  console.log('📅 Seeding bookings...')

  await prisma.booking.createMany({
    skipDuplicates: true,
    data: [
      {
        business_id: business2.id,
        user_id: user1.id,
        service_name: 'General Consultation',
        scheduled_at: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        duration_mins: 30,
        status: 'CONFIRMED',
        notes: 'Follow-up for diabetes management',
        amount: 30000,
      },
      {
        business_id: business2.id,
        user_id: user2.id,
        service_name: 'Health Checkup',
        scheduled_at: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        duration_mins: 45,
        status: 'PENDING',
        amount: 50000,
      },
    ],
  })

  console.log('✅ Bookings seeded')

  // ─────────────────────────────────────────────
  // 11. SAVED BUSINESSES
  // ─────────────────────────────────────────────

  console.log('❤️  Seeding saved businesses...')

  await prisma.savedBusiness.createMany({
    skipDuplicates: true,
    data: [
      { user_id: user1.id, business_id: business1.id },
      { user_id: user1.id, business_id: business4.id },
      { user_id: user2.id, business_id: business2.id },
      { user_id: user2.id, business_id: business3.id },
    ],
  })

  console.log('✅ Saved businesses seeded')

  // ─────────────────────────────────────────────
  // 12. NOTIFICATIONS
  // ─────────────────────────────────────────────

  console.log('🔔 Seeding notifications...')

  await prisma.notification.createMany({
    skipDuplicates: true,
    data: [
      {
        user_id: owner1.id,
        title: 'New lead received',
        body: 'Sneha Gupta is interested in booking a table at Spice Garden.',
        type: 'lead',
        data: { business_id: business1.id, lead_name: 'Sneha Gupta' },
      },
      {
        user_id: owner1.id,
        title: 'New review posted',
        body: 'Sneha Gupta left a 5-star review for Spice Garden.',
        type: 'new_review',
        data: { business_id: business1.id, rating: 5 },
      },
      {
        user_id: owner2.id,
        title: 'Booking confirmed',
        body: 'Sneha Gupta has booked a General Consultation for tomorrow.',
        type: 'booking_confirmed',
        data: { business_id: business2.id },
      },
      {
        user_id: user1.id,
        title: 'Booking confirmed',
        body: 'Your appointment at Dr. Mehta General Clinic is confirmed.',
        type: 'booking_confirmed',
        data: { business_id: business2.id },
      },
    ],
  })

  console.log('✅ Notifications seeded')

  // ─────────────────────────────────────────────
  // 13. ANALYTICS EVENTS
  // ─────────────────────────────────────────────

  console.log('📊 Seeding analytics events...')

  await prisma.analyticsEvent.createMany({
    skipDuplicates: true,
    data: [
      {
        business_id: business1.id,
        event_type: 'view',
        user_id: user1.id,
        session_id: 'sess_001',
        metadata: { source: 'search', query: 'restaurant agra' },
      },
      {
        business_id: business1.id,
        event_type: 'call_click',
        user_id: user1.id,
        session_id: 'sess_001',
        metadata: { source: 'profile' },
      },
      {
        business_id: business1.id,
        event_type: 'whatsapp_click',
        user_id: user2.id,
        session_id: 'sess_002',
        metadata: { source: 'profile' },
      },
      {
        business_id: business2.id,
        event_type: 'view',
        user_id: user1.id,
        session_id: 'sess_003',
        metadata: { source: 'search', query: 'doctor agra' },
      },
      {
        business_id: business2.id,
        event_type: 'direction_click',
        user_id: user2.id,
        session_id: 'sess_004',
        metadata: { source: 'profile' },
      },
      {
        business_id: business4.id,
        event_type: 'view',
        session_id: 'sess_005',
        metadata: { source: 'search', query: 'hotel agra taj view' },
      },
      {
        business_id: business4.id,
        event_type: 'website_click',
        session_id: 'sess_005',
        metadata: { source: 'profile' },
      },
    ],
  })

  console.log('✅ Analytics events seeded')

  // ─────────────────────────────────────────────
  // DONE
  // ─────────────────────────────────────────────

  console.log(`
╔══════════════════════════════════════════╗
║   🌱 Findorra seed complete!             ║
╠══════════════════════════════════════════╣
║  Users          7  (1 super, 1 admin,    ║
║                     3 owners, 2 users)   ║
║  Categories    12  (8 root, 4 sub)       ║
║  Businesses     5  (Agra)                ║
║  Reviews        4                        ║
║  Leads          4                        ║
║  Bookings       2                        ║
║  Subscriptions  5                        ║
║  Media          7                        ║
║  Notifications  4                        ║
║  Analytics      7                        ║
║  FAQs           19                       ║
╚══════════════════════════════════════════╝
  `)
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })