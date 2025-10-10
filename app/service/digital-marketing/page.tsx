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

    const data:any = await getData("/api/service/digital-marketing")
    const service:any = data.data

    const title = service.seo_title
    const description = service.seo_description
    const keywords = service.seo_keywords

    if (!service) {
      console.log('Digital marketing service not found, using fallback metadata');
      return {
        title: title,
        description: description,
        keywords: keywords
      };
    }

    console.log('Found Digital marketing service:', service.name);




  return {
    title,
    description,
    keywords: keywords,
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
      url: `${FRONTEND}/service/digital-marketing`,
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
      canonical: `${FRONTEND}/service/digital-marketing`,
    },
    category: "Technology",
  };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: `Digital Marketing Services - Growth-Driven Strategies | ${NAME}`,
      description: `Comprehensive digital marketing strategies that drive traffic, generate leads, and accelerate business growth through data-driven campaigns.`,
      keywords: [
        ...KEYWORDS,
        "digital marketing",
        "digital marketing services",
        "digital marketing miami",
        "digital marketing florida",
        "social media marketing",
        "content marketing",
        "email marketing",
        "ppc advertising",
        "marketing automation",
        "conversion optimization",
      ],
    };
  }
}

export default async function DigitalMarketingPage() {
  try {
    const data:any = await getData("/api/service/digital-marketing")
    const service = data.data
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Digital Marketing", current: true },
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
    "url": `${FRONTEND}/service/digital-marketing`,
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
        "itemListElement": service.features.map((feature:any, index:number) => ({
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
    "url": `${FRONTEND}/service/digital-marketing`,
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

  // Convert ServiceImage data to swiper format
  const projectItems = service.images.map((img:any) => ({
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
              Strategic Digital Marketing That Drives Real Business Growth
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
            <p className="text-xl leading-relaxed">At CodeCraft Studios, we don't just run campaigns — we build comprehensive digital ecosystems that transform how your business connects with customers. Our data-driven approach combines strategic thinking with cutting-edge execution to deliver measurable results that scale with your growth.</p>
          </div>
        </section>

        <ClientsMarquee/>
        <Portfolio/>

        <section className="py-8 px-4" aria-labelledby="what-we-offer-heading">
          <div className="container mx-auto max-w-6xl">
            <div className=" gap-12 items-start">
              <div>
                <h2 id="what-we-offer-heading" className="superfont text-3xl md:text-4xl font-bold mb-6">
                  Comprehensive Digital Marketing Solutions
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="text-lg leading-relaxed mb-6">Digital marketing success requires a multi-channel approach that connects every touchpoint in your customer journey. Our comprehensive suite includes <strong>search engine optimization (SEO), pay-per-click advertising (PPC), social media marketing, content strategy, email automation, and conversion rate optimization</strong> — all working together to maximize your ROI.</p>
                  <p className="text-lg leading-relaxed mb-6">We specialize in <strong>data-driven campaign management</strong> that goes beyond vanity metrics. Every strategy is built around your specific business objectives, whether that's increasing brand awareness, generating qualified leads, driving e-commerce sales, or building customer loyalty. Our integrated approach ensures consistent messaging and optimal performance across all digital channels.</p>
                  <p className="text-lg leading-relaxed mb-6">From <strong>strategic planning and creative development to advanced analytics and performance optimization</strong>, we handle every aspect of your digital presence. Our team combines technical expertise with creative vision to deliver campaigns that not only reach your target audience but inspire them to take action.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 px-4" aria-labelledby="search-marketing-heading">
          <div className="container mx-auto max-w-6xl">
            <div className=" gap-12 items-start">
              <div>
                <h2 id="search-marketing-heading" className="superfont text-3xl md:text-4xl font-bold mb-6">
                  Search Engine Marketing & SEO Excellence
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="text-lg leading-relaxed mb-6">Search visibility is the foundation of digital success. Our <strong>advanced SEO strategies</strong> combine technical optimization, content excellence, and authority building to dominate search rankings. We perform comprehensive audits, optimize site architecture, enhance page speed, and develop content strategies that attract both search engines and your ideal customers.</p>
                  <p className="text-lg leading-relaxed mb-6">Our <strong>paid search campaigns</strong> on Google Ads, Microsoft Advertising, and other platforms deliver immediate visibility while our SEO efforts build long-term organic growth. We use advanced keyword research, competitive analysis, and user intent mapping to create campaigns that capture high-quality traffic at every stage of the buying funnel.</p>
                  <p className="text-lg leading-relaxed mb-6">We also excel in <strong>local search optimization</strong>, helping businesses dominate their geographic markets through optimized Google Business Profiles, local citations, review management, and location-based content strategies. Whether you're targeting local customers or global markets, we ensure maximum search visibility.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 px-4" aria-labelledby="social-media-heading">
          <div className="container mx-auto max-w-6xl">
            <div className=" gap-12 items-start">
              <div>
                <h2 id="social-media-heading" className="superfont text-3xl md:text-4xl font-bold mb-6">
                  Social Media Marketing & Community Building
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="text-lg leading-relaxed mb-6">Social media is where brands come alive and communities thrive. Our <strong>social media marketing strategies</strong> span Facebook, Instagram, LinkedIn, Twitter, TikTok, and emerging platforms, creating engaging content that builds authentic connections with your audience while driving measurable business results.</p>
                  <p className="text-lg leading-relaxed mb-6">We develop <strong>platform-specific content strategies</strong> that leverage each channel's unique strengths. From visually stunning Instagram campaigns and thought leadership on LinkedIn to viral TikTok content and community-building Metastrategies, we ensure your brand voice resonates across every platform.</p>
                  <p className="text-lg leading-relaxed mb-6">Our social media advertising expertise includes <strong>advanced audience targeting, dynamic creative optimization, and cross-platform campaign coordination</strong>. We use detailed analytics and A/B testing to continuously refine your social presence, turning followers into customers and customers into brand advocates.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 px-4" aria-labelledby="content-marketing-heading">
          <div className="container mx-auto max-w-6xl">
            <div className=" gap-12 items-start">
              <div>
                <h2 id="content-marketing-heading" className="superfont text-3xl md:text-4xl font-bold mb-6">
                  Strategic Content Marketing & Brand Storytelling
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="text-lg leading-relaxed mb-6">Content is the fuel that powers every successful digital marketing campaign. Our <strong>comprehensive content marketing strategies</strong> include blog development, video production, infographic design, podcast creation, and interactive content that educates, entertains, and converts your audience at every touchpoint.</p>
                  <p className="text-lg leading-relaxed mb-6">We develop <strong>content calendars and editorial strategies</strong> aligned with your sales funnel, creating awareness-stage content that attracts prospects, consideration-stage content that nurtures leads, and decision-stage content that drives conversions. Every piece of content serves a strategic purpose in your customer journey.</p>
                  <p className="text-lg leading-relaxed mb-6">Our content team combines <strong>SEO expertise with creative storytelling</strong>, ensuring your content ranks well in search results while resonating emotionally with your audience. We also repurpose and amplify content across multiple channels, maximizing the value of every piece we create.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 px-4" aria-labelledby="email-automation-heading">
          <div className="container mx-auto max-w-6xl">
            <div className=" gap-12 items-start">
              <div>
                <h2 id="email-automation-heading" className="superfont text-3xl md:text-4xl font-bold mb-6">
                  Email Marketing & Marketing Automation
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="text-lg leading-relaxed mb-6">Email remains one of the highest-ROI marketing channels when executed strategically. Our <strong>advanced email marketing and automation strategies</strong> include welcome sequences, drip campaigns, behavioral triggers, abandoned cart recovery, post-purchase follow-ups, and re-engagement campaigns that nurture leads and maximize customer lifetime value.</p>
                  <p className="text-lg leading-relaxed mb-6">We design and develop <strong>responsive email templates</strong> that maintain your brand consistency while optimizing for deliverability and engagement. Our segmentation strategies ensure the right message reaches the right audience at the optimal time, increasing open rates, click-through rates, and conversions.</p>
                  <p className="text-lg leading-relaxed mb-6">Our marketing automation expertise extends beyond email to include <strong>multi-channel automation workflows</strong> that coordinate email, SMS, social media, and website personalization. We create sophisticated customer journeys that adapt based on user behavior, preferences, and engagement history.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 px-4" aria-labelledby="paid-advertising-heading">
          <div className="container mx-auto max-w-6xl">
            <div className=" gap-12 items-start">
              <div>
                <h2 id="paid-advertising-heading" className="superfont text-3xl md:text-4xl font-bold mb-6">
                  Performance-Driven Paid Advertising
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="text-lg leading-relaxed mb-6">Our <strong>paid advertising expertise</strong> spans Google Ads, MetaAds, LinkedIn Ads, Microsoft Advertising, YouTube Ads, and emerging platforms. We create high-performing campaigns that drive immediate results while building long-term brand equity through strategic audience development and creative excellence.</p>
                  <p className="text-lg leading-relaxed mb-6">We specialize in <strong>advanced campaign optimization techniques</strong> including dynamic creative testing, audience layering, smart bidding strategies, and cross-platform attribution modeling. Our data-driven approach ensures every advertising dollar works harder to deliver qualified traffic, leads, and sales.</p>
                  <p className="text-lg leading-relaxed mb-6">Our paid advertising strategies include <strong>retargeting campaigns, lookalike audience development, and funnel-specific ad sequences</strong> that guide prospects through the customer journey. We continuously optimize campaigns based on real-time performance data and market insights.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 px-4" aria-labelledby="conversion-optimization-heading">
          <div className="container mx-auto max-w-6xl">
            <div className=" gap-12 items-start">
              <div>
                <h2 id="conversion-optimization-heading" className="superfont text-3xl md:text-4xl font-bold mb-6">
                  Conversion Rate Optimization & User Experience
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="text-lg leading-relaxed mb-6">Driving traffic is only half the equation — converting that traffic into customers is where real growth happens. Our <strong>conversion rate optimization (CRO) strategies</strong> combine user experience design, A/B testing, heat mapping, and behavioral analysis to systematically improve your website's performance.</p>
                  <p className="text-lg leading-relaxed mb-6">We optimize every aspect of the user journey, from <strong>landing page design and form optimization to checkout processes and mobile experience</strong>. Our testing methodology ensures data-driven decisions that improve conversion rates while maintaining excellent user experience.</p>
                  <p className="text-lg leading-relaxed mb-6">Our CRO approach includes <strong>personalization strategies</strong> that deliver tailored experiences based on user behavior, demographics, and preferences. We use advanced tools and techniques to create dynamic content that speaks directly to each visitor's needs and interests.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 px-4" aria-labelledby="analytics-reporting-heading">
          <div className="container mx-auto max-w-6xl">
            <div className=" gap-12 items-start">
              <div>
                <h2 id="analytics-reporting-heading" className="superfont text-3xl md:text-4xl font-bold mb-6">
                  Advanced Analytics & Performance Tracking
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="text-lg leading-relaxed mb-6">Data drives every decision in our digital marketing approach. We implement <strong>comprehensive analytics and tracking systems</strong> using Google Analytics 4, Google Tag Manager, MetaPixel, and custom tracking solutions that provide deep insights into customer behavior, campaign performance, and ROI.</p>
                  <p className="text-lg leading-relaxed mb-6">Our <strong>custom reporting dashboards</strong> provide real-time visibility into all key performance indicators, from traffic and engagement metrics to lead generation and revenue attribution. We transform complex data into actionable insights that guide strategy optimization and budget allocation decisions.</p>
                  <p className="text-lg leading-relaxed mb-6">We specialize in <strong>multi-touch attribution modeling</strong> that reveals the true impact of each marketing channel and touchpoint in the customer journey. This advanced approach enables more accurate campaign optimization and budget allocation for maximum ROI.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 px-4" aria-labelledby="ecommerce-marketing-heading">
          <div className="container mx-auto max-w-6xl">
            <div className=" gap-12 items-start">
              <div>
                <h2 id="ecommerce-marketing-heading" className="superfont text-3xl md:text-4xl font-bold mb-6">
                  E-commerce Marketing & Sales Acceleration
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="text-lg leading-relaxed mb-6">E-commerce success requires specialized marketing strategies that address the unique challenges of online retail. Our <strong>e-commerce marketing expertise</strong> includes product feed optimization, Google Shopping campaigns, Amazon marketing, marketplace advertising, and retention marketing that drives both acquisition and lifetime value.</p>
                  <p className="text-lg leading-relaxed mb-6">We develop <strong>sophisticated remarketing strategies</strong> for e-commerce, including abandoned cart recovery, browse abandonment campaigns, post-purchase upselling, and win-back campaigns for inactive customers. Our approach maximizes revenue from every stage of the customer lifecycle.</p>
                  <p className="text-lg leading-relaxed mb-6">Our e-commerce strategies also include <strong>seasonal campaign planning, inventory-based bidding, and dynamic product advertising</strong> that adapts to stock levels, profit margins, and demand fluctuations. We help e-commerce businesses scale profitably while maintaining healthy unit economics.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 px-4" aria-labelledby="lead-generation-heading">
          <div className="container mx-auto max-w-6xl">
            <div className=" gap-12 items-start">
              <div>
                <h2 id="lead-generation-heading" className="superfont text-3xl md:text-4xl font-bold mb-6">
                  B2B Lead Generation & Sales Enablement
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="text-lg leading-relaxed mb-6">B2B marketing requires sophisticated strategies that address longer sales cycles and complex decision-making processes. Our <strong>B2B lead generation programs</strong> combine account-based marketing, LinkedIn advertising, email outreach, and content marketing to attract and nurture high-quality prospects through the entire sales funnel.</p>
                  <p className="text-lg leading-relaxed mb-6">We develop <strong>sales enablement tools and processes</strong> that align marketing and sales efforts, including lead scoring systems, automated nurture sequences, and sales intelligence platforms that help your team close more deals faster and more efficiently.</p>
                  <p className="text-lg leading-relaxed mb-6">Our B2B strategies also include <strong>thought leadership development, industry event marketing, and partnership marketing</strong> that establish your brand as a trusted authority in your industry while generating qualified leads and business opportunities.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 px-4" aria-labelledby="brand-development-heading">
          <div className="container mx-auto max-w-6xl">
            <div className=" gap-12 items-start">
              <div>
                <h2 id="brand-development-heading" className="superfont text-3xl md:text-4xl font-bold mb-6">
                  Brand Development & Digital Identity
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="text-lg leading-relaxed mb-6">Strong brands drive premium pricing and customer loyalty. Our <strong>brand development services</strong> include brand strategy, visual identity design, brand messaging, voice development, and brand guideline creation that ensures consistent communication across all digital touchpoints.</p>
                  <p className="text-lg leading-relaxed mb-6">We help businesses develop <strong>authentic brand personalities</strong> that resonate with target audiences while differentiating from competitors. Our approach combines market research, customer insights, and creative excellence to build brands that inspire trust and drive engagement.</p>
                  <p className="text-lg leading-relaxed mb-6">Our brand marketing strategies include <strong>reputation management, crisis communication planning, and brand awareness campaigns</strong> that protect and enhance your brand equity while driving business growth through increased recognition and preference.</p>
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
                  Digital Marketing Technology Stack
                </h2>
                <p className="text-lg leading-relaxed mb-6">We leverage <strong>cutting-edge marketing technology and analytics platforms</strong> to deliver superior results and insights. Our comprehensive tech stack includes industry-leading tools for campaign management, analytics, automation, and optimization that give our clients a competitive advantage in the digital marketplace.</p>
                <p className="text-lg leading-relaxed mb-6">Our platform expertise includes <strong>Google Marketing Platform, MetaBusiness Manager, HubSpot, Salesforce, Mailchimp, Hootsuite, SEMrush, Ahrefs, Hotjar, Optimizely, and many more</strong> specialized tools that enhance campaign performance and provide deep insights into customer behavior and campaign effectiveness.</p>
                <p className="text-lg leading-relaxed mb-6">We stay current with <strong>emerging marketing technologies and platforms</strong>, ensuring our clients benefit from the latest innovations in marketing automation, artificial intelligence, and data analytics. Our tech-forward approach delivers measurable improvements in efficiency and results.</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {service.stack.map((tech:any) => (
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

        <section className="py-8 px-4" aria-labelledby="mobile-marketing-heading">
          <div className="container mx-auto max-w-6xl">
            <div className=" gap-12 items-start">
              <div>
                <h2 id="mobile-marketing-heading" className="superfont text-3xl md:text-4xl font-bold mb-6">
                  Mobile Marketing & App Promotion
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="text-lg leading-relaxed mb-6">Mobile devices drive the majority of digital interactions today. Our <strong>mobile marketing strategies</strong> include app store optimization (ASO), mobile advertising, SMS marketing, push notifications, and location-based marketing that reaches customers wherever they are with relevant, timely messages.</p>
                  <p className="text-lg leading-relaxed mb-6">We specialize in <strong>app promotion campaigns</strong> across Google Play, Apple App Store, and mobile advertising networks. Our strategies include app install campaigns, engagement campaigns, and retention marketing that maximize app downloads and user lifetime value.</p>
                  <p className="text-lg leading-relaxed mb-6">Our mobile approach also includes <strong>mobile-first content creation, responsive design optimization, and mobile user experience testing</strong> that ensures excellent performance across all devices and platforms. We help businesses succeed in the mobile-first digital landscape.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 px-4" aria-labelledby="video-marketing-heading">
          <div className="container mx-auto max-w-6xl">
            <div className=" gap-12 items-start">
              <div>
                <h2 id="video-marketing-heading" className="superfont text-3xl md:text-4xl font-bold mb-6">
                  Video Marketing & Visual Storytelling
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="text-lg leading-relaxed mb-6">Video content dominates social media engagement and drives higher conversion rates across all digital channels. Our <strong>video marketing expertise</strong> includes YouTube advertising, social media video campaigns, live streaming strategies, and video content creation that captures attention and drives action.</p>
                  <p className="text-lg leading-relaxed mb-6">We develop <strong>comprehensive video content strategies</strong> that include educational content, product demonstrations, customer testimonials, behind-the-scenes content, and branded entertainment that builds audience engagement while advancing business objectives.</p>
                  <p className="text-lg leading-relaxed mb-6">Our video marketing approach includes <strong>multi-platform optimization, video SEO, and performance tracking</strong> that ensures your video content reaches the right audience and drives measurable results. We help businesses leverage the power of visual storytelling for maximum impact.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 px-4" aria-labelledby="influencer-marketing-heading">
          <div className="container mx-auto max-w-6xl">
            <div className=" gap-12 items-start">
              <div>
                <h2 id="influencer-marketing-heading" className="superfont text-3xl md:text-4xl font-bold mb-6">
                  Influencer Marketing & Partnership Development
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="text-lg leading-relaxed mb-6">Authentic endorsements from trusted voices drive purchasing decisions and brand awareness. Our <strong>influencer marketing programs</strong> include micro-influencer campaigns, celebrity partnerships, brand ambassador programs, and user-generated content strategies that amplify your message through trusted third parties.</p>
                  <p className="text-lg leading-relaxed mb-6">We handle <strong>influencer identification, outreach, contract negotiation, campaign management, and performance tracking</strong> to ensure successful partnerships that deliver authentic content and measurable results. Our network includes influencers across all major platforms and industries.</p>
                  <p className="text-lg leading-relaxed mb-6">Our influencer strategies also include <strong>co-marketing partnerships, affiliate programs, and strategic alliances</strong> that expand your reach through complementary brands and organizations. We help businesses build powerful partnership ecosystems that accelerate growth.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 px-4" aria-labelledby="crisis-management-heading">
          <div className="container mx-auto max-w-6xl">
            <div className=" gap-12 items-start">
              <div>
                <h2 id="crisis-management-heading" className="superfont text-3xl md:text-4xl font-bold mb-6">
                  Digital Crisis Management & Reputation Protection
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="text-lg leading-relaxed mb-6">In today's connected world, brand reputation can change instantly. Our <strong>digital crisis management and reputation protection services</strong> include crisis communication planning, real-time monitoring, rapid response strategies, and reputation recovery campaigns that protect your brand during challenging times.</p>
                  <p className="text-lg leading-relaxed mb-6">We provide <strong>24/7 reputation monitoring</strong> across social media, review sites, news outlets, and search results. Our early warning systems enable proactive responses that minimize negative impact while maximizing opportunities to strengthen brand perception.</p>
                  <p className="text-lg leading-relaxed mb-6">Our crisis management approach includes <strong>stakeholder communication, employee advocacy training, and long-term reputation rebuilding strategies</strong> that help businesses emerge stronger from challenging situations. We turn crises into opportunities for increased trust and loyalty.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 px-4" aria-labelledby="international-marketing-heading">
          <div className="container mx-auto max-w-6xl">
            <div className=" gap-12 items-start">
              <div>
                <h2 id="international-marketing-heading" className="superfont text-3xl md:text-4xl font-bold mb-6">
                  International Marketing & Global Expansion
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="text-lg leading-relaxed mb-6">Expanding into new markets requires specialized expertise in local cultures, languages, and digital behaviors. Our <strong>international marketing services</strong> include market research, localization strategies, multilingual content creation, and region-specific campaign development that drives success in global markets.</p>
                  <p className="text-lg leading-relaxed mb-6">We manage <strong>multi-country advertising campaigns, international SEO, and cross-cultural social media strategies</strong> that respect local customs while maintaining brand consistency. Our global approach includes currency optimization, local partnership development, and regulatory compliance.</p>
                  <p className="text-lg leading-relaxed mb-6">Our international expertise also includes <strong>export marketing, cultural adaptation, and global brand management</strong> that helps businesses successfully enter and thrive in new markets while avoiding costly cultural missteps and compliance issues.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 px-4" aria-labelledby="startup-marketing-heading">
          <div className="container mx-auto max-w-6xl">
            <div className=" gap-12 items-start">
              <div>
                <h2 id="startup-marketing-heading" className="superfont text-3xl md:text-4xl font-bold mb-6">
                  Startup Marketing & Growth Hacking
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="text-lg leading-relaxed mb-6">Startups need marketing strategies that maximize results with limited resources. Our <strong>startup marketing expertise</strong> includes growth hacking techniques, lean marketing methodologies, bootstrapped campaign strategies, and rapid testing approaches that help new businesses achieve explosive growth on tight budgets.</p>
                  <p className="text-lg leading-relaxed mb-6">We specialize in <strong>product-market fit validation, viral marketing campaigns, and community building strategies</strong> that generate buzz and user adoption without massive advertising spend. Our approaches include referral programs, content marketing, and strategic partnerships that amplify reach organically.</p>
                  <p className="text-lg leading-relaxed mb-6">Our startup services also include <strong>investor pitch support, demo day preparation, and PR campaign management</strong> that helps startups gain visibility, attract investment, and build credibility in competitive markets. We understand the unique challenges and opportunities facing emerging businesses.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 px-4" aria-labelledby="enterprise-marketing-heading">
          <div className="container mx-auto max-w-6xl">
            <div className=" gap-12 items-start">
              <div>
                <h2 id="enterprise-marketing-heading" className="superfont text-3xl md:text-4xl font-bold mb-6">
                  Enterprise Marketing & Scaled Operations
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="text-lg leading-relaxed mb-6">Large organizations require sophisticated marketing operations that coordinate across multiple brands, regions, and business units. Our <strong>enterprise marketing services</strong> include marketing technology implementation, process optimization, team training, and campaign standardization that delivers consistent results at scale.</p>
                  <p className="text-lg leading-relaxed mb-6">We provide <strong>marketing operations consulting, technology integration, and performance standardization</strong> that helps enterprise teams work more efficiently while maintaining high-quality output. Our expertise includes multi-brand campaign coordination and global campaign management.</p>
                  <p className="text-lg leading-relaxed mb-6">Our enterprise approach also includes <strong>compliance management, risk assessment, and stakeholder reporting</strong> that meets the complex requirements of large organizations while delivering the agility and innovation needed to compete effectively in digital markets.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 px-4" aria-labelledby="why-choose-heading">
          <div className="container mx-auto max-w-6xl">
            <div className=" gap-12 items-start">
              <div>
                <h2 id="why-choose-heading" className="superfont text-3xl md:text-4xl font-bold mb-6">
                  Why Choose CodeCraft Studios for Digital Marketing?
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="text-lg leading-relaxed mb-6">We're not just another digital marketing agency — we're <strong>technology-driven growth partners</strong> with deep expertise in web development, data analytics, and business strategy. Our unique combination of technical skills and marketing expertise enables us to create integrated solutions that other agencies simply can't match.</p>
                  <p className="text-lg leading-relaxed mb-6">Our team brings <strong>proven experience across diverse industries</strong> and business models, from bootstrapped startups to Fortune 500 enterprises. We understand that every business faces unique challenges and opportunities, and we craft customized strategies that align with your specific goals and market conditions.</p>
                  <p className="text-lg leading-relaxed mb-6">We believe in <strong>transparent communication, data-driven decision making, and continuous optimization</strong>. Our clients receive detailed reporting, regular strategy reviews, and proactive recommendations that keep their campaigns ahead of the competition. When you work with CodeCraft Studios, you get results you can measure and growth you can sustain.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 px-4" aria-labelledby="lets-grow-heading">
          <div className="container mx-auto max-w-6xl">
            <div className=" gap-12 items-start">
              <div>
                <h2 id="lets-grow-heading" className="superfont text-3xl md:text-4xl font-bold mb-6">
                  Ready to Transform Your Digital Presence?
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="text-lg leading-relaxed mb-6">Digital marketing success requires the perfect blend of <strong>strategic thinking, creative execution, and technical expertise</strong>. At CodeCraft Studios, we deliver all three with a proven track record of driving growth for businesses of all sizes across diverse industries and markets.</p>
                  <p className="text-lg leading-relaxed mb-6">Whether you're looking to increase brand awareness, generate more qualified leads, drive online sales, or build customer loyalty, our comprehensive digital marketing solutions deliver measurable results that contribute directly to your bottom line and long-term business success.</p>
                  <p className="text-lg leading-relaxed mb-6">Don't let your competitors dominate the digital landscape while you struggle with ineffective campaigns and wasted budgets. Partner with CodeCraft Studios and experience the difference that <strong>strategic digital marketing expertise makes</strong>. Contact us today to discuss your goals and discover how we can help you achieve extraordinary growth.</p>
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
                  Featured Marketing Success Stories
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Explore our portfolio of successful digital marketing campaigns and growth strategies. Each case study demonstrates our ability to drive measurable results across different industries and business models.
                </p>
              </div>

              <ProjectSwiper items={projectItems} className="max-w-6xl mx-auto" />

              <div className="text-center mt-12">
                <Button asChild size="lg" className="group">
                  <Link href="/contact">
                    Launch Your Marketing Campaign
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
    console.error('Error in DigitalMarketingPage:', error);
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