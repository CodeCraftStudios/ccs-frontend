'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Calculator } from 'lucide-react'
import { CalculatorForm as FormData } from '../types'
import { FEATURES } from '../pricing-config'

interface CalculatorFormProps {
  onCalculate: (data: FormData) => void
}

export function CalculatorForm({ onCalculate }: CalculatorFormProps) {
  const [formData, setFormData] = useState<FormData>({
    projectType: 'website',
    websiteType: 'basic',
    trafficLevel: 'low',
    features: [],
    pages: 6,
    customRequirements: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onCalculate(formData)
  }

  const toggleFeature = (featureId: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(featureId)
        ? prev.features.filter(id => id !== featureId)
        : [...prev.features, featureId]
    }))
  }

  const coreFeatures = FEATURES.filter(f => f.category === 'core')
  const advancedFeatures = FEATURES.filter(f => f.category === 'advanced')
  const premiumFeatures = FEATURES.filter(f => f.category === 'premium')

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Project Type */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Project Type</CardTitle>
          <CardDescription>What type of project do you need?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { value: 'website', label: 'Website Only', desc: 'Web-based solution' },
              { value: 'app', label: 'Mobile App Only', desc: 'iOS/Android app' },
              { value: 'both', label: 'Website + App', desc: 'Full solution' },
            ].map(option => (
              <button
                key={option.value}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, projectType: option.value as any }))}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  formData.projectType === option.value
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="font-semibold">{option.label}</div>
                <div className="text-sm text-muted-foreground">{option.desc}</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Website Type */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Project Complexity</CardTitle>
          <CardDescription>Choose the complexity level that fits your needs</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(() => {
              // Define complexity options based on project type
              const complexityOptions = {
                website: [
                  { value: 'basic', label: 'Basic', desc: '6-8 pages, simple design', price: '$800-$1,800' },
                  { value: 'business', label: 'Business', desc: 'Blog, forms, integrations', price: '$1,801-$4,000' },
                  { value: 'ecommerce', label: 'E-commerce', desc: 'Online store, payments', price: '$3,000-$6,000' },
                  { value: 'custom', label: 'Custom/Enterprise', desc: 'Complex functionality', price: '$4,000+' },
                ],
                app: [
                  { value: 'basic', label: 'Basic', desc: 'Simple mobile app', price: '$5,000+' },
                  { value: 'business', label: 'Business', desc: 'Advanced features, integrations', price: '$8,000+' },
                  { value: 'ecommerce', label: 'E-commerce', desc: 'Shopping app, payments', price: '$12,000+' },
                  { value: 'custom', label: 'Custom/Enterprise', desc: 'Complex functionality', price: '$15,000+' },
                ],
                both: [
                  { value: 'basic', label: 'Basic', desc: 'Website + simple app', price: '$5,500+' },
                  { value: 'business', label: 'Business', desc: 'Full solution with integrations', price: '$9,000+' },
                  { value: 'ecommerce', label: 'E-commerce', desc: 'Complete shopping platform', price: '$14,000+' },
                  { value: 'custom', label: 'Custom/Enterprise', desc: 'Complex multi-platform solution', price: '$18,000+' },
                ],
              }

              return complexityOptions[formData.projectType as keyof typeof complexityOptions].map(option => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, websiteType: option.value as any }))}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    formData.websiteType === option.value
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="font-semibold">{option.label}</div>
                  <div className="text-sm text-muted-foreground">{option.desc}</div>
                  <div className="text-xs text-primary mt-1">{option.price}</div>
                </button>
              ))
            })()}
          </div>
        </CardContent>
      </Card>

      {/* Expected Traffic */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Expected Daily Traffic</CardTitle>
          <CardDescription>Higher traffic requires more robust infrastructure</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: 'low', label: 'Low', desc: '< 1k visits/day' },
              { value: 'medium', label: 'Medium', desc: '1k-10k visits/day' },
              { value: 'high', label: 'High', desc: '10k-50k visits/day' },
              { value: 'very-high', label: 'Very High', desc: '50k+ visits/day' },
            ].map(option => (
              <button
                key={option.value}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, trafficLevel: option.value as any }))}
                className={`p-4 rounded-lg border-2 transition-all text-center ${
                  formData.trafficLevel === option.value
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="font-semibold">{option.label}</div>
                <div className="text-xs text-muted-foreground">{option.desc}</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Number of Pages */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Number of Pages</CardTitle>
          <CardDescription>Base package includes 8 pages. Additional pages: $75 each</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              type="number"
              min="1"
              max="100"
              value={formData.pages}
              onChange={(e) => setFormData(prev => ({ ...prev, pages: parseInt(e.target.value) || 6 }))}
              className="max-w-xs"
            />
            {formData.pages > 8 && (
              <p className="text-sm text-muted-foreground">
                {formData.pages - 8} additional pages = ${(formData.pages - 8) * 75}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Core Features (Included) */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Core Features (Included)</CardTitle>
          <CardDescription>These features are included in the base price</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {coreFeatures.map(feature => (
              <div key={feature.id} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{feature.name}</div>
                  <div className="text-sm text-muted-foreground">{feature.description}</div>
                </div>
                <div className="text-sm text-green-500 font-medium">Included</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Advanced Features */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Advanced Features (Optional)</CardTitle>
          <CardDescription>Select additional features to add to your project</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {advancedFeatures.map(feature => (
              <button
                key={feature.id}
                type="button"
                onClick={() => toggleFeature(feature.id)}
                className={`w-full flex items-start gap-3 p-3 rounded-lg border-2 transition-all text-left ${
                  formData.features.includes(feature.id)
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  formData.features.includes(feature.id) ? 'border-primary bg-primary' : 'border-muted-foreground'
                }`}>
                  {formData.features.includes(feature.id) && (
                    <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{feature.name}</div>
                  <div className="text-sm text-muted-foreground">{feature.description}</div>
                </div>
                <div className="text-sm text-primary font-medium">${feature.price}</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Premium Features */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Premium Features (Optional)</CardTitle>
          <CardDescription>Advanced functionality for complex requirements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {premiumFeatures.map(feature => (
              <button
                key={feature.id}
                type="button"
                onClick={() => toggleFeature(feature.id)}
                className={`w-full flex items-start gap-3 p-3 rounded-lg border-2 transition-all text-left ${
                  formData.features.includes(feature.id)
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  formData.features.includes(feature.id) ? 'border-primary bg-primary' : 'border-muted-foreground'
                }`}>
                  {formData.features.includes(feature.id) && (
                    <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{feature.name}</div>
                  <div className="text-sm text-muted-foreground">{feature.description}</div>
                </div>
                <div className="text-sm text-primary font-medium">${feature.price}</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Custom Requirements */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Custom Requirements (Optional)</CardTitle>
          <CardDescription>Tell us about any specific requirements not listed above</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Describe any custom features, integrations, or specific requirements..."
            value={formData.customRequirements}
            onChange={(e) => setFormData(prev => ({ ...prev, customRequirements: e.target.value }))}
            className="min-h-[100px]"
          />
        </CardContent>
      </Card>

      {/* Calculate Button */}
      <Button type="submit" size="lg" className="w-full">
        <Calculator className="mr-2 h-5 w-5" />
        Calculate Estimate
      </Button>
    </form>
  )
}