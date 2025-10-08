'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import {
  Loader2,
  Search,
  AlertCircle,
  Share2,
  Check,
  TrendingUp,
  FileText,
  Image as ImageIcon,
  Link as LinkIcon,
  Shield,
  Zap,
  AlertTriangle,
  CheckCircle2,
  XCircle
} from 'lucide-react'
import { getData } from '@/lib/axios'

interface WebsiteTestResults {
  performance: {
    load_time: number
    page_size: number
    page_size_kb: number
    status_code: number
  }
  seo: {
    title: string
    title_length: number
    description: string
    description_length: number
    canonical: string
    robots: string
    viewport: string
    lang: string
    favicon: boolean
    structured_data_count: number
  }
  content: {
    headings: {
      h1: { count: number; texts: string[] }
      h2: { count: number; texts: string[] }
      h3: { count: number }
      h4: { count: number }
      h5: { count: number }
      h6: { count: number }
    }
    images: {
      total: number
      without_alt: number
    }
    links: {
      internal: number
      external: number
      total: number
    }
    word_count: number
  }
  meta: {
    open_graph: Record<string, string>
    twitter_card: Record<string, string>
  }
  security: {
    https: boolean
    headers: Record<string, string>
  }
  score: {
    total: number
    errors: number
    warnings: number
    grade: string
  }
  errors: string[]
  warnings: string[]
}

