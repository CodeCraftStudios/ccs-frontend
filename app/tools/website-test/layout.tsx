import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Website SEO Analyzer & Performance Checker | CodeCraft Studios',
  description: 'Comprehensive free website analyzer tool. Test your website\'s SEO, performance, content quality, and technical factors. Get instant analysis with actionable insights to improve your rankings.',
  keywords: 'website analyzer, SEO checker, website test, SEO audit, performance test, website analysis, free SEO tool, content analyzer, technical SEO',
  openGraph: {
    title: 'Free Website SEO Analyzer & Performance Checker',
    description: 'Test your website\'s SEO, performance, and content quality with our comprehensive free analyzer tool.',
    type: 'website',
    url: 'https://codecraftstudios.net/tools/website-test',
    images: [
      {
        url: 'https://codecraftstudios.net/media/og-website-test.png',
        width: 1200,
        height: 630,
        alt: 'Website SEO Analyzer Tool'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Website SEO Analyzer & Performance Checker',
    description: 'Test your website\'s SEO, performance, and content quality instantly.',
    images: ['https://codecraftstudios.net/media/og-website-test.png']
  }
}

export default function WebsiteTestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}