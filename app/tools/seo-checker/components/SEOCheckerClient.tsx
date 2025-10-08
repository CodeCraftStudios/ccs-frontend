'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Share2, Check } from 'lucide-react'
import { SEOCheckerForm } from './SEOCheckerForm'
import { SEOResults } from './SEOResults'
import { SEOResults as SEOResultsType } from '../types'

export function SEOCheckerClient() {
  const [results, setResults] = useState<SEOResultsType | null>(null)
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/tools/seo-checker`
    const shareText = 'Analyze your blog content for SEO with this free checker tool!'

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'SEO Blog Content Checker',
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
    const link = linkToCopy || `${window.location.origin}/tools/seo-checker`
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
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-4">
            <h1 className="text-4xl md:text-5xl font-bold superfont text-glow-primary">
              SEO Content Checker
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
            Analyze your blog content for readability, keyword optimization, and SEO best practices
          </p>
        </div>

        <SEOCheckerForm onResults={setResults} />

        {results && <SEOResults results={results} />}

        {!results && (
          <div className="max-w-4xl mx-auto space-y-8 mt-16">
            <article className="prose prose-invert max-w-none">
              <section className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold superfont mb-4">What is an SEO Content Checker?</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    An SEO content checker is a tool that analyzes your blog posts and articles for search engine optimization factors including readability, keyword usage, heading structure, and content quality. By examining these critical SEO elements, you can identify opportunities to improve your content's rankings in search results and increase organic traffic to your website.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold superfont mb-3">Why Use a Blog SEO Checker?</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Writing great content is only half the battle. Your content needs to be optimized for search engines to reach your target audience. Our SEO content checker analyzes your writing for the factors that search engines like Google use to rank content, including keyword optimization, readability metrics, heading structure, and content length. By optimizing these factors, you can significantly improve your chances of ranking well in search results.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold superfont mb-3">Key SEO Factors Analyzed</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xl font-semibold mb-2">Readability Metrics</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        Our tool analyzes word count, sentence length, paragraph count, and reading time to ensure your content is easy to read and engaging. Good readability keeps visitors on your page longer, which is a positive SEO signal.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">Keyword Optimization</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        Check if your target keyword appears naturally throughout your content with optimal density (0.5-2.5%). The tool verifies keyword placement in critical areas like your introduction and headings.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">Content Structure</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        Proper heading hierarchy (H1, H2, H3) helps search engines understand your content structure and improves user experience. Our checker ensures you're using headings correctly.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-semibold superfont mb-3">How to Use This Tool</h4>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Using our SEO content checker is simple. Paste your blog content into the text area above, optionally add your target keyword, and click "Analyze Content". The tool will evaluate your content across multiple SEO factors and provide a detailed report with your SEO score, errors, warnings, and recommendations for improvement. Use markdown formatting for headings (# for H1, ## for H2) to get accurate structure analysis.
                  </p>
                </div>

                <div>
                  <h5 className="text-lg font-semibold superfont mb-3">SEO Content Best Practices</h5>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span><strong>Aim for 1000+ words</strong> for competitive topics</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span><strong>Use one H1</strong> and multiple H2/H3 subheadings</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span><strong>Keep keyword density</strong> between 0.5-2.5%</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span><strong>Include keywords</strong> in the first paragraph</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span><strong>Write shorter sentences</strong> (15-20 words average)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span><strong>Break up long paragraphs</strong> for better readability</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span><strong>Use bullet points and lists</strong> to improve scannability</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h6 className="text-base font-semibold superfont mb-3">Start Optimizing Your Content</h6>
                  <p className="text-muted-foreground leading-relaxed">
                    Our free SEO content checker helps bloggers, content writers, and marketers create search-optimized content that ranks well in Google and other search engines. Get instant feedback on your writing and learn how to improve your content for better SEO performance. Start analyzing your blog posts today to boost your organic traffic and search engine rankings.
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