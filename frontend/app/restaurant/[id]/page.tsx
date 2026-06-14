'use client'

import React, { useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import { MenuCard } from '@/components/MenuCard'
import { useParams, useRouter } from 'next/navigation'
import { restaurantAPI, menuAPI } from '@/lib/api'
import { useCartStore } from '@/store/cartStore'
import { useUIStore } from '@/store/uiStore'
import { Star, Clock, ChevronLeft } from 'lucide-react'

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
    // Show toast notification
    alert(`${item.name} added to cart!`)
  }

  if (loading) {
    return (
      <div>
        <Header />
        <div className="flex items-center justify-center min-h-[600px]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-slate-200 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-600 dark:text-slate-400">Loading restaurant...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!restaurant) {
    return (
      <div>
        <Header />
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

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-primary hover:text-primary/80 transition"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </button>
      </div>

      {/* Restaurant Header */}
      <section className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="h-64 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 rounded-2xl flex items-center justify-center text-6xl">
              🍕
            </div>

            <div className="md:col-span-2">
              <h1 className="text-4xl font-bold mb-2">{restaurant.name}</h1>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                {restaurant.description}
              </p>

              <div className="flex flex-wrap gap-6 mb-4">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{restaurant.rating}</span>
                  <span className="text-slate-600 dark:text-slate-400">
                    ({restaurant.review_count.toLocaleString()} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                  <span>{restaurant.delivery_time} min delivery</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                  {restaurant.cuisine_type}
                </span>
                <span className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                  Free Delivery
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Items */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold mb-8">Menu</h2>

        {menuItems.length === 0 ? (
          <p className="text-slate-600 dark:text-slate-400">
            No menu items available
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item) => (
              <MenuCard
                key={item.id}
                {...item}
                onAddToCart={() => handleAddToCart(item)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
