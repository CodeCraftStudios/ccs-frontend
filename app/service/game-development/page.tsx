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
    const data:any = await getData("/api/service/game-development")
    const service:any = data.data

    if (!service) {
      console.log('Game development service not found, using fallback metadata');
      return {
        title: `Game Development Services - Unity & Unreal Engine Games | ${NAME}`,
        description: `Professional game development for PC, mobile, VR, and consoles. Custom games with multiplayer, VR, and advanced features.`,
        keywords: [
          ...KEYWORDS,
          "game development",
          "game development miami",
          "game development florida",
          "unity game development",
          "unreal engine",
          "mobile games",
          "pc games",
          "vr games",
          "multiplayer games",
          "indie game development",
          "custom games",
        ],
      };
    }

    console.log('Found game development service:', service.name);

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
      url: `${FRONTEND}/service/game-development`,
      siteName: NAME,
      images: [
        {
          url: `${FRONTEND}/media/banner.jpg`,
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
      images: [`${FRONTEND}/media/banner.jpg`],
      creator: "@codecraft_studios",
    },
    alternates: {
      canonical: `${FRONTEND}/service/game-development`,
    },
    category: "Technology",
  };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: `Game Development Services - Unity & Unreal Engine Games | ${NAME}`,
      description: `Professional game development for PC, mobile, VR, and consoles. Custom games with multiplayer, VR, and advanced features.`,
      keywords: [
        ...KEYWORDS,
        "game development",
        "game development miami",
        "game development florida",
        "unity game development",
        "unreal engine",
        "mobile games",
      ],
    };
  }
}

