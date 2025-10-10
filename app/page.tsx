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
import type { Metadata } from "next"
import { NAME, FRONTEND, KEYWORDS, EXPERIENCE, PROJECTS } from "@/lib/consts"

export const metadata: Metadata = {
  title: "CodeCraft Studios - Premier IT & Digital Marketing Agency in Miami, FL",
  description: `Transform your business with CodeCraft Studios - Miami's leading IT and digital marketing agency. ${EXPERIENCE}+ years experience, ${PROJECTS}+ successful projects. Expert web development, mobile apps, SEO, and digital marketing solutions.`,
  keywords: KEYWORDS,
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
    title: "CodeCraft Studios - Premier IT & Digital Marketing Agency in Miami",
    description: `Expert web development, mobile apps, SEO, and digital marketing solutions. ${EXPERIENCE}+ years experience serving businesses across Florida.`,
    url: FRONTEND,
    siteName: NAME,
    images: [
      {
        url: `${FRONTEND}/banner.png`,
        width: 1920,
        height: 1080,
        alt: "CodeCraft Studios - IT & Digital Marketing Solutions in Miami, Florida",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeCraft Studios - Premier IT & Digital Marketing Agency",
    description: `${EXPERIENCE}+ years of excellence in web development, mobile apps, and digital marketing. Miami-based, Florida-serving.`,
    images: [`${FRONTEND}/banner.png`],
    creator: "@codecraft_studios",
  },
  alternates: {
    canonical: FRONTEND,
  },
  category: "Technology",
}

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
