'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { HeaderClient } from '@/components/HeaderClient'
import { RestaurantCard } from '@/components/RestaurantCard'
import { ArrowLeft } from 'lucide-react'
import { restaurantAPI } from '@/lib/api'
import { CUISINE_META } from '@/lib/seo'
import { CUISINE_PAGE_CONTENT, CUISINE_FAQS, CUISINE_KEYWORD_CLUSTERS } from '@/lib/seoContent'
import { useUIStore } from '@/store/uiStore'
import Link from 'next/link'

interface Restaurant {
  id: number
  name: string
  description: string
  cuisine_type: string
  rating: number
  review_count: number
  delivery_time: number
  logo_url: string
}

export default function CuisinePage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  const uiMode = useUIStore((state) => state.uiMode)

  // Normalise slug to CATEGORIES label (e.g. "south-indian" → "South Indian")
  const cuisineMeta = CUISINE_META[slug]
  const cuisineLabel = cuisineMeta?.label ?? slug.replace(/-/g, ' ')

  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchByCategory = async () => {
      try {
        setLoading(true)
        const res = await restaurantAPI.getRestaurants(0, 100, cuisineLabel)
        setRestaurants(res.data)
      } catch (error) {
        console.error('Failed to fetch cuisine restaurants:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchByCategory()
  }, [cuisineLabel])

  if (!cuisineMeta) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4 text-slate-700 dark:text-slate-300">
            Cuisine not found
          </h1>
          <Link href="/home" className="text-primary underline">
            Browse all restaurants
          </Link>
        </main>
      </div>
    )
  }

  const cuisineContent = CUISINE_PAGE_CONTENT[slug]
  const cuisineFAQs = CUISINE_FAQS[slug] ?? []
  const cuisineKeywords = CUISINE_KEYWORD_CLUSTERS[slug] ?? []

  const gradientStyle = {
    background:
      uiMode === 'zomato'
        ? 'linear-gradient(135deg, #E23744 0%, #D63447 100%)'
        : 'linear-gradient(135deg, #FC8019 0%, #FD9139 100%)',
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900">
      <Header />

      {/* Hero Banner */}
      <section
        className="text-white py-12"
        style={gradientStyle}
        aria-label={`${cuisineMeta.label} cuisine hero`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-4 text-sm opacity-80">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/home" className="hover:underline">
                  Restaurants
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">{cuisineMeta.label}</li>
            </ol>
          </nav>

          <div className="flex items-center gap-4 mb-3">
            <span className="text-5xl" role="img" aria-label={cuisineMeta.label}>
              {cuisineMeta.emoji}
            </span>
            <h1 className="text-4xl font-bold">
              {cuisineContent?.heroTitle ?? `Best ${cuisineMeta.label} Restaurants Near You`}
            </h1>
          </div>
          <p className="text-lg opacity-90 max-w-2xl">
            {cuisineContent?.intro ?? cuisineMeta.description}
          </p>

          {/* Popular Dishes chips */}
          {cuisineContent?.popularDishes && (
            <div className="mt-6 flex flex-wrap gap-2" aria-label={`Popular ${cuisineMeta.label} dishes`}>
              {cuisineContent.popularDishes.map((dish) => (
                <span
                  key={dish}
                  className="px-3 py-1 text-sm rounded-full bg-white/20 border border-white/30 backdrop-blur-sm"
                >
                  {dish}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Restaurant Grid */}
      <main
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        id="main-content"
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            {loading ? 'Loading…' : `${restaurants.length} ${cuisineMeta.label} Restaurants`}
          </h2>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-primary transition"
            aria-label="Go back to all restaurants"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            All cuisines
          </button>
        </div>

        {loading ? (
          <div
            className="flex items-center justify-center h-64"
            aria-live="polite"
            aria-label="Loading restaurants"
          >
            <div
              className="w-12 h-12 border-4 border-slate-200 border-t-primary rounded-full animate-spin"
              role="status"
            />
          </div>
        ) : restaurants.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-slate-500 dark:text-slate-400 mb-2">
              No {cuisineMeta.label} restaurants available right now.
            </p>
            <Link href="/home" className="text-primary underline text-sm">
              Explore all cuisines
            </Link>
          </div>
        ) : (
          <ul
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 list-none p-0"
            aria-label={`${cuisineMeta.label} restaurants list`}
          >
            {restaurants.map((r) => (
              <li key={r.id}>
                <RestaurantCard
                  id={r.id}
                  name={r.name}
                  rating={r.rating}
                  review_count={r.review_count}
                  delivery_time={r.delivery_time}
                  cuisine_type={r.cuisine_type}
                  logo_url={r.logo_url}
                  onClick={() => router.push(`/restaurant/${r.id}`)}
                />
              </li>
            ))}
          </ul>
        )}
      </main>

      {/* Why Order Section */}
      {cuisineContent?.whyOrder && (
        <section className="bg-white dark:bg-slate-900 py-10 border-t border-slate-100 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">
              Why Order {cuisineMeta.label} on DreamFood?
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
              {cuisineContent.whyOrder}
            </p>
          </div>
        </section>
      )}

      {/* FAQ Section — improves SEO with Q&A structured content */}
      {cuisineFAQs.length > 0 && (
        <section
          className="bg-slate-50 dark:bg-slate-950 py-12 border-t border-slate-100 dark:border-slate-800"
          aria-labelledby="faq-heading"
        >
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              id="faq-heading"
              className="text-2xl font-bold mb-8 text-slate-900 dark:text-white"
            >
              Frequently Asked Questions — {cuisineMeta.label}
            </h2>
            <dl className="space-y-6">
              {cuisineFAQs.map((faq, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-slate-900 rounded-xl p-5 shadow-sm border border-slate-100 dark:border-slate-800"
                >
                  <dt className="font-semibold text-slate-900 dark:text-white mb-2">
                    {faq.question}
                  </dt>
                  <dd className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    {faq.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {/* Internal Linking — Other Cuisines */}
      <aside
        className="bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 py-10"
        aria-label="Explore other cuisines"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold mb-6 text-slate-800 dark:text-slate-200">
            Explore Other Cuisines
          </h2>
          <nav aria-label="Cuisine categories navigation">
            <ul className="flex flex-wrap gap-3 list-none p-0">
              {Object.entries(CUISINE_META)
                .filter(([s]) => s !== slug)
                .map(([s, meta]) => (
                  <li key={s}>
                    <Link
                      href={`/cuisine/${s}`}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-sm font-medium transition"
                    >
                      <span aria-hidden="true">{meta.emoji}</span>
                      {meta.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>
        </div>
      </aside>
    </div>
  )
}
