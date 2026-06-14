'use client'

import React, { useEffect, useState } from 'react'
import { Header } from '@/components/Header'
import { useCartStore } from '@/store/cartStore'
import { useUIStore } from '@/store/uiStore'
import { useRouter } from 'next/navigation'
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react'
import { formatPrice, calculateGST, calculateDeliveryCharge } from '@/lib/utils'

export default function CartPage() {
  const router = useRouter()
  const { items, removeItem, updateQuantity, getSubtotal, clearCart, restaurantId } =
    useCartStore()
  const uiMode = useUIStore((state) => state.uiMode)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  const subtotal = getSubtotal()
  const gst = calculateGST(subtotal)
  const deliveryCharge = calculateDeliveryCharge(subtotal)
  const total = subtotal + gst + deliveryCharge

  const handlePlaceOrder = () => {
    if (items.length === 0) {
      alert('Your cart is empty!')
      return
    }
    router.push('/order/confirmation')
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
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8">🛒 Dream Cart</h1>

        {!isHydrated ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-slate-200 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-slate-600 dark:text-slate-400">Loading your cart...</p>
            </div>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🛒</div>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-4">
              Your cart is empty
            </p>
            <button
              onClick={() => router.push('/home')}
              className="px-6 py-3 bg-gradient-primary text-white rounded-lg hover:shadow-lg transition"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm overflow-hidden">
                {items.map((item) => (
                  <div
                    key={item.menuItemId}
                    className="p-6 border-b border-slate-200 dark:border-slate-700 flex items-center gap-6 last:border-b-0"
                  >
                    <div className="w-20 h-20 bg-gradient-primary rounded-lg flex items-center justify-center text-3xl flex-shrink-0">
                      🍕
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">
                        {formatPrice(item.price)} each
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          updateQuantity(item.menuItemId, item.quantity - 1)
                        }
                        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                      <span className="text-lg font-semibold w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.menuItemId, item.quantity + 1)
                        }
                        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="w-32 text-right">
                      <p className="font-semibold text-lg">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>

                    <button
                      onClick={() => removeItem(item.menuItemId)}
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={clearCart}
                className="mt-4 text-red-500 hover:text-red-600 transition text-sm font-medium"
              >
                Clear Cart
              </button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6 pb-6 border-b border-slate-200 dark:border-slate-700">
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Subtotal</span>
                    <span className="font-semibold">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">GST (5%)</span>
                    <span className="font-semibold">{formatPrice(gst)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">
                      Delivery Charge
                    </span>
                    <span className="font-semibold">
                      {deliveryCharge === 0 ? 'Free' : formatPrice(deliveryCharge)}
                    </span>
                  </div>
                </div>

                <div className="mb-6 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-2xl text-primary">{formatPrice(total)}</span>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  className="w-full py-3 text-white font-semibold rounded-lg hover:shadow-lg transition mb-3"
                  style={{
                    background:
                      uiMode === 'zomato'
                        ? 'linear-gradient(135deg, #E23744 0%, #D63447 100%)'
                        : 'linear-gradient(135deg, #FC8019 0%, #FD9139 100%)',
                  }}
                >
                  Place Dream Order
                </button>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm text-blue-700 dark:text-blue-300">
                  ✨ You'll save ₹{total} by dream ordering!
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
