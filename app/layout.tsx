import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { DM_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import NavbarSSR from "@/components/navbar-ssr"
import FooterSSR from "@/components/footer-ssr"
import "./globals.css"
import CSRFInitializer from "@/components/utils/CSRFInitializer"
import { ThemeProvider } from "@/components/theme-provider"
import { NAME, FRONTEND, KEYWORDS } from "@/lib/consts"

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
})

export const metadata: Metadata = {
  title: {
    default: "CodeCraft Studios - IT & Marketing Solutions | Miami, FL",
    template: "%s | CodeCraft Studios",
  },
  description: "Professional IT and marketing agency delivering innovative digital solutions for growing businesses. Web development, mobile apps, digital marketing, and more in Miami, Florida.",
  keywords: KEYWORDS,
  authors: [{ name: NAME, url: FRONTEND }],
  creator: NAME,
  publisher: NAME,
  generator: NAME,
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
    title: "CodeCraft Studios - IT & Marketing Solutions",
    description: "Professional IT and marketing agency delivering innovative digital solutions for growing businesses.",
    url: FRONTEND,
    siteName: NAME,
    images: [
      {
        url: `${FRONTEND}/banner.webp`,
        width: 1920,
        height: 1080,
        alt: "CodeCraft Studios - IT & Marketing Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeCraft Studios - IT & Marketing Solutions",
    description: "Professional IT and marketing agency delivering innovative digital solutions for growing businesses.",
    images: [`${FRONTEND}/banner.webp`],
    creator: "@codecraft_studios",
  },
  alternates: {
    canonical: FRONTEND,
  },
  category: "Technology",
  metadataBase: new URL(FRONTEND),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${dmSans.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NavbarSSR />
          <CSRFInitializer/>
          <Suspense fallback={null}>
            <main>{children}</main>
          </Suspense>

          <FooterSSR />

          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
