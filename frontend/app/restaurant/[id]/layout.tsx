import type { Metadata } from 'next'
import {
  SITE_CONFIG,
  absoluteUrl,
  buildRestaurantSchema,
  buildBreadcrumbSchema,
  buildFAQSchema,
} from '@/lib/seo'
import { JsonLd } from '@/components/JsonLd'
import { buildRestaurantFAQs, expandRestaurantKeywords } from '@/lib/seoContent'

interface Restaurant {
  id: number
  name: string
  description: string
  cuisine_type: string
  rating: number
  review_count: number
  delivery_time: number
  address?: string
  logo_url?: string
}

async function fetchRestaurant(id: string): Promise<Restaurant | null> {
  try {
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'
    const res = await fetch(`${apiUrl}/restaurants/${id}`, {
      next: { revalidate: 3600 }, // revalidate every hour
    })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  const restaurant = await fetchRestaurant(params.id)

  if (!restaurant) {
    return {
      title: 'Restaurant Not Found',
      description: 'The requested restaurant could not be found on DreamFood.',
      robots: { index: false, follow: false },
    }
  }

  const title = `${restaurant.name} Menu & Online Ordering — DreamFood`
  const description = restaurant.description
    ? `${restaurant.description} Order from ${restaurant.name} on DreamFood. ${restaurant.cuisine_type} cuisine • ${restaurant.rating}★ rating • Delivery in ${restaurant.delivery_time} mins.`
    : `Order ${restaurant.cuisine_type} food from ${restaurant.name} on DreamFood. ${restaurant.rating}★ (${restaurant.review_count.toLocaleString()} reviews) • Delivery in ${restaurant.delivery_time} mins.`

  const canonicalUrl = absoluteUrl(`/restaurant/${restaurant.id}`)
  const ogImage = restaurant.logo_url || SITE_CONFIG.defaultOgImage

  return {
    title,
    description,
    keywords: expandRestaurantKeywords(restaurant.name, restaurant.cuisine_type),
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      type: 'website',
      locale: SITE_CONFIG.locale,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${restaurant.name} — ${restaurant.cuisine_type} restaurant on DreamFood`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default async function RestaurantLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { id: string }
}) {
  const restaurant = await fetchRestaurant(params.id)

  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Restaurants', url: '/home' },
    ...(restaurant
      ? [{ name: restaurant.name, url: `/restaurant/${restaurant.id}` }]
      : []),
  ]

  return (
    <>
      {restaurant && (
        <>
          <JsonLd data={buildRestaurantSchema(restaurant)} />
          <JsonLd data={buildBreadcrumbSchema(breadcrumbItems)} />
          <JsonLd
            data={buildFAQSchema(
              buildRestaurantFAQs(
                restaurant.name,
                restaurant.cuisine_type,
                restaurant.rating,
                restaurant.delivery_time
              )
            )}
          />
        </>
      )}
      {children}
    </>
  )
}
