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
    
    const data:any = await getData("/api/service/web-development")
    const service:any = data.data

    const title = service.seo_title
    const description = service.seo_description
    const keywords = service.seo_keywords

    if (!service) {
      console.log('Web development service not found, using fallback metadata');
      return {
        title: title,
        description: description,
        keywords: keywords
      };
    }

    

 
  return {
    title,
    description,
    keywords: keywords,
    authors: [{ name: NAME, url: FRONTEND }, {name: "CodeCraft Studios, LLC", url:"https://www.codecraftstudios.net"}],
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
      url: `${FRONTEND}/service/web-development`,
      siteName: NAME,
      images: [
        {
          url: `${FRONTEND}/banner.webp`,
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
      images: [`${FRONTEND}/banner.webp`],
      creator: "@codecraft_studios",
    },
    alternates: {
      canonical: `${FRONTEND}/service/web-development`,
    },
    category: "Technology",
  };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: `Web Development Services - Professional IT Solutions | ${NAME}`,
      description: `Custom websites built with modern technologies and best practices.`,
      keywords: [
        ...KEYWORDS,
        "web development",
        "web development miami",
        "web development florida",
        "professional web development",
        "web development services",
        "react",
        "nextjs",
        "typescript",
        "custom websites",
        "responsive design",
      ],
    };
  }
}

