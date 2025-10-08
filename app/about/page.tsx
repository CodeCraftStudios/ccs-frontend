import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Users, Target, Lightbulb, Award, MapPin, Mail, Phone, Sparkles } from "lucide-react"
import Link from "next/link"
import { StackMarquee } from "@/components/Home/StackMarquee"
import { ClientsMarquee } from "@/components/Home/ClientsMarquee"
import Hero from "@/components/About/Hero"
import { EMAIL, EXPERIENCE, PHONE, PROJECTS, FRONTEND } from "@/lib/consts"
import CTASection from "@/components/Home/CTAOne"
import Portfolio from "@/components/Home/Portfolio"

import ServicesWrapper from "@/components/Home/ServicesWrapper"
import Roadmap from "@/components/Home/Roadmap"
import Solutions from "@/components/Home/Solutions"
import Reviews from "@/components/Home/Reviews"

export const metadata: Metadata = {
  title: "About CodeCraft Studios - Miami IT & Digital Marketing Agency",
  description: "Learn about CodeCraft Studios, Miami's premier IT and digital marketing agency. Founded by John Molina, we specialize in web development, mobile apps, and innovative digital solutions for businesses across Florida.",
  keywords: [
    "about codecraft studios",
    "miami web development agency",
    "florida it company",
    "john molina developer",
    "miami digital marketing",
    "web development miami",
    "software development florida",
    "IT solutions miami",
    "custom software development",
    "digital transformation"
  ],
  authors: [{ name: "John Molina", url: FRONTEND }],
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
    title: "About CodeCraft Studios - Miami IT & Digital Marketing Agency",
    description: "Discover the story behind CodeCraft Studios, Miami's trusted partner for innovative digital solutions. Meet our founder John Molina and learn about our mission to transform businesses through technology.",
    url: `${FRONTEND}/about`,
    siteName: "CodeCraft Studios",
    images: [
      {
        url: `${FRONTEND}/media/about/about-01.webp`,
        width: 1200,
        height: 630,
        alt: "CodeCraft Studios About Us - Miami IT and Digital Marketing Agency",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About CodeCraft Studios - Miami IT & Digital Marketing Agency",
    description: "Learn about CodeCraft Studios, founded by John Molina in Miami. We deliver world-class web development, mobile apps, and digital marketing solutions.",
    images: [`${FRONTEND}/media/about/about-01.webp`],
    creator: "@codecraft_studios",
  },
  alternates: {
    canonical: `${FRONTEND}/about`,
  },
  category: "Technology",
}

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Alex Rodriguez",
      role: "CEO & Lead Developer",
      experience: "10+ years",
      specialties: ["Full-Stack Development", "System Architecture", "Team Leadership"],
      image: "/professional-hispanic-male-developer-ceo.jpg",
    },
    {
      name: "Sarah Chen",
      role: "CTO & Senior Developer",
      experience: "9+ years",
      specialties: ["Backend Systems", "DevOps", "Database Design"],
      image: "/professional-asian-female-developer-cto.jpg",
    },
    {
      name: "Marcus Johnson",
      role: "Marketing Director",
      experience: "8+ years",
      specialties: ["Digital Marketing", "SEO Strategy", "Brand Development"],
      image: "/professional-black-male-marketing-director.jpg",
    },
    {
      name: "Elena Vasquez",
      role: "UI/UX Designer",
      experience: "7+ years",
      specialties: ["User Experience", "Interface Design", "Brand Identity"],
      image: "/professional-latina-female-ux-designer.jpg",
    },
  ]

  const values = [
    {
      icon: <Target className="h-8 w-8" />,
      title: "Client-Focused",
      description:
        "Every decision we make is centered around delivering exceptional value to our clients and exceeding their expectations.",
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Innovation First",
      description:
        "We stay ahead of technology trends and continuously innovate to provide cutting-edge solutions for modern challenges.",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Collaborative Spirit",
      description:
        "We believe in the power of teamwork, both within our team and in partnership with our clients to achieve shared success.",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Quality Excellence",
      description:
        "We maintain the highest standards in everything we do, from code quality to customer service and project delivery.",
    },
  ]

  const stats = [
    { number: "150+", label: "Projects Completed" },
    { number: "50+", label: "Happy Clients" },
    { number: "7+", label: "Years Experience" },
    { number: "24/7", label: "Support Available" },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <Hero/>
      <ClientsMarquee/>
      {/* About Us Section */}
      <section className="py-20 px-4" aria-labelledby="about-us-heading">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h1 id="about-us-heading" className="superfont text-4xl md:text-5xl font-bold mb-6">About CodeCraft Studios - Miami's Premier IT & Digital Marketing Agency</h1>
              <div className="space-y-6 text-lg leading-relaxed">
                <p>
                  At <strong>CodeCraft Studios</strong>, Miami's premier IT and digital marketing agency, we specialize in transforming your vision into impactful digital experiences.
                  From websites and mobile apps to full-scale systems and custom software development, our expert team blends creativity and technical
                  expertise to deliver clean, modern, and conversion-focused solutions tailored to your business needs.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                    <span>
                      We work closely with you to fully understand your goals, ensuring that every design reflects your
                      brand's identity and purpose.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                    <span>
                      Our developers and designers are experts in their craft, committed to delivering high-performance,
                      scalable, and user-friendly platforms.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                    <span>
                      Whether you're starting from scratch or revamping an existing project, we're your reliable partner
                      from concept to launch and beyond.
                    </span>
                  </li>
                </ul>
                <Button asChild size="lg" className="mt-6">
                  <Link href="/contact">
                    Contact Us Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="sticky top-22">
              <div className="relative rounded-2xl overflow-hidden aspect-square">
                <img
                  src="/media/about/about-01.webp"
                  alt="CodeCraft Studios team working on innovative web development and digital marketing solutions in Miami office"
                  className="w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
           
              <div  className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2 superfont">{PROJECTS}+</div>
                <div className="text-muted-foreground">Projects</div>
              </div>
              <div  className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2 superfont">{EXPERIENCE}+</div>
                <div className="text-muted-foreground">Years Of Experience</div>
              </div>
              <div  className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2 superfont">50+</div>
                <div className="text-muted-foreground">Servers Worldwide</div>
              </div>
              <div  className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2 superfont">24/7</div>
                <div className="text-muted-foreground">Support</div>
              </div>
           
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-4" aria-labelledby="our-story-heading">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-1 gap-12 items-center">
            <div>
              <h2 id="our-story-heading" className="superfont text-4xl md:text-5xl font-bold mb-6">Our Story: From Vision to Miami's Leading Digital Agency</h2>
              <div className="space-y-6 text-lg leading-relaxed">
                <p>
                  Founded in <strong>Miami, Florida</strong>, CodeCraft Studios emerged from a simple belief: that every business
                  deserves access to world-class digital solutions, regardless of their size or budget. Our commitment to excellence in
                  <strong> web development</strong>, <strong>mobile app development</strong>, and <strong>digital marketing</strong> has made us a trusted partner for businesses throughout South Florida.
                </p>
                <p>
                  Our journey began when our founder <strong>John Molina</strong>, along with experienced developers and marketers, recognized the gap between
                  what businesses needed and what traditional agencies were delivering. We set out to create a different
                  kind of agency—one that combines technical excellence with genuine partnership and innovative solutions.
                </p>
                <p>
                  Today, we're proud to be Miami's trusted partner for innovative digital solutions, helping businesses
                  across Florida and beyond achieve their <strong>digital transformation goals</strong> through cutting-edge technology and strategic marketing.
                </p>
              </div>
            </div>

            
          </div>
        </div>
      </section>
      <CTASection/>
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="sticky top-24">
              <div className=" aspect-square rounded-2xl overflow-hidden">
                <img
                  src="/media/about/me.webp"
                  alt="John Molina, Founder and CEO of CodeCraft Studios, Miami's leading web development and digital marketing expert"
                  className="w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              </div>
            </div>
            <div>
              <Badge className="mb-3">ABOUT CEO</Badge>
              <h2 className="superfont text-4xl md:text-5xl font-bold mb-6">Meet <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500">John Molina</span> - Founder & CEO</h2>
              <div className="space-y-6 text-lg leading-relaxed">
                <p>
                  <strong>I sacrificed a lot to get to where I am, and to grow this business...</strong> It's like raising a little child. I started coding from a young age (11 years old), and have since fallen in love with coding. During High School, I would <strong>automate my teacher's digital tasks through coding.</strong> For instance, I made a website where new students could use their phone to see the A and B days... and I would make websites for those students that <i>"illegally"</i> sold food 😅, like brownies, chips, ect. Not to metion, I developed a service for students to request schedule changes online, instead of having to wait in line in front of a table (Sadly they did not trust a minor to make this project live).
                </p>
                <p>
                  I went to FAU, but college just wasted my time and money... <strong>It's all a scam. (At least for me)</strong> You go and drop $9k on a semester for Computer Science, and they begin teaching you about <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500  via-yellow-500 via-green-500 to-purple-500 font-bolder">LGBTQ</span> and Music. I dropped out, made CodeCraft Studios, and became 10x more successful at learning about System Design, and Programming.
                </p>
                <p>
                  I have made great networks, met amazing businessmen, created partnerships, friendship, and focused on providing excellence at what I was good at.
                </p>
                <p>
                  I use cutting-edge technologies to turn your dreams into reality, including <strong>React</strong>, <strong>React Native</strong>, <strong>Angular</strong>, <strong>Django</strong>, <strong>PostgreSQL</strong>, <strong>SQLite</strong>, <strong>Express.js</strong>, and many more modern frameworks and tools. Join the CodeCraft Studios family and experience digital excellence like never before with our comprehensive <strong>web development</strong>, <strong>mobile app development</strong>, and <strong>digital marketing services</strong> in Miami and throughout Florida.
                </p>
              </div>
            </div>

            
          </div>
        </div>
      </section>
      <StackMarquee/>
      {/* Values Section */}
      <section className="py-20 px-4 bg-muted/20" aria-labelledby="values-heading">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 id="values-heading" className="superfont text-4xl md:text-5xl font-bold mb-6">Our Core Values - What Drives CodeCraft Studios</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              These core principles guide everything we do at CodeCraft Studios and shape how we deliver exceptional web development, mobile app development, and digital marketing services to our clients across Miami and Florida.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index}>
                <Card className="h-full bg-card/50 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                  <CardContent className="p-8">
                    <div className="text-primary mb-4">{value.icon}</div>
                    <h3 className="superfont text-2xl font-bold mb-4">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Roadmap/>
      <ServicesWrapper/>
      <Portfolio/>
      <Solutions/>
      <Reviews/>

      
      {/* Contact CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10">
        <div className="container mx-auto max-w-4xl text-center">
          <div>
            <h2 className="superfont text-4xl md:text-5xl font-bold mb-6">Ready to Work Together?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help transform your digital presence and drive your business forward with
              innovative solutions.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button asChild size="lg" className="group">
                <Link href="/contact">
                  Get Started Today
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <div className="flex items-start flex-col gap-1 text-sm text-muted-foreground">
                <Link href={`mailto:${EMAIL}`} className="font-bold flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {EMAIL}
                </Link>
                <Link href={`tel:${PHONE}`} className="font-bold flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  {PHONE}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}