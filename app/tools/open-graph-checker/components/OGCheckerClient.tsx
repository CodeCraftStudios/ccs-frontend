'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Share2, Check, AlertCircle } from 'lucide-react'
import { OGCheckerForm } from './OGCheckerForm'
import { OGPreviews } from './OGPreviews'
import { OpenGraphData } from '../types'
import { SEOContent } from './SEOContent'

export function OGCheckerClient() {
  const [metadata, setMetadata] = useState<OpenGraphData | null>(null)
  const [error, setError] = useState<string>('')
  const [url, setUrl] = useState<string>('')
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/tools/open-graph-checker`
    const shareText = 'Check your website\'s Open Graph metadata with this free tool!'

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Open Graph Checker',
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
    const link = linkToCopy || `${window.location.origin}/tools/open-graph-checker`
    try {
      await navigator.clipboard.writeText(link)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleResults = (data: OpenGraphData) => {
    setMetadata(data)
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-4">
            <h1 className="text-4xl md:text-5xl font-bold superfont text-glow-primary">
              Open Graph Checker
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
            Preview how your website appears when shared on social media platforms
          </p>
        </div>

        {/* Cache Warning Alert */}
        <Alert className="border-accent-orange/50 bg-accent-orange/5">
          <AlertCircle className="h-4 w-4 text-accent-orange" />
          <AlertTitle className="text-accent-orange">Important: Metadata Caching</AlertTitle>
          <AlertDescription>
            Social media platforms (Facebook, X/Twitter, LinkedIn) and search engines cache website metadata for performance.
            If you recently updated your Open Graph tags, these platforms may still show the old values for several hours or days.
            To refresh cached data, use platform-specific debugging tools:
            <div className="mt-2 space-y-1 text-xs">
              <div>• <strong>Facebook:</strong> <a href="https://developers.facebook.com/tools/debug/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Facebook Sharing Debugger</a></div>
              <div>• <strong>Twitter/X:</strong> <a href="https://cards-dev.twitter.com/validator" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Twitter Card Validator</a></div>
              <div>• <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/post-inspector/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">LinkedIn Post Inspector</a></div>
            </div>
          </AlertDescription>
        </Alert>

        <OGCheckerForm onResults={handleResults} onError={setError} />

        {error && (
          <p className="text-sm text-destructive-foreground bg-destructive/10 p-3 rounded-md">
            {error}
          </p>
        )}

        {metadata && <OGPreviews metadata={metadata} url={url} />}

        <SEOContent />
      </div>
    </div>
  )
}