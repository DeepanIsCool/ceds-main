import type { Metadata } from 'next'
import { Instrument_Serif, Plus_Jakarta_Sans } from 'next/font/google'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import './globals.css'

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-instrument-serif',
  weight: '400',
  style: ['normal', 'italic'],
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plus-jakarta',
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'IEMCEDS — Centre for Excellence in Data Science',
  description:
    'Institute of Engineering & Management Centre for Excellence in Data Science — advancing research and innovation in data science, machine learning, and AI.',
  keywords: ['data science', 'machine learning', 'AI', 'research', 'IEM', 'CEDS'],
  icons: {
    icon: '/ceds-logo.avif',
    shortcut: '/ceds-logo.avif',
    apple: '/ceds-logo.avif',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${plusJakarta.variable}`}>
      <body className="antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
