'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'

export default function GuestPage() {
  const [guestName, setGuestName] = useState('')
  const [guestEmail, setGuestEmail] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!guestName.trim()) {
      setError('Please enter your name')
      return
    }

    setIsLoading(true)

    try {
      // Store guest session in localStorage
      localStorage.setItem('guestMode', 'true')
      localStorage.setItem('guestName', guestName)
      if (guestEmail) {
        localStorage.setItem('guestEmail', guestEmail)
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800))
      router.push('/home')
    } catch (err) {
      setError('Failed to start guest session. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickGuest = async () => {
    setIsLoading(true)
    try {
      localStorage.setItem('guestMode', 'true')
      localStorage.setItem('guestName', guestName || 'Guest User')
      await new Promise((resolve) => setTimeout(resolve, 500))
      router.push('/home')
    } catch (err) {
      setError('Failed to start guest session.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-10">
          <div className="inline-block mb-4">
            <div className="text-6xl">🍕</div>
          </div>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-orange-400 mb-2">
            DreamFood
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-base">
            Try as a guest - No commitment needed
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Guest Mode
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8 text-base">
              Browse restaurants and place orders without creating an account
            </p>

            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm flex items-start gap-3">
                <span className="text-lg mt-0.5">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold mb-2.5 text-slate-700 dark:text-slate-300">
                  Your Name (Optional)
                </label>
                <input
                  id="name"
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Enter your name or skip"
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition disabled:opacity-50"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold rounded-xl hover:shadow-xl hover:shadow-orange-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Starting...
                  </>
                ) : (
                  '👤 Enter as Guest'
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-300 dark:border-slate-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 font-medium">
                  Or
                </span>
              </div>
            </div>

            {/* Quick Guest Button */}
            <button
              onClick={handleQuickGuest}
              disabled={isLoading}
              className="w-full py-3 px-4 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200 flex items-center justify-center gap-2 text-base disabled:opacity-50"
            >
              ⚡ Quick Guest Access
            </button>
          </div>

          {/* Footer */}
          <div className="px-8 py-5 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700">
            <p className="text-center text-slate-600 dark:text-slate-400 text-sm">
              Want to save your orders?{' '}
              <a href="/auth/login" className="text-orange-600 dark:text-orange-400 font-bold hover:text-orange-700 dark:hover:text-orange-300 transition">
                Sign In with Google
              </a>
            </p>
          </div>
        </div>

        {/* Benefits Box */}
        <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-pink-50 dark:from-orange-900/20 dark:to-pink-900/20 border border-orange-200 dark:border-orange-800 rounded-xl">
          <p className="text-sm text-orange-900 dark:text-orange-200">
            ✨ <strong>Guest Benefits:</strong> Browse unlimited restaurants, create orders, and enjoy live tracking without registration!
          </p>
        </div>
      </div>
    </div>
  )
}
