import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import GoogleOAuthProvider from '@/components/GoogleOAuthProvider'
import { JsonLd } from '@/components/JsonLd'
import { buildOrganizationSchema, buildWebsiteSchema, SITE_CONFIG } from '@/lib/seo'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const viewport: Viewport = {
  themeColor: SITE_CONFIG.themeColor,
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} — Order Food Online, Restaurant Discovery`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    'food delivery app',
    'order food online',
    'restaurant discovery',
    'online food ordering India',
    'DreamFood',
    'food delivery simulation',
  ],
  authors: [{ name: 'DreamFood Team' }],
  creator: 'DreamFood',
  publisher: 'DreamFood',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: SITE_CONFIG.locale,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} — Order Food Online, Restaurant Discovery`,
    description: SITE_CONFIG.description,
    images: [
      {
        url: SITE_CONFIG.defaultOgImage,
        width: 1200,
        height: 630,
        alt: 'DreamFood — Order Your Dream Meal Online',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: SITE_CONFIG.twitterHandle,
    creator: SITE_CONFIG.twitterHandle,
    title: `${SITE_CONFIG.name} — Order Food Online`,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.defaultOgImage],
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  alternates: {
    canonical: SITE_CONFIG.url,
    languages: {
      'en': SITE_CONFIG.url,
      'hi': `${SITE_CONFIG.url}/hi`,
      'x-default': SITE_CONFIG.url,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preconnect to API server to reduce TTFB for data fetches */}
        <link
          rel="preconnect"
          href={process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') ?? 'http://localhost:8000'}
        />
        {/* Geo meta tags for Indian local SEO */}
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content="India" />
        <meta name="language" content="English" />
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="7 days" />
      </head>
      <body className={`${inter.className} bg-white dark:bg-slate-950 text-slate-900 dark:text-white`}>
        <JsonLd data={buildOrganizationSchema()} />
        <JsonLd data={buildWebsiteSchema()} />
        <GoogleOAuthProvider>
          {children}
        </GoogleOAuthProvider>
      </body>
    </html>
  )
}
