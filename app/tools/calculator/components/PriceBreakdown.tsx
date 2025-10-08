'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DollarSign, Clock, TrendingUp, FileText } from 'lucide-react'
import { PriceBreakdown as PriceData } from '../types'

interface PriceBreakdownProps {
  breakdown: PriceData
  onReset: () => void
}

export function PriceBreakdown({ breakdown, onReset }: PriceBreakdownProps) {
  return (
    <div className="space-y-6">
      {/* Total Price Card */}
      <Card className="border-border/50 shadow-lg bg-gradient-to-br from-primary/10 to-accent/10">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
                Estimated Project Cost
              </div>
              <div className="text-6xl font-bold superfont text-primary">
                ${breakdown.total.toLocaleString()}
                {breakdown.transactionFeeNote && (
                  <span className="text-2xl ml-2 text-muted-foreground">{breakdown.transactionFeeNote}</span>
                )}
              </div>
            </div>
            <div className="flex items-center justify-center gap-8">
              <div className="text-center">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">Timeline</span>
                </div>
                <div className="font-semibold">{breakdown.estimatedTimeline}</div>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm">Tier</span>
                </div>
                <div className="font-semibold capitalize">{breakdown.tier}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Price Breakdown Details */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Cost Breakdown
          </CardTitle>
          <CardDescription>Detailed breakdown of your project estimate</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center py-3 border-b border-border/50">
              <div>
                <div className="font-medium">Base Project Cost</div>
                <div className="text-sm text-muted-foreground">Core development and design</div>
              </div>
              <div className="text-lg font-semibold">${breakdown.basePrice.toLocaleString()}</div>
            </div>

            {breakdown.pagesPrice > 0 && (
              <div className="flex justify-between items-center py-3 border-b border-border/50">
                <div>
                  <div className="font-medium">Additional Pages</div>
                  <div className="text-sm text-muted-foreground">Extra pages beyond base package</div>
                </div>
                <div className="text-lg font-semibold">${breakdown.pagesPrice.toLocaleString()}</div>
              </div>
            )}

            {breakdown.featuresPrice > 0 && (
              <div className="flex justify-between items-center py-3 border-b border-border/50">
                <div>
                  <div className="font-medium">Additional Features</div>
                  <div className="text-sm text-muted-foreground">Selected optional features</div>
                </div>
                <div className="text-lg font-semibold">${breakdown.featuresPrice.toLocaleString()}</div>
              </div>
            )}

            {breakdown.trafficMultiplier > 1 && (
              <div className="flex justify-between items-center py-3 border-b border-border/50">
                <div>
                  <div className="font-medium">Traffic & Performance Optimization</div>
                  <div className="text-sm text-muted-foreground">
                    {breakdown.trafficMultiplier}x multiplier for high traffic handling
                  </div>
                </div>
                <div className="text-lg font-semibold">
                  ${((breakdown.basePrice + breakdown.featuresPrice + breakdown.pagesPrice) * (breakdown.trafficMultiplier - 1)).toLocaleString()}
                </div>
              </div>
            )}

            <div className="flex justify-between items-center py-4 bg-primary/5 -mx-6 px-6 rounded-lg">
              <div className="font-bold text-lg">Total Estimate</div>
              <div className="text-2xl font-bold text-primary">${breakdown.total.toLocaleString()}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* What's Included */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>What's Included</CardTitle>
          <CardDescription>Standard deliverables in all projects</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {[
              'Custom-coded solution (no templates)',
              'Responsive design for all devices',
              'Source code ownership',
              'Initial SEO setup',
              'Google Analytics integration',
              'Free updates under 15 minutes',
              '30-day post-launch support',
              'Documentation and training',
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild className="flex-1" size="lg">
          <a href="/contact">Get Started</a>
        </Button>
        <Button variant="outline" onClick={onReset} className="flex-1" size="lg">
          Start New Estimate
        </Button>
      </div>

      {/* Disclaimer */}
      <Card className="border-accent-orange/50 bg-accent-orange/5">
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> This is an estimated cost based on the information provided. Final pricing may vary depending on
            specific requirements, complexity, and timeline. Contact us for a detailed quote and project discussion.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}