export default async function GameDevelopmentPage() {
  try {
    const data:any = await getData("/api/service/game-development")
    const service = data.data

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Game Development", current: true },
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
    "url": `${FRONTEND}/service/game-development`,
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
    "url": `${FRONTEND}/service/game-development`,
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
              Professional Game Development Across All Platforms
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
            <p className="text-xl leading-relaxed">At CodeCraft Studios, we create engaging, immersive games that captivate players across PC, mobile, VR, and console platforms. From concept to launch, we bring your game vision to life with cutting-edge technology and creative excellence.</p>
          </div>
        </section>
        <ClientsMarquee/>
        <Portfolio/>

        <section className="py-20 px-4" aria-labelledby="game-expertise-heading">
          <div className="container mx-auto max-w-6xl">
            <div className=" gap-12 items-start">
              <div>
                <h2 id="game-expertise-heading" className="superfont text-3xl md:text-4xl font-bold mb-6">
                  Professional Game Development Expertise
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="text-lg leading-relaxed mb-6">Gaming is more than entertainment — it's an art form that combines storytelling, visual design, audio engineering, and advanced programming. At <strong>CodeCraft Studios</strong>, we specialize in creating games that not only entertain but engage, challenge, and inspire players across all platforms and genres.</p>
                  <p className="text-lg leading-relaxed mb-6">Our game development expertise spans <strong>Unity and Unreal Engine</strong>, the industry's most powerful and versatile game engines. Whether you need a <strong>2D mobile puzzle game, a 3D action-adventure for PC and consoles, or an immersive VR experience</strong>, our team has the technical skills and creative vision to deliver exceptional results.</p>
                  <p className="text-lg leading-relaxed mb-6">We don't just build games — we craft experiences. Every project begins with understanding your target audience, gameplay mechanics, and artistic vision. From there, we develop comprehensive game design documents, create prototypes, and iterate until every element feels perfect.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4" aria-labelledby="platforms-heading">
          <div className="container mx-auto max-w-6xl">
            <div className=" gap-12 items-start">
              <div>
                <h2 id="platforms-heading" className="superfont text-3xl md:text-4xl font-bold mb-6">
                  Multi-Platform Game Development
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="text-lg leading-relaxed mb-6">Today's players expect games to be available wherever they are. Our development approach focuses on <strong>cross-platform compatibility and optimization</strong>, ensuring your game performs beautifully on mobile devices, PCs, gaming consoles, and VR headsets.</p>
                  <p className="text-lg leading-relaxed mb-6">For <strong>mobile gaming</strong>, we create touch-optimized experiences that work seamlessly on iOS and Android devices. Our <strong>PC and console games</strong> take advantage of powerful hardware for stunning visuals, complex gameplay mechanics, and immersive audio. <strong>VR development</strong> leverages our expertise in spatial design and motion controls for truly transformative experiences.</p>
                  <p className="text-lg leading-relaxed mb-6">We also specialize in <strong>multiplayer and online gaming features</strong>, including real-time networking, matchmaking systems, leaderboards, and social integrations. Whether you need local co-op, competitive online multiplayer, or MMO-scale architecture, we build the infrastructure to support your community.</p>
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
                  Game Development Technology Stack
                </h2>
                <p className="text-lg leading-relaxed mb-6">We use industry-standard tools and engines that power today's most successful games. Our primary development platforms include <strong>Unity for versatile 2D and 3D games, and Unreal Engine for high-fidelity, performance-intensive projects</strong>. Both engines support deployment across multiple platforms from a single codebase.</p>
                <p className="text-lg leading-relaxed mb-6">For programming, we work with <strong>C# in Unity and C++ in Unreal Engine, plus visual scripting systems like Blueprint</strong> for rapid prototyping. Our 3D pipeline includes <strong>Blender, Maya, and 3ds Max for modeling, animation, and rigging</strong>, while 2D art is created using <strong>Photoshop, Illustrator, and specialized pixel art tools</strong>.</p>
                <p className="text-lg leading-relaxed mb-6">Audio integration uses <strong>FMOD and Wwise for dynamic soundscapes</strong>, while multiplayer functionality is built with <strong>Photon, Mirror Networking, or custom backend solutions</strong>. We also integrate analytics, monetization, and distribution platforms to support your game's commercial success.</p>
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

        <section className="py-20 px-4" aria-labelledby="game-genres-heading">
          <div className="container mx-auto max-w-6xl">
            <div className=" gap-12 items-start">
              <div>
                <h2 id="game-genres-heading" className="superfont text-3xl md:text-4xl font-bold mb-6">
                  Game Genres & Specializations
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="text-lg leading-relaxed mb-6">Our portfolio spans multiple game genres and platforms. We've developed <strong>action and adventure games with complex combat systems, puzzle games with innovative mechanics, racing games with realistic physics, and strategy games with deep AI systems</strong>. Each genre requires specialized knowledge and approaches.</p>
                  <p className="text-lg leading-relaxed mb-6">For <strong>serious games and educational content</strong>, we create engaging experiences that teach skills, convey information, or simulate real-world scenarios. <strong>VR and AR games</strong> leverage immersive technologies for training, entertainment, and experimental gameplay that wouldn't be possible on traditional platforms.</p>
                  <p className="text-lg leading-relaxed mb-6">We also develop <strong>casual and hyper-casual mobile games</strong> optimized for broad audiences, as well as <strong>premium console and PC titles</strong> with AAA production values. Whether you're targeting competitive esports, family-friendly entertainment, or niche gaming communities, we adapt our development approach to your audience.</p>
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
                  Game Development Process
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="text-lg leading-relaxed mb-6">Every successful game starts with <strong>solid pre-production planning</strong>. We begin with concept development, market research, and competitive analysis to ensure your game has a clear vision and viable market position. This phase includes creating game design documents, technical specifications, and production timelines.</p>
                  <p className="text-lg leading-relaxed mb-6">During <strong>production</strong>, we work in iterative cycles with regular playtesting and feedback integration. Our multidisciplinary team includes programmers, artists, designers, and audio specialists who collaborate closely to maintain artistic vision while meeting technical requirements and deadlines.</p>
                  <p className="text-lg leading-relaxed mb-6"><strong>Quality assurance and launch preparation</strong> involve extensive testing across target platforms, performance optimization, and integration with distribution platforms like Steam, App Store, Google Play, or console marketplaces. Post-launch, we provide ongoing support, updates, and content development to keep your game thriving.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4" aria-labelledby="advanced-features-heading">
          <div className="container mx-auto max-w-6xl">
            <div className=" gap-12 items-start">
              <div>
                <h2 id="advanced-features-heading" className="superfont text-3xl md:text-4xl font-bold mb-6">
                  Advanced Game Features & Technology
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="text-lg leading-relaxed mb-6">Modern games require sophisticated systems and features. We implement <strong>advanced AI for NPCs and opponents, procedural content generation for infinite replayability, and complex physics simulations for realistic interactions</strong>. These systems create depth and engagement that keep players coming back.</p>
                  <p className="text-lg leading-relaxed mb-6">For <strong>multiplayer experiences</strong>, we build robust networking architectures, anti-cheat systems, and scalable server infrastructure. <strong>Monetization features</strong> include in-app purchases, subscription systems, and advertising integration designed to enhance rather than interrupt gameplay.</p>
                  <p className="text-lg leading-relaxed mb-6"><strong>Accessibility and inclusivity</strong> are core considerations in our development process. We implement colorblind-friendly palettes, subtitle systems, customizable controls, and other features that make games enjoyable for players with diverse abilities and preferences.</p>
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
                  Why Choose CodeCraft Studios for Game Development?
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="text-lg leading-relaxed mb-6">Game development is both art and science, requiring technical expertise, creative vision, and deep understanding of player psychology. Our team combines industry experience with fresh perspectives, delivering games that stand out in competitive markets while meeting commercial objectives.</p>
                  <p className="text-lg leading-relaxed mb-6">We maintain <strong>transparent communication throughout development</strong>, providing regular builds, progress reports, and opportunities for feedback. Our agile development process allows for adjustments and refinements while maintaining project timelines and budgets.</p>
                  <p className="text-lg leading-relaxed mb-6">At CodeCraft Studios, we're passionate about games and understand the unique challenges of interactive entertainment. Whether you're an indie developer with a revolutionary concept or an established company expanding into gaming, we bring the expertise and enthusiasm needed to create extraordinary gaming experiences.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4" aria-labelledby="ready-to-create-heading">
          <div className="container mx-auto max-w-6xl">
            <div className=" gap-12 items-start">
              <div>
                <h2 id="ready-to-create-heading" className="superfont text-3xl md:text-4xl font-bold mb-6">
                  Ready to Create Your Game?
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="text-lg leading-relaxed mb-6">Every great game starts with an idea and the right development partner. Whether you have a detailed game design document or just a spark of inspiration, we're here to help transform your concept into an engaging, polished game that players will love.</p>
                  <p className="text-lg leading-relaxed mb-6">Let's discuss your game concept, target platforms, and development goals. We'll provide insights on market opportunities, technical feasibility, and creative directions that align with your vision and budget. Your game development journey begins with a conversation.</p>
                  <p className="text-lg leading-relaxed mb-6">Contact CodeCraft Studios today and let's start building the game that will captivate players, drive engagement, and achieve your creative and commercial goals. The gaming world is waiting for your unique contribution — let's make it happen together.</p>
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
                  Featured Game Development Projects
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Explore our portfolio of successful game development projects. Each title showcases our commitment to innovative gameplay, stunning visuals, and engaging player experiences.
                </p>
              </div>

              <ProjectSwiper items={projectItems} className="max-w-6xl mx-auto" />

              <div className="text-center mt-12">
                <Button asChild size="lg" className="group">
                  <Link href="/contact">
                    Start Your Game Project
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
    console.error('Error in GameDevelopmentPage:', error);
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