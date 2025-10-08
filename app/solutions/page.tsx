import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Building2, Sparkles } from "lucide-react"
import { getData } from "@/lib/axios"
import { SERVER_ENDPOINT } from "@/lib/consts"

export const metadata: Metadata = {
  title: "Solutions | CodeCraft Studios",
  description: "Tailored digital solutions for enterprises and small businesses",
}

interface Solution {
  id: number
  name: string
  starting_at: string
  slug: string
  short_description: string
  image: string | null
}

export default async function SolutionsPage() {
  const fetchSolutions: any = await getData("/api/solution/list")
  const solutions: Solution[] = fetchSolutions.data

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 hero-grid" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-primary/30 rounded-full blur-lg animate-pulse" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <Badge variant="secondary" className="mb-6 bg-primary/10 text-primary border-primary/30">
              <Building2 className="w-4 h-4 mr-2" />
              Tailored Solutions
            </Badge>

            <h1 className="superfont text-4xl md:text-6xl lg:text-7xl font-bold text-balance mb-6">
              Solutions Built For
              <span className="text-primary block">Your Business Size</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 text-pretty">
              Whether you're a growing startup or an established enterprise, we have the perfect solution tailored to
              your needs, budget, and goals.
            </p>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution) => (
              <Card
                key={solution.id}
                className="group hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 border-2 hover:border-primary/50 overflow-hidden bg-card/50 backdrop-blur-sm pt-0 mt-0"
              >
                {solution.image && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={`${SERVER_ENDPOINT}${solution.image}`}
                      alt={solution.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-primary/90 text-primary-foreground border-primary">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Solution
                      </Badge>
                    </div>
                  </div>
                )}

                <CardHeader>
                  <div className="flex items-baseline justify-between mb-2">
                    <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                      {solution.name}
                    </CardTitle>
                  </div>
                    <Badge variant="outline" className="text-primary border-primary/50 mb-4">
                        Starting at{solution.starting_at}
                    </Badge>
                  <CardDescription className="text-base leading-relaxed">
                    {solution.short_description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <Link href={`/solution/${solution.slug}`} className="block">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground group/btn">
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="superfont text-3xl md:text-5xl font-bold mb-6">
            Not Sure Which Solution <span className="text-primary">Fits Your Needs?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Schedule a free consultation with our team to discuss your requirements and find the perfect solution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Schedule Free Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/services">
              <Button size="lg" variant="outline" className="border-primary/50 hover:bg-primary/10 bg-transparent">
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
