import { Appointment, BlogPost, Review, Service, UserClient } from '../types';

export const INITIAL_SERVICES: Service[] = [
  {
    id: 'srv-kundli-online',
    title: 'Kundli Reading (Online)',
    hindiTitle: 'जन्म कुण्डली परामर्श (ऑनलाइन)',
    category: 'kundli',
    price: 1000,
    originalPrice: 1500,
    durationMinutes: 45,
    shortDescription: 'In-depth birth chart examination via high-definition video call or phone from anywhere in the world.',
    fullDescription: 'Comprehensive personal consultation with Mata Sri Poornima. Thorough analysis covering your 12 Bhavas, planetary yogas, Vimshottari Mahadasha timeline, career, marriage, health, and personalized remedial measures.',
    features: [
      '1-on-1 direct session with Mata Sri Poornima',
      'Authentic Parashari & Jaimini calculation',
      'Life potentials & major yogas audit',
      'Vimshottari Mahadasha timeline & remedies',
      'Digital Janam Kundli summary & remedies guide'
    ],
    iconName: 'Compass',
    active: true,
    popular: true,
  },
  {
    id: 'srv-kundli-offline',
    title: 'Kundli Reading (Offline)',
    hindiTitle: 'जन्म कुण्डली परामर्श (ऑफ़लाइन / व्यक्तिगत)',
    category: 'kundli',
    price: 3000,
    originalPrice: 4000,
    durationMinutes: 60,
    shortDescription: 'In-person one-on-one personal consultation at our Jubilee Hills, Hyderabad sanctuary.',
    fullDescription: 'Private face-to-face consultation at our Hyderabad sanctuary (Jubilee Hills, Road No. 5). Thorough examination of physical charts, palm signs, and deep astrological deliberation with blessed remedial guidance.',
    features: [
      'Face-to-face consultation at Jubilee Hills, Hyderabad',
      'Deep personal chart & planetary transit examination',
      'Customized gemstone, mantra & hawan prescriptions',
      'Traditional blessings & energized remedial guidance',
      '60-minute unhurried, comprehensive discussion'
    ],
    iconName: 'Compass',
    active: true,
    popular: true,
  },
  {
    id: 'srv-matchmaking',
    title: 'Match Making',
    hindiTitle: 'विवाह गुण मिलान (36 गुण व मांगलिक विचार)',
    category: 'marriage',
    price: 2000,
    originalPrice: 2500,
    durationMinutes: 60,
    shortDescription: 'Exhaustive 36 Guna Ashtakoot Milan, Manglik Dosha evaluation, and mutual longevity harmony.',
    fullDescription: 'Detailed comparative analysis of both prospective bride and groom horoscopes by Mata Sri Poornima. Analyzes mental compatibility (Graha Maitri), emotional bonding (Gana), physical harmony (Yoni), and genetic health lineage (Nadi).',
    features: [
      'Ashtakoot 36 Guna Milan breakdown & scoring',
      'Manglik dosha presence & cancellation check',
      'Longevity & progeny (Santana) indicators',
      'Family harmony & financial growth synergy',
      'Auspicious Vivah Muhurat recommendations'
    ],
    iconName: 'HeartHandshake',
    active: true,
    popular: true,
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'app-101',
    bookingNumber: 'AP-8921',
    serviceId: 'srv-kundli-online',
    serviceTitle: 'Kundli Reading (Online)',
    customerName: 'Vikramaditya Sharma',
    customerEmail: 'vikram.sharma@gmail.com',
    customerPhone: '+91 98234 56789',
    date: '2026-09-12',
    timeSlot: '11:00 AM - 11:45 AM',
    status: 'Confirmed',
    amount: 1000,
    paymentId: 'pay_OMsK3kK9Xw4jL8',
    paymentStatus: 'Paid',
    meetingLink: 'https://meet.google.com/ast-ved-ved',
    notes: 'Native is currently in Jupiter-Saturn period. Requested special focus on career & relocation.',
    birthDetails: {
      name: 'Vikramaditya Sharma',
      gender: 'Male',
      dob: '1992-06-18',
      tob: '07:45',
      pob: 'Jaipur, Rajasthan',
    },
    createdAt: '2026-09-08T10:15:00Z',
  },
  {
    id: 'app-102',
    bookingNumber: 'AP-8922',
    serviceId: 'srv-matchmaking',
    serviceTitle: 'Match Making',
    customerName: 'Ananya Mukherjee',
    customerEmail: 'ananya.m@outlook.com',
    customerPhone: '+91 98451 23098',
    date: '2026-09-13',
    timeSlot: '04:00 PM - 05:00 PM',
    status: 'Pending',
    amount: 2000,
    paymentId: 'pay_PNd9L0P3k1bC8Q',
    paymentStatus: 'Paid',
    meetingLink: 'https://meet.google.com/ast-gun-mil',
    notes: 'Checking compatibility between native and prospective groom from Hyderabad. Nadi check requested.',
    birthDetails: {
      name: 'Ananya Mukherjee',
      gender: 'Female',
      dob: '1995-11-23',
      tob: '14:20',
      pob: 'Hyderabad, Telangana',
    },
    createdAt: '2026-09-09T09:30:00Z',
  },
  {
    id: 'app-103',
    bookingNumber: 'AP-8923',
    serviceId: 'srv-kundli-offline',
    serviceTitle: 'Kundli Reading (Offline)',
    customerName: 'Rajesh Singhania',
    customerEmail: 'rajesh@singhaniagroup.in',
    customerPhone: '+91 97110 88231',
    date: '2026-09-14',
    timeSlot: '02:00 PM - 03:00 PM',
    status: 'Confirmed',
    amount: 3000,
    paymentId: 'pay_QR4xM8B0j4pE6Z',
    paymentStatus: 'Paid',
    meetingLink: 'In-Person at Jubilee Hills Sanctuary, Hyderabad',
    notes: 'In-person sanctuary visit at Jubilee Hills. Inquiring on business expansion & Graha Shanti.',
    birthDetails: {
      name: 'Rajesh Singhania',
      gender: 'Male',
      dob: '1984-03-05',
      tob: '05:15',
      pob: 'Hyderabad, Telangana',
    },
    createdAt: '2026-09-09T14:45:00Z',
  },
  {
    id: 'app-104',
    bookingNumber: 'AP-8924',
    serviceId: 'srv-kundli-online',
    serviceTitle: 'Kundli Reading (Online)',
    customerName: 'Pooja Hegde',
    customerEmail: 'pooja.h@yahoo.com',
    customerPhone: '+91 99001 77654',
    date: '2026-09-10',
    timeSlot: '06:00 PM - 06:45 PM',
    status: 'Completed',
    amount: 1000,
    paymentId: 'pay_ST9kP1N3j8vM2X',
    paymentStatus: 'Paid',
    meetingLink: 'https://meet.google.com/ast-gem-ved',
    notes: 'Prescribed Vedic remedies and Dasha pacification. Consultation completed.',
    birthDetails: {
      name: 'Pooja Hegde',
      gender: 'Female',
      dob: '1998-08-14',
      tob: '09:10',
      pob: 'Bengaluru, Karnataka',
    },
    createdAt: '2026-09-07T11:20:00Z',
  },
  {
    id: 'app-105',
    bookingNumber: 'AP-8925',
    serviceId: 'srv-kundli-offline',
    serviceTitle: 'Kundli Reading (Offline)',
    customerName: 'Dr. Sameer Joshi',
    customerEmail: 'dr.joshi.cardio@gmail.com',
    customerPhone: '+91 98200 44556',
    date: '2026-09-16',
    timeSlot: '10:00 AM - 11:00 AM',
    status: 'Confirmed',
    amount: 3000,
    paymentId: 'pay_UV2mO5L8k9wQ4Y',
    paymentStatus: 'Paid',
    meetingLink: 'In-Person at Jubilee Hills Sanctuary, Hyderabad',
    notes: 'Personal horoscope analysis at Hyderabad sanctuary.',
    birthDetails: {
      name: 'Dr. Sameer Joshi',
      gender: 'Male',
      dob: '1979-01-29',
      tob: '19:40',
      pob: 'Hyderabad, Telangana',
    },
    createdAt: '2026-09-06T16:10:00Z',
  }
];

