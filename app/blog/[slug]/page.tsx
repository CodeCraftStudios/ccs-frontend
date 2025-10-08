import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, User, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { SERVER_ENDPOINT, NAME, FRONTEND } from "@/lib/consts"
import BlogContent from "@/components/blog/BlogContent"
import ShareButtons from "@/components/blog/ShareButtons"

interface BlogCategory {
  id: number
  name: string
  slug: string
}

interface BlogDetail {
  id: number
  title: string
  slug: string
  image: string
  author: string
  context: string
  content: string
  category: BlogCategory | null
  created_at: string
  updated_at: string
  seo_title: string | null
  seo_description: string | null
  seo_keywords: string | null
}

interface BlogResponse {
  data: BlogDetail
}

interface RelatedBlogsResponse {
  data: BlogDetail[]
}

async function getBlogPost(slug: string): Promise<BlogDetail | null> {
  try {
    const res = await fetch(`${SERVER_ENDPOINT}/api/blog/${slug}`, {
      cache: 'no-store',
    })

    if (!res.ok) {
      return null
    }

    const response: BlogResponse = await res.json()
    return response.data
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return null
  }
}

async function getRelatedBlogs(categorySlug: string, currentBlogId: number): Promise<BlogDetail[]> {
  try {
    const params = new URLSearchParams({
      category: categorySlug,
      page_size: '5',
    })

    const res = await fetch(`${SERVER_ENDPOINT}/api/blog/list?${params.toString()}`, {
      cache: 'no-store',
    })

    if (!res.ok) {
      return []
    }

    const response: RelatedBlogsResponse = await res.json()
    // Filter out the current blog post
    return response.data.filter(blog => blog.id !== currentBlogId).slice(0, 4)
  } catch (error) {
    console.error('Error fetching related blogs:', error)
    return []
  }
}

async function getRecentBlogs(currentBlogId: number): Promise<BlogDetail[]> {
  try {
    const params = new URLSearchParams({
      page_size: '5',
    })

    const res = await fetch(`${SERVER_ENDPOINT}/api/blog/list?${params.toString()}`, {
      cache: 'no-store',
    })

    if (!res.ok) {
      return []
    }

    const response: RelatedBlogsResponse = await res.json()
    // Filter out the current blog post
    return response.data.filter(blog => blog.id !== currentBlogId).slice(0, 4)
  } catch (error) {
    console.error('Error fetching recent blogs:', error)
    return []
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getBlogPost(params.slug)

  if (!post) {
    return {
      title: `Blog Post Not Found | ${NAME}`,
      description: "The requested blog post could not be found.",
    }
  }

  const title = post.seo_title || `${post.title} | Blog | ${NAME}`
  const description = post.seo_description || post.context || `Read ${post.title} by ${post.author}`
  const imageUrl = post.image ? `${SERVER_ENDPOINT}${post.image}` : `${FRONTEND}/media/banner.jpg`
  const keywords = post.seo_keywords
    ? post.seo_keywords.split(',').map(k => k.trim())
    : [post.title, post.category?.name || '', 'blog', NAME]

  return {
    title,
    description,
    keywords,
    authors: [{ name: post.author }],
    creator: NAME,
    publisher: NAME,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title,
      description,
      url: `${FRONTEND}/blog/${post.slug}`,
      siteName: NAME,
      images: [
        {
          url: imageUrl,
          width: 1546,
          height: 1024,
          alt: post.title,
        },
      ],
      locale: "en_US",
      type: "article",
      publishedTime: post.created_at,
      modifiedTime: post.updated_at,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      creator: "@codecraft_studios",
    },
    alternates: {
      canonical: `${FRONTEND}/blog/${post.slug}`,
    },
    category: post.category?.name || "Blog",
  }
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })
}

