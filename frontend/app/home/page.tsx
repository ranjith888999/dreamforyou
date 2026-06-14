'use client'

import React, { useState, useEffect } from 'react'
import { Header } from '@/components/Header'
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
      <Header />

      {/* Hero Section */}
      <section
        className="text-white py-12 transition-all duration-300"
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
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-70" />
            <input
              type="text"
              placeholder="Search restaurants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>
        </div>
      </section>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            <div className="flex items-center gap-2 mr-4">
              <Filter className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Categories:
              </span>
            </div>
            <button
              onClick={() => setSelectedCategory(null)}
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
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
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
            ))}
          </div>
        </div>
      </div>

      {/* Restaurant Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-slate-200 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-slate-600 dark:text-slate-400">Loading restaurants...</p>
            </div>
          </div>
        ) : filteredRestaurants.length === 0 ? (
          <div className="text-center py-12">
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
            <h2 className="text-2xl font-bold mb-6">
              {selectedCategory ? `${selectedCategory} Restaurants` : 'All Restaurants'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRestaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  {...restaurant}
                  onClick={() => router.push(`/restaurant/${restaurant.id}`)}
                />
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
