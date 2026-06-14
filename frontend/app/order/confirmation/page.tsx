'use client'

import React, { useEffect, useState } from 'react'
import { Header } from '@/components/Header'
import { useCartStore } from '@/store/cartStore'
import { useUIStore } from '@/store/uiStore'
import { useRouter } from 'next/navigation'
import { formatPrice, calculateGST, calculateDeliveryCharge } from '@/lib/utils'
import { CheckCircle2, Home, Truck } from 'lucide-react'

export default function OrderConfirmationPage() {
  const router = useRouter()
  const { items, getSubtotal, clearCart } = useCartStore()
  const uiMode = useUIStore((state) => state.uiMode)
  const [isProcessing, setIsProcessing] = useState(true)
  const [isHydrated, setIsHydrated] = useState(false)
  const [orderId] = useState(() => Math.floor(Math.random() * 1000000))

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  const subtotal = getSubtotal()
  const gst = calculateGST(subtotal)
  const deliveryCharge = calculateDeliveryCharge(subtotal)
  const total = subtotal + gst + deliveryCharge

  useEffect(() => {
    if (!isHydrated) return
    
    // Simulate order processing
    const timer = setTimeout(() => {
      setIsProcessing(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [isHydrated])

  const handleContinueShopping = () => {
    clearCart()
    router.push('/home')
  }

  const handleTrackOrder = () => {
    router.push(`/order/tracking/${orderId}`)
  }

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <Header />
        <div className="flex items-center justify-center min-h-[600px]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-slate-200 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-600 dark:text-slate-400">Loading your order...</p>
          </div>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <Header />
        <div className="flex items-center justify-center min-h-[600px]">
          <div className="text-center">
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-4">
              No order to confirm
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

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Processing State */}
        {isProcessing ? (
          <div className="flex items-center justify-center min-h-[500px]">
            <div className="text-center">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse"
                style={{
                  background:
                    uiMode === 'zomato'
                      ? 'linear-gradient(135deg, #E23744 0%, #D63447 100%)'
                      : 'linear-gradient(135deg, #FC8019 0%, #FD9139 100%)',
                }}
              >
                <span className="text-4xl">🍕</span>
              </div>
              <h2 className="text-3xl font-bold mb-2">Placing Your Dream Order...</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Hold on, we're securing your imaginary meal!
              </p>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Success Message */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-16 h-16 text-green-600 dark:text-green-400" />
                </div>
              </div>

              <h1 className="text-4xl font-bold mb-4">Order Confirmed! ✨</h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 mb-6">
                Your dream meal has been successfully placed
              </p>

              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  <span className="font-semibold">Order ID:</span> #{orderId}
                </p>
              </div>

              <p className="text-slate-600 dark:text-slate-400">
                You're saving <span className="font-bold text-primary">₹{total}</span> by
                ordering from your dreams! 💰
              </p>
            </div>

            {/* Order Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm overflow-hidden">
                  <div className="px-6 py-4 bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700">
                    <h2 className="font-bold text-lg">Order Items</h2>
                  </div>

                  {items.map((item) => (
                    <div
                      key={item.menuItemId}
                      className="p-6 border-b border-slate-200 dark:border-slate-700 flex items-center gap-6 last:border-b-0"
                    >
                      <div
                        className="w-16 h-16 rounded-lg flex items-center justify-center text-2xl flex-shrink-0"
                        style={{
                          background:
                            uiMode === 'zomato'
                              ? 'linear-gradient(135deg, #E23744 0%, #D63447 100%)'
                              : 'linear-gradient(135deg, #FC8019 0%, #FD9139 100%)',
                        }}
                      >
                        🍕
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm">
                          {formatPrice(item.price)} × {item.quantity}
                        </p>
                      </div>

                      <div className="w-24 text-right">
                        <p className="font-semibold">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-6">
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

                  <div className="mb-8 flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-2xl text-primary">{formatPrice(total)}</span>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={handleTrackOrder}
                      className="w-full py-3 text-white font-semibold rounded-lg hover:shadow-lg transition flex items-center justify-center gap-2"
                      style={{
                        background:
                          uiMode === 'zomato'
                            ? 'linear-gradient(135deg, #E23744 0%, #D63447 100%)'
                            : 'linear-gradient(135deg, #FC8019 0%, #FD9139 100%)',
                      }}
                    >
                      <Truck className="w-5 h-5" />
                      Track Your Order
                    </button>

                    <button
                      onClick={handleContinueShopping}
                      className="w-full py-3 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white font-semibold rounded-lg hover:shadow-lg transition flex items-center justify-center gap-2"
                    >
                      <Home className="w-5 h-5" />
                      Continue Shopping
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-8">
              <h2 className="text-2xl font-bold mb-6">What's Next?</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">📍</span>
                  </div>
                  <h3 className="font-bold mb-2">Restaurant Confirms</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Your dream restaurant accepts the order
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">👨‍🍳</span>
                  </div>
                  <h3 className="font-bold mb-2">Being Prepared</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Your food is being dreamed into existence
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🛵</span>
                  </div>
                  <h3 className="font-bold mb-2">On The Way</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Your order is being delivered by dream riders
                  </p>
                </div>
              </div>
            </div>

            {/* Fun Fact */}
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 rounded-2xl p-8 border border-primary/20 dark:border-primary/30">
              <p className="text-lg text-center">
                <span className="text-3xl mb-4 block">✨</span>
                <span className="font-bold">Fun Fact:</span> You just saved{' '}
                <span className="text-primary font-bold">₹{total}</span> by using DreamFood!
                That's more money for your real dreams! 🎯
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
