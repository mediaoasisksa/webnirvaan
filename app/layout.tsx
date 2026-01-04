import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'WebNirvaan - Next.js Development Company | Web & App Development Services',
  description: 'Professional Next.js development company specializing in web app development. We build high-performing websites and apps that drive 20% average revenue growth for small and mid-size businesses. Custom web development, mobile apps, UI/UX design, and e-commerce solutions.',
  keywords: 'Next.js development company, web app development, web development services, mobile app development, UI/UX design, e-commerce development, custom web development India, React development, Node.js development',
  openGraph: {
    title: 'WebNirvaan - Next.js Development Company',
    description: 'We build high-performing websites and apps that drive growth for small and mid-size businesses.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
