import React from 'react'
import { Button } from '../ui/button'
import { Calendar, MessageCircle, ArrowRight, UserPlus } from 'lucide-react'
import Link from 'next/link'

const CTASection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 via-background to-primary/5 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-primary/40 rounded-full blur-lg animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-primary/35 rounded-full blur-md animate-pulse delay-500"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="mb-8">
          <h2 className="superfont text-3xl md:text-5xl font-bold mb-6 text-glow-primary">
            <span className="text-primary">WE ARE THE ONES</span>
            <br />
            <span className="text-foreground">FOR YOUR BUSINESS</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Ready to transform your digital presence? Let's discuss your project and bring your vision to life with
            our expert team.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 hover:bg-card/70 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/10">
            <Link href="/contact">
                <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground group transition-all duration-300 btn-glow magnetic-hover px-8 py-4 text-lg font-semibold"
                >
                <Calendar className="mr-3 w-6 h-6 group-hover:rotate-12 transition-transform" />
                Contact Us
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Button>
            </Link>
            <p className="text-sm text-muted-foreground mt-3">Free consultation • No commitment</p>
          </div>

          {/* <div className="text-2xl font-bold text-muted-foreground">OR</div>

          <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 hover:bg-card/70 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/10">
            <Link href="/auth/register">            
                <Button
                size="lg"
                variant="outline"
                className="border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 magnetic-hover px-8 py-4 text-lg font-semibold bg-transparent"
                >
                <UserPlus className="mr-3 w-6 h-6" />
                Register
                </Button>
            </Link>
            <p className="text-sm text-muted-foreground mt-3">Submit Offers • Control Your Projects</p>
          </div> */}
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="group cursor-pointer hover:scale-105 transition-transform">
            <div className="text-3xl font-bold text-primary mb-2 group-hover:text-primary/80 transition-colors">
              7+
            </div>
            <div className="text-sm text-muted-foreground">Years Experience</div>
          </div>
          <div className="group cursor-pointer hover:scale-105 transition-transform">
            <div className="text-3xl font-bold text-primary mb-2 group-hover:text-primary/80 transition-colors">
              24/7
            </div>
            <div className="text-sm text-muted-foreground">Support Available</div>
          </div>
          <div className="group cursor-pointer hover:scale-105 transition-transform">
            <div className="text-3xl font-bold text-primary mb-2 group-hover:text-primary/80 transition-colors">
              100%
            </div>
            <div className="text-sm text-muted-foreground">Satisfaction Guaranteed</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTASection