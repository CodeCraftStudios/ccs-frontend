export type PaymentMethod = 'domestic' | 'international' | 'amex' | 'ach'
export type CalculationMode = 'gross' | 'net'

export interface FeeStructure {
  name: string
  percentage: number
  fixed: number
  description: string
}

export interface CalculatorResults {
  grossAmount: number
  fees: number
  netAmount: number
  effectiveRate: number
}

export interface CalculatorState {
  amount: string
  calculationMode: CalculationMode
  paymentMethod: PaymentMethod
  results: CalculatorResults | null
}
