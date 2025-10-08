import { ClientsMarquee } from '@/components/Home/ClientsMarquee'
import AboutSection from '@/components/Home/About'
import Hero from '@/components/Home/Hero'
import { StackMarquee } from '@/components/Home/StackMarquee'
import React from 'react'
import ServicesWrapper from '@/components/Home/ServicesWrapper'
import Solutions from '@/components/Home/Solutions'
import Roadmap from '@/components/Home/Roadmap'
import CTASection from '@/components/Home/CTAOne'
import Portfolio from '@/components/Home/Portfolio'
import Reviews from '@/components/Home/Reviews'

const page = () => {
  return (
    <>
      <Hero/>
      <StackMarquee/>
      <AboutSection/>
      <ClientsMarquee/>
      <ServicesWrapper/>
      <Solutions/>
      <CTASection/>
      <Roadmap/>
      <Portfolio/>
      <Reviews/>
    </>
  )
}

export default page
