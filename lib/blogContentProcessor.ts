import { SERVER_ENDPOINT } from "@/lib/consts"

/**
 * Server-side blog content processing utilities
 * Optimized for SSR and SEO with purple/primary theme
 */

export interface ProcessedBlogContent {
  html: string
  readingTime: string
  wordCount: number
  hasImages: boolean
  firstImageUrl?: string
  headings: Array<{ level: number; text: string; id: string }>
  excerpt: string
}

/**
 * Clean up list items by removing nested paragraphs and reorganizing citation links
 */
function cleanupListItems(content: string): string {
  // Process each list item
  return content.replace(
    /<li[^>]*>([\s\S]*?)<\/li>/gi,
    (match, innerContent) => {
      let cleaned = innerContent

      // Extract all citation links
      const citations: string[] = []
      cleaned = cleaned.replace(
        /<span[^>]*data-testid="webpage-citation-pill"[^>]*>[\s\S]*?<\/span><\/span>/gi,
        (citationMatch) => {
          // Extract the readable citation text (e.g., "Tom's Guide +1")
          const textMatch = citationMatch.match(/text-center">(.*?)<\/span>/)
          if (textMatch) {
            citations.push(textMatch[1])
          }
          return '' // Remove from inline position
        }
      )

      // Remove nested <p> tags but keep their content
      cleaned = cleaned.replace(/<p[^>]*>/gi, '')
      cleaned = cleaned.replace(/<\/p>/gi, '')

      // Clean up multiple spaces and line breaks
      cleaned = cleaned.replace(/\s+/g, ' ').trim()

      // Add citations at the end in a cleaner format
      if (citations.length > 0) {
        const uniqueCitations = [...new Set(citations)]
        cleaned += ` [${uniqueCitations.join(', ')}]`
      }

      // Extract the original class from the li tag
      const classMatch = match.match(/class="([^"]*)"/)
      const liClass = classMatch ? classMatch[1] : 'text-muted-foreground'

      return `<li class="${liClass}">${cleaned}</li>`
    }
  )
}

/**
 * Add Tailwind classes to tables and their elements for proper styling
 */
function addTableClasses(content: string): string {
  let processed = content

  // Add wrapper div for mobile scroll and add classes to table
  processed = processed.replace(
    /<table([^>]*)>([\s\S]*?)<\/table>/gi,
    (match, attrs, tableContent) => {
      // Table classes with rounded corners and purple border
      const tableClasses = 'w-full my-8 rounded-xl border-2 border-primary/30 bg-card/30 overflow-hidden'

      // Check if table has existing classes
      const existingClassMatch = attrs.match(/class="([^"]*)"/)
      let newAttrs = attrs

      if (existingClassMatch) {
        newAttrs = attrs.replace(/class="([^"]*)"/, `class="${existingClassMatch[1]} ${tableClasses}"`)
      } else {
        newAttrs = `${attrs} class="${tableClasses}"`
      }

      // Wrap in scrollable div for mobile with rounded corners
      return `<div class="overflow-x-auto -webkit-overflow-scrolling-touch my-8 rounded-xl"><table${newAttrs}>${tableContent}</table></div>`
    }
  )

  // Add classes to thead
  processed = processed.replace(
    /<thead([^>]*)>/gi,
    (match, attrs) => {
      const classes = 'bg-gradient-to-r from-primary/20 to-primary/10'
      if (attrs.includes('class=')) {
        return match.replace(/class="([^"]*)"/, `class="$1 ${classes}"`)
      }
      return `<thead class="${classes}">`
    }
  )

  // Add classes to th with stronger borders
  processed = processed.replace(
    /<th([^>]*)>/gi,
    (match, attrs) => {
      const classes = 'px-4 py-3 text-left font-semibold text-white text-sm md:text-base border-b-2 border-primary/60 border-r border-border last:border-r-0 whitespace-nowrap'
      if (attrs.includes('class=')) {
        return match.replace(/class="([^"]*)"/, `class="$1 ${classes}"`)
      }
      return `<th class="${classes}">`
    }
  )

  // Add classes to tbody
  processed = processed.replace(
    /<tbody([^>]*)>/gi,
    (match, attrs) => {
      const classes = ''
      if (attrs.includes('class=')) {
        return match.replace(/class="([^"]*)"/, `class="$1 ${classes}"`)
      }
      return `<tbody class="${classes}">`
    }
  )

  // Add classes to tr
  processed = processed.replace(
    /<tr([^>]*)>/gi,
    (match, attrs) => {
      const classes = 'transition-all duration-200 hover:bg-primary/5 odd:bg-card/30 even:bg-transparent'
      if (attrs.includes('class=')) {
        return match.replace(/class="([^"]*)"/, `class="$1 ${classes}"`)
      }
      return `<tr class="${classes}">`
    }
  )

  // Add classes to td with stronger borders
  processed = processed.replace(
    /<td([^>]*)>/gi,
    (match, attrs) => {
      const classes = 'px-4 py-3 text-muted-foreground text-sm md:text-base border-b border-border/50 border-r border-border/40 last:border-r-0'
      if (attrs.includes('class=')) {
        return match.replace(/class="([^"]*)"/, `class="$1 ${classes}"`)
      }
      return `<td class="${classes}">`
    }
  )

  return processed
}

