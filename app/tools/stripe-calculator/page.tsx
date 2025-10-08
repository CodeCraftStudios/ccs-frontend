import { Metadata } from 'next'
import { StripeCalculatorClient } from './components/StripeCalculatorClient'

export const metadata: Metadata = {
  title: 'Free Stripe Fee Calculator - Calculate Processing Fees | CodeCraft Studios',
  description: 'Free Stripe fee calculator for payment processing. Calculate fees for credit cards, debit cards, and ACH payments. Supports gross-to-net and net-to-gross calculations.',
  keywords: 'stripe fee calculator, stripe fees, payment processing calculator, credit card fees, ach fees, stripe pricing, transaction fees',
  openGraph: {
    title: 'Free Stripe Fee Calculator - Instant Processing Fee Calculations',
    description: 'Calculate Stripe processing fees for credit cards, debit cards, and ACH payments. Free tool with gross-to-net and net-to-gross modes.',
    url: 'https://codecraftstudios.net/tools/stripe-calculator',
    images: [
      {
        url: 'https://codecraftstudios.net/media/og-stripe-calculator.png',
        width: 1200,
        height: 630,
        alt: 'Stripe Fee Calculator Tool',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Stripe Fee Calculator',
    description: 'Calculate Stripe processing fees instantly for all payment methods.',
    images: ['https://codecraftstudios.net/media/og-stripe-calculator.png'],
  },
}

export default function StripeCalculatorPage() {
  return <StripeCalculatorClient />
}
