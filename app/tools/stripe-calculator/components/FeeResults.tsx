'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DollarSign, TrendingDown, TrendingUp } from 'lucide-react'
import { CalculatorResults, CalculationMode } from '../types'

interface FeeResultsProps {
  results: CalculatorResults
  calculationMode: CalculationMode
  onReset: () => void
}

export function FeeResults({ results, calculationMode, onReset }: FeeResultsProps) {
  return (
    <div className="space-y-6">
      {/* Main Results Card */}
      <Card className="border-border/50 shadow-lg bg-gradient-to-br from-primary/10 to-accent/10">
        <CardContent className="pt-6">
          <div className="space-y-6">
            {/* Gross Amount */}
            <div className="text-center">
              <div className="text-sm text-muted-foreground uppercase tracking-wide mb-2 flex items-center justify-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Gross Amount (Total Charged)
              </div>
              <div className="text-5xl font-bold superfont text-primary">
                ${results.grossAmount.toFixed(2)}
              </div>
            </div>

            {/* Fees */}
            <div className="text-center">
              <div className="text-sm text-muted-foreground uppercase tracking-wide mb-2 flex items-center justify-center gap-2">
                <TrendingDown className="w-4 h-4" />
                Stripe Fees
              </div>
              <div className="text-3xl font-bold text-destructive">
                -${results.fees.toFixed(2)}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                ({results.effectiveRate.toFixed(2)}% effective rate)
              </div>
            </div>

            {/* Net Amount */}
            <div className="text-center">
              <div className="text-sm text-muted-foreground uppercase tracking-wide mb-2 flex items-center justify-center gap-2">
                <DollarSign className="w-4 h-4" />
                Net Amount (You Receive)
              </div>
              <div className="text-5xl font-bold superfont text-green-500">
                ${results.netAmount.toFixed(2)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Breakdown Card */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Fee Breakdown</CardTitle>
          <CardDescription>
            {calculationMode === 'gross'
              ? 'How much you receive from the transaction'
              : 'How much to charge to receive your desired amount'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center py-3 border-b border-border/50">
              <div>
                <div className="font-medium">
                  {calculationMode === 'gross' ? 'Transaction Amount' : 'Amount to Charge'}
                </div>
                <div className="text-sm text-muted-foreground">
                  {calculationMode === 'gross'
                    ? 'Total amount charged to customer'
                    : 'Charge this amount to receive your desired net'}
                </div>
              </div>
              <div className="text-lg font-semibold">${results.grossAmount.toFixed(2)}</div>
            </div>

            <div className="flex justify-between items-center py-3 border-b border-border/50">
              <div>
                <div className="font-medium">Stripe Processing Fees</div>
                <div className="text-sm text-muted-foreground">
                  Effective rate: {results.effectiveRate.toFixed(2)}%
                </div>
              </div>
              <div className="text-lg font-semibold text-destructive">
                -${results.fees.toFixed(2)}
              </div>
            </div>

            <div className="flex justify-between items-center py-4 bg-primary/5 -mx-6 px-6 rounded-lg">
              <div>
                <div className="font-bold text-lg">
                  {calculationMode === 'gross' ? 'You Receive' : 'Your Net Amount'}
                </div>
                <div className="text-sm text-muted-foreground">
                  {calculationMode === 'gross'
                    ? 'Amount deposited to your account'
                    : 'The amount you wanted to receive'}
                </div>
              </div>
              <div className="text-2xl font-bold text-green-500">
                ${results.netAmount.toFixed(2)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button variant="outline" onClick={onReset} className="flex-1" size="lg">
          Calculate Another
        </Button>
      </div>

      {/* Info Card */}
      <Card className="border-accent-orange/50 bg-accent-orange/5">
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> This calculator uses standard Stripe pricing. Actual fees may
            vary based on your account type, volume discounts, or custom pricing agreements.
            International transactions may have additional currency conversion fees. ACH fees are
            capped at $5 per transaction.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
