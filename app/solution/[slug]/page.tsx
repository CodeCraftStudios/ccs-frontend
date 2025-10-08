import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, MessageCircle } from "lucide-react"
import { getData } from "@/lib/axios"
import { SERVER_ENDPOINT, NAME } from "@/lib/consts"
import SolutionContent from "@/components/solution/SolutionContent"

interface SolutionPageProps {
  params: {
    slug: string
  }
}

interface SolutionData {
  id: number
  name: string
  starting_at: string
  slug: string
  short_description: string
  description: string
  image: string | null
  featured: boolean
  seo_title: string | null
  seo_description: string | null
  seo_keywords: string | null
}

async function getSolution(slug: string): Promise<SolutionData | null> {
  try {
    const response: any = await getData(`/api/solution/${slug}`)
    return response.data
  } catch (error) {
    console.error('Error fetching solution:', error)
    return null
  }
}

export async function generateMetadata({ params }: SolutionPageProps): Promise<Metadata> {
  const solution = await getSolution(params.slug)

  if (!solution) {
    return {
      title: "Solution Not Found",
    }
  }

  const title = solution.seo_title || `${solution.name} | Solutions | ${NAME}`
  const description = solution.seo_description || solution.short_description
  const keywords = solution.seo_keywords
    ? solution.seo_keywords.split(',').map(k => k.trim())
    : [solution.name, 'solutions', NAME]

  return {
    title,
    description,
    keywords,
  }
}

export default async function SolutionDetailPage({ params }: SolutionPageProps) {
  const solution = await getSolution(params.slug)

  if (!solution) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link href="/solutions">
            <Button variant="ghost" className="group hover:bg-primary/10">
              <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Solutions
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/30">
                Starting at {solution.starting_at}
              </Badge>
              <h1 className="superfont text-4xl md:text-6xl font-bold mb-4">{solution.name}</h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">{solution.short_description}</p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Get Started
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                
              </div>
            </div>

            {solution.image && (
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl blur-3xl" />
                <img
                  src={`${SERVER_ENDPOINT}${solution.image}`}
                  alt={solution.name}
                  className="relative rounded-2xl shadow-2xl border-2 border-primary/20 w-full"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SolutionContent description={solution.description} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="superfont text-3xl md:text-5xl font-bold mb-6">
            Ready to Get <span className="text-primary">Started?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Let's discuss how {solution.name} can transform your business
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Start Your Project
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-primary/50 hover:bg-primary/10 bg-transparent">
                <MessageCircle className="mr-2 w-5 h-5" />
                Talk to an Expert
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
