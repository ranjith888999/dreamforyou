import type { Metadata } from 'next'
import { SITE_CONFIG, HOMEPAGE_KEYWORDS, absoluteUrl, buildFAQSchema } from '@/lib/seo'
import { JsonLd } from '@/components/JsonLd'
import { HOMEPAGE_FAQS } from '@/lib/seoContent'

export const metadata: Metadata = {
  title: 'Order Food Online — Browse Top Restaurants & Cuisines',
  description:
    'Discover hundreds of restaurants on DreamFood. Browse Biryani, Pizza, Burger, Chinese, South Indian and more. Order your dream meal online — free simulation, no payment needed.',
  keywords: HOMEPAGE_KEYWORDS,
  alternates: {
    canonical: absoluteUrl('/home'),
  },
  openGraph: {
    title: 'DreamFood — Browse Restaurants & Order Food Online',
    description:
      "Explore top restaurants, browse menus, and experience the joy of food ordering on DreamFood — India's most fun food discovery platform.",
    url: absoluteUrl('/home'),
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: SITE_CONFIG.defaultOgImage,
        width: 1200,
        height: 630,
        alt: 'DreamFood restaurant discovery — browse and order food online',
      },
    ],
    type: 'website',
    locale: SITE_CONFIG.locale,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DreamFood — Order Food Online',
    description:
      'Browse top restaurants and cuisines on DreamFood. Free food ordering simulation.',
    images: [SITE_CONFIG.defaultOgImage],
  },
}

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <JsonLd data={buildFAQSchema(HOMEPAGE_FAQS)} />
      {children}
    </>
  )
}
