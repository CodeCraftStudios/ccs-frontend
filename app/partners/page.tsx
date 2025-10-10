import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  ArrowRight,
  CheckCircle,
  Users,
  Handshake,
  Target,
  Globe,
  ExternalLink,
  Building2,
  Award,
  Zap,
  Shield,
  Heart,
} from "lucide-react"
import Link from "next/link"
import { BreadcrumbWithSchema } from "@/components/breadcrumb-with-schema"
import { NAME, KEYWORDS, FRONTEND, SERVER_ENDPOINT, EMAIL, PHONE } from "@/lib/consts"
import CTASection from "@/components/Home/CTAOne"
import Reviews from "@/components/Home/Reviews"
import { getData } from "@/lib/axios"

export const metadata: Metadata = {
  title: `Strategic Partners & Collaborations | ${NAME}`,
  description: `Discover our network of trusted partners and strategic collaborations. Together, we deliver comprehensive solutions that drive business success across multiple industries.`,
  keywords: [
    ...KEYWORDS,
    "strategic partners",
    "business partnerships",
    "technology partnerships",
    "partner network",
    "collaborative solutions",
    "partner ecosystem",
    "strategic alliances",
    "business collaborations",
    "partnership program",
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
    title: `Strategic Partners & Collaborations | ${NAME}`,
    description: `Explore our trusted partner network and discover how strategic collaborations deliver comprehensive solutions for business success.`,
    url: `${FRONTEND}/partners`,
    siteName: NAME,
    images: [
      {
        url: `${FRONTEND}/banner.webp`,
        width: 1920,
        height: 1080,
        alt: `${NAME} Strategic Partners and Collaborations`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Strategic Partners & Collaborations | ${NAME}`,
    description: `Discover our network of trusted partners and strategic collaborations that deliver comprehensive business solutions.`,
    images: [`${FRONTEND}/banner.webp`],
    creator: "@codecraft_studios",
  },
  alternates: {
    canonical: `${FRONTEND}/partners`,
  },
  category: "Technology",
}

export default async function PartnersPage() {
  try {
    const data: any = await getData("/api/partners/list")
    const partners = data.data

    const breadcrumbItems = [
      { label: "Home", href: "/" },
      { label: "Partners", current: true },
    ]

    // Generate partners schema
    const partnersSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Strategic Partners",
      "description": "Network of trusted partners and strategic collaborations",
      "itemListElement": partners.map((partner: any, index: number) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Organization",
          "name": partner.name,
          "description": partner.description,
          "url": partner.website || `${FRONTEND}/partner/${partner.slug}`,
          "logo": partner.logo ? `${SERVER_ENDPOINT}${partner.logo}` : undefined,
          "foundingDate": partner.founded_year,
          "industry": partner.industry,
          "areaServed": partner.service_areas || "Worldwide",
          "partner": {
            "@type": "Organization",
            "name": NAME,
            "url": FRONTEND
          }
        }
      }))
    }

    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": NAME,
      "description": `${NAME} strategic partnerships and collaborative network`,
      "url": `${FRONTEND}/partners`,
      "telephone": PHONE,
      "email": EMAIL,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Miami",
        "addressRegion": "FL",
        "addressCountry": "US"
      },
      "partner": partners.map((partner: any) => ({
        "@type": "Organization",
        "name": partner.name,
        "url": partner.website || `${FRONTEND}/partner/${partner.slug}`
      }))
    }

    const partnershipBenefits = [
      {
        icon: <Target className="w-8 h-8" />,
        title: "Comprehensive Solutions",
        description: "Our partner network enables us to deliver end-to-end solutions that address every aspect of your business needs.",
      },
      {
        icon: <Award className="w-8 h-8" />,
        title: "Industry Expertise",
        description: "Partner with specialists across multiple industries, ensuring deep domain knowledge for your specific sector.",
      },
      {
        icon: <Zap className="w-8 h-8" />,
        title: "Accelerated Delivery",
        description: "Leverage our combined expertise to fast-track project delivery without compromising on quality or innovation.",
      },
      {
        icon: <Shield className="w-8 h-8" />,
        title: "Quality Assurance",
        description: "All partners are thoroughly vetted and maintain the highest standards of quality, security, and professionalism.",
      },
    ]



    const stats = [
      { number: partners.length.toString(), label: "Active Partners" },
      { number: "50+", label: "Joint Projects" },
      { number: "15+", label: "Industries Served" },
      { number: "98%", label: "Partner Satisfaction" },
    ]

    return (
      <>
        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([partnersSchema, organizationSchema])
          }}
        />

        <div className="min-h-screen bg-background text-foreground">
          {/* Breadcrumbs */}
          <div className="container mx-auto max-w-7xl px-4 pt-22 pb-4">
            <BreadcrumbWithSchema items={breadcrumbItems} />
          </div>

          {/* Hero Section */}
          <section className="relative py-20 px-4 overflow-hidden" aria-labelledby="partners-heading">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-blue-500/10" />
            <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-green-500/20 rounded-full blur-2xl animate-pulse" />

            <div className="container mx-auto max-w-6xl relative z-10">
              <div className="text-center">
                <Badge className="mb-6 bg-primary text-primary-foreground border-primary/30">
                  STRATEGIC PARTNERSHIPS
                </Badge>

                <h1 id="partners-heading" className="superfont text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                  Trusted Partners & Collaborations
                </h1>

                <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed max-w-4xl mx-auto">
                  Our network of <strong>strategic partners</strong> and <strong>collaborative relationships</strong> enables us to deliver
                  comprehensive solutions that drive business success across multiple industries and technologies.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="group">
                    <Link href="/contact">
                      Explore Partnership Opportunities
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    <Link href="#partners-network">View Partners</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Partnership Types */}
          <section className="py-20 px-4" aria-labelledby="partnership-types-heading">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-16">
                <h2 id="partnership-types-heading" className="superfont text-4xl md:text-5xl font-bold mb-6">
                  Partnership Ecosystem
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  We collaborate with industry leaders across different sectors to provide comprehensive solutions for every business need.
                </p>
              </div>

             
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-16 px-4 bg-muted/20">
            <div className="container mx-auto max-w-6xl">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-4xl md:text-5xl font-bold text-primary mb-2 superfont">{stat.number}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Partners Network */}
          <section id="partners-network" className="py-20 px-4" aria-labelledby="partners-network-heading">
            <div className="container mx-auto max-w-7xl">
              <div className="text-center mb-16">
                <h2 id="partners-network-heading" className="superfont text-4xl md:text-5xl font-bold mb-6">
                  Our Partner Network
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Meet the exceptional organizations we collaborate with to deliver outstanding results for our clients.
                </p>
              </div>

              {partners.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {partners.map((partner: any, index: number) => (
                    <Card key={partner.id} className="group h-full bg-card/50 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2">
                      <CardContent className="p-8">
                        {/* Partner Logo/Avatar */}
                        <div className="flex items-center gap-4 mb-6">
                          <Avatar className="w-16 h-16 border-2 border-primary/20">
                            <AvatarImage
                              src={partner.logo ? `${SERVER_ENDPOINT}${partner.logo}` : undefined}
                              alt={partner.name}
                            />
                            <AvatarFallback className="bg-primary/10 text-primary text-lg font-bold">
                              {partner.name.split(' ').map((word: string) => word[0]).join('').substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="superfont text-xl font-bold">{partner.name}</h3>
                            {partner.industry && (
                              <Badge variant="outline" className="mt-1 text-xs border-primary/30 text-foreground">
                                {partner.industry}
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Partner Description */}
                        <p className="text-muted-foreground mb-6 leading-relaxed line-clamp-3">
                          {partner.description}
                        </p>

                        {/* Partnership Type */}
                        {partner.partnership_type && (
                          <div className="mb-4">
                            <Badge className="bg-primary/10 text-primary border-primary/30">
                              {partner.partnership_type.charAt(0).toUpperCase() + partner.partnership_type.slice(1)} Partner
                            </Badge>
                          </div>
                        )}

                        {/* Service Areas */}
                        {partner.service_areas && (
                          <div className="mb-6">
                            <div className="text-sm text-muted-foreground mb-2">Service Areas:</div>
                            <div className="text-sm">{partner.service_areas}</div>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-2 mt-auto">
                          {partner.slug && (
                            <Button asChild className="flex-1 group">
                              <Link href={`/partner/${partner.slug}`}>
                                Learn More
                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                              </Link>
                            </Button>
                          )}
                          {partner.website && (
                            <Button asChild variant="outline" size="sm" className="p-2">
                              <a href={partner.website} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <Users className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Building Our Partner Network</h3>
                  <p className="text-muted-foreground mb-6">We're actively building relationships with industry leaders to expand our service capabilities.</p>
                  <Button asChild>
                    <Link href="/contact">
                      Become a Partner
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </section>

          {/* Partnership Benefits */}
          <section className="py-20 px-4 bg-muted/20" aria-labelledby="partnership-benefits-heading">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-16">
                <h2 id="partnership-benefits-heading" className="superfont text-4xl md:text-5xl font-bold mb-6">
                  Why Partner With Us?
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Our strategic partnerships create value for all stakeholders, delivering enhanced capabilities and better outcomes for our clients.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {partnershipBenefits.map((benefit, index) => (
                  <Card key={index} className="h-full bg-card/50 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                    <CardContent className="p-8 flex gap-6">
                      <div className="text-primary flex-shrink-0">{benefit.icon}</div>
                      <div>
                        <h3 className="superfont text-xl font-bold mb-3">{benefit.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Become a Partner CTA */}
          <section className="py-20 px-4 relative overflow-hidden" aria-labelledby="become-partner-heading">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-blue-500/10" />
            <div className="absolute top-10 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-green-500/20 rounded-full blur-3xl animate-pulse" />

            <div className="container mx-auto max-w-4xl text-center relative z-10">
              <Handshake className="w-16 h-16 mx-auto mb-6 text-primary" />
              <h2 id="become-partner-heading" className="superfont text-4xl md:text-5xl font-bold mb-6">
                Interested in Partnership?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join our growing network of strategic partners and unlock new opportunities for mutual growth and success.
                Together, we can deliver exceptional value to our clients while expanding our market reach.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="group">
                  <Link href="/contact">
                    Start Partnership Discussion
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  <Link href="/about">Learn About Us</Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Partnership Process */}
          <section className="py-20 px-4" aria-labelledby="partnership-process-heading">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-16">
                <h2 id="partnership-process-heading" className="superfont text-4xl md:text-5xl font-bold mb-6">
                  Partnership Process
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Our streamlined partnership process ensures quick evaluation and smooth onboarding for mutually beneficial relationships.
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">1</span>
                  </div>
                  <h3 className="superfont text-lg font-bold mb-3">Initial Contact</h3>
                  <p className="text-sm text-muted-foreground">Reach out to us with your partnership proposal and company information.</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">2</span>
                  </div>
                  <h3 className="superfont text-lg font-bold mb-3">Evaluation</h3>
                  <p className="text-sm text-muted-foreground">We assess mutual compatibility and potential value creation opportunities.</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">3</span>
                  </div>
                  <h3 className="superfont text-lg font-bold mb-3">Agreement</h3>
                  <p className="text-sm text-muted-foreground">Define partnership terms, responsibilities, and success metrics.</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">4</span>
                  </div>
                  <h3 className="superfont text-lg font-bold mb-3">Launch</h3>
                  <p className="text-sm text-muted-foreground">Begin collaborative projects and ongoing partnership activities.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Reviews Section */}
          <Reviews />

          {/* CTA Section */}
          <CTASection />
        </div>
      </>
    )
  } catch (error) {
    console.error('Error in Partners page:', error)
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Partners Information Temporarily Unavailable</h1>
          <p className="text-muted-foreground">Please try again later.</p>
          <Button asChild className="mt-4">
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    )
  }
}