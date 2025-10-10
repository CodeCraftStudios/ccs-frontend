import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, User, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { SERVER_ENDPOINT, NAME, FRONTEND } from "@/lib/consts"
import ProjectOverview from "@/components/project/ProjectOverview"

interface PortfolioImage {
  id: number
  title: string | null
  caption: string | null
  image: string
}

interface PortfolioResult {
  id: number
  result: string
}

interface Technology {
  id: number
  name: string
  slug: string
  logo: string
}

interface Service {
  id: number
  name: string
  slug: string
}

interface Testimonial {
  quote: string
  author: string
  role: string
}

interface PortfolioDetail {
  id: number
  name: string
  logo: string | null
  slug: string
  live_url: string | null
  short_description: string
  cover: string | null
  image: string | null
  category: string | null
  client: string | null
  date: string | null
  duration: string | null
  overview: string | null
  services: Service[]
  technologies: Technology[]
  images: PortfolioImage[]
  results: PortfolioResult[]
  testimonial: Testimonial | null
  seo_title: string | null
  seo_description: string | null
  seo_keywords: string | null
}

interface ApiResponse {
  data: PortfolioDetail
}

async function getPortfolioProject(slug: string): Promise<PortfolioDetail | null> {
  try {
    const res = await fetch(`${SERVER_ENDPOINT}/api/portfolio/${slug}`, {
      cache: 'no-store',
    })

    if (!res.ok) {
      return null
    }

    const response: ApiResponse = await res.json()
    return response.data
  } catch (error) {
    console.error('Error fetching portfolio project:', error)
    return null
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = await getPortfolioProject(params.slug)

  if (!project) {
    return {
      title: `Project Not Found | ${NAME}`,
      description: "The requested project could not be found.",
    }
  }

  const title = project.seo_title || `${project.name} | Portfolio | ${NAME}`
  const description = project.seo_description || project.short_description || `View ${project.name} - a ${project.category || 'portfolio'} project by ${NAME}`
  const imageUrl = project.cover
    ? `${SERVER_ENDPOINT}${project.cover}`
    : project.image
    ? `${SERVER_ENDPOINT}${project.image}`
    : `${FRONTEND}/banner.png`
  const keywords = project.seo_keywords
    ? project.seo_keywords.split(',').map(k => k.trim())
    : [project.name, project.category || '', 'portfolio', 'case study', NAME]

  return {
    title,
    description,
    keywords,
    authors: [{ name: NAME, url: FRONTEND }],
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
      url: `${FRONTEND}/project/${project.slug}`,
      siteName: NAME,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: project.name,
        },
      ],
      locale: "en_US",
      type: "article",
      publishedTime: project.date ? `${project.date}-01-01` : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      creator: "@codecraft_studios",
    },
    alternates: {
      canonical: `${FRONTEND}/project/${project.slug}`,
    },
    category: project.category || "Technology",
  }
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await getPortfolioProject(params.slug)

  if (!project) {
    notFound()
  }

  // Combine cover and uploaded images for the gallery
  const allImages = project.images.map(img => ({
    url: `${SERVER_ENDPOINT}${img.image}`,
    alt: img.title || project.name
  }))

  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.name,
    "description": project.short_description,
    "image": project.cover
      ? `${SERVER_ENDPOINT}${project.cover}`
      : project.image
      ? `${SERVER_ENDPOINT}${project.image}`
      : undefined,
    "url": `${FRONTEND}/project/${project.slug}`,
    "creator": {
      "@type": "Organization",
      "name": NAME,
      "url": FRONTEND
    },
    "about": project.services.map(service => ({
      "@type": "Service",
      "name": service.name,
      "url": `${FRONTEND}/service/${service.slug}`
    })),
    "datePublished": project.date ? `${project.date}-01-01` : undefined,
    "keywords": project.seo_keywords || project.category,
  }

  if (project.testimonial) {
    structuredData["review"] = {
      "@type": "Review",
      "reviewBody": project.testimonial.quote,
      "author": {
        "@type": "Person",
        "name": project.testimonial.author,
        "jobTitle": project.testimonial.role
      }
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
        <Link href="/portfolio">
          <Button variant="outline" className="gap-2 bg-transparent">
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </Button>
        </Link>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 pb-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title & Meta */}
            <div className="space-y-4">
              {project.category && (
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                  {project.category}
                </Badge>
              )}
              <h1 className="font-superfont text-4xl md:text-5xl lg:text-6xl font-bold text-balance">
                {project.name}
              </h1>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                {project.client && (
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{project.client}</span>
                  </div>
                )}
                {project.date && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{project.date}</span>
                  </div>
                )}
                {project.duration && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{project.duration}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Hero Image */}
            {project.cover && (
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-border">
                <Image
                  src={`${SERVER_ENDPOINT}${project.cover}`}
                  alt={project.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Description */}
            {project.live_url && (
              <Button className="prose prose-invert max-w-none">
                <Link href={project.live_url} target="_blank" className="text-lg leading-relaxed">View Website</Link>
              </Button>
            )}

            {/* Overview */}
            {project.overview && (
              <ProjectOverview overview={project.overview} />
            )}

            {/* Project Images */}
            {allImages.length > 0 && (
              <div className="grid md:grid-cols-2 gap-6">
                {allImages.map((image, index) => (
                  <div key={index} className="relative aspect-video rounded-xl overflow-hidden border border-border">
                    <Image
                      src={image.url}
                      alt={image.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Results */}
            {project.results.length > 0 && (
              <div className="space-y-4">
                <h2 className="font-superfont text-2xl md:text-3xl font-bold">Results</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {project.results.map((result) => (
                    <div
                      key={result.id}
                      className="p-6 rounded-xl bg-primary/5 border border-primary/10 hover:border-primary/20 transition-colors"
                    >
                      <p className="text-foreground font-medium">{result.result}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Testimonial */}
            {project.testimonial && (
              <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                <div className="space-y-4">
                  <p className="text-lg italic text-foreground leading-relaxed">
                    &ldquo;{project.testimonial.quote}&rdquo;
                  </p>
                  <div>
                    <p className="font-semibold text-foreground">{project.testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{project.testimonial.role}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-22 space-y-6">
              {/* Project Details */}
              <div className="p-6 rounded-2xl bg-card border border-border space-y-6">
                <h3 className="font-superfont text-xl font-bold">Project Details</h3>

                <div className="space-y-4">
                  {project.client && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Client</p>
                      <p className="font-medium">{project.client}</p>
                    </div>
                  )}

                  {project.duration && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Duration</p>
                      <p className="font-medium">{project.duration}</p>
                    </div>
                  )}

                  {project.date && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Year</p>
                      <p className="font-medium">{project.date}</p>
                    </div>
                  )}

                  {project.services.length > 0 && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Services</p>
                      <div className="flex flex-wrap gap-2">
                        {project.services.map((service) => (
                          <Badge key={service.id} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                            {service.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Technologies */}
              {project.technologies.length > 0 && (
                <div className="p-6 rounded-2xl bg-card border border-border space-y-4">
                  <h3 className="font-superfont text-xl font-bold">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech.id} variant="outline" className="border-primary/30 text-foreground">
                        <img src={`${SERVER_ENDPOINT}${tech.logo}`} className=" w-12"/>
                        {tech.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/30 space-y-4">
                <h3 className="font-superfont text-xl font-bold">Ready to Start Your Project?</h3>
                <p className="text-sm text-muted-foreground">
                  Let&apos;s discuss how we can bring your vision to life.
                </p>
                <Link href="/contact">
                  <Button className="w-full bg-primary hover:bg-primary/90">Get in Touch</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Projects CTA */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-16 text-center space-y-6">
          <h2 className="font-superfont text-3xl md:text-4xl font-bold">Explore More Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Check out our other work and see how we&apos;ve helped businesses achieve their goals.
          </p>
          <Link href="/portfolio">
            <Button size="lg" variant="outline" className="gap-2 bg-transparent">
              View All Projects
            </Button>
          </Link>
        </div>
      </div>
    </div>
    </>
  )
}