/**
 * Process HTML content for server-side rendering
 * Adds proper classes, fixes image URLs, and optimizes for SEO
 */
export function processBlogContentForSSR(content: string): string {
  if (!content) return ''

  try {
    let processedContent = content

    // Clean up list items first
    processedContent = cleanupListItems(processedContent)

    // Add Tailwind classes to tables
    processedContent = addTableClasses(processedContent)

    // Fix image URLs - handle both relative paths and malformed relative paths
    processedContent = processedContent.replace(
      /src="(?!https?:\/\/)([^"]*?)"/g,
      (match, path) => {
        // Handle paths that start with multiple ../
        if (path.startsWith('../')) {
          const cleanPath = path.replace(/^(\.\.\/)+/, '/')
          return `src="${SERVER_ENDPOINT}${cleanPath}"`
        }

        // Handle normal relative paths (ensure they start with /)
        const normalizedPath = path.startsWith('/') ? path : `/${path}`
        return `src="${SERVER_ENDPOINT}${normalizedPath}"`
      }
    )

    // Fix video sources
    processedContent = processedContent.replace(
      /<source([^>]*?)src="(?!https?:\/\/)([^"]*?)"/g,
      (match, before, path) => {
        const normalizedPath = path.startsWith('/') ? path : `/${path}`
        return `<source${before}src="${SERVER_ENDPOINT}${normalizedPath}"`
      }
    )

    // Fix audio sources
    processedContent = processedContent.replace(
      /<audio([^>]*?)src="(?!https?:\/\/)([^"]*?)"/g,
      (match, before, path) => {
        const normalizedPath = path.startsWith('/') ? path : `/${path}`
        return `<audio${before}src="${SERVER_ENDPOINT}${normalizedPath}"`
      }
    )

    // Add proper loading attributes to images
    let isFirstImage = true
    processedContent = processedContent.replace(
      /<img([^>]*?)>/gi,
      (match, attributes) => {
        // Check if loading attribute already exists
        if (attributes.includes('loading=')) {
          return match
        }

        const loading = isFirstImage ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"'
        isFirstImage = false

        // Add alt text if missing (important for SEO)
        let finalAttributes = attributes
        if (!attributes.includes('alt=')) {
          finalAttributes += ' alt="Blog image"'
        }

        // Add decoding attribute for better performance
        if (!finalAttributes.includes('decoding=')) {
          finalAttributes += ' decoding="async"'
        }

        return `<img${finalAttributes} ${loading}>`
      }
    )

    return processedContent
  } catch (error) {
    console.error("Error processing blog content:", error)
    return content
  }
}

/**
 * Process portfolio overview content for SSR
 */
export function processPortfolioOverviewForSSR(content: string): string {
  if (!content) return ''

  try {
    let processedContent = content

    // Fix image URLs
    processedContent = processedContent.replace(
      /src="(?!https?:\/\/)([^"]*?)"/g,
      (match, path) => {
        if (path.startsWith('../')) {
          const cleanPath = path.replace(/^(\.\.\/)+/, '/')
          return `src="${SERVER_ENDPOINT}${cleanPath}"`
        }

        const normalizedPath = path.startsWith('/') ? path : `/${path}`
        return `src="${SERVER_ENDPOINT}${normalizedPath}"`
      }
    )

    // Fix video sources
    processedContent = processedContent.replace(
      /<source([^>]*?)src="(?!https?:\/\/)([^"]*?)"/g,
      (match, before, path) => {
        const normalizedPath = path.startsWith('/') ? path : `/${path}`
        return `<source${before}src="${SERVER_ENDPOINT}${normalizedPath}"`
      }
    )

    // Add loading attributes to images
    let isFirstImage = true
    processedContent = processedContent.replace(
      /<img([^>]*?)>/gi,
      (match, attributes) => {
        if (attributes.includes('loading=')) {
          return match
        }

        const loading = isFirstImage ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"'
        isFirstImage = false

        let finalAttributes = attributes
        if (!attributes.includes('alt=')) {
          finalAttributes += ' alt="Portfolio image"'
        }

        if (!finalAttributes.includes('decoding=')) {
          finalAttributes += ' decoding="async"'
        }

        return `<img${finalAttributes} ${loading}>`
      }
    )

    return processedContent
  } catch (error) {
    console.error("Error processing portfolio overview:", error)
    return content
  }
}

