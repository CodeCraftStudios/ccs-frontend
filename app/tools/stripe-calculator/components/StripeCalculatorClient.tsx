'use client'

import { useState } from 'react'
import { StripeCalculatorForm, FEE_STRUCTURES } from './StripeCalculatorForm'
import { FeeResults } from './FeeResults'
import { SEOContent } from './SEOContent'
import { PaymentMethod, CalculationMode, CalculatorResults } from '../types'

export function StripeCalculatorClient() {
  const [amount, setAmount] = useState<string>('')
  const [calculationMode, setCalculationMode] = useState<CalculationMode>('gross')
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('domestic')
  const [results, setResults] = useState<CalculatorResults | null>(null)

  const calculateFees = () => {
    const inputAmount = parseFloat(amount)
    if (isNaN(inputAmount) || inputAmount <= 0) {
      return
    }

    const fee = FEE_STRUCTURES[paymentMethod]
    let grossAmount: number
    let netAmount: number
    let fees: number

    if (calculationMode === 'gross') {
      // Calculate net from gross
      grossAmount = inputAmount
      fees = grossAmount * (fee.percentage / 100) + fee.fixed

      // ACH has a $5 cap on fees
      if (paymentMethod === 'ach' && fees > 5) {
        fees = 5
      }

      netAmount = grossAmount - fees
    } else {
      // Calculate gross from net (reverse calculation)
      netAmount = inputAmount

      if (paymentMethod === 'ach') {
        // For ACH, we need to handle the $5 cap
        // First try without cap
        const percentageFee = fee.percentage / 100
        grossAmount = (netAmount + fee.fixed) / (1 - percentageFee)
        fees = grossAmount * percentageFee + fee.fixed

        // If over $5, recalculate with $5 cap
        if (fees > 5) {
          grossAmount = netAmount + 5
          fees = 5
        }
      } else {
        // Standard calculation: net = gross * (1 - percentage) - fixed
        // Rearranged: gross = (net + fixed) / (1 - percentage)
        const percentageFee = fee.percentage / 100
        grossAmount = (netAmount + fee.fixed) / (1 - percentageFee)
        fees = grossAmount - netAmount
      }
    }

    const effectiveRate = (fees / grossAmount) * 100

    setResults({
      grossAmount,
      fees,
      netAmount,
      effectiveRate,
    })

    // Scroll to results
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  const handleReset = () => {
    setResults(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-background py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold superfont text-glow-primary">
            Stripe Fee Calculator
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Calculate Stripe processing fees for different payment methods. Supports both gross-to-net and net-to-gross calculations.
          </p>
        </div>

        {!results ? (
          <StripeCalculatorForm
            amount={amount}
            calculationMode={calculationMode}
            paymentMethod={paymentMethod}
            onAmountChange={setAmount}
            onCalculationModeChange={setCalculationMode}
            onPaymentMethodChange={setPaymentMethod}
            onCalculate={calculateFees}
          />
        ) : (
          <div id="results">
            <FeeResults
              results={results}
              calculationMode={calculationMode}
              onReset={handleReset}
            />
          </div>
        )}

        {/* SEO Content - Only show when no results */}
        {!results && <SEOContent />}
      </div>
    </div>
  )
}
