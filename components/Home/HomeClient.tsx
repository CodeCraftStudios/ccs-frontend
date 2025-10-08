"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Code,
  Target,
  Users,
  Globe,
  BarChart3,
  CheckCircle,
  Sparkles,
  Rocket,
  Brain,
  Star,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  MessageCircle,
  ExternalLink,
} from "lucide-react"
import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const useAnimatedCounter = (end: number, duration = 2000) => {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!isVisible) return

    let startTime: number
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      setCount(Math.floor(progress * end))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isVisible, end, duration])

  return { count, setIsVisible }
}

export default function HomeClient() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [selectedService, setSelectedService] = useState(0)
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, 50])
  const y2 = useTransform(scrollY, [0, 300], [0, -50])
  const [portfolioIndex, setPortfolioIndex] = useState(0)
  const [blogIndex, setBlogIndex] = useState(0)

  const experienceCounter = useAnimatedCounter(7)
  const transparencyCounter = useAnimatedCounter(100)
  const supportCounter = useAnimatedCounter(24)

  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "TechStart Inc.",
      content:
        "CodeCraft Studios transformed our digital presence completely. Their attention to detail and technical expertise is unmatched.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      company: "Growth Marketing Co.",
      content:
        "Working with CodeCraft was a game-changer. They delivered exactly what we needed, on time and within budget.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      company: "Digital Solutions LLC",
      content:
        "The team at CodeCraft Studios goes above and beyond. Their support and expertise have been invaluable to our success.",
      rating: 5,
    },
  ]

  const faqs = [
    {
      question: "How long does a typical project take?",
      answer:
        "Project timelines vary based on complexity, but most projects are completed within 4-12 weeks. We provide detailed timelines during our initial consultation.",
    },
    {
      question: "Do you provide ongoing support after launch?",
      answer:
        "Yes! We offer lifetime support with relatively cheap costs to update your service and provide insights on performance within the first few months.",
    },
    {
      question: "What technologies do you use?",
      answer:
        "We use cutting-edge technologies including React, Next.js, Node.js, Python, and various cloud platforms to ensure your project is built with the latest standards.",
    },
    {
      question: "How much do your services cost?",
      answer:
        "Our pricing varies based on project scope and requirements. We provide transparent, detailed quotes after understanding your specific needs during our consultation.",
    },
  ]

  const services = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Web Development",
      description: "Custom websites built with modern technologies and best practices.",
      details: {
        overview: "We create stunning, responsive websites that drive results for your business.",
        features: [
          "Responsive Design",
          "Modern Frameworks (React, Next.js)",
          "SEO Optimized",
          "Fast Loading Times",
          "Cross-browser Compatibility",
        ],
        technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
        timeline: "2-8 weeks",
      },
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "App Development",
      description: "Mobile and web applications that deliver exceptional user experiences.",
      details: {
        overview: "Native and cross-platform applications built for performance and user engagement.",
        features: [
          "Native iOS & Android",
          "Cross-platform Solutions",
          "Real-time Features",
          "Push Notifications",
          "Offline Functionality",
        ],
        technologies: ["React Native", "Flutter", "Swift", "Kotlin"],
        timeline: "3-12 weeks",
      },
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Digital Marketing",
      description: "Strategic marketing campaigns that drive growth and engagement.",
      details: {
        overview: "Data-driven marketing strategies that convert visitors into customers.",
        features: [
          "Social Media Marketing",
          "Content Strategy",
          "PPC Campaigns",
          "Email Marketing",
          "Analytics & Reporting",
        ],
        technologies: ["Google Ads", "Facebook Ads", "Mailchimp", "Analytics"],
        timeline: "Ongoing",
      },
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "SEO Optimization",
      description: "Search engine optimization to improve your online visibility.",
      details: {
        overview: "Comprehensive SEO strategies to boost your search engine rankings.",
        features: [
          "Keyword Research",
          "On-page Optimization",
          "Technical SEO",
          "Link Building",
          "Performance Monitoring",
        ],
        technologies: ["Google Search Console", "SEMrush", "Ahrefs", "Schema"],
        timeline: "3-6 months",
      },
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "System Design",
      description: "Scalable system architecture for complex business requirements.",
      details: {
        overview: "Enterprise-grade system architecture designed for scale and reliability.",
        features: [
          "Microservices Architecture",
          "Database Design",
          "API Development",
          "Cloud Infrastructure",
          "Security Implementation",
        ],
        technologies: ["AWS", "Docker", "Kubernetes", "PostgreSQL"],
        timeline: "4-16 weeks",
      },
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Market Research",
      description: "Data-driven insights to inform your business decisions.",
      details: {
        overview: "Comprehensive market analysis to guide your business strategy.",
        features: [
          "Competitor Analysis",
          "User Research",
          "Market Trends",
          "Customer Insights",
          "Strategic Recommendations",
        ],
        technologies: ["Survey Tools", "Analytics", "Research Platforms"],
        timeline: "2-4 weeks",
      },
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 hero-grid" />

        <motion.div className="absolute inset-0" style={{ y: y1 }}>
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl hero-float-purple pulse-bg" />
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-accent-blue rounded-full blur-3xl hero-float-blue pulse-bg" />
          <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-accent-green rounded-full blur-2xl hero-float-green pulse-bg" />
          <div className="absolute top-40 right-1/4 w-20 h-20 bg-accent-orange rounded-full blur-2xl hero-float-purple pulse-bg" />
        </motion.div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div className="text-center" variants={staggerContainer} initial="initial" animate="animate">
            <motion.div variants={fadeInUp}>
              <Badge
                variant="secondary"
                className="mb-6 bg-primary text-primary-foreground border-primary/30 hover:bg-primary/90 transition-all duration-300 btn-glow shadow-sm"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Miami-Based Digital Experts
              </Badge>
            </motion.div>

            <motion.h1
              className="superfont text-4xl md:text-6xl lg:text-7xl font-bold text-balance mb-6 text-glow-primary"
              variants={fadeInUp}
            >
              We Turn Your Dreams Into
              <span className="text-primary block">Digital Reality</span>
            </motion.h1>

            <motion.p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 text-pretty" variants={fadeInUp}>
              CodeCraft Studios LLC - A small, sharp team of Miami-based experts who dominate in web development, app
              creation, marketing, and SEO. We don't cut corners, we craft solutions.
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" variants={fadeInUp}>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground group transition-all duration-300 btn-glow magnetic-hover"
              >
                <Rocket className="mr-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
                Start Your Project
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="hover:bg-primary hover:text-primary-foreground transition-all duration-300 magnetic-hover border-primary/30 hover:border-primary bg-transparent"
              >
                View Our Work
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Client Logos Slider */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-medium text-muted-foreground superfont tracking-wide">
              Trusted by Industry Leaders
            </p>
          </motion.div>

          <div className="relative">
            <div
              className="flex overflow-hidden"
              style={{
                maskImage:
                  "linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 12.5%, rgb(0, 0, 0) 87.5%, rgba(0, 0, 0, 0) 100%)",
              }}
            >
              <motion.div
                className="flex gap-8 items-center"
                animate={{
                  x: [0, -100 * 8], // Move by the width of 8 items
                }}
                transition={{
                  x: {
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                    duration: 20,
                    ease: "linear",
                  },
                }}
                style={{ width: "max-content" }}
              >
                {/* First set of client logos */}
                {[
                  { name: "TechCorp", logo: "🚀" },
                  { name: "InnovateLab", logo: "💡" },
                  { name: "DataFlow", logo: "📊" },
                  { name: "CloudSync", logo: "☁️" },
                  { name: "DigitalEdge", logo: "⚡" },
                  { name: "NextGen", logo: "🔮" },
                  { name: "SmartSys", logo: "🧠" },
                  { name: "WebForce", logo: "🌐" },
                ].map((client, index) => (
                  <div
                    key={`first-${index}`}
                    className="flex items-center gap-3 px-6 py-3 bg-card/50 border border-border/50 rounded-lg backdrop-blur-sm hover:bg-card/70 transition-all duration-300 flex-shrink-0 min-w-[180px]"
                  >
                    <div className="text-2xl">{client.logo}</div>
                    <span className="text-sm font-medium text-foreground whitespace-nowrap">{client.name}</span>
                  </div>
                ))}

                {/* Duplicate set for seamless loop */}
                {[
                  { name: "TechCorp", logo: "🚀" },
                  { name: "InnovateLab", logo: "💡" },
                  { name: "DataFlow", logo: "📊" },
                  { name: "CloudSync", logo: "☁️" },
                  { name: "DigitalEdge", logo: "⚡" },
                  { name: "NextGen", logo: "🔮" },
                  { name: "SmartSys", logo: "🧠" },
                  { name: "WebForce", logo: "🌐" },
                ].map((client, index) => (
                  <div
                    key={`second-${index}`}
                    className="flex items-center gap-3 px-6 py-3 bg-card/50 border border-border/50 rounded-lg backdrop-blur-sm hover:bg-card/70 transition-all duration-300 flex-shrink-0 min-w-[180px]"
                  >
                    <div className="text-2xl">{client.logo}</div>
                    <span className="text-sm font-medium text-foreground whitespace-nowrap">{client.name}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="superfont text-3xl md:text-5xl font-bold mb-4">
              <span className="text-primary">ABOUT US</span>
            </h2>
            <p className="superfont text-2xl font-semibold mb-8">We Turn Your Dreams Into Reality.</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                We are CodeCraft Studios LLC, proudly based in Miami, Florida. We're not your typical agency — we're a
                small, sharp team of experts who dominate in the digital world. From Web, App, and Software Development
                to System Design, Marketing, SEO, and Market Research, we cover all the bases.
              </p>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Every developer on our team has over 7 years of experience in their craft, and we keep things honest,
                fair, and transparent with our clients. We're not here to upsell you fluff — we're here to help your
                business grow with smart, scalable solutions that actually work.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                At CodeCraft Studios, we don't cut corners. We take the time to understand your vision, your audience,
                and your goals — and then we build something that reflects exactly that. You're not just another ticket
                in a CRM system — you're a partner.
              </p>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground hover:scale-105 transition-all duration-300">
                Read More
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              onViewportEnter={() => {
                experienceCounter.setIsVisible(true)
                transparencyCounter.setIsVisible(true)
                supportCounter.setIsVisible(true)
              }}
            >
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 border border-primary/20 hover:border-primary/40 transition-colors">
                <div className="grid grid-cols-2 gap-6">
                  <motion.div
                    className="text-center group cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-3xl font-bold text-primary mb-2 group-hover:text-primary/80 transition-colors">
                      {experienceCounter.count}+
                    </div>
                    <div className="text-sm text-muted-foreground">Years Experience</div>
                  </motion.div>
                  <motion.div
                    className="text-center group cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-3xl font-bold text-primary mb-2 group-hover:text-primary/80 transition-colors">
                      {transparencyCounter.count}%
                    </div>
                    <div className="text-sm text-muted-foreground">Transparent Process</div>
                  </motion.div>
                  <motion.div
                    className="text-center group cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-3xl font-bold text-primary mb-2 group-hover:text-primary/80 transition-colors">
                      {supportCounter.count}/7
                    </div>
                    <div className="text-sm text-muted-foreground">Support Available</div>
                  </motion.div>
                  <motion.div
                    className="text-center group cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-3xl font-bold text-primary mb-2 group-hover:text-primary/80 transition-colors">
                      Miami
                    </div>
                    <div className="text-sm text-muted-foreground">Based Team</div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="superfont text-3xl md:text-5xl font-bold mb-4">
              Our <span className="text-primary">Partners</span>
            </h2>
            <p className="text-xl text-muted-foreground">Trusted by industry leaders</p>
          </motion.div>

          <div className="partners-container relative">
            <div className="partners-track">
              {[
                { name: "Vercel", logo: "V" },
                { name: "Next.js", logo: "N" },
                { name: "React", logo: "R" },
                { name: "Tailwind CSS", logo: "T" },
                { name: "TypeScript", logo: "TS" },
                { name: "Framer Motion", logo: "F" },
                { name: "Supabase", logo: "S" },
                { name: "Stripe", logo: "ST" },
              ]
                .concat([
                  { name: "Vercel", logo: "V" },
                  { name: "Next.js", logo: "N" },
                  { name: "React", logo: "R" },
                  { name: "Tailwind CSS", logo: "T" },
                  { name: "TypeScript", logo: "TS" },
                  { name: "Framer Motion", logo: "F" },
                  { name: "Supabase", logo: "S" },
                  { name: "Stripe", logo: "ST" },
                ])
                .map((partner, index) => (
                  <motion.div
                    key={index}
                    className="flex-shrink-0 mx-8 text-center group cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-16 h-16 bg-white border-2 border-primary/20 rounded-full flex items-center justify-center mb-3 group-hover:border-primary/40 group-hover:bg-primary/5 transition-colors">
                      <span className="text-primary font-bold text-lg group-hover:scale-110 transition-transform">
                        {partner.logo}
                      </span>
                    </div>
                    <div className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors whitespace-nowrap">
                      {partner.name}
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="superfont text-3xl md:text-5xl font-bold mb-4">
              Our <span className="text-primary">Sponsors</span>
            </h2>
            <p className="text-xl text-muted-foreground">Supporting our mission to deliver excellence</p>
          </motion.div>

          {/* Gold Sponsors */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-8">
              <h3 className="superfont text-2xl font-bold text-yellow-500 mb-2">Gold Sponsors</h3>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto rounded-full"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  name: "TechCorp Solutions",
                  logo: "TC",
                  caption: "Leading enterprise software solutions provider",
                  website: "https://techcorp.example.com",
                },
                {
                  name: "Digital Innovations Inc",
                  logo: "DI",
                  caption: "Pioneering digital transformation technologies",
                  website: "https://digitalinnovations.example.com",
                },
              ].map((sponsor, index) => (
                <motion.a
                  key={index}
                  href={sponsor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="p-8 hover:shadow-lg hover:shadow-yellow-500/20 transition-all duration-300 border-2 border-yellow-500/30 hover:border-yellow-500/50 bg-gradient-to-br from-yellow-500/5 to-yellow-600/5">
                    <div className="flex items-center space-x-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-white font-bold text-2xl">{sponsor.logo}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-yellow-500 mb-2 group-hover:text-yellow-400 transition-colors">
                          {sponsor.name}
                        </h4>
                        <p className="text-muted-foreground">{sponsor.caption}</p>
                      </div>
                      <ExternalLink className="w-5 h-5 text-yellow-500 group-hover:scale-110 transition-transform" />
                    </div>
                  </Card>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Silver Sponsors */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-8">
              <h3 className="superfont text-2xl font-bold text-gray-400 mb-2">Silver Sponsors</h3>
              <div className="w-24 h-1 bg-gradient-to-r from-gray-300 to-gray-500 mx-auto rounded-full"></div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: "CloudTech Systems",
                  logo: "CS",
                  website: "https://cloudtech.example.com",
                },
                {
                  name: "WebFlow Dynamics",
                  logo: "WD",
                  website: "https://webflow.example.com",
                },
                {
                  name: "DataSync Pro",
                  logo: "DS",
                  website: "https://datasync.example.com",
                },
              ].map((sponsor, index) => (
                <motion.a
                  key={index}
                  href={sponsor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="p-6 hover:shadow-lg hover:shadow-gray-400/20 transition-all duration-300 border-2 border-gray-400/30 hover:border-gray-400/50 bg-gradient-to-br from-gray-400/5 to-gray-500/5">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <span className="text-white font-bold text-lg">{sponsor.logo}</span>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-400 group-hover:text-gray-300 transition-colors">
                        {sponsor.name}
                      </h4>
                      <ExternalLink className="w-4 h-4 text-gray-400 mx-auto mt-2 group-hover:scale-110 transition-transform" />
                    </div>
                  </Card>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Bronze Sponsors */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-8">
              <h3 className="superfont text-2xl font-bold text-orange-600 mb-2">Bronze Sponsors</h3>
              <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  name: "StartupHub",
                  logo: "SH",
                  website: "https://startuphub.example.com",
                },
                {
                  name: "DevTools Co",
                  logo: "DT",
                  website: "https://devtools.example.com",
                },
                {
                  name: "CodeBase",
                  logo: "CB",
                  website: "https://codebase.example.com",
                },
                {
                  name: "TechStart",
                  logo: "TS",
                  website: "https://techstart.example.com",
                },
              ].map((sponsor, index) => (
                <motion.a
                  key={index}
                  href={sponsor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="p-4 hover:shadow-lg hover:shadow-orange-600/20 transition-all duration-300 border-2 border-orange-600/30 hover:border-orange-600/50 bg-gradient-to-br from-orange-600/5 to-orange-700/5">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                        <span className="text-white font-bold text-sm">{sponsor.logo}</span>
                      </div>
                      <h4 className="text-sm font-medium text-orange-600 group-hover:text-orange-500 transition-colors">
                        {sponsor.name}
                      </h4>
                      <ExternalLink className="w-3 h-3 text-orange-600 mx-auto mt-1 group-hover:scale-110 transition-transform" />
                    </div>
                  </Card>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent-blue/5 to-accent-green/10"></div>
          <div
            style={{
              backgroundImage: `linear-gradient(rgba(147, 51, 234, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(147, 51, 234, 0.2) 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
              animation: "gridMove 20s linear infinite",
            }}
            className="absolute inset-0 opacity-30"
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="superfont text-3xl md:text-5xl font-bold mb-4 text-glow-primary">
              <span className="text-primary">SERVICES</span>
            </h2>
            <p className="text-xl text-muted-foreground">What We Provide</p>
          </motion.div>

          <div className="md:hidden mb-8">
            <Select
              value={selectedService.toString()}
              onValueChange={(value) => setSelectedService(Number.parseInt(value))}
            >
              <SelectTrigger className="w-full border-primary/30 focus:border-primary">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service, index) => (
                  <SelectItem key={index} value={index.toString()}>
                    <div className="flex items-center space-x-2">
                      <div className="text-primary">{service.icon}</div>
                      <span>{service.title}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-4 hidden md:block">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => setSelectedService(index)}
                  className={`cursor-pointer p-6 rounded-lg border-2 transition-all duration-300 ${
                    selectedService === index
                      ? "border-primary bg-primary/5 shadow-lg shadow-primary/20 card-glow-purple"
                      : "border-muted hover:border-primary/50 bg-background hover:bg-primary/5 card-glow-purple"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <motion.div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
                        selectedService === index ? "bg-primary/20" : "bg-primary/10"
                      }`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="text-primary">{service.icon}</div>
                    </motion.div>
                    <div className="flex-1">
                      <h3
                        className={`text-lg font-semibold transition-colors ${
                          selectedService === index ? "text-primary text-glow-primary" : "text-foreground"
                        }`}
                      >
                        {service.title}
                      </h3>
                      <p className="text-sm text-foreground">{service.description}</p>
                    </div>
                    <motion.div animate={{ rotate: selectedService === index ? 90 : 0 }} transition={{ duration: 0.3 }}>
                      <ArrowRight
                        className={`w-5 h-5 transition-colors ${
                          selectedService === index ? "text-primary" : "text-muted-foreground"
                        }`}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              key={selectedService}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:sticky lg:top-8 hidden md:block"
            >
              <Card className="h-fit border-2 border-primary/30 shadow-lg shadow-primary/20 card-glow-purple">
                <CardHeader>
                  <div className="flex items-center space-x-4 mb-4">
                    <motion.div
                      className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <div className="text-primary">{services[selectedService].icon}</div>
                    </motion.div>
                    <div>
                      <CardTitle className="text-2xl text-primary text-glow-primary">
                        {services[selectedService].title}
                      </CardTitle>
                      <p className="text-muted-foreground">Timeline: {services[selectedService].details.timeline}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-2 text-glow-blue">Overview</h4>
                    <p className="text-muted-foreground">{services[selectedService].details.overview}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 text-glow-green">Key Features</h4>
                    <ul className="space-y-2">
                      {services[selectedService].details.features.map((feature, index) => (
                        <motion.li
                          key={index}
                          className="flex items-center space-x-3"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <CheckCircle className="w-4 h-4 text-accent-green flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {services[selectedService].details.technologies.map((tech, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          <Badge
                            variant="secondary"
                            className="bg-primary/30 text-primary-foreground border-primary/50 hover:bg-primary/40 transition-colors"
                          >
                            {tech}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground group btn-glow magnetic-hover">
                    Get Started with {services[selectedService].title}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="superfont text-3xl md:text-5xl font-bold mb-4">
              <span className="text-primary">SOLUTIONS</span>
            </h2>
            <p className="text-xl text-muted-foreground">For Specific Clients</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 border-2 hover:border-primary/30 overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src="/enterprise-office-building-modern-technology.jpg"
                    alt="Enterprise Solutions"
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl">Enterprise Solutions</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {[
                      "Custom CRM Systems",
                      "Enterprise Web Applications",
                      "Database Architecture",
                      "API Development",
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        className="flex items-center space-x-3 group cursor-pointer"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="group-hover:text-primary transition-colors">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 border-2 hover:border-primary/30 overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src="/small-business-coffee-shop-modern-website.jpg"
                    alt="Small Business Solutions"
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl">Small Business Solutions</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {[
                      "Professional Websites",
                      "E-commerce Platforms",
                      "Local SEO Optimization",
                      "Social Media Integration",
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        className="flex items-center space-x-3 group cursor-pointer"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="group-hover:text-primary transition-colors">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="superfont text-3xl md:text-5xl font-bold mb-4">
              <span className="text-primary">Roadmap</span> For Our Projects
            </h2>
            <p className="text-sm text-muted-foreground">
              *Estimations are based on our average projects and don't represent actual time frames.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-primary/50 to-primary opacity-30"></div>

              <div className="space-y-16">
                {[
                  {
                    step: 1,
                    title: "We Meet",
                    time: "Est. 1-3 days",
                    description:
                      "We hop on a call with you, and ask a couple of questions based on your requirements, like what kind service do you request, what colors, fonts, and themes do you have in mind.",
                    color: "orange",
                    side: "right",
                  },
                  {
                    step: 2,
                    title: "We Figure Out Pricing",
                    time: "Est. 1-5 days",
                    description:
                      "We proceed to consult our developers, designers and staff about costs, estimated time frame, tools that we would use, and such. We call you back and discuss pricing.",
                    color: "blue",
                    side: "left",
                  },
                  {
                    step: 3,
                    title: "Contract Signed, and Downpayment Processed",
                    time: "Est. 1-7 days",
                    description:
                      "Once we come up with an agreed price, timeline, and process downpayment and contract, we then begin the project.",
                    color: "green",
                    side: "right",
                  },
                  {
                    step: 4,
                    title: "Research Phase",
                    time: "Est. 1-14 days",
                    description:
                      "We start researching about your niche, audience, and branding. We begin analyzing data and similar services from your competitors, like what's the age to most people, what states, countries, and regions do people search from.",
                    color: "purple",
                    side: "left",
                  },
                  {
                    step: 5,
                    title: "Design Phase",
                    time: "Est. 1-14 days",
                    description:
                      "We begin planning and designing your service, creating prototypes, testing different ideas, colors, fonts, images, etc.",
                    color: "orange",
                    side: "right",
                  },
                  {
                    step: 6,
                    title: "Frontend Development",
                    time: "Est. 1-30 days",
                    description:
                      "Our team begins to code the frontend (what users interact with), using many technologies, and modules.",
                    color: "blue",
                    side: "left",
                  },
                  {
                    step: 7,
                    title: "Backend Development",
                    time: "Est. 1-30 days",
                    description:
                      "Around the same time as Frontend Development, we begin designing the database, tables, creating the API's that connect with the Frontend, Controllers, and other techy stuff.",
                    color: "green",
                    side: "right",
                  },
                  {
                    step: 8,
                    title: "Revisions",
                    time: "Est. 1-15 days per revision",
                    description:
                      "For every project, you get 3 FREE revisions, and after that, the rate applied in the contract. We go back and forth to ensure your satisfaction.",
                    color: "purple",
                    side: "left",
                  },
                  {
                    step: 9,
                    title: "Service Deployment",
                    time: "Est. 1-3 days",
                    description: "We deploy your service out to the world so that everyone can access it.",
                    color: "orange",
                    side: "right",
                  },
                  {
                    step: 10,
                    title: "Project Finalized",
                    time: "Hooray!",
                    description:
                      "Once the project is live, we process the rest of the payment, payout our hardworking team, and then give you a lifetime support, with relatively cheap costs to update your service.",
                    color: "blue",
                    side: "left",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="relative"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className={`flex items-center ${item.side === "left" ? "flex-row-reverse" : ""}`}>
                      {/* Step number circle */}
                      <div className={`${item.side === "left" ? "ml-8" : "mr-8"} flex-shrink-0 relative z-10`}>
                        <div
                          className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-lg border-4 transition-all duration-300 hover:scale-110
                          ${item.color === "orange" ? "bg-orange-500 border-orange-400 text-white" : ""}
                          ${item.color === "blue" ? "bg-blue-500 border-blue-400 text-white" : ""}
                          ${item.color === "green" ? "bg-green-500 border-green-400 text-white" : ""}
                          ${item.color === "purple" ? "bg-primary border-primary/70 text-primary-foreground" : ""}
                        `}
                        >
                          {item.step}
                        </div>
                      </div>

                      {/* Content card */}
                      <motion.div
                        className={`flex-1 max-w-md ${item.side === "left" ? "mr-8" : "ml-8"}`}
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Card
                          className={`border-2 transition-all duration-300 hover:shadow-lg
                          ${item.color === "orange" ? "border-orange-500/30 hover:border-orange-500/50 hover:shadow-orange-500/10" : ""}
                          ${item.color === "blue" ? "border-blue-500/30 hover:border-blue-500/50 hover:shadow-blue-500/10" : ""}
                          ${item.color === "green" ? "border-green-500/30 hover:border-green-500/50 hover:shadow-green-500/10" : ""}
                          ${item.color === "purple" ? "border-primary/30 hover:border-primary/50 hover:shadow-primary/10" : ""}
                        `}
                        >
                          <CardHeader>
                            <CardTitle className="text-xl">{item.title}</CardTitle>
                            <p
                              className={`text-sm font-medium
                              ${item.color === "orange" ? "text-orange-400" : ""}
                              ${item.color === "blue" ? "text-blue-400" : ""}
                              ${item.color === "green" ? "text-green-400" : ""}
                              ${item.color === "purple" ? "text-primary" : ""}
                            `}
                            >
                              {item.time}
                            </p>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground">{item.description}</p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="superfont text-3xl md:text-5xl font-bold mb-4">
              <span className="text-primary">PORTFOLIO</span>
            </h2>
            <p className="text-xl text-muted-foreground">See Our Work</p>
          </motion.div>

          <div className="relative">
            <div className="overflow-hidden">
              <motion.div
                className="flex gap-8"
                animate={{ x: portfolioIndex * -100 + "%" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {[
                  {
                    title: "E-commerce Platform",
                    category: "Web Development",
                    image: "/modern-ecommerce-website.png",
                    description: "Modern responsive e-commerce platform with advanced features",
                  },
                  {
                    title: "Mobile Banking App",
                    category: "App Development",
                    image: "/mobile-banking-app.png",
                    description: "Secure and intuitive mobile banking application",
                  },
                  {
                    title: "Marketing Dashboard",
                    category: "System Design",
                    image: "/analytics-dashboard.png",
                    description: "Comprehensive analytics and marketing dashboard",
                  },
                  {
                    title: "Corporate Website",
                    category: "Web Development",
                    image: "/web-development-agency.png",
                    description: "Professional corporate website with modern design",
                  },
                  {
                    title: "Email Campaign Tool",
                    category: "Marketing",
                    image: "/email-marketing-campaign.png",
                    description: "Advanced email marketing campaign management tool",
                  },
                ].map((project, index) => (
                  <motion.div
                    key={index}
                    className="min-w-full md:min-w-[calc(33.333%-1rem)] flex-shrink-0"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="overflow-hidden hover-lift h-full">
                      <div className="relative">
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <div className="text-center text-white p-4">
                            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                            <p className="text-sm mb-2">{project.category}</p>
                            <p className="text-xs">{project.description}</p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Portfolio Navigation */}
            <div className="flex justify-center items-center mt-8 gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPortfolioIndex(Math.max(0, portfolioIndex - 1))}
                disabled={portfolioIndex === 0}
                className="glow-button"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>

              <div className="flex gap-2">
                {[0, 1, 2].map((index) => (
                  <button
                    key={index}
                    onClick={() => setPortfolioIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      portfolioIndex === index ? "bg-primary glow" : "bg-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setPortfolioIndex(Math.min(2, portfolioIndex + 1))}
                disabled={portfolioIndex === 2}
                className="glow-button"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="superfont text-3xl md:text-5xl font-bold mb-4">
              <span className="text-primary">TESTIMONIALS</span>
            </h2>
            <p className="text-xl text-muted-foreground">What Our Clients Say</p>
          </motion.div>

          <div className="relative">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-8 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 border-2 hover:border-primary/30">
                <div className="text-center">
                  <motion.div
                    className="flex justify-center mb-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, rotate: -180 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                      >
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      </motion.div>
                    ))}
                  </motion.div>
                  <p className="text-lg text-muted-foreground mb-6 italic">
                    "{testimonials[currentTestimonial].content}"
                  </p>
                  <div>
                    <p className="font-semibold">{testimonials[currentTestimonial].name}</p>
                    <p className="text-sm text-muted-foreground">{testimonials[currentTestimonial].company}</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            <div className="flex justify-center mt-6 space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentTestimonial(currentTestimonial === 0 ? testimonials.length - 1 : currentTestimonial - 1)
                }
                className="hover:bg-primary hover:text-primary-foreground hover:scale-110 transition-all duration-300"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentTestimonial(currentTestimonial === testimonials.length - 1 ? 0 : currentTestimonial + 1)
                }
                className="hover:bg-primary hover:text-primary-foreground hover:scale-110 transition-all duration-300"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex justify-center mt-4 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? "bg-primary w-8" : "bg-muted-foreground/30 hover:bg-primary/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Featured Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="superfont text-3xl md:text-5xl font-bold mb-4">
              <span className="text-primary">OUR BLOGS</span>
            </h2>
            <p className="text-xl text-muted-foreground">Learn About Trends, Tools, and Us</p>
          </motion.div>

          <div className="relative">
            <div className="overflow-hidden">
              <motion.div
                className="flex gap-8"
                animate={{ x: blogIndex * -100 + "%" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {[
                  {
                    title: "How to Choose a Web Development Agency That Delivers",
                    excerpt: "Learn how to choose a web development agency that fits your goals, budget, and vision.",
                    date: "30 Aug 2025",
                    image: "/web-development-agency.png",
                  },
                  {
                    title: "Why Every Website Needs Email Campaigns",
                    excerpt:
                      "Email campaigns boost traffic, engagement, and ROI for any website. Learn why they matter.",
                    date: "18 Aug 2025",
                    image: "/email-marketing-campaign.png",
                  },
                  {
                    title: "How to Make Your Web Forms Look Clean and Professional",
                    excerpt: "Design clean, modern, and conversion-optimized web forms with expert tips.",
                    date: "15 Aug 2025",
                    image: "/professional-web-form-design.png",
                  },
                  {
                    title: "The Future of Digital Marketing in 2025",
                    excerpt: "Explore upcoming trends and technologies that will shape digital marketing strategies.",
                    date: "10 Aug 2025",
                    image: "/analytics-dashboard.png",
                  },
                ].map((post, index) => (
                  <motion.div
                    key={index}
                    className="min-w-full md:min-w-[calc(33.333%-1rem)] flex-shrink-0"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="overflow-hidden hover-lift h-full">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-48 object-cover"
                      />
                      <CardHeader>
                        <CardTitle className="text-lg">{post.title}</CardTitle>
                        <CardDescription>{post.excerpt}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">{post.date}</span>
                          <Button variant="ghost" size="sm" className="glow-button">
                            Read More
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Blog Navigation */}
            <div className="flex justify-center items-center mt-8 gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setBlogIndex(Math.max(0, blogIndex - 1))}
                disabled={blogIndex === 0}
                className="glow-button"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>

              <div className="flex gap-2">
                {[0, 1].map((index) => (
                  <button
                    key={index}
                    onClick={() => setBlogIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      blogIndex === index ? "bg-primary glow" : "bg-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setBlogIndex(Math.min(1, blogIndex + 1))}
                disabled={blogIndex === 1}
                className="glow-button"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" className="glow-button bg-transparent">
              View All Blogs
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="superfont text-3xl md:text-5xl font-bold mb-4">
              <span className="text-primary">FAQ</span>
            </h2>
            <p className="text-xl text-muted-foreground">Frequently Asked Questions</p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 border-2 hover:border-primary/30">
                  <CardHeader
                    className="cursor-pointer group"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {faq.question}
                      </CardTitle>
                      <motion.div animate={{ rotate: openFaq === index ? 180 : 0 }} transition={{ duration: 0.3 }}>
                        {openFaq === index ? (
                          <Minus className="w-5 h-5 text-primary" />
                        ) : (
                          <Plus className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                        )}
                      </motion.div>
                    </div>
                  </CardHeader>
                  <motion.div
                    initial={false}
                    animate={{
                      height: openFaq === index ? "auto" : 0,
                      opacity: openFaq === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: "hidden" }}
                  >
                    {openFaq === index && (
                      <CardContent>
                        <motion.p
                          className="text-muted-foreground"
                          initial={{ y: -10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.1 }}
                        >
                          {faq.answer}
                        </motion.p>
                      </CardContent>
                    )}
                  </motion.div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link href="/contact">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 btn-glow magnetic-hover rounded-full px-6 py-3 group"
          >
            <MessageCircle className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
            Contact Us
          </Button>
        </Link>
      </motion.div>
    </div>
  )
}
