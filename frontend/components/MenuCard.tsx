import React from 'react'
import { Star, Flame } from 'lucide-react'
import Image from 'next/image'
import { formatPrice } from '@/lib/utils'

interface MenuCardProps {
  id: number
  name: string
  description: string
  price: number
  isVegetarian: boolean
  spiceLevel: number
  calories: number
  imageUrl?: string
  onAddToCart?: () => void
}

export function MenuCard({
  id,
  name,
  description,
  price,
  isVegetarian,
  spiceLevel,
  calories,
  imageUrl,
  onAddToCart,
}: MenuCardProps) {
  const dietLabel = isVegetarian ? 'Vegetarian' : 'Non-Vegetarian'

  return (
    <article
      className="bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
      aria-label={`${name} — ${dietLabel}, ₹${price}`}
    >
      <div className="relative h-40 bg-gradient-to-br from-orange-200 to-orange-100 dark:from-orange-900 dark:to-orange-800">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={`${name} — ${dietLabel} dish`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
            loading="lazy"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-3xl"
            role="img"
            aria-label={`${name} food image placeholder`}
          >
            {isVegetarian ? '🥗' : '🍗'}
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold flex-1 line-clamp-1">{name}</h3>
          <span
            className="text-xs ml-2 px-2 py-1 rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 whitespace-nowrap"
            aria-label={dietLabel}
          >
            {isVegetarian ? '🌱 Veg' : '🍖 Non-Veg'}
          </span>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-3">
          {description}
        </p>

        <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400 mb-3">
          {spiceLevel > 0 && (
            <div className="flex items-center gap-1" aria-label={`Spice level ${spiceLevel} out of 5`}>
              <Flame className="w-3 h-3 text-red-500" aria-hidden="true" />
              <span>{spiceLevel}/5</span>
            </div>
          )}
          <span aria-label={`${calories} calories`}>{calories} cal</span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-700">
          <span className="font-bold text-primary text-lg" aria-label={`Price: ${formatPrice(price)}`}>
            {formatPrice(price)}
          </span>
          <button
            onClick={onAddToCart}
            className="px-4 py-2 bg-gradient-primary text-white text-sm font-semibold rounded-lg hover:shadow-lg transition"
            aria-label={`Add ${name} to cart`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  )
}
