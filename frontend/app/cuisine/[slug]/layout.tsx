import type { Metadata } from 'next'
import {
  CUISINE_META,
  SITE_CONFIG,
  absoluteUrl,
  buildBreadcrumbSchema,
  buildFAQSchema,
} from '@/lib/seo'
import { JsonLd } from '@/components/JsonLd'
import {
  CUISINE_FAQS,
  CUISINE_KEYWORD_CLUSTERS,
} from '@/lib/seoContent'

export async function generateStaticParams() {
  return Object.keys(CUISINE_META).map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const cuisine = CUISINE_META[params.slug]

  if (!cuisine) {
    return {
      title: 'Cuisine Not Found',
      robots: { index: false, follow: false },
    }
  }

  const cluster = CUISINE_KEYWORD_CLUSTERS[params.slug] ?? []
  const topKeywords = cluster.slice(0, 8).map((k) => k.keyword)

  const title = `Order ${cuisine.label} Online — Best ${cuisine.label} Restaurants | DreamFood`
  const canonicalUrl = absoluteUrl(`/cuisine/${params.slug}`)

  return {
    title,
    description: cuisine.description,
    keywords: [
      ...topKeywords,
      `${cuisine.label} delivery`,
      `best ${cuisine.label} near me`,
      'DreamFood',
      'order food online',
    ],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description: cuisine.description,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      type: 'website',
      locale: SITE_CONFIG.locale,
      images: [
        {
          url: SITE_CONFIG.defaultOgImage,
          width: 1200,
          height: 630,
          alt: `Best ${cuisine.label} restaurants on DreamFood`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: cuisine.description,
      images: [SITE_CONFIG.defaultOgImage],
    },
  }
}

export default function CuisineLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { slug: string }
}) {
  const cuisine = CUISINE_META[params.slug]
  const faqs = CUISINE_FAQS[params.slug] ?? []

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Restaurants', url: '/home' },
    ...(cuisine ? [{ name: cuisine.label, url: `/cuisine/${params.slug}` }] : []),
  ]

  return (
    <>
      {cuisine && <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />}
      {faqs.length > 0 && <JsonLd data={buildFAQSchema(faqs)} />}
      {children}
    </>
  )
}