export const INITIAL_USERS: UserClient[] = [
  {
    id: 'usr-1',
    name: 'Vikramaditya Sharma',
    email: 'vikram.sharma@gmail.com',
    phone: '+91 98234 56789',
    totalBookings: 2,
    totalSpent: 2998,
    lastBookingDate: '2026-09-08',
    status: 'Active',
    notes: 'Longtime client. Prefers weekend slots and follow-up via WhatsApp.',
  },
  {
    id: 'usr-2',
    name: 'Ananya Mukherjee',
    email: 'ananya.m@outlook.com',
    phone: '+91 98451 23098',
    totalBookings: 1,
    totalSpent: 1999,
    lastBookingDate: '2026-09-09',
    status: 'Active',
    notes: 'Seeking matchmaking verification.',
  },
  {
    id: 'usr-3',
    name: 'Rajesh Singhania',
    email: 'rajesh@singhaniagroup.in',
    phone: '+91 97110 88231',
    totalBookings: 3,
    totalSpent: 6897,
    lastBookingDate: '2026-09-09',
    status: 'Active',
    notes: 'VIP business client. Consults prior to all venture investments.',
  },
  {
    id: 'usr-4',
    name: 'Pooja Hegde',
    email: 'pooja.h@yahoo.com',
    phone: '+91 99001 77654',
    totalBookings: 1,
    totalSpent: 999,
    lastBookingDate: '2026-09-07',
    status: 'Active',
    notes: 'Inquired on Yellow Sapphire authenticity certification.',
  },
  {
    id: 'usr-5',
    name: 'Dr. Sameer Joshi',
    email: 'dr.joshi.cardio@gmail.com',
    phone: '+91 98200 44556',
    totalBookings: 2,
    totalSpent: 4998,
    lastBookingDate: '2026-09-09',
    status: 'Active',
    notes: 'Specialist doctor consulting on clinic Vastu.',
  },
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Sunil Gavaskar Verma',
    city: 'Hyderabad',
    rating: 5,
    serviceTitle: 'Kundli Reading (Online)',
    comment: 'Mata Sri Poornima’s reading was astonishingly precise. She accurately highlighted the exact month of my job transition without me uttering a word. The remedies prescribed were simple and sattvic. Immense gratitude!',
    date: '2026-08-28',
    verified: true,
    approved: true,
  },
  {
    id: 'rev-2',
    author: 'Meenakshi Sundaram',
    city: 'Secunderabad',
    rating: 5,
    serviceTitle: 'Match Making',
    comment: 'Most automated software showed 16 gunas and terrified us with Manglik dosha. Mata ji analyzed the Navamsha and cancellation principles and clarified that the dosha was neutralized. Our wedding was conducted peacefully!',
    date: '2026-09-02',
    verified: true,
    approved: true,
  },
  {
    id: 'rev-3',
    author: 'Rohit Khandelwal',
    city: 'Hyderabad',
    rating: 5,
    serviceTitle: 'Kundli Reading (Offline)',
    comment: 'Her in-person consultation at the Jubilee Hills sanctuary was deeply enlightening. She provided clarity during my Saturn Sade Sati and guided our business expansion safely. Truly a genuine scholar of Vedic astrology.',
    date: '2026-09-04',
    verified: true,
    approved: true,
  },
  {
    id: 'rev-4',
    author: 'Dr. Arpita Sen',
    city: 'Bengaluru',
    rating: 5,
    serviceTitle: 'Kundli Reading (Online)',
    comment: 'I was suffering from restless sleep and career confusion. The planetary remedies and mantra guidance recommended by Mata Sri Poornima brought profound balance within two weeks. Excellent scientific and spiritual explanation.',
    date: '2026-09-06',
    verified: true,
    approved: true,
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    slug: 'saturn-sade-sati-survival-guide',
    title: 'Saturn Sade Sati: Myths, Realities, and Classical Vedic Remedies',
    category: 'Planetary Transits',
    excerpt: 'Demystifying the 7.5-year transit of Shani Deva. Learn why Sade Sati is a period of karmic purification and lasting elevation rather than pure devastation.',
    content: `Many people tremble at the very mention of Shani Sade Sati. However, classical treatises such as Brihat Parashara Hora Shastra teach that Saturn is the supreme judge (Nyayadhikari), not an antagonist. When Saturn transits the 12th, 1st, and 2nd houses from your natal Moon, it strips away illusions, ego, and reckless complacency.

Key Remedies for Sade Sati:
1. Chanting the sacred Dasharatha Shani Stotram every Saturday evening.
2. Feeding black dogs or crows with mustard oil-smeared rotis.
3. Donating iron utensils, black sesame (Til), and dark blankets to hardworking laborers.
4. Practicing rigorous discipline, honesty in business, and vegetarian food habits.`,
    readTime: '6 min read',
    date: '2026-09-05',
    author: 'Mata Sri Poornima',
    tags: ['Saturn', 'Sade Sati', 'Vedic Astrology', 'Remedies'],
    imageUrl: 'https://images.unsplash.com/photo-1532767153582-b1a0e5145009?w=800&auto=format&fit=crop&q=80',
    seoFocusKeyword: 'Saturn Sade Sati remedies',
    seoScore: 94,
  },
  {
    id: 'blog-2',
    slug: 'rahu-ketu-karmic-axis-explained',
    title: 'Rahu and Ketu: Understanding the Shadow Planets of Destiny',
    category: 'Karmic Astrology',
    excerpt: 'How the lunar nodes create intense worldly cravings and ultimate spiritual detachment in your birth chart.',
    content: `Rahu represents where our soul wants to explore unchartered territories in this lifetime, driving relentless ambition and technological innovation. Ketu, conversely, represents mastery accumulated from past lives—the area where we feel detached, intuitive, and ready for spiritual surrender.

Understanding your Rahu-Ketu axis illuminates your deepest subconscious motivations. When afflicted, Rahu generates anxiety, phantom fears, and obsession. Propitiation through Durga Saptashati recital transforms Rahu from an unruly agitator into a supreme material benefactor.`,
    readTime: '5 min read',
    date: '2026-09-01',
    author: 'Mata Sri Poornima',
    tags: ['Rahu', 'Ketu', 'Kundli', 'Karma'],
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    seoFocusKeyword: 'Rahu Ketu transit analysis',
    seoScore: 91,
  },
  {
    id: 'blog-3',
    slug: 'manglik-dosha-cancellation-rules',
    title: 'The Truth About Manglik Dosha & 14 Classical Cancellation Rules',
    category: 'Marriage Astrology',
    excerpt: 'Why 70% of so-called Manglik doshas in popular horoscopes are completely cancelled under classical Parashari principles.',
    content: `One of the greatest sources of matrimonial anxiety across India is Manglik Dosha (Kuja Dosha). Popular lore suggests catastrophic marital discord if a Manglik marries a non-Manglik. Yet, the classical scriptures outline at least 14 exceptions where Mars is completely pacified:

1. Mars in Aries in the 1st house or Scorpio in the 4th house.
2. Mars in Capricorn (its exaltation sign) in any house.
3. Mars conjunct or aspected by Devaguru Jupiter or the Moon.
4. When the partner has Saturn or Rahu in corresponding houses (1, 4, 7, 8, or 12).

Always consult an experienced Vedic astrologer before rejecting a promising proposal solely on automated software tags.`,
    readTime: '7 min read',
    date: '2026-08-25',
    author: 'Mata Sri Poornima',
    tags: ['Manglik Dosha', 'Kundli Milan', 'Marriage'],
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=80',
    seoFocusKeyword: 'Manglik dosha cancellation rules',
    seoScore: 96,
  }
];

