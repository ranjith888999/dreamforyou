'use client'

import React, { useState, useEffect } from 'react'
import { HeaderClient } from '@/components/HeaderClient'
import { MenuCard } from '@/components/MenuCard'
import { useParams, useRouter } from 'next/navigation'
import { restaurantAPI, menuAPI } from '@/lib/api'
import { useCartStore } from '@/store/cartStore'
import { useUIStore } from '@/store/uiStore'
import { Star, Clock, ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { CUISINE_META } from '@/lib/seo'

interface Restaurant {
  id: number
  name: string
  description: string
  cuisine_type: string
  rating: number
  review_count: number
  delivery_time: number
  address: string
  logo_url: string
  banner_url: string
}

interface MenuItem {
  id: number
  restaurantId: number
  name: string
  description: string
  price: number
  imageUrl: string
  isVegetarian: boolean
  spiceLevel: number
  calories: number
}

export default function RestaurantPage() {
  const params = useParams()
  const router = useRouter()
  const restaurantId = Number(params.id)
  const uiMode = useUIStore((state) => state.uiMode)

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null)
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [toastItem, setToastItem] = useState<string | null>(null)
  const { addItem } = useCartStore()

  useEffect(() => {
    fetchData()
  }, [restaurantId])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [restaurantRes, menuRes] = await Promise.all([
        restaurantAPI.getRestaurant(restaurantId),
        menuAPI.getMenuItems(restaurantId),
      ])
      setRestaurant(restaurantRes.data)
      setMenuItems(menuRes.data)
    } catch (error) {
      console.error('Failed to fetch data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = (item: MenuItem) => {
    addItem({
      menuItemId: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      restaurantId: restaurantId,
    })
    setToastItem(item.name)
    setTimeout(() => setToastItem(null), 2500)
  }

  if (loading) {
    return (
      <div>
        <HeaderClient />
        <div className="flex items-center justify-center min-h-[600px]" aria-live="polite" aria-label="Loading restaurant">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-slate-200 border-t-primary rounded-full animate-spin mx-auto mb-4" role="status" />
            <p className="text-slate-600 dark:text-slate-400">Loading restaurant...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!restaurant) {
    return (
      <div>
        <HeaderClient />
        <div className="flex items-center justify-center min-h-[600px]">
          <div className="text-center">
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-4">
              Restaurant not found
            </p>
            <button
              onClick={() => router.push('/home')}
              className="px-6 py-2 text-white rounded-lg"
              style={{
                background:
                  uiMode === 'zomato'
                    ? 'linear-gradient(135deg, #E23744 0%, #D63447 100%)'
                    : 'linear-gradient(135deg, #FC8019 0%, #FD9139 100%)',
              }}
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Find cuisine slug for internal linking
  const cuisineSlug = Object.entries(CUISINE_META).find(
    ([, m]) => m.label.toLowerCase() === restaurant.cuisine_type.toLowerCase()
  )?.[0]

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Add-to-cart toast — replaces browser alert() */}
      {toastItem && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full bg-green-600 text-white text-sm font-semibold shadow-lg animate-fade-in"
        >
          ✅ {toastItem} added to cart!
        </div>
      )}

      <HeaderClient />
      <nav
        aria-label="Breadcrumb"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3"
      >
        <ol className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <li>
            <Link href="/" className="hover:text-primary transition">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/home" className="hover:text-primary transition">
              Restaurants
            </Link>
          </li>
          {cuisineSlug && (
            <>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href={`/cuisine/${cuisineSlug}`}
                  className="hover:text-primary transition"
                >
                  {restaurant.cuisine_type}
                </Link>
              </li>
            </>
          )}
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-slate-900 dark:text-white font-medium truncate max-w-[160px]">
            {restaurant.name}
          </li>
        </ol>
      </nav>

      {/* Restaurant Header */}
      <section
        className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700"
        aria-labelledby="restaurant-name"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative h-64 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 rounded-2xl overflow-hidden">
              {restaurant.banner_url || restaurant.logo_url ? (
                <Image
                  src={restaurant.banner_url || restaurant.logo_url}
                  alt={`${restaurant.name} — ${restaurant.cuisine_type} restaurant`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center text-6xl"
                  role="img"
                  aria-label={`${restaurant.name} restaurant image`}
                >
                  🍕
                </div>
              )}
            </div>

            <div className="md:col-span-2">
              <h1 id="restaurant-name" className="text-4xl font-bold mb-2">
                {restaurant.name}
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                {restaurant.description}
              </p>

              <div className="flex flex-wrap gap-6 mb-4">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                  <span className="font-semibold">{restaurant.rating}</span>
                  <span className="text-slate-600 dark:text-slate-400">
                    ({restaurant.review_count.toLocaleString()} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-slate-600 dark:text-slate-400" aria-hidden="true" />
                  <span>{restaurant.delivery_time} min delivery</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {cuisineSlug ? (
                  <Link
                    href={`/cuisine/${cuisineSlug}`}
                    className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50 transition"
                    aria-label={`Browse all ${restaurant.cuisine_type} restaurants`}
                  >
                    {restaurant.cuisine_type}
                  </Link>
                ) : (
                  <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                    {restaurant.cuisine_type}
                  </span>
                )}
                <span className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                  Free Delivery
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Items */}
      <main
        id="main-content"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <h2 className="text-3xl font-bold mb-8">Menu</h2>

        {menuItems.length === 0 ? (
          <p className="text-slate-600 dark:text-slate-400">
            No menu items available
          </p>
        ) : (
          <ul
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 list-none p-0"
            aria-label={`${restaurant.name} menu items`}
          >
            {menuItems.map((item) => (
              <li key={item.id}>
                <MenuCard
                  {...item}
                  onAddToCart={() => handleAddToCart(item)}
                />
              </li>
            ))}
          </ul>
        )}
      </main>

      {/* Internal Linking — Related Cuisine */}
      {cuisineSlug && (
        <aside
          className="bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 py-8"
          aria-label="Related restaurants"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-200">
              More {restaurant.cuisine_type} Restaurants
            </h2>
            <Link
              href={`/cuisine/${cuisineSlug}`}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium text-white transition hover:shadow-lg"
              style={{
                background:
                  uiMode === 'zomato'
                    ? 'linear-gradient(135deg, #E23744 0%, #D63447 100%)'
                    : 'linear-gradient(135deg, #FC8019 0%, #FD9139 100%)',
              }}
              aria-label={`See all ${restaurant.cuisine_type} restaurants on DreamFood`}
            >
              Browse all {restaurant.cuisine_type} restaurants →
            </Link>
          </div>
        </aside>
      )}
    </div>
  )
}
