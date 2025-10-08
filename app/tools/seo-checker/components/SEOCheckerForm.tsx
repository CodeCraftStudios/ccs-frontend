'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Label } from '@/components/ui/label'
import { Loader2, BarChart3, XCircle } from 'lucide-react'
import { postData } from '@/lib/axios'
import { SERVER_ENDPOINT } from '@/lib/consts'
import { SEOResults } from '../types'

declare global {
  interface Window {
    tinymce: any
  }
}

interface SEOCheckerFormProps {
  onResults: (results: SEOResults) => void
}

export function SEOCheckerForm({ onResults }: SEOCheckerFormProps) {
  const [content, setContent] = useState('')
  const [keyword, setKeyword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [editorLoaded, setEditorLoaded] = useState(false)
  const editorRef = useRef<any>(null)

  useEffect(() => {
    // Check if TinyMCE is already loaded
    if (window.tinymce) {
      setEditorLoaded(true)
      setTimeout(initializeTinyMCE, 100)
      return
    }

    // Load TinyMCE from Django backend
    const script = document.createElement('script')
    script.src = `${SERVER_ENDPOINT}/static/tinymce/tinymce.min.js`
    script.async = true
    script.onload = () => {
      console.log('TinyMCE script loaded')
      setEditorLoaded(true)
      setTimeout(initializeTinyMCE, 100)
    }
    script.onerror = (error) => {
      console.error('Failed to load TinyMCE:', error)
      setError('Failed to load editor. Please refresh the page.')
    }
    document.head.appendChild(script)

    return () => {
      if (window.tinymce && editorRef.current) {
        window.tinymce.remove(editorRef.current)
      }
    }
  }, [])

  const initializeTinyMCE = () => {
    if (!window.tinymce) return

    const baseUrl = `${SERVER_ENDPOINT}/static/tinymce`

    window.tinymce.init({
      selector: '#seo-content-editor',
      height: 400,
      menubar: false,
      base_url: baseUrl,
      suffix: '.min',
      skin_url: `${baseUrl}/skins/ui/oxide`,
      content_css: `${baseUrl}/skins/content/default/content.min.css`,
      plugins: [
        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
        'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
      ],
      toolbar: 'undo redo | blocks | ' +
        'bold italic forecolor | alignleft aligncenter ' +
        'alignright alignjustify | bullist numlist outdent indent | ' +
        'removeformat | code | help',
      content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px; color: #000 !important; background-color: #fff !important; padding: 10px; }',
      setup: (editor: any) => {
        editorRef.current = editor
        editor.on('init', () => {
          console.log('TinyMCE initialized')
          // Set initial content color explicitly
          const body = editor.getBody()
          if (body) {
            body.style.color = '#000'
            body.style.backgroundColor = '#fff'
          }
        })
        editor.on('change keyup paste', () => {
          setContent(editor.getContent())
        })
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    setLoading(true)
    setError(null)

    try {
      const data = await postData<SEOResults, { content: string; keyword: string }>('/api/seo-blog-checker/', {
        content,
        keyword
      })
      onResults(data)
    } catch (err: any) {
      setError(err?.response?.data?.error || err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="border-border/50 shadow-lg">
      <CardHeader>
        <CardTitle>Paste Your Content</CardTitle>
        <CardDescription>
          Write or paste your blog content below. Use markdown headings (# for H1, ## for H2, etc.)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="keyword">Target Keyword (Optional)</Label>
          <Input
            id="keyword"
            placeholder="e.g., SEO content optimization"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            disabled={loading}
          />
          <p className="text-xs text-muted-foreground">
            The main keyword you want to rank for in search engines
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Blog Content</Label>
          <div className="relative">
            <textarea
              id="seo-content-editor"
              className="w-full"
            />
            {!editorLoaded && (
              <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            Use the rich text editor to format your content. HTML tags will be analyzed for SEO.
          </p>
        </div>

        <Button onClick={handleSubmit} disabled={loading || !content.trim()} className="w-full">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <BarChart3 className="mr-2 h-4 w-4" />
              Analyze Content
            </>
          )}
        </Button>

        {error && (
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}