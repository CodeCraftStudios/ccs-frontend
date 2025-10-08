import React from 'react'
import { Badge } from '../ui/badge'
import { ArrowRight, Rocket, Sparkles } from 'lucide-react'
import { Button } from '../ui/button'
import Link from 'next/link'

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 hero-grid" />

        <div className="absolute inset-0" >
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl hero-float-purple pulse-bg" />
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-accent-blue rounded-full blur-3xl hero-float-blue pulse-bg" />
          <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-accent-green rounded-full blur-2xl hero-float-green pulse-bg" />
          <div className="absolute top-40 right-1/4 w-20 h-20 bg-accent-orange rounded-full blur-2xl hero-float-purple pulse-bg" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <div >
              <Badge
                variant="secondary"
                className="mb-6 bg-primary text-primary-foreground border-primary/30 hover:bg-primary/90 transition-all duration-300 btn-glow shadow-sm"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Miami-Based Digital Experts
              </Badge>
            </div>

            <h1
              className="superfont text-4xl md:text-6xl lg:text-7xl font-bold text-balance mb-6 text-glow-primary"
              
            >
              We Turn Your Dreams Into
              <span className="text-primary block">Digital Reality</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 text-pretty" >
              CodeCraft Studios LLC - A small, sharp team of Miami-based experts who dominate in web development, app
              creation, marketing, and SEO. We don't cut corners, we craft solutions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center" >
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground group transition-all duration-300 btn-glow magnetic-hover"
                >
                  <Rocket className="mr-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
                  Start Your Project
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button
                  size="lg"
                  variant="outline"
                  className="hover:bg-primary hover:text-primary-foreground transition-all duration-300 magnetic-hover border-primary/30 hover:border-primary bg-transparent"
                >
                  View Our Work
                </Button>
              </Link>
            </div>
          </div>
        </div>
    </section>
  )
}

export default Hero
