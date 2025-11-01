'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardContent, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { ArrowRight, CheckCircle, ChevronDown } from 'lucide-react'
import { SERVER_ENDPOINT } from '@/lib/consts'
import Link from 'next/link'

interface ServiceFeature {
  id: number
  name: string
  feature?: string
}

interface StackItem {
  id: number
  name: string
  slug: string
  logo: string
}

interface Service {
  id: number
  name: string
  icon: string
  features: ServiceFeature[]
  stack: StackItem[]
  slug: string
  short_description: string
  overview: string
}

interface ServicesProps {
  services: Service[]
}

const Services = ({ services }: ServicesProps) => {
  const [selectedService, setSelectedService] = useState(0)
  const [expandedMobile, setExpandedMobile] = useState<number | null>(null)
  
  return (
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
        <div className="text-center mb-16">
          <h2 className="superfont text-3xl md:text-5xl font-bold mb-4 text-glow-primary">
            <span className="text-primary">SERVICES</span>
          </h2>
          <p className="text-xl text-muted-foreground">What We Provide</p>
        </div>

        {/* Mobile Accordion */}
        <div className="md:hidden space-y-4 mb-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="relative rounded-2xl bg-background/80 backdrop-blur-sm border-2 border-primary/30 overflow-hidden"
            >
              {/* Header - Clickable */}
              <div
                className="p-6 cursor-pointer"
                onClick={() => setExpandedMobile(expandedMobile === index ? null : index)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative w-12 aspect-square rounded-xl  flex items-center justify-center">
                      <img
                        src={`${SERVER_ENDPOINT}${service.icon}`}
                        alt={service.name}
                        className="w-max aspect-square object-contain"
                        style={{
                          filter: 'brightness(0) saturate(100%) invert(39%) sepia(93%) saturate(2306%) hue-rotate(251deg) brightness(98%) contrast(91%)'
                        }}
                      />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-foreground">{service.name}</h4>
                      <p className="text-muted-foreground text-sm mt-1">{service.short_description}</p>
                    </div>
                  </div>
                  <div className="text-primary">
                    <ChevronDown
                      className={`w-6 h-6 transition-transform duration-300 ${
                        expandedMobile === index ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Expandable Content */}
              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  expandedMobile === index ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6 border-t border-primary/20">
                  <div className="mt-6 space-y-6">
                    {/* Overview */}
                    <div>
                      <h4 className="font-semibold mb-2 text-glow-blue">Overview</h4>
                      <p className="text-muted-foreground leading-relaxed">{service.overview}</p>
                    </div>

                    {/* Key Features */}
                    {service.features.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-3 text-glow-green">Key Features</h4>
                        <ul className="space-y-2">
                          {service.features.map((feature) => (
                            <li
                              key={feature.id}
                              className="flex items-center space-x-3"
                            >
                              <CheckCircle className="w-4 h-4 text-accent-green flex-shrink-0" />
                              <span className="text-sm">{feature.feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Technologies */}
                    {service.stack.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-3">Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                          {service.stack.map((tech) => (
                            <Badge
                              key={tech.id}
                              variant="secondary"
                              className="bg-primary/30 text-primary-foreground border-primary/50 flex items-center gap-2"
                            >
                              <img
                                src={`${SERVER_ENDPOINT}${tech.logo}`}
                                alt={tech.name}
                                className="w-4 h-4 object-contain"
                              />
                              {tech.name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* CTA Button */}
                    <Link href={`/service/${service.slug}`}>
                      <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground group btn-glow magnetic-hover">
                        Get Started with {service.name}
                        <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-4 hidden md:block">
            {services.map((service, index) => (
              <div
                key={service.id}
                onClick={() => setSelectedService(index)}
                className={`cursor-pointer p-6 rounded-lg border-2 transition-all duration-300 ${
                  selectedService === index
                    ? "border-primary bg-primary/5 shadow-lg shadow-primary/20 card-glow-purple"
                    : "border-muted hover:border-primary/50 bg-background hover:bg-primary/5 card-glow-purple"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
                      selectedService === index ? "bg-primary/20" : "bg-primary/10"
                    }`}
                  >
                    <img 
                      src={`${SERVER_ENDPOINT}${service.icon}`} 
                      alt={service.name}
                      className="w-8 h-8 object-contain"
                      style={{
                        filter: selectedService === index 
                          ? 'brightness(0) saturate(100%) invert(39%) sepia(93%) saturate(2306%) hue-rotate(251deg) brightness(98%) contrast(91%)'
                          : 'brightness(0) saturate(100%) invert(50%) sepia(14%) saturate(1846%) hue-rotate(230deg) brightness(95%) contrast(86%)'
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`text-lg font-semibold transition-colors ${
                        selectedService === index ? "text-primary text-glow-primary" : "text-foreground"
                      }`}
                    >
                      {service.name}
                    </h3>
                    <p className="text-sm text-foreground">{service.short_description}</p>
                  </div>
                  <div>
                    <ArrowRight
                      className={`w-5 h-5 transition-colors ${
                        selectedService === index ? "text-primary" : "text-muted-foreground"
                      }`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {services.length > 0 && (
            <div
              key={selectedService}
              className="lg:sticky lg:top-8 hidden md:block"
            >
              <Card className="h-fit border-2 border-primary/30 shadow-lg shadow-primary/20 card-glow-purple">
                <CardHeader>
                  <div className="flex items-center space-x-4 mb-4">
                    <div
                      className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center"
                    >
                      <img 
                        src={`${SERVER_ENDPOINT}${services[selectedService].icon}`} 
                        alt={services[selectedService].name}
                        className="w-12 h-12 object-contain"
                        style={{
                          filter: 'brightness(0) saturate(100%) invert(39%) sepia(93%) saturate(2306%) hue-rotate(251deg) brightness(98%) contrast(91%)'
                        }}
                      />
                    </div>
                    <div>
                      <CardTitle className="text-2xl text-primary text-glow-primary">
                        {services[selectedService].name}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-2 text-glow-blue">Overview</h4>
                    <p className="text-muted-foreground">{services[selectedService].overview}</p>
                  </div>

                  {services[selectedService].features.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3 text-glow-green">Key Features</h4>
                      <ul className="space-y-2">
                        {services[selectedService].features.map((feature) => (
                          <li
                            key={feature.id}
                            className="flex items-center space-x-3"
                          >
                            <CheckCircle className="w-4 h-4 text-accent-green flex-shrink-0" />
                            <span className="text-sm">{feature.feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {services[selectedService].stack.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {services[selectedService].stack.map((tech) => (
                          <div key={tech.id} className="group">
                            <Badge
                              variant="secondary"
                              className="bg-primary/30 text-primary-foreground border-primary/50 hover:bg-primary/40 transition-colors flex items-center gap-2"
                            >
                              <img 
                                src={`${SERVER_ENDPOINT}${tech.logo}`} 
                                alt={tech.name}
                                className="w-4 h-4 object-contain"
                              />
                              {tech.name}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <Link href={`/service/${services[selectedService].slug}`}>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground group btn-glow magnetic-hover">
                      Get Started with {services[selectedService].name}
                      <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Services