export default function WebsiteTest() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<WebsiteTestResults | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url.trim()) return

    setLoading(true)
    setError(null)
    setResults(null)

    try {
      const data = await getData<WebsiteTestResults>(`/api/website-test/?url=${encodeURIComponent(url)}`)
      setResults(data)
    } catch (err: any) {
      setError(err?.response?.data?.error || err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/tools/website-test`
    const shareText = 'Analyze your website\'s SEO, performance, and content with this free tool!'

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Website SEO & Performance Analyzer',
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
    const link = linkToCopy || `${window.location.origin}/tools/website-test`
    try {
      await navigator.clipboard.writeText(link)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A': return 'text-green-500'
      case 'B': return 'text-blue-500'
      case 'C': return 'text-yellow-500'
      case 'D': return 'text-orange-500'
      case 'F': return 'text-red-500'
      default: return 'text-muted-foreground'
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500'
    if (score >= 80) return 'text-blue-500'
    if (score >= 70) return 'text-yellow-500'
    if (score >= 60) return 'text-orange-500'
    return 'text-red-500'
  }

  return (
    <div className="min-h-screen py-32 bg-background px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-4">
            <h1 className="text-4xl md:text-5xl font-bold superfont text-glow-primary">
              Website Analyzer
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
            Comprehensive SEO, performance, and content analysis for your website
          </p>
        </div>

        <Card className="border-border/50 shadow-lg">
          <CardHeader>
            <CardTitle>Enter Website URL</CardTitle>
            <CardDescription>Enter a URL to analyze SEO, performance, content, and technical aspects</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex gap-4">
              <Input
                type="url"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1"
                disabled={loading}
              />
              <Button type="submit" disabled={loading || !url.trim()}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Analyze
                  </>
                )}
              </Button>
            </form>
            {error && (
              <p className="mt-4 text-sm text-destructive-foreground bg-destructive/10 p-3 rounded-md">
                {error}
              </p>
            )}
          </CardContent>
        </Card>

        {results && (
          <>
            {/* Overall Score */}
            <Card className="border-border/50 shadow-lg bg-gradient-to-br from-primary/5 to-accent/5">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-center md:text-left">
                    <h3 className="text-lg font-semibold text-muted-foreground mb-2">Overall Score</h3>
                    <div className="flex items-center gap-4">
                      <span className={`text-6xl font-bold superfont ${getScoreColor(results.score.total)}`}>
                        {results.score.total}
                      </span>
                      <div className="text-left">
                        <div className={`text-4xl font-bold ${getGradeColor(results.score.grade)}`}>
                          {results.score.grade}
                        </div>
                        <div className="text-sm text-muted-foreground">Grade</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-8">
                    <div className="text-center">
                      <div className="flex items-center gap-2 text-red-500 mb-1">
                        <XCircle className="w-5 h-5" />
                        <span className="text-2xl font-bold">{results.score.errors}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">Errors</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center gap-2 text-yellow-500 mb-1">
                        <AlertTriangle className="w-5 h-5" />
                        <span className="text-2xl font-bold">{results.score.warnings}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">Warnings</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Errors and Warnings */}
            {(results.errors.length > 0 || results.warnings.length > 0) && (
              <div className="grid gap-4 md:grid-cols-2">
                {results.errors.length > 0 && (
                  <Alert variant="destructive">
                    <XCircle className="h-4 w-4" />
                    <AlertTitle>Errors ({results.errors.length})</AlertTitle>
                    <AlertDescription>
                      <ul className="list-disc list-inside space-y-1 mt-2">
                        {results.errors.map((err, idx) => (
                          <li key={idx} className="text-sm">{err}</li>
                        ))}
                      </ul>
                    </AlertDescription>
                  </Alert>
                )}
                {results.warnings.length > 0 && (
                  <Alert className="border-yellow-500/50 bg-yellow-500/5">
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    <AlertTitle className="text-yellow-500">Warnings ({results.warnings.length})</AlertTitle>
                    <AlertDescription>
                      <ul className="list-disc list-inside space-y-1 mt-2">
                        {results.warnings.map((warn, idx) => (
                          <li key={idx} className="text-sm">{warn}</li>
                        ))}
                      </ul>
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}

            {/* Analysis Sections */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Performance */}
              <Card className="border-border/50">
                <CardHeader className="bg-accent/30">
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary" />
                    Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 pt-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Load Time:</span>
                    <span className="font-semibold">{results.performance.load_time}s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Page Size:</span>
                    <span className="font-semibold">{results.performance.page_size_kb} KB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status Code:</span>
                    <span className="font-semibold">{results.performance.status_code}</span>
                  </div>
                </CardContent>
              </Card>

              {/* SEO Basics */}
              <Card className="border-border/50">
                <CardHeader className="bg-accent/30">
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    SEO Basics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 pt-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-muted-foreground">Title:</span>
                      <span className="text-sm">{results.seo.title_length} chars</span>
                    </div>
                    <p className="text-sm bg-muted/30 p-2 rounded truncate">{results.seo.title || 'N/A'}</p>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-muted-foreground">Description:</span>
                      <span className="text-sm">{results.seo.description_length} chars</span>
                    </div>
                    <p className="text-sm bg-muted/30 p-2 rounded line-clamp-2">{results.seo.description || 'N/A'}</p>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Viewport:</span>
                    <span className="font-semibold">{results.seo.viewport ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <XCircle className="w-4 h-4 text-red-500" />}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Content Analysis */}
              <Card className="border-border/50">
                <CardHeader className="bg-accent/30">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Content
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 pt-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Word Count:</span>
                    <span className="font-semibold">{results.content.word_count}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="bg-muted/30 p-2 rounded text-center">
                      <div className="font-semibold">{results.content.headings.h1.count}</div>
                      <div className="text-muted-foreground text-xs">H1</div>
                    </div>
                    <div className="bg-muted/30 p-2 rounded text-center">
                      <div className="font-semibold">{results.content.headings.h2.count}</div>
                      <div className="text-muted-foreground text-xs">H2</div>
                    </div>
                    <div className="bg-muted/30 p-2 rounded text-center">
                      <div className="font-semibold">{results.content.headings.h3.count}</div>
                      <div className="text-muted-foreground text-xs">H3</div>
                    </div>
                  </div>
                  {results.content.headings.h1.texts.length > 0 && (
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">H1 Tags:</div>
                      {results.content.headings.h1.texts.map((text, idx) => (
                        <p key={idx} className="text-xs bg-muted/30 p-2 rounded mb-1 truncate">{text}</p>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Images & Links */}
              <Card className="border-border/50">
                <CardHeader className="bg-accent/30">
                  <CardTitle className="flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-primary" />
                    Images & Links
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 pt-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Images:</span>
                    <span className="font-semibold">{results.content.images.total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Images without Alt:</span>
                    <span className="font-semibold text-yellow-500">{results.content.images.without_alt}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Internal Links:</span>
                    <span className="font-semibold">{results.content.links.internal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">External Links:</span>
                    <span className="font-semibold">{results.content.links.external}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Security */}
              <Card className="border-border/50">
                <CardHeader className="bg-accent/30">
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">HTTPS:</span>
                    {results.security.https ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground text-sm">X-Frame-Options:</span>
                    {results.security.headers['x-frame-options'] ? (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground text-sm">Content-Security-Policy:</span>
                    {results.security.headers['content-security-policy'] ? (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Technical SEO */}
              <Card className="border-border/50">
                <CardHeader className="bg-accent/30">
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Technical SEO
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Favicon:</span>
                    {results.seo.favicon ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Canonical URL:</span>
                    {results.seo.canonical ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Language Tag:</span>
                    {results.seo.lang ? (
                      <span className="font-semibold text-green-500">{results.seo.lang}</span>
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Structured Data:</span>
                    <span className="font-semibold">{results.seo.structured_data_count} items</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Open Graph & Twitter Cards */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Social Media Meta Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <span className="text-primary">Open Graph</span>
                      <span className="text-xs text-muted-foreground">({Object.keys(results.meta.open_graph).length} tags)</span>
                    </h4>
                    {Object.keys(results.meta.open_graph).length > 0 ? (
                      <div className="space-y-1 text-sm">
                        {Object.entries(results.meta.open_graph).slice(0, 5).map(([key, value]) => (
                          <div key={key} className="bg-muted/30 p-2 rounded">
                            <span className="text-primary font-mono text-xs">{key}:</span>
                            <p className="text-muted-foreground truncate">{value}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No Open Graph tags found</p>
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <span className="text-primary">Twitter Card</span>
                      <span className="text-xs text-muted-foreground">({Object.keys(results.meta.twitter_card).length} tags)</span>
                    </h4>
                    {Object.keys(results.meta.twitter_card).length > 0 ? (
                      <div className="space-y-1 text-sm">
                        {Object.entries(results.meta.twitter_card).slice(0, 5).map(([key, value]) => (
                          <div key={key} className="bg-muted/30 p-2 rounded">
                            <span className="text-primary font-mono text-xs">{key}:</span>
                            <p className="text-muted-foreground truncate">{value}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No Twitter Card tags found</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* SEO Content Section */}
        <div className="max-w-4xl mx-auto space-y-8 mt-16">
          <article className="prose prose-invert max-w-none">
            <section className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold superfont mb-4">What is a Website Analyzer?</h2>
                <p className="text-muted-foreground leading-relaxed">
                  A website analyzer is a comprehensive SEO and performance testing tool that evaluates your website across multiple critical dimensions including search engine optimization, page performance, content quality, technical implementation, and security. By analyzing these factors, you can identify issues that may be preventing your website from ranking well in search engines or providing an optimal user experience.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold superfont mb-3">Why Website Analysis Matters</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Regular website analysis is essential for maintaining and improving your online presence. Search engines like Google use hundreds of ranking factors to determine where your pages appear in search results. A comprehensive website test helps you identify SEO issues, performance bottlenecks, missing meta tags, broken links, and security vulnerabilities that could be hurting your rankings and user experience.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our free website analyzer performs over 20 different checks across SEO, performance, content, and technical factors, providing you with actionable insights to improve your website's search engine visibility and overall quality.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold superfont mb-3">Key Areas of Analysis</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Performance Analysis</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Page load speed is a critical ranking factor and significantly impacts user experience. Our tool measures your website's load time, page size, and response status to help you identify performance issues that could be slowing down your site.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">SEO Fundamentals</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      We analyze essential SEO elements including title tags, meta descriptions, canonical URLs, viewport settings, language attributes, and structured data. These fundamental elements are crucial for helping search engines understand and properly index your content.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Content Quality</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Content is king in SEO. Our analyzer checks your heading structure (H1-H6), word count, image alt attributes, and internal/external link distribution to ensure your content is well-structured and optimized for both users and search engines.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Security & Technical SEO</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      We verify HTTPS implementation, security headers, favicon presence, and other technical SEO factors that contribute to your website's trustworthiness and search engine rankings.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold superfont mb-3">How to Use This Website Analyzer</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Using our website analyzer is simple. Just enter your website URL in the input field above and click "Analyze". Our tool will fetch your page, analyze all critical elements, and provide you with a comprehensive report including an overall score, detailed metrics for each category, and a list of errors and warnings that need attention.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  The analyzer provides an overall grade (A-F) based on your website's performance across all tested factors. Errors are critical issues that should be fixed immediately, while warnings indicate areas for improvement that could enhance your SEO and user experience.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-semibold superfont mb-3">Understanding Your Results</h4>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Your website analysis results are organized into clear categories:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span><strong>Overall Score:</strong> A numerical score (0-100) and letter grade reflecting your website's overall quality</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span><strong>Errors:</strong> Critical issues that significantly impact SEO or functionality (deduct 10 points each)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span><strong>Warnings:</strong> Recommended improvements that could enhance your website (deduct 3 points each)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span><strong>Category Metrics:</strong> Detailed breakdowns of performance, SEO, content, and security factors</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-semibold superfont mb-3">Common SEO Issues Detected</h4>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Our website analyzer identifies many common SEO problems including:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span><strong>Missing or poorly optimized title tags and meta descriptions</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span><strong>Multiple H1 tags or missing H1 entirely</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span><strong>Images without alt attributes (bad for accessibility and SEO)</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span><strong>Missing viewport meta tag (critical for mobile SEO)</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span><strong>Lack of HTTPS encryption</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span><strong>Missing canonical URLs and structured data</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span><strong>Insufficient content or poor heading structure</strong></span>
                  </li>
                </ul>
              </div>

              <div>
                <h5 className="text-lg font-semibold superfont mb-3">Best Practices for Website Optimization</h5>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  To achieve the best results from your website analysis:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">1.</span>
                    <span><strong>Fix Errors First:</strong> Address all critical errors before focusing on warnings</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">2.</span>
                    <span><strong>Optimize Title Tags:</strong> Keep them between 30-60 characters with your target keyword</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">3.</span>
                    <span><strong>Write Compelling Meta Descriptions:</strong> 150-160 characters that encourage clicks</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">4.</span>
                    <span><strong>Use Proper Heading Structure:</strong> One H1, then H2-H6 in hierarchical order</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">5.</span>
                    <span><strong>Add Alt Text to All Images:</strong> Improves accessibility and SEO</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">6.</span>
                    <span><strong>Implement HTTPS:</strong> Essential for security and SEO rankings</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">7.</span>
                    <span><strong>Test Regularly:</strong> Run analysis after making changes to verify improvements</span>
                  </li>
                </ul>
              </div>

              <div>
                <h6 className="text-base font-semibold superfont mb-3">Why Choose Our Free Website Analyzer?</h6>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Our comprehensive website analyzer is completely free and provides professional-grade analysis comparable to paid SEO tools. We check over 20 different factors across performance, SEO, content quality, technical implementation, and security, giving you a complete picture of your website's health.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Whether you're a website owner looking to improve your SEO, a developer checking technical implementation, or a digital marketer auditing client websites, our tool provides the insights you need to make data-driven improvements. Start analyzing your website today and discover opportunities to boost your search engine rankings and user experience.
                </p>
              </div>
            </section>
          </article>
        </div>
      </div>
    </div>
  )
}