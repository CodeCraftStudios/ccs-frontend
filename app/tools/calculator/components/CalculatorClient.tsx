'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Share2, Check } from 'lucide-react'
import { CalculatorForm } from './CalculatorForm'
import { PriceBreakdown } from './PriceBreakdown'
import { CalculatorForm as FormData, PriceBreakdown as PriceData } from '../types'
import { calculatePrice } from '../pricing-config'

export function CalculatorClient() {
  const [breakdown, setBreakdown] = useState<PriceData | null>(null)
  const [copied, setCopied] = useState(false)

  const handleCalculate = (formData: FormData) => {
    const result = calculatePrice(
      formData.projectType,
      formData.websiteType,
      formData.trafficLevel,
      formData.features,
      formData.pages
    )
    setBreakdown(result)

    // Scroll to results
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  const handleReset = () => {
    setBreakdown(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/tools/calculator`
    const shareText = 'Calculate your project cost with this free tool from CodeCraft Studios!'

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Project Cost Calculator',
          text: shareText,
          url: shareUrl,
        })
      } catch (err) {
        handleCopyLink(shareUrl)
      }
    } else {
      handleCopyLink(shareUrl)
    }
  }

  const handleCopyLink = async (linkToCopy?: string) => {
    const link = linkToCopy || `${window.location.origin}/tools/calculator`
    try {
      await navigator.clipboard.writeText(link)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="min-h-screen bg-background py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-4">
            <h1 className="text-4xl md:text-5xl font-bold superfont text-glow-primary">
              Project Cost Calculator
            </h1>
            <Button
              variant="outline"
              size="icon"
              onClick={handleShare}
              className="hover:bg-primary/10 hover:text-primary transition-colors"
              title="Share this tool"
            >
              {copied ? (
                <Check className="h-5 w-5 text-green-500" />
              ) : (
                <Share2 className="h-5 w-5" />
              )}
            </Button>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Get an instant estimate for your website or app project. Answer a few questions to see pricing and timeline.
          </p>
        </div>

        {!breakdown ? (
          <CalculatorForm onCalculate={handleCalculate} />
        ) : (
          <div id="results">
            <PriceBreakdown breakdown={breakdown} onReset={handleReset} />
          </div>
        )}

        {/* SEO Content - Only show when no results */}
        {!breakdown && (
          <div className="max-w-4xl mx-auto space-y-8 mt-16">
            <article className="prose prose-invert max-w-none">
              <section className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold superfont mb-4">How Our Pricing Calculator Works</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Our project cost calculator uses industry-standard pricing models combined with our extensive experience delivering web and mobile solutions. By answering a few simple questions about your project requirements, traffic expectations, and desired features, you'll receive an accurate estimate of development costs and timeline.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold superfont mb-3">Transparent, No-Surprise Pricing</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    At CodeCraft Studios, we believe in transparent pricing. Our calculator breaks down costs by component—base development, additional pages, features, and infrastructure requirements. This transparency helps you understand exactly what you're paying for and allows you to adjust your project scope to fit your budget.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold superfont mb-3">Factors That Affect Project Cost</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xl font-semibold mb-2">Project Complexity</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        Basic websites with standard features start at $800, while custom enterprise solutions with advanced functionality can range from $4,000 to $15,000+. The complexity of your requirements directly impacts development time and cost.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">Expected Traffic Volume</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        Higher traffic requires more robust infrastructure, caching strategies, and performance optimization. Projects expecting significant traffic receive architecture upgrades to ensure reliability and speed under load.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">Custom Features</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        Features like payment processing, user authentication, booking systems, and custom integrations add development time and cost. Our calculator itemizes each feature so you can prioritize what matters most.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-semibold superfont mb-3">What Makes CCS Different</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span><strong>Custom-Coded Solutions:</strong> We never use templates. Every project is built from scratch using modern frameworks like React, Next.js, and Django.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span><strong>You Own Everything:</strong> Full source code access, hosting control, and domain ownership. No lock-in, no licenses, no games.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span><strong>Built for Scale:</strong> Our architecture is designed to grow with your business, from startup to enterprise.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span><strong>Post-Launch Support:</strong> 30-day support included, plus affordable rates for ongoing updates and maintenance.</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h5 className="text-lg font-semibold superfont mb-3">Ready to Get Started?</h5>
                  <p className="text-muted-foreground leading-relaxed">
                    Use our calculator above to get an instant estimate, then contact us to discuss your project in detail. We'll provide a detailed quote, timeline, and answer any questions about the development process. Whether you're a startup launching your first product or an established business upgrading your digital presence, we're here to help bring your vision to life.
                  </p>
                </div>
              </section>
            </article>
          </div>
        )}
      </div>
    </div>
  )
}