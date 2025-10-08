import { Metadata } from 'next'
import { CalculatorClient } from './components/CalculatorClient'

export const metadata: Metadata = {
  title: 'Project Cost Calculator - Get Instant Pricing | CodeCraft Studios',
  description: 'Free project cost calculator for websites and apps. Get instant estimates based on your requirements, features, and traffic expectations. Transparent pricing with no surprises.',
  keywords: 'website cost calculator, app development pricing, project estimate calculator, web development cost, mobile app pricing',
  openGraph: {
    title: 'Free Project Cost Calculator - Instant Pricing Estimates',
    description: 'Calculate your website or app project cost instantly. Answer a few questions to get detailed pricing and timeline estimates.',
    url: 'https://codecraftstudios.net/tools/calculator',
    images: [
      {
        url: 'https://codecraftstudios.net/media/og-calculator.png',
        width: 1200,
        height: 630,
        alt: 'Project Cost Calculator Tool',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Project Cost Calculator',
    description: 'Get instant pricing estimates for your website or app project.',
    images: ['https://codecraftstudios.net/media/og-calculator.png'],
  },
}

export default function CalculatorPage() {
  return <CalculatorClient />
}