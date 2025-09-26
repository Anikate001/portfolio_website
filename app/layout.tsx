import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import SmoothScroller from "@/components/smooth-scroller"
import ParticleSphere from "@/components/particle-sphere"
import { Suspense } from "react"
import ScrollProgress from "@/components/scroll-progress"

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
      {/* Use class strategy for dark theme so tokens in globals.css apply */}
      <body className="font-sans dark bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Suspense fallback={null}>
            <SmoothScroller />
            <ParticleSphere
              density={1200}
              radius={220}
              className="fixed inset-0 w-full h-full -z-10 pointer-events-none rounded-none"
            />
            <ScrollProgress />
            {children}
            <Toaster />
            <Analytics />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}
