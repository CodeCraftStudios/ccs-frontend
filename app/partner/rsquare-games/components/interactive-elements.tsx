"use client"

import { Button } from "@/components/ui/button"
import { Gamepad2, ExternalLink } from "lucide-react"
import Link from "next/link"

export function HeroCTAButtons() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      
      <Link href="/contact">
        <Button size="lg" className="btn-glow px-8 py-3">
          <Gamepad2 className="w-5 h-5 mr-2" />
          Start Your Game Project
        </Button>
      </Link>
      <Link href="/portfolio">
        <Button variant="outline" size="lg" className="px-8 py-3 bg-transparent">
          <ExternalLink className="w-5 h-5 mr-2" />
          View Portfolio
        </Button>
      </Link>
    </div>
  )
}

export function CTAButtons() {
  return (
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
  )
}