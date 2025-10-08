import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Open Graph Checker - Preview Social Media Cards | CodeCraft Studios',
  description: 'Free Open Graph checker tool. Preview how your website appears on Facebook, Twitter, LinkedIn, and Slack. Test Open Graph tags and Twitter Cards instantly.',
  keywords: 'open graph checker, og checker, twitter card validator, social media preview, open graph tags, meta tags checker, facebook preview, twitter preview',
  openGraph: {
    title: 'Free Open Graph Checker - Test Social Media Preview',
    description: 'Preview how your website appears when shared on Facebook, Twitter, LinkedIn, and Slack. Free Open Graph and Twitter Card validator.',
    type: 'website',
    url: 'https://codecraftstudios.net/tools/open-graph-checker',
    images: [
      {
        url: 'https://codecraftstudios.net/media/og-checker.png',
        width: 1200,
        height: 630,
        alt: 'Open Graph Checker Tool'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Open Graph Checker - Preview Social Media Cards',
    description: 'Test how your website appears on Facebook, Twitter, LinkedIn, and Slack.',
    images: ['https://codecraftstudios.net/media/og-checker.png']
  }
}

export default function OpenGraphCheckerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}