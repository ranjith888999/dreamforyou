import { MetadataRoute } from 'next'
import { SITE_CONFIG, CUISINE_META } from '@/lib/seo'
import { ALL_BLOG_POSTS } from '@/lib/seoContent'

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

interface Restaurant {
  id: number
  updated_at?: string
}

async function fetchRestaurantIds(): Promise<Restaurant[]> {
  try {
    const res = await fetch(`${apiUrl}/restaurants/?skip=0&limit=500`, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.url
  const now = new Date()

  // Static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/home`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/leaderboard`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.7,
    },
  ]

  // Cuisine pages
  const cuisineRoutes: MetadataRoute.Sitemap = Object.keys(CUISINE_META).map(
    (slug) => ({
      url: `${baseUrl}/cuisine/${slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })
  )

  // Dynamic restaurant pages
  let restaurantRoutes: MetadataRoute.Sitemap = []
  try {
    const restaurants = await fetchRestaurantIds()
    restaurantRoutes = restaurants.map((r) => ({
      url: `${baseUrl}/restaurant/${r.id}`,
      lastModified: r.updated_at ? new Date(r.updated_at) : now,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    }))
  } catch {
    // gracefully fail — don't break the build
  }

  // Blog posts (future — registered now for pre-indexing signal)
  const blogRoutes: MetadataRoute.Sitemap = ALL_BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...cuisineRoutes, ...restaurantRoutes, ...blogRoutes]
}