export default async function WebDevelopmentPage() {
  try {
    const data:any = await getData("/api/service/web-development")
    const service = data.data

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Web Development", current: true },
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
    "url": `${FRONTEND}/service/web-development`,
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
    "url": `${FRONTEND}/service/web-development`,
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
              {service.short_description}
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
            <p className="text-xl leading-relaxed">{service.overview}</p>  
          </div>
        </section>


        <section className="py-20 px-4" aria-labelledby="overview-heading">
          <div className="container mx-auto max-w-6xl">
            <div className=" gap-12 items-start">
              <div>
                <h2 id="overview-heading" className="superfont text-3xl md:text-4xl font-bold mb-6">
                  Custom Web Development Solutions
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="text-lg leading-relaxed mb-6">At <strong>CodeCraft Studios,</strong> we specialize in crafting <strong>high-performance websites and web applications</strong> that don’t just look great — <strong>they drive results.</strong> Whether you need a <strong>lead-generating landing page, a robust ecommerce platform, or a full-stack SaaS product, our development team brings over 7 years of experience to every project.</strong></p>
                  <p className="text-lg leading-relaxed mb-6">We don’t believe in one-size-fits-all solutions. <strong>Every business is different, and we tailor our web development services to your specific goals, audience, and functionality needs.</strong> From concept to deployment, we build websites that are intuitive, fast, secure, and scalable — with full attention to both backend and frontend performance.</p>
                  <p className="text-lg leading-relaxed mb-6">With CodeCraft Studios, you’re not just getting a developer — <strong>you’re getting a partner.</strong> We don't finish your website and run away with the money, We instead collaborate with you at every stage of development and post development to make sure your digital product is aligned with your vision, technically sound, and built for long-term success, and scalability.</p>
                </div>
              </div>

              
            </div>
          </div>
        </section>

        <ClientsMarquee/>
        <Portfolio/>
        {/* Technology Stack */}
        {service.stack.length > 0 && (
          <section className="py-20 px-4 bg-muted/20" aria-labelledby="tech-stack-heading">
            <div className="container mx-auto max-w-6xl">
              <div className="text-start mb-12">
                <h2 id="tech-stack-heading" className="superfont text-3xl md:text-4xl font-bold mb-6">
                  Technology Stack
                </h2>
                <p className="text-lg leading-relaxed mb-6">We work with <strong>today’s most powerful and reliable development tools to create websites that are secure, future-proof, and scalable.</strong> Our developers stay ahead of the curve, constantly refining their skills in both frontend and backend technologies.</p>
                <p className="text-lg leading-relaxed mb-6">For the frontend, we use <strong>modern frameworks like React, Angular, Vue, Next.js, and more, paired with utility-first CSS libraries like Tailwind and Bootstrap to deliver clean, responsive UIs.</strong> These technologies allow us to create <strong>pixel-perfect experiences that adapt to any device or screen size.</strong></p>
                <p className="text-lg leading-relaxed mb-6">On the backend, we utilize <strong>Django and Node.js for their performance, flexibility, and scalability.</strong> Combined with <strong>databases like PostgreSQL and MongoDB,</strong> and <strong>integrations via RESTful or GraphQL APIs,</strong> we build full-stack solutions ready for anything.</p>
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

        <section className="py-20 px-4" aria-labelledby="overview-heading">
          <div className="container mx-auto max-w-6xl">
            <div className=" gap-12 items-start">
              <div>
                <h2 id="overview-heading" className="superfont text-3xl md:text-4xl font-bold mb-6">
                  Our Design Principles
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="text-lg leading-relaxed mb-6">We believe that great development starts with thoughtful design. Our process ensures every layout, color scheme, and user interaction is grounded in strategy. The result? Visually compelling interfaces that enhance usability and conversion potential.</p>
                  <p className="text-lg leading-relaxed mb-6">Every site we build is mobile-first, responsive, and tested across all major devices and browsers. We also incorporate WCAG accessibility standards to ensure inclusivity for users with disabilities. A website should work beautifully for everyone, not just a few.</p>
                  <p className="text-lg leading-relaxed mb-6">We pay close attention to UI/UX details, designing intuitive navigation and clear content hierarchy. This not only improves user experience but also increases engagement, time on site, and overall satisfaction. Your users should enjoy every second they spend on your site.</p>
                </div>
              </div>

              
            </div>
          </div>
        </section>

        <section className="py-20 px-4" aria-labelledby="overview-heading">
          <div className="container mx-auto max-w-6xl">
            <div className=" gap-12 items-start">
              <div>
                <h2 id="overview-heading" className="superfont text-3xl md:text-4xl font-bold mb-6">
                  Custom Features & Integrations
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="text-lg leading-relaxed mb-6">Need a <strong>custom booking system, client portal, inventory dashboard, or marketplace functionality?</strong> We develop <strong>advanced features and integrations tailored to your operations.</strong> From <strong>Stripe payments</strong> to <strong>real-time logistics,</strong> we’ve built it all. </p>
                  <p className="text-lg leading-relaxed mb-6">We offer <strong>third-party integrations with platforms like Square, Twilio, Google Maps, ShipEngine, Calendly, and countless others.</strong> Whether you need <strong>automated email flows</strong> or <strong>geolocation tools,</strong> we build <strong>custom APIs or connect to existing services.</strong></p>
                  <p className="text-lg leading-relaxed mb-6">Our backend systems are designed with modularity in mind — meaning future integrations, updates, and scaling won’t require a full rebuild. We create tools that grow with your business, not ones that hold you back.</p>
                </div>
              </div>

              
            </div>
          </div>
        </section>
        <section className="py-20 px-4" aria-labelledby="overview-heading">
          <div className="container mx-auto max-w-6xl">
            <div className=" gap-12 items-start">
              <div>
                <h2 id="overview-heading" className="superfont text-3xl md:text-4xl font-bold mb-6">
                  Long-Term Value & Support
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="text-lg leading-relaxed mb-6">A great website isn’t a one-time project — it’s a living digital asset. That’s why we offer continuous development, performance monitoring, and upgrade support. As your business evolves, we’re here to add new features, refine your user flow, and keep your systems running smoothly.</p>
                  <p className="text-lg leading-relaxed mb-6">Our clients stay with us because we offer more than code. We’re responsive, transparent, and truly invested in your long-term success. Our support packages include everything from bug fixes to SEO tune-ups and even security audits when needed.</p>
                  <p className="text-lg leading-relaxed mb-6">Whether we built your website or you need us to take over and improve an existing project, we’re here to optimize, scale, and protect your investment. At CodeCraft Studios, we don’t just ship projects — we support them.</p>
                </div>
              </div>

              
            </div>
          </div>
        </section>
        <section className="py-20 px-4" aria-labelledby="overview-heading">
          <div className="container mx-auto max-w-6xl">
            <div className=" gap-12 items-start">
              <div>
                <h2 id="overview-heading" className="superfont text-3xl md:text-4xl font-bold mb-6">
                  Let’s Build Something Big
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="text-lg leading-relaxed mb-6">If you're ready to launch a site that reflects your brand, streamlines your operations, and drives measurable results, let's talk. At CodeCraft Studios, we make custom web development easy, strategic, and results-driven.</p>
                  <p className="text-lg leading-relaxed mb-6">We’ll walk you through the whole process — from idea validation to launch day — and provide tools, support, and strategy along the way. Whether you're a startup, nonprofit, or scaling enterprise, our development team is ready to build your next big thing.</p>
                  <p className="text-lg leading-relaxed mb-6">It’s time to stop settling for generic websites. Let’s create something that truly represents your business — and helps it grow. Reach out to start your custom web development journey with CodeCraft Studios today.</p>
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
                  Featured Projects & Solutions
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Explore our portfolio of successful web development projects. Each solution showcases our commitment to modern design, performance optimization, and user experience excellence.
                </p>
              </div>

              <ProjectSwiper items={projectItems} className="max-w-6xl mx-auto" />

              <div className="text-center mt-12">
                <Button asChild size="lg" className="group">
                  <Link href="/contact">
                    Start Your Project
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
    console.error('Error in WebDevelopmentPage:', error);
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
