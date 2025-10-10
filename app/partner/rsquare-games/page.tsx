import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ExternalLink, Gamepad2, Smartphone, Eye, Users, Zap, Trophy, Target, Rocket } from "lucide-react"
import Link from "next/link"
import { BreadcrumbWithSchema } from "@/components/breadcrumb-with-schema"
import { getData } from '@/lib/axios'
import { NAME, FRONTEND, SERVER_ENDPOINT, EMAIL, PHONE } from "@/lib/consts"
import { HeroCTAButtons, CTAButtons } from "./components/interactive-elements"

export async function generateMetadata(): Promise<Metadata> {
  try {
    const data: any = await getData("/api/partner/rsquare-games")
    const partner: any = data.data

    const title = partner?.seo_title || `${partner?.name || "RSquare Games"} Partnership - Unity Game Development | ${NAME}`
    const description = partner?.seo_description || `Strategic partnership with ${partner?.name || "RSquare Games"}, Unity game development specialists. Mobile games, VR/AR experiences, and multiplayer gaming solutions.`
    const keywords = partner?.seo_keywords || "RSquare Games, Unity game development, mobile games, VR games, AR games, multiplayer games, game development partnership, CodeCraft Studios"

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
        url: `${FRONTEND}/partner/rsquare-games`,
        siteName: NAME,
        images: [
          {
            url: partner?.logo ? `${SERVER_ENDPOINT}${partner.logo}` : `${FRONTEND}/banner.webp`,
            width: 1920,
            height: 1080,
            alt: `${partner?.name || "RSquare Games"} partnership with ${NAME}`,
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
      title: `RSquare Games Partnership - Unity Game Development | ${NAME}`,
      description: `Strategic partnership with RSquare Games, Unity game development specialists. Mobile games, VR/AR experiences, and multiplayer gaming solutions.`,
      keywords: "RSquare Games, Unity game development, mobile games, VR games, AR games, multiplayer games, game development partnership, CodeCraft Studios",
    }
  }
}

export default async function RSquareGamesPage() {
  try {
    const data: any = await getData("/api/partner/rsquare-games")
    const partner: any = data.data

    const breadcrumbItems = [
      { label: "Home", href: "/" },
      { label: "Partners", href: "/partners" },
      { label: partner?.name || "RSquare Games", current: true },
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
      "Unity 3D",
      "C#",
      "Unity Netcode",
      "AR Foundation",
      "XR Toolkit",
      "Photon Network",
      "Mirror Networking",
      "Firebase",
      "PlayFab",
      "Steam SDK",
    ]

    const achievements = [
      { number: "3", label: "Hours Per User Daily" },
      { number: "5+", label: "Years Of Experience" },
      { number: "15+", label: "VR/AR Projects" },
      { number: "98%", label: "Client Satisfaction" },
    ]

    // Generate structured data schemas
    const partnerSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": partner?.name || "RSquare Games",
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
      "name": `${partner?.name || "RSquare Games"} × ${NAME} Strategic Partnership`,
      "description": "Strategic partnership combining Unity game development expertise with cutting-edge web technologies",
      "partner": [
        {
          "@type": "Organization",
          "name": partner?.name || "RSquare Games",
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
                      alt={partner?.name || "RSquare Games"}
                    />
                    <AvatarFallback className="bg-primary text-primary-foreground text-xl font-bold">RG</AvatarFallback>
                  </Avatar>
                  <div className="text-4xl text-primary font-bold">×</div>
                  <Avatar className="w-20 h-20 border-2 border-violet-500">
                    <AvatarImage src="/media/logo.svg" alt="CodeCraft Studios" />
                    <AvatarFallback className="bg-primary text-primary-foreground text-xl font-bold">CC</AvatarFallback>
                  </Avatar>
                </div>

                {/* Main Heading */}
                <h1 className="superfont text-5xl md:text-7xl font-bold mb-6 text-glow-primary">
                  {partner?.name || "RSquare Games"} × CodeCraft Studios
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto text-balance">
                  Combining Unity game development expertise with cutting-edge web technologies to create immersive gaming experiences
                </p>

                {/* CTA Buttons - Client Component */}
                <HeroCTAButtons />
              </div>
            </div>
          </section>

          {/* About RSquare Games */}
          <section className="py-20 px-4" aria-labelledby="about-partner">
            <div className="container mx-auto max-w-6xl">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-primary text-primary-foreground">About Our Partner</Badge>
                  <h2 id="about-partner" className="superfont text-4xl font-bold mb-6 text-glow-primary">
                    Unity Game Development Specialists
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    We are a dedicated team of passionate game developers specializing in creating immersive, high-quality gaming experiences and software game development services using the Unity game engine. Our mission is to bring innovative, engaging games to life, whether it’s in 2D, 3D, Augmented Reality (AR), Virtual Reality (VR), or Mixed Reality (MR).
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {achievements.map((achievement, index) => (
                      <div key={index} className="text-center p-4 rounded-lg bg-card border border-border">
                        <div className="text-2xl font-bold text-primary mb-1">{achievement.number}</div>
                        <div className="text-sm text-muted-foreground">{achievement.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-accent-blue/20 p-8 flex items-center justify-center">
                    <Gamepad2 className="w-32 h-32 text-primary" />
                  </div>
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent-green/20 rounded-full blur-2xl"></div>
                  <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent-orange/20 rounded-full blur-3xl"></div>
                </div>
              </div>
            </div>
          </section>

          {/* Services */}
          <section className="py-20 px-4 bg-card/50" aria-labelledby="services-offered">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-16">
                <Badge className="mb-4 bg-primary text-primary-foreground">Game Development Services</Badge>
                <h2 id="services-offered" className="superfont text-4xl font-bold mb-6 text-glow-primary">What {partner?.name || "RSquare Games"} Offers</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Comprehensive Unity game development services covering all platforms and gaming experiences
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {services.map((service, index) => (
                  <Card key={index} className="interactive-card border-border/50 bg-card/80 backdrop-blur-sm">
                    <CardContent className="p-8">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 rounded-lg bg-primary/10 text-primary">{service.icon}</div>
                        <h3 className="superfont text-xl font-bold">{service.title}</h3>
                      </div>
                      <p className="text-muted-foreground mb-6">{service.description}</p>
                      <div className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center gap-2 text-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Technologies */}
          <section className="py-20 px-4" aria-labelledby="technology-stack">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-16">
                <Badge className="mb-4 bg-primary text-primary-foreground">Technology Stack</Badge>
                <h2 id="technology-stack" className="superfont text-4xl font-bold mb-6 text-glow-primary">Cutting-Edge Game Development Tools</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Industry-leading technologies and frameworks for superior game development
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                {technologies.map((tech, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="px-4 py-2 text-sm bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </section>

          {/* Partnership Benefits */}
          <section className="py-20 px-4 bg-card/50" aria-labelledby="partnership-benefits">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-16">
                <Badge className="mb-4 bg-primary text-primary-foreground">Partnership Benefits</Badge>
                <h2 id="partnership-benefits" className="superfont text-4xl font-bold mb-6 text-glow-primary">Why Choose Our Partnership</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  The perfect combination of game development expertise and web technology innovation
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <Card className="interactive-card border-border/50 bg-card/80 backdrop-blur-sm text-center">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <Zap className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="superfont text-xl font-bold mb-4">Rapid Development</h3>
                    <p className="text-muted-foreground">
                      Fast-track your game development with our combined expertise and streamlined processes
                    </p>
                  </CardContent>
                </Card>

                <Card className="interactive-card border-border/50 bg-card/80 backdrop-blur-sm text-center">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <Trophy className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="superfont text-xl font-bold mb-4">Award-Winning Quality</h3>
                    <p className="text-muted-foreground">
                      Deliver exceptional gaming experiences with our proven track record of success
                    </p>
                  </CardContent>
                </Card>

                <Card className="interactive-card border-border/50 bg-card/80 backdrop-blur-sm text-center">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <Target className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="superfont text-xl font-bold mb-4">End-to-End Solutions</h3>
                    <p className="text-muted-foreground">
                      From game development to web presence, we handle every aspect of your project
                    </p>
                  </CardContent>
                </Card>
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
              <h2 id="cta-section" className="superfont text-4xl md:text-5xl font-bold mb-6 text-glow-primary">Ready to Build Your Game?</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Partner with {partner?.name || "RSquare Games"} and CodeCraft Studios to bring your gaming vision to life with cutting-edge technology and expert development.
              </p>

              {/* CTA Buttons - Client Component */}
              <CTAButtons />
            </div>
          </section>
        </div>
      </>
    )
  } catch (error) {
    console.error('Error in RSquare Games page:', error)
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