export const INITIAL_FAQS = [
  {
    q: 'What if I do not know my exact time of birth?',
    a: 'In cases where the birth time is approximate (e.g., "between 2 PM and 4 PM"), Mata Sri Poornima uses classical Birth Time Rectification (Nashta Jataka / Kunda method) by cross-referencing significant life milestone dates (marriage, education, major travels, parents’ milestones) to calibrate the ascendant degree.'
  },
  {
    q: 'How are consultations conducted?',
    a: 'Consultations are conducted either online via high-definition video call / phone, or in-person at our Jubilee Hills, Hyderabad sanctuary (Road No. 5, Metro Pillar No. 1571). Confirmation details are sent via WhatsApp and email.'
  },
  {
    q: 'What is the pricing for consultations?',
    a: 'Our consultations are transparently priced as real text: Kundli Reading Online is ₹1,000; Kundli Reading Offline (in-person at Jubilee Hills sanctuary) is ₹3,000; and Match Making (Kundli Milan) is ₹2,000.'
  },
  {
    q: 'Can astrological remedies change my destiny?',
    a: 'Vedic astrology distinguishes between Dridha Karma (fixed destiny) and Adridha Karma (flexible destiny). While major karmic blueprints cannot be erased, genuine Vedic remedies (mantras, gemstones, daan, rituals) serve as an umbrella during heavy rainfall—reducing severe impacts into manageable breezes.'
  },
  {
    q: 'What is your reschedule and cancellation policy?',
    a: 'Appointments can be freely rescheduled up to 6 hours before the scheduled time slot via our customer portal or WhatsApp helpline (+91 9160791531). If you wish to cancel, a 100% refund is processed within 24 hours.'
  }
];

