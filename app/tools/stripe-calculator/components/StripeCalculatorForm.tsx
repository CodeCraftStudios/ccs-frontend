'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Calculator } from 'lucide-react'
import { PaymentMethod, CalculationMode, FeeStructure } from '../types'

interface StripeCalculatorFormProps {
  amount: string
  calculationMode: CalculationMode
  paymentMethod: PaymentMethod
  onAmountChange: (amount: string) => void
  onCalculationModeChange: (mode: CalculationMode) => void
  onPaymentMethodChange: (method: PaymentMethod) => void
  onCalculate: () => void
}

export const FEE_STRUCTURES: Record<PaymentMethod, FeeStructure> = {
  domestic: {
    name: 'Domestic Card',
    percentage: 2.9,
    fixed: 0.30,
    description: 'US credit/debit cards',
  },
  international: {
    name: 'International Card',
    percentage: 3.9,
    fixed: 0.30,
    description: 'Non-US cards',
  },
  amex: {
    name: 'American Express',
    percentage: 3.5,
    fixed: 0.30,
    description: 'Amex cards',
  },
  ach: {
    name: 'ACH Direct Debit',
    percentage: 0.8,
    fixed: 0.00,
    description: 'Bank transfers (capped at $5)',
  },
}

export function StripeCalculatorForm({
  amount,
  calculationMode,
  paymentMethod,
  onAmountChange,
  onCalculationModeChange,
  onPaymentMethodChange,
  onCalculate,
}: StripeCalculatorFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onCalculate()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Calculation Mode */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Calculation Mode</CardTitle>
          <CardDescription>Choose how you want to calculate fees</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => onCalculationModeChange('gross')}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                calculationMode === 'gross'
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="font-semibold">Gross to Net</div>
              <div className="text-sm text-muted-foreground">
                I have $X, what do I get after fees?
              </div>
            </button>
            <button
              type="button"
              onClick={() => onCalculationModeChange('net')}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                calculationMode === 'net'
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="font-semibold">Net to Gross</div>
              <div className="text-sm text-muted-foreground">
                I want to receive $X, how much to charge?
              </div>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Amount Input */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>
            {calculationMode === 'gross' ? 'Gross Amount' : 'Net Amount (Desired)'}
          </CardTitle>
          <CardDescription>
            {calculationMode === 'gross'
              ? 'Enter the total transaction amount'
              : 'Enter the amount you want to receive after fees'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="amount">Amount ($)</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                $
              </span>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                value={amount}
                onChange={(e) => onAmountChange(e.target.value)}
                className="pl-7"
                placeholder="0.00"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>Select the Stripe payment method</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(Object.keys(FEE_STRUCTURES) as PaymentMethod[]).map((method) => {
              const fee = FEE_STRUCTURES[method]
              return (
                <button
                  key={method}
                  type="button"
                  onClick={() => onPaymentMethodChange(method)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    paymentMethod === method
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="font-semibold">{fee.name}</div>
                  <div className="text-sm text-muted-foreground">{fee.description}</div>
                  <div className="text-xs text-primary mt-1">
                    {fee.percentage}% {fee.fixed > 0 && `+ $${fee.fixed.toFixed(2)}`}
                  </div>
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Calculate Button */}
      <Button type="submit" size="lg" className="w-full">
        <Calculator className="mr-2 h-5 w-5" />
        Calculate Fees
      </Button>
    </form>
  )
}
