export type ProjectType = 'website' | 'app' | 'both'
export type WebsiteType = 'basic' | 'business' | 'ecommerce' | 'custom'
export type TrafficLevel = 'low' | 'medium' | 'high' | 'very-high'

export interface Feature {
  id: string
  name: string
  description: string
  price: number
  category: 'core' | 'advanced' | 'premium'
}

export interface CalculatorForm {
  projectType: ProjectType
  websiteType: WebsiteType
  trafficLevel: TrafficLevel
  features: string[]
  pages: number
  customRequirements: string
}

export interface PriceBreakdown {
  basePrice: number
  featuresPrice: number
  trafficMultiplier: number
  pagesPrice: number
  total: number
  tier: 'basic' | 'advanced' | 'custom'
  estimatedTimeline: string
  transactionFeeNote: string
}