import { Metadata } from 'next'
import { OGCheckerClient } from './components/OGCheckerClient'

export const metadata: Metadata = {
  title: 'Free Open Graph Checker - Preview Social Media Cards | CodeCraft Studios',
  description: 'Check how your website appears on Facebook, Twitter, LinkedIn, and Slack. Free Open Graph meta tag analyzer and social media preview tool.',
  keywords: 'open graph checker, og checker, social media preview, twitter card validator, facebook debugger, meta tags checker',
  openGraph: {
    title: 'Free Open Graph Checker - Test Your Social Media Cards',
    description: 'Preview how your website appears when shared on social media. Check Open Graph tags and Twitter Cards instantly.',
    url: 'https://codecraftstudios.net/tools/open-graph-checker',
    images: [
      {
        url: 'https://codecraftstudios.net/media/og-checker.png',
        width: 1200,
        height: 630,
        alt: 'Open Graph Checker Tool',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Open Graph Checker Tool',
    description: 'Check how your website appears on social media platforms with our free Open Graph checker.',
    images: ['https://codecraftstudios.net/media/og-checker.png'],
  },
}

export default function OpenGraphCheckerPage() {
  return <OGCheckerClient />
}