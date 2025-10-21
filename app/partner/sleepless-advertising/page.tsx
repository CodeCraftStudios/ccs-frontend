import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ExternalLink, Gamepad2, Smartphone, Eye, Users, Zap, Trophy, Target, Rocket, ChartColumnBigIcon, Facebook, Chrome, Mail } from "lucide-react"
import Link from "next/link"
import { BreadcrumbWithSchema } from "@/components/breadcrumb-with-schema"
import { getData } from '@/lib/axios'
import { NAME, FRONTEND, SERVER_ENDPOINT, EMAIL, PHONE } from "@/lib/consts"
import { HeroCTAButtons, CTAButtons } from "./components/interactive-elements"


const SLEEPLESS_CALENDLY = "/contact"

export async function generateMetadata(): Promise<Metadata> {
  try {
    const data: any = await getData("/api/partner/sleepless-advertising")
    const partner: any = data.data

    const title = partner?.seo_title || `${partner?.name || "Sleepless Advertising"} Partnership `
    const description = partner?.seo_description || `Strategic partnership with ${partner?.name || "Sleepless Advertising"}, Unity game development specialists. Mobile games, VR/AR experiences, and multiplayer gaming solutions.`
    const keywords = partner?.seo_keywords || "Sleepless Advertising, Meta ads, Marketing, Social Media Marketing, Social Growth"

    return {
      title,
      description,
      keywords: typeof keywords === 'string' ? keywords.split(',').map(k => k.trim()) : keywords,
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
        url: `${FRONTEND}/partner/sleepless-advertising`,
        siteName: NAME,
        images: [
          {
            url: partner?.logo ? `${SERVER_ENDPOINT}${partner.logo}` : `${FRONTEND}/banner.webp`,
            width: 1920,
            height: 1080,
            alt: `${partner?.name || "Sleepless Advertising"} partnership with ${NAME}`,
          },
        ],
        locale: "en_US",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [partner?.logo ? `${SERVER_ENDPOINT}${partner.logo}` : `${FRONTEND}/banner.webp`],
        creator: "@codecraft_studios",
      },
      alternates: {
        canonical: `${FRONTEND}/partner/rsquare-games`,
      },
      category: "Technology",
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: `Sleepless Advertising Partnership - Unity Game Development | ${NAME}`,
      description: `Strategic partnership with Sleepless Advertising, Unity game development specialists. Mobile games, VR/AR experiences, and multiplayer gaming solutions.`,
      keywords: "Sleepless Advertising, Unity game development, mobile games, VR games, AR games, multiplayer games, game development partnership, CodeCraft Studios",
    }
  }
}