export const INITIAL_GALLERY = [
  {
    title: 'Hyderabad Jubilee Hills Sanctuary',
    category: 'Sanctuary',
    imageUrl: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&auto=format&fit=crop&q=80',
    caption: 'Our serene consultation chamber at Jubilee Hills, Road No. 5, Metro Pillar No. 1571, Hyderabad.'
  },
  {
    title: 'Ancient Palm Leaf Manuscripts',
    category: 'Heritage',
    imageUrl: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=800&auto=format&fit=crop&q=80',
    caption: 'Preserved classical Brihat Parashara Hora Shastra and Jaimini Sutras treatises.'
  },
  {
    title: 'Navagraha Puja & Sacred Hawan',
    category: 'Rituals',
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=80',
    caption: 'Sacred planetary oblations and Vedic chanting performed for family harmony and peace.'
  },
  {
    title: 'Consecrated Jyotish Gemstones',
    category: 'Gemstones',
    imageUrl: 'https://images.unsplash.com/photo-1615655406736-b37c4fabf923?w=800&auto=format&fit=crop&q=80',
    caption: 'Natural untreated yellow sapphires, rubies, and emeralds certified by accredited gemological labs.'
  },
  {
    title: 'Jyothishya Shiromani Recognition',
    category: 'Honors',
    imageUrl: 'https://images.unsplash.com/photo-1578269174936-2709b6aeb913?w=800&auto=format&fit=crop&q=80',
    caption: 'Mata Sri Poornima receiving the Jyothishya Shiromani honor for distinguished Vedic astrological service.'
  },
  {
    title: 'Sacred Himalayan Rudraksha Beads',
    category: 'Spiritual',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80',
    caption: 'Authentic 1 to 14 Mukhi Nepal Rudraksha beads energized with sacred Beej Mantras.'
  }
];

