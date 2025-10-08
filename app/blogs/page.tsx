import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, ArrowRight } from "lucide-react"
import Link from "next/link"
import { SERVER_ENDPOINT } from "@/lib/consts"
import BlogFilters from "@/components/blog/BlogFilters"
import BlogPagination from "@/components/blog/BlogPagination"

interface BlogCategory {
  id: number
  name: string
  slug: string
}

interface Blog {
  id: number
  title: string
  slug: string
  image: string
  author: string
  context: string
  category: BlogCategory | null
  created_at: string
  updated_at: string
}

interface PaginationInfo {
  current_page: number
  page_size: number
  total_items: number
  total_pages: number
  has_next: boolean
  has_previous: boolean
}

interface BlogResponse {
  data: Blog[]
  pagination: PaginationInfo
}

interface CategoriesResponse {
  data: BlogCategory[]
}

async function getBlogCategories(): Promise<BlogCategory[]> {
  const res = await fetch(`${SERVER_ENDPOINT}/api/blog/categories`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    return []
  }

  const data: CategoriesResponse = await res.json()
  return data.data
}

async function getBlogs(params: {
  page?: string
  search?: string
  category?: string
}): Promise<BlogResponse> {
  const searchParams = new URLSearchParams()
  searchParams.set('page', params.page || '1')
  searchParams.set('page_size', '9')

  if (params.search) {
    searchParams.set('search', params.search)
  }

  if (params.category && params.category !== 'all') {
    searchParams.set('category', params.category)
  }

  const res = await fetch(`${SERVER_ENDPOINT}/api/blog/list?${searchParams.toString()}`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    return {
      data: [],
      pagination: {
        current_page: 1,
        page_size: 9,
        total_items: 0,
        total_pages: 0,
        has_next: false,
        has_previous: false,
      },
    }
  }

  return res.json()
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

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: { page?: string; search?: string; category?: string }
}) {
  const [categories, blogsResponse] = await Promise.all([
    getBlogCategories(),
    getBlogs(searchParams),
  ])

  const { data: blogs, pagination } = blogsResponse
  const currentCategory = searchParams.category || 'all'
  const currentSearch = searchParams.search || ''

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-primary/5">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary/30 rounded-full blur-xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-primary/40 rounded-full blur-lg animate-pulse delay-1000" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-6 bg-primary text-primary-foreground border-primary/30">
              Our Blog
            </Badge>
            <h1 className="superfont text-4xl md:text-6xl font-bold mb-6">
              <span className="text-primary">Insights & Updates</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Stay informed with the latest trends, tips, and insights from our team of experts in web development,
              marketing, and digital strategy.
            </p>
          </div>

          {/* Search and Filter - Client Component */}
          <BlogFilters
            categories={categories}
            currentCategory={currentCategory}
            currentSearch={currentSearch}
          />
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {blogs.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">No articles found matching your criteria.</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`} className="">
                    <Card className="h-full overflow-hidden hover-lift border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 group cursor-pointer pt-0 mt-0">
                      <div className="relative overflow-hidden aspect-[3/2] pt-0 mt-0">
                        <img
                          src={post.image ? `${SERVER_ENDPOINT}${post.image}` : "/placeholder.svg"}
                          alt={post.title}
                          className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        {post.category && (
                          <Badge
                            variant="secondary"
                            className="absolute top-4 right-4 bg-primary/90 text-primary-foreground"
                          >
                            {post.category.name}
                          </Badge>
                        )}
                      </div>

                      <CardHeader>
                        <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-3">{post.context}</CardDescription>
                      </CardHeader>

                      <CardContent>
                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{calculateReadTime(post.context)}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(post.created_at)}</span>
                          </div>
                          <div className="text-primary hover:text-primary/80 text-sm font-medium flex items-center gap-2">
                            Read More
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {pagination.total_pages > 1 && (
                <BlogPagination
                  currentPage={pagination.current_page}
                  totalPages={pagination.total_pages}
                  hasNext={pagination.has_next}
                  hasPrevious={pagination.has_previous}
                  searchParams={searchParams}
                />
              )}

              {/* Results Count */}
              <div className="text-center mt-8">
                <p className="text-muted-foreground">
                  Showing {blogs.length} of {pagination.total_items} articles
                </p>
              </div>
            </>
          )}
        </div>
      </section>

      
    </div>
  )
}
