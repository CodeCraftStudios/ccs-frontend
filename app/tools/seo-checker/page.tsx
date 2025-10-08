import { Metadata } from 'next'
import { SEOCheckerClient } from './components/SEOCheckerClient'

export const metadata: Metadata = {
  title: 'Free SEO Blog Content Checker - Analyze Your Content | CodeCraft Studios',
  description: 'Free SEO blog checker tool. Analyze your blog content for readability, keyword optimization, heading structure, and get actionable SEO recommendations to improve rankings.',
  generator: 'v0.app',
  keywords: 'SEO content checker, blog analyzer, content SEO tool, readability checker, keyword density, content optimization, blog SEO',
  openGraph: {
    title: 'Free SEO Blog Content Checker - Optimize Your Writing',
    description: 'Analyze your blog content for SEO. Check readability, keyword density, heading structure, and get recommendations to rank better.',
    url: 'https://codecraftstudios.net/tools/seo-checker',
    images: [
      {
        url: 'https://codecraftstudios.net/media/og-seo-checker.png',
        width: 1200,
        height: 630,
        alt: 'SEO Blog Content Checker Tool',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free SEO Blog Content Checker',
    description: 'Analyze your blog content for SEO optimization and readability.',
    images: ['https://codecraftstudios.net/media/og-seo-checker.png'],
  },
}

export default function SEOCheckerPage() {
  return <SEOCheckerClient />
}