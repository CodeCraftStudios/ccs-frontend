import type { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Briefcase } from "lucide-react"
import Link from "next/link"
import { BreadcrumbWithSchema } from "@/components/breadcrumb-with-schema"
import { NAME, KEYWORDS, FRONTEND, SERVER_ENDPOINT, EMAIL, PHONE } from "@/lib/consts"
import { getData } from "@/lib/axios"
import Portfolio from "@/components/Home/Portfolio"

export const metadata: Metadata = {
  title: `Portfolio - Our Best Work | ${NAME}`,
  description: `Explore ${NAME}'s portfolio showcasing successful projects in web development, mobile apps, system design, and digital marketing. See how we deliver excellence for our clients.`,
  keywords: [
    ...KEYWORDS,
    "portfolio",
    "projects",
    "case studies",
    "web development portfolio",
    "mobile app portfolio",
    "digital marketing portfolio",
    "client work",
    "success stories",
    "project showcase",
  ],
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
    title: `Portfolio - Our Best Work | ${NAME}`,
    description: `Explore our portfolio of successful projects across web development, mobile apps, system design, and digital marketing.`,
    url: `${FRONTEND}/portfolio`,
    siteName: NAME,
    images: [
      {
        url: `${FRONTEND}/banner.png`,
        width: 1920,
        height: 1080,
        alt: `${NAME} Portfolio - Successful Projects and Case Studies`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Portfolio - Our Best Work | ${NAME}`,
    description: `Explore our portfolio showcasing successful projects in web development, mobile apps, and digital marketing.`,
    images: [`${FRONTEND}/banner.png`],
    creator: "@codecraft_studios",
  },
  alternates: {
    canonical: `${FRONTEND}/portfolio`,
  },
  category: "Technology",
}

interface PortfolioItem {
  id: number
  name: string
  logo: string | null
  short_description: string
  image: string | null
  cover: string | null
  slug: string
  live_url: string | null
  services: Array<{
    id: number
    name: string
    slug: string
  }>
}

export default async function PortfolioPage() {
  try {
    const data: any = await getData("/api/portfolio/list")
    const portfolioItems: PortfolioItem[] = data.data

    const breadcrumbItems = [
      { label: "Home", href: "/" },
      { label: "Portfolio", current: true },
    ]

    // Generate portfolio schema
    const portfolioSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Portfolio Projects",
      "description": "Showcase of successful projects delivered by CodeCraft Studios",
      "itemListElement": portfolioItems.map((project, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "CreativeWork",
          "name": project.name,
          "description": project.short_description,
          "url": project.live_url || `${FRONTEND}/portfolio/${project.slug}`,
          "image": project.cover ? `${SERVER_ENDPOINT}${project.cover}` : project.image ? `${SERVER_ENDPOINT}${project.image}` : undefined,
          "creator": {
            "@type": "Organization",
            "name": NAME,
            "url": FRONTEND
          },
          "about": project.services.map(service => ({
            "@type": "Service",
            "name": service.name,
            "url": `${FRONTEND}/service/${service.slug}`
          }))
        }
      }))
    }

    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": NAME,
      "description": `${NAME} portfolio showcasing web development, mobile apps, and digital marketing projects`,
      "url": `${FRONTEND}/portfolio`,
      "telephone": PHONE,
      "email": EMAIL,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Miami",
        "addressRegion": "FL",
        "addressCountry": "US"
      }
    }

    return (
      <>
        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([portfolioSchema, organizationSchema])
          }}
        />

        <div className="min-h-screen bg-background">
          {/* Breadcrumbs */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-4">
            <BreadcrumbWithSchema items={breadcrumbItems} />
          </div>

          {/* Hero Section */}
          <section className="pt-12 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden" aria-labelledby="portfolio-heading">
            <div className="absolute inset-0 hero-grid" />

            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-20 left-10 w-32 h-32 bg-primary/30 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute bottom-20 right-10 w-24 h-24 bg-primary/40 rounded-full blur-lg animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-primary/35 rounded-full blur-md animate-pulse delay-500"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
              <div className="text-center">
                <Badge
                  variant="secondary"
                  className="mb-6 bg-primary text-primary-foreground border-primary/30 hover:bg-primary/90 transition-all duration-300"
                >
                  <Briefcase className="w-4 h-4 mr-2" />
                  Our Work
                </Badge>

                <h1 id="portfolio-heading" className="superfont text-4xl md:text-6xl lg:text-7xl font-bold text-balance mb-6 text-glow-primary">
                  <span className="text-primary">Portfolio</span>
                  <br />
                  <span className="text-foreground">Projects That Inspire</span>
                </h1>

                <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 text-pretty leading-relaxed">
                  Explore our collection of successful projects across <strong>web development</strong>, <strong>mobile apps</strong>, <strong>system design</strong>, and
                  <strong> digital marketing</strong>. Each project represents our commitment to excellence and innovation.
                </p>

                <div className="text-center mt-6">
                  <p className="text-sm text-muted-foreground">
                    <span className="text-primary font-semibold">40+</span> projects completed
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Portfolio Grid */}
          <Portfolio/>

          {/* CTA Section */}
          <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 via-background to-primary/5 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-10 left-10 w-32 h-32 bg-primary/30 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute bottom-10 right-10 w-24 h-24 bg-primary/40 rounded-full blur-lg animate-pulse delay-1000"></div>
            </div>

            <div className="max-w-4xl mx-auto text-center relative z-10">
              <h2 className="superfont text-3xl md:text-5xl font-bold mb-6 text-glow-primary">
                <span className="text-primary">Ready to Start</span>
                <br />
                <span className="text-foreground">Your Project?</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
                Let's create something amazing together. Our team is ready to bring your vision to life with cutting-edge
                technology and creative excellence.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 btn-glow magnetic-hover"
                  >
                    Get Started
                  </Button>
                </Link>
                <Link href="/services">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 bg-transparent"
                  >
                    View Services
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </>
    )
  } catch (error) {
    console.error('Error in Portfolio page:', error)
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Portfolio Temporarily Unavailable</h1>
          <p className="text-muted-foreground">Please try again later.</p>
          <Button asChild className="mt-4">
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    )
  }
}
