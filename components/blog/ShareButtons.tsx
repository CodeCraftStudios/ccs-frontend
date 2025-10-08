"use client"

import { useState } from "react"
import { Share2, Twitter, Check, Link as LinkIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ShareButtonsProps {
  title: string
  url: string
  description?: string
}

export default function ShareButtons({ title, url, description }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
    window.open(twitterUrl, '_blank', 'noopener,noreferrer,width=600,height=400')
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const nativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: description || title,
          url: url,
        })
      } catch (err) {
        // User cancelled or share failed
        console.log('Share cancelled or failed:', err)
      }
    } else {
      // Fallback to copy to clipboard
      copyToClipboard()
    }
  }

  return (
    <div className="flex items-center gap-3 pt-4">
      <span className="text-sm text-muted-foreground flex items-center gap-2">
        <Share2 className="h-4 w-4" />
        Share:
      </span>

      <Button
        size="sm"
        variant="outline"
        className="gap-2 bg-transparent border-primary/30 hover:bg-primary/10"
        onClick={shareOnTwitter}
        title="Share on X (Twitter)"
      >
        <Twitter className="h-4 w-4" />
      </Button>

      <Button
        size="sm"
        variant="outline"
        className="gap-2 bg-transparent border-primary/30 hover:bg-primary/10"
        onClick={copyToClipboard}
        title="Copy link"
      >
        {copied ? (
          <>
            <Check className="h-4 w-4 text-green-500" />
            <span className="text-xs text-green-500">Copied!</span>
          </>
        ) : (
          <LinkIcon className="h-4 w-4" />
        )}
      </Button>

      {/* Native Share Button (mobile) */}
      {typeof navigator !== 'undefined' && navigator.share && (
        <Button
          size="sm"
          variant="outline"
          className="gap-2 bg-transparent border-primary/30 hover:bg-primary/10 md:hidden"
          onClick={nativeShare}
          title="Share"
        >
          <Share2 className="h-4 w-4" />
          <span className="text-xs">Share</span>
        </Button>
      )}
    </div>
  )
}
