import { Feature } from './types'

export const BASE_PRICES = {
  website: {
    basic: 800,
    business: 2500,
    ecommerce: 3000,
    custom: 4000,
  },
  app: {
    basic: 5000,
    business: 10000,
    ecommerce: 18000,
    custom: 20000,
  },
  both: {
    basic: 5500,
    business: 1200,
    ecommerce: 20500,
    custom: 22500,
  },
}

export const TRAFFIC_MULTIPLIERS = {
  'low': 1.0,        // < 1k daily visits
  'medium': 1.1,     // 1k-10k daily visits
  'high': 1.25,      // 10k-50k daily visits
  'very-high': 1.5,  // 50k+ daily visits
}

export const PAGE_PRICING = {
  base: 8, // Free pages included
  pricePerPage: 115, // Price per additional page
}

export const FEATURES: Feature[] = [
  // Core Features
  {
    id: 'responsive-design',
    name: 'Responsive Design',
    description: 'Mobile-friendly design that works on all devices',
    price: 0, // Included in base
    category: 'core',
  },
  {
    id: 'contact-form',
    name: 'Contact Form',
    description: 'Basic contact form with email notifications',
    price: 0, // Included in base
    category: 'core',
  },
  {
    id: 'seo-optimization',
    name: 'On-Page SEO Optimization',
    description: 'Basic SEO setup with meta tags and sitemap',
    price: 0, // Included in base
    category: 'core',
  },
  {
    id: 'google-analytics',
    name: 'Google Analytics Integration',
    description: 'Track website traffic and user behavior',
    price: 0, // Included in base
    category: 'core',
  },

  // Advanced Features
  {
    id: 'blog-system',
    name: 'Blog System',
    description: 'Custom blog with admin dashboard for content management',
    price: 600,
    category: 'advanced',
  },
  {
    id: 'user-authentication',
    name: 'User Authentication',
    description: 'User registration, login, and profile management',
    price: 1000,
    category: 'advanced',
  },
  {
    id: 'payment-processing',
    name: 'Payment Processing',
    description: 'Stripe/PayPal integration for payments',
    price: 700,
    category: 'advanced',
  },
  {
    id: 'booking-system',
    name: 'Booking/Appointment System',
    description: 'Calendar-based booking system with notifications',
    price: 2000,
    category: 'advanced',
  },
  {
    id: 'search-functionality',
    name: 'Advanced Search',
    description: 'Custom search with filters and autocomplete',
    price: 200,
    category: 'advanced',
  },
  {
    id: 'multi-language',
    name: 'Multi-language Support',
    description: 'Support for multiple languages with language switcher',
    price: 300,
    category: 'advanced',
  },
  {
    id: 'email-automation',
    name: 'Email Automation',
    description: 'Automated email campaigns and workflows',
    price: 1200,
    category: 'advanced',
  },
  {
    id: 'social-media-integration',
    name: 'Social Media Integration',
    description: 'Social login and sharing features',
    price: 2300,
    category: 'advanced',
  },

  // Premium Features
  {
    id: 'custom-crm',
    name: 'Custom CRM System',
    description: 'Customer relationship management dashboard',
    price: 5000,
    category: 'premium',
  },
  {
    id: 'api-development',
    name: 'REST API Development',
    description: 'Custom API for integrations and mobile apps',
    price: 1500,
    category: 'premium',
  },
  {
    id: 'admin-dashboard',
    name: 'Advanced Admin Dashboard',
    description: 'Custom admin panel with analytics and reporting',
    price: 1200,
    category: 'premium',
  },
  {
    id: 'inventory-management',
    name: 'Inventory Management',
    description: 'Product inventory tracking and management',
    price: 1000,
    category: 'premium',
  },
  {
    id: 'membership-system',
    name: 'Membership/Subscription System',
    description: 'Recurring billing and member-only content',
    price: 2500,
    category: 'premium',
  },
  {
    id: 'live-chat',
    name: 'Live Chat Support',
    description: 'Real-time chat widget with admin dashboard',
    price: 800,
    category: 'premium',
  },
  {
    id: 'custom-integrations',
    name: 'Third-party Integrations',
    description: 'Connect with CRMs, email platforms, and other tools',
    price: 1000,
    category: 'premium',
  },
  {
    id: 'progressive-web-app',
    name: 'Progressive Web App (PWA)',
    description: 'App-like experience with offline functionality',
    price: 1200,
    category: 'premium',
  },
]

export const TIMELINE_ESTIMATES = {
  basic: '2-3 weeks',
  advanced: '4-6 weeks',
  custom: '8-12 weeks',
}

export function calculatePrice(
  projectType: string,
  websiteType: string,
  trafficLevel: string,
  selectedFeatures: string[],
  pages: number
) {
  const basePrice = BASE_PRICES[projectType as keyof typeof BASE_PRICES][websiteType as keyof typeof BASE_PRICES.website] || 0
  const featuresPrice = selectedFeatures.reduce((total, featureId) => {
    const feature = FEATURES.find(f => f.id === featureId)
    return total + (feature?.price || 0)
  }, 0)

  const trafficMultiplier = TRAFFIC_MULTIPLIERS[trafficLevel as keyof typeof TRAFFIC_MULTIPLIERS] || 1

  const extraPages = Math.max(0, pages - PAGE_PRICING.base)
  const pagesPrice = extraPages * PAGE_PRICING.pricePerPage

  const subtotal = basePrice + featuresPrice + pagesPrice
  const total = Math.round(subtotal * trafficMultiplier)

  // Calculate ongoing transaction fees for ecommerce projects with payment processing
  let transactionFeeNote = ''
  if (websiteType === 'ecommerce' || selectedFeatures.includes('payment-processing')) {
    transactionFeeNote = '+ 2%-7% per transaction'
  }

  // Determine tier based on total price
  let tier: 'basic' | 'advanced' | 'custom'
  if (total <= 2000) tier = 'basic'
  else if (total <= 5000) tier = 'advanced'
  else tier = 'custom'

  return {
    basePrice,
    featuresPrice,
    trafficMultiplier,
    pagesPrice,
    total,
    tier,
    estimatedTimeline: TIMELINE_ESTIMATES[tier],
    transactionFeeNote,
  }
}