export default async function RSquareGamesPage() {
  try {
    const data: any = await getData("/api/partner/sleepless-advertising")
    const partner: any = data.data

    const breadcrumbItems = [
      { label: "Home", href: "/" },
      { label: "Partners", href: "/partners" },
      { label: partner?.name || "Sleepless Advertising", current: true },
    ]

    // Static data for services (can be moved to API later)
    const services = [
      {
        icon: <Smartphone className="w-8 h-8" />,
        title: "Mobile Game Development",
        description: "Native iOS and Android games with Unity's cross-platform capabilities",
        features: [
          "Cross-platform deployment",
          "Touch-optimized controls",
          "Performance optimization",
          "App store compliance",
        ],
      },
      {
        icon: <Eye className="w-8 h-8" />,
        title: "VR/AR Experiences",
        description: "Immersive virtual and augmented reality gaming experiences",
        features: ["VR headset support", "AR mobile integration", "Spatial tracking", "Hand gesture controls"],
      },
      {
        icon: <Users className="w-8 h-8" />,
        title: "Multiplayer Games",
        description: "Real-time multiplayer gaming with robust networking solutions",
        features: ["Real-time synchronization", "Matchmaking systems", "Anti-cheat protection", "Server optimization"],
      },
      {
        icon: <Gamepad2 className="w-8 h-8" />,
        title: "Game Design & Prototyping",
        description: "Complete game design from concept to playable prototype",
        features: ["Concept development", "Rapid prototyping", "Gameplay mechanics", "User testing"],
      },
    ]

    const technologies = [
     "Google Ads",
     "Meta Ads",
     "Marketing",
     "AI"
    ]

    const achievements = [
      
      { number: "5+", label: "Years Of Experience" },
      { number: "15+", label: "Clients" },
      { number: "98%", label: "Client Satisfaction" },
    ]

    // Generate structured data schemas
    const partnerSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": partner?.name || "Sleepless Advertising",
      "description": "Unity game development specialists offering mobile games, VR/AR experiences, and multiplayer gaming solutions",
      "url": `${FRONTEND}/partner/rsquare-games`,
      "logo": partner?.logo ? `${SERVER_ENDPOINT}${partner.logo}` : undefined,
      "foundingDate": "2018",
      "industry": "Game Development",
      "areaServed": "Worldwide",
      "serviceType": [
        "Mobile Game Development",
        "VR/AR Game Development",
        "Multiplayer Game Development",
        "Game Design and Prototyping"
      ],
      "knowsAbout": technologies,
      "partner": {
        "@type": "Organization",
        "name": NAME,
        "url": FRONTEND
      }
    }

    const partnershipSchema = {
      "@context": "https://schema.org",
      "@type": "Partnership",
      "name": `${partner?.name || "Sleepless Advertising"} × ${NAME} Strategic Partnership`,
      "description": "Strategic partnership combining Unity game development expertise with cutting-edge web technologies",
      "partner": [
        {
          "@type": "Organization",
          "name": partner?.name || "Sleepless Advertising",
          "specialty": "Unity Game Development"
        },
        {
          "@type": "Organization",
          "name": NAME,
          "specialty": "Web Development and Digital Solutions"
        }
      ],
      "startDate": "2023",
      "url": `${FRONTEND}/partner/rsquare-games`
    }

    return (
      <>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([partnerSchema, partnershipSchema])
          }}
        />

        <div className="min-h-screen bg-background">
          {/* Breadcrumbs */}
          <div className="container mx-auto max-w-7xl px-4 pt-22 pb-4">
            <BreadcrumbWithSchema items={breadcrumbItems} />
          </div>

          {/* Hero Section */}
          <section className="relative py-20 px-4 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 hero-grid opacity-20"></div>
            <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl hero-float-purple"></div>
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent-blue/20 rounded-full blur-3xl hero-float-blue"></div>
            <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-accent-green/20 rounded-full blur-2xl hero-float-green"></div>

            <div className="container mx-auto max-w-6xl relative z-10">
              <div className="text-center mb-12">
                {/* Partnership Badge */}
                <Badge className="mb-6 px-6 py-2 text-sm bg-primary/20 rounded-full border-2 border-violet-500 text-primary-foreground">Partnership</Badge>

                {/* Partner Logos */}
                <div className="flex items-center justify-center gap-8 mb-8">
                  <Avatar className="w-20 h-20 border-2 border-violet-500">
                    <AvatarImage
                      src={partner?.logo ? `${SERVER_ENDPOINT}${partner.logo}` : "/rsquare-games-logo.jpg"}
                      alt={partner?.name || "Sleepless Advertising"}
                    />
                    <AvatarFallback className="bg-primary text-primary-foreground text-xl font-bold">SA</AvatarFallback>
                  </Avatar>
                  <div className="text-4xl text-primary font-bold">×</div>
                  <Avatar className="w-20 h-20 border-2 border-violet-500">
                    <AvatarImage src="/media/logo.svg" alt="CodeCraft Studios" />
                    <AvatarFallback className="bg-primary text-primary-foreground text-xl font-bold">CC</AvatarFallback>
                  </Avatar>
                </div>

                {/* Main Heading */}
                <h1 className="superfont text-5xl md:text-7xl font-bold mb-6 text-glow-primary">
                  {partner?.name || "Sleepless Advertising"} × CodeCraft Studios
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto text-balance">
                  We help businesses of all sizes scale their company through Meta Ads, Google Ads, and Email/SMS campaigns - proven strategies designed to bring in more customers and drive more revenue.
                </p>

                {/* CTA Buttons - Client Component */}
                <HeroCTAButtons />
              </div>
            </div>
          </section>

          {/* About Sleepless Advertising */}
          <section className="py-20 px-4" aria-labelledby="about-partner">
            <div className="container mx-auto max-w-6xl">
              <div className="grid lg:grid-cols-12 gap-12 items-center">
                <div className="col-span-9">
                  <Badge className="mb-4 bg-primary text-primary-foreground">Service</Badge>
                  <h2 id="about-partner" className="superfont text-4xl font-bold mb-6 text-glow-primary">
                    Meta Ads (Facebook & Instagram Ads)
                  </h2>
                  <ul className="mb-12">
                    <li className="mt-3">Proven targeted ads to reach your ideal customers through social media to get more sales.</li>
                    <li className="mt-3">Building audiences based off interest, people who have visited your website, social media, converted sales and retargeting them on instagram and facebook and making look alike audiences based off data(Creating precision in our targeting strategy).</li>
                    <li className="mt-3">Campaigns optimized for sales, leads, traffic, awareness, and engagement.</li>
                    <li className="mt-3">Retargeting strategies to bring people back.</li>
                    <li className="mt-3">Fully optimized each ad and scaling good performing ads and removing non profitable ads, while creating new variations of the working creatives to not have ad fatigue.</li>
                  </ul>
                  <Link target="_blank"  href={SLEEPLESS_CALENDLY}>
                    <Button>Request A Quote</Button>
                  </Link>
                </div>
                <div className="relative col-span-3">
                  <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-accent-blue/20 flex items-center justify-center">
                    <Facebook className="w-32 h-32 text-primary" />
                  </div>
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent-green/20 rounded-full blur-2xl"></div>
                  <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent-orange/20 rounded-full blur-3xl"></div>
                </div>
              </div>
            </div>
          </section>
          {/* About Sleepless Advertising */}
          <section className="py-20 px-4" aria-labelledby="about-partner">
            <div className="container mx-auto max-w-6xl">
              <div className="grid lg:grid-cols-12 gap-12 items-center">
                <div className="col-span-9">
                  <Badge className="mb-4 bg-primary text-primary-foreground ">Service</Badge>
                  <h2 id="about-partner" className="superfont text-4xl font-bold mb-6 text-glow-primary">
                    Google Ads
                  </h2>
                  <ul className="mb-12">
                    <li className="mt-3">Appear at the top when customers search for your services on google and google maps.</li>
                    <li className="mt-3">Smart keyword targeting to bring in high-intent traffic.</li>
                    <li className="mt-3">Removing negative keywords and optimizing your budget within ad campaigns to get the most profit.</li>
                    <li className="mt-3">Conversion tracking to measure results.</li>
                    <li className="mt-3">Local or nationwide campaigns to dominate your area.</li>
                  </ul>
                  <Link target="_blank" href={SLEEPLESS_CALENDLY}>
                    <Button>Request A Quote</Button>
                  </Link>
                </div>
                <div className="relative col-span-3" >
                  <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-accent-blue/20 flex items-center justify-center">
                    <Chrome className="w-32 h-32 text-primary" />
                  </div>
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent-green/20 rounded-full blur-2xl"></div>
                  <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent-orange/20 rounded-full blur-3xl"></div>
                </div>
              </div>
            </div>
          </section>
          {/* About Sleepless Advertising */}
          <section className="py-20 px-4" aria-labelledby="about-partner">
            <div className="container mx-auto max-w-6xl">
              <div className="grid lg:grid-cols-12 gap-12 items-center">
                <div className="col-span-9">
                  <Badge className="mb-4 bg-primary text-primary-foreground ">Service</Badge>
                  <h2 id="about-partner" className="superfont text-4xl font-bold mb-6 text-glow-primary">
                    Email & SMS Marketing
                  </h2>
                  <ul className="mb-12">
                    <li className="mt-3">Custom graphics by a graphic designer for your emails to drive sales.</li>
                    <li className="mt-3">Best way to give Promotions & offers sent directly to inbox & phone.</li>
                    <li className="mt-3">Proven deliverability to make sure your emails don't get sent to the spam inbox.</li>
                    <li className="mt-3">Automated follow-ups to bring back past customers, and potential customers.</li>
                    <li className="mt-3">Segmented lists for maximum engagement, with targeted emails/sms messages.</li>
                  </ul>
                  <Link  target="_blank"  href={SLEEPLESS_CALENDLY}>
                    <Button>Request A Quote</Button>
                  </Link>
                </div>
                <div className="relative col-span-3" >
                  <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-accent-blue/20 flex items-center justify-center">
                    <Mail className="w-32 h-32 text-primary" />
                  </div>
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent-green/20 rounded-full blur-2xl"></div>
                  <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent-orange/20 rounded-full blur-3xl"></div>
                </div>
              </div>
            </div>
          </section>

          

          {/* CTA Section */}
          <section className="py-20 px-4 relative overflow-hidden" aria-labelledby="cta-section">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent-blue/10"></div>
            <div className="absolute top-10 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent-green/20 rounded-full blur-3xl"></div>

            <div className="container mx-auto max-w-4xl text-center relative z-10">
              <Rocket className="w-16 h-16 mx-auto mb-6 text-primary" />
              <h2 id="cta-section" className="superfont text-4xl md:text-5xl font-bold mb-6 text-glow-primary">Ready to Reach Your Audience?</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Partner with {partner?.name || "Sleepless Advertising"} and CodeCraft Studios to bring your website visits, more deals closed technology and local niche domination.
              </p>

              <p className="mb-12">
                <Link href="tel:+15162425020" className="text-amber-500 font-bold" target="_blank">
                  Call +1 (516) 242-5020
                </Link>
              </p>

              <CTAButtons link={SLEEPLESS_CALENDLY} />
            </div>
          </section>
        </div>
      </>
    )
  } catch (error) {
    console.error('Error in Sleepless Advertising page:', error)
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Partner Information Temporarily Unavailable</h1>
          <p className="text-muted-foreground">Please try again later.</p>
        </div>
      </div>
    )
  }
}