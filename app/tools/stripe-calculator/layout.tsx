import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Stripe Fee Calculator - Calculate Processing Fees & Net Amount | CodeCraft Studios',
  description: 'Free Stripe fee calculator. Calculate Stripe processing fees, transaction costs, and net payout amounts. Support for multiple currencies and payment methods including cards and ACH.',
  keywords: 'stripe calculator, stripe fees, payment processing fees, stripe cost calculator, transaction fees, stripe pricing, payment calculator',
  openGraph: {
    title: 'Free Stripe Fee Calculator - Calculate Processing Costs',
    description: 'Calculate Stripe processing fees and net amounts for credit cards, debit cards, and ACH payments.',
    type: 'website',
    url: 'https://codecraftstudios.net/tools/stripe-calculator',
    images: [
      {
        url: 'https://codecraftstudios.net/media/og-stripe-calculator.png',
        width: 1200,
        height: 630,
        alt: 'Stripe Fee Calculator Tool'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Stripe Fee Calculator - Calculate Processing Costs',
    description: 'Calculate Stripe fees for credit cards, debit cards, and ACH payments instantly.',
    images: ['https://codecraftstudios.net/media/og-stripe-calculator.png']
  }
}

export default function StripeCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}