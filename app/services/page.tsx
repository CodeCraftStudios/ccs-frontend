import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Users,
  Zap,
  Shield,
  Target,
  Code,
} from "lucide-react"
import Link from "next/link"
import { BreadcrumbWithSchema } from "@/components/breadcrumb-with-schema"
import { fetchServices, Service } from "@/lib/services"
import { NAME, EXPERIENCE, PROJECTS, KEYWORDS, FRONTEND, SERVER_ENDPOINT } from "@/lib/consts"
import CTASection from "@/components/Home/CTAOne"
import Reviews from "@/components/Home/Reviews"
import Portfolio from "@/components/Home/Portfolio"
import { ClientsMarquee } from "@/components/Home/ClientsMarquee"

export const metadata: Metadata = {
  title: "Professional IT And Marketing Services | CodeCraft Studios",
  description: "Explore CodeCraft Studios' comprehensive IT and Marketing services in Miami. Get expert solutions for your business growth.",
  keywords: KEYWORDS,
  authors: [{ name: "CodeCraft Studios", url: FRONTEND }],
  creator: "CodeCraft Studios",
  publisher: "CodeCraft Studios",
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
    title: "Professional IT Services - CodeCraft Studios Miami",
    description: "Discover our complete range of IT services including web development, mobile apps, digital marketing, and more. Based in Miami, serving businesses across Florida.",
    url: `${FRONTEND}/services`,
    siteName: "CodeCraft Studios",
    images: [
      {
        url: `${FRONTEND}/media/banner.jpg`,
        width: 1920,
        height: 1080,
        alt: "CodeCraft Studios IT Services - Web Development, Apps, Digital Marketing",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional IT Services - CodeCraft Studios Miami",
    description: "Complete IT solutions including web development, mobile apps, digital marketing and more. Miami-based, Florida-serving.",
    images: [`${FRONTEND}/media/services/services-hero.webp`],
    creator: "@codecraft_studios",
  },
  alternates: {
    canonical: `${FRONTEND}/services`,
  },
  category: "Technology",
}


export default async function ServicesPage() {
  // Fetch services server-side
  const services = await fetchServices();

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Services", current: true },
  ];

  // Generate services schema
  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "IT Services",
    "description": "Comprehensive IT services offered by CodeCraft Studios",
    "itemListElement": services.map((service, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Service",
        "name": service.name,
        "description": service.short_description,
        "url": `${FRONTEND}/services/${service.slug}`,
        "provider": {
          "@type": "Organization",
          "name": NAME,
          "url": FRONTEND
        },
        "areaServed": {
          "@type": "State",
          "name": "Florida"
        },
        "serviceType": service.name
      }
    }))
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": NAME,
    "description": "Professional IT services including web development, mobile apps, digital marketing, and system design in Miami, Florida",
    "url": `${FRONTEND}/services`,
    "telephone": "+1-954-398-0241",
    "email": "johnmolina@codecraftstudios.net",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Miami",
      "addressRegion": "FL",
      "addressCountry": "US"
    },
    "areaServed": {
      "@type": "State",
      "name": "Florida"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "IT Services",
      "itemListElement": services.map(service => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": service.name,
          "description": service.short_description
        }
      }))
    }
  };

  const stats = [
    { number: `${PROJECTS}+`, label: "Projects Completed" },
    { number: "50+", label: "Happy Clients" },
    { number: `${EXPERIENCE}+`, label: "Years Experience" },
    { number: "24/7", label: "Support Available" },
  ];

  const whyChooseUs = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Proven Expertise",
      description: `${EXPERIENCE}+ years of experience delivering successful projects across various industries.`,
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Fast Delivery",
      description: "Agile development process ensures quick turnaround without compromising quality.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Dedicated Support",
      description: "24/7 support and maintenance to keep your digital assets running smoothly.",
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Quality Assurance",
      description: "Rigorous testing and quality control processes ensure bug-free, high-performance solutions.",
    },
  ];

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([servicesSchema, organizationSchema])
        }}
      />

      <div className="min-h-screen bg-background text-foreground">
        {/* Breadcrumbs */}
        <div className="container mx-auto max-w-7xl px-4 pt-24 pb-4">
          <BreadcrumbWithSchema items={breadcrumbItems} />
        </div>

        {/* Hero Section */}
        <section className="relative py-12 px-4 overflow-hidden" aria-labelledby="services-heading">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-blue-500/10" />

          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="text-center">
              <Badge className="mb-6 bg-primary text-primary-foreground border-primary/30">WHAT WE PROVIDE</Badge>

              <h1 id="services-heading" className="superfont text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                Professional IT Services in Miami
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed max-w-4xl mx-auto">
                From <strong>web development</strong> and <strong>mobile apps</strong> to <strong>digital marketing</strong> and <strong>system design</strong>,
                {NAME} provides comprehensive IT solutions that help your business thrive in the digital landscape.
              </p>

              <Button asChild size="lg" className="group">
                <Link href="/contact">
                  Get Started Today
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 px-4" aria-labelledby="services-grid-heading">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 id="services-grid-heading" className="superfont text-4xl md:text-5xl font-bold mb-6">Our IT Services</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Comprehensive technology solutions designed to accelerate your business growth and digital transformation.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Card key={service.id} className="group h-full bg-card/50 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2">
                  <CardContent className="p-8">
                    <div className="text-primary mb-6 transition-transform duration-300">
                      <img src={`${SERVER_ENDPOINT}${service.icon}`} 
                        className="w-12 h-12 object-contain"
                        style={{
                          filter: 'brightness(0) saturate(100%) invert(39%) sepia(93%) saturate(2306%) hue-rotate(251deg) brightness(98%) contrast(91%)'
                        }}
                      />
                    </div>

                    <h3 className="superfont text-2xl font-bold mb-4">{service.name}</h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">{service.overview}</p>

                    

                    {service.stack.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {service.stack.slice(0, 6).map((tech) => (
                          <Badge key={tech.id} variant="outline" className="text-xs border-primary/30 text-foreground">
                            <img 
                              src={`${SERVER_ENDPOINT}${tech.logo}`} 
                              alt={tech.name}
                              className="w-4 h-4 object-contain"
                            />
                            {tech.name}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <Button asChild className="w-full group">
                      <Link href={`/service/${service.slug}`}>
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
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
        <ClientsMarquee/>
        
        {/* Why Choose Us */}
        <section className="py-20 px-4" aria-labelledby="why-choose-us-heading">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 id="why-choose-us-heading" className="superfont text-4xl md:text-5xl font-bold mb-6">Why Choose {NAME}?</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                We combine technical expertise with creative vision to deliver IT solutions that drive real business results in Miami and across Florida.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {whyChooseUs.map((item, index) => (
                <Card key={index} className="h-full bg-card/50 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                  <CardContent className="p-8 flex gap-6">
                    <div className="text-primary flex-shrink-0">{item.icon}</div>
                    <div>
                      <h3 className="superfont text-xl font-bold mb-3">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <Portfolio/>

        {/* CTA Section */}
        <CTASection />

        {/* Reviews Section */}
        <Reviews />
      </div>
    </>
  )
}
