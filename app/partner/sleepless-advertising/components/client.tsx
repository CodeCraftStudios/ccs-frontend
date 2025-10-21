import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ExternalLink, Gamepad2, Smartphone, Eye, Users, Zap, Trophy, Target, Rocket } from "lucide-react"
import Link from "next/link"

export default function RsquareClient({partner}: {partner:any}) {
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
    { number: "50+", label: "Games Developed" },
    { number: "2M+", label: "Downloads" },
    { number: "15+", label: "VR/AR Projects" },
    { number: "98%", label: "Client Satisfaction" },
  ]

  return (
    <div className="min-h-screen bg-background">
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
            <Badge className="mb-6 px-6 py-2 text-sm bg-primary/50 rounded-full text-primary-foreground">🤝 Partnership</Badge>

            {/* Partner Logos */}
            <div className="flex items-center justify-center gap-8 mb-8">
              <Avatar className="w-20 h-20 border-2 border-primary/20">
                <AvatarImage src="/rsquare-games-logo.jpg" alt="RSquare Games" />
                <AvatarFallback className="bg-primary text-primary-foreground text-xl font-bold">RG</AvatarFallback>
              </Avatar>
              <div className="text-4xl text-primary font-bold">×</div>
              <Avatar className="w-20 h-20 border-2 border-primary/20">
                <AvatarImage src="/codecraft-logo.jpg" alt="CodeCraft Studios" />
                <AvatarFallback className="bg-primary text-primary-foreground text-xl font-bold">CC</AvatarFallback>
              </Avatar>
            </div>

            {/* Main Heading */}
            <h1 className="superfont text-5xl md:text-7xl font-bold mb-6 text-glow-primary">
              RSquare Games × CodeCraft Studios
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto text-balance">
              Combining Unity game development expertise with cutting-edge web technologies to create immersive gaming
              experiences
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-glow px-8 py-3">
                <Gamepad2 className="w-5 h-5 mr-2" />
                Start Your Game Project
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-3 bg-transparent">
                <ExternalLink className="w-5 h-5 mr-2" />
                View Portfolio
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About RSquare Games */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-primary text-primary-foreground">About Our Partner</Badge>
              <h2 className="superfont text-4xl font-bold mb-6 text-glow-primary">
                Unity Game Development Specialists
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                RSquare Games is a premier Unity game development agency specializing in mobile games, VR/AR
                experiences, and multiplayer gaming solutions. With years of experience in the gaming industry, they
                bring technical excellence and creative vision to every project.
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
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary text-primary-foreground">Game Development Services</Badge>
            <h2 className="superfont text-4xl font-bold mb-6 text-glow-primary">What RSquare Games Offers</h2>
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
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary text-primary-foreground">Technology Stack</Badge>
            <h2 className="superfont text-4xl font-bold mb-6 text-glow-primary">Cutting-Edge Game Development Tools</h2>
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
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary text-primary-foreground">Partnership Benefits</Badge>
            <h2 className="superfont text-4xl font-bold mb-6 text-glow-primary">Why Choose Our Partnership</h2>
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
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent-blue/10"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent-green/20 rounded-full blur-3xl"></div>

        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <Rocket className="w-16 h-16 mx-auto mb-6 text-primary" />
          <h2 className="superfont text-4xl md:text-5xl font-bold mb-6 text-glow-primary">Ready to Build Your Game?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Partner with RSquare Games and CodeCraft Studios to bring your gaming vision to life with cutting-edge
            technology and expert development.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="btn-glow px-8 py-3" asChild>
              <Link href="/contact">
                <Gamepad2 className="w-5 h-5 mr-2" />
                Start Your Project
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-3 bg-transparent" asChild>
              <Link href="/services">
                <ExternalLink className="w-5 h-5 mr-2" />
                View All Services
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
