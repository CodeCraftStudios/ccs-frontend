import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"
import { BreadcrumbWithSchema } from "@/components/breadcrumb-with-schema"
import { NAME, KEYWORDS, FRONTEND, SERVER_ENDPOINT, EMAIL, PHONE } from "@/lib/consts"
import CTASection from "@/components/Home/CTAOne"
import Reviews from "@/components/Home/Reviews"
import ProjectSwiper from "@/components/ui/project-swiper"
import { getData } from "@/lib/axios"
import { ClientsMarquee } from "@/components/Home/ClientsMarquee"
import Portfolio from "@/components/Home/Portfolio"

export async function generateMetadata(): Promise<Metadata> {
  try {
    const data:any = await getData("/api/service/api-development")
    const service:any = data.data

    if (!service) {
      console.log('API development service not found, using fallback metadata');
      return {
        title: `API Development Services - Custom APIs & Integrations | ${NAME}`,
        description: `Custom API development for seamless integration. Build reliable, secure, and scalable APIs that connect your systems.`,
        keywords: [
          ...KEYWORDS,
          "api development",
          "api development miami",
          "api development florida",
          "custom api development",
          "rest api development",
          "graphql api",
          "api integration",
          "microservices",
          "backend development",
          "django rest framework",
          "nodejs api",
        ],
      };
    }

    console.log('Found API development service:', service.name);

    // Parse keywords if they exist as a string
    let keywordsArray = [...KEYWORDS];
    if (service.seo_keywords) {
      try {
        // Try to parse as JSON array first, if that fails, split by comma
        const parsedKeywords = typeof service.seo_keywords === 'string'
          ? service.seo_keywords.split(',').map(k => k.trim())
          : service.seo_keywords;
        keywordsArray = [...KEYWORDS, ...parsedKeywords];
      } catch {
        keywordsArray = [...KEYWORDS, ...service.seo_keywords.split(',').map(k => k.trim())];
      }
    }

  const title = service.seo_title || `${service.name} - Professional IT Solutions | ${NAME}`;
  const description = service.seo_description || service.short_description || service.overview;

  return {
    title,
    description,
    keywords: keywordsArray,
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
      url: `${FRONTEND}/service/api-development`,
      siteName: NAME,
      images: [
        {
          url: `${FRONTEND}/banner.png`,
          width: 1920,
          height: 1080,
          alt: `${service.name} by ${NAME} - Miami IT Solutions`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${FRONTEND}/banner.png`],
      creator: "@codecraft_studios",
    },
    alternates: {
      canonical: `${FRONTEND}/service/api-development`,
    },
    category: "Technology",
  };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: `API Development Services - Custom APIs & Integrations | ${NAME}`,
      description: `Custom API development for seamless integration. Build reliable, secure, and scalable APIs that connect your systems.`,
      keywords: [
        ...KEYWORDS,
        "api development",
        "api development miami",
        "api development florida",
        "custom api development",
        "rest api development",
        "graphql api",
        "api integration",
        "microservices",
        "backend development",
      ],
    };
  }
}

export default async function ApiDevelopmentPage() {
  try {
    const data:any = await getData("/api/service/api-development")
    const service = data.data

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "API Development", current: true },
  ];

  // Generate service schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.overview,
    "provider": {
      "@type": "Organization",
      "name": NAME,
      "url": FRONTEND,
      "telephone": PHONE,
      "email": EMAIL,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Miami",
        "addressRegion": "FL",
        "addressCountry": "US"
      }
    },
    "areaServed": {
      "@type": "State",
      "name": "Florida"
    },
    "serviceType": service.name,
    "url": `${FRONTEND}/service/api-development`,
    "offers": {
      "@type": "Offer",
      "description": service.short_description,
      "seller": {
        "@type": "Organization",
        "name": NAME
      }
    },
    ...(service.features.length > 0 && {
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": `${service.name} Features`,
        "itemListElement": service.features.map((feature, index) => ({
          "@type": "Offer",
          "position": index + 1,
          "name": feature.feature,
          "description": feature.feature
        }))
      }
    })
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": NAME,
    "description": `Professional ${service.name} services in Miami, Florida`,
    "url": `${FRONTEND}/service/api-development`,
    "telephone": PHONE,
    "email": EMAIL,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Miami",
      "addressRegion": "FL",
      "addressCountry": "US"
    },
    "areaServed": {
      "@type": "State",
      "name": "Florida"
    }
  };

  // Related services section removed since we're only fetching single service
  // If you need related services, fetch them separately or hardcode some suggestions

  // Convert ServiceImage data to swiper format
  const projectItems = service.images.map((img) => ({
    id: img.id.toString(),
    type: "image" as const,
    src: `${SERVER_ENDPOINT}${img.image}`,
    title: img.title || "Project Image",
    description: img.caption || "",
    alt: img.title || "Service image"
  }));

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([serviceSchema, organizationSchema])
        }}
      />

      <div className="min-h-screen bg-background text-foreground">
        {/* Breadcrumbs */}
        <div className="container mx-auto max-w-7xl px-4 pt-22 pb-4">
          <BreadcrumbWithSchema items={breadcrumbItems} />
        </div>

        {/* Hero */}
        <section className="relative h-[90vh] w-full overflow-hidden">
          {/* Background video */}
          <video
            src="/videos/grid.mp4"
            autoPlay
            loop
            muted
            className="absolute top-0 left-0 w-full h-full object-cover"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 via-black/50 to-blue-500/20" />

          {/* Content */}
          <div className="relative z-10 flex items-center justify-center flex-col h-full">

            <Badge className="bg-primary text-primary-foreground border-primary/30">
              PROFESSIONAL SERVICE
            </Badge>


            <h1 id="service-heading" className="superfont text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              {service.name}
            </h1>

            <p className="text-xl text-center md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Custom API Development for Seamless Integration
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="group">
                    <Link href="/contact">
                      Get Started Today
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                  >
                    <Link href="/portfolio">View Our Work</Link>
                  </Button>
            </div>

          </div>
        </section>

        {/* Service Overview */}
        <section className="py-12 px-4 bg-violet-800" aria-labelledby="overview-heading" >
          <div className="container mx-auto max-w-6xl items-center text-center ">
            <p className="text-xl leading-relaxed">At CodeCraft Studios, we build reliable, secure, and scalable APIs that connect your systems, power your applications, and unlock automation across platforms. Our custom APIs act as the glue that ties your digital ecosystem together, making sure everything communicates the way it should.</p>
          </div>
        </section>

        <ClientsMarquee/>
        <Portfolio/>

        <section className="py-20 px-4" aria-labelledby="what-is-api-heading">
          <div className="container mx-auto max-w-6xl">
            <div className=" gap-12 items-start">
              <div>
                <h2 id="what-is-api-heading" className="superfont text-3xl md:text-4xl font-bold mb-6">
                  What Is API Development?
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="text-lg leading-relaxed mb-6">APIs — Application Programming Interfaces — are the bridges that allow different software systems to communicate. They enable data transfer, trigger events, automate tasks, and connect services. Without APIs, most modern platforms — including websites, mobile apps, and SaaS tools — would simply fall apart.</p>
                  <p className="text-lg leading-relaxed mb-6">Think of an API as a waiter at a restaurant. It takes your order (request), delivers it to the kitchen (server), and brings back your food (response). The process is invisible to users but crucial to delivering a seamless, consistent digital experience.</p>
                  <p className="text-lg leading-relaxed mb-6">At CodeCraft Studios, we approach API development with precision and business awareness. We don't just build endpoints — we design secure workflows, streamline operations, and help you expose only what's necessary to trusted services and users.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4" aria-labelledby="what-we-build-heading">
          <div className="container mx-auto max-w-6xl">
            <div className=" gap-12 items-start">
              <div>
                <h2 id="what-we-build-heading" className="superfont text-3xl md:text-4xl font-bold mb-6">
                  What We Build
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="text-lg leading-relaxed mb-6">Our team specializes in building all types of APIs, tailored to your goals. We develop RESTful APIs for traditional apps, GraphQL APIs for apps that demand flexible querying, and full-stack custom APIs to manage business-specific workflows. Whatever the use case, we ensure reliability, scalability, and maintainability.</p>
                  <p className="text-lg leading-relaxed mb-6">We also offer robust third-party integrations. Whether you're working with <strong>Stripe, ShipEngine, Twilio, Square, or Google Maps</strong>, we've built APIs that connect systems to the world's most trusted tools. Your business can automate orders, send real-time SMS, calculate shipping, and more — all via seamless API calls.</p>
                  <p className="text-lg leading-relaxed mb-6">Security is baked into every line of code. Our APIs come with <strong>token authentication, OAuth2, rate limiting, input validation, and encrypted communications</strong>. We make sure your endpoints only respond to who they should, when they should.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Stack */}
        {service.stack.length > 0 && (
          <section className="py-20 px-4 bg-muted/20" aria-labelledby="tech-stack-heading">
            <div className="container mx-auto max-w-6xl">
              <div className="text-start mb-12">
                <h2 id="tech-stack-heading" className="superfont text-3xl md:text-4xl font-bold mb-6">
                  Our Tech Stack
                </h2>
                <p className="text-lg leading-relaxed mb-6">We build APIs using technologies proven to scale. Our backend languages include <strong>Python (using Django REST Framework), JavaScript (Node.js/Express), and TypeScript</strong> for modern, typed environments. These tools allow us to move fast while maintaining reliability and structure.</p>
                <p className="text-lg leading-relaxed mb-6">For data storage, we work with relational and non-relational databases including <strong>PostgreSQL, MySQL, and MongoDB</strong>. We design schemas tailored to the API's purpose, minimizing response times and avoiding unnecessary overhead or complexity.</p>
                <p className="text-lg leading-relaxed mb-6">All of our APIs include <strong>OpenAPI/Swagger documentation</strong> and are built with tools like <strong>Postman and Insomnia</strong> for easy testing. We use <strong>Redis for caching, JWT for auth, Firebase</strong> for real-time data when needed, and <strong>GitHub Actions</strong> for continuous integration and delivery (CI/CD).</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {service.stack.map((tech) => (
                  <Card key={tech.id} className="group bg-card/50 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                    <CardContent className="p-4 text-center">
                      <div className="mb-3 flex justify-center">
                        <img
                          src={`${SERVER_ENDPOINT}${tech.logo}`}
                          alt={tech.name}
                          className="w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <h3 className="font-semibold text-sm">{tech.name}</h3>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-20 px-4" aria-labelledby="why-custom-heading">
          <div className="container mx-auto max-w-6xl">
            <div className=" gap-12 items-start">
              <div>
                <h2 id="why-custom-heading" className="superfont text-3xl md:text-4xl font-bold mb-6">
                  Why Custom API Development Matters
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="text-lg leading-relaxed mb-6">Pre-built plugins and generic integrations only get you so far. At some point, your business needs flexibility, ownership, and performance. That's where custom APIs shine — they give you control over how your systems behave, what data is shared, and how your tools evolve.</p>
                  <p className="text-lg leading-relaxed mb-6">Custom APIs eliminate the bottlenecks and limitations of one-size-fits-all software. You can automate complex workflows, expand integrations, and build entire products on top of your infrastructure. With our help, your API becomes a business engine — not just a feature.</p>
                  <p className="text-lg leading-relaxed mb-6">Security, performance, and scalability are non-negotiables. With a custom-built API, you can ensure endpoints are protected, response times are lightning fast, and future enhancements don't require a complete rebuild. It's development with growth in mind.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4" aria-labelledby="development-process-heading">
          <div className="container mx-auto max-w-6xl">
            <div className=" gap-12 items-start">
              <div>
                <h2 id="development-process-heading" className="superfont text-3xl md:text-4xl font-bold mb-6">
                  Our Development Process
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="text-lg leading-relaxed mb-6">We begin with deep requirements gathering. This includes understanding your internal systems, external touchpoints, business logic, and user needs. We map out every endpoint, determine data formats, and choose the right authentication strategy for your use case.</p>
                  <p className="text-lg leading-relaxed mb-6">Next comes architectural planning. We design the API schema and database models, ensuring the system is optimized for performance, minimal redundancy, and easy maintenance. This phase is crucial for keeping your API fast, clean, and adaptable over time.</p>
                  <p className="text-lg leading-relaxed mb-6">Once development begins, we code in modules, test each endpoint in isolation, and write usage documentation. After testing, we deploy to a secure, scalable cloud environment and monitor performance. You'll receive access to documentation, test collections, and logs for ongoing visibility.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4" aria-labelledby="why-codecraft-heading">
          <div className="container mx-auto max-w-6xl">
            <div className=" gap-12 items-start">
              <div>
                <h2 id="why-codecraft-heading" className="superfont text-3xl md:text-4xl font-bold mb-6">
                  Why CodeCraft Studios?
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="text-lg leading-relaxed mb-6">We've built APIs for startups, eCommerce platforms, internal tools, mobile apps, and government-grade systems. Our developers write modular, well-documented code using best practices and security standards. We don't just ship — we support, optimize, and evolve with your business.</p>
                  <p className="text-lg leading-relaxed mb-6">We care deeply about clean architecture. Our APIs are version-controlled, future-proof, and scalable. Need to add a new endpoint a year later? No problem. Want to switch from REST to GraphQL? We plan for change. That's the benefit of working with professionals who think long-term.</p>
                  <p className="text-lg leading-relaxed mb-6">At CodeCraft Studios, we speak both code and business. We understand what your API needs to do today — and what it might need to do tomorrow. That's why clients choose us not just to build APIs, but to build systems that drive real impact.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4" aria-labelledby="lets-build-heading">
          <div className="container mx-auto max-w-6xl">
            <div className=" gap-12 items-start">
              <div>
                <h2 id="lets-build-heading" className="superfont text-3xl md:text-4xl font-bold mb-6">
                  Let's Build Smarter Connections
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="text-lg leading-relaxed mb-6">APIs are the foundation of your tech stack — let's make sure yours is rock solid. Whether you need an internal microservice, an external developer platform, or a mobile backend, we'll craft an API tailored to your exact needs and built for scale.</p>
                  <p className="text-lg leading-relaxed mb-6">Your business deserves more than just working code. You deserve fast, secure, elegant solutions that make integration painless and future development easy. That's what we do at CodeCraft Studios — turn complexity into simplicity, and ideas into real-world integrations.</p>
                  <p className="text-lg leading-relaxed mb-6">Let's connect your systems, extend your reach, and automate your processes — one endpoint at a time. Reach out today and let's get started.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Project Showcase Swiper */}
        {projectItems.length > 0 && (
          <section className="py-20 px-4 bg-muted/10" aria-labelledby="projects-heading">
            <div className="container mx-auto max-w-7xl">
              <div className="text-center mb-12">
                <h2 id="projects-heading" className="superfont text-3xl md:text-4xl font-bold mb-6">
                  Featured API Projects & Solutions
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Explore our portfolio of successful API development projects. Each solution showcases our commitment to security, performance, and seamless integration capabilities.
                </p>
              </div>

              <ProjectSwiper items={projectItems} className="max-w-6xl mx-auto" />

              <div className="text-center mt-12">
                <Button asChild size="lg" className="group">
                  <Link href="/contact">
                    Start Your API Project
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* Reviews Section */}
        <Reviews />

        {/* CTA Section */}
        <CTASection />
      </div>
    </>
  );
  } catch (error) {
    console.error('Error in ApiDevelopmentPage:', error);
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Service Temporarily Unavailable</h1>
          <p className="text-muted-foreground">Please try again later.</p>
        </div>
      </div>
    );
  }
}