export const DAILY_HOROSCOPE_MOCK = [
  { sign: 'Aries (मेष)', element: 'Fire', lord: 'Mars', luckyNumber: 9, luckyColor: 'Coral Red', prediction: 'Mars fuels your proactive courage today. Ideal time to conclude pending negotiations and initiate fitness routines. Avoid impulsive temper in evening domestic discussions.', rating: 88 },
  { sign: 'Taurus (वृषभ)', element: 'Earth', lord: 'Venus', luckyNumber: 6, luckyColor: 'Lotus White', prediction: 'Venus highlights luxurious investments and harmonious social connections. A pleasant monetary return from an older venture brings immense satisfaction.', rating: 92 },
  { sign: 'Gemini (मिथुन)', element: 'Air', lord: 'Mercury', luckyNumber: 5, luckyColor: 'Emerald Green', prediction: 'Mercury sharpens your mental acuity. Public communications, writing, and digital pitches meet with enthusiastic approvals. Prioritize adequate rest.', rating: 85 },
  { sign: 'Cancer (कर्क)', element: 'Water', lord: 'Moon', luckyNumber: 2, luckyColor: 'Silver Gray', prediction: 'The Moon heightens your emotional intuition. Trust gut feelings in family decisions. Evening spent near water or listening to soothing mantras rejuvenates your spirit.', rating: 89 },
  { sign: 'Leo (सिंह)', element: 'Fire', lord: 'Sun', luckyNumber: 1, luckyColor: 'Royal Gold', prediction: 'The Sun casts an aura of magnetic authority around you. Superior officers and business partners acknowledge your leadership. Maintain humility.', rating: 95 },
  { sign: 'Virgo (कन्या)', element: 'Earth', lord: 'Mercury', luckyNumber: 7, luckyColor: 'Olive Green', prediction: 'Favorable planetary alignment for accounting, analytical debugging, and organizing complex tasks. Avoid overthinking minor conversational delays.', rating: 83 },
  { sign: 'Libra (तुला)', element: 'Air', lord: 'Venus', luckyNumber: 6, luckyColor: 'Pastel Blue', prediction: 'A balanced and delightfully creative day. Collaborative creative projects gain traction. Romantic partnerships experience renewed warmth.', rating: 91 },
  { sign: 'Scorpio (वृश्चिक)', element: 'Water', lord: 'Mars', luckyNumber: 8, luckyColor: 'Deep Crimson', prediction: 'Intense determination helps you dismantle obstacles that seemed insurmountable last week. Guard confidential plans from casual acquaintances.', rating: 87 },
  { sign: 'Sagittarius (धनु)', element: 'Fire', lord: 'Jupiter', luckyNumber: 3, luckyColor: 'Bright Yellow', prediction: 'Devaguru Jupiter opens avenues for higher learning, spiritual discourses, or long-distance travel plans. Blessings of elders bring sudden good fortune.', rating: 94 },
  { sign: 'Capricorn (मकर)', element: 'Earth', lord: 'Saturn', luckyNumber: 4, luckyColor: 'Steel Blue', prediction: 'Saturn rewards disciplined patience. Long-term property or structural projects proceed steadily. Maintain structured hydration and avoid joint fatigue.', rating: 82 },
  { sign: 'Aquarius (कुम्भ)', element: 'Air', lord: 'Saturn', luckyNumber: 11, luckyColor: 'Electric Indigo', prediction: 'Groundbreaking ideas and collaborative network expansions dominate the day. Social causes bring unexpected professional contacts.', rating: 86 },
  { sign: 'Pisces (मीन)', element: 'Water', lord: 'Jupiter', luckyNumber: 12, luckyColor: 'Seafoam Gold', prediction: 'Dream state and spiritual intuitions provide answers to lingering dilemmas. Compassionate listening heals an old rift with a close family member.', rating: 90 },
];
