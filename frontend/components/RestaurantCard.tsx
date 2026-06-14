import React from 'react'
import { Star, Clock, Bike } from 'lucide-react'
import Image from 'next/image'

interface RestaurantCardProps {
  id: number
  name: string
  rating: number
  review_count: number
  delivery_time: number
  cuisine_type: string
  logo_url: string
  onClick?: () => void
}

export function RestaurantCard({
  id,
  name,
  rating,
  review_count,
  delivery_time,
  cuisine_type,
  logo_url,
  onClick,
}: RestaurantCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-lg transition cursor-pointer overflow-hidden"
    >
      <div className="relative h-48 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600">
        <div className="w-full h-full flex items-center justify-center text-4xl">
          🍕
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-1">{name}</h3>
        
        <div className="flex items-center gap-4 mb-3 text-sm">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{rating}</span>
            <span className="text-slate-500">({review_count.toLocaleString()})</span>
          </div>
          <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
            <Clock className="w-4 h-4" />
            <span>{delivery_time} min</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600 dark:text-slate-400">
            {cuisine_type}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-500">
            Free delivery
          </span>
        </div>
      </div>
    </div>
  )
}
