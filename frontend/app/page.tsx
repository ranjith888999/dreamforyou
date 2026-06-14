'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { useUIStore } from '@/store/uiStore'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const uiMode = useUIStore((state) => state.uiMode)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const gradientStyle = {
    background:
      uiMode === 'zomato'
        ? 'linear-gradient(135deg, #E23744 0%, #D63447 100%)'
        : 'linear-gradient(135deg, #FC8019 0%, #FD9139 100%)',
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white" style={gradientStyle}>
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-white mx-auto mb-4" />
          <p className="text-white text-lg">Preparing your dream meal...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-slate-950 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div
                className="text-2xl font-bold text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    uiMode === 'zomato'
                      ? 'linear-gradient(135deg, #E23744 0%, #D63447 100%)'
                      : 'linear-gradient(135deg, #FC8019 0%, #FD9139 100%)',
                }}
              >
                🍕
              </div>
              <h1
                className="text-2xl font-bold text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    uiMode === 'zomato'
                      ? 'linear-gradient(135deg, #E23744 0%, #D63447 100%)'
                      : 'linear-gradient(135deg, #FC8019 0%, #FD9139 100%)',
                }}
              >
                DreamFood
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/auth/login')}
                className="px-4 py-2 text-sm font-medium text-slate-900 dark:text-white hover:text-primary transition"
              >
                Sign In
              </button>
              <button
                onClick={() => router.push('/auth/register')}
                className="px-4 py-2 text-sm font-medium text-white rounded-lg hover:shadow-lg transition"
                style={gradientStyle}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl font-bold mb-6 leading-tight">
              Experience the Joy of<br />
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    uiMode === 'zomato'
                      ? 'linear-gradient(135deg, #E23744 0%, #D63447 100%)'
                      : 'linear-gradient(135deg, #FC8019 0%, #FD9139 100%)',
                }}
              >
                Dream Ordering
              </span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
              Order your favorite food, experience the excitement, track your delivery, and save ₹0 while enjoying the dopamine rush!
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => router.push('/auth/login')}
                className="px-8 py-3 text-lg font-semibold text-white rounded-lg hover:shadow-xl transition transform hover:scale-105"
                style={gradientStyle}
              >
                Start Dreaming Now
              </button>
              <button
                onClick={() => router.push('/auth/guest')}
                className="px-8 py-3 text-lg font-semibold border-2 rounded-lg hover:text-white transition"
                style={{
                  borderColor: uiMode === 'zomato' ? '#E23744' : '#FC8019',
                  color: uiMode === 'zomato' ? '#E23744' : '#FC8019',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    uiMode === 'zomato' ? '#E23744' : '#FC8019'
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'transparent'
                }}
              >
                Try as Guest
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="p-8 rounded-3xl shadow-2xl" style={gradientStyle}>
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 space-y-4">
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2"></div>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 text-center">
                    <div
                      className="text-2xl font-bold"
                      style={{ color: uiMode === 'zomato' ? '#E23744' : '#FC8019' }}
                    >
                      ∞
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Orders</p>
                  </div>
                  <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 text-center">
                    <div
                      className="text-2xl font-bold"
                      style={{ color: uiMode === 'zomato' ? '#E23744' : '#FC8019' }}
                    >
                      ₹0
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Spent</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-slate-50 dark:bg-slate-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center mb-12">Why DreamFood?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🍕',
                title: 'Browse Real Restaurants',
                description: 'Browse from thousands of restaurants and add food to your cart',
              },
              {
                icon: '🚗',
                title: 'Real-Time Tracking',
                description: 'Watch your imaginary food get delivered with live tracking',
              },
              {
                icon: '💰',
                title: 'Track Savings',
                description: 'See how much money you saved by ordering from your dreams',
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm hover:shadow-lg transition text-center"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h4 className="text-xl font-semibold mb-3">{feature.title}</h4>
                <p className="text-slate-600 dark:text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-white py-20 transition-all duration-300" style={gradientStyle}>
        <div className="max-w-4xl mx-auto text-center px-4">
          <h3 className="text-4xl font-bold mb-6">Ready for your dream meal?</h3>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of users experiencing the joy of guilt-free food ordering
          </p>
          <button
            onClick={() => router.push('/auth/login')}
            className="px-10 py-4 text-lg font-semibold text-white bg-white rounded-lg hover:shadow-xl transition transform hover:scale-105"
            style={{
              color: uiMode === 'zomato' ? '#E23744' : '#FC8019',
            }}
          >
            Get Started Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">DreamFood</h4>
              <p className="text-slate-400">The dopamine-based food delivery simulation</p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Product</h5>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><Link href="/">Features</Link></li>
                <li><Link href="/">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Company</h5>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><Link href="/">About</Link></li>
                <li><Link href="/">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Legal</h5>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><Link href="/">Privacy</Link></li>
                <li><Link href="/">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-slate-400">
            <p>&copy; 2024 DreamFood. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
