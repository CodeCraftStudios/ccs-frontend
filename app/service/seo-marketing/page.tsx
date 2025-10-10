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
  
    const data:any = await getData("/api/service/seo-marketing")
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

    console.log('Found SEO marketing service:', service.name);

   

 
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
      url: `${FRONTEND}/service/seo-marketing`,
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
      canonical: `${FRONTEND}/service/seo-marketing`,
    },
    category: "Technology",
  };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: `SEO & Digital Marketing Services - Boost Organic Traffic | ${NAME}`,
      description: `Data-driven SEO and digital marketing strategies that increase organic traffic, improve rankings, and drive real business results.`,
      keywords: [
        ...KEYWORDS,
        "seo marketing",
        "seo services miami",
        "digital marketing florida",
        "seo optimization",
        "google ads",
        "ppc management",
      ],
    };
  }
}

export default async function SeoMarketingPage() {
  try {
    const data:any = await getData("/api/service/seo-marketing")
    const service = data.data
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "SEO Marketing", current: true },
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
    "url": `${FRONTEND}/service/seo-marketing`,
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
    "url": `${FRONTEND}/service/seo-marketing`,
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
              SEO & Digital Marketing That Drives Results
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
            <p className="text-xl leading-relaxed">At CodeCraft Studios, we don't just build beautiful websites — we make sure the right people find them. Our SEO and digital marketing services are crafted to increase your visibility, grow your audience, and turn organic traffic into real business results.</p>
          </div>
        </section>
        <ClientsMarquee/>
        <Portfolio/>

        <section className="py-20 px-4" aria-labelledby="what-we-offer-heading">
          <div className="container mx-auto max-w-6xl">
            <div className=" gap-12 items-start">
              <div>
                <h2 id="what-we-offer-heading" className="superfont text-3xl md:text-4xl font-bold mb-6">
                  What We Offer
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="text-lg leading-relaxed mb-6">Our digital marketing suite covers everything from technical SEO to paid ads. We optimize your website for <strong>on-page SEO</strong>, boost authority with <strong>backlinks</strong>, and set up scalable <strong>PPC campaigns using Google Ads</strong>. Whether you need long-term traffic growth or instant visibility, our hybrid strategies cover all bases.</p>
                  <p className="text-lg leading-relaxed mb-6">We also specialize in <strong>local SEO</strong> — helping businesses dominate local search results with <strong>Google Business Profiles, map listings, and citation building</strong>. Combined with personalized content and outreach, this helps you rank in the top spots when it matters most.</p>
                  <p className="text-lg leading-relaxed mb-6">From <strong>high-converting landing pages to targeted email drip campaigns</strong>, every service we offer is backed by <strong>analytics, heatmaps, and A/B testing</strong> to make sure your budget works harder for your business.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4" aria-labelledby="seo-that-works-heading">
          <div className="container mx-auto max-w-6xl">
            <div className=" gap-12 items-start">
              <div>
                <h2 id="seo-that-works-heading" className="superfont text-3xl md:text-4xl font-bold mb-6">
                  SEO That Actually Works
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="text-lg leading-relaxed mb-6">Search engine optimization isn't a guessing game. We perform <strong>full audits, fix technical issues, optimize page speed, structure your content, and build internal link architecture</strong> that Google loves. This improves both user experience and search visibility.</p>
                  <p className="text-lg leading-relaxed mb-6">Our <strong>keyword research is deep and intentional</strong>. We find search phrases your ideal customers are actually using — not just generic traffic terms — and optimize your content around them. This brings in leads that convert, not just clicks that bounce.</p>
                  <p className="text-lg leading-relaxed mb-6">We also track and report everything: <strong>keyword positions, traffic sources, bounce rate, crawl errors, and indexation</strong>. You'll always know how your site is performing and where we're focusing next to increase your rankings.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4" aria-labelledby="google-ads-heading">
          <div className="container mx-auto max-w-6xl">
            <div className=" gap-12 items-start">
              <div>
                <h2 id="google-ads-heading" className="superfont text-3xl md:text-4xl font-bold mb-6">
                  Google Ads & Paid Marketing
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="text-lg leading-relaxed mb-6">Need immediate results? We create and manage <strong>high-performance ad campaigns on Google, Bing, YouTube, and Facebook</strong>. From search ads to display remarketing, our campaigns are crafted to attract quality clicks and drive revenue fast.</p>
                  <p className="text-lg leading-relaxed mb-6">We handle everything: <strong>ad creation, keyword bidding, A/B testing, budget management, and conversion tracking</strong>. Every dollar is accounted for and optimized to deliver maximum ROI. No wasted spend. No generic templates.</p>
                  <p className="text-lg leading-relaxed mb-6">Our paid ad strategy also includes <strong>landing page optimization</strong>, which improves your Quality Score and lowers cost-per-click. This gives your ads higher placement and better results with less budget waste.</p>
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
                  Marketing Technology Stack
                </h2>
                <p className="text-lg leading-relaxed mb-6">We use industry-leading tools and platforms to deliver measurable results. Our SEO toolkit includes <strong>SEMrush, Ahrefs, and Google Search Console</strong> for keyword research and ranking tracking. For analytics, we rely on <strong>Google Analytics 4, Google Tag Manager, and Hotjar</strong> for comprehensive data insights.</p>
                <p className="text-lg leading-relaxed mb-6">Our advertising campaigns are managed through <strong>Google Ads, Facebook Ads Manager, and Microsoft Advertising</strong>. Email marketing automation is powered by <strong>Mailchimp, Klaviyo, and HubSpot</strong>, while social media management utilizes <strong>Hootsuite and Buffer</strong> for consistent content delivery.</p>
                <p className="text-lg leading-relaxed mb-6">For conversion optimization, we use <strong>Unbounce for landing pages, Optimizely for A/B testing, and Zapier for workflow automation</strong>. This comprehensive tech stack ensures every aspect of your digital marketing is optimized for performance and scalability.</p>
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

        <section className="py-20 px-4" aria-labelledby="content-marketing-heading">
          <div className="container mx-auto max-w-6xl">
            <div className=" gap-12 items-start">
              <div>
                <h2 id="content-marketing-heading" className="superfont text-3xl md:text-4xl font-bold mb-6">
                  Content Marketing & Blogging
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="text-lg leading-relaxed mb-6">Content is still king — but only if it's built for both readers and search engines. Our team creates <strong>keyword-rich blog posts, SEO-optimized service pages, and sales-driven copy</strong> that establishes authority and attracts organic leads.</p>
                  <p className="text-lg leading-relaxed mb-6">We focus on content that educates, informs, and sells. From <strong>long-form guides to FAQ sections and landing pages</strong>, we make your website a content hub that ranks and converts. Everything is tailored to your brand voice and industry.</p>
                  <p className="text-lg leading-relaxed mb-6">We also structure content for <strong>featured snippets, people-also-ask queries, and zero-click searches</strong>. This puts your business at the top of the search engine results page — not just in the rankings, but as the definitive answer.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4" aria-labelledby="local-seo-heading">
          <div className="container mx-auto max-w-6xl">
            <div className=" gap-12 items-start">
              <div>
                <h2 id="local-seo-heading" className="superfont text-3xl md:text-4xl font-bold mb-6">
                  Local SEO & Reputation Management
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="text-lg leading-relaxed mb-6">If you're a local business, your online presence needs to dominate the neighborhood. We optimize your <strong>Google Business Profile, generate consistent citations across local directories, and build localized landing pages</strong> for every service area you serve.</p>
                  <p className="text-lg leading-relaxed mb-6">Local SEO isn't just about map rankings — it's about building trust. We help you <strong>collect and showcase reviews, respond to customer feedback, and highlight social proof</strong> across the web. This increases your visibility and credibility where it matters most.</p>
                  <p className="text-lg leading-relaxed mb-6">We also set up <strong>geo-targeted ad campaigns, localized schema markup, and service-area targeting</strong> to ensure that people near you find you first. More calls, more foot traffic, more leads — all within your zip code.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4" aria-labelledby="email-sms-heading">
          <div className="container mx-auto max-w-6xl">
            <div className=" gap-12 items-start">
              <div>
                <h2 id="email-sms-heading" className="superfont text-3xl md:text-4xl font-bold mb-6">
                  Email & SMS Marketing
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="text-lg leading-relaxed mb-6">Retention is just as important as acquisition. Our <strong>automated email and SMS marketing campaigns</strong> help you turn one-time buyers into long-term customers. We build flows for <strong>abandoned carts, welcome sequences, loyalty rewards, and re-engagement</strong>.</p>
                  <p className="text-lg leading-relaxed mb-6">Every message is <strong>personalized, timed, and tracked for performance</strong>. We use segmentation, A/B testing, and real-time analytics to optimize your campaigns for open rates, click-throughs, and sales.</p>
                  <p className="text-lg leading-relaxed mb-6">These campaigns keep your brand top-of-mind while creating consistent revenue from your existing customer base. It's one of the most cost-effective marketing strategies — and we help you do it right.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4" aria-labelledby="social-media-heading">
          <div className="container mx-auto max-w-6xl">
            <div className=" gap-12 items-start">
              <div>
                <h2 id="social-media-heading" className="superfont text-3xl md:text-4xl font-bold mb-6">
                  Social Media Strategy & Growth
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="text-lg leading-relaxed mb-6">We turn your social media presence into a growth engine. Our team creates <strong>platform-specific content for Instagram, Facebook, LinkedIn, and TikTok</strong> — designed to grow your audience and keep your community engaged.</p>
                  <p className="text-lg leading-relaxed mb-6">We offer <strong>organic content calendars, ad campaign management, influencer outreach, and visual branding</strong> to make your brand stand out. Every post is part of a broader strategy that aligns with your marketing goals and drives results.</p>
                  <p className="text-lg leading-relaxed mb-6">We also help you run <strong>retargeting ads, track conversions, and monitor engagement</strong>. Social isn't just about likes — it's about getting people to take action. We turn scrolls into clicks and followers into customers.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4" aria-labelledby="analytics-heading">
          <div className="container mx-auto max-w-6xl">
            <div className=" gap-12 items-start">
              <div>
                <h2 id="analytics-heading" className="superfont text-3xl md:text-4xl font-bold mb-6">
                  Analytics, Tracking & Optimization
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="text-lg leading-relaxed mb-6">Everything we do is measurable. We integrate platforms like <strong>Google Analytics 4, Meta Pixel, Hotjar, and Search Console</strong> to gather the data that matters most. This gives us (and you) the power to make smarter, faster decisions.</p>
                  <p className="text-lg leading-relaxed mb-6">We create <strong>custom dashboards</strong> so you can monitor traffic, conversions, ROI, and KPIs in real time. Whether you're tracking lead generation or product sales, we give you clear visibility into what's working and what needs tweaking.</p>
                  <p className="text-lg leading-relaxed mb-6">And we don't stop at reporting. We use data to run <strong>continuous A/B tests, optimize funnels, refine targeting, and improve messaging</strong>. That's how we turn good campaigns into great ones — and great ones into scalable machines.</p>
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
                  <p className="text-lg leading-relaxed mb-6">We're not just marketers — we're <strong>full-stack growth partners</strong>. With deep experience in web development, ecommerce, and analytics, we understand how all parts of your digital ecosystem connect. That means better strategy, better results, and zero finger-pointing between platforms.</p>
                  <p className="text-lg leading-relaxed mb-6">Our team is <strong>agile, transparent, and committed to ROI</strong>. We don't do fluff, we don't hide behind jargon, and we don't pitch cookie-cutter solutions. Every campaign is built from scratch to solve your business's specific challenges.</p>
                  <p className="text-lg leading-relaxed mb-6">If you're looking for a digital partner who understands <strong>SEO, design, ads, automation, and how they all work together</strong> — we're the agency for you. We bring big-agency firepower with small-team flexibility.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4" aria-labelledby="lets-grow-heading">
          <div className="container mx-auto max-w-6xl">
            <div className=" gap-12 items-start">
              <div>
                <h2 id="lets-grow-heading" className="superfont text-3xl md:text-4xl font-bold mb-6">
                  Let's Grow Your Business — Together
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="text-lg leading-relaxed mb-6">Digital marketing moves fast. With CodeCraft Studios, you'll stay ahead. Whether you're starting from scratch or scaling your success, our team is ready to help you grow with <strong>smart strategy, clear execution, and measurable impact</strong>.</p>
                  <p className="text-lg leading-relaxed mb-6">Don't settle for passive websites and flatlined traffic. Let's build a digital engine that brings <strong>consistent leads, loyal customers, and real revenue</strong>. SEO, ads, content, automation — we do it all, and we do it well.</p>
                  <p className="text-lg leading-relaxed mb-6">Ready to dominate your niche? Let's talk. <strong>CodeCraft Studios is your partner for digital marketing that actually moves the needle.</strong></p>
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
                  Explore our portfolio of successful SEO and digital marketing campaigns. Each project showcases our commitment to data-driven strategies and measurable results.
                </p>
              </div>

              <ProjectSwiper items={projectItems} className="max-w-6xl mx-auto" />

              <div className="text-center mt-12">
                <Button asChild size="lg" className="group">
                  <Link href="/contact">
                    Start Your Marketing Campaign
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
    console.error('Error in SeoMarketingPage:', error);
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