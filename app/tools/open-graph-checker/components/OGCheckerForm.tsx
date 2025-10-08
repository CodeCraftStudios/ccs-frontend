'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, Search } from 'lucide-react'
import { getData } from '@/lib/axios'
import { OpenGraphData } from '../types'

interface OGCheckerFormProps {
  onResults: (data: OpenGraphData) => void
  onError: (error: string) => void
}

export function OGCheckerForm({ onResults, onError }: OGCheckerFormProps) {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url.trim()) return

    setLoading(true)
    onError('')

    try {
      const data = await getData<OpenGraphData>(`/api/og-checker/?url=${encodeURIComponent(url)}`)
      onResults(data)
    } catch (err: any) {
      onError(err?.response?.data?.error || err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="border-border/50 shadow-lg">
      <CardHeader>
        <CardTitle>Enter Website URL</CardTitle>
        <CardDescription>Enter a URL to fetch and analyze its Open Graph metadata</CardDescription>
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
                Fetching...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Check
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}