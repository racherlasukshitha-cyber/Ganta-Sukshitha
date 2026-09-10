export type ServiceCategory = 'kundli' | 'career' | 'marriage' | 'gemstone' | 'vastu' | 'puja';

export interface Service {
  id: string;
  title: string;
  hindiTitle?: string;
  category: ServiceCategory;
  price: number; // in INR
  originalPrice?: number;
  durationMinutes: number;
  shortDescription: string;
  fullDescription?: string;
  features: string[];
  iconName: string;
  active: boolean;
  popular?: boolean;
}

export type AppointmentStatus = 'Pending' | 'Confirmed' | 'Completed' | 'Rescheduled' | 'Cancelled';

export interface Appointment {
  id: string;
  bookingNumber: string;
  serviceId: string;
  serviceTitle: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "10:00 AM - 10:45 AM"
  status: AppointmentStatus;
  amount: number;
  paymentId?: string;
  paymentStatus: 'Paid' | 'Pending' | 'Refunded';
  meetingLink?: string;
  notes?: string;
  birthDetails?: {
    name: string;
    gender: string;
    dob: string;
    tob: string;
    pob: string;
  };
  createdAt: string;
}

export interface UserClient {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalBookings: number;
  totalSpent: number;
  lastBookingDate: string;
  status: 'Active' | 'Blocked';
  notes?: string;
  birthDetails?: {
    dob?: string;
    tob?: string;
    pob?: string;
    gender?: string;
  };
  createdAt?: string;
}

export type UserProfile = UserClient;

export interface PlanetaryPosition {
  planet: string; // Sun, Moon, Mars, etc.
  sanskritName: string;
  symbol: string;
  house: number; // 1 to 12
  sign: string; // Aries to Pisces
  signNumber: number; // 1 to 12
  degrees: number;
  isRetrograde?: boolean;
  dignity: 'Exalted' | 'Debilitated' | 'Own Sign' | 'Friendly' | 'Neutral' | 'Enemy';
}

export interface KundliData {
  id: string;
  name: string;
  gender: string;
  dob: string; // YYYY-MM-DD
  tob: string; // HH:mm
  pob: string; // City, State
  latitude: number;
  longitude: number;
  timezone: number;
  ascendant: {
    sign: string;
    signNumber: number;
    degree: number;
    nakshatra: string;
    lord: string;
  };
  moonSign: {
    sign: string;
    nakshatra: string;
    pada: number;
    rashiLord: string;
  };
  sunSign: string;
  planets: PlanetaryPosition[];
  houses: {
    houseNumber: number;
    signNumber: number;
    sign: string;
    planetsHere: string[];
    lord: string;
    significance: string;
  }[];
  doshas: {
    mangalDosha: { present: boolean; severity: 'None' | 'Mild' | 'High'; description: string };
    kaalSarpDosha: { present: boolean; type: string; description: string };
    sadeSati: { active: boolean; phase: string; description: string };
  };
  vimshottariDasha: {
    currentMahaDasha: string;
    antarDasha: string;
    validTill: string;
    guidance: string;
  };
  remedies: {
    gemstone: { name: string; hindiName: string; finger: string; metal: string; description: string };
    rudraksha: { mukhi: string; benefits: string };
    mantra: { mantraText: string; chantingCount: string; deity: string };
    daan: string;
  };
  createdAt: string;
}

export interface AshtakootGunaResult {
  boyName: string;
  girlName: string;
  varna: { name: string; score: number; maxScore: 1; description: string };
  vashya: { name: string; score: number; maxScore: 2; description: string };
  tara: { name: string; score: number; maxScore: 3; description: string };
  yoni: { name: string; score: number; maxScore: 4; description: string };
  grahaMaitri: { name: string; score: number; maxScore: 5; description: string };
  gana: { name: string; score: number; maxScore: 6; description: string };
  bhakoot: { name: string; score: number; maxScore: 7; description: string };
  nadi: { name: string; score: number; maxScore: 8; description: string };
  totalScore: number;
  maxScore: 36;
  isManglikBoy: boolean;
  isManglikGirl: boolean;
  verdict: 'Excellent Match' | 'Good Match' | 'Average Match' | 'Not Recommended';
  recommendations: string;
}

export interface NumerologyReport {
  name: string;
  dob: string;
  lifePathNumber: number;
  destinyNumber: number;
  soulUrgeNumber: number;
  luckyNumbers: number[];
  luckyDays: string[];
  luckyColors: string[];
  luckyColor?: string;
  favorableGemstone: string;
  luckyGemstone?: string;
  rulingPlanet?: string;
  characteristics?: string[];
  traits: string[];
  careerPath: string[];
}

export type NumerologyResult = NumerologyReport;

export interface Review {
  id: string;
  author: string;
  city: string;
  rating: number;
  serviceTitle: string;
  comment: string;
  date: string;
  verified: boolean;
  approved: boolean;
  userName?: string;
  userLocation?: string;
  serviceUsed?: string;
  verifiedBooking?: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  readTime: string;
  date: string;
  publishedDate?: string;
  author: string;
  tags: string[];
  imageUrl: string;
  coverImage?: string;
  seoFocusKeyword: string;
  seoScore: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'appointment' | 'payment' | 'kundli' | 'system';
  timestamp: string;
  read: boolean;
  linkAction?: string;
}

export interface PaymentTransaction {
  id: string;
  appointmentId: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  method: 'UPI' | 'Credit Card' | 'Debit Card' | 'Netbanking';
  status: 'Success' | 'Failed' | 'Refunded';
  razorpayPaymentId: string;
  razorpayOrderId: string;
  date: string;
}
