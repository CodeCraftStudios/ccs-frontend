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

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
})

export const metadata: Metadata = {
  title: "CodeCraft Studios - IT & Marketing Solutions",
  description: "Professional IT and marketing agency delivering innovative digital solutions for growing businesses.",
  generator: "v0.app",
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
