'use client'

import React, { useState, useEffect } from 'react'
import { HeaderClient } from '@/components/HeaderClient'
import { RestaurantCard } from '@/components/RestaurantCard'
import { Search, Filter } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { restaurantAPI } from '@/lib/api'
import { CATEGORIES } from '@/lib/constants'
import { useUIStore } from '@/store/uiStore'

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

import { CUISINE_META } from '@/lib/seo'
import { HOMEPAGE_FAQS, HOMEPAGE_CONTENT } from '@/lib/seoContent'
import Link from 'next/link'

export default function HomePage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const router = useRouter()
  const uiMode = useUIStore((state) => state.uiMode)

  useEffect(() => {
    fetchRestaurants()
  }, [])

  useEffect(() => {
    filterRestaurants()
  }, [searchQuery, selectedCategory, restaurants])

  const fetchRestaurants = async () => {
    try {
      setLoading(true)
      const response = await restaurantAPI.getRestaurants(0, 100)
      setRestaurants(response.data)
    } catch (error) {
      console.error('Failed to fetch restaurants:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterRestaurants = () => {
    let filtered = restaurants

    if (searchQuery) {
      filtered = filtered.filter((r) =>
        r.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedCategory) {
      filtered = filtered.filter((r) =>
        r.cuisine_type.toLowerCase() === selectedCategory.toLowerCase()
      )
    }

    setFilteredRestaurants(filtered)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900">
      {/* Skip to main content for keyboard/screen reader users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-primary focus:rounded-lg focus:shadow-lg"
      >
        Skip to main content
      </a>

      <HeaderClient />

      {/* Hero Section */}
      <section
        className="text-white py-12 transition-all duration-300"
        aria-label="Search restaurants"
        style={{
          background:
            uiMode === 'zomato'
              ? 'linear-gradient(135deg, #E23744 0%, #D63447 100%)'
              : 'linear-gradient(135deg, #FC8019 0%, #FD9139 100%)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Order Your Dream Meal</h1>
          <p className="text-lg opacity-90 mb-6">
            Browse restaurants, add to cart, and experience the excitement without spending a dime
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <label htmlFor="restaurant-search" className="sr-only">
              Search restaurants by name or cuisine
            </label>
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-70" aria-hidden="true" />
            <input
              id="restaurant-search"
              type="search"
              placeholder="Search restaurants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Search restaurants by name or cuisine"
            />
          </div>
        </div>
      </section>

      {/* Cuisine Category Filters */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav aria-label="Filter restaurants by cuisine">
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              <div className="flex items-center gap-2 mr-4">
                <Filter className="w-5 h-5 text-slate-600 dark:text-slate-400" aria-hidden="true" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300" id="filter-label">
                  Cuisines:
                </span>
              </div>
              <button
                onClick={() => setSelectedCategory(null)}
                aria-pressed={selectedCategory === null}
                aria-label="Show all cuisines"
                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition ${
                  selectedCategory === null
                    ? uiMode === 'zomato'
                      ? 'bg-gradient-to-r from-[#E23744] to-[#D63447] text-white'
                      : 'bg-gradient-to-r from-[#FC8019] to-[#FD9139] text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                All
              </button>
              {CATEGORIES.map((category) => {
                // Find the cuisine slug for internal linking
                const cuisineSlug = Object.entries(CUISINE_META).find(
                  ([, m]) => m.label.toLowerCase() === category.toLowerCase()
                )?.[0]

                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    aria-pressed={selectedCategory === category}
                    aria-label={`Filter by ${category}`}
                    className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition ${
                      selectedCategory === category
                        ? uiMode === 'zomato'
                          ? 'bg-gradient-to-r from-[#E23744] to-[#D63447] text-white'
                          : 'bg-gradient-to-r from-[#FC8019] to-[#FD9139] text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {category}
                  </button>
                )
              })}
            </div>
          </nav>
        </div>
      </div>

      {/* Restaurant Grid */}
      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div
            className="flex items-center justify-center h-64"
            aria-live="polite"
            aria-label="Loading restaurants"
          >
            <div className="text-center">
              <div
                className="w-12 h-12 border-4 border-slate-200 border-t-primary rounded-full animate-spin mx-auto mb-4"
                role="status"
              />
              <p className="text-slate-600 dark:text-slate-400">Loading restaurants...</p>
            </div>
          </div>
        ) : filteredRestaurants.length === 0 ? (
          <div className="text-center py-12" aria-live="polite">
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-4">
              No restaurants found
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory(null)
              }}
              className={`px-6 py-2 text-white rounded-lg hover:shadow-lg transition ${
                uiMode === 'zomato'
                  ? 'bg-gradient-to-r from-[#E23744] to-[#D63447]'
                  : 'bg-gradient-to-r from-[#FC8019] to-[#FD9139]'
              }`}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-6" aria-live="polite">
              {selectedCategory ? `${selectedCategory} Restaurants` : 'All Restaurants'}
              <span className="text-base font-normal text-slate-500 dark:text-slate-400 ml-3">
                ({filteredRestaurants.length} found)
              </span>
            </h2>
            <ul
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 list-none p-0"
              aria-label="Restaurant list"
            >
              {filteredRestaurants.map((restaurant) => (
                <li key={restaurant.id}>
                  <RestaurantCard
                    {...restaurant}
                    onClick={() => router.push(`/restaurant/${restaurant.id}`)}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>

      {/* Internal Linking — Cuisine Exploration */}
      <aside
        className="bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 py-10"
        aria-label="Explore cuisines"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold mb-2 text-slate-800 dark:text-slate-200">
            {HOMEPAGE_CONTENT.cuisineSection.title}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            {HOMEPAGE_CONTENT.cuisineSection.subtitle}
          </p>
          <nav aria-label="Cuisine pages navigation">
            <ul className="flex flex-wrap gap-3 list-none p-0">
              {Object.entries(CUISINE_META).map(([slug, meta]) => (
                <li key={slug}>
                  <Link
                    href={`/cuisine/${slug}`}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-sm font-medium transition"
                    aria-label={`Browse ${meta.label} restaurants`}
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

      {/* Why DreamFood — SEO content block */}
      <section
        className="bg-slate-50 dark:bg-slate-950 py-14 border-t border-slate-100 dark:border-slate-800"
        aria-labelledby="why-dreamfood-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            id="why-dreamfood-heading"
            className="text-2xl font-bold mb-8 text-slate-900 dark:text-white"
          >
            {HOMEPAGE_CONTENT.whyDreamFoodSection.title}
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 list-none p-0">
            {HOMEPAGE_CONTENT.whyDreamFoodSection.points.map((point) => (
              <li
                key={point.heading}
                className="bg-white dark:bg-slate-900 rounded-xl p-5 shadow-sm border border-slate-100 dark:border-slate-800"
              >
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2 text-sm">
                  {point.heading}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {point.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ Section — visible Q&A with FAQ schema already in layout */}
      <section
        className="bg-white dark:bg-slate-900 py-14 border-t border-slate-100 dark:border-slate-800"
        aria-labelledby="faq-heading"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            id="faq-heading"
            className="text-2xl font-bold mb-8 text-slate-900 dark:text-white"
          >
            Frequently Asked Questions
          </h2>
          <dl className="space-y-5">
            {HOMEPAGE_FAQS.map((faq, i) => (
              <div
                key={i}
                className="border border-slate-100 dark:border-slate-800 rounded-xl p-5 bg-slate-50 dark:bg-slate-950"
              >
                <dt className="font-semibold text-slate-900 dark:text-white mb-2 text-sm">
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
    </div>
  )
}