/**
 * Calculate reading time based on content
 * Uses average reading speed of 200 words per minute
 */
export function calculateBlogReadingTime(content: string): string {
  if (!content) return "1 min read"

  try {
    // Remove HTML tags and get plain text
    const textContent = content
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove scripts
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '') // Remove styles
      .replace(/<[^>]*>/g, ' ') // Remove HTML tags
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim()

    const wordCount = textContent
      .split(/\s+/)
      .filter(word => word.length > 0).length

    // Average reading speed: 200 words per minute
    const readingTimeMin = Math.max(1, Math.ceil(wordCount / 200))

    return `${readingTimeMin} min read`
  } catch (error) {
    console.error("Error calculating reading time:", error)
    return "5 min read"
  }
}

/**
 * Extract all heading text for table of contents
 */
export function extractBlogHeadings(content: string): Array<{ level: number; text: string; id: string }> {
  const headings: Array<{ level: number; text: string; id: string }> = []

  try {
    const headingMatches = content.match(/<h([1-6])([^>]*?)>(.*?)<\/h[1-6]>/gi)

    if (headingMatches) {
      headingMatches.forEach(match => {
        const levelMatch = match.match(/<h([1-6])/)
        const textMatch = match.match(/>(.*?)<\/h[1-6]>/i)

        if (levelMatch && textMatch) {
          const level = parseInt(levelMatch[1])
          const text = textMatch[1].replace(/<[^>]*>/g, '').trim()
          const id = text
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, '')
            .replace(/\s+/g, '-')
            .substring(0, 50)

          headings.push({ level, text, id })
        }
      })
    }
  } catch (error) {
    console.error("Error extracting headings:", error)
  }

  return headings
}

/**
 * Generate SEO-friendly excerpt from content
 */
export function generateBlogExcerpt(content: string, maxLength: number = 160): string {
  if (!content) return ''

  try {
    // Remove HTML tags and get plain text
    const textContent = content
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()

    if (textContent.length <= maxLength) {
      return textContent
    }

    // Find the last complete sentence within the limit
    const excerpt = textContent.substring(0, maxLength)
    const lastSentenceEnd = Math.max(
      excerpt.lastIndexOf('.'),
      excerpt.lastIndexOf('!'),
      excerpt.lastIndexOf('?')
    )

    if (lastSentenceEnd > maxLength * 0.7) {
      return excerpt.substring(0, lastSentenceEnd + 1)
    }

    // If no complete sentence, find last word boundary
    const lastSpaceIndex = excerpt.lastIndexOf(' ')
    if (lastSpaceIndex > maxLength * 0.8) {
      return excerpt.substring(0, lastSpaceIndex) + '...'
    }

    return excerpt + '...'
  } catch (error) {
    console.error("Error generating excerpt:", error)
    return content.substring(0, maxLength) + '...'
  }
}

/**
 * Extract comprehensive blog content metadata
 */
export function extractBlogContentMetadata(content: string): ProcessedBlogContent {
  const processedHtml = processBlogContentForSSR(content)
  const readingTime = calculateBlogReadingTime(content)
  const headings = extractBlogHeadings(content)
  const excerpt = generateBlogExcerpt(content)

  // Get plain text for word count
  const textContent = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  const wordCount = textContent.split(/\s+/).filter(word => word.length > 0).length

  // Check for images
  const hasImages = /<img[^>]*>/i.test(content)

  // Extract first image URL
  let firstImageUrl: string | undefined
  const firstImageMatch = content.match(/<img[^>]*src="([^"]*)"[^>]*>/i)
  if (firstImageMatch && firstImageMatch[1]) {
    firstImageUrl = firstImageMatch[1].startsWith('http')
      ? firstImageMatch[1]
      : `${SERVER_ENDPOINT}${firstImageMatch[1]}`
  }

  return {
    html: processedHtml,
    readingTime,
    wordCount,
    hasImages,
    firstImageUrl,
    headings,
    excerpt
  }
}
