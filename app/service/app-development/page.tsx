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
    const data:any = await getData("/api/service/app-development")
    const service:any = data.data

    if (!service) {
      console.log('App development service not found, using fallback metadata');
      return {
        title: `Mobile App Development Services - iOS & Android Apps | ${NAME}`,
        description: `Professional mobile app development for iOS and Android. Build once, deploy everywhere with React Native expertise.`,
        keywords: [
          ...KEYWORDS,
          "app development",
          "mobile app development",
          "app development miami",
          "app development florida",
          "ios app development",
          "android app development",
          "react native",
          "flutter",
          "cross platform apps",
          "mobile development",
          "native apps",
        ],
      };
    }

    console.log('Found app development service:', service.name);

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
      url: `${FRONTEND}/service/app-development`,
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
      canonical: `${FRONTEND}/service/app-development`,
    },
    category: "Technology",
  };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: `Mobile App Development Services - iOS & Android Apps | ${NAME}`,
      description: `Professional mobile app development for iOS and Android. Build once, deploy everywhere with React Native expertise.`,
      keywords: [
        ...KEYWORDS,
        "app development",
        "mobile app development",
        "app development miami",
        "app development florida",
        "ios app development",
        "android app development",
        "react native",
      ],
    };
  }
}

export default async function AppDevelopmentPage() {
  try {
    const data:any = await getData("/api/service/app-development")
    const service = data.data

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "App Development", current: true },
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
    "url": `${FRONTEND}/service/app-development`,
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
    "url": `${FRONTEND}/service/app-development`,
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
              Professional Mobile Apps for iOS & Android
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
            <p className="text-xl leading-relaxed">At CodeCraft Studios, we create high-performance mobile applications that work seamlessly across iOS and Android platforms. Our cross-platform approach saves time and costs while delivering native-quality experiences that users love.</p>
          </div>
        </section>

        <ClientsMarquee/>
        <Portfolio/>

        <section className="py-20 px-4" aria-labelledby="mobile-first-heading">
          <div className="container mx-auto max-w-6xl">
            <div className=" gap-12 items-start">
              <div>
                <h2 id="mobile-first-heading" className="superfont text-3xl md:text-4xl font-bold mb-6">
                  Mobile-First Development Expertise
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="text-lg leading-relaxed mb-6">In today's mobile-driven world, your app needs to deliver exceptional performance, intuitive design, and seamless functionality across all devices. At <strong>CodeCraft Studios</strong>, we specialize in building <strong>native-quality mobile applications using React Native and Flutter</strong> — technologies that let us create one codebase that works perfectly on both iOS and Android.</p>
                  <p className="text-lg leading-relaxed mb-6">Our mobile development approach focuses on <strong>user experience, performance optimization, and platform-specific design patterns</strong>. We don't just port websites to mobile — we create purpose-built applications that take advantage of device capabilities like camera access, GPS, push notifications, and offline functionality.</p>
                  <p className="text-lg leading-relaxed mb-6">Whether you need a <strong>consumer-facing app, enterprise solution, or startup MVP</strong>, our team has the expertise to bring your vision to life. We handle everything from concept and design to development, testing, and App Store deployment.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4" aria-labelledby="cross-platform-heading">
          <div className="container mx-auto max-w-6xl">
            <div className=" gap-12 items-start">
              <div>
                <h2 id="cross-platform-heading" className="superfont text-3xl md:text-4xl font-bold mb-6">
                  Cross-Platform Advantages
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="text-lg leading-relaxed mb-6">Why build two separate apps when you can build one that works everywhere? Our <strong>React Native and Flutter expertise</strong> allows us to create applications that share up to 90% of their codebase between iOS and Android, dramatically reducing development time and maintenance costs.</p>
                  <p className="text-lg leading-relaxed mb-6">Cross-platform development doesn't mean compromising on quality. Our apps deliver <strong>native performance, platform-specific UI elements, and seamless integration with device features</strong>. Users won't know the difference between our cross-platform app and a native one — except yours will be available on both platforms simultaneously.</p>
                  <p className="text-lg leading-relaxed mb-6">This approach also means <strong>faster updates, consistent feature rollouts, and unified branding</strong> across platforms. When you need to add new functionality or fix issues, we update once and deploy everywhere.</p>
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
                  Mobile Development Stack
                </h2>
                <p className="text-lg leading-relaxed mb-6">We use proven, industry-leading technologies to build mobile apps that scale. Our primary frameworks include <strong>React Native for JavaScript-based development and Flutter for Dart-based solutions</strong>. Both approaches deliver excellent performance while maintaining code reusability.</p>
                <p className="text-lg leading-relaxed mb-6">For backend integration, we connect your mobile app to <strong>REST APIs, GraphQL endpoints, and real-time databases like Firebase</strong>. We also integrate with <strong>cloud services, payment processors, analytics platforms, and third-party APIs</strong> to extend your app's capabilities.</p>
                <p className="text-lg leading-relaxed mb-6">Our development workflow includes <strong>automated testing, continuous integration, and staged deployment pipelines</strong>. We use tools like <strong>Expo for React Native, CodePush for over-the-air updates, and platform-specific testing frameworks</strong> to ensure quality and reliability.</p>
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

        <section className="py-20 px-4" aria-labelledby="app-features-heading">
          <div className="container mx-auto max-w-6xl">
            <div className=" gap-12 items-start">
              <div>
                <h2 id="app-features-heading" className="superfont text-3xl md:text-4xl font-bold mb-6">
                  Essential App Features & Integrations
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="text-lg leading-relaxed mb-6">Modern mobile apps need more than just basic functionality. We build apps with <strong>user authentication, push notifications, offline data synchronization, and real-time chat capabilities</strong>. Whether you need social features, e-commerce functionality, or enterprise-grade security, we've got you covered.</p>
                  <p className="text-lg leading-relaxed mb-6">We integrate your app with essential services like <strong>payment processing (Stripe, PayPal, Apple Pay, Google Pay), analytics platforms (Firebase, Mixpanel), and marketing tools (OneSignal, Braze)</strong>. Your app can also connect to existing business systems through custom APIs.</p>
                  <p className="text-lg leading-relaxed mb-6">Location services, camera functionality, biometric authentication, and device sensors are all part of our toolkit. We make sure your app takes full advantage of what smartphones can do, creating engaging experiences that keep users coming back.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4" aria-labelledby="design-process-heading">
          <div className="container mx-auto max-w-6xl">
            <div className=" gap-12 items-start">
              <div>
                <h2 id="design-process-heading" className="superfont text-3xl md:text-4xl font-bold mb-6">
                  User-Centered Design Process
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="text-lg leading-relaxed mb-6">Great apps start with great design. Our process begins with <strong>user research, wireframing, and prototyping</strong> to ensure every screen serves a purpose and every interaction feels natural. We follow platform-specific design guidelines while maintaining your brand identity.</p>
                  <p className="text-lg leading-relaxed mb-6">We create <strong>responsive designs that work across different screen sizes, from phones to tablets</strong>. Our UI/UX team focuses on intuitive navigation, accessible design principles, and performance optimization to ensure fast load times and smooth animations.</p>
                  <p className="text-lg leading-relaxed mb-6">Before development begins, we provide <strong>interactive prototypes and user flow diagrams</strong> so you can see exactly how your app will work. This collaborative approach ensures the final product matches your vision and meets user expectations.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4" aria-labelledby="launch-support-heading">
          <div className="container mx-auto max-w-6xl">
            <div className=" gap-12 items-start">
              <div>
                <h2 id="launch-support-heading" className="superfont text-3xl md:text-4xl font-bold mb-6">
                  Launch & Ongoing Support
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="text-lg leading-relaxed mb-6">Getting your app into the App Store and Google Play Store requires expertise in submission processes, app review guidelines, and optimization strategies. We handle the entire submission process and help you navigate any review requirements or rejections.</p>
                  <p className="text-lg leading-relaxed mb-6">Post-launch, we provide <strong>ongoing maintenance, feature updates, and performance monitoring</strong>. Mobile operating systems update frequently, and we ensure your app stays compatible and takes advantage of new platform features as they become available.</p>
                  <p className="text-lg leading-relaxed mb-6">We also offer <strong>analytics setup, crash reporting, and user feedback integration</strong> to help you understand how people use your app and where improvements can be made. Your app's success is our success.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4" aria-labelledby="why-choose-heading">
          <div className="container mx-auto max-w-6xl">
            <div className=" gap-12 items-start">
              <div>
                <h2 id="why-choose-heading" className="superfont text-3xl md:text-4xl font-bold mb-6">
                  Why Choose CodeCraft Studios?
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="text-lg leading-relaxed mb-6">We've built mobile apps for startups launching their first product, established businesses expanding to mobile, and enterprises needing internal tools. Our development team understands both the technical challenges and business requirements of successful mobile applications.</p>
                  <p className="text-lg leading-relaxed mb-6">Our approach is transparent and collaborative. You'll receive <strong>regular progress updates, access to staging builds for testing, and detailed documentation</strong> for ongoing maintenance. We believe in building long-term partnerships, not just delivering projects.</p>
                  <p className="text-lg leading-relaxed mb-6">At CodeCraft Studios, we stay current with mobile development trends, platform updates, and industry best practices. Your app won't just work today — it'll be built to evolve with your business and adapt to future platform changes.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4" aria-labelledby="ready-to-build-heading">
          <div className="container mx-auto max-w-6xl">
            <div className=" gap-12 items-start">
              <div>
                <h2 id="ready-to-build-heading" className="superfont text-3xl md:text-4xl font-bold mb-6">
                  Ready to Build Your Mobile App?
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="text-lg leading-relaxed mb-6">Whether you're launching a startup, expanding your business to mobile, or building an internal tool, we're here to turn your app idea into reality. Our mobile development expertise covers everything from initial concept to App Store success.</p>
                  <p className="text-lg leading-relaxed mb-6">Let's discuss your project requirements, target audience, and business goals. We'll provide a clear roadmap for development, realistic timelines, and transparent pricing. Your mobile app journey starts with a conversation.</p>
                  <p className="text-lg leading-relaxed mb-6">Contact CodeCraft Studios today and let's build something amazing together. Your users are waiting for the app that will make their lives easier, more productive, or more enjoyable — let's create it.</p>
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
                  Featured Mobile App Projects
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Explore our portfolio of successful mobile applications. Each project showcases our commitment to user experience, performance, and cross-platform excellence.
                </p>
              </div>

              <ProjectSwiper items={projectItems} className="max-w-6xl mx-auto" />

              <div className="text-center mt-12">
                <Button asChild size="lg" className="group">
                  <Link href="/contact">
                    Start Your App Project
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
    console.error('Error in AppDevelopmentPage:', error);
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