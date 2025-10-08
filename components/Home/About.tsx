import React from 'react'
import { Button } from '../ui/button'
import { EXPERIENCE, PROJECTS } from '@/lib/consts'
import { Badge } from '../ui/badge'
import Link from 'next/link'

const AboutSection = () => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
            <h2 className="superfont text-3xl md:text-5xl font-bold mb-4">
                <span className="text-primary">ABOUT US</span>
            </h2>
            <p className="superfont text-2xl font-semibold mb-8">We Turn Your Dreams Into Reality.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                We are CodeCraft Studios LLC, proudly based in Miami, Florida. We're not your typical agency that sees clients as transactional subjects — we're a
                small, sharp team of experts who will <strong>stay with you and help you dominate in the digital world.</strong> We encourage partnership and long-term support, rather than just finish your website and let you out in the middle of the ocean. From Web, App, and Software Development
                to System Design, Marketing, SEO, and Market Research, we cover all the bases.
                </p>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Every developer on our team has over 7+ years of experience in their craft, and we keep things honest,
                fair, and transparent with our clients. We're not here to upsell you fluff — we're here to help your
                business grow with smart, scalable solutions that actually work.
                </p>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                At CodeCraft Studios, we don't cut corners. We take the time to understand your vision, your audience,
                and your goals — and then we build something that reflects exactly that. You're not just another ticket
                in a CRM system — you're a partner.
                </p>
                <Link href="/about">
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground hover:scale-105 transition-all duration-300">
                        Read More
                    </Button>
                </Link>
            </div>

            <div>
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 border border-primary/20 hover:border-primary/40 transition-colors backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="text-center group cursor-pointer hover:scale-105 transition-transform">
                    <div className="text-3xl font-bold text-primary mb-2 group-hover:text-primary/80 transition-colors">
                      {EXPERIENCE}+
                    </div>
                    <div className="text-sm text-muted-foreground">Years Experience</div>
                  </div>
                  <div className="text-center group cursor-pointer hover:scale-105 transition-transform">
                    <div className="text-3xl font-bold text-primary mb-2 group-hover:text-primary/80 transition-colors">
                      {PROJECTS}+
                    </div>
                    <div className="text-sm text-muted-foreground">Projects Done</div>
                  </div>
                  <div className="text-center group cursor-pointer hover:scale-105 transition-transform">
                    <div className="text-3xl font-bold text-primary mb-2 group-hover:text-primary/80 transition-colors">
                      24/7
                    </div>
                    <div className="text-sm text-muted-foreground">Support Available</div>
                  </div>
                  <div className="text-center group cursor-pointer hover:scale-105 transition-transform">
                    <div className="text-3xl font-bold text-primary mb-2 group-hover:text-primary/80 transition-colors">
                      Miami
                    </div>
                    <div className="text-sm text-muted-foreground">Based Team</div>
                  </div>
                </div>

                <div className="border-t border-primary/20 pt-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4 text-center">Why Choose Us</h3>
                  <div className="flex flex-wrap gap-3 justify-center">
                    <span className="px-4 py-2 bg-primary/20 text-primary border border-primary/30 rounded-full text-sm font-medium backdrop-blur-sm hover:bg-primary/30 transition-colors">
                      Competitive Pricing
                    </span>
                    <span className="px-4 py-2 bg-primary/20 text-primary border border-primary/30 rounded-full text-sm font-medium backdrop-blur-sm hover:bg-primary/30 transition-colors">
                      24/7 Support
                    </span>
                    <span className="px-4 py-2 bg-primary/20 text-primary border border-primary/30 rounded-full text-sm font-medium backdrop-blur-sm hover:bg-primary/30 transition-colors">
                      Modern Design
                    </span>
                    <span className="px-4 py-2 bg-primary/20 text-primary border border-primary/30 rounded-full text-sm font-medium backdrop-blur-sm hover:bg-primary/30 transition-colors">
                      Fast Prototyping
                    </span>
                    <span className="px-4 py-2 bg-primary/20 text-primary border border-primary/30 rounded-full text-sm font-medium backdrop-blur-sm hover:bg-primary/30 transition-colors">
                      Scalable Solutions
                    </span>
                    <span className="px-4 py-2 bg-primary/20 text-primary border border-primary/30 rounded-full text-sm font-medium backdrop-blur-sm hover:bg-primary/30 transition-colors">
                      Expert Team
                    </span>
                    <span className="px-4 py-2 bg-primary/20 text-primary border border-primary/30 rounded-full text-sm font-medium backdrop-blur-sm hover:bg-primary/30 transition-colors">
                      Agile Process
                    </span>
                    <span className="px-4 py-2 bg-primary/20 text-primary border border-primary/30 rounded-full text-sm font-medium backdrop-blur-sm hover:bg-primary/30 transition-colors">
                      Quality Assurance
                    </span>
                  </div>
                </div>

                <div className="border-t border-primary/20 pt-6 mt-6">
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg border border-primary/20">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                      <span className="text-sm text-primary font-medium">Miami-Based Digital Experts</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                      Trusted by startups and enterprises alike, we deliver cutting-edge solutions that drive real
                      business results.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            </div>
            </div>
        </section>

  )
}

export default AboutSection