const calculateReadTime = (context: string) => {
  const wordsPerMinute = 200
  const wordCount = context.split(/\s+/).length
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  return `${minutes} min read`
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  // Get related posts if category exists, otherwise get recent blogs
  let relatedPosts: BlogDetail[] = []
  if (post.category) {
    relatedPosts = await getRelatedBlogs(post.category.slug, post.id)
  }
  // If no related posts in category, get recent blogs
  if (relatedPosts.length === 0) {
    relatedPosts = await getRecentBlogs(post.id)
  }

  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.context,
    "image": post.image ? `${SERVER_ENDPOINT}${post.image}` : undefined,
    "datePublished": post.created_at,
    "dateModified": post.updated_at,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": NAME,
      "logo": {
        "@type": "ImageObject",
        "url": `${FRONTEND}/logo.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${FRONTEND}/blog/${post.slug}`
    }
  }

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />

      <div className="min-h-screen bg-background">
        {/* Back Button */}
        <div className="container mx-auto px-4 py-8">
          <Link href="/blogs">
            <Button variant="outline" className="gap-2 bg-transparent border-primary/30 hover:border-primary">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>

        {/* Main Content with Sidebar Layout */}
        <div className="container mx-auto px-4 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Main Article Content - 2/3 width */}
            <article className="lg:col-span-2">
              {/* Header */}
              <header className="mb-8 space-y-6">
                {post.category && (
                  <Badge variant="secondary" className="bg-primary text-primary-foreground">
                    {post.category.name}
                  </Badge>
                )}

                <h1 className="superfont text-4xl md:text-5xl lg:text-6xl font-bold text-balance leading-tight">
                  {post.title}
                </h1>

                {post.context && (
                  <p className="text-xl text-muted-foreground leading-relaxed">{post.context}</p>
                )}

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground pt-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(post.created_at)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{calculateReadTime(post.context)}</span>
                  </div>
                </div>

                {/* Social Share */}
                <ShareButtons
                  title={post.title}
                  url={`${FRONTEND}/blog/${post.slug}`}
                  description={post.context}
                />
              </header>

              {/* Featured Image */}
              {post.image && (
                <div className="relative aspect-[3/2] rounded-2xl overflow-hidden border border-border mb-12">
                  <Image
                    src={`${SERVER_ENDPOINT}${post.image}`}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              {/* Article Body - HTML Content */}
              <BlogContent content={post.content} />
            </article>

            {/* Sidebar - 1/3 width */}
            <aside className="lg:col-span-1">
              <div className="sticky top-22 space-y-8">
                {/* Blog Info Card */}
                <Card className="border-2 border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-xl">Article Info</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <User className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <p className="text-sm text-muted-foreground">Author</p>
                        <p className="font-medium">{post.author}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <p className="text-sm text-muted-foreground">Published</p>
                        <p className="font-medium">{formatDate(post.created_at)}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <p className="text-sm text-muted-foreground">Read Time</p>
                        <p className="font-medium">{calculateReadTime(post.context)}</p>
                      </div>
                    </div>
                    {post.category && (
                      <div className="pt-4 border-t border-border">
                        <p className="text-sm text-muted-foreground mb-2">Category</p>
                        <Badge variant="secondary" className="bg-primary/20 text-primary">
                          {post.category.name}
                        </Badge>
                      </div>
                    )}
                    {post.seo_keywords && (
                      <div className="pt-4 border-t border-border">
                        <p className="text-sm text-muted-foreground mb-2">Tags</p>
                        <div className="flex flex-wrap gap-2">
                          {post.seo_keywords.split(',').slice(0, 5).map((keyword, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {keyword.trim()}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                  <Card className="border-2 border-primary/20">
                    <CardHeader>
                      <CardTitle className="text-xl">
                        {post.category && relatedPosts.some(p => p.category?.slug === post.category?.slug)
                          ? 'Related Articles'
                          : 'Recent Articles'}
                      </CardTitle>
                      <CardDescription>Continue reading</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {relatedPosts.map((relatedPost) => (
                        <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                          <div className="group cursor-pointer space-y-2 pb-4 border-b border-border last:border-0 last:pb-0 mb-8">
                            {relatedPost.image && (
                              <div className="relative aspect-[3/2] rounded-lg overflow-hidden">
                                <img
                                  src={`${SERVER_ENDPOINT}${relatedPost.image}`}
                                  alt={relatedPost.title}
                                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                              </div>
                            )}
                            <h3 className="font-semibold text-sm group-hover:text-primary transition-colors line-clamp-2">
                              {relatedPost.title}
                            </h3>
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {relatedPost.context}
                            </p>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {calculateReadTime(relatedPost.context)}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {formatDate(relatedPost.created_at)}
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </CardContent>
                  </Card>
                )}
              </div>
            </aside>
          </div>
        </div>

      </div>
    </>
  )
}
